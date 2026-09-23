## 2024-10-24 - Accessibility for stateful icon-only toggles
**Learning:** For stateful icon-only toggle buttons (like password visibility), ensuring screen reader accessibility requires dynamically updating the `aria-label` and `title` attributes via JavaScript to accurately reflect the current action/state (e.g., 'Show' vs. 'Hide').
**Action:** When creating or modifying stateful icon-only toggles, always update their `aria-label` and `title` attributes in the associated JavaScript handler.
