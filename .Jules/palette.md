## 2026-04-19 - Accessible Password Toggles
**Learning:** Found that icon-only buttons for toggling password visibility were missing ARIA labels, making them invisible to screen readers. It's crucial to dynamically update these labels using JavaScript to reflect state changes (e.g., from 'Show password' to 'Hide password').
**Action:** Implemented dynamic ARIA label updates alongside icon class swaps in the `togglePasswordVisibility` utility function.
