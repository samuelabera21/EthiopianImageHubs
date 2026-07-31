# Sprint Implementation Workflow

This document defines how an AI coding agent must implement every sprint.

The workflow is mandatory.

---

# Objective

Implement one sprint at a time.

Never mix future sprint functionality.

Implement only what is documented.

---

# Source of Truth

Implementation priority:

1. Sprint Documentation
2. OpenAPI Specification
3. Prisma Schema
4. Existing Project Structure
5. Existing Code

If there is any conflict:

STOP.

Do not guess.

Request clarification.

---

# Before Writing Code

The agent must first inspect:

- folder structure
- existing routes
- controllers
- services
- repositories
- middleware
- validators
- utilities
- Prisma schema
- OpenAPI

Do not recreate files that already exist.

Reuse existing architecture.

---

# Implementation Order

Always implement backend first.

The order is:

## Step 1

Read sprint documentation.

Understand requirements.

---

## Step 2

Inspect existing backend.

Understand current implementation.

---

## Step 3

Identify missing pieces.

Only implement what is missing.

---

## Step 4

Update database only if required.

Never perform unnecessary schema changes.

Migration should be minimal.

---

## Step 5

Update Prisma Client.

---

## Step 6

Repository Layer

Database access only.

No business logic.

---

## Step 7

Service Layer

Business logic only.

No HTTP code.

---

## Step 8

Controller Layer

HTTP handling only.

No database access.

---

## Step 9

Routes

Register new endpoints.

Reuse middleware.

---

## Step 10

Validation

Add request validation.

Reuse existing validators whenever possible.

---

## Step 11

Authorization

Reuse existing authentication middleware.

Reuse existing authorization middleware.

Do not create duplicate security logic.

---

## Step 12

Storage

If storage changes are required,

reuse Storage Factory.

Do not bypass storage abstraction.

---

## Step 13

Error Handling

Reuse response helpers.

Reuse error middleware.

Never introduce a different response format.

---

## Step 14

OpenAPI

Update OpenAPI only for endpoints affected by the sprint.

Do not rewrite unrelated sections.

---

## Step 15

Testing

Verify:

- compilation
- imports
- routes
- types
- Prisma usage

Fix implementation errors.

---

# Frontend Workflow

Frontend starts only after backend is complete.

Order:

1. API service
2. Types
3. Hooks
4. Components
5. Pages

Reuse existing UI components.

Do not redesign the application.

---

# Existing Code Policy

Existing code has priority.

Always extend.

Never rewrite.

Do not move files unless required.

Do not rename public APIs.

---

# Architecture Rules

Maintain:

Repository

↓

Service

↓

Controller

↓

Route

No shortcuts.

---

# Minimal Changes

Only modify files required for the sprint.

Avoid touching unrelated modules.

Large refactors are prohibited unless explicitly requested.

---

# Completion Checklist

Before considering a sprint complete:

- OpenAPI updated
- Prisma updated if needed
- Migration created if needed
- Repository implemented
- Service implemented
- Controller implemented
- Routes registered
- Validation completed
- Authorization applied
- Response format consistent
- Types compile
- Existing functionality preserved

Only then begin the frontend.