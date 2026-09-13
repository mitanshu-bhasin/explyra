## 2024-11-20 - Accessible Password Toggles
**Learning:** For stateful icon-only toggle buttons (like password visibility), it is crucial to ensure the associated JavaScript handler dynamically updates the `aria-label` and `title` attributes to accurately reflect the current action/state (e.g., 'Show password' vs. 'Hide password').
**Action:** Always verify the JavaScript logic and dynamically update `aria-label` and `title` when improving UX for stateful icon-only buttons.
