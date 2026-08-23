# Portfolio

Personal portfolio site built with **Next.js** (App Router), **TypeScript**, and **Tailwind CSS**. It includes localized pages, a contact form with optional Turnstile, and a server-generated CV PDF.

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
- Contact mail - SMTP variables
- Cloudflare R2 (`CF_R2_*`) - contact form attachment storage
- `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY` / `CLOUDFLARE_TURNSTILE_SECRET_KEY` - Turnstile on the contact form

Site copy, projects, and experience are driven from `config/site.ts`.

## SEO & AEO

- Locale-prefixed routes: `/en`, `/en/contact`, `/fr/about`, etc. (`en` \| `fi` \| `sv` \| `fr` \| `da`)
- Bare paths (`/contact`) redirect to the preferred locale via middleware
- `/sitemap.xml` - every public page × every locale
- `/robots.txt` - allows search and major AI crawlers; blocks `/api/`
- `/llms.txt` (also `/.well-known/llms.txt`) - machine-readable bio for answer engines
- JSON-LD: Person / WebSite / Occupation; FAQ on home; skills ItemList on `/skills`

Set `NEXT_PUBLIC_BASE_URL=https://awunjia.com` in production so sitemap and canonical URLs stay absolute and correct.

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

#### Dokploy / Traefik log errors (what they mean)

**`Router <name> cannot be linked automatically with multiple Services` (e.g. `portfolio`, `chatwoot`)**  
Traefik sees more than one Docker service that could back the same router. Typical causes on Dokploy: custom Traefik labels on the app that reuse the same router or service name Dokploy already generates (`…-web`, `…-websecure`), duplicate **Domains** rows for the same host, or an old container still running with overlapping labels. **Fix:** in Dokploy, open this project - remove extra **Domains** or duplicate hosts, clear **custom Traefik labels** unless you know each router’s `traefik.http.routers.<router>.service=…` points to a single service, redeploy, then restart or reload Traefik if needed. On the **server**, setting Traefik’s Docker provider default network to `dokploy-network` (Dokploy docs / server Traefik config) avoids wrong-network picks when stacks use multiple networks. This repo only sets `traefik.docker.network=dokploy-network` on the `web` service for that reason.

**`Unable to obtain ACME certificate` + `Invalid response from http://www.<domain>/.well-known/acme-challenge/...` with parking HTML or Cloudflare IPs (`2606:4700:…`)**  
Let’s Encrypt HTTP-01 is hitting **Cloudflare or a parking page**, not your container. **Fix:** point `www` at your server (same origin as apex, or CNAME `www` → apex), then either use **DNS only** (grey cloud) on `@` and `www` until the certificate is issued, or terminate TLS at Cloudflare and use origin certs / **Full (strict)** instead of Traefik ACME for that hostname, or use a **DNS-01** resolver if your Dokploy / Traefik setup supports it.

**`no valid A records found for www.<domain>`**  
Add a **DNS A** (or **AAAA**) for `www`, or a **CNAME** from `www` to the hostname that already points at the server. Until public DNS answers, ACME will keep failing.

**`too many failed authorizations` / `rateLimited` (HTTP 429)**  
Let’s Encrypt throttles after repeated failures. **Fix:** wait until the time shown in the log, fix DNS / HTTP reachability first, then trigger issuance again - do not loop redeploys while validation is still broken.

## License

Private project unless you choose to add a public license.
