# Backend Implementation Template

## Purpose

This document defines the standard workflow for implementing backend features in EthiopiaHub Images.

Every backend sprint must follow this workflow.

---

# Implementation Order

Always implement backend features in this order.

1. Read Sprint Documentation
2. Read OpenAPI Specification
3. Read Prisma Schema
4. Review Existing Implementation
5. Database Migration (if required)
6. Repository Layer
7. Service Layer
8. Controller Layer
9. Routes
10. Validation
11. Authentication
12. Authorization
13. Error Handling
14. OpenAPI Verification
15. Testing

Do not change this order.

---

# Step 1 — Understand the Sprint

Before writing code:

- Read the sprint documentation.
- Understand the feature scope.
- Identify affected modules.
- Identify reusable code.

Never implement features outside the sprint scope.

---

# Step 2 — Review OpenAPI

OpenAPI is the API contract.

For every endpoint identify:

- HTTP Method
- URL
- Authentication requirements
- Authorization requirements
- Request body
- Parameters
- Query parameters
- Success response
- Error responses

Implementation must match OpenAPI exactly.

---

# Step 3 — Review Prisma Schema

Before writing code:

- Identify affected models.
- Review relations.
- Review enums.
- Review indexes.

Never modify approved schema unless the sprint explicitly requires it.

---

# Step 4 — Database Migration

Only create migrations when required.

Rules:

- Never modify previous migrations.
- Never rename existing tables.
- Never remove existing columns.
- Prefer additive changes.

---

# Step 5 — Repository Layer

Repositories are responsible only for database access.

Repositories must:

- Use Prisma Client.
- Contain no business logic.
- Return typed data.
- Handle only persistence.

Repositories must not:

- Validate requests.
- Check permissions.
- Generate responses.

---

# Step 6 — Service Layer

Services contain business logic.

Typical responsibilities:

- Validation after database lookups
- Business rules
- Permission decisions
- Calling repositories
- Calling storage providers
- Calling email services
- Calling utility functions

Services should remain independent of Express.

---

# Step 7 — Controller Layer

Controllers should:

- Receive requests
- Call services
- Return responses

Controllers should never contain business logic.

Keep controllers small.

---

# Step 8 — Routes

Routes should only connect middleware and controllers.

Example flow:

Validation

↓

Authentication

↓

Authorization

↓

Controller

Routes should not contain business logic.

---

# Step 9 — Validation

All request validation belongs in validators.

Validate:

- Request body
- Query parameters
- Route parameters

Controllers should never validate manually.

---

# Step 10 — Authentication

Reuse existing authentication middleware.

Never implement another JWT verification system.

Never duplicate authentication logic.

---

# Step 11 — Authorization

Reuse existing authorization middleware.

Never duplicate role checks inside controllers.

Permission checks should remain centralized.

---

# Step 12 — Error Handling

Reuse global error middleware.

Return consistent response structures.

Never expose stack traces.

Never create inconsistent error formats.

---

# Step 13 — Response Format

Reuse existing response utilities.

Successful responses should remain consistent.

Error responses should remain consistent.

Never invent a new response format.

---

# Step 14 — Code Reuse

Before creating new code:

- Search existing repositories.
- Search existing services.
- Search utilities.
- Search middleware.

Extend existing implementations whenever possible.

Avoid duplication.

---

# Step 15 — Minimal Changes

Modify only files directly related to the feature.

Avoid:

- Large refactors
- Formatting unrelated files
- Renaming existing files
- Moving files

Keep commits focused.

---

# Step 16 — Verification Checklist

Before considering implementation complete:

- TypeScript compiles
- Prisma Client builds
- Database migration succeeds
- Routes are registered
- Validation works
- Authentication works
- Authorization works
- OpenAPI matches implementation
- Existing features still work

---

# Step 17 — Completion Checklist

A backend sprint is complete only when:

- All endpoints are implemented.
- OpenAPI is fully satisfied.
- Prisma schema is respected.
- Existing architecture is preserved.
- No unrelated code has been modified.
- No TODO placeholders remain.
- All acceptance criteria are satisfied.

---

# AI Instructions

Before writing any code:

1. Read the Sprint document.
2. Read the OpenAPI specification.
3. Read the Prisma schema.
4. Inspect existing implementation.
5. Reuse existing architecture.
6. Implement only the requested scope.
7. Keep changes as small as possible.
8. If backend changes are required, update only the minimal necessary files.
9. If information is missing, ask for clarification instead of guessing.