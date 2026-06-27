## 2024-05-18 - Dynamic ARIA labels for password visibility toggle
**Learning:** For stateful icon-only toggle buttons (like password visibility), ensuring the associated JavaScript handler dynamically updates the `aria-label` and `title` attributes accurately reflects the current action/state (e.g., 'Show' vs. 'Hide'). Static labels can become confusing when the state changes.
**Action:** When creating or modifying stateful toggle buttons without visible text, always include dynamic updates to `aria-label` and `title` in the state transition logic.
