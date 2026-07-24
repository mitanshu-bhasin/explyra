## 2026-07-24 - Dynamic ARIA Attributes on Toggle Buttons
**Learning:** Hardcoding `aria-label` on stateful interactive elements (like show/hide password buttons) creates an inaccurate accessibility experience. The label must reflect the *action* or *current state*, and change dynamically when the state changes.
**Action:** Always bind the `aria-label` and `title` updates directly within the JavaScript event handler that manages the state change (e.g., swapping 'Show password' to 'Hide password' when the input type changes).
