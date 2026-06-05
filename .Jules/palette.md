## 2026-06-05 - Password Visibility Toggle Accessibility
**Learning:** Icon-only toggle buttons (like password visibility) need dynamic `aria-label` and `title` updates in JavaScript, and the inner icon must have `aria-hidden="true"` so screen readers don't read the icon class name.
**Action:** Update `aria-label` and `title` in the toggle script logic whenever the visual state changes. Apply `aria-hidden="true"` to the decorative `<i>` element.
