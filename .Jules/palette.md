## 2024-05-20 - Dynamic ARIA labels for stateful icon buttons
**Learning:** Screen reader users miss context when stateful toggles rely solely on visual changes (like an eye to eye-slash icon). Icon-only buttons must update their `aria-label` attribute dynamically to reflect their current state and action.
**Action:** Always pair visual state changes in icon-only buttons with JavaScript that updates the `aria-label` (e.g., from "Show password" to "Hide password").
