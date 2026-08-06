# Sprint 4 — API Plan

## Purpose

This document defines every backend API endpoint required for Sprint 4.

Sprint 4 extends the existing platform without introducing a new architecture. Existing authentication, authorization, validation, repository, service, controller, and routing patterns shall be reused.

All endpoints shall remain under:

/api/v1

---

# Module 1 — Public Discovery

## GET /images

Status:
Enhance Existing Endpoint

Purpose:
Serve as the primary discovery endpoint for the gallery and landing page.

Existing capabilities:
- Pagination
- Sorting
- Category filtering
- Search
- Visibility filtering

Sprint 4 additions:

Query Parameters

page
limit
search
category
tag
region
city
orientation
sort

Supported Sort Values

relevance
newest
oldest
downloads
views
likes
trending

Response

Paginated image collection.

Business Rules

Only Approved images.

Only Public visibility.

Never return soft-deleted images.

Ranking shall follow configured ordering.

---

## GET /images/featured

Status:
New Endpoint

Purpose

Return manually featured images.

Authentication

Public

Response

List<ImageSummary>

Business Rules

Only approved images.

Only featured images.

Ordered by administrator priority.

Landing page uses this endpoint.

---

## GET /images/trending

Status

New Endpoint

Purpose

Return currently trending images.

Authentication

Public

Ranking Factors

Download count

View count

Favorite count

Like count

Recent activity

Response

List<ImageSummary>

---

## GET /images/recommended

Status

New Endpoint

Purpose

Return recommendation candidates.

Sprint 4 Recommendation Strategy

Shared category

Shared tags

Shared contributor

Newest approved images

Future versions may replace this algorithm.

Authentication

Public

Parameters

imageId

Response

List<ImageSummary>

---

## GET /search/suggestions

Status

New Endpoint

Purpose

Autocomplete search suggestions.

Authentication

Public

Query

q

Returns

keywords

categories

tags

cities

regions

contributors

Maximum Results

Configurable.

---

# Module 2 — Categories

## GET /categories

Existing

Reuse current implementation.

---

## POST /categories

Administrator only.

Create category.

---

## PATCH /categories/{id}

Administrator only.

Update category.

---

## DELETE /categories/{id}

Administrator only.

Soft delete if supported.

Otherwise reject deletion when referenced.

---

# Module 3 — Tags

## GET /tags

Public.

Returns all tags.

---

## POST /tags

Administrator.

Create tag.

---

## PATCH /tags/{id}

Administrator.

Update tag.

---

## DELETE /tags/{id}

Administrator.

Delete tag.

---

# Module 4 — Profile Management

## GET /profiles/me

Authenticated user.

Returns own profile.

---

## PATCH /profiles/me

Authenticated user.

Update

displayName

bio

website

location

avatar

privacy

Business Rules

Cannot modify system fields.

Validation required.

---

## PATCH /profiles/me/avatar

Authenticated user.

Upload avatar.

Future storage providers must be supported.

---

# Module 5 — Landing Page

Landing page shall retrieve data from

GET /images/featured

GET /images/trending

GET /categories

instead of placeholder content.

---

# Module 6 — Search Ranking

Ranking shall consider

Exact title match

Tag match

Category match

Newest

Downloads

Views

Likes

Contributor reputation (future)

Editorial boosts (future)

Weights shall remain configurable.

---

# Module 7 — Security

Existing authentication middleware shall be reused.

Existing RBAC middleware shall be reused.

Existing validation middleware shall be reused.

Existing error middleware shall be reused.

No authentication changes are introduced during Sprint 4.

---

# Out of Scope

Collections

Comments

Notifications

Reports

Analytics

AI Search

ElasticSearch

Meilisearch

Cloudinary migration

Moderation redesign

OAuth

MFA

Search indexing engine

Recommendation AI
