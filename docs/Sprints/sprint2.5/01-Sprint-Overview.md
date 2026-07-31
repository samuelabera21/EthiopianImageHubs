# Sprint 2.5 Overview

## Sprint

Sprint 2.5

---

# Goal

Introduce the RBAC (Role-Based Access Control) foundation for EthiopiaHub Images while keeping all existing Sprint 1 and Sprint 2 functionality working.

This sprint prepares the backend for future administrative features without introducing a complete administration module.

---

# Objectives

This sprint introduces:

- Role-based authorization
- Contributor application workflow
- Role-aware endpoint protection
- RBAC database foundation
- Authorization middleware improvements

---

# Included Features

- Role management foundation
- Contributor application model
- Authorization middleware
- Protected API endpoints
- RBAC database changes
- OpenAPI updates

---

# Not Included

The following are intentionally excluded.

- Admin Dashboard
- User Management UI
- Admin Analytics
- Image Moderation
- Role Permission Editor
- Audit Logs

These belong to future sprints.

---

# Dependencies

Sprint 1 Authentication

Sprint 2 Image Management

Sprint 2.5 Database Changes

Sprint2.5 Domain Model

RBAC Plan

OpenAPI Sprint 2.5

---

# Expected Outcome

After this sprint:

- users authenticate normally
- authorization uses roles
- contributors can apply
- protected endpoints enforce permissions
- previous functionality continues to work

No existing API should break.