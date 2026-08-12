# JeevaWorks — jeevaworks.in

Freelance portfolio for Chennai & Tamil Nadu local businesses.

## Local preview

```bash
cd portfolio
npm install
npm run dev
```

Open http://localhost:3000

## Deploy free on Vercel + attach jeevaworks.in (HTTPS)

Vercel free Hobby plan gives hosting + automatic SSL (padlock / HTTPS).

### 1. Push this project to GitHub

Create a new GitHub repo, then from `portfolio/`:

```bash
git remote add origin https://github.com/YOUR_USERNAME/jeevaworks.git
git branch -M main
git push -u origin main
```

(If this folder already has git history from create-next-app, you can use that.)

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub (free).
2. **Add New Project** → import the `jeevaworks` repo.
3. Framework: **Next.js** (auto-detected). Leave build settings default.
4. Click **Deploy**. Wait for the `*.vercel.app` URL.

### 3. Attach your domain `jeevaworks.in`

1. In the Vercel project → **Settings** → **Domains**.
2. Add `jeevaworks.in` and `www.jeevaworks.in`.
3. Vercel shows DNS records. At your domain registrar (where you bought the domain), set:

**Option A — apex + www (recommended)**

| Type  | Name | Value                         |
|-------|------|-------------------------------|
| A     | @    | `76.76.21.21`                 |
| CNAME | www  | `cname.vercel-dns.com`        |

**Option B — if registrar supports ALIAS/ANAME for root**

| Type  | Name | Value                  |
|-------|------|------------------------|
| ALIAS | @    | `cname.vercel-dns.com` |
| CNAME | www  | `cname.vercel-dns.com` |

4. Wait for DNS (often 5–60 minutes; sometimes up to 24–48h).
5. In Vercel Domains, status should become **Valid**. HTTPS certificate is issued **automatically** — no extra cost.

### 4. Redirect www ↔ apex

In Vercel Domains, set `jeevaworks.in` as primary and redirect `www` to it (or the reverse). One click in the Domains UI.

## Contact details used on the site

- Phone / WhatsApp: +91 9344539265  
- Email: jeevawebdev1@gmail.com  
- LinkedIn: linkedin.com/in/jeevawebd  

Edit `src/lib/site.ts` and package prices in `src/components/Packages.tsx` anytime.
