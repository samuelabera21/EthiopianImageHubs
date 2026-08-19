# BACKEND SPRINT IMPLEMENTATION PROMPT

Implement the backend for the requested sprint.

You are working on the EthiopiaHub Images project.

==================================================
1. REQUIRED DOCUMENTS
==================================================

Read these project-level documents first:

docs/AI-Project-Map.md
docs/Backend-Implementation-Template.md

docs/ai-prompts/AI-Implementation-Rules.md
docs/ai-prompts/Sprint-Implementation-Workflow.md
docs/ai-prompts/Backend-Agent-Prompt.md

Read the project Software Requirements Specification:

ethiopiahub-images/SRS.pdf

The SRS is the primary source of truth for business requirements,
functional requirements, domain behavior, workflows, and constraints.

Then read ALL documentation inside the requested sprint folder:

docs/Sprints/<current-sprint>/

Do not assume that filenames are identical between sprints.
Read every document currently present in that sprint folder.

==================================================
2. SOURCE-OF-TRUTH PRIORITY
==================================================

Use this priority when determining what to implement:

1. Approved SRS
2. Approved SAD / architecture
3. Existing repository implementation and conventions
4. Approved sprint documentation
5. Approved OpenAPI specification
6. Explicit user decisions made during implementation

Do not replace project requirements with generic best practices
when they conflict with the approved project requirements.

If two sources conflict:

STOP.

Explain:

- Which documents conflict
- The exact conflict
- Which behavior each source requires
- What decision is required

Do not silently choose one.

==================================================
3. BEFORE WRITING CODE
==================================================

Inspect the existing repository and backend first.

Inspect at minimum:

- repository structure
- current git branch/status
- existing backend structure
- existing routes
- controllers
- services
- repositories/data-access layer
- Prisma schema
- Prisma migrations
- authentication middleware
- authorization/RBAC middleware
- validation
- error handling
- response utilities
- shared helpers
- OpenAPI specification
- existing tests
- relevant Sprint 1–previous sprint implementation

Before implementing anything, determine:

1. What already exists?
2. What Sprint <current-sprint> requires?
3. What can be reused?
4. What functionality is actually missing?
5. Does the database need to change?
6. Does the API contract need to change?
7. Which existing components need modification?
8. Are there blockers or ambiguities?

Do not start coding until this inspection is complete.

==================================================
4. IMPLEMENTATION SCOPE
==================================================

Implement ONLY the backend functionality required by the
current sprint documentation and SRS.

Do not implement:

- future sprint features
- unrelated features
- speculative features
- unnecessary abstractions
- unnecessary infrastructure
- unrelated refactoring
- framework migrations
- architecture redesigns

The goal is not to produce the largest implementation.

The goal is to implement the approved sprint requirements correctly
while preserving the existing system.

==================================================
5. EXISTING ARCHITECTURE
==================================================

Preserve the existing approved architecture.

Follow the project's established backend flow:

Route
↓
Controller
↓
Service
↓
Repository / Data Access

Reuse existing project components whenever possible.

Reuse existing:

- Prisma Client
- Authentication middleware
- Authorization middleware
- Validation
- Response utilities
- Error handling
- Logging
- Shared helpers
- Existing services
- Existing repository/data-access patterns

Do not create duplicate functionality when an existing component
can reasonably be reused.

Do not introduce a second architectural pattern.

==================================================
6. DATABASE RULE
==================================================

Before changing Prisma/database:

Current Prisma Schema
↓
SRS Requirement
↓
Sprint Requirement
↓
Gap
↓
Minimal Database Change
↓
Migration
↓
Tests

Do NOT create a database model merely because it seems useful.

Only change the database when the current schema cannot satisfy
an approved sprint requirement.

If a database change is required:

- explain why it is required
- identify the affected models
- identify affected relationships
- identify constraints/indexes if applicable
- make the smallest compatible change
- create/update the appropriate migration
- test the affected functionality
- verify existing functionality is not broken

Do not rewrite unrelated models.

Do not perform destructive database changes without explicit approval.

==================================================
7. API CONTRACT RULE
==================================================

Use the approved OpenAPI specification as the API contract.

Follow:

SRS
↓
Sprint API Contract
↓
OpenAPI
↓
Backend Implementation
↓
Tests

Do NOT silently change an API contract.

If the backend implementation appears to require an API change:

STOP and report:

- current API contract
- required change
- why the change appears necessary
- affected endpoints
- compatibility impact

Wait for approval before making a breaking or contract-level change.

Small non-breaking implementation improvements are allowed only
when they do not alter the documented API behavior or contract.

==================================================
8. BACKEND CHANGE POLICY
==================================================

If an existing backend component must be modified:

Make the smallest possible change.

The change must:

- be directly related to the sprint requirement
- preserve existing behavior where possible
- preserve existing architecture
- avoid unrelated refactoring
- avoid changing unrelated modules

If a larger backend change appears necessary:

STOP.

Explain:

- why the existing implementation is insufficient
- why the change is necessary
- what files/modules would be affected
- whether the architecture would change
- whether there is a smaller alternative

Do not make a large architectural change automatically.

==================================================
9. AUTHORIZATION AND SECURITY
==================================================

Reuse the existing authentication and authorization system.

Do not create a second authentication or RBAC system.

Verify:

- authentication requirements
- authorization requirements
- role/permission requirements
- ownership rules
- validation
- access control
- security-sensitive operations

Follow the SRS and existing project security conventions.

Do not invent new roles or permissions unless explicitly required
by the SRS or approved sprint documentation.

==================================================
10. TESTING
==================================================

Implement and/or update tests for the functionality introduced
by the sprint.

Where applicable test:

- successful behavior
- validation failures
- authentication failures
- authorization failures
- business-rule failures
- database behavior
- API behavior
- integration behavior
- relevant failure paths

Run the relevant existing test suite.

Do not delete or weaken existing tests merely to make the sprint pass.

==================================================
11. MINIMAL-CHANGE PRINCIPLE
==================================================

Prefer:

Reuse existing code
>
Modify existing code
>
Add small isolated functionality
>
Create new abstraction only when necessary

Avoid:

Large refactors
Architecture redesign
Framework changes
Unrelated cleanup
Duplicate services
Duplicate middleware
Duplicate database models
Future features

If backend changes are necessary, you MAY update the backend,
but keep the changes localized and directly traceable to the
approved sprint requirements.

==================================================
12. SPRINT-SPECIFIC BOUNDARIES
==================================================

The current sprint documentation defines the sprint boundary.

Do not implement functionality that belongs to a future sprint.

For example, if the current sprint creates or submits data into
a moderation workflow but the moderator dashboard is not part of
the current sprint:

Implement the backend functionality required to create/update
the moderation state or queue according to the SRS.

DO NOT implement the moderator dashboard unless it is explicitly
included in the current sprint scope.

The same principle applies to any other future feature.

==================================================
13. IMPLEMENTATION ORDER
==================================================

When appropriate, implement in this order:

1. Database changes, if actually required
2. Validation
3. Authorization
4. Repository/data access
5. Service/domain logic
6. Controller
7. Route
8. Supporting integrations
9. Tests
10. Documentation/OpenAPI updates only where approved

Follow the existing project's actual conventions if they differ.

==================================================
14. STOP CONDITIONS
==================================================

STOP and ask for direction when:

- the SRS is ambiguous
- sprint requirements are ambiguous
- documents conflict
- the approved architecture appears insufficient
- a large refactor appears necessary
- an API contract must be changed
- a breaking change appears necessary
- destructive database changes are proposed
- an existing security model must be replaced
- required information is missing

Do not guess.

Do not silently make major decisions.

==================================================
15. COMPLETION REPORT
==================================================

At the end provide a concise implementation report containing:

1. Files changed
2. Backend functionality implemented
3. Database changes
4. API changes
5. Authentication/authorization changes
6. Tests added/updated
7. Tests executed and results
8. SRS requirements completed
9. Sprint requirements completed
10. Remaining work
11. Deviations from the sprint documents
12. Decisions made during implementation

For every deviation, explain why it was necessary.

==================================================
16. FINAL RULE
==================================================

Implement the sprint correctly.

Preserve the existing system.

Make the smallest reasonable change.

Do not expand the sprint.

Do not implement future features.

Do not silently change requirements.

Do not silently change API contracts.

Do not make large backend changes unless explicitly approved.

If something is unclear or requires a significant architectural,
database, security, or API decision:

STOP AND ASK.