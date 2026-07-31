Excellent. ✅ We now have the foundation frozen.

At this point, **Sprint 2 officially starts**, just like Sprint 1 did.

Our design workflow is now:

```
Sprint Goal            ✅ Approved
Domain Model           ✅ Approved
Image Database Design  ✅ Approved

↓

Entity Field Specification   ← CURRENT STEP

↓

ER Diagram

↓

Prisma Schema

↓

Storage Architecture

↓

OpenAPI 3.1 Specification

↓

Backend Folder Structure

↓

Frontend Folder Structure

↓

Implementation Plan

↓

Development
```

---

# EthiopiaHub Images

# Sprint 2

# Entity Field Specification

Version: 1.0

Status: Approved

---

# 1. Purpose

This document defines every database entity introduced in Sprint 2, including attributes, data types, constraints, relationships, and business rules.

It serves as the source of truth before creating the ER Diagram and Prisma schema.

---

# 2. Design Principles

Each entity shall:

* Have a single responsibility.
* Use UUID primary keys.
* Include timestamps for auditing.
* Maintain referential integrity.
* Support future extensibility.
* Avoid duplicated information.

---

# 3. Image Entity

Represents one uploaded image.

## Primary Key

| Field | Type | Constraints |
| ----- | ---- | ----------- |
| id    | UUID | Primary Key |

---

## Ownership

| Field   | Type | Constraints            |
| ------- | ---- | ---------------------- |
| ownerId | UUID | Required, FK → User.id |

Business Rules

* Every image has exactly one owner.
* Ownership cannot change.
* Owner must exist.

---

## Basic Information

| Field       | Type         | Constraints |
| ----------- | ------------ | ----------- |
| title       | VARCHAR(150) | Required    |
| description | TEXT         | Optional    |

---

## Category

| Field      | Type | Constraints  |
| ---------- | ---- | ------------ |
| categoryId | UUID | Required, FK |

---

## Visibility

| Field      | Type | Constraints |
| ---------- | ---- | ----------- |
| visibility | ENUM | Required    |

Allowed Values

* PUBLIC
* PRIVATE
* UNLISTED

---

## License

| Field   | Type | Constraints |
| ------- | ---- | ----------- |
| license | ENUM | Required    |

Initial Values

* ALL_RIGHTS_RESERVED
* CC_BY
* CC_BY_SA
* PUBLIC_DOMAIN

Additional licenses may be added later.

---

## Storage Information

| Field            | Type         | Constraints      |
| ---------------- | ------------ | ---------------- |
| originalFilename | VARCHAR(255) | Required         |
| storedFilename   | VARCHAR(255) | Required, Unique |
| storagePath      | VARCHAR(500) | Required         |
| mimeType         | VARCHAR(100) | Required         |

---

## File Information

| Field    | Type         | Constraints      |
| -------- | ------------ | ---------------- |
| fileSize | BIGINT       | Required         |
| width    | INTEGER      | Required         |
| height   | INTEGER      | Required         |
| checksum | VARCHAR(128) | Required, Unique |

---

## Processing Status

| Field  | Type | Constraints |
| ------ | ---- | ----------- |
| status | ENUM | Required    |

Values

* UPLOADING
* PROCESSING
* READY
* FAILED
* DELETED

---

## Audit Fields

| Field     | Type      |
| --------- | --------- |
| createdAt | DateTime  |
| updatedAt | DateTime  |
| deletedAt | DateTime? |

---

# 4. Category Entity

Represents an image category.

## Fields

| Field       | Type         | Constraints      |
| ----------- | ------------ | ---------------- |
| id          | UUID         | Primary Key      |
| name        | VARCHAR(100) | Required, Unique |
| description | TEXT         | Optional         |
| createdAt   | DateTime     | Required         |

---

Business Rules

* Category names are unique.
* Categories cannot be duplicated.
* Categories are managed by administrators.

---

# 5. Tag Entity

Represents reusable keywords.

## Fields

| Field     | Type         | Constraints      |
| --------- | ------------ | ---------------- |
| id        | UUID         | Primary Key      |
| name      | VARCHAR(100) | Required, Unique |
| createdAt | DateTime     | Required         |

---

Business Rules

* Duplicate tags are prohibited.
* Tags are reusable.
* Unlimited images may reference one tag.

---

# 6. ImageTag Entity

Many-to-many relationship.

## Fields

| Field   | Type | Constraints |
| ------- | ---- | ----------- |
| imageId | UUID | FK          |
| tagId   | UUID | FK          |

Composite Primary Key

(imageId, tagId)

---

# 7. Relationships

## User

```
User

1 -------- N

Image
```

---

## Category

```
Category

1 -------- N

Image
```

---

## Tag

```
Image

N -------- N

Tag

through

ImageTag
```

---

# 8. Required Enums

## ImageVisibility

```
PUBLIC

PRIVATE

UNLISTED
```

---

## ImageStatus

```
UPLOADING

PROCESSING

READY

FAILED

DELETED
```

---

## ImageLicense

```
ALL_RIGHTS_RESERVED

CC_BY

CC_BY_SA

PUBLIC_DOMAIN
```

---

# 9. Database Constraints

Unique

* storedFilename
* checksum
* category.name
* tag.name

Foreign Keys

* ownerId
* categoryId
* imageId
* tagId

Required Fields

* title
* ownerId
* categoryId
* storedFilename
* storagePath
* mimeType
* fileSize
* width
* height
* checksum
* visibility
* license
* status

---

# 10. Cascade Rules

Deleting an Image

* Deletes ImageTag records.

Deleting a Tag

* Deletes ImageTag records only.

Deleting a Category

* Restricted while images reference it.

Deleting a User

* Not allowed automatically.
* Future administrative workflow required.

---

# 11. Indexes

## Image

* ownerId
* categoryId
* visibility
* status
* createdAt

## Category

* name

## Tag

* name

## ImageTag

* imageId
* tagId

---

# 12. Validation Rules

Image

* Title required
* Supported MIME type
* Valid dimensions
* Maximum upload size
* Unique checksum
* Valid category

Category

* Unique name

Tag

* Unique name

---

# 13. Future Compatibility

This schema has been intentionally designed so future modules can reference the `Image` entity without structural changes.

Future tables will include relationships such as:

* Like → Image
* Download → Image
* CollectionItem → Image
* Bookmark → Image
* Comment → Image
* Notification → Image
* ImageReport → Image
* SearchIndex → Image

The `Image` table should remain the central domain entity throughout the lifetime of the project.

---

## ✅ Approved Design Summary

At the end of Sprint 2, The core database will look like:

```
Authentication
──────────────
Role
User
UserSession
EmailVerification
PasswordReset

Image Management
────────────────
Image
Category
Tag
ImageTag
```

