## 2024-05-18 - Improve Password Visibility Toggle UX
**Learning:** Icon-only toggles (like password visibility) often lack appropriate ARIA labels or titles. When they do have them, they are sometimes static and don't reflect the dynamic state of the toggle (e.g., "Show password" vs "Hide password").
**Action:** When adding or fixing password visibility toggles, ensure `aria-label` and `title` are added to the `<button>`, `aria-hidden="true"` is on the inner `<i>` icon, and the JavaScript updates both the `aria-label` and `title` alongside the icon and input type.
