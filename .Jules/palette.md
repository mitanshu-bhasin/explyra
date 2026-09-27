## 2024-05-18 - Improve Password Visibility Toggle Accessibility
**Learning:** Icon-only password visibility toggles lack screen reader accessibility. Adding `aria-label` and `title` to the button, while hiding the icon with `aria-hidden="true"`, ensures accurate articulation by assistive technologies without redundancy.
**Action:** Always add `aria-label`, `title`, and dynamic updates for interactive states to stateful icon-only buttons. Add `aria-hidden="true"` to static decorative inner icons.
