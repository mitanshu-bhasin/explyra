## 2026-09-09 - Dynamic ARIA labels on password toggles
**Learning:** State-toggling icon-only buttons (like password visibility) need dynamic `aria-label` and `title` attributes that update in JavaScript when the state changes to prevent confusing screen reader announcements (e.g. reading "Show password" when the password is already shown). The inner `<i>` tags must also have `aria-hidden="true"`.
**Action:** When adding accessibility to stateful toggle buttons, ensure the JavaScript handler updates the ARIA attributes to accurately reflect the current state.
