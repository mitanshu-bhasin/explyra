## 2025-01-20 - Password visibility toggle aria-labels
**Learning:** Icon-only password visibility toggles need aria-label and title attributes to be accessible and intuitive. Furthermore, the aria-label and title need to be dynamically updated via JS to accurately reflect the state ('Show password' vs 'Hide password').
**Action:** Added dynamic aria-label and title attributes to password visibility toggle buttons in auth forms, updating them appropriately in the toggle JS logic.
