import express from 'express'

const app = express()
const port = process.env.PORT || 3000

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

let tasksData = [
  {
    id: 101,
    title: 'Create task',
    statusId: 1,
    createdAt: '2026-04-27T09:00:00.000Z',
    updatedAt: '2026-04-27T09:00:00.000Z',
    description: 'Build the first static version of the three-column board.',
    assignee: 'Alex',
    priority: 'high',
  },
  {
    id: 102,
    title: 'Add task card controls',
    statusId: 2,
    createdAt: '2026-04-27T09:30:00.000Z',
    updatedAt: '2026-04-27T10:15:00.000Z',
    description: 'Show edit title, delete task, and status change controls.',
    assignee: 'Mira',
    priority: 'medium',
  },
]

// Generates the next id from the current in-memory tasks list.
function getNextTaskId() {
  return Math.max(0, ...tasksData.map((task) => task.id)) + 1
}

// Finds one task by numeric id.
function findTask(taskId) {
  return tasksData.find((task) => task.id === taskId)
}

// Converts :id route param from string to number and validates it.
function parseTaskId(request, response, next) {
  const taskId = Number(request.params.id)

  if (!Number.isInteger(taskId)) {
    return response.status(400).json({ error: 'Task id must be a number' })
  }

  request.taskId = taskId
  next()
}

// Validates fields required by create and full update.
function validateTaskFields(payload) {
  const errors = []

  if (typeof payload.title !== 'string' || payload.title.trim().length === 0) {
    errors.push('Title is required')
  }

  if (!Number.isInteger(payload.statusId)) {
    errors.push('Status id must be a number')
  }

  return errors
}
////////////////////////////////
// GET /tasks - returns all tasks.

app.get('/tasks', (request, response) => {
  response.json(tasksData)
})


//////////////////////////////////
// POST /tasks - creates a new task.
app.post('/tasks', (request, response) => {
  const errors = validateTaskFields(request.body)

  if (errors.length > 0) {
    return response.status(400).json({ error: errors.join(', ') })
  }

  const now = new Date().toISOString()
  const task = {
    id: getNextTaskId(),
    title: request.body.title.trim(),
    statusId: request.body.statusId,
    createdAt: now,
    updatedAt: now,
    description: request.body.description?.trim() ?? '',
    assignee: request.body.assignee?.trim() ?? '',
    priority: request.body.priority?.trim() ?? 'medium',
  }

  tasksData.push(task)
  response.status(201).json(task)
})

////////////////////////////////////////////////
// PUT /tasks/:id - updates task title and status.

app.put('/tasks/:id', parseTaskId, (request, response) => {
  const task = findTask(request.taskId)

  if (!task) {
    return response.status(404).json({ error: 'Task not found' })
  }

  const errors = validateTaskFields(request.body)

  if (errors.length > 0) {
    return response.status(400).json({ error: errors.join(', ') })
  }

  const updatedTask = {
    ...task,
    title: request.body.title.trim(),
    statusId: request.body.statusId,
    updatedAt: new Date().toISOString(),
  }

  tasksData = tasksData.map((currentTask) =>
    currentTask.id === request.taskId ? updatedTask : currentTask
  )
  response.json(updatedTask)
})

/////////////////////////////////////
// DELETE /tasks/:id - removes task.
app.delete('/tasks/:id', parseTaskId, (request, response) => {
  const task = findTask(request.taskId)

  if (!task) {
    return response.status(404).json({ error: 'Task not found' })
  }

  tasksData = tasksData.filter((currentTask) => currentTask.id !== request.taskId)
  response.status(204).send()
})

app.listen(port, () => {
  console.log(`TaskBoard API listening on http://localhost:${port}`)
})
