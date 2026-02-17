# CyberX Food Mini App

Telegram-style food ordering UI with Firebase auth, cart, and menu browsing. Built for a future Telegram Mini App integration (initData auth planned) while working fully in a regular browser.

## Stack
- React + TypeScript (Vite)
- Redux Toolkit
- React Router
- Firebase Auth
- i18next (react-i18next)
- Playwright (E2E)

## Features
- Auth-gated app (menu/cart behind login)
- Menu with categories and item detail overlay
- Cart with quantities and order summary
- Theme switch (light/dark/system)
- i18n-ready text

## Local setup
```bash
npm install
npm run dev
```

## Environment
Create `.env.local` (ignored by git):
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_TELEGRAM_AUTH_ENDPOINT=
```

## Scripts
```bash
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview production build
npm test          # Playwright tests
```

## Deployment (Vercel)
The project is configured for Vercel with `vercel.json`.
```bash
npm run build
```
Output is in `dist/`.

