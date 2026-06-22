# Shivam Kumar — Backend Software Engineer Portfolio

A modern, startup-style personal engineering portfolio built for backend engineers to appeal to recruiters, startup founders, and technical leads. It highlights systems design, database performance, clean code paths, and direct API architectures.

**Live Link**: [portfolio-site-plum-pi.vercel.app](https://portfolio-site-plum-pi.vercel.app/)

---

## 🚀 Key Features

* **Premium Editorial Aesthetics**: Warm-dark minimalist theme, featuring serif typography, terracotta highlights, and responsive components.
* **Interactive SVG System Topology**: Fully responsive, custom vector topology canvas for case studies demonstrating service connections, caches, queues, and databases.
* **Resilient API Contact Pipeline**: 
  * Integrates **Neon.tech Serverless Postgres** to log inbound contact messages.
  * Connects with **Resend API** to instantly forward contact alerts to your Gmail.
  * Robust error-boundary failovers: if database limits or connection limits are reached, the pipeline gracefully routes notifications and logs payloads in fallback mode instead of crashing.
* **SEO & Web Analytics Compliance**:
  * **Dynamic JSON-LD Person schema** injection for rich search results.
  * Native Next.js Sitemap and Robots generators.
  * Vercel Web Analytics integration for tracking engagement metrics.

---

## 🛠️ Tech Stack

* **Core Framework**: [Next.js 15](https://nextjs.org/) (React 19) App Router
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Database**: [Neon.tech Serverless PostgreSQL](https://neon.tech/) (`@neondatabase/serverless`)
* **Mailing**: [Resend](https://resend.com/)
* **Validation**: [Zod](https://zod.dev/) (Zod schema validation for secure inputs)
* **Hosting**: [Vercel](https://vercel.com/) (Hobby Tier)

---

## 📂 Project Structure

```text
├── public/                 # Static assets (Resume PDF, icons)
├── supabase/               # SQL Database Schema Migrations
│   └── migrations/
│       └── 20260622000000_init_schema.sql
├── src/
│   ├── app/                # App Router Pages & API routes
│   │   ├── api/contact/    # Resilient contact API endpoint
│   │   ├── globals.css     # Global styles & Tailwind v4 config
│   │   ├── layout.tsx      # App shell with Navbar & Footer
│   │   ├── page.tsx        # Homepage loading all sections
│   │   ├── robots.ts       # SEO Robots file
│   │   └── sitemap.ts      # SEO Sitemap file
│   ├── components/         # Reusable UI widgets & sections
│   │   ├── sections/       # Hero, About, Capabilities, Projects, Tech, Why Me, Contact
│   │   ├── architecture-canvas.tsx   # Custom SVG Topology Canvas
│   │   └── json-ld.tsx     # JSON-LD Schema Markup injector
│   ├── config/             # Static configurations (Projects, data)
│   │   └── projects.ts
│   └── lib/                # Shared utilities & database clients
│       └── db.ts           # Neon serverless client initialization
```

---

## ⚙️ Environment Configuration

Create a `.env.local` file in your root folder:

```env
# Database Connection (Neon.tech Pooled String)
DATABASE_URL=postgresql://neondb_owner:password@ep-placeholder-123456-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require

# Resend API Configuration
RESEND_API_KEY=re_your_resend_api_key_here
CONTACT_RECIPIENT_EMAIL=shivamkumar10305@gmail.com
```

---

## 💻 Local Development

### 1. Database Setup
Sign up for a free PostgreSQL database at [Neon.tech](https://neon.tech). Go to the **SQL Editor**, copy the contents of `supabase/migrations/20260622000000_init_schema.sql`, paste it, and run it. This will create the `contact_messages` table.

### 2. Install Dependencies & Run
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ Deployment on Vercel

1. Push your code to your GitHub account:
   ```bash
   git add .
   git commit -m "feat: complete portfolio repository configuration"
   git push
   ```
2. Log in to [Vercel](https://vercel.com/) and import your project from GitHub.
3. Add the following **Environment Variables** in the Vercel dashboard:
   * `DATABASE_URL` (pooled connection string from Neon)
   * `RESEND_API_KEY` (from Resend dashboard)
   * `CONTACT_RECIPIENT_EMAIL` (your target email)
4. Click **Deploy**. Vercel will automatically build the site and deploy serverless functions in about 30 seconds.
