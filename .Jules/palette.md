
## 2024-05-14 - Dynamic ARIA labels for Stateful Toggles
**Learning:** For stateful icon-only toggle buttons (like password visibility), it's not enough to set a static `aria-label` or use screen-reader-only text because the state changes dynamically. Using just `aria-label` can lead to confusing descriptions for screen reader users when toggled.
**Action:** Implemented dynamic updates to the `aria-label` and `title` attributes inside the JavaScript toggle handler, switching between "Show password" and "Hide password" to accurately reflect the action the button will perform next, and ensured the inner icon is hidden from screen readers.
