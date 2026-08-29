## 2024-05-18 - Stateful Icon Toggle Buttons
**Learning:** For stateful icon-only toggle buttons (like password visibility), static `aria-label`s become inaccurate after interaction.
**Action:** Ensure the associated JavaScript handler dynamically updates the `aria-label` and `title` attributes to accurately reflect the current action/state (e.g., "Show password" vs. "Hide password").
