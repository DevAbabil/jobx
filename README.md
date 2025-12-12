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

### CLI Tool
- AI-powered email generation using the OpenAI API
- Google Sheets integration for application tracking
- Optional email submission directly from the CLI
- Minimal and flexible JSON-based configuration
- Profile and template system for reusable workflows
- Application status logging and monitoring
- Fully written in TypeScript for reliability

### Web Application
- **Full-Stack Integration**: Modern web application with Next.js frontend and Node.js backend
- **User Authentication**: Secure JWT-based authentication system
- **Pro Features**: Premium subscription model with lifetime access
- **Payment Integration**: SSLCommerz payment gateway for Bangladeshi users
- **Dashboard**: User-friendly dashboard for managing applications and settings
- **Real-time Updates**: Redux-powered state management for seamless user experience

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
├── src/                    # CLI Source Code
│   ├── cli/               # Command definitions
│   ├── core/              # Core logic
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
│   └── constants/         # Constant values
├── web/                   # Web Application
│   ├── client/            # Next.js Frontend
│   │   ├── src/app/       # App router pages
│   │   ├── src/components/# React components
│   │   ├── src/redux/     # Redux store & API
│   │   └── src/types/     # TypeScript types
│   └── server/            # Node.js Backend
│       ├── src/app/       # Express application
│       ├── src/config/    # Configuration files
│       └── src/shared/    # Shared utilities
├── scripts/               # Build and support scripts
├── data/                  # Sample configuration files
└── dist/                  # Compiled CLI output
```

## Web Application

### Architecture

The JobX web application consists of two main components:

#### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom components
- **State Management**: Redux Toolkit with RTK Query
- **Authentication**: JWT-based with secure cookie storage
- **Payment UI**: Integrated SSLCommerz payment interface

#### Backend (Node.js)
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with refresh mechanism
- **Payment Gateway**: SSLCommerz integration for BDT payments
- **API Architecture**: RESTful API with modular route structure

### Payment Integration

JobX Pro features are available through a **one-time payment of ৳500** with **lifetime access**.

#### SSLCommerz Integration Features:
- **Secure Payment Processing**: Industry-standard SSL encryption
- **Multiple Payment Methods**: Mobile banking, cards, and net banking
- **Bangladeshi Currency**: Native BDT support
- **Real-time Status Updates**: Automatic payment verification
- **Redirect Handling**: Success, failure, and cancellation flows

#### Payment Flow:
1. User clicks "Subscribe to Pro" in dashboard
2. Enters phone number for payment verification
3. Redirects to SSLCommerz payment gateway
4. Completes payment using preferred method
5. Automatic redirect back to JobX with status update
6. Pro features activated immediately upon successful payment

#### Pro Features Include:
- ✅ Advanced job search filters
- ✅ Priority application processing  
- ✅ Unlimited job applications
- ✅ Premium support

### Getting Started with Web App

#### Prerequisites
- Node.js 18 or later
- MongoDB database
- SSLCommerz merchant account (for payments)

#### Environment Setup

**Backend** (`web/server/.env`):
```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Database
DB_URI=mongodb://localhost:27017
DB_NAME=jobx_db
DB_USER=your_db_user
DB_PASS=your_db_password

# JWT Secrets
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

# SSLCommerz Configuration
SSLC_STORE_ID=your_store_id
SSLC_PASS=your_store_password
JOBX_PRO_PRICE=500

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8080
```

**Frontend** (`web/client/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

#### Installation & Running

```bash
# Install dependencies
cd web/server && npm install
cd ../client && npm install

# Start backend server
cd web/server && npm run dev

# Start frontend (in another terminal)
cd web/client && npm run dev
```

The web application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

#### Payment
- `POST /api/payment/intent` - Create payment intent
- `POST /api/payment/update-status` - Update payment status

#### User Management
- `GET /api/user/me` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/change-password` - Change password

## Security

### CLI Tool
- All credentials are stored locally within your project
- API keys are only transmitted to their respective services
- OpenAI-powered email generation is executed locally using your API key
- Google Sheets integration uses service account authentication for secure access

### Web Application
- **JWT Authentication**: Secure token-based authentication with refresh mechanism
- **Password Hashing**: Bcrypt encryption for user passwords
- **CORS Protection**: Configured cross-origin resource sharing
- **Input Validation**: Zod schema validation for all API endpoints
- **Payment Security**: SSLCommerz PCI DSS compliant payment processing
- **Environment Variables**: Sensitive data stored in environment configuration
- **Database Security**: MongoDB connection with authentication and encryption

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
