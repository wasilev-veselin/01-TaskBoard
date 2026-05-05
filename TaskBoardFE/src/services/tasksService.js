import axios from "axios"
import { useEffect, useState } from "react"

const api = axios.create({
  baseURL: "http://localhost:4000",
})

export const tasksService = {
  async getAll() {
    const response = await api.get("/tasks")
    return response.data
  },

  async create(taskData) {
    const response = await api.post("/tasks", taskData)
    return response.data
  },

  async update(taskId, taskData) {
    const response = await api.put(`/tasks/${taskId}`, taskData)
    return response.data
  },

  async delete(taskId) {
    await api.delete(`/tasks/${taskId}`)
  },

  useTasks() {
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCreating, setIsCreating] = useState(false)
    const [updatingTaskId, setUpdatingTaskId] = useState(null)
    const [deletingTaskId, setDeletingTaskId] = useState(null)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
      loadTasks()
    }, [])

    async function loadTasks() {
      setIsLoading(true)
      setError("")
      setSuccess("")

      try {
        const loadedTasks = await tasksService.getAll()
        setTasks(loadedTasks)
      } catch {
        setError("Could not load tasks")
      } finally {
        setIsLoading(false)
      }
    }

    async function createTask(taskData) {
      setIsCreating(true)
      setError("")
      setSuccess("")

      try {
        const createdTask = await tasksService.create(taskData)
        setTasks((currentTasks) => [...currentTasks, createdTask])
        setSuccess("Task created")
        return createdTask
      } catch {
        setError("Could not create task")
        return null
      } finally {
        setIsCreating(false)
      }
    }

    async function updateTask(updatedTask) {
      setUpdatingTaskId(updatedTask.id)
      setError("")
      setSuccess("")

      try {
        const savedTask = await tasksService.update(updatedTask.id, {
          title: updatedTask.title,
          statusId: updatedTask.statusId,
        })

        setTasks((currentTasks) =>
          currentTasks.map((task) => (task.id === savedTask.id ? savedTask : task))
        )
        setSuccess("Task updated")
        return savedTask
      } catch {
        setError("Could not update task")
        return null
      } finally {
        setUpdatingTaskId(null)
      }
    }

    async function deleteTask(taskId) {
      setDeletingTaskId(taskId)
      setError("")
      setSuccess("")

      try {
        await tasksService.delete(taskId)
        setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
        setSuccess("Task deleted")
        return true
      } catch {
        setError("Could not delete task")
        return false
      } finally {
        setDeletingTaskId(null)
      }
    }

    return {
      tasks,
      isLoading,
      isCreating,
      updatingTaskId,
      deletingTaskId,
      error,
      success,
      loadTasks,
      createTask,
      updateTask,
      deleteTask,
    }
  },
}
