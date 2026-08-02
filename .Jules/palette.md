
## 2026-08-02 - Dynamic ARIA Labels for Stateful Icon Buttons
**Learning:** For stateful icon-only toggle buttons (like password visibility), static `aria-label`s become inaccurate after interaction. The `aria-label` and `title` attributes must be dynamically updated by JavaScript to reflect the current state/action (e.g., 'Show password' vs 'Hide password'). Additionally, the inner FontAwesome icon (`<i>`) must include `aria-hidden="true"` to prevent screen readers from parsing the icon class.
**Action:** When implementing or fixing icon-only toggles, ensure the associated JS handler toggles the `aria-label` and `title` attributes alongside the visual icon change, and always apply `aria-hidden="true"` to the icon element itself.
