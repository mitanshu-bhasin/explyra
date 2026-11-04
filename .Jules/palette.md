## 2024-05-18 - [Dynamic ARIA labels for Password Toggles]
**Learning:** Found password visibility toggle buttons without any ARIA labels in `login.html` and `signup.html`. Because these buttons simply switch an icon (`fa-eye` / `fa-eye-slash`) they are completely inaccessible to screen readers.
**Action:** Always ensure stateful icon buttons dynamically update their `aria-label` and `title` to reflect their current state (e.g. 'Show password' vs 'Hide password').
