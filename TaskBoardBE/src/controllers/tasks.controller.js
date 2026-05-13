import * as tasksService from "../services/tasks.service.js"
//
// controllers/ - Чете request, вика service, връща response

export async function getTasks(request, response) {
  const tasks = await tasksService.getTasks()

  response.json(tasks)
}

export async function getTaskById(request, response) {
  const task = await tasksService.getTaskById(request.params.id)

  if (!task) {
    return response.status(404).json({ error: "Task not found" })
  }

  response.json(task)
}

export async function createTask(request, response) {
  const task = await tasksService.createTask(request.body)

  response.status(201).json(task)
}

export async function updateTask(request, response) {
  const task = await tasksService.getTaskById(request.params.id)

  if (!task) {
    return response.status(404).json({ error: "Task not found" })
  }

  const updatedTask = await tasksService.updateTask(request.params.id, request.body)

  response.json(updatedTask)
}

export async function deleteTask(request, response) {
  const task = await tasksService.getTaskById(request.params.id)

  if (!task) {
    return response.status(404).json({ error: "Task not found" })
  }

  await tasksService.deleteTask(request.params.id)

  response.status(204).send()
}
