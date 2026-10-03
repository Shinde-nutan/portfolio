# Portfolio — React + FastAPI

- `frontend/` React (Vite) site. Edit content in `src/data.js`.
- `backend/` FastAPI contact API (validation, rate limit, SQLite).
- `.github/workflows/deploy.yml` builds and publishes the frontend to GitHub Pages.
- `render.yaml` deploys the backend to Render.

## Run locally
```bash
cd backend && python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt && uvicorn main:app --reload      # :8000

cd frontend && npm install
echo "VITE_API_URL=http://localhost:8000" > .env.local
npm run dev                                                        # :5173
```

## Deploy
1. Push to a GitHub repo named `portfolio` (branch `main`).
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Render → New → Blueprint → select the repo. Set `ALLOWED_ORIGINS` to `https://<username>.github.io`.
4. Repo → Settings → Secrets and variables → Actions → Variables → add `VITE_API_URL` = your Render URL.
5. Push again. Site: `https://<username>.github.io/portfolio/`.

Without `VITE_API_URL` the contact section shows a plain mailto link.
Note: Render's free tier has an ephemeral disk, so stored messages can be lost on redeploy.
