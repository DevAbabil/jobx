#!/bin/bash

set -e

echo "Generating banner..."
npx tsx banner.ts

echo "Building with tsup..."
tsup

echo "Cleaning up temporary files..."
rimraf banner.txt

echo "Build complete! Your project is ready in the dist/ folder 🚀"
