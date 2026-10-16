## 2023-10-27 - Dynamic Attributes for Stateful Toggles
**Learning:** For stateful icon-only toggle buttons (like password visibility), static `aria-label` or `title` attributes are insufficient. They must dynamically update to reflect the current action/state (e.g., 'Show password' vs. 'Hide password') to ensure screen readers provide accurate information.
**Action:** Ensure the associated JavaScript handler dynamically updates both `aria-label` and `title` attributes when the state changes.
