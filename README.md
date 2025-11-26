<h1 align='center'>JobX</h1>

<div align='center'>
 <p>JobX is an open-source command-line tool that automates job applications, generates personalized emails using AI, and tracks applications using Google Sheets. It is built to simplify and speed up the application workflow for developers and power users.</p>
  <a href="https://www.npmjs.com/package/jobx" target="_blank">
    <img src="https://img.shields.io/npm/v/jobx.svg" alt="npm version">
  </a>
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
  </a>
</div>

## Features

- AI-powered email generation using the OpenAI API
- Google Sheets integration for application tracking
- Optional email submission directly from the CLI
- Minimal and flexible JSON-based configuration
- Profile and template system for reusable workflows
- Application status logging and monitoring
- Fully written in TypeScript for reliability

## Quick Start

### Initialize the Project

```bash
npx jobx init
```

This command generates the required configuration files:

| File                    | Description                     |
| ----------------------- | ------------------------------- |
| `jobx.config.json`      | Profile and contact information |
| `jobx.credentials.json` | API keys and authentication     |
| `jobx.apply.json`       | Active job application metadata |
| `jobx.mail.md`          | Generated email output          |

## Commands

| Command              | Description                              | Options                  |
| -------------------- | ---------------------------------------- | ------------------------ |
| `npx jobx init`      | Initialize configuration files           | —                        |
| `npx jobx test`      | Validate configuration files             | —                        |
| `npx jobx mail`      | Generate or send a job application email | `--generate`, `--submit` |
| `npx jobx reset`     | Reset project configuration              | `--soft`, `--hard`       |
| `npx jobx --version` | Display version information              | —                        |
| `npx jobx --help`    | Display help information                 | —                        |

## Development

### Requirements

- Node.js 18 or later
- npm or yarn
- TypeScript

### Setup

```bash
git clone https://github.com/DevAbabil/jobx.git && cd jobx

npm install
npm run dev        # Development mode
npm run build      # Build for production
```

## Project Structure

```
jobx/
├── src/
│   ├── cli/           # Command definitions
│   ├── core/          # Core logic
│   ├── types/         # TypeScript types
│   ├── utils/         # Utility functions
│   └── constants/     # Constant values
├── scripts/           # Build and support scripts
├── docs/              # Documentation site
└── dist/              # Compiled output
```

## Security

- All credentials are stored locally within your project.
- API keys are only transmitted to their respective services.
- OpenAI-powered email generation is executed locally using your API key.
- Google Sheets integration uses service account authentication for secure access.

## Contributing

<div align="center">
  <p>
We welcome contributions! Please read our <a href="./CONTRIBUTING.md">Contributing Guidelines</a> to get started.</p>
  <p>Made with ❤️ by the <strong>JobX</strong> community</p>
  <p>
    <a href="https://github.com/DevAbabil/jobx">⭐ Star us on GitHub</a> • 
    <a href="https://github.com/DevAbabil/jobx/issues">🐛 Report Issues</a> • 
    <a href="CONTRIBUTING.md">🤝 Contribute</a>
  </p>
</div>
