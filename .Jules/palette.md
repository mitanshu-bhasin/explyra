## 2024-05-24 - Accessibility improvements for toggle password visibility buttons
**Learning:** Statefull icon-only toggle buttons (like password visibility) should dynamically update the `aria-label` and `title` attributes to reflect the current state ("Show password" vs "Hide password"). This makes the interface more accessible to screen readers, providing context and actionability.
**Action:** Update the `togglePasswordVisibility` function in the codebase and add `aria-label` and `title` to the relevant `<button>` tags.
