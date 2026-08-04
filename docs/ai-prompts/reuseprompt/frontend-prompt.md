Implement the frontend for the requested sprint.

Read:

docs/AI-Project-Map.md
docs/Frontend-Implementation-Template.md

docs/ai-prompts/AI-Implementation-Rules.md
docs/ai-prompts/Sprint-Implementation-Workflow.md
docs/ai-prompts/Frontend-Agent-Prompt.md

Read the project Software Requirements Specification:

SRS.docx

Use the SRS as the primary source of business requirements, user experience, and functional behavior.

Then read ALL documentation inside:

docs/Sprints/<SPRINT>/

including but not limited to:

- Scope
- Requirements
- User Stories
- Domain Model
- API Design
- Frontend Tasks (if present)
- Acceptance Criteria

Read:

docs/openapi/<SPRINT>.yaml

Inspect the existing frontend before writing code, including:

- components
- pages
- layouts
- services
- hooks
- providers
- routing
- types
- utilities

Reuse existing:

- UI components
- layouts
- hooks
- services
- authentication provider
- API client
- shared utilities
- design system
- existing styling approach

Implement only the functionality required for this sprint.

Do not redesign the application.

Keep the existing UI/UX consistent unless the sprint explicitly requires a visual change.

Avoid unnecessary refactoring.

If an existing frontend component requires modification, make the smallest possible change needed.

The OpenAPI specification is the primary API contract, but it is not immutable. If you identify a small improvement that better aligns with the SRS, real-world UX practices, accessibility, consistency, responsiveness, maintainability, or frontend architecture, you may implement it.

For every improvement beyond the documented API or sprint documents, you must:

- Clearly explain what was changed.
- Explain why it improves the application.
- Keep the implementation consistent with the existing frontend.
- Avoid unnecessary redesigns.
- Avoid breaking existing functionality.

Frontend implementation assumes the backend for this sprint has already been completed.

If the SRS, sprint documents, OpenAPI, or existing frontend conflict, stop and explain the conflict before continuing.

If required information is missing, stop and ask for clarification.

Begin frontend implementation only.