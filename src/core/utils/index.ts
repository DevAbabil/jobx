import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { format } from 'date-fns';
import { logger } from '@/core/lib/logger';

export const ROOT = process.cwd();

export const generateId = () => randomUUID().slice(0, 12);

export const formatDate = (date: Date = new Date()): string => {
  return format(date, 'MMM d, yyyy, h:mmaaa');
};

export const loadJson = <T>(fileName: string): T => {
  const filePath = resolve(ROOT, fileName);
  let data: T | undefined;
  try {
    data = JSON.parse(readFileSync(filePath, 'utf-8'));
    return data as T;
  } finally {
    if (!data) logger.error(`${fileName} is missing or invalid JSON.`);
  }
};

export const requireProperties = <TObj extends {}>(
  obj: TObj,
  fileName: string,
  fields: string[]
) => {
  fields.forEach((field) => {
    if (!(field in obj)) logger.error(`Missing field '${field}' in '${fileName}'`);
  });
};

export const validateInnerFields = (
  groupObj: Record<string, string>,
  groupName: string,
  fileName: string
) => {
  Object.entries(groupObj).forEach(([prop, value]) => {
    if (!value || !value.trim())
      logger.error(`Missing property '${prop}' inside '${groupName}' in '${fileName}'`);
  });
};
