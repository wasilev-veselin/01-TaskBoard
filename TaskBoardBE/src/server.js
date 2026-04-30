import express from 'express'

const app = express()
const port = process.env.PORT || 3000


let tasks = [
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

app.get('/tasks', (request, response) => {
  response.json(tasks)
})


app.listen(port, () => {
  console.log(`TaskBoard API listening on http://localhost:${port}`)
})
