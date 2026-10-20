## 2025-02-09 - Add dynamic aria-labels to stateful icon-only buttons
**Learning:** Stateful icon-only buttons (like password visibility toggles) require dynamic updates to their `aria-label` and `title` attributes when their state changes, otherwise screen readers and hover tooltips provide inaccurate or confusing context.
**Action:** Always bind the `aria-label` and `title` updates to the same JavaScript logic that toggles the icon or visual state of the button.
