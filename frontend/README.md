# Frontend — React (Vite)

Currently a placeholder app with a single button that verifies the gateway
routes `/api/**` to the Spring Boot backend. Real UI (auth pages, notes
dashboard, quiz view, chat) comes next.

## Run standalone (without Docker)
```bash
npm install
npm run dev
```
Runs on `http://localhost:5173`.

## Run via the gateway
See the root `README.md` — `docker compose up` runs this alongside everything
else, reachable through `http://localhost/`.
