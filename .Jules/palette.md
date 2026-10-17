## 2024-10-17 - Dynamic Accessibility for Stateful Toggles
**Learning:** State-changing elements (like password visibility toggles) must dynamically update their `aria-label` and `title` attributes (e.g., from 'Show password' to 'Hide password') to ensure screen readers provide accurate feedback about the *current* available action.
**Action:** Always implement JavaScript to sync `aria-label` and `title` alongside visual icon updates for any stateful toggle button.
