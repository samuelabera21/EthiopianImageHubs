# Frontend Implementation Template

## Purpose

This document defines the standard workflow for implementing frontend features in EthiopiaHub Images.

Every frontend sprint must follow this workflow.

---

# Implementation Order

Always implement frontend features in this order.

1. Read Sprint Documentation
2. Read OpenAPI Specification
3. Review Existing UI Architecture
4. Review Existing Components
5. Review Existing Services
6. Create API Service
7. Create Hooks
8. Create Feature Components
9. Create Pages
10. Integrate Authentication
11. Handle Loading States
12. Handle Error States
13. Verify Backend Compatibility
14. Testing

Do not change this order.

---

# Step 1 — Understand the Sprint

Before writing code:

- Read the sprint documentation.
- Understand the user workflow.
- Identify reusable components.
- Identify reusable hooks.
- Identify reusable services.

Never implement features outside the sprint scope.

---

# Step 2 — Review OpenAPI

OpenAPI is the frontend contract.

Before implementing:

- Review every endpoint.
- Review request body.
- Review response body.
- Review status codes.
- Review authentication requirements.

Frontend must never guess backend behavior.

---

# Step 3 — Review Existing Architecture

Follow the existing project structure.

Use:

app/

components/

features/

hooks/

services/

providers/

types/

Do not introduce a new architecture.

---

# Step 4 — Reuse Existing Components

Before creating a new component:

Search:

components/

features/

Reuse existing UI whenever possible.

Avoid duplicate components.

---

# Step 5 — Services

All backend communication belongs inside services.

Services should:

- Call APIs.
- Parse responses.
- Throw typed errors.
- Return typed data.

Services should never contain UI logic.

---

# Step 6 — Hooks

Hooks coordinate frontend logic.

Typical responsibilities:

- Fetch data
- Mutations
- Loading state
- Error state
- Cache invalidation
- Form submission

Hooks should not render UI.

---

# Step 7 — Components

Components should:

- Display data.
- Receive props.
- Remain reusable.
- Remain small.

Avoid business logic inside components.

---

# Step 8 — Pages

Pages should compose features.

Pages should:

- Assemble components.
- Handle routing.
- Call hooks.
- Avoid API calls directly.

Pages should remain thin.

---

# Step 9 — Authentication

Reuse the existing AuthProvider.

Reuse:

- Protected route hooks
- Existing auth services
- Existing authentication state

Never implement another authentication system.

---

# Step 10 — Authorization

Frontend authorization is only for user experience.

Backend remains the source of truth.

Never rely on frontend authorization for security.

---

# Step 11 — State Management

Reuse existing state management.

Do not introduce another global state library unless requested.

Prefer:

- React Query
- React Hooks
- Context (already existing)

---

# Step 12 — Forms

Forms should:

- Validate input.
- Show field errors.
- Disable submit while loading.
- Display backend validation messages.

Reuse existing validation schemas.

---

# Step 13 — Loading States

Every asynchronous page should provide:

- Loading spinner
- Skeleton screen when appropriate
- Disabled actions during requests

Never leave the UI without feedback.

---

# Step 14 — Error States

Every request should handle:

- Network errors
- Validation errors
- Unauthorized errors
- Forbidden errors
- Server errors

Reuse existing error components whenever possible.

---

# Step 15 — Accessibility

Ensure:

- Keyboard navigation
- Proper labels
- Focus management
- Semantic HTML
- Sufficient color contrast

Do not reduce accessibility.

---

# Step 16 — Responsive Design

All pages should work on:

- Mobile
- Tablet
- Desktop

Reuse existing layout components.

---

# Step 17 — Code Reuse

Before writing code:

Search:

components/

hooks/

services/

features/

lib/

Reuse existing code whenever possible.

Avoid duplication.

---

# Step 18 — Minimal Changes

Modify only files related to the requested feature.

Avoid:

- Large refactors
- Renaming components
- Moving folders
- Formatting unrelated files

Keep commits focused.

---

# Step 19 — Verification Checklist

Before considering implementation complete:

- TypeScript compiles.
- Pages build successfully.
- API requests succeed.
- Loading states work.
- Error states work.
- Forms validate correctly.
- Existing features still work.
- OpenAPI contract is respected.

---

# Step 20 — Completion Checklist

A frontend sprint is complete only when:

- All required pages are implemented.
- Existing UI patterns are preserved.
- Backend integration is complete.
- Authentication works.
- Authorization behaves correctly.
- Responsive design is verified.
- No placeholder code remains.
- Acceptance criteria are satisfied.

---

# AI Instructions

Before writing any frontend code:

1. Read the Sprint document.
2. Read the OpenAPI specification.
3. Inspect the existing frontend architecture.
4. Reuse existing components.
5. Reuse existing hooks.
6. Reuse existing services.
7. Implement only the requested scope.
8. Keep changes minimal.
9. If backend changes are required to support the feature, clearly identify them and update only the minimal necessary backend files.
10. If information is missing, ask for clarification instead of guessing.