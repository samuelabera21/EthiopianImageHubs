# Sprint 6 — API & UI Contract

## Purpose
Define the contract before implementation.

The SRS and existing OpenAPI specification are authoritative for exact fields, schemas, and status codes.

## Required API
- `POST /collections` — create collection
- `GET /collections/{id}` — get collection
- `PATCH /collections/{id}` — update collection
- `DELETE /collections/{id}` — delete collection
- `POST /collections/{id}/images` — add image
- `DELETE /collections/{id}/images/{imageId}` — remove image

## API Rules
For every endpoint verify:
- authentication
- authorization/ownership
- request schema
- validation
- success status
- error status
- response schema
- SRS traceability

Do not invent field limits, status codes, or response shapes when they already exist in SRS/OpenAPI.

If SRS and OpenAPI conflict, stop and report the conflict.

## Behavior
### Create
The authenticated user's identity determines ownership. The client must not choose another owner.

### Read
Public collections are viewable according to SRS rules. Private collections are protected.

### Update/Delete
Only the owner or explicitly authorized actor may modify/delete.

### Add Image
Verify authentication, collection ownership, image existence, image eligibility/visibility, then create membership. Prevent duplicates.

### Remove Image
Verify ownership, then remove only the collection-image association.

## Frontend
Implement only the UI required for the workflow:
- Collections entry point
- Collection list
- Create collection
- Add-to-collection action
- Collection detail page
- Edit collection
- Delete collection
- Public/private control
- Remove image
- loading/empty/error states

Reuse existing components/design patterns.

## Main UX
Image
→ Add to Collection
→ select existing collection OR Create Collection
→ image added

Collections should be accessible through the user's existing profile/navigation experience.

Pexels/Pixabay may be used as UX inspiration, not as a replacement for EthiopiaHub requirements.

## Contract Freeze
SRS
→ OpenAPI
→ Backend
→ Frontend
→ Tests

All must agree before completion.
