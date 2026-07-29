

# EthiopiaHub Images

## Sprint 2 Frontend

Read all project documentation before generating any code.

Project documentation:

```
docs/design/Brand-Guidelines.md
docs/design/Design-Tokens.md
docs/design/UI-Component-Library.md
docs/design/Page-Templates.md
docs/design/Frontend-Engineering-Rules.md
docs/design/AI-Development-Workflow.md
docs/design/Frontend-Architecture.md
.github/copilot-instructions.md
```

Also read the backend API specification:

```
openapi/sprint2OpenAPI.yaml
```

Never ignore these documents.

They are the source of truth.

---

# Project Information

Project Name

EthiopiaHub Images

Project Type

Modern image sharing platform inspired by Unsplash and Pexels while expressing Ethiopian culture.

Current Sprint

Sprint 2

Current Goal

Implement ONLY the Image Management frontend.

Do NOT build

* Home Page
* Login
* Register
* Forgot Password
* Reset Password
* Verify Email
* Dashboard
* Admin
* Collections

Authentication already exists.

Reuse the authentication implementation.

Never modify backend code.

---

# Sprint 2 Features

Implement only these pages.

## 1 Upload Image

Following Page Template:

Upload Image

Contains

* Upload Dropzone
* Image Preview
* Metadata Form
* Publish Button
* Upload Progress

Connect to backend upload endpoint.

---

## 2 Image Details

Following Page Template:

Image Details

Contains

* Large Image
* Image Information
* Photographer
* Views
* Likes
* Download
* Share
* Save
* Related Images

Load image from backend.

---

## 3 Gallery

Following Page Template:

Gallery

Contains

* Search
* Filters
* Gallery Grid
* Infinite Scroll or Pagination
* Skeleton Loading
* Empty State
* Error State

Load images from backend.

---

## 4 Search

Contains

* Search Bar
* Search Results
* Filter Panel
* Gallery Grid

Backend powered.

---

# Backend Integration

Authentication already exists.

Reuse the authentication service.

Never duplicate auth logic.

Use

```
services/
```

for all backend communication.

Never call fetch() inside components.

Use Axios.

Use TanStack Query.

---

# Required Folder Structure

```
src/

app/
    gallery/
    images/[id]/
    upload/

components/
    ui/
    gallery/
    upload/
    shared/

features/
    gallery/
    upload/
    search/

services/
    image.service.ts

hooks/
    useImages.ts
    useUpload.ts
    useImage.ts

types/

constants/

utils/

providers/
```

Do not create random folders.

---

# Components to Create

Only reusable components.

```
GalleryGrid

ImageCard

ImageDetails

ImageMetadata

ImageActions

UploadDropzone

UploadProgress

MetadataForm

FilterPanel

SearchBar

GalleryToolbar

SectionTitle

LoadingSkeleton

EmptyState

ErrorState
```

If a reusable component already exists,

reuse it.

---

# Design Rules

Follow

Brand Guidelines

Design Tokens

UI Component Library

Page Templates

Frontend Engineering Rules

AI Development Workflow

Never invent

* colors
* spacing
* shadows
* typography
* layouts

Only use Design Tokens.

---

# Upload Flow

Step 1

Select Images

↓

Step 2

Preview

↓

Step 3

Metadata

↓

Step 4

Publish

Exactly as defined in Page Templates.

---

# Gallery Requirements

Support

* Search
* Pagination or Infinite Scroll
* Loading
* Empty
* Error
* Responsive Grid
* Image Cards

---

# Image Card

Contains

* Thumbnail
* Title
* Photographer
* Views
* Likes
* Visibility Badge
* Hover Actions

---

# Image Details

Contains

* Image
* Metadata
* Download
* Like
* Share
* Save
* Photographer
* Related Images

---

# Search

Supports

* Keyword
* Category
* Visibility
* Orientation

Reuse FilterPanel.

---

# Technical Requirements

Use

* Next.js App Router
* TypeScript
* Tailwind CSS
* React Server Components where appropriate
* React Hook Form
* Zod
* Axios
* TanStack Query
* Zustand

---

# Accessibility

Every component must

* Use semantic HTML
* Keyboard navigation
* Visible focus
* Proper aria labels
* WCAG AA

---

# Responsive

Support

* Mobile
* Tablet
* Laptop
* Desktop
* Ultra Wide

Follow Design Tokens breakpoints.

---

# Performance

Use

* Next.js Image
* Lazy loading
* Code splitting
* Skeleton loading
* Memoization only where necessary

---

# Component Rules

Never duplicate components.

If a component already exists,

reuse it.

If a reusable component does not exist,

create it inside

```
components/
```

Never inside pages.

---

# Code Rules

* Production ready
* TypeScript strict
* No any
* No inline styles
* No hardcoded colors
* No duplicated logic
* Functional components
* Composition over inheritance

---

# Before Generating Code

Always explain

1. Implementation plan
2. Component tree
3. Folder structure
4. Reusable components
5. Backend endpoints being consumed

---

# During Development

Build only ONE feature at a time.

Order:

1. Upload Components
2. Upload Page
3. Gallery Components
4. Gallery Page
5. Image Details Components
6. Image Details Page
7. Search Components
8. Search Page

Never build all pages in one response.

---

# After Each Feature

Explain

* Files created
* Why each component exists
* Which components are reusable
* How future sprints reuse them

---

## Recommended implementation order

To keep your frontend aligned with the backend you just completed:

1. Shared UI foundation (Button, Input, Card, Skeleton, EmptyState if not already present)
2. Gallery components (`ImageCard`, `GalleryGrid`)
3. Gallery page
4. Image Details page
5. Upload flow
6. Search and filters
7. Connect everything to the Sprint 2 backend API

