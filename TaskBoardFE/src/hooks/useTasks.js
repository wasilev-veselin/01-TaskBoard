import { useEffect, useState } from "react"
import { tasksService } from "../services/tasksService"

export function useTasks() {
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
}
