Absolutely. Since this document becomes the foundation of the entire system, it should read like a real Software Architecture / Domain Design document rather than simple notes.

---

# EthiopiaHub Images

# Sprint 2

# Domain Model

Version: 1.0

Status: Approved

---

# 1. Purpose

This document defines the business domain for the Image Management Module.

The domain model establishes the core business entities, their responsibilities, ownership rules, relationships, and lifecycle before any database schema or API implementation begins.

It acts as the blueprint for the database design, REST API, backend architecture, frontend integration, and future sprint planning.

This document intentionally focuses on business concepts rather than implementation details.

---

# 2. Objectives

The objectives of this domain model are to:

* Define the core business entities.
* Establish ownership and responsibility.
* Describe relationships between entities.
* Separate business logic from technical implementation.
* Ensure future scalability.
* Prevent redesign in later sprints.
* Provide a stable foundation for future modules.

---

# 3. Business Context

Sprint 1 introduced authentication and user identity.

Sprint 2 introduces the application's primary business asset:

**Images.**

Every future feature in EthiopiaHub Images revolves around the Image entity.

Examples include:

* Search
* Collections
* Downloads
* Likes
* Bookmarks
* Notifications
* Reports
* Analytics
* Administration

Because of this, the Image domain must be designed to remain stable throughout the application's lifecycle.

---

# 4. Domain Overview

The Sprint 2 domain consists of five primary business entities.

```
Role
 │
 │
 ▼
User
 │
 │ owns
 ▼
Image
 │
 ├────────────► Category
 │
 └────────────► Tag
```

These entities define the business language used throughout the application.

---

# 5. Core Business Entities

## 5.1 User

### Description

Represents an authenticated account within EthiopiaHub Images.

Users authenticate through the Authentication Module implemented in Sprint 1.

A user may contribute photographs, browse public images, and manage their own uploaded content according to their assigned role.

---

### Responsibilities

A user can:

* authenticate
* upload images
* edit owned images
* delete owned images
* browse public images
* manage personal profile

---

### Ownership Rules

A user owns zero or more images.

Ownership is permanent and cannot be transferred.

```
User

1 ------ * Image
```

---

## 5.2 Role

### Description

Defines the permissions assigned to a user.

Roles determine which business actions may be performed.

Authorization logic references the user's role before executing protected operations.

---

### Initial Roles

The system currently supports:

Viewer

Contributor

Administrator

Future roles may be introduced without redesigning the Image domain.

---

### Responsibilities

Roles determine permissions such as:

* upload images
* edit images
* delete images
* administrative moderation
* future dashboard access

---

## 5.3 Image

### Description

The Image entity represents the primary business asset of EthiopiaHub Images.

Every uploaded photograph is represented by exactly one Image record.

The Image entity stores ownership information, descriptive metadata, storage information, and publishing configuration.

The physical image file is stored separately from the business metadata.

---

### Responsibilities

The Image entity is responsible for:

* ownership
* metadata
* storage reference
* visibility
* licensing
* publication state

---

### Image Sections

Each Image consists of four logical sections.

---

### A. Ownership

Defines who owns the image.

Examples

* owner
* upload date

---

### B. Metadata

Describes the photograph.

Examples

* title
* description
* location
* category
* tags
* license
* visibility

---

### C. Storage Information

References the stored file.

Examples

* original filename
* stored filename
* storage path
* mime type
* extension
* width
* height
* file size

---

### D. System Information

Maintained automatically by the application.

Examples

* createdAt
* updatedAt
* deletedAt (future)
* status (future)

---

### Ownership Rule

Every Image belongs to exactly one User.

```
User

1 -------- * Image
```

---

## 5.4 Category

### Description

A Category groups images into broad business classifications.

Categories improve organization and prepare the platform for future search capabilities.

Examples include:

* Nature
* Wildlife
* Culture
* Architecture
* Food
* Festivals
* Landscapes
* Cities

---

### Responsibilities

Categories provide:

* organization
* filtering
* browsing
* future search indexing

---

### Relationship

One Category may contain many Images.

```
Category

1 ------ * Image
```

---

## 5.5 Tag

### Description

Tags provide flexible descriptive labels for images.

Unlike Categories, Tags are dynamic and allow users to describe image content in detail.

Examples

```
ethiopia

coffee

simien

lalibela

orthodox

sunrise

portrait
```

---

### Responsibilities

Tags support:

* discovery
* filtering
* recommendations
* future AI features

---

### Relationship

An Image may have many Tags.

A Tag may belong to many Images.

```
Image

* ------- * Tag
```

This many-to-many relationship will later be implemented using a junction table.

---

# 6. Business Relationships

## User → Image

Relationship

One-to-Many

Meaning

One user owns many images.

Every image belongs to one owner.

---

## Role → User

Relationship

One-to-Many

Meaning

A role may be assigned to multiple users.

Every user has one role.

---

## Category → Image

Relationship

One-to-Many

Meaning

One category contains many images.

Every image belongs to one category.

---

## Image → Tag

Relationship

Many-to-Many

Meaning

An image may have multiple tags.

A tag may describe multiple images.

---

# 7. Image Lifecycle

Every image passes through the same business lifecycle.

```
Upload Request
        │
        ▼
Authentication
        │
        ▼
Authorization
        │
        ▼
Validate File
        │
        ▼
Generate Unique Filename
        │
        ▼
Store Physical File
        │
        ▼
Extract Metadata
        │
        ▼
Persist Database Record
        │
        ▼
Image Published
        │
        ▼
Metadata Updated
        │
        ▼
Image Deleted
```

The lifecycle separates business rules from storage implementation and ensures consistency across all upload operations.

---

# 8. Business Rules

The following business rules apply throughout Sprint 2.

## Authentication

Only authenticated users may upload images.

---

## Authorization

Only image owners may update or delete their own images.

Administrative override is reserved for future moderation features.

---

## Ownership

Ownership is immutable.

Images cannot be transferred between users.

---

## Metadata

Image metadata is stored independently from the physical image.

Changing metadata does not modify the stored file.

---

## Storage

Physical file storage is abstracted.

Business logic must never depend on a specific storage provider.

This enables future migration to cloud storage services without modifying application logic.

---

## Validation

The system validates:

* supported image formats
* maximum upload size
* image dimensions
* corrupted files

Future duplicate detection will extend this validation process.

---

# 9. Domain Boundaries

Sprint 2 intentionally excludes the following business domains.

* Search
* Likes
* Collections
* Downloads
* Comments
* Bookmarks
* Notifications
* Analytics
* Moderation
* Reporting
* AI Tagging

These domains will extend the Image entity in later sprints rather than modifying its core responsibilities.

---

# 10. Future Domain Expansion

The Image entity is intentionally designed to support future business modules.

Future relationships will include:

```
Image
│
├── Likes
├── Downloads
├── Bookmarks
├── Collections
├── Comments
├── Reports
├── Search Index
├── AI Tags
├── Analytics
└── Notifications
```

No future sprint should redefine the Image entity.

Instead, new modules will reference the existing Image domain through well-defined relationships.

---

# 11. Domain Principles

The following principles guide all Sprint 2 implementation decisions.

* The Image entity is the central business object of EthiopiaHub Images.
* Every image has exactly one owner.
* Business metadata is independent from physical file storage.
* Storage implementation is replaceable without affecting business logic.
* Categories provide structured organization.
* Tags provide flexible classification.
* Authorization is enforced through ownership and user roles.
* The domain model prioritizes scalability, maintainability, and extensibility.
* Future modules extend the domain rather than redesign it.

---

# 12. Approval

| Item                        | Status     |
| --------------------------- | ---------- |
| Business Domain Defined     | ✅ Approved |
| Core Entities Identified    | ✅ Approved |
| Relationships Defined       | ✅ Approved |
| Ownership Rules Established | ✅ Approved |
| Business Rules Defined      | ✅ Approved |
| Lifecycle Defined           | ✅ Approved |
| Future Expansion Planned    | ✅ Approved |
| Ready for ERD Design        | ✅ Yes      |

---

I consider this document the **architectural baseline** for Sprint 2. The next document—**Database Design (ERD)**—will translate this business model into normalized database tables, relationships, foreign keys, indexes, constraints, and Prisma models. Getting that document right is critical because it will support not only image management but also your future Search, Collections, Likes, Bookmarks, Downloads, Notifications, Administration, and Analytics sprints without major redesign.
