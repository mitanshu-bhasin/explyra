## 2024-05-19 - Accessible stateful icon-only toggles
**Learning:** For stateful icon-only toggle buttons (like password visibility), ensuring correct accessibility requires more than a static `aria-label`. The `aria-label` and `title` must be dynamically updated by JavaScript to match the action the button will perform (e.g. changing from "Show password" to "Hide password").
**Action:** When creating or modifying stateful toggles in Explyra, implement dynamic updates for both `aria-label` and `title` within the state-handling JavaScript function, alongside updating the visual icon.
