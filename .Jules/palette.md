
## 2024-05-20 - Dynamic ARIA Labels on Stateful Icons
**Learning:** For stateful icon-only toggle buttons (like password visibility), adding a static `aria-label` is insufficient. The label must dynamically update via JavaScript to accurately reflect the current action/state (e.g., 'Show password' vs. 'Hide password') so screen readers don't announce incorrect interactions.
**Action:** Always bind `aria-label` and `title` attribute updates to the same event handler that toggles the icon's visual state.
