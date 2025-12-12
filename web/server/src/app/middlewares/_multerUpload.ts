import multer from "multer";
import { Request } from "express";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "application/pdf",
];

export const multerUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req: Request, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype))
      return cb(new Error(`Unsupported file type: ${file.mimetype}`));
    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
