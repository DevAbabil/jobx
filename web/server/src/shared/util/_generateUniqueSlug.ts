import { Model } from "mongoose";
import slugify from "slugify";

export const generateUniqueSlug = async <T>(
  model: Model<T>,
  title: string,
  excludeId?: string
): Promise<string> => {
  let baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let counter = 1;

  while (await model.exists({ slug, _id: { $ne: excludeId } })) {
    slug = `${baseSlug}-${counter++}`;
    if (counter > 1000) throw new Error("Too many duplicate slugs.");
  }

  return slug;
};
