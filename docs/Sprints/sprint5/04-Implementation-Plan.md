# Sprint 5 — Implementation Plan

## 1. Purpose
This is the main execution document for the coding agent.

## 2. Required Order

### Phase 1 — Inspect
- Inspect repository structure.
- Inspect existing Sprint 1–4 implementation.
- Inspect authentication/authorization.
- Inspect current Prisma schema.
- Inspect existing API/OpenAPI conventions.
- Inspect existing frontend conventions.
- Identify reusable components/services.

### Phase 2 — Freeze Scope
- Confirm Sprint 5 requirements.
- Confirm API contract.
- Confirm database impact.
- Record unresolved dependencies before coding.

### Phase 3 — Database
- Apply only approved database changes.
- Generate/update Prisma migration when required.
- Validate relations, constraints, and indexes.
- Do not rewrite unrelated models.

### Phase 4 — Backend
Implement in the project's established order:
1. Route/controller
2. Request validation
3. Authorization
4. Service/domain logic
5. Persistence
6. File/storage integration
7. Processing integration
8. Moderation queue creation
9. Error handling
10. Logging/audit behavior

Use existing backend patterns wherever possible.

### Phase 5 — Frontend
Implement:
1. Upload interface
2. Validation feedback
3. Upload state
4. API integration
5. Success/error handling
6. Moderation-pending/status feedback

### Phase 6 — Integration
Verify:
**Login → Upload → Validate → Submit → Persist → Process/Store → Moderation Queue**

### Phase 7 — Cleanup
- Remove temporary/debug code.
- Update documentation.
- Verify migrations.
- Verify tests.
- Review changed files for unrelated modifications.

## 3. Minimal-Change Rule
If backend changes are necessary, the agent MAY update the backend, but must:
- keep the change localized;
- preserve the existing architecture;
- avoid large refactors;
- avoid changing unrelated modules;
- explain why the change is required;
- test the affected behavior.

## 4. Dependency Rule
If Sprint 5 depends on incomplete Sprint 1–4 work, do not rebuild it blindly. Identify the dependency and make the smallest compatible correction.

## 5. Stop Conditions
The agent must stop and ask for direction when:
- the SRS is ambiguous;
- a large architectural change appears necessary;
- an existing contract must be broken;
- destructive database changes are proposed;
- a requirement conflicts with the approved architecture.
