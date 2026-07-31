# Sprint 2.5 — RBAC Foundation Plan

## Purpose

Define the authorization model that will be used throughout the EthiopiaHub Images platform before implementing user interaction features.

---

# System Roles

1. Guest
2. User
3. Contributor
4. Moderator
5. Administrator

---

# Role Assignment Flow

Guest
↓
User (after registration)

User
↓
Contributor (approved by Administrator)

Contributor
↓
Moderator (assigned by Administrator)

Moderator
↓
Administrator (assigned by Administrator)

---

# Role Responsibilities

## Guest

- Browse public pages
- Search images
- View image details
- Register
- Login

---

## User

Everything a Guest can do, plus:

- Like images
- Save/Favorite images
- Download images
- View personal profile
- Manage own account
- Apply to become a Contributor (future)

Cannot upload images.

---

## Contributor

Everything a User can do, plus:

- Upload images
- Edit own images
- Delete own draft images
- View upload statistics

Cannot moderate other users.

---

## Moderator

Everything a Contributor can do, plus:

- Review uploaded images
- Approve images
- Reject images
- Request metadata changes
- Archive images
- Remove policy-violating images
- Review reports

Cannot manage platform settings.

---

## Administrator

Full system access.

Can:

- Manage users
- Assign roles
- Suspend users
- Manage moderators
- Manage categories
- Manage platform settings
- View analytics
- Manage governance
- Configure platform

---

# Ownership Rules

Users can modify only their own resources unless their role explicitly allows otherwise.

Examples

Guest
- Owns nothing

User
- Own profile
- Own favorites
- Own collections

Contributor
- Own uploaded images

Moderator
- Can moderate any image
- Cannot change image ownership

Administrator
- Full ownership permissions

---

# General Authorization Rules

- Authentication is required for protected endpoints.
- Authorization is role-based.
- Ownership checks are required for editable resources.
- Public resources remain accessible without authentication.
- Administrative operations require Administrator role.
- Moderation operations require Moderator or Administrator role.

---

# Future Extensions

This RBAC model is designed to support future modules including:

- Content Moderation
- Governance
- Copyright Management
- Analytics
- Reporting
- Editorial Collections
- Organization Accounts