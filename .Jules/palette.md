## 2024-05-24 - Accessible Interactive Demos
**Learning:** Span elements with click handlers in demo dashboards are inaccessible to keyboard users and screen readers, hiding key interactive features.
**Action:** Always convert interactive spans/divs to `<button>` elements with proper `aria-label`s, ensuring they remain stylistically seamless by using `font-size: inherit; background: none; border: none; padding: 0;`.
