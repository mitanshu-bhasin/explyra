
## 2026-08-09 - Dynamically updating aria-labels for stateful toggle buttons
**Learning:** Stateful toggle buttons (like password visibility) that only use icons often have static aria-labels. When the state changes (from hidden to shown), the aria-label and title should dynamically update to reflect the *next* available action to remain accessible to screen readers and provide correct hover tooltips.
**Action:** Add dynamic attributes (`aria-label` and `title`) to the button element in the toggle function alongside the visual icon change.
