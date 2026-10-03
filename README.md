# Portfolio — React

- `frontend/` React (Vite) portfolio. Edit content in `src/data.js`.
- Contact email is sent directly from the frontend through EmailJS.
- `.github/workflows/deploy.yml` builds and publishes the frontend to GitHub Pages.

## Run locally

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Contact email setup

1. Create an EmailJS account and add an email service.
2. Create a template using `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`, and `{{to_name}}`.
3. Copy `frontend/.env.example` to `frontend/.env.local` and add your IDs:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

The EmailJS public key is designed for browser use. Never add a private key or Gmail password to frontend code.

## Deploy

1. Push to the `main` branch.
2. Repository Settings → Pages → Source: **GitHub Actions**.
3. Settings → Secrets and variables → Actions → Variables → add the three `VITE_EMAILJS_*` values.
4. Push again. The site will be available at `https://<username>.github.io/portfolio/`.
