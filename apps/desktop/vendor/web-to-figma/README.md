# Vendored web-to-figma browser bundle

`web-to-figma.bundle.js.gz` is a deterministic browser IIFE bundle of
`@figit/dom-to-figma@0.2.4` and its runtime dependencies. Electron loads it
inside the isolated, off-screen artifact renderer used by `od figma copy`.

The upstream project is MIT licensed: https://github.com/figitdesign/web-to-figma

To refresh it, bundle the published `dist/figma.mjs` entry for the browser with
the global name `ODFigma`, gzip with level 9 and mtime 0, and update the pinned
dependency and attribution together.
