Implement the backend for the requested sprint.

Read:

docs/AI-Project-Map.md
docs/Backend-Implementation-Template.md

docs/ai-prompts/AI-Implementation-Rules.md
docs/ai-prompts/Sprint-Implementation-Workflow.md
docs/ai-prompts/Backend-Agent-Prompt.md

Then read ALL documentation inside:

docs/Sprints/<SPRINT>/

including but not limited to:

• Scope
• Requirements
• User Stories
• Domain Model
• Database Changes
• Acceptance Criteria
• Backend Tasks (if present)

Read:

docs/openapi/<SPRINT>.yaml

Inspect the existing backend before coding.

Implement ONLY the missing functionality required for this sprint.

Preserve the architecture:

Route
↓
Controller
↓
Service
↓
Repository

Reuse existing middleware, validation, utilities, and Prisma client.

Avoid unnecessary refactoring.

If implementation requires modifying existing code, make the smallest change possible.

If required information is missing or inconsistent:

STOP.

Explain exactly what is missing before writing code.