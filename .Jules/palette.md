## 2024-03-24 - Add ARIA Labels and Titles to Password Toggles
**Learning:** Icon-only buttons for toggling password visibility need `aria-label` and `title` attributes for screen readers and tooltips. State changes (like showing/hiding password) should update the aria-label and title dynamically.
**Action:** Always add descriptive `aria-label` and `title` attributes to icon-only buttons. Update them dynamically in JavaScript when the button's state changes.
