## 2024-05-19 - Password Visibility Toggle Accessibility
**Learning:** Password visibility toggles (icon-only buttons) currently lack `aria-label` and `title` attributes. These are crucial for screen readers and tooltips respectively.
**Action:** Add dynamic `aria-label` and `title` to password visibility toggle buttons in both `login.html` and `signup.html` to toggle between "Show password" and "Hide password" when clicked.
