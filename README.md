# Pilates With Kashan

Luxury Pilates studio marketing site built with React, Vite, Tailwind CSS, and Framer Motion.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Deploy to GitHub Pages

1. Create a GitHub repo named `pilates-with-kashan` (or update `base` in `vite.config.js` if you use a different name).
2. Push this project to the `main` branch.
3. In the repo on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. After the workflow runs, the site is live at:

   `https://<your-github-username>.github.io/pilates-with-kashan/`

## Push to GitHub (first time)

```bash
cd pilates-with-kashan
git init
git add .
git commit -m "Initial commit: Pilates With Kashan website"
gh auth login
gh repo create pilates-with-kashan --public --source=. --remote=origin --push
```

If you do not use GitHub CLI, create an empty repo on github.com, then:

```bash
git remote add origin https://github.com/<username>/pilates-with-kashan.git
git branch -M main
git push -u origin main
```
