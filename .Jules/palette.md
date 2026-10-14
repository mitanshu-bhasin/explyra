## 2025-02-28 - Dynamic ARIA Labels for Stateful Toggles
**Learning:** For stateful icon-only toggle buttons (like password visibility), static `aria-label`s are insufficient. The label must dynamically update (e.g., 'Show' vs. 'Hide') to accurately reflect the current action/state to screen reader users and those relying on tooltips.
**Action:** When adding `aria-label` and `title` to interactive stateful toggles, always ensure the associated JavaScript handler dynamically updates both attributes to reflect the new state.
