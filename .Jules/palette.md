## 2024-05-15 - [Initial Journal]
**Learning:** Initial journal entry.
**Action:** Starting to find UX improvements.
## 2024-05-15 - [Dynamic ARIA labels on password inputs]
**Learning:** For stateful icon-only toggle buttons (like password visibility), it is important that the associated JavaScript handler dynamically updates the `aria-label` and `title` attributes to accurately reflect the current action/state (e.g., "Show" vs. "Hide"). Also, purely decorative inner `<i>` tags should have `aria-hidden="true"`.
**Action:** When adding ARIA labels to stateful toggles, always update the corresponding JS function to swap the attributes dynamically.
