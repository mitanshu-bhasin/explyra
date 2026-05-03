## 2026-03-31 - Password Visibility Toggle ARIA Labels
**Learning:** Icon-only buttons for toggling password visibility in auth forms lack ARIA labels, making them inaccessible to screen readers.
**Action:** Always verify that interactive icon buttons (especially in forms) include explicit `aria-label` attributes to ensure they are accessible.
