# EthiopiaHub Images
# Page Templates

Version: 1.0

Status: Approved

Project: EthiopiaHub Images

---

# 1. Purpose

This document defines every reusable page layout used by EthiopiaHub Images.

Pages should never be designed independently.

Every page must inherit one of these templates.

This guarantees

• Visual consistency

• Faster development

• Better usability

• Responsive layouts

• Easier maintenance

---

# 2. Page Philosophy

Every page follows the same structure.

-------------------------------------------------

Header

↓

Page Content

↓

Footer

-------------------------------------------------

Only the page content changes.

Header and Footer remain consistent.

---

# 3. Global Layout

Every page contains

Skip Link

↓

Navigation Bar

↓

Main Content

↓

Footer

Accessibility is mandatory.

---

# 4. Maximum Width

Desktop

1440px

Content Width

1280px

Large spacing

Responsive margins

Never stretch content edge-to-edge.

---

####################################################
AUTHENTICATION
####################################################

# 5. Login Page

Purpose

Authenticate users.

Layout

--------------------------------

Logo

↓

Welcome Title

↓

Login Form

↓

Forgot Password

↓

Login Button

↓

Register Link

--------------------------------

Desktop

Centered card

Mobile

Full-width form

Components

Navbar (minimal)

Auth Card

Input

Button

Alert

Footer

---

# 6. Register Page

Layout

Logo

↓

Create Account

↓

Registration Form

↓

Password Rules

↓

Register Button

↓

Login Link

---

# 7. Forgot Password

Layout

Logo

↓

Email Field

↓

Submit Button

↓

Back to Login

---

# 8. Reset Password

Layout

Logo

↓

New Password

↓

Confirm Password

↓

Reset Button

---

# 9. Verify Email

Layout

Illustration

↓

Verification Status

↓

Continue Button

---

####################################################
PUBLIC WEBSITE
####################################################

# 10. Home Page

Purpose

Introduce EthiopiaHub Images.

Structure

Navbar

↓

Hero Section

↓

Featured Categories

↓

Trending Images

↓

Featured Collections

↓

Popular Photographers

↓

Statistics

↓

Call To Action

↓

Footer

---

Hero contains

Large search bar

Background photography

Primary CTA

Secondary CTA

---

####################################################
GALLERY
####################################################

# 11. Gallery Page

Structure

Navbar

↓

Search

↓

Filter Panel

↓

Gallery Grid

↓

Pagination /
Infinite Scroll

↓

Footer

Desktop

Sidebar Filters

Mobile

Bottom Sheet Filters

---

# 12. Image Details

Structure

Navbar

↓

Large Image

↓

Image Information

↓

Photographer

↓

Download

↓

Like

↓

Save

↓

Share

↓

Related Images

↓

Comments

↓

Footer

---

####################################################
SEARCH
####################################################

# 13. Search Results

Navbar

↓

Search Bar

↓

Applied Filters

↓

Results Count

↓

Gallery Grid

↓

Pagination

↓

Footer

---

####################################################
UPLOAD
####################################################

# 14. Upload Image

Navbar

↓

Upload Wizard

↓

Image Preview

↓

Metadata Form

↓

Upload Progress

↓

Publish Button

↓

Footer

---

Upload Steps

1

Choose Images

↓

2

Preview

↓

3

Metadata

↓

4

Publish

---

####################################################
PROFILE
####################################################

# 15. Public Profile

Navbar

↓

Cover Image

↓

Avatar

↓

Profile Info

↓

Statistics

↓

Image Gallery

↓

Collections

↓

Footer

---

# 16. Edit Profile

Avatar

↓

Personal Information

↓

Social Links

↓

Password

↓

Notifications

↓

Save Button

---

####################################################
COLLECTIONS
####################################################

# 17. Collections

Navbar

↓

Collection Cards

↓

Pagination

↓

Footer

---

# 18. Collection Details

Cover

↓

Description

↓

Owner

↓

Gallery

↓

Footer

---

####################################################
DASHBOARD
####################################################

# 19. User Dashboard

Navbar

↓

Sidebar

↓

Overview Cards

↓

Recent Uploads

↓

Analytics

↓

Notifications

↓

Footer

---

Dashboard Cards

Images

Collections

Downloads

Likes

Views

Followers

---

####################################################
ADMIN
####################################################

# 20. Admin Dashboard

Sidebar

↓

Top Navigation

↓

Statistics

↓

Charts

↓

Tables

↓

Activity

---

# 21. User Management

Search

↓

Filters

↓

Users Table

↓

Pagination

↓

Actions

---

# 22. Image Management

Search

↓

Filters

↓

Gallery/Table Toggle

↓

Bulk Actions

↓

Pagination

---

# 23. Category Management

Categories Table

↓

Create

↓

Edit

↓

Delete

---

####################################################
SETTINGS
####################################################

# 24. Settings

Profile

↓

Appearance

↓

Language

↓

Notifications

↓

Privacy

↓

Security

↓

Save

---

####################################################
ERROR PAGES
####################################################

# 25. 404

Illustration

↓

Message

↓

Back Home Button

---

# 26. 403

Illustration

↓

Permission Message

↓

Return Button

---

# 27. 500

Illustration

↓

Retry

↓

Support

---

####################################################
EMPTY STATES
####################################################

# 28. Empty Gallery

Illustration

↓

Title

↓

Description

↓

Primary Button

---

# 29. No Search Results

Illustration

↓

Message

↓

Suggested Searches

↓

Clear Filters

---

####################################################
LOADING
####################################################

# 30. Loading Screens

Home

Gallery

Profile

Upload

Dashboard

Admin

Every page uses Skeleton components.

Never show blank pages.

---

####################################################
MOBILE RULES
####################################################

# 31. Mobile Layout

Navigation becomes

Bottom Drawer

Filters become

Bottom Sheet

Cards become

Single Column

Buttons become

Full Width

Spacing increases.

Touch targets

44px minimum.

---

####################################################
TABLET
####################################################

# 32. Tablet

Two-column layouts.

Sidebar collapses.

Navigation simplifies.

Gallery uses

2–3 columns.

---

####################################################
DESKTOP
####################################################

# 33. Desktop

Maximum width

1280px

12-column grid

Large spacing

Hover interactions

Keyboard shortcuts

---

####################################################
RESPONSIVE BEHAVIOR
####################################################

# 34. Every Page Must Support

Portrait

Landscape

Tablet

Laptop

Desktop

Ultra-wide

No horizontal scrolling.

---

####################################################
ACCESSIBILITY
####################################################

# 35. Every Page Must Include

Skip Link

Heading hierarchy

Keyboard navigation

Visible focus

Semantic HTML

ARIA support

Alt text

Accessible forms

Readable typography

WCAG AA contrast

---

####################################################
PERFORMANCE
####################################################

# 36. Performance Rules

Lazy-load images

Lazy-load routes

Skeleton loading

Responsive images

Optimized fonts

Avoid layout shift

Fast initial render

---

####################################################
SEO
####################################################

# 37. Every Public Page

Unique title

Meta description

Open Graph image

Structured headings

Canonical URL

Semantic HTML

---

####################################################
PAGE CHECKLIST
####################################################

Before implementation

✓ Uses approved template

✓ Uses approved components

✓ Uses Design Tokens

✓ Responsive

✓ Accessible

✓ SEO-ready

✓ Performance optimized

✓ No custom layouts

✓ Matches Brand Guidelines

✓ Production ready