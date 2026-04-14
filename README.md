# Portfolio

Personal portfolio site built with **Next.js** (App Router), **TypeScript**, and **Tailwind CSS**. It includes localized pages, a contact form with optional Turnstile, GitHub-backed open source listings, and a server-generated CV PDF.

## Requirements

- **Node.js** 20 or newer (LTS recommended)
- **npm** (ships with Node)

## Quick start

From the repository root, start local development with:

```bash
make fresh
```

This installs npm dependencies when `node_modules` is missing, then runs `next dev`. Open [http://localhost:3000](http://localhost:3000) in your browser.

To install and run manually:

```bash
npm install
npm run dev
```

## Configuration

Copy `.env.example` to `.env` and set values as needed:

- `NEXT_PUBLIC_BASE_URL` - canonical site URL (metadata, CV links)
- Contact mail - SMTP variables and optional `CONTACT_UPLOAD_DIR`
- `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY` / `CLOUDFLARE_TURNSTILE_SECRET_KEY` - Turnstile on the contact form
- `GITHUB_TOKEN` - optional; raises GitHub API rate limits for the Open Source page

Site copy, projects, and experience are driven from `config/site.ts`.

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `make fresh`   | Dev server (see above)   |
| `npm run dev`  | Next.js development mode |
| `npm run build`| Production build         |
| `npm run start`| Run production server    |
| `npm run lint` | ESLint                   |

## Production

After `npm run build`, run `npm run start` behind your process manager or reverse proxy.

### Dokploy (Docker Compose)

- **Compose path** in Dokploy can be `./docker-compose.yml` (includes prod) or `./docker-compose.prod.yml` directly.
- **Domains:** add your hostname in Dokploy’s **Domains** tab for this compose service. Dokploy configures Traefik and certificates - this repo’s compose file does **not** set Traefik labels so nothing conflicts with that.
- **Environment:** set **`NEXT_PUBLIC_BASE_URL`** to the full public URL (e.g. `https://awunjia.com`) so metadata and client code match the served host. The stack joins **`dokploy-network`** and includes a container health check.

**Deploy error `open .../docker-compose.prod.yml: no such file`:** the Git branch Dokploy clones does not contain that file at the repo root. Fix by (1) pointing the Dokploy project at the GitHub repo and branch where this portfolio actually lives (for example `awunjia/portfolio` and branch `prod` or `main`), or (2) pushing your latest code (including `docker-compose.prod.yml`) to the repo Dokploy uses, then redeploy.

## License

Private project unless you choose to add a public license.
