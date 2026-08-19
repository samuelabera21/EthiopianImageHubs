# Sprint 6 — Domain, Database & Architecture

## Purpose
Define the domain and database impact without forcing unnecessary schema changes.

## Domain
A Collection is a user-owned grouping of existing images.

Conceptually:

User
→ Collection
→ CollectionImage
→ Image

Do not duplicate image files or image records.

## Collection
Implement only attributes required by the SRS/OpenAPI, such as:
- owner
- name/title
- description if required
- public/private visibility
- timestamps following existing conventions

Do not add fields merely because they seem useful.

## CollectionImage
Use an association/join model if required by the current schema design.

It must support:
- collection relationship
- image relationship
- prevention of duplicate collection/image membership
- existing ID/timestamp conventions

## Image Rules
Collections reference existing images.

Before exposing images through a public collection, respect the existing image moderation/visibility rules. Do not bypass the existing APPROVED/public-image rules.

## Database Change Policy
Before changing Prisma:
1. Inspect current schema.
2. Search for existing Collection-related models/relations.
3. Inspect migrations.
4. Compare schema with SRS Collections requirements.
5. Compare schema with OpenAPI.
6. Identify the smallest missing capability.
7. Make only the required change.
8. Generate/test migration if needed.
9. Verify existing features.

Do not create models merely because they are common elsewhere.

## Authorization
Collections are user-owned resources.
- Owner can manage their own collection.
- Other users cannot modify it.
- Private collection data is protected.
- Public access follows SRS visibility rules.
- Reuse existing authentication/RBAC.
- Do not create a new role.

## Deletion
Follow the existing project deletion convention. Deleting a collection must never delete the images themselves. Removing membership only removes the association.

## Architecture
Preserve:

Route
→ Controller
→ Service
→ Repository
→ Prisma

Reuse existing patterns. No second architecture pattern and no large refactor.

For every non-obvious architectural decision, record the decision, reason, SRS traceability, and impact.
