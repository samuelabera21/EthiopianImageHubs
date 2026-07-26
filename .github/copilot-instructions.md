# EthiopiaHub Images - GitHub Copilot Instructions

## Project

You are assisting in the development of EthiopiaHub Images.

This project is a modern stock photography platform inspired by websites like Pexels while representing Ethiopian culture and photography.

The frontend is built using:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Hook Form
- Zod
- Axios
- TanStack Query

Always generate production-quality code.

Never generate demo code.

Never generate placeholder implementations unless explicitly requested.

---

## UI Philosophy

Always follow these principles.

- Minimal
- Clean
- Professional
- Modern
- Spacious
- Responsive
- Accessible
- Consistent

Avoid visual clutter.

Every page should feel like it belongs to the same design system.

---

## Brand

Primary Color

Green

Accent

Yellow

Neutral colors

Slate Gray

White

Black

Use colors only from Design Tokens.

Never invent new colors.

---

## Typography

Use typography defined in Design Tokens.

Maintain a consistent visual hierarchy.

---

## Spacing

Always use the spacing scale from Design Tokens.

Avoid arbitrary spacing values.

---

## Components

Always reuse existing components.

Never duplicate components.

If a component already exists, import it.

If it doesn't exist, create it inside components/.

---

## Responsive Design

Every page must work perfectly on

- Mobile
- Tablet
- Laptop
- Desktop
- Large Desktop

Mobile First.

---

## Accessibility

Always include

- aria-labels
- keyboard navigation
- semantic HTML
- proper button types
- visible focus states
- sufficient color contrast

---

## Code Style

Use

TypeScript

No any.

Prefer interfaces.

Prefer functional components.

Prefer composition.

Keep components small.

Avoid duplicated logic.

---

## Folder Structure

Use this structure.

app/
components/
features/
hooks/
lib/
services/
types/
utils/

Never create random folders.

---

## Forms

Use

React Hook Form

Zod

Display validation errors under inputs.

Disable submit button while submitting.

---

## API

Never hardcode API URLs.

Always use the API service layer.

All backend communication goes through services/.

---

## Loading States

Every page must have

Loading State

Empty State

Error State

Success State

Skeleton Loader where appropriate.

---

## Design Consistency

Every page must follow

Brand Guidelines

Design Tokens

UI Component Library

Page Templates

Frontend Engineering Rules

Never invent new layouts.

Reuse patterns.

---

## Before finishing any task

Verify

✓ Responsive

✓ Accessible

✓ Type-safe

✓ Reusable

✓ No duplicated code

✓ Uses existing components

✓ Matches design system

✓ Production ready