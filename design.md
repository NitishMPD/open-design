# Open Design Product Design

Author: Nitish

## Principles

- Design workflows are discoverable at the point where users inspect and share an artifact.
- Export language describes the actual result: file-producing actions use “Export”; clipboard workflows use “Copy”.
- Appearance preferences apply immediately, persist across launches, and keep the native desktop shell aligned with the web interface.
- Artifact previews remain sandboxed. Host features communicate through narrow message bridges instead of weakening iframe isolation.

## Copy to Figma

- HTML pages and decks expose a “Copy to Figma” action alongside artifact sharing/export actions.
- The action converts the rendered result, not merely its source, into editable Figma layers.
- Decks preserve their rendered slide order in the copied canvas.
- The UI shows preparing, success, permission failure, and conversion failure states.
- The same capability is available from the `od figma copy` CLI when the desktop renderer is connected.

## Appearance

- General settings expose Light and Dark theme choices.
- Selection previews immediately and is autosaved.
- The first paint uses the persisted theme to avoid a light-to-dark flash.
- The desktop window appearance follows the selected app theme.
- Neutral accents, selected states, text hierarchy, hover states, elevated surfaces, and monochrome product/provider marks must resolve through theme tokens rather than light-only color literals.
- The default accent remains CSS-owned so explicit Dark mode and OS-driven System mode can switch contrast without stale inline overrides; user-selected custom accents remain stable across themes.
