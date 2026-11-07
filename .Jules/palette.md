## 2025-02-14 - Dynamic ARIA labels for stateful toggles
**Learning:** Stateful icon-only buttons (like password visibility toggles) often only communicate their initial state to screen readers if `aria-label` is static. When the action changes (e.g., from 'Show' to 'Hide'), the label must update dynamically via JavaScript to remain accurate.
**Action:** Always bind `aria-label` and `title` updates to the same event handler that toggles the visual icon class for stateful buttons.
