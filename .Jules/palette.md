## 2024-10-24 - Dynamic ARIA attributes for stateful toggles
**Learning:** For stateful icon-only toggle buttons like password visibility, static `aria-label` attributes become inaccurate upon interaction. The accessibility context must update dynamically.
**Action:** When implementing toggles, ensure the associated JavaScript handler dynamically updates both the `aria-label` and `title` attributes to reflect the current action/state (e.g., 'Show password' vs. 'Hide password').
