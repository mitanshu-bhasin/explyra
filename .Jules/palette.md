## 2026-07-18 - Dynamic ARIA labels for stateful toggle buttons
**Learning:** Stateful icon-only toggle buttons (like password visibility) need their `aria-label` and `title` attributes dynamically updated when their state changes (e.g., from 'Show password' to 'Hide password') to ensure screen readers accurately convey the current action.
**Action:** When implementing or fixing icon-only toggle buttons, always pair the visual icon change (e.g., `fa-eye` to `fa-eye-slash`) with corresponding updates to the `aria-label` and `title` attributes via JavaScript.
