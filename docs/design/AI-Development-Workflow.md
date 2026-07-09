# EthiopiaHub Images
# AI Development Workflow

Version: 1.0
Status: Approved
Owner: EthiopiaHub Images Team

---

# Purpose

This document defines how AI is used during frontend development.

The objective is:

• Faster development
• Consistent UI
• Reusable components
• Maintainable code
• Zero random design decisions

AI is an assistant.

AI never makes product decisions.

The Design System makes product decisions.

---

# Core Principle

Never ask AI

"Build me a beautiful page."

Always ask AI

"Build this page using the EthiopiaHub Images Design System."

The Design System is the source of truth.

---

# Development Order

Every Sprint follows exactly this order.

Step 1

Read

01-Brand-Guidelines.md

↓

Step 2

Read

02-Design-Tokens.md

↓

Step 3

Read

03-UI-Component-Library.md

↓

Step 4

Read

04-Page-Templates.md

↓

Step 5

Read

05-Frontend-Engineering-Rules.md

↓

Step 6

Build UI

↓

Step 7

Review

↓

Step 8

Refactor if necessary

↓

Commit

Never change the order.

---

# AI Rules

AI must never

❌ invent colors

❌ invent spacing

❌ invent fonts

❌ invent shadows

❌ invent border radius

❌ invent new layouts

❌ invent new components

Everything must come from the Design System.

---

# Before Writing Code

Every AI session starts with

Read

Brand Guidelines

Read

Design Tokens

Read

Component Library

Read

Engineering Rules

Only after reading these documents should code generation begin.

---

# Prompt Template

Always use prompts similar to this:

Build the page using the EthiopiaHub Images Design System.

Requirements

• Use existing design tokens only.
• Use existing components only.
• Do not create new colors.
• Do not create new spacing.
• Follow accessibility rules.
• Mobile first.
• Responsive.
• Use Next.js App Router.
• Use TypeScript.
• Use Tailwind CSS.
• Use reusable components.
• No duplicated code.
• Explain any new reusable component created.

---

# AI Development Cycle

Requirements

↓

Plan

↓

Component Tree

↓

Generate Components

↓

Review

↓

Improve

↓

Test

↓

Commit

Never skip planning.

---

# Component First Development

Always build

Component

↓

Reuse

↓

Compose Pages

Never build pages first.

Example

Button

↓

Input

↓

Card

↓

Gallery Card

↓

Gallery Grid

↓

Gallery Page

---

# One Task Rule

Never ask AI to build

• Homepage

• Login

• Gallery

• Dashboard

• Upload

all together.

Instead

One screen

One request

One commit

---

# Component Checklist

Before creating a component ask

Does this already exist?

YES

Reuse it.

NO

Create it.

---

# Token Checklist

Before adding

Color

Spacing

Shadow

Radius

Typography

Animation

Ask

Does this token already exist?

If yes

Reuse.

Never hardcode values.

---

# Responsive Checklist

Every page must support

320px

375px

768px

1024px

1280px

1536px

before completion.

---

# Accessibility Checklist

Every component must have

Keyboard navigation

Visible focus

ARIA labels where necessary

Semantic HTML

Color contrast

Screen reader support

Accessible forms

Accessibility is mandatory.

---

# Performance Checklist

Avoid unnecessary renders

Lazy load images

Lazy load heavy components

Optimize bundle size

Use Next.js Image

Use Server Components whenever possible

Use Client Components only when required

---

# Animation Rules

Animation should

Improve understanding

Never distract

Default duration

150–250ms

Animation examples

Hover

Focus

Modal

Drawer

Dropdown

Toast

Skeleton

Avoid decorative animations.

---

# Code Review Checklist

Before finishing

✓ No duplicated code

✓ Responsive

✓ Accessible

✓ Uses design tokens

✓ Uses reusable components

✓ TypeScript strict

✓ No console.log

✓ No unused imports

✓ No hardcoded colors

✓ No hardcoded spacing

✓ No inline styles

Only then consider the task complete.

---

# Git Workflow

Feature Branch

↓

Develop

↓

Self Review

↓

Commit

↓

Push

↓

Pull Request

↓

Merge

Never commit unfinished UI.

---

# AI Prompt Library

## Build a Component

Build a reusable React component using the EthiopiaHub Images Design System.

Requirements

- TypeScript
- Tailwind CSS
- Accessibility
- Responsive
- Variants
- States
- Props documented

---

## Build a Page

Build the page using existing components only.

Do not create new UI patterns.

Use the Page Templates document.

---

## Refactor

Improve the code without changing the UI.

Reduce duplication.

Improve readability.

Maintain API compatibility.

---

## Accessibility Audit

Review the page.

Find accessibility problems.

Fix them.

Do not redesign the interface.

---

## Responsive Audit

Check every breakpoint.

Find layout problems.

Fix them.

Do not change the design language.

---

## Performance Audit

Optimize rendering.

Reduce bundle size.

Use Next.js best practices.

Do not change UI.

---

# Sprint Workflow

For every Sprint

Backend

↓

OpenAPI

↓

Frontend Components

↓

Frontend Pages

↓

Testing

↓

Bug Fixes

↓

Documentation

↓

Git Tag

↓

Next Sprint

---

# Definition of Done

A feature is complete only if

✓ Matches SRS

✓ Matches Brand Guidelines

✓ Uses Design Tokens

✓ Uses Component Library

✓ Uses Page Templates

✓ Follows Engineering Rules

✓ Responsive

✓ Accessible

✓ Tested

✓ Documented

✓ Reviewed

✓ Committed

Only then is the Sprint complete.

---

# Final Principle

The Design System is the product.

The UI is simply an implementation of the Design System.

Every new screen should feel like it has always belonged to EthiopiaHub Images.