import { type ZodType, z } from 'zod';

export const zodDeepPartial = <T extends ZodType>(schema: T): T => {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape as Record<string, ZodType>;
    const newShape: Record<string, ZodType> = {};

    for (const key in shape) {
      newShape[key] = zodDeepPartial(shape[key]).optional();
    }

    return z.object(newShape) as unknown as T;
  }

  if (schema instanceof z.ZodArray) {
    const element = schema.element as ZodType;
    return z.array(zodDeepPartial(element)) as unknown as T;
  }

  if (schema instanceof z.ZodOptional || schema instanceof z.ZodNullable) {
    return schema as T;
  }

  return schema.optional() as unknown as T;
};
