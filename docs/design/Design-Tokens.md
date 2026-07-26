# EthiopiaHub Images
# Design Tokens

Version: 1.0

Status: Approved

Project: EthiopiaHub Images

---

# 1. Introduction

Design Tokens are the smallest reusable visual decisions of the product.

Instead of hardcoding values throughout the application,
every component must use these tokens.

Benefits

• Consistency

• Scalability

• Easier maintenance

• Theme support

• Better collaboration

• Faster development

These tokens are the single source of truth
for the entire frontend.

---

# 2. Token Architecture

The design system uses two layers.

Layer 1

Primitive Tokens

↓

Raw values

Examples

Blue 500

Gray 100

16px

32px

Layer 2

Semantic Tokens

↓

Purpose

Examples

Primary

Surface

Text Primary

Border

Success

Danger

Every component uses Semantic Tokens.

Never use primitive values directly.

---

# 3. Color System

The interface should feel

Modern

Elegant

Minimal

Photography-first

The images provide most of the color.

The interface remains calm.

---

## Primary Brand

Inspired by Ethiopia's natural landscapes.

Primary 50

#F2F8F5

Primary 100

#DCEFE4

Primary 200

#B7DEC4

Primary 300

#86C69A

Primary 400

#4AAE6A

Primary 500

#2E8B57

Primary 600

#256F46

Primary 700

#1E5938

Primary 800

#16432A

Primary 900

#102F1E

---

## Secondary

Inspired by Ethiopian coffee.

50

#FFF8F2

100

#F8E7D4

200

#EACAA3

300

#D7A46E

400

#BE7A3C

500

#8B5A2B

600

#72461F

700

#5B3617

800

#452811

900

#2F1B0A

---

## Neutral

Background colors.

50

#FFFFFF

100

#FAFAFA

200

#F5F5F5

300

#EEEEEE

400

#E0E0E0

500

#BDBDBD

600

#757575

700

#616161

800

#424242

900

#212121

---

## Semantic Colors

Primary

Secondary

Success

Warning

Danger

Info

Surface

Background

Border

Divider

Text Primary

Text Secondary

Text Disabled

Link

Focus Ring

Overlay

---

## Success

#16A34A

---

## Warning

#D97706

---

## Danger

#DC2626

---

## Info

#2563EB

---

# 4. Dark Mode

Future ready.

Background

#111827

Surface

#1F2937

Card

#374151

Border

#4B5563

Text Primary

#F9FAFB

Text Secondary

#D1D5DB

Primary

Same brand identity

Never redesign components.

Only swap semantic tokens.

---

# 5. Typography

Primary Font

Geist

Fallback

Inter

Fallback

system-ui

Reason

Modern

Readable

Excellent Next.js support

---

## Font Weights

300

Light

400

Regular

500

Medium

600

SemiBold

700

Bold

800

ExtraBold

---

## Heading Scale

Display

60px

H1

48px

H2

40px

H3

32px

H4

24px

H5

20px

H6

18px

---

## Body Scale

Large

18px

Default

16px

Small

14px

Caption

12px

---

## Line Height

1.2

Display

1.4

Heading

1.6

Body

1.8

Long Articles

---

# 6. Spacing System

4-point grid.

4

8

12

16

20

24

32

40

48

64

80

96

128

Never invent spacing.

Always use tokens.

---

# 7. Border Radius

Small

4px

Medium

8px

Large

12px

Extra Large

16px

Card

20px

Full

9999px

---

# 8. Shadows

Small

Cards

Medium

Dropdowns

Large

Dialogs

Extra Large

Hero Sections

Shadow should communicate elevation.

Never decoration.

---

# 9. Borders

Default

1px

Strong

2px

Divider

1px

Focus

2px

---

# 10. Iconography

Library

Lucide React

Reasons

Lightweight

Consistent

Tree-shakeable

Modern

Never mix icon libraries.

---

# 11. Motion

Animations should feel

Natural

Fast

Purposeful

---

## Duration

Fast

150ms

Normal

250ms

Slow

350ms

---

## Easing

ease-out

Hover

ease-in-out

General

ease-in

Exit

---

## Motion Rules

Never animate everything.

Animate only

Navigation

Dialogs

Dropdowns

Hover

Loading

Page transitions

Avoid excessive movement.

---

# 12. Opacity

Disabled

40%

Overlay

60%

Hover

90%

---

# 13. Blur

Small

4px

Medium

8px

Large

16px

Glass

24px

---

# 14. Z-Index

Base

0

Dropdown

100

Sticky

200

Header

300

Drawer

400

Modal

500

Toast

600

Tooltip

700

Never use random z-index values.

---

# 15. Grid System

Desktop

12 Columns

Tablet

8 Columns

Mobile

4 Columns

Maximum Content Width

1440px

Container

1280px

Standard Padding

24px

---

# 16. Breakpoints

Mobile

0px

Small

640px

Medium

768px

Large

1024px

Extra Large

1280px

2XL

1536px

Follow Tailwind defaults.

---

# 17. Image Rules

Images are the product.

Never distort aspect ratios.

Use object-fit: cover.

Lazy load images.

Show skeletons while loading.

Use responsive images.

Provide descriptive alt text.

---

# 18. Accessibility Tokens

Minimum contrast

WCAG AA

Focus Ring

Always visible

Minimum Touch Target

44 × 44 px

Never remove browser focus.

---

# 19. CSS Variable Naming

Examples

--color-primary

--color-surface

--color-background

--color-border

--font-body

--font-heading

--spacing-md

--radius-lg

--shadow-card

--duration-fast

Use semantic names.

Never use

--green

--blue

--red

---

# 20. Tailwind Integration

Tailwind configuration should reference these tokens.

Components should never contain
hardcoded colors,
spacing,
radius,
or shadows.

Everything should come from
the Design Tokens.

---

# 21. Future Support

This token system is designed to support

Light Theme

Dark Theme

High Contrast

Future Mobile App

Future Admin Dashboard

Future AI Features

without changing component code.

---

# 22. Token Governance

New tokens require documentation.

Duplicate tokens are prohibited.

Component-specific styling should reference semantic tokens.

Never bypass the design token system.

Every visual decision must originate from this document.

---

# 23. Approval Checklist

✓ Uses semantic tokens

✓ Uses approved spacing

✓ Uses approved typography

✓ Uses approved shadows

✓ Uses approved breakpoints

✓ Uses approved icon library

✓ Supports accessibility

✓ Supports responsiveness

✓ Ready for Tailwind implementation