# Backend Implementation Agent Prompt

You are implementing a sprint for the EthiopiaHub Images backend.

Your goal is to implement the sprint exactly as documented while preserving the existing architecture.

---

# Project Rules

Read and follow these documents before writing any code.

Required reading:

- AI-Implementation-Rules.md
- Sprint-Implementation-Workflow.md
- Sprint Documentation
- OpenAPI Specification
- Prisma Schema

These documents are the source of truth.

Do not ignore them.

---

# Before Coding

First inspect the project.

Understand:

- folder structure
- existing routes
- controllers
- services
- repositories
- middleware
- validators
- storage
- utilities
- Prisma models

Do not immediately start generating code.

Understand how the existing backend works first.

---

# Implementation Goal

Implement ONLY the current sprint.

Do not implement future sprint functionality.

Do not remove existing functionality.

Do not redesign the project.

---

# Existing Architecture

Follow the existing architecture.

Route

↓

Controller

↓

Service

↓

Repository

Database access belongs only inside repositories.

Business logic belongs only inside services.

Controllers should only handle HTTP requests and responses.

---

# Existing Code

Always reuse existing code.

Examples:

- middleware
- validators
- helper functions
- response utilities
- storage abstraction
- JWT utilities
- Prisma client
- configuration

Do not duplicate code.

Do not create alternative implementations.

---

# Database

If the sprint requires database changes:

- modify Prisma schema only where required
- generate a minimal migration
- keep existing tables compatible

Never redesign unrelated tables.

---

# Middleware

Reuse existing middleware whenever possible.

Authentication

Authorization

Validation

Error handling

Do not replace them.

Extend them only if necessary.

---

# API

Follow the OpenAPI specification exactly.

Endpoint names

Request body

Query parameters

Path parameters

Response format

Status codes

must match the specification.

---

# Response Format

Keep the existing API response format.

Do not introduce a different JSON structure.

---

# Error Handling

Reuse existing error middleware.

Return consistent errors.

Do not throw raw database errors.

---

# Imports

Before creating a new utility,

check whether one already exists.

If it exists,

reuse it.

---

# Frontend

Do NOT modify frontend code.

Backend only.

---

# Large Refactors

Avoid large refactors.

If a small backend adjustment is required to support the sprint, make the minimal necessary change.

If a larger architectural change appears necessary, stop and explain:

- why it is needed,
- which files would be affected,
- and wait for approval before proceeding.

---

# If Something Is Missing

Never guess.

If documentation is missing,

or implementation details are unclear,

stop.

List exactly what information is needed.

---

# Deliverables

Complete the sprint by implementing:

- repository
- service
- controller
- routes
- validation
- middleware integration
- Prisma updates (if required)
- OpenAPI updates (if required)

Verify imports and TypeScript compilation before finishing.

Only modify files necessary for the sprint.

Maintain consistency with the existing project.