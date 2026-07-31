Implement Sprint 2.5 backend.

Read:
docs/AI-Project-Map.md
docs/Backend-implementation-Template.md


Read:
- docs/ai-prompts/AI-Implementation-Rules.md
- docs/ai-prompts/Sprint-Implementation-Workflow.md
- docs/ai-prompts/Backend-Agent-Prompt.md

Read Sprint Documents:

- docs/Sprints/sprint2.5/01-Sprint-Overview.md
- docs/Sprints/sprint2.5/02-Implementation-Plan.md
- docs/Sprints/sprint2.5/03-Backend-Tasks.md
- docs/Sprints/sprint2.5/05-Acceptance-Criteria.md
- docs/Sprints/sprint2.5/RBAC-Plan.md
- docs/Sprints/sprint2.5/RBAC-Database-Changes.md
- docs/Sprints/sprint2.5/Sprint2.5-DomainModel.md

Read:

- docs/openapi/sprint2.5.yaml

Inspect existing backend before coding.

Implement only missing functionality.

Preserve architecture:

Route
↓
Controller
↓
Service
↓
Repository

Reuse:

- auth middleware
- authorize middleware
- validators
- response utilities
- Prisma client

Avoid large refactors.

If a backend adjustment is needed, make the smallest possible change.

If information is missing:

STOP.

Ask for clarification.

Begin with backend only.