## 2024-05-18 - Missing ARIA Labels on Password Visibility Toggles
**Learning:** Found an accessibility issue pattern specific to this app's authentication components (`login.html`, `signup.html`): password visibility toggles (`fa-eye` icons) lack `aria-label`s and `title`s, which makes them inaccessible to screen readers and doesn't provide visual hover tooltips.
**Action:** Add dynamic `aria-label` and `title` attributes that update based on the current state ("Show password" vs. "Hide password") to all such toggles.
