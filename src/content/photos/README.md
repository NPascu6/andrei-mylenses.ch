This folder contains Decap CMS-managed portfolio entries.

Each `.json` file represents one artwork shown on the public site.

Editing workflow:

- Upload or edit photos through `/admin/#/`
- Decap stores the image file in `src/assets/photos`
- Decap stores the metadata entry in this folder
- GitHub Actions rebuilds and deploys the updated site to GoDaddy

Recommended metadata habits:

- Keep titles short and gallery-friendly
- Use clean locations like `Zurich, Switzerland`
- Use `Featured` only for standout works
- Use `Print Ready` for images that should support stronger print-focused messaging
