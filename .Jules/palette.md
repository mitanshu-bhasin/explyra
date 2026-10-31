## 2024-05-18 - Dynamic ARIA labels for stateful toggles
**Learning:** When using stateful icon-only toggle buttons (like password visibility toggles), setting a static `aria-label` is insufficient because the button's action changes after interaction.
**Action:** Dynamically update both `aria-label` and `title` via JavaScript to accurately reflect the current action/state (e.g., toggling between "Show password" and "Hide password").
