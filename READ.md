# Explyra Business System READ

## 1. Document Intent

This document is a business-first, operations-first, and product-first deep specification for the Explyra repository.

Primary goal:
- Capture complete business capabilities across the full workspace.
- Give special deep coverage to admin and employee platforms.
- Describe actual workflows, role logic, integrations, data movement, and runtime behavior.
- Provide a maintainable structure that can be expanded into 2000 to 3000+ lines over time.

Scope includes:
- Core portals: admin and employee.
- Product modules under top-level folders.
- Backend and integration logic from Cloudflare, Firebase, API workers.
- Security and governance behavior reflected in rules and access model.
- Operations and runbook-style execution paths.

Out of scope:
- Legal interpretation.
- Contract language.
- UI text copywriting.

---

## 2. Executive Product Positioning

Explyra is not a single-purpose app. It is a business operations surface built as a multi-module ecosystem.

At business layer, the platform combines:
- Expense lifecycle management.
- Role-based approvals and governance.
- Employee operations surface (tasks, chat, profile, claims, vault).
- Admin control plane (review, approval, settings, org-level controls).
- Cross-domain modules (attendance, CRM, booking, community, email utilities, directories, integrations).

Operating model:
- Multi-tenant data architecture using company-level segregation.
- Hybrid workflow strategy: real-time Firestore listeners + API worker ingestion.
- Web-first runtime with PWA support and optional mobile shell path via Capacitor.

---

## 3. Core Business Domains

### 3.1 Expense Management Domain
- Employee claim creation.
- Multi-step manager/finance/admin decision flow.
- Reimbursement visibility and status tracking.
- Export and reporting pathways.

### 3.2 Workforce Operations Domain
- Employee tasks and execution tracking.
- Team communication and collaboration.
- Profile/account management.
- Personal financial vault.

### 3.3 Governance and Administration Domain
- Role and permission enforcement.
- Company-scoped operational control.
- Approvals queue and action logs.
- Monitoring and control knobs for organization administrators.

### 3.4 Revenue and Customer Domain
- CRM capabilities for lead/contact/deal handling.
- Booking and scheduling functionality.
- Community engagement layer.

### 3.5 Platform and Utility Domain
- PWA/offline infrastructure.
- Notifications and messaging infrastructure.
- API ingestion and external sync.
- Multi-environment deployment compatibility.

---

## 4. Top-Level Repository Business Mapping

The following is a business-readable mapping of major workspace surfaces.

- admin.html: Admin control plane UI shell.
- emp.html: Employee operations portal shell.
- js/: Core runtime logic for business behavior.
- api/: API endpoints and service-specific backend scripts.
- api-e/: Worker-based backend for company auth, API keys, and expense ingestion.
- attendance/: Attendance business module.
- crm/: CRM sales operations module.
- booking/: Booking and calendar module.
- community-hub/: Community engagement module.
- email-app/: Email-related module capabilities.
- components/: Shared UI structures and partials.
- css/: Styling layer.
- firestore.rules: Data authorization and tenancy enforcement.
- firebase.json: Runtime hosting behavior and caching controls.
- cloudflare-worker.js: Notification worker orchestration.
- sw.js and firebase-messaging-sw.js: PWA and push infrastructure.
- manifest.json: Installable application metadata.

---

## 5. Admin Portal Deep Spec (admin.html-centric)

### 5.1 Admin Portal Objective
Admin portal is the command layer for organization oversight.

Business outcomes targeted:
- Fast triage of pending expense claims.
- Company-level decision authority.
- Controlled visibility into user and workflow data.
- Operational governance through role-aware actions.

### 5.2 Admin Runtime Composition
Observed direct dependencies include:
- Environment bootstrap via js/env.js.
- Theme orchestration via js/theme.js.
- Utility services via js/utils.js.
- Export logic via js/docx-export.js.
- Main business controller via js/admin-logic.js.
- Google Drive integration via js/gdrive-service.js.
- Charting and PDF libraries.

### 5.3 Admin UI Functional Regions
Typical admin-region responsibilities:
- Overview stats cards.
- Pending claim queue.
- Filter/search and detail drill-down.
- Approval and rejection actions.
- Export controls.
- Settings and account governance actions.

### 5.4 Admin Business Workflow: Claim Review
1. Admin authenticates and enters dashboard.
2. Dashboard fetches pending and recent claims.
3. Admin selects claim and opens full details.
4. Admin validates amounts, line items, and history.
5. Admin performs action: approve or reject.
6. System writes updated status and timeline record.
7. Downstream channels notify employee through real-time updates and optional push/email.

### 5.5 Admin Workflow: Bulk Decision Handling
1. Admin selects multiple pending claims.
2. Applies consistent decision in one operation.
3. System performs batched updates where available.
4. Activity feed and statuses refresh.
5. Notifications fan out per employee target.

### 5.6 Admin Workflow: Export and Audit Support
1. Admin chooses report scope.
2. Selects format (DOCX/PDF/CSV/Sheets where enabled).
3. Export engine builds structured output.
4. Artifact is downloaded or uploaded to connected destination.

### 5.7 Admin Risks and Controls
Common control points:
- Role verification before sensitive writes.
- Company data boundary checks.
- Timeline/history on critical status transitions.
- Controlled delete capability (admin-level only by policy).

---

## 6. Employee Portal Deep Spec (emp.html-centric)

### 6.1 Employee Portal Objective
Employee portal is the execution layer where individual contributors create and manage operational records.

Business outcomes targeted:
- Low-friction expense submission.
- Self-visibility of claim lifecycle.
- Day-to-day productivity tools in one surface.
- Timely communication and task closure.

### 6.2 Employee Runtime Composition
Observed dependency pattern includes:
- js/env.js, js/theme.js, js/utils.js.
- js/docx-export.js, js/gdrive-service.js.
- Modular business scripts:
  - js/common.js
  - js/emp-utils.js
  - js/emp-notifications.js
  - js/emp-profile.js
  - js/emp-vault.js
  - js/emp-tasks.js
  - js/emp-expenses.js
  - js/emp-chat.js
  - js/emp-calls.js
  - js/emp-auth.js
  - js/emp-p2p.js

### 6.3 Employee Business Workflow: Create Expense Claim
1. User opens claim form.
2. Enters title, category/project context, amount(s), dates, and supporting details.
3. Adds one or more line items.
4. Optionally attaches proof/document.
5. Validation runs client-side.
6. Record saved to expense store with initial status.
7. User dashboard updates pending count and activity state.

### 6.4 Employee Workflow: Track Claim Status
1. Employee opens claim list/history.
2. Status chips indicate lifecycle position.
3. Timeline/history entries show approver actions and remarks.
4. On decision update, real-time sync refreshes portal view.

### 6.5 Employee Workflow: Export Personal/Claim Data
1. Employee opens export action from relevant section.
2. Chooses output format.
3. System generates artifact using in-browser export logic.
4. Optional cloud destination workflow if connected.

### 6.6 Employee Workflow: Tasks
1. Employee receives assigned tasks through real-time updates.
2. Task list supports filtering and completion updates.
3. Status transitions recorded for manager visibility.

### 6.7 Employee Workflow: Chat and Collaboration
1. User enters team or direct conversation.
2. Message stream loads with listener updates.
3. Mentions/attachments/voice paths supported where configured.
4. Optional P2P calling/session entry through call modules.

### 6.8 Employee Workflow: Personal Vault
1. User records personal expense/vault entries.
2. Data remains user-isolated.
3. Dashboard aggregates spending trends per category/time.

---

## 7. Admin vs Employee Capability Matrix

| Capability | Admin | Employee |
|---|---|---|
| Submit expense | Yes | Yes |
| View own expenses | Yes | Yes |
| View company expenses | Role-dependent | Limited/role-dependent |
| Approve/reject expenses | Yes | No |
| Bulk review actions | Yes | No |
| Manage org settings | Yes | No |
| Manage users/roles | Yes | No |
| Task assignment | Yes | Limited self/personal |
| Task completion | Yes | Yes |
| Chat access | Yes | Yes |
| P2P call integration | Yes (if enabled in UI path) | Yes |
| Personal vault | Yes | Yes |
| Audit log visibility | Admin-level | No |

---

## 8. Expense Lifecycle Technical Flow

### 8.1 Initial Submission Stage
- Source: Employee portal forms and API ingestion channels.
- Validation: Required title, amount, company and user references.
- Persistence: Expense document creation.
- Initial status: Pending manager/approval stage depending on policy.

### 8.2 Review and Decision Stage
- Actor: Company admin/finance role or master admin path.
- Inputs: Line items, comments, proof links, history.
- Actions: Approve, reject, escalate.
- Effect: Status mutation + append history event.

### 8.3 Completion Stage
- Final state transitions include paid/closed or rejected.
- Employee receives updated visibility through listeners/notifications.
- Export/reporting can reflect final reconciled state.

### 8.4 Data Shape (Business-Oriented)
Typical expense record fields:
- companyId
- userId
- userName
- userEmail
- title
- totalAmount
- currency
- status
- type
- projectCode
- lineItems
- history
- createdAt
- updatedAt

---

## 9. API-E Worker Business Integration (api-e)

### 9.1 Purpose
api-e worker enables backend-centric onboarding and integrations outside direct UI.

### 9.2 Company Registration Flow
- Input: company id, admin email, admin password.
- Behavior: validate required fields, check duplicate, hash password, store company metadata.
- Output: success response with company identifier.

### 9.3 Admin Login Flow
- Resolve company by admin email mapping.
- Verify hashed password.
- Generate JWT and session token.
- Persist session with TTL and return auth tokens.

### 9.4 API Key Lifecycle
Supported operations in worker logic:
- Create API key with label.
- List API keys by company.
- Update key status (revoked/unrevoked).
- Revoke key.
- Delete key.

### 9.5 Expense Ingestion from API Client
- External system submits expense payload using API key auth model.
- Worker normalizes payload to Firestore document field structure.
- Writes to expenses collection with default pending status.
- Returns sync success/failure behavior.

---

## 10. Cloudflare Notification Worker Spec

### 10.1 Purpose
Central relay for dispatching push notifications to FCM tokens.

### 10.2 Endpoints
- /health: service health check.
- /notify: authenticated notification dispatch endpoint.

### 10.3 Auth Model
- Bearer token check against configured/embedded token.

### 10.4 Notification Dispatch Behavior
- Accept subscriptions list and message payload.
- Mint access token for Google API.
- Iterate tokens and call FCM send endpoint.
- Return per-token results for operational feedback.

### 10.5 Operational Concerns
- Token freshness management.
- Retry and dead-token pruning strategy.
- Protect service credentials and signing material.

---

## 11. Firestore Security Rules: Business Interpretation

The rules file encodes the effective governance policy for data visibility and mutations.

### 11.1 Identity and Role Functions
Core helper concepts:
- isSignedIn.
- isMasterAdmin.
- getUserData.
- isCompanyMember.
- isCompanyAdmin.
- isOwner.

### 11.2 Key Access Policies
- Users collection: signed-in reads, owner/admin updates, admin deletes.
- Companies collection: company member-scoped subcollection access.
- Expenses: owner/admin/membership read model and guarded create/update/delete.
- Personal vault and financial accounts: strict owner isolation.
- CRM/tasks/projects/chats: company membership or elevated roles.
- Notifications: owner-scoped read/write.
- Audit logs: admin read and signed-in create.

### 11.3 Governance Layer
- Dedicated admin collection for elevated privilege checks.
- Public intake paths for specific request collections.
- Global fallback denies by default.

---

## 12. Product Module Catalog by Folder

### 12.1 Core Portal Layer
- admin.html
- emp.html
- emp.js
- emp.css
- js/* core modules

### 12.2 Attendance Module
Folder: attendance/
- Company attendance operations.
- School attendance variant.
- Shared attendance utilities and analytics.

Business value:
- Daily presence visibility.
- Attendance trending.
- Workforce consistency controls.

### 12.3 CRM Module
Folder: crm/
- Lead management.
- Contact management.
- Deal/pipeline progression.
- CRM analytics and support tooling.

Business value:
- Revenue pipeline management.
- Sales process standardization.
- Forecast and opportunity tracking.

### 12.4 Booking Module
Folder: booking/
- Calendar-driven scheduling workflows.
- Slot and request handling.

Business value:
- Structured appointment/resource management.
- Reduced scheduling conflict overhead.

### 12.5 Community Module
Folder: community-hub/
- Feed, thread, moderation, profile, search.

Business value:
- Internal engagement.
- Informal knowledge flow.
- Cross-team interaction layer.

### 12.6 Email Utility Domain
Folder: email-app/ and related API surfaces.
- Domain and mailbox lifecycle pathways.
- Received email storage model reflected in rules.

Business value:
- Extended SaaS utility offerings beyond expenses.

### 12.7 Additional Business Surfaces
Examples across root folders:
- directories/
- compare/
- developers/
- dns/
- events/
- docs/
- services/
- solutions/
- press/
- status/

These represent growth surfaces for marketing, service expansion, business enablement, and operational support.

---

## 13. Integration Map

### 13.1 Firebase Stack
- Auth for identity.
- Firestore for live business data.
- Storage for artifacts and attachments.
- Messaging for push paths.

### 13.2 Google Platform Integrations
- Google Drive and Sheets export/connectivity through gdrive-service.
- Google auth libraries used in frontend runtime.

### 13.3 Notification Stack
- FCM token storage in user context.
- Cloudflare worker relay for notification dispatch.
- Frontend listeners as second channel fallback.

### 13.4 Document and Export Stack
- DOCX generation library integration.
- PDF generation path.
- CSV and sheet-based export workflows.

### 13.5 Realtime and Communication
- Firestore listeners for live updates.
- Chat and call-related modules for collaboration.

---

## 14. Data Entity Summary (Business Schema View)

### 14.1 users
Purpose:
- Identity profile and role placement.

Key fields:
- name, email, role, companyId, department, profile flags, tokens.

### 14.2 companies
Purpose:
- Tenant root for organization-level data.

Key fields:
- name, plan, owner/admin metadata, settings.

### 14.3 expenses
Purpose:
- Reimbursement and spending workflow records.

Key fields:
- user linkage, amount fields, status, lineItems, history, timestamps.

### 14.4 tasks
Purpose:
- Work assignment and completion tracking.

Key fields:
- assignedTo, assignedBy, status, dueDate, priority, companyId.

### 14.5 projects
Purpose:
- Cost center and project coding support.

Key fields:
- project code, budget references, ownership, active flags.

### 14.6 chats and notifications
Purpose:
- Internal communication and alert propagation.

Key fields:
- participants/companyId/messages and target user metadata.

### 14.7 personal_vault and financial_accounts
Purpose:
- User-private finance records.

Security model:
- Strict owner-only access.

### 14.8 crm_leads, crm_contacts, crm_deals
Purpose:
- Sales/customer lifecycle management.

Key fields:
- stage, value, ownership, companyId, lifecycle metadata.

### 14.9 custom_domains, mailboxes, received_emails
Purpose:
- Email utility data lifecycle.

Model highlights:
- User-owned domain records.
- Mailbox ownership checks.
- Backend-write-only pattern for received email ingestion.

### 14.10 audit_logs
Purpose:
- Governance and traceability layer.

Key fields:
- actor, action, resource, company scope, timestamp, details.

---

## 15. Admin Feature Specification Catalog

### 15.1 Dashboard and Executive Snapshot
- Pending volume visibility.
- Approved/rejected trend markers.
- Quick action routing.

### 15.2 Approval Queue and Claim Details
- Itemized claim inspection.
- Timeline and remark support.
- Status transition controls.

### 15.3 Reporting and Export Controls
- Format-based output generation.
- Business-friendly data extraction.

### 15.4 User and Organization Controls
- Role-aware visibility.
- Company-level governance actions.

### 15.5 Communication Oversight
- Notification and signal propagation support.
- Chat/call module awareness depending on role exposure.

---

## 16. Employee Feature Specification Catalog

### 16.1 Dashboard and Personal Work Surface
- Current claim states.
- Activity feed and indicators.
- Personal quick actions.

### 16.2 Claim Submission and Tracking
- Multi-line item claims.
- Validation and storage.
- Lifecycle visibility.

### 16.3 Task Execution Workspace
- Assigned/personal task buckets.
- Progress and completion updates.

### 16.4 Collaboration Workspace
- Real-time chat streams.
- File/voice/mention pathways.
- Session/call integration.

### 16.5 Profile and Integrations
- Profile updates.
- Credential/account actions.
- Export and third-party connection support.

### 16.6 Personal Vault
- Category-based entry tracking.
- Personal trend visibility.

---

## 17. End-to-End Workflow Blueprints

### 17.1 Blueprint A: Employee Expense to Final Decision
1. Employee creates claim.
2. Validation passes.
3. Expense created with pending status.
4. Admin queue receives item.
5. Reviewer takes decision.
6. Status and history update.
7. Employee sees real-time updated outcome.
8. Optional export/payment reconciliation follows.

### 17.2 Blueprint B: API Partner Expense Ingestion
1. Partner authenticates via API key.
2. Worker validates key and maps payload.
3. Firestore expense document is created.
4. Admin queue includes API-origin claims.
5. Normal governance workflow continues.

### 17.3 Blueprint C: Notification Dispatch
1. Trigger condition occurs (status update or event).
2. Subscription/token list assembled.
3. Cloudflare worker relay sends FCM messages.
4. Client receives push and/or real-time listener update.

### 17.4 Blueprint D: User Onboarding and Access
1. User account created under tenant context.
2. Role assigned in user profile.
3. Access scope enforced by rules.
4. User gains portal-specific capabilities.

---

## 18. Operational Runbook

### 18.1 Daily Business Operations
- Monitor pending approvals.
- Clear blocked claim states.
- Verify notification health.
- Track user onboarding requests.

### 18.2 Weekly Operations
- Export summary reports.
- Audit unusual claim patterns.
- Check integration failures and token drift.
- Review role assignments and permission hygiene.

### 18.3 Monthly Operations
- Reconcile approval cycle timings.
- Validate archive/export readiness.
- Review cost center/project usage trends.
- Rotate secrets/tokens in integration layer.

### 18.4 Incident Handling Pattern
1. Detect failure via UI symptoms, logs, or user report.
2. Identify domain: auth, data, notifications, export, or API.
3. Contain impact using role or feature toggles where possible.
4. Recover service path and replay missed operations if needed.
5. Document incident in audit and operations notes.

---

## 19. Common Failure Modes and Business Impact

| Failure Mode | Impact | First Response |
|---|---|---|
| Auth failures | Users blocked from portal access | Verify provider status and account mapping |
| Firestore write failures | Claims/tasks not persisted | Retry path and error reporting validation |
| Notification worker failure | Delayed user awareness | Fall back to in-app real-time listeners |
| Export generation issues | Reporting delays | Switch format or rebuild export payload |
| API key revocation errors | External ingestion blocked | Validate key status and company binding |
| Mis-scoped permissions | Data access risk or lockout | Review user role and rules assumptions |

---

## 20. Security and Governance Notes

### 20.1 Tenant Isolation
Business data is scoped around company membership and role checks at rule level.

### 20.2 Elevated Access Paths
Master-admin and company-admin capabilities exist and should be tightly governed.

### 20.3 Owner-Isolated Data
Personal vault and financial account records enforce owner-only access patterns.

### 20.4 Auditability
Audit logs and mutation history paths support forensic review.

### 20.5 Secret Hygiene Requirement
Credential material should remain externally managed and rotated by policy.

---

## 21. Deployment and Environment Behavior

### 21.1 Hosting
- Firebase hosting with cache and rewrite behavior.

### 21.2 Worker Deployment
- Cloudflare worker for notification and api-e operational paths.

### 21.3 Client Build
- Node-based build scripts and static deployment outputs.

### 21.4 PWA Behavior
- Service worker and manifest provide installability and partial offline capability.

---

## 22. Engineering to Business Traceability Matrix

| Engineering Component | Business Capability |
|---|---|
| admin.html + js/admin-logic.js | Approval governance and org control |
| emp.html + js/emp-expenses.js | Employee claim submission lifecycle |
| js/emp-tasks.js | Work allocation and completion tracking |
| js/emp-chat.js + js/emp-p2p.js | Team collaboration and communication |
| js/docx-export.js | Operational reporting and evidence export |
| js/gdrive-service.js | External report destination connectivity |
| api-e/worker/src/admin.js | Company auth and API access control |
| api-e/worker/src/firebase.js | Partner ingestion to core expense flow |
| cloudflare-worker.js | Cross-channel push notification delivery |
| firestore.rules | Tenant-safe data governance model |

---

## 23. Recommended Next Expansion Blocks (for 2000 to 3000+ line target)

This current document is structured for immediate depth and easy expansion.

Suggested expansion sequence:
- Block 1: Field-by-field schema dictionary for each major collection.
- Block 2: UI interaction map for every admin and employee screen state.
- Block 3: Full API endpoint contract docs (request, response, error matrix).
- Block 4: Sequence diagrams for each end-to-end workflow.
- Block 5: Operational metrics and SLA definitions by module.
- Block 6: Test strategy matrix mapping business risk to verification coverage.
- Block 7: Incident playbooks by integration provider.
- Block 8: Detailed onboarding/offboarding process maps.
- Block 9: Role-specific SOP documents (Admin, Finance, Manager, Employee).
- Block 10: Compliance evidence mapping (if required by org policy).

---

## 24. Immediate Action Checklist for Product and Ops Teams

- Validate role matrix against live org design.
- Confirm approval chain states for each tenant type.
- Verify all notification channels with test user groups.
- Validate export outputs against finance reporting requirements.
- Review API key lifecycle policy and revocation SOP.
- Audit master-admin access governance and alerting.
- Confirm backup and restore expectations for critical datasets.

---

## 25. Living Document Status

Status: Active living specification.

Update rule:
- Every major feature change in admin or employee modules should update this document in the same release cycle.

Minimum update sections for each release:
- Changed business flow.
- New data fields.
- New permissions.
- Integration behavior changes.
- Operational runbook impact.

---

## 26. Appendix A: Quick Business Glossary

- Claim: Employee-submitted reimbursement request.
- Line Item: Individual expense component inside claim.
- Tenant: Company-scoped organizational data boundary.
- Approval Chain: Ordered decision stages from submission to final outcome.
- API Key: External integration credential for worker endpoints.
- Vault: User-private expense tracking space.
- Audit Log: Historical record of significant actions.

---

## 27. Appendix B: High-Level Workflow Pseudocode

### 27.1 Expense Submit
if user_authenticated and form_valid then
- create expense
- set initial status
- append history
- notify queue listeners
else
- show validation or auth error

### 27.2 Approval Update
if actor_role in allowed_roles and tenant_scope_valid then
- update status
- append history event
- trigger notification
else
- deny action and log event

### 27.3 API Ingest
if api_key_valid and not_revoked then
- normalize payload
- write expense doc
- return success
else
- return auth/validation error

---

## 28. Appendix C: Directory Expansion Candidates

Potentially high-business-impact folders for deeper future documentation pass:
- explyra-learning/
- health-manager/
- Ino software/
- Utilites/
- manufacturing/
- integrations/
- services/
- skill/
- views/
- updates/

Each of these can become a dedicated child document under docs/ with linked index references.

---

## 29. Final Notes

This READ file is intentionally business-heavy and workflow-heavy.

It is designed to be:
- Useful for product leads.
- Actionable for engineering leads.
- Clear for operations and implementation teams.

Most importantly, it gives immediate deep visibility into admin and employee workflows while keeping full-repository module coverage in one place.

---

## 30. Admin SOP: Daily, Weekly, Monthly

### 30.1 Daily SOP
1. Login and verify dashboard counters are loading correctly.
2. Open pending claims queue and sort by oldest first.
3. Resolve stuck claims where status has not changed within SLA.
4. Confirm employee-facing notifications are propagating.
5. Review audit trail entries for unusual write patterns.

### 30.2 Weekly SOP
1. Export weekly approval summary.
2. Validate top spend categories and outlier claims.
3. Review role assignments for newly onboarded users.
4. Check API key list for dormant or suspicious keys.
5. Confirm notifications and worker endpoints health status.

### 30.3 Monthly SOP
1. Generate month-end claim and reimbursement reports.
2. Review rejection reasons for policy refinement.
3. Reconcile finance status with approved and paid states.
4. Rotate sensitive tokens and key material as policy requires.
5. Run tenant-level access review for least-privilege hygiene.

---

## 31. Employee SOP: Daily and Claim-Specific

### 31.1 Daily SOP
1. Review notifications and assigned tasks.
2. Update task status before end of day.
3. Check pending claim states and action comments.
4. Maintain profile metadata if required by policy.

### 31.2 Expense Submission SOP
1. Prepare complete line-item breakdown.
2. Confirm category and project mapping are correct.
3. Attach supporting evidence where policy requires.
4. Review totals and submit once validated.
5. Track approval comments for corrective follow-up.

### 31.3 Rejection Recovery SOP
1. Open rejected claim details.
2. Read reviewer comments.
3. Correct values, categories, or evidence gaps.
4. Resubmit as fresh or updated entry based on policy.

---

## 32. Status Transition Matrix (Expense)

| From State | Allowed To State | Typical Actor | Business Meaning |
|---|---|---|---|
| DRAFT | SUBMITTED | Employee | Claim entered into governance flow |
| SUBMITTED | PENDING_MANAGER | System/Policy | Routed to first reviewer |
| PENDING_MANAGER | PENDING_FINANCE | Manager/Admin | Manager approval complete |
| PENDING_MANAGER | REJECTED | Manager/Admin | Claim denied at first review |
| PENDING_FINANCE | PENDING_TREASURY | Finance/Admin | Finance approval complete |
| PENDING_FINANCE | REJECTED | Finance/Admin | Claim denied at finance review |
| PENDING_TREASURY | PAID | Treasury/Admin | Payment confirmed |
| PENDING_TREASURY | REJECTED | Treasury/Admin | Final stage rejection |
| REJECTED | RESUBMITTED | Employee | Corrected and returned to flow |

Notes:
- Exact states may vary per tenant policy.
- Timeline/history array should preserve every state action.

---

## 33. Claim Validation Matrix

| Field | Required | Validation Type | Failure Behavior |
|---|---|---|---|
| title | Yes | Non-empty text | Block submit and show field error |
| totalAmount | Yes | Numeric and positive | Block submit |
| companyId | Yes | Tenant context available | Block write |
| userId | Yes | Authenticated identity | Block write |
| lineItems | Conditional | Array with valid entries | Block submit or normalize |
| currency | Recommended | Known code | Default or warning |
| projectCode | Tenant policy based | Existing code or category | Warning or block |

---

## 34. Data Dictionary: users

| Field | Type | Description | Scope |
|---|---|---|---|
| uid | string | Unique user id | Global |
| name | string | Display name | Tenant |
| email | string | Login and communication identity | Tenant |
| role | string | Permission role | Tenant |
| companyId | string | Tenant binding | Tenant |
| department | string | Optional org metadata | Tenant |
| photoUrl | string | Avatar/profile image | User |
| fcmToken | string | Push notification token | User device |
| twoFactorEnabled | boolean | Additional auth requirement | User |

---

## 35. Data Dictionary: expenses

| Field | Type | Description | Scope |
|---|---|---|---|
| id | string | Document id | Tenant |
| companyId | string | Tenant isolation key | Tenant |
| userId | string | Claim owner | Tenant |
| userEmail | string | Human-readable owner identity | Tenant |
| title | string | Claim title | Tenant |
| totalAmount | number/string | Sum of claim amount | Tenant |
| currency | string | Currency code | Tenant |
| status | string | Lifecycle position | Tenant |
| projectCode | string | Cost/project mapping | Tenant |
| lineItems | array | Itemized components | Tenant |
| history | array | Action audit sequence | Tenant |
| createdAt | timestamp | Creation time | Tenant |
| updatedAt | timestamp | Last mutation time | Tenant |

---

## 36. Data Dictionary: tasks

| Field | Type | Description | Scope |
|---|---|---|---|
| id | string | Task id | Tenant |
| title | string | Task summary | Tenant |
| description | string | Detail text | Tenant |
| assignedTo | string | Assignee user/email | Tenant |
| assignedBy | string | Manager/admin actor | Tenant |
| status | string | Pending/In progress/Complete | Tenant |
| dueDate | timestamp/string | Deadline marker | Tenant |
| type | string | Company or personal | Tenant/User |
| companyId | string | Tenant binding | Tenant |

---

## 37. Data Dictionary: notifications

| Field | Type | Description | Scope |
|---|---|---|---|
| id | string | Notification id | User/Tenant |
| title | string | Notification title | User/Tenant |
| body | string | Notification body | User/Tenant |
| userId/targetUserId | string | Intended recipient | User |
| companyId | string | Tenant boundary | Tenant |
| type | string | Category of event | Tenant |
| readBy | array | Read state markers | User/Tenant |
| createdAt | timestamp | Created time | User/Tenant |

---

## 38. API Contract Skeleton (api-e worker)

### 38.1 Register Company
Path:
- POST /register

Request body:
- id
- admin_email
- admin_password

Response success:
- message
- company_id

Error classes:
- missing_fields
- company_exists

### 38.2 Admin Login
Path:
- POST /login

Request body:
- admin_email
- admin_password

Response success:
- token
- session_token

Error classes:
- auth_failed

### 38.3 Create API Key
Path:
- POST /api-keys

Auth:
- Bearer JWT

Body:
- label (optional)

Response:
- api_key
- message

### 38.4 List API Keys
Path:
- GET /api-keys

Auth:
- Bearer JWT

Response:
- keys array

### 38.5 Update API Key Status
Path:
- PATCH /api-keys/status

Body:
- api_key
- revoked (boolean)

### 38.6 Delete API Key
Path:
- DELETE /api-keys

Body:
- api_key

### 38.7 Revoke API Key
Path:
- POST /api-keys/revoke

Body:
- api_key

### 38.8 Submit Expense (integration path)
Path:
- POST /expenses

Auth:
- API key bearer

Body:
- amount
- date
- category
- note
- optional user identity fields

Behavior:
- Normalize and sync to Firestore expenses collection.

---

## 39. Notification Dispatch Contract Skeleton

### 39.1 Health
Path:
- GET /health

Response:
- status: ok

### 39.2 Notify
Path:
- POST /notify

Auth:
- Authorization: Bearer <token>

Request body:
- subscriptions: array of objects with fcmToken
- message: title, body, optional data

Response:
- success boolean
- results array per target token

---

## 40. Admin UI State Model

### 40.1 Key States
- Loading dashboard.
- Dashboard ready.
- Claim detail open.
- Decision action in progress.
- Decision write success.
- Decision write failure.
- Export in progress.
- Export complete/failure.

### 40.2 Error UX Expectations
- Toast with failure class and clear next step.
- Retry path for network/transient faults.
- Preserve user context when mutation fails.

---

## 41. Employee UI State Model

### 41.1 Key States
- Login gate.
- Dashboard hydration.
- Claim form editing.
- Validation failed.
- Submit in progress.
- Submit success.
- Task update in progress.
- Notification sync pending.

### 41.2 Draft and Recovery
- Draft caching for partially completed claims.
- Recovery prompt when stale draft exists.
- Expiration policy to avoid stale clutter.

---

## 42. KPI Framework for Business Teams

### 42.1 Approval Efficiency KPIs
- Median time from submission to first review.
- Median time from first review to final state.
- Percentage of claims resolved within SLA.

### 42.2 Quality KPIs
- Rejection rate by category.
- Resubmission success ratio.
- Missing evidence ratio.

### 42.3 Operations KPIs
- Notification delivery success ratio.
- API ingestion success/failure ratio.
- Export generation success ratio.

### 42.4 Engagement KPIs
- Daily active employees on portal.
- Task completion velocity.
- Collaboration event density (chat/call usage).

---

## 43. Testing Strategy Mapping (Business Risk to Validation)

| Business Risk | Test Type | Minimum Coverage Goal |
|---|---|---|
| Wrong approval permissions | Rules and integration tests | 100 percent critical path |
| Claim data corruption | Create/update flow tests | High priority categories |
| Notification silence | Worker and client integration tests | Daily health checks + staged tests |
| API key misuse | Worker auth tests | Full lifecycle path |
| Export mismatch | Snapshot and schema tests | Core report templates |

---

## 44. Role-Specific Working Guidelines

### 44.1 For Finance Manager
- Focus on value validation and policy alignment.
- Maintain clean comment trail for each decision.
- Watch repeated category anomalies.

### 44.2 For Company Admin
- Maintain role hygiene.
- Keep queue aging under control.
- Align approval actions with policy updates.

### 44.3 For Employees
- Submit complete itemized records.
- Respond quickly to reviewer comments.
- Keep profile and payout information current.

---

## 45. Documentation Maintenance Template

For every release, add one block:

Release:
- version/date

Changed modules:
- list

Workflow changes:
- list

Data schema changes:
- list

Permission changes:
- list

Integration changes:
- list

Runbook changes:
- list

---

## 46. Long-Form Expansion Grid

Target: reach 2000 to 3000+ lines with practical value.

Expansion table:

| Chapter | Current Depth | Target Depth |
|---|---|---|
| Admin workflows | Medium | Very high with per-screen SOP |
| Employee workflows | Medium | Very high with edge-case matrix |
| API contracts | Skeleton | Full request/response examples |
| Data dictionaries | Partial | Full per-collection schema |
| Incident playbooks | Basic | Detailed fault trees |
| KPI and SLA | Basic | Team-specific dashboards |
| Testing traceability | Basic | Full risk-driven matrix |

---

## 47. Suggested Child Documents Under docs/

Recommended split files for scale:
- docs/business/admin-workflows.md
- docs/business/employee-workflows.md
- docs/business/data-dictionary.md
- docs/business/api-contracts.md
- docs/business/integration-architecture.md
- docs/business/runbooks.md
- docs/business/kpi-and-sla.md
- docs/business/security-and-governance.md

This READ.md can remain the indexed parent document.

---

## 48. Closing Statement

This file is now a detailed business-read specification starter with strong depth for admin and employee systems and broad product coverage for the full workspace.

Next step for maximum value:
- Continue in the same structure by adding per-module deep dives and real request/response examples until your desired 2000 to 3000+ line depth is achieved.
