## 2026-05-24 - Dynamic ARIA labels for Password Toggles
**Learning:** Icon-only toggle buttons like password visibility need dynamic aria-labels to communicate state changes to screen readers (e.g., 'Show password' vs 'Hide password').
**Action:** Always update the associated JavaScript handler to dynamically update `aria-label` and `title` attributes when the state changes.
