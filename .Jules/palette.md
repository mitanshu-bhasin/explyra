## 2024-11-03 - Added dynamic aria-labels to password toggles
**Learning:** Icon-only toggle buttons (like password visibility) require both an `aria-label` for screen readers and a `title` attribute for native hover tooltips. Because these buttons are stateful, both attributes must be updated dynamically via JavaScript when the state changes.
**Action:** When improving accessibility for stateful icon-only toggles, update the JS handler to dynamically change both the `aria-label` and `title` attributes in addition to the icon class.
