import { AppError } from "@/app/errors";
import { ENV } from "@/config";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import DataURIParser from "datauri/parser";
import slugify from "slugify";
import { HTTP_CODE } from "../constants";

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

const parser = new DataURIParser();

const getFolderFromFile = (file: Express.Multer.File): string => {
  const mimeFolderMap: Record<string, string> = {
    "image/png": "IMAGE",
    "image/jpeg": "IMAGE",
    "video/mp4": "VIDEO",
    "application/pdf": "PDF",
  };
  return mimeFolderMap[file.mimetype] || "Unknown";
};

export const uploadToCloudinary = async (info: {
  file: Express.Multer.File;
  title: string;
}): Promise<UploadApiResponse> => {
  const { file, title } = info;
  const folder = getFolderFromFile(file);

  if (!file?.buffer) {
    throw new AppError(
      HTTP_CODE.INTERNAL_SERVER_ERROR,
      "Invalid file or unsupported file type for Cloudinary upload"
    );
  }

  const content = parser.format("", file.buffer).content as string;
  const publicId = `${slugify(title)}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}-${folder.toLowerCase()}`;

  try {
    return await cloudinary.uploader.upload(content, {
      folder: folder.toLowerCase(),
      public_id: publicId,
      resource_type: "auto",
    });
  } catch (err: any) {
    throw new AppError(
      HTTP_CODE.INTERNAL_SERVER_ERROR,
      `Cloudinary upload failed: ${err?.message || "Unknown error"}`
    );
  }
};

export const deleteFromCloudinary = async (
  public_id: string
): Promise<{ result: "ok" | "not found" | "error" }> => {
  try {
    const response = await cloudinary.uploader.destroy(public_id);

    if (response.result === "ok") return { result: "ok" };
    if (response.result === "not found") return { result: "not found" };

    return { result: "error" };
  } catch {
    return { result: "error" };
  }
};
