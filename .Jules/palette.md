## 2024-05-18 - Add ARIA Labels to Password Visibility Toggles
**Learning:** Icon-only buttons used for stateful actions (like toggling password visibility) require dynamic `aria-label` and `title` attributes that update with the state to provide context to screen reader users. The icon inside the button should also be hidden from screen readers using `aria-hidden="true"`.
**Action:** Always verify that state-changing interactive elements update their accessibility attributes dynamically in JavaScript when their state changes.
