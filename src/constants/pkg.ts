import fs from 'node:fs';
import path from 'node:path';

interface PackageJson {
  name: string;
  version: string;
  description: string;
}

const pkg: PackageJson = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8')
);

export default pkg;
