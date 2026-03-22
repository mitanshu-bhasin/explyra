# Comp Tenant Host Bundle

This folder is prepared for hosting on `comp.explyra.me`.

## Expected tenant URL format
- `/cmp_xxxxx/admin`
- `/cmp_xxxxx/emp`
- `/cmp_xxxxx/crm`
- `/cmp_xxxxx/benifits`
- `/cmp_xxxxx/attendance/company/login`

## Notes
- Routing rules are in `_redirects`.
- Root pages remain backward-compatible on the main domain.
- Tenant branding resolves from Firestore using URL companyId first.
