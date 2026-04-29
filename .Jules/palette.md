## 2026-04-29 - Accessibility Issue Pattern in Modals
**Learning:** Found a recurring accessibility pattern across the application where modal close buttons (using FontAwesome 'fa-xmark' icons) consistently lack ARIA labels. This indicates a potential gap in the design system's modal component template, making these interactive elements invisible to screen readers.
**Action:** Implemented 'aria-label' on identified modal close buttons. Will monitor future modal implementations and advocate for updating the base modal template to enforce accessible close buttons by default.
