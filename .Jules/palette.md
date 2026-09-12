## 2024-05-10 - ARIA Labels for Dynamic Password Toggle
**Learning:** Found some icon-only buttons missing aria-labels and tooltips, specifically the togglePasswordVisibility button in login.html and signup.html. When state changes, we must dynamically update aria-label and title.
**Action:** Need to add aria-labels and title tags to togglePasswordVisibility buttons, and update them dynamically in the togglePasswordVisibility JS function.
