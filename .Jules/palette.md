
## 2024-11-20 - Accessible Stateful Icon Toggles
**Learning:** For stateful icon-only toggle buttons (like password visibility), an accessible label is not static. A static `aria-label` like "Show password" becomes incorrect once the state changes to showing the password.
**Action:** When adding `aria-label` and `title` to icon-only buttons that toggle states, ensure the associated JavaScript handler dynamically updates the attributes to accurately reflect the current action (e.g., swapping "Show password" to "Hide password").
