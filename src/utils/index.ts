import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const ROOT = process.cwd();

export const loadJson = <T>(fileName: string): T => {
  const filePath = resolve(ROOT, fileName);
  try {
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    return data as T;
  } catch {
    console.error(`${fileName} is missing or invalid JSON.`);
    process.exit(1);
  }
};

export const requireProperties = (obj: Record<string, any>, fileName: string, fields: string[]) => {
  fields.forEach((field) => {
    if (!(field in obj)) {
      console.error(`Missing field '${field}' in '${fileName}'`);
      process.exit(1);
    }
  });
};

export const validateInnerFields = (
  groupObj: Record<string, string>,
  groupName: string,
  fileName: string
) => {
  Object.entries(groupObj).forEach(([prop, value]) => {
    if (!value || !value.trim()) {
      console.error(`Missing property '${prop}' inside '${groupName}' in '${fileName}'`);
      process.exit(1);
    }
  });
};
