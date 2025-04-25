# Deployment Guide

This guide explains how to deploy the NestJS backend to Vercel and set up CI/CD with GitHub Actions.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. A [GitHub](https://github.com) account
3. A database service (like Supabase, PostgreSQL on Railway, etc.)

## Setting Up Vercel

1. Install the Vercel CLI:

   ```
   npm install -g vercel
   ```

2. Login to Vercel:

   ```
   vercel login
   ```

3. Link your project to Vercel:
   ```
   vercel link
   ```

## Environment Variables

1. Add your environment variables to Vercel:

   ```
   vercel env add DATABASE_URL
   vercel env add JWT_SECRET
   ```

2. Make sure to add these variables to both Preview and Production environments.

## GitHub Actions Setup

1. Create a Vercel token at https://vercel.com/account/tokens

2. Add the token as a secret in your GitHub repository:
   - Go to your repository on GitHub
   - Navigate to Settings > Secrets > Actions
   - Create a new secret named `VERCEL_TOKEN` with the value being your Vercel token

## Manual Deployment

To manually deploy your application to Vercel:

```
vercel --prod
```

## Prisma in Production

Before deploying, make sure your database has the latest migrations:

```
npx prisma migrate deploy
```

This command is included in the `vercel-build` script in `package.json`.

## Troubleshooting

1. If you encounter issues with Prisma, try:

   ```
   npx prisma generate
   ```

2. For CORS issues, check the CORS configuration in `main.ts` and `vercel.json`.

3. For deployment failures, check the Vercel deployment logs.
