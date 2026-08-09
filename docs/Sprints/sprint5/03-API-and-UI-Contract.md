# Sprint 5 — API & UI Contract

## 1. Purpose
Define the contracts the backend, frontend, and agent must implement before coding against assumptions.

## 2. API Contract
Use the project's existing OpenAPI style and conventions.

For every Sprint 5 endpoint define:
- Method
- Path
- Authentication requirement
- Authorization requirement
- Request parameters/body
- Content type
- Validation rules
- Success response
- Error responses
- Status codes
- Response schema
- SRS requirement traceability

## 3. Upload Contract
The upload contract must explicitly define:
- Accepted file types
- Maximum file size
- Dimension restrictions
- Required metadata
- Validation failures
- Authentication/authorization failures
- Successful submission behavior
- Moderation status/result

Do not invent values that are not supported by the SRS or an approved project decision.

## 4. Frontend Contract
Define only the UI needed for the Sprint 5 workflow:
- Upload entry point
- File selection/upload state
- Validation/error state
- Submission state
- Success/status state
- Permission/authentication state
- Moderation-pending state

Reuse the existing frontend design system and patterns.

## 5. Contract Rule
OpenAPI/API contract and frontend expectations must agree before implementation is considered complete.

## 6. Agent Rule
Do not silently change an API contract because implementation is inconvenient. Propose the change, explain why it is necessary, and update the contract before changing dependent code.
