## 2026-07-26 - Dynamic ARIA labels for toggling state
**Learning:** When dealing with stateful icon-only buttons (like password visibility toggles), the `aria-label` and `title` attributes must be dynamically updated via JavaScript to accurately reflect the current action/state (e.g., 'Show password' vs. 'Hide password').
**Action:** Ensure the associated JavaScript handler updates the `aria-label` and `title` attributes in addition to toggling the icon class.
