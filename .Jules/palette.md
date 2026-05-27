## 2024-05-27 - Playwright Playwright interactions with auth forms
**Learning:** When using Playwright to interact with complex multi-step auth forms, standard locator clicks may fail due to layout animations or intercepting overlays, or if multiple buttons have the same name.
**Action:** Use specific locators with IDs like `#identifierBtn` or `#profileBtn` to bypass multiple element resolution or use `.click(force=True)` or `page.evaluate()` to bypass overlays.
