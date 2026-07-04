## 2024-05-18 - Dynamic ARIA Labels for Stateful Toggles
**Learning:** When using stateful icon-only toggles (like password visibility), a static `aria-label` like "Toggle password visibility" is insufficient. Screen reader users need to know the *action* they are about to perform or the *current state*.
**Action:** Always bind the `aria-label` and `title` attributes to the JavaScript state handler, updating them to explicitly say "Show [item]" or "Hide [item]" as the state changes.
