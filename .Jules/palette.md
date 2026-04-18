## 2024-05-24 - Missing ARIA Labels on Authentication Icon Buttons
**Learning:** Found an accessibility issue pattern across `login.html`, `signup.html`, and `company.html` where icon-only buttons (like password visibility toggle and theme toggle) lacked `aria-label`s. This renders them inaccessible to screen readers.
**Action:** Always ensure any icon-only interactive elements in auth forms (or anywhere else) include an `aria-label` describing their function.
