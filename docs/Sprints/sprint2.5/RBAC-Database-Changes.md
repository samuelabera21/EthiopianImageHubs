# Sprint 2.5 — RBAC Database Changes

## Purpose

This document defines the database changes required to support the Role-Based Access Control (RBAC) foundation.

No implementation details are included here. This document is the approved source before updating the Prisma schema.

---

# Existing Models

These models remain unchanged.

- User
- Role
- UserSession
- EmailVerification
- PasswordReset
- Category
- Tag
- Image
- ImageTag

---

# New Model

## ContributorApplication

Purpose:

Allows a registered User to request Contributor access.

This keeps the User table focused on authentication while supporting an approval workflow.

---

## Workflow

User
↓

Submit Application

↓

Pending Review

↓

Administrator Decision

↓

Approved → User becomes Contributor

or

Rejected → User remains User

---

## Initial Fields

- id
- userId
- reason
- status
- reviewedBy
- reviewedAt
- createdAt
- updatedAt

---

## Status Values

- PENDING
- APPROVED
- REJECTED

---

## Relationships

User
│
├── UserSession
├── PasswordReset
├── EmailVerification
├── Images
└── ContributorApplications

Administrator
│
└── Reviews Contributor Applications

---

# Database Changes Summary

## New Enum

ContributorApplicationStatus

- PENDING
- APPROVED
- REJECTED

---

## New Model

ContributorApplication

---

## Existing Models

No existing tables will be modified until the Prisma schema update phase.

---

# Out of Scope

Not included in Sprint 2.5:

- Government ID verification
- Portfolio review
- Sample image review
- Identity verification
- Contributor reputation
- Contributor badges
- Multiple application history
- Appeals

These features may be added in future sprints.