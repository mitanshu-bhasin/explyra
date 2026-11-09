## $(date +%Y-%m-%d) - Password Visibility Toggle ARIA Labels
**Learning:** Icon-only password visibility toggle buttons lack `aria-label` attributes and dynamic `title` updates, making them inaccessible to screen readers and lacking native tooltips for visual users.
**Action:** Adding static/dynamic `aria-label` and `title` to these buttons in `login.html` and `signup.html` to improve accessibility and UX. State change in JS will update them dynamically.
