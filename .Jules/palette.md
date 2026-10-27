## 2023-10-27 - Dynamic attributes on stateful icon-only buttons
**Learning:** Screen readers and visual tooltips for icon-only toggle buttons (like password visibility) can become out of sync or unhelpful if they do not update to reflect the current state (e.g. they always say "Toggle" instead of "Show" or "Hide").
**Action:** When implementing toggle functionality, dynamically update both `aria-label` and `title` attributes within the JavaScript event handler to accurately describe the specific action the button will perform next.
