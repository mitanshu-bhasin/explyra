## 2024-07-23 - Dynamic ARIA labels for stateful icon-only toggle buttons
**Learning:** Icon-only toggle buttons (such as password visibility buttons) require their `aria-label` and `title` attributes to be dynamically updated when their state changes (e.g., from "Show password" to "Hide password") to ensure screen readers provide accurate context, and inner icons should be hidden using `aria-hidden="true"`.
**Action:** When implementing or fixing stateful toggle buttons, ensure the JavaScript handler updates the relevant ARIA and `title` attributes alongside the visual state changes.
