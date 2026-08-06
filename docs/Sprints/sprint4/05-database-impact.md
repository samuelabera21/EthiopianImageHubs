# Sprint 4 – Database Impact

## Purpose

This document identifies every database change required for Sprint 4.

Sprint 4 is intentionally focused on completing the existing product experience rather than introducing entirely new platform modules. Therefore, database changes are intentionally minimal to preserve stability and avoid unnecessary migrations.

---

# Database Strategy

Sprint 4 follows the existing database architecture.

No existing tables will be redesigned unless required to support an approved Sprint 4 feature.

Goals:

- Preserve backward compatibility
- Avoid destructive schema changes
- Reuse existing relationships
- Keep migrations small and reversible

---

# Existing Tables Reused

## Image

Purpose

Stores uploaded images and searchable metadata.

Sprint 4 uses existing fields:

- title
- description
- categoryId
- visibility
- status
- location
- createdAt

No structural changes required.

---

## Category

Purpose

Stores image categories.

Sprint 4 completes CRUD management.

Current schema is sufficient.

No migration required.

---

## Tag

Purpose

Stores reusable tags.

Sprint 4 completes administrative management.

Current schema is sufficient.

No migration required.

---

## ImageTag

Purpose

Associates images with tags.

No schema changes required.

---

## UserProfile

Purpose

Stores contributor profile information.

Sprint 4 enables editing of existing fields.

Existing fields are reused:

- displayName
- bio
- avatarUrl
- website
- location
- isPublic

No schema changes required.

---

## User

Used for:

- ownership validation
- permission checks
- contributor profile editing

No changes required.

---

# New Tables

None.

Sprint 4 introduces no new entities.

---

# Modified Tables

None currently planned.

If implementation reveals a required optimization, it must:

- remain backward compatible
- require a single migration
- receive design approval before implementation

---

# Relationships

Existing relationships remain unchanged.

User
│
└── UserProfile

User
│
└── Image

Image
│
├── Category
│
└── ImageTag
        │
        └── Tag

---

# Search Data

Sprint 4 does not introduce a dedicated search index.

Search continues using PostgreSQL with Prisma queries.

Indexed search infrastructure (Meilisearch/OpenSearch/Elasticsearch) is intentionally deferred to a future sprint.

Reasons:

- minimizes infrastructure complexity
- aligns with current project size
- preserves portability
- simplifies future Cloudinary migration
- allows API contracts to remain stable

---

# Cloudinary Compatibility

Sprint 4 database changes must remain storage-provider independent.

Search must never depend on local filesystem paths.

Queries must rely on metadata only.

Examples:

- title
- description
- category
- tags
- contributor
- location

This ensures future storage migration does not require schema redesign.

---

# Migration Summary

Expected Prisma migrations:

None.

Sprint 4 should ideally complete without introducing new database tables or altering existing schemas.

If any migration becomes necessary during implementation, it must be documented separately before execution.

---

# Risks

Low Risk

Reason:

- existing schema already supports Sprint 4 objectives

Primary implementation effort is business logic rather than schema evolution.

---

# Deliverables

Sprint 4 database deliverables:

- Category CRUD using existing tables
- Tag CRUD using existing tables
- Profile editing using existing tables
- Improved search using existing metadata
- Privacy enforcement using existing fields

No database redesign is planned.
