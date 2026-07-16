## 2026-07-16 - Stateful ARIA labels for toggle buttons
**Learning:** For stateful icon-only toggle buttons (like password visibility), adding a static `aria-label` is insufficient because the button's purpose changes when clicked.
**Action:** When implementing icon-only toggle buttons, ensure the associated JavaScript handler dynamically updates the `aria-label` and `title` attributes to accurately reflect the current action/state (e.g., "Show password" vs. "Hide password").
