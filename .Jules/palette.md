## 2023-11-20 - Adding ARIA labels to toggle password visibility
**Learning:** Found multiple instances of icon-only buttons for toggling password visibility lacking `aria-label`. It's a common accessibility gap in custom auth flows.
**Action:** Always ensure any icon-only button, such as password visibility toggles, have an appropriate `aria-label` to provide screen reader users with necessary context.
