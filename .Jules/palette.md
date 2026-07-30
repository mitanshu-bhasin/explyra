## 2024-05-18 - Stateful Icon-only Buttons
**Learning:** Icon-only toggle buttons (like password visibility) need dynamic `aria-label` and `title` attributes that reflect the current state (e.g. "Show" vs "Hide") to remain accessible to screen readers, instead of relying on a static label.
**Action:** Ensure toggle functions dynamically update `aria-label` and `title` alongside any visual icon class changes.
