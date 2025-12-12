import { catchAsync } from "@/shared/util";
import { ZodObject, ZodRawShape } from "zod";

export const validateRequest = (zs: ZodObject<ZodRawShape>) =>
  catchAsync(async (req, _, next) => {
    req.body = await zs.parseAsync(
      req.body.data ? JSON.parse(req.body.data) : req.body
    );
    next();
  });
