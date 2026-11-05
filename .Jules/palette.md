## 2025-05-15 - Add dynamic aria-labels to password toggles
**Learning:** State-dependent icon-only buttons (like password visibility toggles changing from 'eye' to 'eye-slash') need dynamic `aria-label` updates via JavaScript. Static `aria-label="Toggle password visibility"` is less helpful than explicit state labels like 'Show password' or 'Hide password'.
**Action:** Always ensure JavaScript updates accessibility attributes alongside visual class changes when toggling states on icon-only buttons.
