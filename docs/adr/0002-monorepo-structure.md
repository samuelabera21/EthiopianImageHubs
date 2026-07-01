# ADR-0002: Monorepo Structure

**Status:** Accepted

**Date:** 2026-07-01

## Context

EthiopiaHub Images consists of multiple components that will evolve together, including the frontend application, backend API, API specification, database artifacts, engineering documentation, deployment configuration, and development scripts.

The project requires a repository structure that keeps these components organized while allowing independent development.

## Decision

The project will use a **monorepo**.

The repository structure is:

```text
ethiopiahub-images/

├── backend/
├── frontend/
├── database/
├── docs/
├── design/
├── docker/
├── openapi/
├── scripts/
├── .github/
├── README.md
├── LICENSE
└── .gitignore
```

Each directory has a single responsibility:

| Directory | Responsibility |
|------------|----------------|
| backend | Express.js API |
| frontend | Next.js application |
| database | Database scripts and ERD |
| openapi | OpenAPI specification |
| docs | Engineering documentation |
| design | UI/UX assets |
| docker | Docker configuration |
| scripts | Utility scripts |
| .github | GitHub workflows and templates |

## Alternatives Considered

- Separate repositories for frontend and backend.
- Microservice repositories.

These options were rejected because they add unnecessary complexity for the current project size.

## Consequences

### Positive

- Single source of truth.
- Easier dependency management.
- Shared documentation.
- Simpler onboarding.
- Unified version history.

### Negative

- Repository grows over time.
- CI/CD pipelines require careful organization.

## References

- Software Requirements Specification (SRS)
- Software Architecture Document (SAD)
- ADR-0001 Technology Stack