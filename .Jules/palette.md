## 2024-05-18 - Dynamic ARIA Labels for Stateful Toggles
**Learning:** Icon-only toggle buttons (like password visibility) require ARIA labels that accurately reflect their current state, not just their initial state. A static "Show password" label is confusing when the password is already visible.
**Action:** Always dynamically update `aria-label` alongside the visual icon changes in JavaScript toggle functions (e.g., swapping between "Show password" and "Hide password").
