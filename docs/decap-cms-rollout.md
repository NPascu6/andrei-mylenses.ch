# Decap CMS Rollout

This site ships its Decap CMS admin locally at `/admin/` and uses a separate OAuth gateway for the GitHub login flow.

## Current Alignment

- Site repo: `NPascu6/andrei-mylenses.ch`
- Site admin config: `public/admin/config.yml`
- Live site domain: `https://andrei-mylenses.ch`
- Live OAuth gateway domain: `https://andrei-mylenses-cms-oauth.vercel.app`
- OAuth gateway repo: sibling project `andrei-mylenses-cms-oauth`

## What Must Stay In Sync

The following values need to describe the same deployed OAuth gateway:

- `public/admin/config.yml`
  - `backend.base_url`
  - `backend.auth_endpoint`
- OAuth gateway Vercel environment
  - `PUBLIC_OAUTH_PROXY_URL`
  - `GITHUB_CALLBACK_URL`
- GitHub OAuth App settings
  - Homepage URL
  - Authorization callback URL

## Expected Behavior

- The site opens Decap at `/admin/`.
- Decap starts login against `https://andrei-mylenses-cms-oauth.vercel.app/auth`.
- The OAuth gateway rewrites `/auth` to `/api/auth` and `/callback` to `/api/callback`.
- GitHub returns to the configured callback URL.
- The gateway posts the GitHub token back to the CMS popup flow.

## Content Contract

The public site reads CMS-managed files from:

- `src/content/photos/*.json`
- `src/content/site/*.json`

Uploaded artwork images are stored in:

- `src/assets/photos`

The frontend maps CMS photo entries to imported image assets by image file basename, so the JSON `image` path must keep pointing at a file in `src/assets/photos`.

## Verification Checklist

- `/admin/` loads on the site.
- `https://andrei-mylenses-cms-oauth.vercel.app/auth` returns a GitHub OAuth redirect.
- `npm test` passes in the site repo.
- `npm run build` passes in the site repo.
