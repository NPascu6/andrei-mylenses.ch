# CMS OAuth Gateway

This is a small Vercel-deployable OAuth proxy for Decap CMS using the GitHub backend.

## Purpose

The main site is deployed to GoDaddy over FTP and cannot run the server-side OAuth flow Decap needs for GitHub login.

This small app handles that OAuth flow on a separate domain, for example:

- `https://andrei-mylenses-oauth.vercel.app`

The main Decap config then points `backend.base_url` to that domain.

## Routes

- `/api/auth`
- `/api/callback`

Decap opens the `auth` route in a popup and expects the callback route to `postMessage` the GitHub token back to the CMS window.

## Required Environment Variables

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `PUBLIC_OAUTH_PROXY_URL`
- `GITHUB_CALLBACK_URL`

## GitHub OAuth App Setup

Create a GitHub OAuth App and use:

- Homepage URL: your proxy URL
- Authorization callback URL: your proxy URL + `/api/callback`

Example:

- Homepage URL: `https://andrei-mylenses-oauth.vercel.app`
- Authorization callback URL: `https://andrei-mylenses-oauth.vercel.app/api/callback`

## Deploy To Vercel

1. Create a new Vercel project from this folder.
2. Add the environment variables from `.env.example`.
3. Deploy.
4. Confirm `/api/auth` redirects to GitHub.
5. Keep `public/admin/config.yml` aligned with the deployed proxy URL.
