# Frontend Implementation Agent Prompt

You are implementing the frontend for the EthiopiaHub Images project.

The backend for the sprint is already implemented.

Your responsibility is to implement only the frontend required for the current sprint.

---

# Required Reading

Before writing code, read:

design/AI-development-workflow.md
design/Frontend-Architecture.md
design/Brand-Guidelines.md
design/Frontend-Engineering-Rules.md
design/Design-Tokens.md
design/UI-Component-Library.md
design/Page-Templates.md


- Sprint Documentation
- OpenAPI Specification

These documents are the source of truth.

---

# Project Inspection

Before coding, inspect the existing frontend.

Understand:

- app/
- components/
- features/
- hooks/
- services/
- providers/
- lib/
- types/
- constants/

Reuse the existing architecture.

Do not redesign it.

---

# Scope

Implement ONLY the current sprint.

Do not implement future sprint functionality.

Do not modify backend code.

---

# Implementation Order

Follow this order.

## Step 1

Read the sprint documentation.

Understand the feature.

---

## Step 2

Review the OpenAPI specification.

Identify:

- endpoints
- request bodies
- responses
- authentication requirements

---

## Step 3

Update services.

Every backend endpoint should have a matching frontend service.

Reuse the existing API client.

---

## Step 4

Update types.

Create or extend TypeScript interfaces.

Do not duplicate types.

---

## Step 5

Update hooks.

Encapsulate data fetching and mutations.

Business logic belongs in hooks.

---

## Step 6

Implement feature components.

Place them inside the appropriate feature folder.

Keep components focused and reusable.

---

## Step 7

Compose pages.

Pages should primarily assemble components and handle routing.

Avoid placing complex business logic in page files.

---

## Step 8

Connect authentication where required.

Reuse the existing authentication provider and protected route utilities.

---

## Step 9

Verify functionality.

Ensure the UI matches the backend API and sprint requirements.

---

# Existing Components

Always reuse existing components.

Examples:

- Button
- Card
- Input
- Header
- Footer
- Search
- Image Card
- Gallery
- Upload Components
- Loading Components
- Error Components

Do not recreate components that already exist.

---

# Styling

Reuse the existing design system.

Follow:

- Design Tokens
- Brand Guidelines
- UI Component Library

Do not invent a new visual style.

---

# State Management

Reuse the existing approach.

Avoid introducing new global state libraries unless explicitly requested.

---

# Services

Services should only communicate with the backend.

Do not place UI logic inside services.

---

# Hooks

Hooks should contain:

- API calls
- loading state
- error state
- success state

Do not render UI inside hooks.

---

# Components

Components should be presentational whenever possible.

Avoid unnecessary business logic inside components.

---

# Pages

Pages should:

- organize layouts
- compose components
- connect hooks

Keep them lightweight.

---

# Error Handling

Reuse existing error components.

Display friendly messages.

Do not expose raw server errors.

---

# Loading States

Every asynchronous page should provide:

- loading state
- empty state
- error state

Reuse existing components whenever available.

---

# Accessibility

Ensure:

- labels for inputs
- keyboard navigation
- semantic HTML
- appropriate ARIA attributes where necessary

---

# Large Refactors

Avoid large frontend refactors.

If a significant change appears necessary, stop and explain:

- why it is needed,
- which files would be affected,
- and wait for approval before proceeding.

---

# If Information Is Missing

Never guess.

If a UI requirement is unclear:

stop.

Explain exactly what information is missing.

---

# Deliverables

Complete the sprint by implementing:

- services
- types
- hooks
- feature components
- pages
- routing
- API integration
- loading states
- empty states
- error states

Reuse the existing project structure.

Modify only the files required for the sprint.

Keep the frontend consistent with the existing application.