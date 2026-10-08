## 2025-02-18 - Accessibility on Stateful Icons
**Learning:** Stateful icon buttons (like password visibility toggles) that rely on `<i>` tags can fail accessibility checks if they don't dynamically update their `aria-label` or `title`. Also, the icon itself must be explicitly hidden from screen readers using `aria-hidden="true"`.
**Action:** When adding or updating toggles, update the JS handler to modify `aria-label` and `title` via `btn.setAttribute()` in addition to updating the icon classes. Always apply `aria-hidden="true"` to the inner `<i>` tags.
