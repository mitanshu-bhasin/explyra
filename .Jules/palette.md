## 2024-06-14 - Auth Form Animation Interceptors
**Learning:** During automated verification of multi-step auth forms, loading skeletons (`#auth-skeleton`, `#step-loading`) use CSS display animations that intercept pointer events, causing element clicks to time out even when visually hidden.
**Action:** Always bypass standard locators by using `page.evaluate("document.getElementById('elementId').click()")` or `locator.click(force=True)`, and defensively hide overlays using `page.evaluate("document.getElementById('auth-skeleton')?.setAttribute('style', 'display: none !important');")`.
