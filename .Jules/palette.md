## 2026-06-25 - Dynamic ARIA Labels on State Toggles
**Learning:** For interactive icon-only elements that toggle between states (like a password visibility toggle), a static ARIA label is insufficient because screen readers won't announce the state change.
**Action:** When adding ARIA labels to toggle buttons, ensure the JavaScript handler dynamically updates the `aria-label` and `title` attributes to reflect the resulting state (e.g., changing from 'Show password' to 'Hide password' when clicked).
