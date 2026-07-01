# ADR-0001: Technology Stack

**Status:** Accepted

**Date:** 2026-07-01

## Context

The EthiopiaHub Images platform requires a modern, scalable, maintainable, and open-source technology stack that supports rapid Agile development, REST APIs, secure authentication, image management, and cloud deployment.

The selected technologies should:

- Support long-term maintenance.
- Be widely adopted by the developer community.
- Provide strong TypeScript support.
- Integrate well together.
- Be suitable for deployment on modern cloud platforms.

## Decision

The following technology stack is adopted for the project.

| Layer | Technology |
|--------|------------|
| Frontend | Next.js |
| Language | TypeScript |
| Backend | Express.js |
| Runtime | Node.js LTS |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT (Access + Refresh Tokens) |
| API Specification | OpenAPI 3.1 |
| API Documentation | Swagger UI |
| File Storage | Cloudinary |
| Version Control | Git |
| Repository Hosting | GitHub |
| Package Manager | npm |
| Testing | Postman, Jest |
| Code Formatting | Prettier |
| Linting | ESLint |
| Deployment (Frontend) | Vercel |
| Deployment (Backend) | Render |

## Alternatives Considered

- NestJS
- MongoDB
- MySQL
- Firebase
- Supabase

These alternatives were not selected because the chosen stack better aligns with the project's architecture, relational data model, and long-term maintainability.

## Consequences

### Positive

- Strong TypeScript ecosystem.
- Mature community support.
- Scalable relational database.
- Type-safe database access with Prisma.
- Standardized API documentation using OpenAPI.
- Easy deployment.
- Clear separation of frontend and backend.

### Negative

- Two separate deployments must be maintained.
- JWT authentication requires careful token management.
- Prisma migrations must be managed consistently.

## References

- Software Requirements Specification (SRS)
- Software Architecture Document (SAD)