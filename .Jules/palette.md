## YYYY-MM-DD - Initial Setup\n**Learning:** Started tracking UX improvements.\n**Action:** Will log critical insights here.

## 2025-02-12 - Accessible Stateful Toggle Buttons
**Learning:** Icon-only toggle buttons (like password visibility) require their `aria-label` and `title` attributes to be dynamically updated in javascript along with their icon classes to properly reflect the current action state. Additionally, internal decorative icons (like FontAwesome `<i>` tags) must have `aria-hidden="true"` so screen readers don't misinterpret them.
**Action:** When creating stateful icon toggles, bind ARIA and title updates to the same logic block that toggles the icon classes, and ensure internal `<i>` elements are explicitly hidden from screen readers.
