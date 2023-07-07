import { Router } from "express";
import { check } from "express-validator";

import placesController from "../controllers/places-controller";

const router = Router();

router.get("/:pid", placesController.getPlaceById);

router.get("/user/:uid", placesController.getPlacesByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesController.postCreatePlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesController.patchUpdatePlace
);

router.delete("/:pid", placesController.deletePlace);

export default router;
