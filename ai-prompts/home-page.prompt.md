Read all project documentation before generating any code.

Project documentation:

docs/design/Brand-Guidelines.md
docs/design/Design-Tokens.md
docs/design/UI-Component-Library.md
docs/design/Page-Templates.md
docs/design/Frontend-Engineering-Rules.md
docs/design/AI-Development-Workflow.md
docs/design/Frontend-Architecture.md
.github/copilot-instructions.md

Project Information

Project Name:
EthiopiaHub Images

Project Type:
Modern image sharing platform inspired by Unsplash and Pexels while expressing Ethiopian culture and identity.

Current Sprint:
Sprint 1

Current Task:
Build ONLY the Home Page.

Do NOT implement Login, Register, Upload, Profile, Dashboard or Admin pages.

Backend

A complete Authentication API already exists.

Backend must NOT be modified.

Do NOT generate backend code.

Authentication will be connected later.

OpenAPI specification is located at:

openapi/sprint1OpenAPI.yaml

Ignore authentication implementation for this task.

Use placeholder data for images.

Design Philosophy

The design must feel:

• Modern
• Premium
• Minimal
• Elegant
• Fast
• Professional
• Ethiopian inspired
• Clean
• Accessible
• Responsive

Visual inspiration:

• Unsplash
• Pexels
• Pinterest (grid inspiration only)

The website must not look copied from any existing website.

It should have its own visual identity following the Brand Guidelines.

Color palette, typography, spacing, shadows, border radius and animations MUST follow the Design Tokens document.

Technical Requirements

Use:

• Next.js App Router
• TypeScript
• Tailwind CSS
• React Server Components where appropriate
• Functional Components
• Reusable Architecture

Do NOT use:

• JavaScript
• CSS Modules
• Styled Components
• Bootstrap
• Material UI

Responsive Requirements

Support:

Mobile
Tablet
Laptop
Desktop
Ultra-wide screens

Follow the responsive breakpoints defined in Design-Tokens.md.

Accessibility

All UI must:

• Follow semantic HTML
• Be keyboard accessible
• Have proper aria labels
• Maintain color contrast
• Have visible focus states

Performance

Optimize for:

• Fast loading
• Component reuse
• Minimal rerenders
• Lazy loading where appropriate
• Next.js Image component
• Clean folder structure

Home Page Sections

Generate these sections:

1. Announcement Bar

2. Header
- Logo
- Navigation
- Search
- Theme toggle placeholder
- Login button
- Register button

3. Hero Section
- Large headline
- Ethiopian identity
- Search bar
- CTA button

4. Trending Categories

5. Featured Images Grid
- Masonry style layout
- Placeholder images
- Image cards
- Like count
- View count
- Photographer
- Hover effects

6. Explore Collections

7. Why EthiopiaHub Images

8. Community Statistics

9. Call To Action

10. Footer

Components

Create reusable components.

Do not place everything inside one page.

Follow the UI Component Library.

Expected reusable components include:

Header

Footer

Container

SectionTitle

Button

SearchBar

CategoryCard

ImageCard

CollectionCard

StatsCard

Hero

CTASection

SectionWrapper

LoadingSkeleton

EmptyState

Code Quality

Generate production-ready code.

No duplicated code.

No inline styles.

No hardcoded colors outside design tokens.

Strong typing everywhere.

Proper component composition.

Folder organization must follow the Frontend Engineering Rules document.

Images

Do NOT search for real images.

Use placeholder images.

Assume these will later come from the backend API.

Do not use random internet URLs.

Documentation

Before generating code:

Explain your implementation plan.

After generating code:

Explain:

• Folder structure
• Every generated file
• Why each component exists
• Which components are reusable later
• How future pages should reuse them

Do NOT skip explanations.

Goal

Create a reusable design system foundation that every future page (Login, Register, Upload, Gallery, Profile, Dashboard, Admin) can reuse without redesigning the UI.

This Home Page will become the visual foundation of the EthiopiaHub Images platform.