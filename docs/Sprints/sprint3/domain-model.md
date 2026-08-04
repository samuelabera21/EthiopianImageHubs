# Sprint 3 Domain Model
## EthiopiaHub Images

Version: 1.0
Sprint: Sprint 3 – Community & User Content
Status: Approved

---

# 1. Purpose

This document defines the business domain model for Sprint 3.

It identifies the domain entities involved in community interactions,
their responsibilities, and the relationships between them.

This document is implementation-independent and serves as the bridge
between the Sprint 3 scope and the database design.

---

# 2. Sprint 3 Business Goal

Sprint 3 introduces user interaction with published images.

At the end of this sprint users should be able to:

- Like images
- Favorite images
- Download images
- View download history
- View contributor profiles
- Browse contributor portfolios

These features operate only on approved public images.

---

# 3. Domain Overview

Sprint 3 introduces the following business entities:

User
Contributor Profile
Image
Like
Favorite
Download
Download History

The relationships among these entities create the community interaction
layer of the platform.

---

# 4. Domain Entities

## 4.1 User

Represents an authenticated platform user.

Responsibilities

- authenticate
- like images
- favorite images
- download images
- view own download history
- view contributor profiles

Existing Entity

This entity already exists from Sprint 1.

---

## 4.2 Contributor Profile

Represents the public profile of a contributor.

Responsibilities

- expose public information
- expose biography
- expose avatar
- expose portfolio
- expose statistics

Examples of statistics

- total uploads
- approved images
- downloads
- likes
- favorites

This entity extends the existing Profile entity.

---

## 4.3 Image

Represents a published image.

Only images satisfying all of the following may participate in Sprint 3.

- Approved
- Published
- Public

Responsibilities

- receive likes
- receive favorites
- receive downloads
- appear inside contributor portfolio

Image ownership never changes.

---

## 4.4 Like

Represents a positive reaction by one user.

Relationship

One User

↓

Many Likes

↓

One Image

Business Meaning

A user expresses appreciation for an image.

A user may like an image only once.

Duplicate likes are not permitted.

Removing a like deletes only the Like relationship.

The image remains unchanged.

---

## 4.5 Favorite

Represents a saved image.

Relationship

One User

↓

Many Favorites

↓

One Image

Business Meaning

Favorites create a personal collection of bookmarked images.

A favorite belongs only to its owner.

Other users cannot modify another user's favorites.

One user may favorite an image only once.

---

## 4.6 Download

Represents a completed image download.

Relationship

One User (optional)

↓

Many Downloads

↓

One Image

Guest downloads are allowed.

Therefore User is optional.

Business Meaning

A download is a historical event.

Downloads are immutable.

Existing download records are never updated.

Only new records are created.

---

## 4.7 Download History

Represents a user's chronological list of downloads.

This is not a separate database table.

It is a logical business view built from Download records.

Users may:

- browse history
- paginate history
- filter history

---

# 5. Relationships

User
│
├── Likes
│
├── Favorites
│
├── Downloads
│
└── Profile

Profile
│
└── Uploaded Images

Image
│
├── Likes
├── Favorites
├── Downloads
└── Contributor

---

# 6. Ownership Rules

User owns

- Likes
- Favorites
- Download History

Contributor owns

- Images

Platform owns

- Download statistics
- Aggregate counts

---

# 7. Business Rules

## Likes

A user cannot like the same image twice.

A removed like permanently deletes only the relationship.

Like count equals the number of Like records.

---

## Favorites

Favorites are private.

A user cannot favorite the same image twice.

Removing a favorite never deletes the image.

---

## Downloads

Every successful download creates a new Download record.

Downloads are immutable.

Download history cannot be edited.

Historical downloads remain even if image statistics change.

---

## Contributor Profile

Every user owns exactly one profile.

Public profiles expose only public information.

Private account information is never displayed.

---

## Portfolio

A contributor portfolio contains only

- Published images
- Public images

Draft

Pending

Rejected

Archived

Deleted

images never appear.

---

# 8. Derived Information

The following values are derived.

Like Count

Number of Like records.

Favorite Count

Number of Favorite records.

Download Count

Number of Download records.

Portfolio Count

Number of published images owned by contributor.

These values should not require manual updates.

---

# 9. Access Rules

Visitor

Can

- view contributor profile
- browse portfolio
- download public images (subject to policy)

Cannot

- like
- favorite
- view personal download history

---

Authenticated User

Can

- like
- unlike
- favorite
- unfavorite
- download
- view history

---

Contributor

Can

Everything a user can do.

Additionally

- expose public portfolio.

---

Administrator

Can

View community statistics.

Administrative actions do not alter historical download records.

---

# 10. Out of Scope

Sprint 3 does NOT include

Comments

Following contributors

Image processing

Moderation

Collections

Notifications

Recommendations

AI search

Search improvements

Image editing

Bulk downloads

Upload workflow changes

---

# 11. Traceability

This domain model satisfies the following SRS requirements.

FR-500

Community Interaction

FR-600

Contributor Profiles

FR-700

Favorites

FR-800

Downloads

Chapter 5

Logical Database Model

Chapter 6

REST API

Chapter 9

Content Governance