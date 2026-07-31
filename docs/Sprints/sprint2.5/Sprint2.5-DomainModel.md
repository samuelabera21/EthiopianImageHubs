# Sprint 2.5 Domain Model

## Sprint Goal

Introduce Role-Based Access Control (RBAC) and the contributor application workflow without affecting existing authentication or image management features.

---

# Domain Entities

## User

Represents a registered platform user.

Responsibilities

- Authenticate
- Own uploaded images
- Submit one contributor application
- Receive an assigned role

Relationships

- Belongs to one Role
- Owns many Images
- Has zero or one Contributor Application

---

## Role

Defines the permissions available to a user.

Initial Roles

- USER
- CONTRIBUTOR
- MODERATOR
- ADMIN

Relationships

- One Role → Many Users

---

## Contributor Application

Represents a user's request to become a contributor.

Responsibilities

- Store application status
- Store optional message
- Store review information
- Link one application to one user

Statuses

- PENDING
- APPROVED
- REJECTED

Relationships

- Belongs to one User

---

# Business Flow

Register
↓

Role = USER
↓

Cannot Upload
↓

Submit Contributor Application
↓

Admin Reviews
↓

Approve
↓

Role Updated to CONTRIBUTOR
↓

User Can Upload Images

---

# Out of Scope

- Permission management UI
- Multiple applications
- Appeal process
- Contributor verification documents
- Email notifications
- Audit history

These features may be introduced in future sprints.