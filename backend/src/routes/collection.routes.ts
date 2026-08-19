import { Router } from "express";
import { collectionController } from "../controllers/collection.controller";
import { authenticate, optionalAuthenticate } from "../middlewares/auth.middleware";

const router = Router();

/**
 * GET /collections — List public collections or user's collections
 */
router.get(
  "/",
  optionalAuthenticate,
  collectionController.getCollections.bind(collectionController)
);

/**
 * POST /collections — Create a new collection
 */
router.post(
  "/",
  authenticate,
  collectionController.createCollection.bind(collectionController)
);

/**
 * GET /collections/:id — Get collection details + images
 */
router.get(
  "/:id",
  optionalAuthenticate,
  collectionController.getCollectionById.bind(collectionController)
);

/**
 * PATCH /collections/:id — Update collection
 */
router.patch(
  "/:id",
  authenticate,
  collectionController.updateCollection.bind(collectionController)
);

/**
 * DELETE /collections/:id — Delete collection
 */
router.delete(
  "/:id",
  authenticate,
  collectionController.deleteCollection.bind(collectionController)
);

/**
 * POST /collections/:id/images — Add image to collection
 */
router.post(
  "/:id/images",
  authenticate,
  collectionController.addImageToCollection.bind(collectionController)
);

/**
 * DELETE /collections/:id/images/:imageId — Remove image from collection
 */
router.delete(
  "/:id/images/:imageId",
  authenticate,
  collectionController.removeImageFromCollection.bind(collectionController)
);

export default router;
