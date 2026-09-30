## 2024-10-24 - Accessibility for Stateful Toggle Buttons
**Learning:** When using static `aria-label` and `title` attributes on stateful icon-only buttons (like a password visibility toggle), the screen reader or tooltip doesn't reflect the current state or action, leading to a confusing UX.
**Action:** Dynamically update both `aria-label` and `title` via the JavaScript event handler alongside the visual icon change to ensure continuous accessibility and clarity.
