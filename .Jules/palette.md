## 2024-06-18 - Dynamic ARIA Labels for Toggle Buttons
**Learning:** For stateful icon-only toggle buttons (like password visibility), static ARIA labels are insufficient. Screen readers will persistently announce the initial state (e.g., 'Show password') even after the state changes to 'Hide password'.
**Action:** When creating toggle buttons, ensure the JavaScript handler dynamically updates the `aria-label` and `title` attributes (e.g., `btn.setAttribute('aria-label', 'Hide password')`) alongside the visual icon change, keeping the accessibility tree synchronized with the visual state.
