## 2024-05-18 - Missing ARIA Labels on Toggle Password Visibility Buttons
**Learning:** Icon-only buttons used to toggle password visibility do not have ARIA labels or titles. Furthermore, the `window.togglePasswordVisibility` logic does not dynamically update `aria-label` or `title` to reflect the action state (Show vs. Hide).
**Action:** Add static `aria-label` and `title` to the buttons and update the JavaScript toggler to dynamically set these attributes for better accessibility.
