## 2024-05-18 - Added Accessibility to Password Toggles
**Learning:** Icon-only toggles (like password visibility) require both an initial static aria-label/title and dynamic updates via JavaScript when their state changes, otherwise screen readers and sighted users (via tooltips) get stuck with an inaccurate state.
**Action:** When adding or auditing stateful interactive elements in this app, ensure JavaScript event handlers dynamically update accessibility attributes along with visual icons.
