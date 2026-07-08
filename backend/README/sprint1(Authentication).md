# EthiopiaHub Images Backend

## Sprint 1 — Authentication Module

Status: ✅ Completed

---

## Features

- User Registration
- User Login
- JWT Authentication
- Refresh Tokens
- Logout
- Get Current User
- Email Verification
- Forgot Password
- Reset Password

---

## Authentication Flow

Register
↓

Verify Email
↓

Login
↓

Receive Access Token + Refresh Token
↓

Access Protected APIs
↓

Refresh Token
↓

Logout

---

## Endpoints

POST /api/v1/auth/register

POST /api/v1/auth/login

GET /api/v1/auth/verify-email

POST /api/v1/auth/forgot-password

POST /api/v1/auth/reset-password

GET /api/v1/auth/me

POST /api/v1/auth/refresh

POST /api/v1/auth/logout

---

## Security

- bcrypt password hashing
- JWT Access Tokens
- JWT Refresh Tokens
- Refresh Token hashing
- Email verification
- Password reset tokens
- Session management
- Zod validation

---

## Database Tables

roles

users

user_sessions

email_verifications

password_resets

---

## Tech Stack

Express

TypeScript

Prisma ORM

PostgreSQL

JWT

bcrypt

Zod

Nodemailer

---

Sprint Status

✅ Sprint 1 Completed