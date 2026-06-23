## 2026-06-23 - Adding ARIA labels to password toggles
**Learning:** When making stateful interactive elements like a password visibility toggle accessible, ensuring that dynamic state changes correctly update accessibility attributes (like `aria-label` and `title`) is crucial for screen readers.
**Action:** Add `aria-label` to icon-only buttons, but make sure to include state update logic in the JavaScript handler if the button changes state.
