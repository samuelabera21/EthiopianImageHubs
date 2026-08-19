# Sprint 6 — Agent Execution Guide

## Role
You are implementing **Sprint 6 — Collections & Image Organization** for EthiopiaHub Images.

## Source of Truth Priority
1. Approved SRS
2. Approved SAD/architecture
3. Existing repository implementation/conventions
4. Existing OpenAPI
5. Sprint 6 documents
6. Explicit user decisions

Do not replace project requirements with generic best practices when they conflict.

## Required Reading
Read:
- docs/AI-Project-Map.md
- docs/Backend-Implementation-Template.md
- docs/ai-prompts/AI-Implementation-Rules.md
- docs/ai-prompts/Sprint-Implementation-Workflow.md
- docs/ai-prompts/Backend-Agent-Prompt.md
- SRS.pdf
- all files in docs/Sprints/sprint6/
- relevant Sprint 1–5 documentation
- existing OpenAPI

## Before Coding
Inspect the actual repository:
- Git status/branch
- backend/frontend
- Prisma schema/migrations
- auth/RBAC
- Image model
- moderation/visibility rules
- profile implementation
- image-card components
- service/repository/controller patterns
- tests

Then report:
1. existing Collections functionality
2. missing functionality
3. reusable code
4. required database changes
5. required API changes
6. required frontend work
7. blockers/conflicts

Do not guess.

## Scope
Implement only:
- create/view/edit/delete collections
- public/private visibility
- add/remove images
- public collection sharing/viewing
- required API
- required frontend
- required database changes
- tests

Do not implement unrelated SRS features.

## Database Rule
Current Prisma Schema
→ SRS Requirement
→ Gap
→ Minimal Change
→ Migration
→ Test

Do not create unnecessary models/fields. Do not rewrite unrelated models.

## API Rule
Implement:
- POST /collections
- GET /collections/{id}
- PATCH /collections/{id}
- DELETE /collections/{id}
- POST /collections/{id}/images
- DELETE /collections/{id}/images/{imageId}

Use exact request/response schemas and status codes from SRS/OpenAPI.

Do not silently change the contract. If a contract change is necessary, stop and explain it first.

## Authorization Rule
Collections are user-owned.
- authenticated user owns created collection
- owner can manage it
- other users cannot modify it
- private collection stays protected
- reuse existing auth/RBAC
- do not create a new role

## Image Rule
Collections reference existing images. Do not duplicate files. Respect the existing image moderation/public visibility rules. Do not bypass APPROVED/public-image rules.

## Frontend Rule
Reuse the existing design system.

Main interaction:
Image
→ Add to Collection
→ Select existing collection OR Create Collection
→ Image added

Expose collections through existing profile/navigation patterns.

## UX Reference
Pexels/Pixabay-style interaction is acceptable as inspiration:
- quick add
- create from image
- profile collections
- public/private
- image-grid collection page

Do not copy external implementation or treat external behavior as a requirement.

## Minimal-Change Rule
Do not:
- refactor the architecture
- migrate frameworks
- change the tech stack
- rewrite working modules
- modify unrelated features

If a backend change outside the Collections module is necessary, keep it localized and explain why.

## Stop Conditions
Stop and ask for direction if:
- SRS/OpenAPI conflict
- required behavior is ambiguous
- breaking API change is needed
- destructive migration is proposed
- large architectural change is required
- new role/permission system appears necessary
- unrelated modules would need redesign

## Completion Report
Report:
1. files changed
2. database changes
3. API changes
4. frontend changes
5. tests added/updated
6. tests executed/results
7. SRS requirements completed
8. remaining work
9. deviations/decisions
10. improvements beyond the original contract

## Final Constraint
Implement the approved Sprint 6 Collections requirements correctly and minimally while preserving the existing EthiopiaHub Images architecture.
