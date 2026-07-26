I think this is worth documenting properly. If you master this document, you'll be able to build almost every endpoint in your project using the same pattern.

I recommend saving this as:

```text
docs/backend/01-registration-workflow.md
```

---

# Ethiopian Image Hub Backend

# Registration Endpoint Development Workflow

## 1. Purpose

The purpose of the Registration endpoint is to allow a new visitor to create an account in the Ethiopian Image Hub system.

This endpoint is the first business workflow implemented in the authentication module.

Endpoint:

```http
POST /api/v1/auth/register
```

Input:

```json
{
  "username": "samuel",
  "email": "samuel@example.com",
  "password": "Password123"
}
```

Expected Result

* Validate input
* Check duplicate email
* Check duplicate username
* Assign default USER role
* Hash password
* Save user
* Generate email verification token
* Generate JWT tokens
* Save refresh token session
* Return user information and tokens

---

# 2. Overall Architecture

Our backend follows the **Controller → Service → Repository** layered architecture. Each layer has a single responsibility, which improves maintainability, testing, and scalability. ([docs.spurtcommerce.com][1])

```
                Client
                  │
                  ▼
             Express Route
                  │
                  ▼
             Controller
                  │
                  ▼
             Validator (Zod)
                  │
                  ▼
          Service (Business Logic)
                  │
                  ▼
        Repository (Database Layer)
                  │
                  ▼
            Prisma Client
                  │
                  ▼
             PostgreSQL
```

The response travels back through the same layers.

```
Database
   │
Repository
   │
Service
   │
Controller
   │
Client
```

---

# 3. Folder Structure Used

```
src/

config/
controllers/
middlewares/
repositories/
routes/
services/
utils/
validators/
```

Each folder has one responsibility.

---

# 4. Complete Registration Development Flow

Every endpoint in this project should follow this same order.

```
Requirement

↓

Validator

↓

Repository

↓

Service

↓

Controller

↓

Route

↓

Postman Test

↓

Swagger/OpenAPI Documentation
```

Register was built using exactly this workflow.

---

# 5. Step 1 — Client Request

The frontend or Postman sends

```http
POST /api/v1/auth/register
```

Request Body

```json
{
    "username":"samuel",
    "email":"samuel@example.com",
    "password":"Password123"
}
```

At this point the backend knows nothing.

It only receives raw JSON.

---

# 6. Step 2 — Express Route

File

```
src/routes/auth.routes.ts
```

Purpose

Routes map HTTP URLs to controller methods.

Example

```
POST /auth/register

↓

authController.register()
```

A Route should never

* hash passwords
* access the database
* generate JWTs
* perform business logic

Think of it as a traffic police officer.

Its only responsibility is directing requests.

---

# 7. Step 3 — Controller

File

```
src/controllers/auth.controller.ts
```

Purpose

The Controller communicates with HTTP.

Responsibilities

Receive

```
req.body
```

Validate request

Call Service

Return JSON response

Controller does NOT know how registration works.

It only knows:

```
Receive Request

↓

Validate

↓

Call Service

↓

Return Response
```

Example

```
Client

↓

Controller

↓

authService.register(data)
```

---

# 8. Step 4 — Validator

File

```
validators/auth.validator.ts
```

Technology

```
Zod
```

Purpose

Reject invalid requests before they reach business logic.

Example

```
password

↓

minimum 8 characters
```

Example

```
email

↓

valid email format
```

If validation fails

```
400 Bad Request
```

is returned immediately.

Nothing reaches the Service.

---

# 9. Step 5 — Service (Heart of the System)

File

```
services/auth.service.ts
```

This is the most important layer.

The Service contains

Business Rules

Everything that represents "how the application should behave" belongs here. This aligns with the Service layer's responsibility in layered architectures. ([opensource.byjg.com][2])

Our Register Service performs these operations in order.

---

## 5.1 Check Email

```
Repository

↓

Database

↓

Email Exists?
```

If yes

```
Throw Error
```

Reason

Email must be unique.

---

## 5.2 Check Username

Same process

```
Repository

↓

Database

↓

Username Exists?
```

---

## 5.3 Load Default Role

Repository

↓

Database

↓

Role USER

Why?

Every newly registered account should receive the default USER role.

This role determines permissions inside the system.

---

## 5.4 Hash Password

Input

```
Password123
```

Output

```
$2b$12....
```

Reason

Passwords are NEVER stored as plain text.

Only hashes are stored.

---

## 5.5 Create User

Repository stores

```
username

email

passwordHash

roleId
```

Now the user officially exists.

---

## 5.6 Generate Email Verification Token

Generate random token

↓

Hash token

↓

Store hash in database

↓

Return original token

Exactly the same security idea used for passwords.

---

## 5.7 Generate JWT Tokens

Generate

```
Access Token
```

and

```
Refresh Token
```

Access Token

Short lifetime

Refresh Token

Long lifetime

---

## 5.8 Hash Refresh Token

Never save the refresh token itself.

Store

```
SHA256(refreshToken)
```

instead.

If the database is leaked, attackers cannot directly reuse refresh tokens.

---

## 5.9 Create Session

Store

```
userId

refreshTokenHash

expiresAt
```

Purpose

Track login sessions.

Support logout.

Support multiple devices.

Support token revocation.

---

## 5.10 Return Response

Return

```
User

Access Token

Refresh Token

Verification Token
```

The registration process is complete.

---

# 10. Repository Layer

File

```
repositories/auth.repository.ts
```

Purpose

Database operations ONLY.

Repository should never contain

Business Rules

Examples of BAD Repository code

```
if email exists

if password weak

generate jwt

hash password
```

Examples of GOOD Repository code

```
findByEmail()

findRoleByName()

createUser()

createSession()

createEmailVerification()
```

Repository simply translates service requests into Prisma queries.

---

# 11. Prisma Layer

Prisma converts

```
prisma.user.create()
```

into SQL.

Example

```
INSERT INTO users(...)
```

Developers never write SQL directly.

---

# 12. PostgreSQL Layer

Finally data is stored inside

```
roles

users

email_verifications

user_sessions
```

---

# 13. Utility Files

Utilities are reusable helper functions.

## password.ts

Purpose

```
hashPassword()

comparePassword()
```

Used by

Register

Login

Reset Password

---

## jwt.ts

Purpose

```
generateAccessToken()

generateRefreshToken()

verifyAccessToken()

verifyRefreshToken()
```

Used by

Login

Refresh Token

Authentication Middleware

---

## token.ts

Purpose

```
generateToken()

hashToken()
```

Used by

Email Verification

Refresh Tokens

Password Reset

---

# 14. Role Assignment Flow

Before the application starts, the database is seeded.

```
prisma db seed
```

creates

```
VISITOR
USER
CONTRIBUTOR
MODERATOR
ADMINISTRATOR
```

These roles are inserted only once (typically using an upsert strategy), so rerunning the seed updates existing entries instead of creating duplicates. ([docs.spurtcommerce.com][1])

When a new user registers

```
Visitor

↓

Clicks Register

↓

Creates Account

↓

Service loads USER role

↓

Stores roleId

↓

Account becomes USER
```

The person is no longer considered an anonymous visitor. "Visitor" is a conceptual role for someone browsing without an account; it usually isn't assigned to a registered user.

---

# 15. Development Blueprint for Every Endpoint

Every endpoint in this backend should follow the same implementation order.

```
1. Understand Requirement

↓

2. Create Validator

↓

3. Create Repository Methods

↓

4. Implement Service Logic

↓

5. Create Controller Method

↓

6. Add Route

↓

7. Test with Postman

↓

8. Update OpenAPI Documentation

↓

9. Commit Changes
```

# 16. What Changes Between Endpoints?

The architecture never changes.

Only the business logic changes.

| Endpoint        | Business Logic                                    |
| --------------- | ------------------------------------------------- |
| Register        | Create account                                    |
| Login           | Verify credentials and create session             |
| Refresh Token   | Validate refresh token and issue new access token |
| Logout          | Revoke session                                    |
| Forgot Password | Generate password reset token                     |
| Reset Password  | Verify reset token and update password            |
| Upload Image    | Validate image and save metadata                  |
| Comment         | Validate and save comment                         |
| Admin           | Perform privileged operations                     |

