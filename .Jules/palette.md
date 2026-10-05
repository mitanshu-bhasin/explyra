## 2024-10-05 - Dynamic Aria-Labels for Stateful Toggle Buttons
**Learning:** Adding static `aria-label` attributes to icon-only buttons (like password visibility toggles) is insufficient if the button's action/state changes upon interaction. Screen readers would read "Show password" even when the button's function has become "Hide password", creating confusion.
**Action:** When implementing stateful toggle buttons, always ensure the JavaScript handler dynamically updates both the `aria-label` and `title` attributes to accurately reflect the current action/state (e.g., 'Show' vs. 'Hide').
