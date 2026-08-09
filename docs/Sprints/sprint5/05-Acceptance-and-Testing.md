# Sprint 5 — Acceptance Criteria & Testing

## 1. Purpose
Define how we prove Sprint 5 is complete.

## 2. Functional Acceptance
A Sprint 5 implementation is acceptable when:
- Only the required authenticated/authorized contributor can upload.
- Invalid files are rejected according to the approved requirements.
- Required metadata is validated.
- Successful uploads persist the required data.
- Required processing/storage behavior occurs.
- Successful submissions enter the moderation workflow.
- Unapproved images are not publicly searchable/published.
- Contributor receives the required status/result.
- Expected failures return controlled errors.
- Existing authentication and unrelated modules continue to work.

## 3. Test Layers

### Unit Tests
Test validation, business rules, state transitions, and isolated services.

### Integration Tests
Test API + database + relevant storage/processing boundaries.

### Authorization Tests
Test unauthenticated, unauthorized, and authorized cases.

### Validation Tests
Test invalid type, size, dimensions, metadata, and other SRS-defined restrictions.

### Failure Tests
Test storage failure, processing failure, database failure, and partial-failure handling where applicable.

### End-to-End Test
Verify:
**Authenticated Contributor → Upload → Validation → Persistence → Processing/Storage → Moderation Queue**

## 4. Regression
Run the existing project test suite relevant to:
- Authentication
- Authorization/RBAC
- Database
- API
- Existing frontend flows

## 5. Acceptance Traceability
Every acceptance criterion should map to:
- SRS requirement/use case/workflow
- implementation location
- automated test where practical

## 6. Definition of Done
- Requirements traced
- API contract updated
- Database impact reviewed
- Implementation complete
- Tests passing
- No unrelated architectural changes
- Documentation updated
- Complete workflow verified
