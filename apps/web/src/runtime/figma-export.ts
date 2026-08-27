import { createFigmaConverter } from '@figit/dom-to-figma';

import { randomUUID } from '../utils/uuid';

export interface RenderedDomSnapshot {
  html: string;
  baseHref: string;
  width: number;
  height: number;
}

interface FigmaDomResultMessage extends Partial<RenderedDomSnapshot> {
  type: 'od:figma-dom:result';
  id: string;
  error?: string;
}

function isFigmaDomResult(value: unknown): value is FigmaDomResultMessage {
  if (!value || typeof value !== 'object') return false;
  const message = value as Record<string, unknown>;
  return message.type === 'od:figma-dom:result' && typeof message.id === 'string';
}

export function requestRenderedDomSnapshot(
  target: Window,
  options: { timeoutMs?: number } = {},
): Promise<RenderedDomSnapshot> {
  const id = `figma-${randomUUID()}`;
  const timeoutMs = options.timeoutMs ?? 15_000;

  return new Promise((resolve, reject) => {
    const cleanup = () => {
      window.removeEventListener('message', onMessage);
      window.clearTimeout(timeout);
    };
    const onMessage = (event: MessageEvent) => {
      if (event.source !== target || !isFigmaDomResult(event.data) || event.data.id !== id) return;
      cleanup();
      if (event.data.error) {
        reject(new Error(event.data.error));
        return;
      }
      if (
        typeof event.data.html !== 'string'
        || typeof event.data.baseHref !== 'string'
        || typeof event.data.width !== 'number'
        || typeof event.data.height !== 'number'
      ) {
        reject(new Error('The preview returned an invalid Figma snapshot.'));
        return;
      }
      resolve({
        html: event.data.html,
        baseHref: event.data.baseHref,
        width: event.data.width,
        height: event.data.height,
      });
    };
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error('Timed out while preparing editable Figma layers.'));
    }, timeoutMs);

    window.addEventListener('message', onMessage);
    target.postMessage({ type: 'od:figma-dom', id }, '*');
  });
}

function withBaseHref(html: string, baseHref: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  doc.querySelectorAll('script, meta[http-equiv="refresh" i]').forEach((node) => node.remove());
  doc.querySelectorAll('base').forEach((node) => node.remove());
  const base = doc.createElement('base');
  base.href = baseHref;
  doc.head.prepend(base);
  return `<!doctype html>${doc.documentElement.outerHTML}`;
}

function waitForFrame(frame: HTMLIFrameElement, timeoutMs: number): Promise<Document> {
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error('Figma staging frame timed out.')), timeoutMs);
    frame.addEventListener('load', async () => {
      window.clearTimeout(timeout);
      const doc = frame.contentDocument;
      if (!doc) {
        reject(new Error('Figma staging frame is not readable.'));
        return;
      }
      try {
        await Promise.race([
          doc.fonts?.ready ?? Promise.resolve(),
          new Promise<void>((done) => window.setTimeout(done, 2_000)),
        ]);
      } catch {
        // Font loading is best-effort; the converter can still use fallbacks.
      }
      resolve(doc);
    }, { once: true });
  });
}

export async function copyRenderedDomToFigma(
  snapshot: RenderedDomSnapshot,
  options: { name?: string; timeoutMs?: number } = {},
): Promise<void> {
  if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
    throw new Error('This browser does not allow rich clipboard writes.');
  }

  const frame = document.createElement('iframe');
  frame.setAttribute('sandbox', 'allow-same-origin');
  frame.setAttribute('aria-hidden', 'true');
  frame.tabIndex = -1;
  frame.style.cssText = [
    'position:fixed',
    'left:-100000px',
    'top:0',
    `width:${Math.max(1, Math.ceil(snapshot.width))}px`,
    `height:${Math.max(1, Math.ceil(snapshot.height))}px`,
    'border:0',
    'pointer-events:none',
  ].join(';');
  frame.srcdoc = withBaseHref(snapshot.html, snapshot.baseHref);
  document.body.appendChild(frame);

  try {
    const doc = await waitForFrame(frame, options.timeoutMs ?? 15_000);
    const element = doc.body;
    if (!element || !element.childElementCount) throw new Error('The rendered artifact is empty.');
    const converter = createFigmaConverter();
    const result = await converter.convert({
      element,
      width: Math.max(1, Math.ceil(snapshot.width)),
      height: Math.max(1, Math.ceil(snapshot.height)),
      name: options.name ?? doc.title ?? 'Open Design',
    });
    await navigator.clipboard.write([result.toClipboardItem()]);
  } finally {
    frame.remove();
  }
}

