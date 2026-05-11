## 2024-05-24 - Redundant ARIA Labels
**Learning:** Added aria-labels to buttons that already had clear text (like 'Run Code' or 'Do Not Click') is an anti-pattern and redundant for screen readers.
**Action:** Only apply aria-labels to icon-only buttons or visually ambiguous interactive elements, such as the '#addExpense' button.
