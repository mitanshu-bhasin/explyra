## 2026-08-31 - Stateful Icon-only Button Accessibility
**Learning:** Icon-only toggle buttons (like password visibility) require both screen reader updates and visual user hints when state changes. Relying solely on replacing dynamic icon classes (like 'fa-eye') is insufficient.
**Action:** When implementing icon-only toggle states, dynamically update the `aria-label` (for screen readers) and the `title` (for native tooltips) alongside any icon class changes, and always use `aria-hidden="true"` on the inner icon element.
