
## 2024-05-18 - Dynamic ARIA attributes on stateful icon-only toggle buttons
**Learning:** For stateful icon-only toggle buttons (like password visibility), setting static `aria-label` and `title` is insufficient. The attributes must dynamically update to accurately reflect the current action/state (e.g., 'Show password' vs. 'Hide password') using the associated JavaScript handler.
**Action:** Always ensure that when writing or modifying the JavaScript for stateful icon toggles, the `aria-label` and `title` attributes are dynamically toggled alongside the icon class (e.g., `btn.setAttribute('aria-label', 'Hide password')`).
