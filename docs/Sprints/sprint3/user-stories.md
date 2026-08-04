# Sprint 3 User Stories
## EthiopiaHub Images

Version: 1.0
Sprint: Sprint 3 – Community & User Content
Status: Approved

---

# 1. Purpose

This document defines the user stories and acceptance criteria for Sprint 3.

Each story represents a piece of functionality that delivers value to users and is directly traceable to the Software Requirements Specification (SRS).

The stories in this document will guide API design, database implementation, backend services, frontend development, and testing.

---

# 2. Sprint Goal

Enable users to interact with published images and explore contributors through community-focused features.

Sprint 3 delivers:

- Like Images
- Favorite Images
- Download Tracking
- Download History
- Public Contributor Profiles
- Contributor Portfolios

---

# 3. User Stories

---

## US-301 Like an Image

### Description

As an authenticated user,

I want to like a published image,

so that I can express appreciation for the contributor's work.

### Acceptance Criteria

- User must be authenticated.
- Image must exist.
- Image must be published.
- Image must be publicly visible.
- User can like an image only once.
- Duplicate likes are rejected.
- Like count updates immediately.
- The response returns the updated like status.

### Related SRS

FR-500 Community Interaction

---

## US-302 Remove Like

### Description

As an authenticated user,

I want to remove my like,

so that I can change my reaction.

### Acceptance Criteria

- User must own the like.
- Removing a like deletes only the Like relationship.
- Image data remains unchanged.
- Like count is updated.

### Related SRS

FR-500

---

## US-303 Favorite an Image

### Description

As an authenticated user,

I want to save an image to my favorites,

so that I can easily find it later.

### Acceptance Criteria

- User must be authenticated.
- User can favorite an image only once.
- Duplicate favorites are rejected.
- Favorite is linked to the authenticated user.
- Image remains unchanged.

### Related SRS

FR-700 Favorites

---

## US-304 Remove Favorite

### Description

As an authenticated user,

I want to remove an image from my favorites,

so that I can manage my saved images.

### Acceptance Criteria

- User owns the favorite.
- Removing a favorite deletes only the Favorite relationship.
- Image remains available to other users.

### Related SRS

FR-700

---

## US-305 Download an Image

### Description

As a user,

I want to download an approved public image,

so that I can use it according to the platform license.

### Acceptance Criteria

- Image must be published.
- Image must be publicly visible.
- Download is recorded.
- License information is included.
- Download count increases.
- Guest downloads are supported according to platform policy.

### Related SRS

FR-800 Downloads

---

## US-306 View Download History

### Description

As an authenticated user,

I want to view my previous downloads,

so that I can revisit images I have already downloaded.

### Acceptance Criteria

- User sees only their own history.
- History is ordered by newest first.
- Pagination is supported.
- Download records cannot be edited.
- Download records cannot be deleted by users.

### Related SRS

FR-800

---

## US-307 View Public Contributor Profile

### Description

As any visitor,

I want to view a contributor's public profile,

so that I can learn more about the contributor.

### Acceptance Criteria

The profile displays:

- Display name
- Biography
- Avatar
- Website (if provided)
- Country
- Region
- Public statistics

Private account information must never be displayed.

### Related SRS

FR-600 Contributor Profile

---

## US-308 Browse Contributor Portfolio

### Description

As any visitor,

I want to browse a contributor's published images,

so that I can explore their work.

### Acceptance Criteria

Portfolio contains only:

- Published images
- Public images

Draft, pending, rejected, archived, or deleted images must never appear.

Pagination is supported.

### Related SRS

FR-600

---

# 4. Non-Functional Expectations

The implemented stories shall comply with the following quality attributes:

- Secure authentication and authorization
- Consistent API responses
- Pagination where applicable
- Proper validation
- Audit logging where required
- Soft deletion rules from previous sprints
- Performance targets defined in Chapter 12 of the SRS

---

# 5. Out of Scope

The following features are explicitly excluded from Sprint 3:

- Image upload workflow
- Image processing pipeline
- Thumbnail generation
- Virus scanning
- Metadata extraction
- Search improvements
- AI recommendations
- Comments
- Follow system
- Notifications
- Collections management
- Moderation workflow
- Administrative dashboards

---

# 6. Story Dependencies

US-301 depends on:

- Authentication (Sprint 1)
- Published Images (Sprint 2)

US-302 depends on:

- US-301

US-303 depends on:

- Authentication
- Published Images

US-304 depends on:

- US-303

US-305 depends on:

- Published Images
- License assignment

US-306 depends on:

- US-305

US-307 depends on:

- User Profile
- Published Images

US-308 depends on:

- Public Contributor Profile

---

# 7. Definition of Done

A user story is complete when:

- Business rules are implemented.
- API endpoints are functional.
- Database changes are complete.
- Validation rules are enforced.
- Authorization checks are implemented.
- Automated tests pass.
- Documentation is updated.
- Acceptance criteria are satisfied.

---

# 8. Traceability Matrix

| User Story | Feature | SRS Reference |
|------------|---------|---------------|
| US-301 | Like Image | FR-500 |
| US-302 | Remove Like | FR-500 |
| US-303 | Favorite Image | FR-700 |
| US-304 | Remove Favorite | FR-700 |
| US-305 | Download Image | FR-800 |
| US-306 | Download History | FR-800 |
| US-307 | Public Contributor Profile | FR-600 |
| US-308 | Contributor Portfolio | FR-600 |