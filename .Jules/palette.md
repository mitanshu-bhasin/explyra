## 2024-05-24 - Add ARIA Labels to Password Visibility Toggles
**Learning:** Icon-only buttons for password visibility toggles were lacking ARIA labels, creating a frustrating experience for screen reader users on login and signup flows.
**Action:** Added `aria-label="Toggle password visibility"` to the password visibility toggle buttons in `login.html` and `signup.html`.
