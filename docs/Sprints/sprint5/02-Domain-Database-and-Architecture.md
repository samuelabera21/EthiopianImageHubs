# Sprint 5 — Domain, Database & Architecture

## 1. Purpose
Capture the domain concepts, database impact, and architecture decisions needed to implement Sprint 5 without creating unnecessary design documents.

## 2. Domain Flow
Contributor
→ Upload Request
→ Validation
→ Image/File Persistence
→ Processing
→ Moderation Queue
→ Moderation Decision
→ Publication/Search Availability

## 3. SRS Logical Entities to Review
Review the existing implementation against the SRS logical model. Relevant concepts may include:
- Images
- Image Files
- Image Metadata
- Image EXIF
- Image Categories
- Image Tags
- Image Location
- Licenses
- Moderation Queue
- Contributor/User relationship

These are review targets, not automatic instructions to create every table.

## 4. Database Change Policy
Before changing Prisma/database:
1. Inspect the current schema.
2. Map existing models to the SRS.
3. Identify the exact Sprint 5 requirement that needs a change.
4. Determine whether the current model can already satisfy it.
5. If not, make the smallest required change.
6. Document the migration and affected relations/indexes.
7. Verify existing functionality is not broken.

## 5. Architecture Rules
Keep the existing approved architecture.
Follow existing project layering and conventions.
Do not introduce a second architecture pattern for Sprint 5.
Do not perform large refactors unless a requirement cannot reasonably be implemented without one.

## 6. Data Integrity
Maintain:
- Required relationships and foreign keys
- Existing ID conventions
- Existing timestamps/audit conventions
- Existing soft-delete conventions where applicable
- Existing uniqueness constraints
- Existing indexing conventions

## 7. Architecture Decision Record
For every non-obvious architectural decision, record:
- Decision
- Reason
- SRS/requirement traceability
- Alternatives considered
- Impact

Only decisions that materially affect implementation need to be recorded.
