## 2025-01-20 - Add accessibility and hover feedback to password visibility toggles
**Learning:** Icon-only buttons for toggling password visibility (like an eye icon) lack context for screen readers and miss a native tooltip for sighted users, causing friction during the authentication flow.
**Action:** Always add dynamic `aria-label` and `title` attributes that reflect the button's action based on its current state (e.g., 'Show password' vs 'Hide password').
