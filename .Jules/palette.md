## 2026-06-24 - Dynamic ARIA Labels for Toggles
**Learning:** For stateful icon-only toggle buttons (like password visibility), adding a static `aria-label` isn't enough. The label and title must dynamically update (e.g., from "Show password" to "Hide password") to accurately reflect the action that will happen next.
**Action:** Always update the associated JavaScript handlers to mutate `aria-label` and `title` attributes alongside the visual icon change.
