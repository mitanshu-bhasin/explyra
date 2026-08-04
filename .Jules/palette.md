
## 2024-05-18 - Dynamic ARIA labels for stateful toggle buttons
**Learning:** Stateful icon-only toggle buttons (like password visibility toggles) must dynamically update their `aria-label` and `title` attributes in JavaScript to accurately reflect their current action/state (e.g., 'Show password' vs 'Hide password').
**Action:** When adding ARIA labels to stateful toggles, always find the associated JavaScript handler and add logic to dynamically update the attributes. Also remember to add `aria-hidden="true"` to the inner icon element to prevent screen readers from announcing it.
