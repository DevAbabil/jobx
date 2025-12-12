import { Router } from "express";
import { checkAuth, validateRequest } from "@/app/middlewares";
import * as controller from "./controller";
import * as validator from "./validation";
import { Role } from "./interface";

const router = Router();

router.get("/me", checkAuth(...Object.values(Role)), controller.me);
router.put(
  "/picture",
  checkAuth(...Object.values(Role)),
  validateRequest(validator.zUpdatePictureSchema),
  controller.updatePicture
);

export default router;
