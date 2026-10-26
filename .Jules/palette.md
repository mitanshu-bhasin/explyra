## 2023-10-26 - Dynamic ARIA Labels for State Toggles
**Learning:** For interactive icon-only elements that toggle state (like password visibility), a static `aria-label` is insufficient. The label must dynamically update (e.g., from "Show password" to "Hide password") to accurately convey the current state to screen readers and tooltip hover events.
**Action:** When adding or auditing toggle buttons, ensure the JavaScript handler updates both the visual icon and the semantic `aria-label`/`title` attributes simultaneously.
