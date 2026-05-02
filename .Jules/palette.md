## 2026-05-02 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Many functional views in the app use FontAwesome icons as interactive buttons, which often lack `aria-label` attributes. This pattern leads to poor screen reader accessibility.
**Action:** Always add `aria-label` attributes to buttons that only contain icons to ensure they are accessible to screen reader users.
