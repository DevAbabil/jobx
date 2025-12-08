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

| File                    | Description                                      |
| ----------------------- | ------------------------------------------------ |
| `jobx.config.json`      | Profile and contact information                  |
| `jobx.credentials.json` | API keys and authentication                      |
| `jobx.apply.json`       | Active job application metadata                  |
| `jobx.mail.md`          | Generated email output                           |
| `jobx.context.txt`      | Additional context for AI email generation       |
| `jobx.cv.pdf`           | Your CV/curriculum vitae (PDF format)            |
| `jobx.resume.pdf`       | Your resume (PDF format)                         |

## Configuration

### jobx.apply.json

The `jobx.apply.json` file contains metadata for your current job application:

```json
{
  "company": "Company Name",
  "company_email": "jobs@company.com",
  "company_website": "https://company.com",
  "subject": "Application for Software Engineer Position",
  "position": "Software Engineer",
  "experience": "3 years of experience in full-stack development",
  "education": "Bachelor's in Computer Science",
  "job_source": "https://company.com/careers/job-id",
  "location": "Remote",
  "attachment_type": "resume"
}
```

**Field Details:**

- `company_website`: Can be a valid URL or `"N/A"` if not available
- `location`: Must be either `"Remote"` or `"Onsite"`
- `attachment_type`: Must be either `"cv"` or `"resume"` (determines which PDF file to attach)

**⚠️ Important Note:**

When you run `jobx mail generate`, the AI may automatically update certain fields in `jobx.apply.json` based on the context from `jobx.context.txt`. Always review `jobx.apply.json` and the generated email in `jobx.mail.md` before running `jobx mail submit`.

## Commands

| Command                                  | Description                                      |
| ---------------------------------------- | ------------------------------------------------ |
| `jobx init`                              | Initialize configuration files                   |
| `jobx mail generate`                     | Generate job application email using AI          |
| `jobx mail submit`                       | Submit generated job application email           |
| `jobx test`                              | Validate configuration files                     |
| `jobx reset soft`                        | Soft reset (keep credentials)                    |
| `jobx reset hard`                        | Hard reset (reset everything)                    |
| `jobx sheet find`                        | Find all job applications with pagination        |
| `jobx sheet find -i <id>`                | Find job application by specific ID              |
| `jobx sheet find -p <page> -l <limit>`   | Find jobs with custom page and limit             |
| `jobx sheet delete <id>`                 | Delete job application by ID                     |
| `jobx sheet update <id> <field> <value>` | Update job application field                     |
| `jobx --version`                         | Display version information                      |
| `jobx --help`                            | Display help information                         |

### Sheet Find Options

The `jobx sheet find` command supports the following options:

- `-p, --page <page>` - Page number (default: 1)
- `-l, --limit <limit>` - Records per page (default: 20)
- `-i, --id <id>` - Find by specific ID

**Examples:**

```bash
# Find first 20 records (default)
jobx sheet find

# Find page 2
jobx sheet find -p 2

# Find first 50 records
jobx sheet find -l 50

# Find page 3 with 10 records per page
jobx sheet find -p 3 -l 10

# Find specific record by ID
jobx sheet find -i abc123
```

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
