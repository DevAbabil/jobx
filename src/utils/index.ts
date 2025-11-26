import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { format } from 'date-fns';
import { default as logger } from '@/utils/logger';
export { logger };

export const ROOT = process.cwd();

export const generateId = () => randomUUID().slice(0, 12);

export const delay = (ms = 100) => new Promise((r) => setTimeout(r, ms));

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
    if (!data)
      logger.error(`${fileName} is missing or invalid JSON.`, {
        terminate: true,
        code: 1,
      });
  }
};
