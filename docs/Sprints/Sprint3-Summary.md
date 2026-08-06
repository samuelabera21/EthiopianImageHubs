# Sprint 3 Summary (Completed)

## Features Implemented
1. **Developer / Admin Foundation Workflow**
   - Streamlined the contributor application process to make testing the uploading and image workflow faster.
   - Built a lightweight foundation to verify and approve contributor applications quickly in a local environment.

2. **Contributor Identity & Image Authorship**
   - Removed placeholder contributor names in image metadata and display logic.
   - Tied `UserProfile` directly to image display.
   - Automatically pulled `displayName`, `avatarUrl`, and `@username` from the actual authenticated owner.
   - Updated the Image query endpoints (`findById`, `findMany`) to select specific profile attributes without database schema modifications.

3. **Optimistic Interactions & UI Updates**
   - Added `_count` stats (Likes, Favorites, Downloads) to image details and Gallery Image Cards (Unsplash style).
   - Fixed a critical optimistic update bug:
     - **Issue:** Like/Favorite buttons would visually "disappear" or revert to unliked after an interaction due to 409 Conflict.
     - **Root Cause:** A dynamic import (`await import("../utils/jwt")`) in `image.controller.ts` caused the public `/images/:imageId` endpoint to fail to identify authenticated users silently, returning `isLiked: false`.
     - **Fix:** Switched to a static `import { verifyAccessToken }` which stabilized user identity checking. Additionally, integrated React Query's `queryClient.invalidateQueries` in the success handlers to accurately refresh like/favorite stats globally across the UI.

## Next Steps (Sprint 4)
- *To be determined tomorrow based on the sprint planning.*
- Code has been safely tagged under `v3.0-sprint3-image-like`.
