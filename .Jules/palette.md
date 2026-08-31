## 2024-05-24 - Accessibility and icon buttons
**Learning:** Found several icon-only buttons across the app without `aria-label` attributes. This makes them inaccessible to screen readers.
**Action:** Adding `aria-label` to icon-only buttons like those in the expense manager and other dashboard components is a simple but highly impactful UX/accessibility improvement. I'll pick a few of the most central ones and add ARIA labels.
