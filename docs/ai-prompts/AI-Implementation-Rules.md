# AI Implementation Rules

## Purpose

This document defines the engineering rules that every AI coding assistant
(ChatGPT, GitHub Copilot, Claude Code, Cursor, etc.) must follow when working
on the EthiopiaHub Images project.

The objective is to keep the codebase consistent across all sprints while
minimizing unnecessary changes.

---

# 1. Project Overview

EthiopiaHub Images follows a Sprint-based development workflow.

Each sprint is completed in the following order:

1. Sprint Planning
2. Sprint Documentation
3. OpenAPI Specification
4. Prisma Schema
5. Database Migration
6. Backend Implementation
7. Backend Testing
8. Frontend Implementation
9. Integration Testing

Implementation must never skip these steps.

---

# 2. Source of Truth

Always follow this priority.

1. Sprint Documentation
2. OpenAPI Specification
3. Prisma Schema
4. Existing Project Architecture
5. Existing Code

If there is a conflict:

- Do not guess.
- Ask for clarification.
- Never invent new behavior.

---

# 3. Project Architecture

The existing architecture is approved.

Do not introduce new architectural patterns.

Backend structure:

controllers/
services/
repositories/
middlewares/
validators/
routes/
config/
storage/
utils/

Frontend structure:

app/
components/
features/
hooks/
services/
providers/
types/

Reuse the existing structure.

---

# 4. Backend Rules

Every API endpoint must follow this flow.

Request

↓

Validation

↓

Authentication

↓

Authorization

↓

Controller

↓

Service

↓

Repository

↓

Prisma

↓

Database

Rules:

- Controllers contain no business logic.
- Services contain business logic.
- Repositories communicate only with Prisma.
- Validators perform request validation.
- Middleware handles cross-cutting concerns.

---

# 5. Frontend Rules

Frontend must follow this flow.

Page

↓

Feature

↓

Hook

↓

Service

↓

API

↓

Backend

Rules:

- Pages should remain small.
- Components should be reusable.
- API calls belong only inside services.
- Business logic belongs inside hooks or features.

---

# 6. OpenAPI Rules

OpenAPI is the API contract.

AI must:

- Implement only documented endpoints.
- Never invent endpoints.
- Never rename endpoints.
- Never rename request fields.
- Never rename response fields.
- Never change status codes.
- Never change request or response structures.

If implementation differs from OpenAPI:

Update implementation.

Do not modify OpenAPI unless explicitly instructed.

---

# 7. Prisma Rules

Prisma Schema is approved.

AI must:

- Never rename models.
- Never rename relations.
- Never remove indexes.
- Never modify existing migrations.
- Never edit historical migrations.

If schema changes are required:

- Create a new migration.
- Keep previous migrations unchanged.

---

# 8. Database Rules

Database changes must always be incremental.

Never:

- Drop production tables.
- Remove existing columns.
- Rename columns without approval.

Prefer additive changes.

---

# 9. Authentication Rules

Authentication is centralized.

Reuse existing authentication middleware.

Reuse existing JWT utilities.

Do not create duplicate authentication logic.

---

# 10. Authorization Rules

Authorization must use the existing authorization middleware.

Never duplicate permission checks inside controllers.

Authorization logic belongs inside middleware or dedicated services.

---

# 11. Coding Standards

Use:

- TypeScript Strict Mode
- async/await
- Early return
- Small functions
- Reusable utilities

Avoid:

- any
- duplicate code
- dead code
- commented-out code
- large functions

---

# 12. Error Handling

Always return consistent API responses.

Use the existing response utilities.

Do not introduce a new response format.

Errors should be handled by the global error middleware whenever possible.

---

# 13. Logging

Reuse the existing logging approach.

Do not introduce another logging library without approval.

---

# 14. File Organization

Prefer extending existing files.

Only create new files when:

- introducing a new feature
- introducing a new reusable component
- explicitly requested

Avoid unnecessary file creation.

---

# 15. Testing Checklist

Before considering work complete:

- TypeScript compiles
- Prisma Client builds
- Database migration succeeds
- API routes compile
- OpenAPI remains accurate
- Existing functionality is not broken

---

# 16. Scope Control

Implement only the requested feature.

Do not:

- refactor unrelated code
- rename unrelated files
- change formatting across the project
- optimize unrelated modules

Keep changes minimal.

---

# 17. Existing Code

Before writing code:

1. Read the existing implementation.
2. Reuse existing utilities.
3. Reuse existing middleware.
4. Reuse existing services.
5. Reuse existing repositories.
6. Extend instead of replacing.

---

# 18. Documentation

Whenever a Sprint introduces:

- new endpoints
- new middleware
- new database models
- new permissions
- new services

Update the relevant documentation if required.

Do not create unnecessary documentation.

---

# 19. AI Decision Rules

If something is unclear:

Do not assume.

Inspect the existing code first.

If still unclear:

Ask for clarification.

---

# 20. Implementation Workflow

Every Sprint should follow this order.

Sprint Planning

↓

Sprint Documentation

↓

OpenAPI

↓

Prisma Schema

↓

Database Migration

↓

Repository Layer

↓

Service Layer

↓

Controller Layer

↓

Routes

↓

Validation

↓

Authentication

↓

Authorization

↓

Backend Verification

↓

Frontend Services

↓

Frontend Hooks

↓

Frontend Components

↓

Frontend Pages

↓

Integration Testing

↓

Sprint Complete

---

# 21. Non-Negotiable Rules

AI must never:

- Change project architecture.
- Rename existing APIs.
- Rename database models.
- Rewrite completed modules.
- Modify previous sprint functionality unless requested.
- Introduce breaking changes.
- Perform large refactors.
- Change unrelated files.
- Implement features outside the current sprint.

When backend changes are necessary, update only the minimal required files while preserving the existing architecture and coding style.