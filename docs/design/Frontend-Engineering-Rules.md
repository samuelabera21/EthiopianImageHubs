# EthiopiaHub Images
# Frontend Engineering Rules

Version: 1.0

Status: Approved

Project: EthiopiaHub Images

Applies To

Next.js Frontend

---

# 1. Purpose

This document defines the engineering standards for the EthiopiaHub Images frontend.

Every developer must follow these rules.

The objective is

Consistency

Maintainability

Scalability

Performance

Accessibility

Clean Architecture

---

# 2. Engineering Philosophy

Build once.

Reuse forever.

Never duplicate UI.

Never duplicate logic.

Every feature should extend the system,
not replace it.

---

# 3. Technology Stack

Framework

Next.js (App Router)

Language

TypeScript

Styling

Tailwind CSS

UI Components

Custom Design System

Icons

Lucide React

Forms

React Hook Form

Validation

Zod

API Client

Axios

Data Fetching

TanStack Query

Authentication

JWT

State

Zustand

Notifications

Sonner

Theme

next-themes

Testing

Vitest

React Testing Library

E2E

Playwright

Linting

ESLint

Formatting

Prettier

Package Manager

pnpm

---

# 4. Project Structure

src/

app/

components/

features/

hooks/

lib/

services/

store/

types/

utils/

constants/

styles/

providers/

config/

Every folder has one responsibility.

---

# 5. Component Organization

components/

ui/

layout/

forms/

navigation/

feedback/

gallery/

upload/

profile/

admin/

shared/

Never mix unrelated components.

---

# 6. Feature Organization

features/

authentication/

gallery/

search/

upload/

profile/

collections/

admin/

Each feature owns

Components

Hooks

Types

Services

Utilities

Tests

---

# 7. Component Rules

Every component

Single responsibility

Reusable

Typed

Accessible

Responsive

Documented

Never exceed one responsibility.

---

# 8. Naming Convention

Components

PascalCase

Button.tsx

Navbar.tsx

GalleryCard.tsx

Hooks

useAuth.ts

useGallery.ts

Files

kebab-case

Folders

kebab-case

Variables

camelCase

Types

PascalCase

Constants

UPPER_CASE

---

# 9. Import Order

External libraries

↓

Internal libraries

↓

Components

↓

Hooks

↓

Utilities

↓

Styles

Alphabetical within groups.

---

# 10. Design System Rule

Never hardcode

Colors

Spacing

Typography

Radius

Shadows

Animations

Everything comes from Design Tokens.

---

# 11. Styling Rules

Tailwind utilities first.

Avoid inline styles.

Avoid custom CSS unless necessary.

No !important.

No duplicated utility groups.

Use semantic class composition when repeated.

---

# 12. Responsive Development

Mobile First

Required breakpoints

Mobile

Tablet

Laptop

Desktop

Large Desktop

Every page must work at every size.

---

# 13. Accessibility

Semantic HTML

Keyboard navigation

Focus visible

ARIA when needed

Labels for every input

Alt text

WCAG AA

44px touch targets

Accessibility is mandatory.

---

# 14. State Management

Local state

useState

Shared UI state

Zustand

Server state

TanStack Query

Forms

React Hook Form

Validation

Zod

Choose the smallest tool that solves the problem.

---

# 15. API Layer

Never call Axios directly inside UI components.

Flow

Page

↓

Hook

↓

Service

↓

API Client

↓

Backend

Pages never know API details.

---

# 16. Authentication

JWT Authentication

Protected Routes

Public Routes

Role Based Access

Token Refresh

Automatic Logout

Centralized Auth Provider

---

# 17. Error Handling

Every request supports

Loading

Success

Error

Retry

Empty

Offline

Never ignore errors.

---

# 18. Loading Rules

Skeletons

Optimistic UI where appropriate

Loading buttons

Lazy loading

Code splitting

Never flash empty content.

---

# 19. Forms

React Hook Form

Zod validation

Reusable inputs

Shared error component

Consistent validation messages

Never duplicate validation logic.

---

# 20. Routing

App Router

Nested layouts

Route groups

Loading UI

Error UI

Not Found UI

Dynamic metadata

---

# 21. Performance

Lazy load heavy components

Optimize images

Prefetch routes

Memoize expensive computations only when justified

Minimize bundle size

Avoid unnecessary re-renders

Performance is a feature.

---

# 22. Images

Use Next.js Image component

Responsive sizes

Lazy loading

Meaningful alt text

Never distort images

Use blur placeholders when possible

---

# 23. Icons

Lucide React only.

Never mix icon libraries.

---

# 24. Animations

Framer Motion only when needed.

Subtle

Fast

Purposeful

Never animate for decoration.

---

# 25. Environment Variables

Never expose secrets.

Use

.env.local

Separate

Development

Staging

Production

---

# 26. Constants

Store all reusable values in

constants/

Never scatter magic strings.

---

# 27. Utilities

Utilities must be

Pure

Reusable

Testable

No side effects.

---

# 28. Hooks

Hooks contain reusable frontend logic.

Hooks never render UI.

Examples

useAuth

useSearch

useInfiniteGallery

useUpload

---

# 29. Services

Every backend module has a matching frontend service.

Examples

AuthService

GalleryService

UploadService

ProfileService

AdminService

---

# 30. Types

Shared types live in

types/

Never duplicate interfaces.

---

# 31. Testing

Every feature should include

Unit tests

Integration tests

Critical user flow E2E tests

Test behavior, not implementation details.

---

# 32. Git Workflow

Feature branch

↓

Development

↓

Pull Request

↓

Review

↓

Merge

↓

Main

Never commit directly to main.

---

# 33. Pull Request Checklist

Build passes

Lint passes

Formatting passes

Tests pass

Responsive verified

Accessibility checked

No duplicated components

Uses Design Tokens

Documentation updated if needed

---

# 34. Documentation

Every reusable component should document

Purpose

Props

Variants

Examples

Accessibility notes

Breaking changes

---

# 35. Code Review Rules

Readable

Simple

Reusable

Typed

Accessible

Responsive

Secure

Performant

Reject code that violates standards.

---

# 36. Security

Escape user content

Validate input

Never trust client data

Use HTTPS in production

Protect routes

Handle tokens securely

---

# 37. SEO

Every public page includes

Title

Description

Open Graph

Structured headings

Canonical URL

Readable URLs

---

# 38. Internationalization

Text should be easy to extract for future localization.

Avoid embedding user-facing strings inside complex logic.

---

# 39. Logging

Development

Detailed logs

Production

Minimal logs

Never expose sensitive data.

---

# 40. Folder Ownership

Each feature owns

UI

Hooks

Services

Tests

Utilities

Avoid cross-feature dependencies unless shared.

---

# 41. Definition of Done

A frontend feature is complete only when

✓ Uses approved Page Template

✓ Uses approved Components

✓ Uses Design Tokens

✓ Responsive

✓ Accessible

✓ Connected to backend

✓ Error states implemented

✓ Loading states implemented

✓ Empty states implemented

✓ Tested

✓ Linted

✓ Formatted

✓ Reviewed

✓ Documented

---

# 42. Architecture Flow

Brand Guidelines

↓

Design Tokens

↓

Component Library

↓

Page Templates

↓

Feature Design

↓

Frontend Implementation

↓

Testing

↓

Review

↓

Release

Never skip layers.

---

# 43. Future Scalability

This architecture must support

Public Website

Authentication

Image Gallery

Collections

User Dashboard

Admin Dashboard

API Documentation

Future Mobile App

Future AI Features

without changing the core architecture.

---

# 44. Engineering Principles

Consistency over creativity

Reuse over duplication

Composition over complexity

Accessibility by default

Performance by default

Documentation by default

Security by default

Quality before speed

---

# 45. Final Rule

Before writing any frontend code ask:

Does this already exist?

If YES

Reuse it.

If NO

Add it to the Design System first.

Only then build the feature.

This rule applies to every sprint for the lifetime of EthiopiaHub Images.