## 2025-01-29 - Dynamic ARIA Labels on Stateful Icons
**Learning:** For stateful icon-only toggle buttons (like password visibility), static `aria-label` and `title` attributes become inaccurate after interaction.
**Action:** Always dynamically update the `aria-label` and `title` attributes in the associated JavaScript handler to accurately reflect the current action/state (e.g., 'Show' vs. 'Hide').
