# EthiopiaHub Images
# UI Component Library

Version: 1.0

Status: Approved

Project: EthiopiaHub Images

---

# 1. Purpose

This document defines every reusable UI component used by EthiopiaHub Images.

Every frontend page must be built from these components.

No page should introduce new UI unless the Design System is updated first.

This guarantees

• Consistency

• Accessibility

• Faster development

• Easier maintenance

• Better user experience

---

# 2. Component Design Principles

Every component must be

Reusable

Responsive

Accessible

Themeable

Composable

Predictable

Documented

Testable

---

# 3. Component Architecture

The library follows Atomic Design.

Design Tokens

↓

Atoms

↓

Molecules

↓

Organisms

↓

Templates

↓

Pages

---

# 4. Naming Convention

Use PascalCase.

Examples

Button

Input

SearchBar

ImageCard

Navbar

ProfileMenu

UploadCard

GalleryGrid

CollectionCard

AdminSidebar

Never use

button1

newButton

testCard

component

---

# 5. Component Categories

01 Foundations

02 Forms

03 Navigation

04 Data Display

05 Feedback

06 Overlay

07 Image Components

08 Upload Components

09 Layout

10 Dashboard

11 Admin

12 Utilities

---

##################################################
FOUNDATIONS
##################################################

# 6. Logo

Purpose

Represents EthiopiaHub Images.

Variants

Primary

Compact

Icon Only

White

Dark

Rules

Always link to Home.

Never stretch.

Maintain aspect ratio.

---

# 7. Typography

Reusable text styles.

Display

Heading

Title

Subtitle

Body

Caption

Label

Helper

Error

No custom font sizes allowed.

---

# 8. Icon

Library

Lucide React

Sizes

16

20

24

32

48

Rules

Never mix icon libraries.

Icons should always inherit text color unless explicitly defined.

---

##################################################
BUTTONS
##################################################

# 9. Button

Purpose

Primary user action.

Variants

Primary

Secondary

Outline

Ghost

Text

Danger

Success

Warning

Icon

Sizes

Small

Medium

Large

States

Default

Hover

Focus

Pressed

Loading

Disabled

Accessibility

Minimum touch target

44 × 44 px

---

##################################################
FORMS
##################################################

# 10. Text Input

Variants

Outlined

Filled

Search

Password

Email

Username

States

Default

Focused

Error

Disabled

Read Only

With Icon

With Label

With Helper Text

---

# 11. Text Area

Auto Resize

Character Counter

Error State

Disabled

---

# 12. Select

Single Select

Multi Select

Searchable

Disabled

Error

---

# 13. Checkbox

Checked

Unchecked

Indeterminate

Disabled

---

# 14. Radio Group

Vertical

Horizontal

Disabled

---

# 15. Toggle Switch

Enabled

Disabled

Loading

---

# 16. Date Picker

Single Date

Date Range

---

# 17. File Picker

Single Image

Multiple Images

Drag & Drop

Rules

Only image formats supported.

---

##################################################
SEARCH
##################################################

# 18. Search Bar

Purpose

Primary image search.

Features

Search

Recent Searches

Autocomplete

Clear Button

Loading

Keyboard Navigation

---

# 19. Filter Panel

Image Orientation

Categories

Location

Photographer

Date

Popularity

License

Tags

Reset Filters

---

##################################################
NAVIGATION
##################################################

# 20. Navbar

Desktop

Tablet

Mobile

Contains

Logo

Search

Navigation

Notifications

User Menu

Upload Button

---

# 21. Sidebar

Desktop

Collapsible

Admin Variant

Dashboard Variant

---

# 22. Breadcrumb

Supports unlimited nesting.

---

# 23. Pagination

Desktop

Mobile

Previous

Next

Jump To Page

---

##################################################
IMAGE COMPONENTS
##################################################

# 24. Image Card

Core component.

Contains

Image

Title

Author

Likes

Views

Download

Save

Share

Variants

Small

Medium

Large

Featured

---

# 25. Gallery Grid

Responsive Masonry Layout

Lazy Loading

Infinite Scroll

Skeleton Loading

---

# 26. Image Preview

Fullscreen

Zoom

Keyboard Navigation

Download

Information Panel

Related Images

---

# 27. Collection Card

Cover Image

Title

Description

Image Count

Owner

---

##################################################
UPLOAD
##################################################

# 28. Upload Dropzone

Drag

Drop

Browse

Preview

Progress

Cancel

Retry

---

# 29. Upload Progress

Uploading

Paused

Completed

Failed

---

# 30. Metadata Form

Title

Description

Category

Location

Tags

License

Visibility

---

##################################################
PROFILE
##################################################

# 31. Avatar

Sizes

XS

SM

MD

LG

XL

Fallback

User initials.

---

# 32. Profile Card

Avatar

Name

Bio

Followers

Uploads

Actions

---

##################################################
FEEDBACK
##################################################

# 33. Alert

Success

Warning

Danger

Info

---

# 34. Toast

Success

Error

Warning

Info

Auto dismiss

---

# 35. Badge

Primary

Secondary

Danger

Verified

Featured

Premium

---

# 36. Progress Bar

Linear

Circular

Determinate

Indeterminate

---

# 37. Skeleton Loader

Image

Text

Card

Avatar

Gallery

---

##################################################
OVERLAY
##################################################

# 38. Modal

Small

Medium

Large

Fullscreen

Rules

Close button

Escape key

Overlay click configurable

Focus trap

---

# 39. Drawer

Left

Right

Bottom

---

# 40. Tooltip

Top

Bottom

Left

Right

Keyboard accessible

---

##################################################
LAYOUT
##################################################

# 41. Container

Small

Medium

Large

Fluid

---

# 42. Section

Hero

Content

Footer

---

# 43. Card

Default

Elevated

Outlined

Interactive

---

##################################################
AUTHENTICATION
##################################################

# 44. Auth Card

Used for

Login

Register

Forgot Password

Reset Password

Verify Email

Consistent width

Centered layout

---

##################################################
ADMIN
##################################################

# 45. Admin Sidebar

Dashboard

Users

Images

Categories

Reports

Settings

---

# 46. Admin Table

Sorting

Searching

Filtering

Pagination

Bulk Actions

---

##################################################
EMPTY STATES
##################################################

# 47. Empty State

No Images

No Search Results

No Uploads

No Collections

No Notifications

Contains

Illustration

Title

Description

Primary Action

---

##################################################
ERROR STATES
##################################################

# 48. Error Page

403

404

500

Offline

---

##################################################
LOADING
##################################################

# 49. Loading Screen

Application Loading

Page Loading

Section Loading

Gallery Loading

---

##################################################
FOOTER
##################################################

# 50. Footer

Contains

Navigation

Social Links

Copyright

Legal

Language Selector

---

##################################################
COMPONENT STATES
##################################################

# 51. Every Interactive Component Must Support

Default

Hover

Focus

Active

Pressed

Disabled

Loading

Error

Success

Selected

Visited (when applicable)

---

##################################################
RESPONSIVE BEHAVIOR
##################################################

# 52. Every Component Must Work On

Mobile

Tablet

Laptop

Desktop

Ultra-wide

No horizontal scrolling.

No clipped content.

---

##################################################
ACCESSIBILITY
##################################################

# 53. Accessibility Rules

Keyboard navigation

Visible focus

ARIA support

Semantic HTML

Screen reader labels

Color independent feedback

44 × 44 px touch targets

Proper heading hierarchy

Alt text for images

Accessible forms

WCAG AA contrast

---

##################################################
ANIMATION
##################################################

# 54. Motion Rules

Animation should communicate state.

Never distract.

Maximum duration

350ms

Use

Fade

Scale

Slide

Opacity

Avoid bouncing animations.

---

##################################################
DEVELOPMENT RULES
##################################################

# 55. Component Rules

One responsibility per component.

No duplicated components.

Always use Design Tokens.

Props over hardcoded values.

Prefer composition over inheritance.

Support dark mode.

Support localization.

Support testing.

Document every public component.

---

##################################################
VERSIONING
##################################################

# 56. Versioning

Every new reusable component

↓

Document

↓

Design

↓

Review

↓

Implement

↓

Test

↓

Publish

Never bypass this workflow.

---

##################################################
APPROVAL CHECKLIST
##################################################

✓ Uses Design Tokens

✓ Responsive

✓ Accessible

✓ Keyboard Friendly

✓ Reusable

✓ Theme Ready

✓ Documented

✓ Tested

✓ Matches Brand Guidelines

✓ Ready for Production