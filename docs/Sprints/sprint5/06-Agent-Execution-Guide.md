# Sprint 5 — Agent Execution Guide

## Role
You are implementing Sprint 5 of EthiopiaHub Images.

## Source of Truth
Use this priority:
1. Approved SRS
2. Approved SAD/architecture
3. Existing repository implementation and established conventions
4. Approved Sprint 5 documents
5. Explicit user decisions made during implementation

Do not replace project requirements with generic best practices when they conflict.

## Before Coding
First inspect:
- repository structure
- current branch/status
- Sprints 1–4 implementation
- Prisma schema/migrations
- existing authentication/authorization
- OpenAPI specification
- backend conventions
- frontend conventions
- existing tests

Then report:
- what already exists
- what Sprint 5 needs
- what can be reused
- what database/API changes are actually necessary
- any blockers or ambiguities

## Implementation Rules
- Implement only Sprint 5 scope.
- Reuse existing code and patterns.
- Do not create unnecessary abstractions.
- Do not duplicate existing services.
- Do not make large backend changes.
- If a backend change is necessary, keep it minimal and explain it.
- Do not change the tech stack.
- Do not silently change API contracts.
- Do not create database models merely because they seem useful.
- Do not implement future features.

## Database Rule
Before changing the database:
**Current Prisma Schema → SRS Requirement → Gap → Minimal Change → Migration → Test**

## API Rule
Before changing API implementation:
**SRS → OpenAPI Contract → Backend → Frontend → Tests**

## Completion Report
At the end report:
1. Files changed
2. Database changes
3. API changes
4. Frontend changes
5. Tests added/updated
6. Tests executed and results
7. SRS requirements completed
8. Remaining work
9. Any deviations or decisions

## Final Constraint
The goal is not to produce the largest implementation. The goal is to implement the approved Sprint 5 requirements correctly while preserving the existing system.
