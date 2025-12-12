import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

export const zUpdatePictureSchema = z.object({
  pictureId: z.string().refine((val) => isValidObjectId(val), {
    message: 'pictureId must be a valid ObjectId',
  }),
});
