# The Crown & Razor — Artisanal Barbershop & Grooming Lounge

A modern, high-performance website and booking engine for **The Crown & Razor** built with React, TypeScript, Tailwind CSS, and Vite.

## 🚀 Deploy to Vercel

This repository is pre-configured with `vercel.json` for one-click deployment on [Vercel](https://vercel.com).

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push this project to your GitHub, GitLab, or Bitbucket account.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Click **Import Project** and select your repository.
4. Vercel will automatically detect the **Vite** framework:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy**.

### Option 2: Deploy via Vercel CLI

1. Install the Vercel CLI globally (if not already installed):
   ```bash
   npm i -g vercel
   ```
2. Run the deploy command from the project root:
   ```bash
   vercel
   ```
3. For production deployment:
   ```bash
   vercel --prod
   ```

---

## 🛠 Local Development

To run the project locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Key Features Included

- **Multi-Step Booking System:** Service selection, master barber choice, dynamic date & time slot picker, and instant receipt generation.
- **Calendar Integration:** One-click Google Calendar event generation and RFC-compliant Apple/iCal (`.ics`) file download.
- **Filterable Lookbook:** Interactive style portfolio with direct matching service booking.
- **First-Visit Privilege Modal:** Custom discount code unlock and automatic cart application.
- **Full Legal Suite:** Interactive Terms & Conditions and Privacy Policy modals.
