## 2024-10-21 - Dynamic Aria Labels for Password Toggles
**Learning:** For stateful interactive elements like password visibility toggles, having a static aria-label like "Show password" can be confusing when the password is already visible.
**Action:** When creating or updating toggle buttons, always ensure the JavaScript handler dynamically updates both the `aria-label` and `title` attributes to accurately reflect the current action/state (e.g., 'Hide password' when visible, 'Show password' when hidden) along with the visual icon change.
