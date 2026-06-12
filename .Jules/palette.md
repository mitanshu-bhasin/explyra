## 2024-06-12 - Dynamic ARIA attributes for stateful icon toggle buttons
**Learning:** For stateful icon-only toggle buttons (like password visibility), assigning a static `aria-label` or `title` is insufficient and can lead to confusing screen reader announcements when the state changes.
**Action:** The associated JavaScript handler must dynamically update the `aria-label` and `title` attributes (e.g., "Show password" vs. "Hide password") to accurately reflect the current action/state to assistive technologies.
