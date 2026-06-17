## 2025-02-12 - Stateful ARIA Labels for Toggles
**Learning:** Icon-only stateful toggle buttons (like "Show/Hide Password") fail basic accessibility guidelines if their `aria-label` doesn't change when their state changes, as screen reader users will lack feedback that the toggle was successful or what the button will do next.
**Action:** When implementing icon-only toggles, always link the Javascript handler that changes the icon to also dynamically update the element's `aria-label` and `title` attributes.
