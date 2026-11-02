## 2024-11-02 - Dynamic aria-labels for password visibility toggles
**Learning:** Icon-only toggle buttons (like password visibility) need dynamic `aria-label` and `title` attributes that update with the state to accurately reflect the action to screen readers and visual users via hover tooltips.
**Action:** When adding or modifying stateful toggle buttons, ensure the JavaScript handler updates the `aria-label` and `title` attributes alongside the visual icon changes.
