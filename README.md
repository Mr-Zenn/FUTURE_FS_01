# Portfolio V2 — MERN Stack

A full-stack portfolio with admin dashboard, built with React + Vite (frontend) and Node.js + Express + MongoDB (backend).

## Project Structure

```
portfolio-v2/
├── client/          # Vite + React frontend
└── server/          # Node.js + Express backend
```

## Quick Start

### 1. Configure environment variables

**server/.env**
```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
```

**client/.env**
```
VITE_API_URL=http://localhost:5000/api
```

### 2. Run the backend
```bash
cd server
npm run dev
```

### 3. Run the frontend
```bash
cd client
npm run dev
```

### 4. Seed the database (optional)
```bash
cd server
npm run seed
```
Creates 1 admin user (`admin@portfolio.com` / `admin123`) and 2 sample projects.

## API Routes

| Method | Route | Auth |
|--------|-------|------|
| POST | /api/auth/login | — |
| GET | /api/projects | — |
| POST | /api/projects | Admin |
| PUT | /api/projects/:id | Admin |
| DELETE | /api/projects/:id | Admin |
| POST | /api/messages | — |
| GET | /api/messages | Admin |

## Admin Access
Navigate to `/admin/login` in the browser after seeding.
