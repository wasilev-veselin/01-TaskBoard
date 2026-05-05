import "dotenv/config"
import express from "express"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"

const app = express()
const connectionString = process.env.DATABASE_URL

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })
const port = process.env.PORT || 4000

// Allows calls from local port.
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Browser check request for POST/PUT/DELETE calls.
  if (request.method === 'OPTIONS') {
    return response.sendStatus(204)
  }

  next()
})

app.use(express.json())

////////////////////////////////
// GET /tasks - returns all tasks.
app.get('/tasks', async (request, response) => {
  const tasks = await prisma.task.findMany({
    orderBy: { id: "asc" },
  })

  response.json(tasks)
})

//////////////////////////////////
// GET /tasks/:id - returns one task.
app.get(
  '/tasks/:id',
  async (request, response) => {
    const task = await prisma.task.findUnique({
      where: { id: Number(request.params.id) },
    })

    if (!task) {
      return response.status(404).json({ error: 'Task not found' })
    }

    response.json(task)
  })

//////////////////////////////////
// POST /tasks - creates a new task.
app.post('/tasks', async (request, response) => {
  const now = new Date()

  const task = await prisma.task.create({
    data: {
      title: request.body.title,
      statusId: request.body.statusId,
      createdAt: now,
      updatedAt: now,
      description: request.body.description ?? '',
      assignee: request.body.assignee ?? '',
      priority: request.body.priority ?? 'medium',
    },
  })

  response.status(201).json(task)
})

////////////////////////////////////////////////
// PUT /tasks/:id - updates task title and status.
app.put('/tasks/:id', async (request, response) => {
  const task = await prisma.task.findUnique({
    where: { id: Number(request.params.id) },
  })

  if (!task) {
    return response.status(404).json({ error: 'Task not found' })
  }

  const updatedTask = await prisma.task.update({
    where: { id: Number(request.params.id) },
    data: {
      title: request.body.title,
      statusId: request.body.statusId,
    },
  })

  response.json(updatedTask)
})

/////////////////////////////////////
// DELETE /tasks/:id - removes task.
app.delete('/tasks/:id', async (request, response) => {
  const task = await prisma.task.findUnique({
    where: { id: Number(request.params.id) },
  })

  if (!task) {
    return response.status(404).json({ error: 'Task not found' })
  }

  await prisma.task.delete({
    where: { id: Number(request.params.id) },
  })

  response.status(204).send()
})

app.use((error, request, response, next) => {
  console.error({
    requestId: request.requestId,
    method: request.method,
    path: request.path,
    error,
  })
  response.status(500).json({ error: 'Internal server error' })
})

const server = app.listen(port, () => {
  console.log(`TaskBoard API listening on http://localhost:${port}`)
})

async function shutdown() {
  await prisma.$disconnect()
  server.close(() => {
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
