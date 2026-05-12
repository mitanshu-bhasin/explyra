## 2025-05-12 - Decorative Elements

**Learning:** When making accessibility improvements, do not convert purely decorative visual elements (e.g., icons without attached JavaScript event listeners) into interactive elements like `<button>`, as this creates confusing 'dead buttons' that harm the user experience.
**Action:** Always verify if an element has an attached action or event listener before converting it to an interactive component.
