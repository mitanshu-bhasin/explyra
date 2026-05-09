## 2024-05-09 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like password visibility toggles using `fa-eye`) lack context for screen readers.
**Action:** Always add dynamic `aria-label` and `aria-pressed` attributes to such buttons and update them via JS to match their current state.
