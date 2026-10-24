## 2024-05-18 - Fix out of sync lockfiles causing CI failures
**Learning:** Found an issue where `npm ci` failures occurred in CI due to out-of-sync package-lock.json files in subprojects like `will/` that were not resolved correctly previously.
**Action:** Always sync the lockfile using `npm install --package-lock-only` within the specific subproject experiencing the `npm ci` failure to keep CI pipelines passing.
