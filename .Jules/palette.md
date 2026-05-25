## 2024-05-18 - Stateful Icon-Only Toggle ARIA attributes
**Learning:** For stateful icon-only toggle buttons (like password visibility), ensuring the associated JavaScript handler dynamically updates the `aria-label` and `title` attributes accurately reflects the current action/state (e.g., "Show" vs. "Hide").
**Action:** When adding ARIA attributes to stateful elements, always review the corresponding JS to ensure the attributes update in sync with the state.
