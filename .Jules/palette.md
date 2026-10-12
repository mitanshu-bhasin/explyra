## 2023-10-24 - Dynamic ARIA Labels for Stateful Toggles
**Learning:** Stateful toggles (like password visibility) that only use static class changes (e.g., changing a FontAwesome icon) leave screen reader users without context about the current state or the action that will be performed.
**Action:** When creating or updating interactive icon toggles, ensure the associated JavaScript handler dynamically updates both the `aria-label` and `title` attributes to accurately reflect the action that clicking the button will perform (e.g., 'Show password' vs. 'Hide password').
