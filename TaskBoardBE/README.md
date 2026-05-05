# TaskBoardBE

Minimal Express API backed by Prisma and PostgreSQL.

## Database

Create `TaskBoardBE/.env` from `.env.example` and set your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskboard?schema=public"
```

Then apply the schema and seed the initial tasks:

```bash
npm run prisma:migrate
npm run prisma:seed
```

## Run

```bash
npm install
npm run prisma:generate
npm run dev
```

Default URL:

```text
http://localhost:4000
```

## Endpoints

- `GET /tasks`
- `GET /tasks/:id`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`
