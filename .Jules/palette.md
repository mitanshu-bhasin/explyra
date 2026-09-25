## 2024-05-20 - Stateful Toggle Locators and ARIA
**Learning:** Stateful interactive elements (like password visibility toggles) dynamically change their `aria-label` and icon classes upon interaction, which can cause Playwright tests relying on these attributes to time out if they attempt to locate elements post-interaction.
**Action:** Always use stable attributes, generic locators, or relative locators (e.g., `xpath=following-sibling::button`) when writing tests for stateful elements to ensure reliability.

## 2024-05-20 - Stateful Icon-Only Buttons
**Learning:** Icon-only buttons used for state toggles (like password visibility) require dynamic `aria-label` and `title` attributes that update with the state to ensure screen readers announce the correct action and visual users receive accurate tooltips. Adding a static `aria-label` to these elements is insufficient and can lead to confusing UX.
**Action:** Always bind the `aria-label` and `title` updates to the JavaScript handler that manages the state change for such buttons.
