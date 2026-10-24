## 2024-05-18 - Fix absolute paths in CSS imports breaking Vite builds
**Learning:** Found an issue where Vite fails to build a subproject (`will/`) when an imported CSS file (`assets/css/global-theme.css`) uses an absolute path (`@import url('/css/explyra-tokens.css')`). Vite attempts to resolve this relative to the subproject root, leading to an `ENOENT` error.
**Action:** Changed the import in `assets/css/global-theme.css` to use a relative path (`@import url('../../css/explyra-tokens.css')`) to ensure it works correctly across all contexts, including Vite subproject builds.
