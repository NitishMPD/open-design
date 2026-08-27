// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest';

import { requestRenderedDomSnapshot } from '../../src/runtime/figma-export';

describe('requestRenderedDomSnapshot', () => {
  it('resolves a matching rendered-DOM bridge response', async () => {
    const target = { postMessage: vi.fn() } as unknown as Window;
    const promise = requestRenderedDomSnapshot(target, { timeoutMs: 1_000 });
    const request = (target.postMessage as unknown as ReturnType<typeof vi.fn>).mock.calls[0]?.[0];

    window.dispatchEvent(new MessageEvent('message', {
      source: target,
      data: {
        type: 'od:figma-dom:result',
        id: request.id,
        html: '<html><body><main>Design</main></body></html>',
        baseHref: 'http://localhost/artifacts/',
        width: 1280,
        height: 800,
      },
    }));

    await expect(promise).resolves.toMatchObject({ width: 1280, height: 800 });
  });

  it('rejects bridge errors', async () => {
    const target = { postMessage: vi.fn() } as unknown as Window;
    const promise = requestRenderedDomSnapshot(target, { timeoutMs: 1_000 });
    const request = (target.postMessage as unknown as ReturnType<typeof vi.fn>).mock.calls[0]?.[0];

    window.dispatchEvent(new MessageEvent('message', {
      source: target,
      data: { type: 'od:figma-dom:result', id: request.id, error: 'conversion unavailable' },
    }));

    await expect(promise).rejects.toThrow('conversion unavailable');
  });
});
