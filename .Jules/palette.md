## 2026-04-17 - Add ARIA labels to icon-only header buttons
**Learning:** Found multiple icon-only buttons in the main navigation header (emp.html) lacking accessible names. Screen readers would not be able to announce the purpose of these buttons (e.g., sidebar toggle, notifications, profile menu).
**Action:** Added targeted `aria-label` attributes to these specific buttons. Moving forward, will proactively verify that any newly introduced icon-only interaction points include an explicit `aria-label`.
