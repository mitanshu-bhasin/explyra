## 2026-04-26 - Missing aria-labels on icon-only buttons
**Learning:** Icon-only navigation and utility buttons (like theme toggles or mobile menus) across the application often lack proper `aria-label` attributes. This impacts screen reader users who cannot understand the purpose of the buttons without visual icons.
**Action:** Always verify that every `<button>` element containing only icons (like FontAwesome `<i>` tags) has a descriptive `aria-label` attribute explaining its action.
