# Sprint 4 – Backend Architecture

## Purpose

This document defines the backend architecture for Sprint 4.

Sprint 4 follows the existing backend architecture established in previous sprints.

No new architectural patterns shall be introduced unless explicitly approved.

The objective is to complete existing product capabilities while maintaining consistency, modularity, and long-term maintainability.

---

# Architecture Principles

Sprint 4 shall continue following:

- Layered Architecture
- Repository Pattern
- Service Layer
- Controller Layer
- Route Layer
- Middleware-based request processing
- Prisma ORM for data access
- Zod for request validation
- JWT authentication
- RBAC authorization

No business logic shall exist inside controllers.

---

# Module Structure

Sprint 4 extends existing modules.

```
backend/src/

controllers/
services/
repositories/
routes/
validators/
middlewares/
storage/
utils/
config/
```

No new top-level folders shall be introduced.

---

# Sprint 4 Modules

## Category Module

Responsibilities

- Category CRUD
- Slug generation
- Validation
- Duplicate prevention
- Safe deletion rules

Layers

Route

↓

Controller

↓

Service

↓

Repository

↓

Prisma

---

## Tag Module

Responsibilities

- Tag CRUD
- Slug generation
- Duplicate prevention
- Validation
- Search support

Layers

Route

↓

Controller

↓

Service

↓

Repository

↓

Prisma

---

## Profile Module

Responsibilities

- Profile editing
- Avatar management
- Public profile updates
- Ownership validation

Layers

Route

↓

Controller

↓

Service

↓

Repository

↓

Prisma

---

## Search Module

Sprint 4 does not introduce a dedicated search service.

Search continues through the existing Image module.

Responsibilities

- keyword search
- category filtering
- tag filtering
- contributor filtering
- location filtering
- sorting
- pagination

Business logic belongs inside the Image Service.

---

## Visibility Enforcement

Responsibilities

- protect private images
- protect private profiles
- validate ownership
- validate administrator access

Authorization logic belongs inside Services.

Controllers shall never contain authorization rules.

---

# Repository Responsibilities

Repositories may only perform:

- Prisma queries
- persistence
- transactions
- pagination
- filtering
- sorting

Repositories shall never contain business rules.

---

# Service Responsibilities

Services shall perform:

- business rules
- permission checks
- validation orchestration
- duplicate detection
- ownership verification
- workflow decisions

Services may call multiple repositories.

---

# Controller Responsibilities

Controllers shall:

- receive HTTP requests
- invoke validators
- call services
- return API responses

Controllers shall not:

- query Prisma
- implement business rules
- contain authorization logic

---

# Route Responsibilities

Routes shall define:

- endpoint registration
- authentication middleware
- authorization middleware
- request validation middleware

No application logic belongs inside routes.

---

# Validation Strategy

All request validation shall continue using Zod.

Validation occurs before controllers execute.

Validation includes:

- body
- params
- query
- pagination
- filtering

---

# Error Handling

Sprint 4 continues using the existing centralized error middleware.

New features shall reuse existing error handling patterns.

No duplicate try/catch implementations shall be introduced.

---

# File Storage

Sprint 4 continues using the existing storage abstraction.

Business logic shall never depend on local filesystem paths.

Storage interactions shall remain provider-agnostic to support future Cloudinary migration.

---

# Dependency Rules

Allowed dependency flow:

Routes

↓

Controllers

↓

Services

↓

Repositories

↓

Prisma

Reverse dependencies are prohibited.

Repositories shall never call services.

Controllers shall never call Prisma.

---

# Sprint 4 Deliverables

Backend architecture supports:

- Category Management
- Tag Management
- Profile Editing
- Enhanced Search
- Visibility Enforcement
- API Consistency
- Cloudinary-ready Storage Abstraction

No architectural redesign is planned during Sprint 4.