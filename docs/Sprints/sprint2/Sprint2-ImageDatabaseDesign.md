# EthiopiaHub Images

# Sprint 2

# Image Database Design

Version: 1.0

Status: Approved

---

# 1. Purpose

This document defines the complete database design for the Image Management Module introduced in Sprint 2.

It establishes the data model used to upload, organize, retrieve, update, and delete image assets while maintaining data integrity, ownership, scalability, and future extensibility.

This design intentionally includes only the database entities required for image management.

Future modules such as Search, Collections, Likes, Downloads, Bookmarks, Notifications, Moderation, and Analytics will build upon this database without requiring major structural changes.

---

# 2. Design Principles

The database design follows these principles.

- Normalize business data.
- Avoid duplicated information.
- Separate metadata from authentication.
- Preserve ownership history.
- Support future cloud storage providers.
- Keep relationships explicit.
- Ensure referential integrity.
- Minimize future database migrations.

---

# 3. Existing Authentication Tables

The following tables already exist from Sprint 1.

- users
- roles
- user_sessions
- email_verifications
- password_resets

These tables remain unchanged.

Sprint 2 extends the system by introducing image-related entities.

---

# 4. New Database Entities

Sprint 2 introduces the following entities.

| Entity | Purpose |
|----------|----------|
| images | Stores uploaded image information |
| categories | Organizes images into categories |
| tags | Reusable image tags |
| image_tags | Many-to-many relationship between images and tags |

No additional entities are introduced during Sprint 2.

---

# 5. Entity Responsibilities

---

## 5.1 Images

Represents one uploaded photograph.

Each image belongs to exactly one contributor.

The image stores both business metadata and storage metadata.

The physical image file is stored separately from the metadata.

Images become the core entity used by all future modules.

---

## 5.2 Categories

Represents predefined image categories.

Examples

- Landscape
- Wildlife
- Culture
- Architecture
- Coffee
- Festival

Categories improve browsing and future search performance.

Each image belongs to one category.

---

## 5.3 Tags

Represents reusable keywords.

Examples

- Addis Ababa
- Lalibela
- Coffee Ceremony
- Mountains
- Orthodox

Tags improve search and filtering.

A tag may belong to many images.

An image may contain many tags.

---

## 5.4 Image Tags

Junction table implementing

Many Images ↔ Many Tags

This keeps the database normalized.

---

# 6. Entity Relationships

```
Role
 │
 └────────────┐
              │
              ▼
            User
              │
              │ 1
              │
              │
              ▼
           Image
            │
            │
      ┌─────┴─────┐
      │           │
      ▼           ▼
 Category     ImageTag
                  │
                  ▼
                 Tag
```

---

# 7. Image Ownership

Every image must belong to exactly one user.

Ownership is immutable.

Changing ownership is not supported.

Deleting a user does not automatically delete uploaded images unless explicitly handled by future administrative workflows.

---

# 8. Image Lifecycle

Image creation

↓

Validation

↓

Storage

↓

Metadata persistence

↓

Available for retrieval

↓

Metadata update

↓

Deletion

---

# 9. Image Metadata

Each image stores business metadata including

- title
- description
- category
- visibility
- license
- upload timestamp

The system also stores technical metadata including

- filename
- mime type
- width
- height
- file size
- checksum
- storage path

Future EXIF extraction may populate

- camera
- lens
- ISO
- aperture
- shutter speed
- GPS

without changing the database design.

---

# 10. Storage Strategy

Business logic never depends on the storage provider.

The database stores only references.

Example

```
images/2026/07/abc123.jpg
```

Future providers may include

- Local Storage
- AWS S3
- Cloudinary
- Azure Blob Storage
- Google Cloud Storage

No business logic should change when storage changes.

---

# 11. Image Visibility

Each image has a visibility status.

Possible values

PUBLIC

PRIVATE

UNLISTED

Future moderation may introduce

ARCHIVED

HIDDEN

FLAGGED

without changing business logic.

---

# 12. Image Status

Images maintain processing status.

Possible values

UPLOADING

PROCESSING

READY

FAILED

DELETED

Future optimization workers will update these values.

---

# 13. Image License

Every image contains licensing information.

Examples

All Rights Reserved

Creative Commons

Public Domain

Commercial License

License values remain configurable.

---

# 14. Categories

Categories are managed centrally.

Categories should not be duplicated.

Each image references exactly one category.

Categories may contain unlimited images.

---

# 15. Tags

Tags are reusable.

Duplicate tags are not allowed.

Tags improve

- filtering
- searching
- recommendations

Future AI tagging can reuse this table.

---

# 16. Database Constraints

The system shall enforce

Unique category names

Unique tag names

Unique storage filenames

Valid ownership

Required image metadata

Foreign key integrity

---

# 17. Cascade Rules

Deleting an image

removes

- image_tags

Deleting a category

is restricted if images exist.

Deleting a tag

removes only image_tag relationships.

Deleting a contributor

does not automatically delete uploaded images.

Administrative workflows decide future ownership handling.

---

# 18. Index Strategy

Indexes should exist on

Images

- owner
- category
- visibility
- status
- upload date

Categories

- name

Tags

- name

Image Tags

- image_id
- tag_id

These indexes support future search features.

---

# 19. Future Extension Points

Sprint 2 intentionally prepares for future modules.

Sprint 3

Search Engine

Sprint 4

Collections

Sprint 5

Downloads

Sprint 6

Likes

Sprint 7

Bookmarks

Sprint 8

Notifications

Sprint 9

Administration

Sprint 10

Analytics

No future sprint should require redesigning the Image table.

---

# 20. Database Summary

Authentication Tables

- Roles
- Users
- Sessions
- Email Verification
- Password Reset

Sprint 2 Tables

- Images
- Categories
- Tags
- Image Tags

Total Tables after Sprint 2

Authentication

5 tables

Image Management

4 tables

Overall

9 tables

---

# 21. Next Step

After approving this document, the implementation process continues in the following order.

1. Entity Field Specification
2. Entity Relationship Diagram (ERD)
3. Prisma Schema Design
4. Storage Architecture
5. OpenAPI Specification
6. Backend Architecture
7. Frontend Architecture
8. Sprint 2 Implementation

No implementation should begin until the database schema has been finalized and approved.