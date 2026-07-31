# Sprint 2.5 Implementation Plan

The implementation must follow these phases.

---

# Phase 1

Review

- Sprint2.5 Domain Model
- RBAC Plan
- RBAC Database Changes
- OpenAPI

Understand the existing backend before writing code.

---

# Phase 2

Database

If required:

- update Prisma schema
- create migration
- update seed data

Do not redesign existing models.

---

# Phase 3

Repositories

Implement missing repositories.

Examples:

- ContributorApplicationRepository
- RoleRepository

Repositories only access the database.

---

# Phase 4

Services

Implement business logic.

Examples:

- contributor applications
- role validation
- permission checks

No HTTP logic belongs here.

---

# Phase 5

Controllers

Implement request handling.

Controllers should:

- validate requests
- call services
- return responses

---

# Phase 6

Middleware

Extend authorization middleware if required.

Reuse authentication middleware.

Avoid duplicate authorization logic.

---

# Phase 7

Routes

Register new routes.

Protect endpoints using authorization middleware.

---

# Phase 8

Validation

Implement request validation.

Reuse existing validation infrastructure.

---

# Phase 9

OpenAPI

Ensure every implemented endpoint matches Sprint2.5 OpenAPI.

---

# Phase 10

Verification

Before completion verify:

- TypeScript builds
- Prisma builds
- Existing endpoints still work
- Authentication still works
- Upload still works
- Authorization works