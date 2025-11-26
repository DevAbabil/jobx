# Contributing to JobX

Thank you for your interest in contributing to JobX.
This document outlines the guidelines and workflow for contributing to the project.

## Branch Naming

All branches must follow the naming convention:

```
jobx/<feature-name>
```

Examples:

```
jobx/add-template-system
jobx/improve-logging
jobx/fix-mail-generator
```

## Contribution Workflow

1. **Fork the repository**

2. **Create a feature branch**

   ```bash
   git checkout -b jobx/<feature-name>
   ```

3. **Make your changes**

4. **Write clear commit messages**

   ```bash
   git commit -m "docs: Add short explanation of the change"
   ```

5. **Push your branch**

   ```bash
   git push origin jobx/<feature-name>
   ```

6. **Open a Pull Request**
   - Provide a clear description of the change
   - Include context or screenshots if relevant

## Code Style

- Follow the existing TypeScript style used in the project
- Prefer small, focused commits
- Keep PRs limited to a single logical change when possible

## Issues & Feature Requests

- Use GitHub Issues to report bugs or propose new features
- Provide steps to reproduce bugs when possible
- Suggest enhancements with a clear motivation and use case

## Pull Request Review

- All PRs require review before merging
- Maintainers may request adjustments or improvements
- Once approved, a maintainer will merge the PR into the main branch
