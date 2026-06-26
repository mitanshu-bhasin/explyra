
## 2026-06-26 - Dynamic ARIA Labels for State-Toggling Icons
**Learning:** For icon-only buttons that toggle state (like showing/hiding a password), a static `aria-label` is insufficient. The label must dynamically update via JavaScript to reflect the current state/action (e.g., changing from "Show password" to "Hide password") so screen reader users are aware of the new functionality after activation.
**Action:** Always ensure JavaScript handlers for stateful toggle buttons update the `aria-label` and `title` attributes concurrently with any visual icon changes (e.g., swapping `fa-eye` and `fa-eye-slash`).
