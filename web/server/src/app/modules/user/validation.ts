import { z } from "zod";
import { isValidObjectId } from "mongoose";

export const zUpdatePictureSchema = z.object({
  pictureId: z.string().refine((val) => isValidObjectId(val), {
    message: "pictureId must be a valid ObjectId",
  }),
});
