## 2026-05-16 - Add aria-label to toggle password visibility buttons
**Learning:** Found icon-only buttons in login and signup forms for toggling password visibility lacking `aria-label` attributes. Without ARIA labels, screen readers won't be able to announce the purpose of these buttons to visually impaired users, impacting accessibility negatively.
**Action:** Always verify icon-only interactive elements like buttons have descriptive `aria-label` attributes, especially in critical paths like authentication.
