# Task API — target project for Coding-Task Runner

A small NestJS REST API intended as a separate target repository for experimenting with your `coding-task-runner`.

## Requirements
- Node.js 22+
- npm

## Run locally
```powershell
npm install
npm run start:dev
```
The API listens on `http://localhost:3000`.

Set `AUTH_TOKEN` to a long, random secret before starting the API. All `/tasks`
endpoints require it in the `Authorization` header as `Bearer <token>`. The `/`
welcome endpoint remains public. If `AUTH_TOKEN` is unset, task endpoints return
`503 Service Unavailable` instead of running without authentication.

## Endpoints
| Method | URL | Description |
| --- | --- | --- |
| GET | `/` | Welcome response |
| GET | `/tasks` | List tasks; optional `?status=todo`, `?status=in_progress`, or `?status=done` |
| GET | `/tasks/:id` | Get one task |
| POST | `/tasks` | Create a task |
| PATCH | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

Create a task from PowerShell:
```powershell
Invoke-RestMethod -Method Post `
  -Uri http://localhost:3000/tasks `
  -Headers @{ Authorization = 'Bearer replace-with-a-long-random-token' } `
  -ContentType 'application/json' `
  -Body '{"title":"Add task filtering","description":"Filter tasks by status"}'
```

## Notes
- Tasks are stored in memory and reset when the server restarts.
- No real credentials or external service keys are included.
- Good first runner experiment: ask your runner to add validation for task titles, then inspect the diff and run `npm test` and `npm run build`.
