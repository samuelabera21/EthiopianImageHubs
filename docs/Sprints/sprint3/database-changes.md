# Sprint 3 Database Changes

## Purpose

This document defines all database changes required for Sprint 3.

Sprint 3 extends the existing Sprint 2 schema without modifying existing business logic.

Only new community interaction and contributor profile features are introduced.

---

# Existing Models Reused

The following models already exist and require no structural redesign.

- User
- Image
- Category
- Tag
- ImageTag
- Role

These remain the foundation for Sprint 3.

---

# New Models

Sprint 3 introduces five new entities.

---

## 1. ImageLike

Purpose

Stores which users liked which images.

Business Rule

A user can like an image only once.

Relationships

User
    1 ---- * ImageLike

Image
    1 ---- * ImageLike

Required Fields

- id
- userId
- imageId
- createdAt

Constraints

Unique(userId, imageId)

---

## 2. Favorite

Purpose

Stores images bookmarked by users.

Business Rule

A user can favorite an image only once.

Relationships

User
    1 ---- * Favorite

Image
    1 ---- * Favorite

Required Fields

- id
- userId
- imageId
- createdAt

Constraints

Unique(userId, imageId)

---

## 3. Download

Purpose

Stores every successful download.

This is NOT just a counter.

Every download becomes a record.

Relationships

User (optional)
      |

Download

      |

Image

Guest downloads may be stored without userId.

Required Fields

- id
- imageId
- userId (nullable)
- downloadedAt

Future Fields

- ipHash
- country
- device

---

## 4. UserProfile

Purpose

Stores public contributor profile information.

Authentication data remains inside User.

Public profile data is separated.

Relationship

User

1 ---- 1 UserProfile

Fields

- userId
- fullName
- bio
- profileImage
- website
- location

Future

- Twitter
- Instagram
- Facebook
- Portfolio

---

## 5. UserPortfolio (Optional)

Decision

Not required.

Reason

Portfolio can be generated directly from

Image.ownerId

Therefore a separate table is unnecessary.

The portfolio page simply queries

Image

WHERE ownerId = ?

No database model is required.

---

# Existing Models Requiring New Relations

## User

Will gain

likes
favorites
downloads
profile

---

## Image

Will gain

likes
favorites
downloads

---

# Existing Models That Do NOT Change

Category

Tag

ImageTag

Role

ContributorApplication

Authentication models

remain unchanged.

---

# Indexes

ImageLike

(userId, imageId)

Favorite

(userId, imageId)

Download

imageId

userId

downloadedAt

UserProfile

userId UNIQUE

---

# Sprint 3 Summary

New Tables

✓ ImageLike

✓ Favorite

✓ Download

✓ UserProfile

No New Table

✓ Portfolio

Portfolio is generated from Image ownership.
