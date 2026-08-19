# Sprint 6 — Acceptance & Testing

## Functional Acceptance

### Creation
- Authenticated user can create a collection.
- Collection belongs to that user.
- Required fields are validated.

### Viewing
- Owner can view own collection.
- Public collection is viewable according to SRS.
- Private collection is protected.
- Missing collection uses standard not-found behavior.

### Editing
- Owner can edit permitted fields.
- Owner can change public/private visibility.
- Other users cannot modify it.

### Deletion
- Owner can delete collection.
- Images are not deleted.
- Membership associations are cleaned up correctly.

### Add Image
- Eligible existing image can be added.
- Missing image is rejected.
- Unauthorized collection access is rejected.
- Duplicate membership is prevented.

### Remove Image
- Owner can remove membership.
- Image itself remains intact.

### Sharing
- Public collection has a usable application URL.
- Allowed visitors can open it.
- Private collection remains protected.

## Unit Tests
Test:
- validation
- ownership
- visibility
- duplicate membership
- add/remove
- deletion behavior

## API/Integration Tests
Test:
- POST /collections
- GET /collections/{id}
- PATCH /collections/{id}
- DELETE /collections/{id}
- POST /collections/{id}/images
- DELETE /collections/{id}/images/{imageId}

Include authenticated, unauthenticated, owner, and different-user cases.

## Database Tests
Verify:
- User → Collection
- Collection → CollectionImage
- CollectionImage → Image
- uniqueness
- deletion behavior
- existing images remain intact

## Frontend Tests
Verify create, add, remove, edit, delete, public/private, empty state, API errors, and unauthorized state.

## End-to-End
1. Login.
2. Open eligible image.
3. Create collection.
4. Add image.
5. Open collection.
6. Edit collection.
7. Make public.
8. Open public URL as another visitor.
9. Make private.
10. Confirm unauthorized access is blocked.
11. Remove image.
12. Delete collection.
13. Confirm image still exists.

## Definition of Done
- SRS traced
- API implemented
- database reviewed
- frontend complete
- authorization enforced
- tests pass
- public/private behavior verified
- no unrelated architecture changes
- existing features still work
