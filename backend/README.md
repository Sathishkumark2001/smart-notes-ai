# Backend — Spring Boot

Auth, notes CRUD, and the API gateway to the Python AI service.

## Stack
- Java 17, Spring Boot 3.3
- Spring Web, Spring Data JPA, Spring Security (JWT), Spring WebFlux (for calling the AI service)
- PostgreSQL
- Maven
- Lombok

## Prerequisites
- JDK 17+
- Maven 3.8+
- PostgreSQL running locally (or via Docker)

## Setup

1. Create the database:
   ```sql
   CREATE DATABASE smart_notes;
   ```

2. Copy `.env.example` to `.env` and fill in real values (or export the variables
   in your shell / IDE run config):
   ```
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=some-long-random-string-at-least-32-characters
   AI_SERVICE_URL=http://localhost:8000
   ```

3. Run it:
   ```bash
   mvn spring-boot:run
   ```

   The app starts on `http://localhost:8080`. Tables are auto-created via
   `ddl-auto: update` — fine for dev, swap for Flyway/Liquibase before production.

## API overview

| Method | Endpoint                     | Auth required | Description              |
|--------|-------------------------------|----------------|---------------------------|
| POST   | `/api/auth/register`          | No             | Create account, returns JWT |
| POST   | `/api/auth/login`             | No             | Log in, returns JWT       |
| GET    | `/api/notes`                  | Yes            | List current user's notes |
| GET    | `/api/notes/{id}`             | Yes            | Get one note              |
| POST   | `/api/notes`                  | Yes            | Create a note             |
| PUT    | `/api/notes/{id}`             | Yes            | Update a note             |
| DELETE | `/api/notes/{id}`             | Yes            | Delete a note             |
| POST   | `/api/notes/{id}/summarize`   | Yes            | Calls the AI service, stores summary on the note |

Authenticated requests need `Authorization: Bearer <token>` from
`/api/auth/login` or `/api/auth/register`.

## Notes
- `/api/notes/{id}/summarize` calls the Python AI service at `AI_SERVICE_URL`.
  It'll fail until that service is running with a `/summarize` endpoint (next milestone).
- CORS is currently open to `http://localhost:5173` (Vite's default dev port) — update
  `SecurityConfig.corsConfigurationSource()` if your frontend runs elsewhere.
