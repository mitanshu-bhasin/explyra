## 2024-05-24 - Stateful Playwright Locators
**Learning:** When testing interactive elements like a password visibility toggle that change icon classes on click, using the icon class in the locator (e.g. `has=page.locator("i.fa-eye")`) can cause subsequent checks to fail with timeouts after the class changes.
**Action:** Use a more stable selector like an adjacent sibling combinator (e.g., `#password + button`) when writing Playwright scripts for interactive icon buttons to prevent timeout failures.
