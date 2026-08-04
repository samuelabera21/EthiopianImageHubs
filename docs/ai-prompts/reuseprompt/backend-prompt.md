Implement the backend for the requested sprint.

Read:

docs/AI-Project-Map.md
docs/Backend-Implementation-Template.md

docs/ai-prompts/AI-Implementation-Rules.md
docs/ai-prompts/Sprint-Implementation-Workflow.md
docs/ai-prompts/Backend-Agent-Prompt.md

Read the project Software Requirements Specification:

SRS.docx

Use the SRS as the primary source of business requirements and domain behavior.

Then read ALL documentation inside:

docs/Sprints/<SPRINT>/

including but not limited to:

- Scope
- Requirements
- User Stories
- Domain Model
- Database Changes
- Backend Tasks (if present)
- Acceptance Criteria

Read:

docs/openapi/<SPRINT>.yaml

Inspect the existing backend before writing code.

Implement only the missing functionality required for this sprint.

Preserve the existing architecture:

Route
↓
Controller
↓
Service
↓
Repository

Reuse existing:

- Prisma Client
- Authentication middleware
- Authorization middleware
- Validation
- Response utilities
- Error handling
- Shared helpers

Avoid unnecessary refactoring.

If an existing backend component requires modification, make the smallest possible change needed.

The OpenAPI specification is the implementation contract, but it is not immutable. If you identify a small improvement that better aligns with the SRS, real-world engineering practices, security, validation, performance, or maintainability, you may implement it.

For every improvement beyond the documented OpenAPI, you must:

- Clearly explain what was changed.
- Explain why it is beneficial.
- Ensure it remains compatible with the overall API design.
- Avoid introducing breaking changes unless explicitly approved.

If the SRS, sprint documents, OpenAPI, or existing implementation conflict, stop and explain the conflict before continuing.

If required information is missing, stop and ask for clarification.

Begin with backend implementation only.