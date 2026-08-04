# Sprint 3 API Design
## EthiopiaHub Images

Version: 1.0
Sprint: Sprint 3 – Community & User Content
Status: Draft

---

# 1. Purpose

This document defines the REST API contract for all Sprint 3 features.

It specifies:

- Endpoints
- HTTP methods
- Authentication requirements
- Request parameters
- Request bodies
- Response formats
- Business rules
- Error responses

This document serves as the implementation contract between the frontend and backend.

---

# 2. API Design Principles

Sprint 3 APIs follow the platform standards defined in the SRS:

- RESTful resource naming
- Stateless communication
- JSON request and response bodies
- Versioned endpoints (`/api/v1`)
- Consistent response format
- Role-based authorization
- Standard HTTP status codes

---

# 3. Standard Response Format

## Success Response

```json
{
  "status": "success",
  "message": "Operation completed successfully.",
  "data": {},
  "metadata": {}
}
```

## Error Response

```json
{
  "status": "error",
  "errorCode": "RESOURCE_NOT_FOUND",
  "message": "The requested resource could not be found.",
  "requestId": "uuid",
  "timestamp": "ISO-8601"
}
```

---

# 4. Authentication

| Endpoint | Authentication |
|-----------|----------------|
| Like Image | Required |
| Remove Like | Required |
| Favorite Image | Required |
| Remove Favorite | Required |
| Download Image | Optional (guest allowed) |
| Download History | Required |
| Contributor Profile | Public |
| Contributor Portfolio | Public |

---

# 5. Like API

## POST /images/{imageId}/likes

Purpose

Create a like for an image.

Authentication

Required

Business Rules

- Image must exist.
- Image must be published.
- Image must be public.
- One like per user per image.

Responses

- 201 Created
- 400 Validation Error
- 401 Unauthorized
- 404 Image Not Found
- 409 Already Liked

---

## DELETE /images/{imageId}/likes

Purpose

Remove the authenticated user's like.

Responses

- 204 No Content
- 401 Unauthorized
- 404 Like Not Found

---

# 6. Favorite API

## POST /images/{imageId}/favorites

Purpose

Add an image to the authenticated user's favorites.

Authentication

Required

Business Rules

- One favorite per user per image.

Responses

- 201 Created
- 401 Unauthorized
- 404 Image Not Found
- 409 Already Favorited

---

## DELETE /images/{imageId}/favorites

Purpose

Remove an image from favorites.

Responses

- 204 No Content
- 401 Unauthorized
- 404 Favorite Not Found

---

# 7. Download API

## POST /downloads/{imageId}

Purpose

Record an image download and provide download access.

Authentication

Optional

Business Rules

- Image must be published.
- Image must have an active license.
- Every successful download creates a new immutable record.

Responses

- 200 OK
- 404 Image Not Found
- 403 Download Not Allowed

---

## GET /downloads/history

Purpose

Return the authenticated user's download history.

Authentication

Required

Query Parameters

- page
- pageSize

Responses

- 200 OK
- 401 Unauthorized

---

# 8. Contributor Profile API

## GET /profiles/{username}

Purpose

Retrieve a contributor's public profile.

Authentication

Public

Returns

- Public profile information
- Public statistics
- Social links (if available)

Responses

- 200 OK
- 404 Profile Not Found

---

# 9. Contributor Portfolio API

## GET /profiles/{username}/images

Purpose

Retrieve a contributor's published images.

Authentication

Public

Query Parameters

- page
- pageSize
- sort

Business Rules

Only published and public images are returned.

Responses

- 200 OK
- 404 Profile Not Found

---

# 10. Pagination

Collection endpoints support:

- page
- pageSize

Response metadata includes:

- totalItems
- totalPages
- currentPage
- hasNextPage
- hasPreviousPage

---

# 11. Authorization Rules

| Role | Permissions |
|------|-------------|
| Visitor | View profiles, portfolios, download public images |
| User | All visitor permissions + like, favorite, download history |
| Contributor | Same as User |
| Moderator | Same as Contributor |
| Administrator | Full access |

---

# 12. Validation Rules

Like/Favorite

- Image ID must be a valid UUID.
- Image must exist.
- Image must be published.
- Duplicate actions are rejected.

Downloads

- Image must be downloadable.
- License must exist.
- Download event must be recorded before the response completes.

Contributor Profile

- Username must exist.
- Only public profile fields are returned.

---

# 13. HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Resource Created |
| 204 | No Content |
| 400 | Validation Error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# 14. Audit & Logging

The following events should be logged where applicable:

- Like created
- Like removed
- Favorite created
- Favorite removed
- Image downloaded
- Download history requested

Logs shall include:

- Request ID
- Timestamp
- Authenticated User ID (if available)
- Resource ID

---

# 15. Out of Scope

Sprint 3 APIs do not include:

- Image uploads
- Image processing
- Metadata editing
- Moderation
- Notifications
- Search
- Collections management
- Comments
- Recommendations

These features belong to future sprints.

---

# 16. Traceability

| API Endpoint | User Story | SRS Reference |
|--------------|------------|---------------|
| POST /images/{imageId}/likes | US-301 | FR-500 |
| DELETE /images/{imageId}/likes | US-302 | FR-500 |
| POST /images/{imageId}/favorites | US-303 | FR-700 |
| DELETE /images/{imageId}/favorites | US-304 | FR-700 |
| POST /downloads/{imageId} | US-305 | FR-800 |
| GET /downloads/history | US-306 | FR-800 |
| GET /profiles/{username} | US-307 | FR-600 |
| GET /profiles/{username}/images | US-308 | FR-600 |