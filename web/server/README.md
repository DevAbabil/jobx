# DevAbabil - Portfolio Server

Backend API for DevAbabil portfolio built with Express, TypeScript, and MongoDB.

## Features

- Express.js with TypeScript
- MongoDB with Mongoose
- JWT Authentication
- File uploads with Cloudinary
- Email notifications with Nodemailer
- CORS configured for production
- Optimized for Vercel serverless deployment

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

3. Run development server:

```bash
pnpm dev
```

4. Build for production:

```bash
pnpm build
```

5. Start production server (local):

```bash
pnpm start
```

## Deployment to Vercel

### Prerequisites

- Vercel account
- MongoDB Atlas database
- Cloudinary account

### Steps

1. Install Vercel CLI (optional):

```bash
npm i -g vercel
```

2. Set environment variables in Vercel dashboard or via CLI:

```bash
vercel env add PORT
vercel env add NODE_ENV
vercel env add DB_URI
# ... add all other env vars from .env.example
```

3. Deploy:

```bash
vercel --prod
```

Or push to your connected Git repository (GitHub/GitLab) for automatic deployment.

### Important Notes

- The app uses `dist/index.js` as the serverless entry point
- Database connections are pooled and reused across invocations
- Seeding runs on cold starts (consider disabling in production if not needed)
- CORS is configured via `WHITE_LIST_ORIGIN` environment variable

## Project Structure

```
server/
├── src/
│   ├── app/           # Routes, middlewares, modules
│   ├── config/        # Configuration files
│   ├── shared/        # Shared utilities
│   ├── _app.ts        # Express app setup
│   ├── index.ts       # Vercel serverless entry
│   └── server.ts      # Local development entry
├── dist/              # Compiled JavaScript
├── scripts/           # Build scripts
└── vercel.json        # Vercel configuration
```

## API Endpoints

- `GET /` - Root response
- `GET /v1/ping` - Ping endpoint
- `GET /v1/health` - Health check
- `POST /v1/auth/*` - Authentication routes
- `GET /v1/projects/*` - Projects routes
- `POST /v1/mail/*` - Mail routes
- `GET /v1/assets/*` - Assets routes
- `GET /v1/user/*` - User routes

## Environment Variables

See `.env.example` for all required environment variables.

## License

ISC
