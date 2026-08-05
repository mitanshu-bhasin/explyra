## 2024-08-05 - Add ARIA Labels to Password Toggles
**Learning:** Icon-only interactive elements (like eye icons for password visibility) need dynamic `aria-label` attributes to ensure screen reader users are informed of both the element's purpose and its current state.
**Action:** Add dynamic updates for `aria-label` and `title` in state-toggling JavaScript functions, and ensure purely decorative internal icons have `aria-hidden="true"`.
