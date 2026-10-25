## 2024-10-25 - Dynamic ARIA labels for stateful toggles
**Learning:** Icon-only stateful toggle buttons (like password visibility) need dynamic `aria-label` and `title` attributes that update when their state changes (e.g. "Show password" -> "Hide password") to remain accessible and accurate.
**Action:** Always ensure the JS logic that handles the visual toggle (e.g. switching the eye icon) also updates the `aria-label` and `title` attributes on the button element simultaneously.
