#!/bin/bash
echo "Checking file naming conventions..."

files=$(find src -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \))

invalid_files=""

for file in $files; do
  filename=$(basename "$file")
  
  case "$filename" in
    index.ts|index.tsx|*.config.ts|*.config.js)
      continue
      ;;
  esac
  
  if echo "$filename" | grep -qE '^_[a-z][a-z0-9-]*\.(ts|tsx|js|jsx)$'; then
    continue
  fi
  
  if ! echo "$filename" | grep -qE '^[a-z][a-z0-9-]*\.(ts|tsx|js|jsx)$'; then
    invalid_files="$invalid_files  - $file\n"
  fi
done

if [ -n "$invalid_files" ]; then
  echo "Invalid file names found (use kebab-case or _prefix):"
  echo "$invalid_files"
  exit 1
fi

echo "All file names are valid"
exit 0
