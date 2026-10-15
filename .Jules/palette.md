## 2025-02-18 - Stateful Button Accessibility
**Learning:** For icon-only buttons that toggle state (like showing/hiding a password), static `aria-label` and `title` attributes are insufficient because they do not reflect the current action the button will perform.
**Action:** When implementing stateful toggle buttons, ensure the JavaScript handler dynamically updates both `aria-label` (for screen readers) and `title` (for native tooltips) to accurately describe the action (e.g., switching between "Show password" and "Hide password").
