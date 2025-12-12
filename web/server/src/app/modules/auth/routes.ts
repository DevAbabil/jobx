import { Router } from "express";
import { validateRequest } from "@/app/middlewares";
import * as controller from "./controller";
import * as validator from "./validation";

const router = Router();

router.post(
  "/signin",
  validateRequest(validator.signInUser),
  controller.signInUser
);

router.delete("/signout", controller.signOutUser);

export default router;
