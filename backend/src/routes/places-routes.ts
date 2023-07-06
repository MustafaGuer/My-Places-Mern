import { Router } from "express";

import placesController from "../controllers/places-controller";

const router = Router();

router.get("/:pid", placesController.getPlaceById);

router.get("/user/:uid", placesController.getPlaceByUserId);

router.post("/", placesController.postPlace);

router.patch("/:pid", placesController.patchPlace);

router.delete("/:pid", placesController.deletePlace);

export default router;
