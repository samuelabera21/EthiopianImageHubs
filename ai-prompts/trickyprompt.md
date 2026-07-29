Read the following project documents before generating code:

Project Instructions

.github/copilot-instructions.md

Design System

docs/design/Brand-Guidelines.md
docs/design/Design-Tokens.md
docs/design/UI-Component-Library.md
docs/design/Page-Templates.md
docs/design/Frontend-Engineering-Rules.md

Backend API Contract

openapi/sprint1OpenAPI.yaml

Current Project

Reuse existing Home page styles, layout patterns and components.
Analyze the current frontend folder before generating anything.
Task

Build the complete Login feature for EthiopiaHub Images.

This is Sprint 1.

Requirements

Follow the project architecture.

Reuse existing components whenever possible.

Do not create duplicate components.

Use App Router.

Use TypeScript.

Use Tailwind CSS.

Keep the UI fully responsive.

Follow accessibility best practices.

Match the existing Homepage visual language exactly.

Use the EthiopiaHub Images design system.

The page should feel consistent with Unsplash and Pexels while expressing Ethiopian identity.

API Integration

Use the Login endpoint defined inside:

openapi/sprint1OpenAPI.yaml

Do not invent endpoints.

Match the request and response exactly.

Prepare the page for backend integration.

Implement:

loading state
success state
validation errors
server errors
disabled submit button while loading
Validation

Use the same validation rules defined by the backend.

Display field-level errors.

Display API errors.

Components

Before creating a component, search the project.

If a reusable component already exists:

Button
Input
Card
Container
Section
Logo
Header
Footer

reuse it.

Only create new reusable components when absolutely necessary.

Folder Structure

Follow the existing project architecture.

Place files in the correct folders.

Do not place business logic inside UI components.

Code Quality

Generate production-ready code.

No placeholder logic.

No duplicated code.

Use clean architecture.

Use reusable hooks when needed.

Use reusable types.

Keep components small.

Use semantic HTML.

Deliverables

Create every file required for the Login feature.

At the end, explain:

files created
components reused
new reusable components created
API integration points
future reuse for Register/Forgot Password