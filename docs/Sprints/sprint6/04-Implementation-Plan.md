# Sprint 6 — Implementation Plan

## Phase 1 — Inspect
Before coding inspect:
- repository
- Sprint 1–5 implementation
- authentication/RBAC
- Prisma schema/migrations
- Image model and moderation/visibility
- image-card components
- profile pages
- routing
- OpenAPI
- tests

Report:
1. what exists
2. what is missing
3. what can be reused
4. database impact
5. API impact
6. frontend work
7. blockers/conflicts

## Phase 2 — Freeze Scope
Confirm SRS requirements, API, ownership, visibility, database impact, and frontend workflow before implementation.

## Phase 3 — Database
If required:
1. update Prisma schema
2. add only required models/relations
3. preserve conventions
4. create migration
5. generate/validate Prisma
6. test migration
7. verify existing features

Do not rewrite unrelated models.

## Phase 4 — Backend
Implement:
1. repository/data access
2. validation
3. service/domain logic
4. ownership/authorization
5. controllers
6. routes
7. error handling
8. API tests

Operations:
- create
- get
- update
- delete
- add image
- remove image

## Phase 5 — Frontend
Implement:
1. Collections entry point
2. collection list
3. create UI
4. Add to Collection
5. collection detail
6. edit
7. delete
8. public/private
9. remove image
10. loading/empty/error states

## Phase 6 — Integration
Verify:
Authenticated User
→ Browse eligible image
→ Add/Create Collection
→ Image added
→ Open Collection
→ Edit
→ Public/private
→ Share public collection
→ Remove image
→ Delete collection

## Phase 7 — Regression
Run relevant tests for authentication, RBAC, images, moderation, search/discovery, profiles, likes/favorites, and database.

## Minimal Change
No large refactors, framework changes, tech-stack changes, or unrelated cleanup.

## Stop Conditions
Stop and ask if:
- SRS/OpenAPI conflict
- behavior is ambiguous
- breaking API change is needed
- destructive migration is proposed
- large architectural change is required
- new role/permission system appears necessary
