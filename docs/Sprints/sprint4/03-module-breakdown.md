# EthiopiaHub Images

# Sprint 4 — Module Breakdown

**Version:** 1.0  
**Status:** Draft  
**Sprint:** 4

---

# 1. Purpose

This document defines the backend modules that compose Sprint 4.

Each module has a single responsibility and clear ownership. Modules communicate through service interfaces and must not duplicate business logic.

The objective is to maintain a modular, scalable, and maintainable architecture consistent with the Software Requirements Specification (SRS).

---

# 2. Module Architecture

Sprint 4 introduces six primary backend modules.

```
                   Sprint 4

        +-------------------------+
        |      Discovery Module   |
        +-----------+-------------+
                    |
     +--------------+-------------------+
     |              |                   |
     ▼              ▼                   ▼
 Search Module   Collections      Statistics Module
     |                                  |
     ▼                                  ▼
 Search Index                    Database Aggregates
     |
     ▼
 Image Module

```

The Image module remains the source of image metadata. Sprint 4 introduces new modules that consume this data to deliver discovery capabilities.

---

# 3. Discovery Module

## Purpose

The Discovery module provides all data required by discovery-oriented frontend pages.

It acts as an orchestration layer that aggregates responses from multiple services into optimized payloads.

### Responsibilities

- Homepage data
- Featured images
- Featured categories
- Editorial collections
- Public platform statistics
- Trending searches
- Search suggestions

### Owns

- Discovery business logic
- Homepage aggregation
- Discovery response composition

### Does Not Own

- Image CRUD
- Search indexing
- Storage
- Upload processing

---

# 4. Search Module

## Purpose

Provide dedicated search functionality for EthiopiaHub Images.

Search is an independent domain and shall not be implemented inside the Image module.

### Responsibilities

- Keyword search
- Tag search
- Category search
- Geographic search
- Contributor search
- Search ranking
- Filtering
- Sorting
- Pagination
- Search suggestions

### Owns

- Search business rules
- Query parsing
- Search execution

### Depends On

- Search Index
- Discovery
- Image metadata

---

# 5. Search Index Module

## Purpose

Maintain searchable representations of approved images.

This module synchronizes platform data with the configured search engine.

### Responsibilities

- Index creation
- Document synchronization
- Metadata updates
- Image removal
- Reindex operations

### Triggers

- Image approval
- Metadata update
- Image deletion
- Category update
- Tag update

### Does Not Own

- Search API
- Search ranking
- Homepage discovery

---

# 6. Editorial Collections Module

## Purpose

Provide curated collections for discovery pages.

Sprint 4 supports editorial collections only.

### Responsibilities

- Featured collections
- Curated image groups
- Homepage collections

### Future Responsibilities

- User collections
- Collection sharing
- Collaborative collections

---

# 7. Statistics Module

## Purpose

Provide public platform statistics required by discovery pages.

This module exposes aggregate data only.

### Responsibilities

- Total images
- Total contributors
- Total downloads
- Total collections

Administrative analytics remain outside Sprint 4.

---

# 8. Storage Abstraction Module

## Purpose

Abstract all storage operations behind a provider interface.

Business logic shall never depend directly on a specific storage implementation.

### Responsibilities

- Upload
- Download
- Delete
- Generate URLs
- Storage configuration

### Initial Provider

- Local Storage

### Planned Providers

- Cloudinary
- Amazon S3
- Azure Blob Storage
- MinIO

The provider shall be selected through configuration without requiring changes to application services.

---

# 9. Module Dependencies

| Module | Depends On |
|----------|------------|
| Discovery | Search, Collections, Statistics |
| Search | Search Index |
| Search Index | Image |
| Collections | Image |
| Statistics | Database |
| Storage | Storage Provider |

Dependencies shall remain one-directional to avoid circular references.

---

# 10. Existing Modules Reused

Sprint 4 reuses the following completed modules.

| Existing Module | Usage |
|-----------------|------|
| Authentication | Endpoint security |
| Authorization | RBAC |
| Image | Metadata source |
| Category | Category data |
| Tag | Tag data |
| Download | Statistics |
| Profile | Contributor information |

These modules shall not be reimplemented.

---

# 11. Backend Folder Structure

The backend source tree is expected to evolve as follows.

```
src/

modules/

    auth/

    image/

    category/

    tag/

    profile/

    contributor/

    download/

    admin/

    discovery/

    search/

    search-index/

    collections/

    statistics/

storage/

config/

middlewares/

repositories/

services/

validators/

routes/
```

The exact physical structure may evolve, but each Sprint 4 module shall maintain clear ownership and separation of concerns.

---

# 12. Design Principles

Sprint 4 follows these architectural principles.

- Single Responsibility Principle
- Separation of Concerns
- Provider Abstraction
- Service-Oriented Design
- RESTful APIs
- Configuration over Hardcoding
- Future Cloud Portability
- Search Engine Independence
- Backward Compatibility

---

# 13. Expected Result

Upon completion of Sprint 4, EthiopiaHub Images will contain a dedicated discovery architecture where homepage content, search functionality, editorial collections, statistics, and storage abstraction operate as independent but coordinated modules. This architecture establishes the foundation for future AI search, recommendation systems, cloud storage providers, and advanced analytics while preserving the modular design established in previous sprints.