import axios from "axios"
import { useEffect, useState } from "react"

const api = axios.create({
  baseURL: "http://localhost:3000",
})

export const tasksService = {
  async getAll() {
    const response = await api.get("/tasks")
    return response.data
  },

  useTasks() {
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
      tasksService
        .getAll()
        .then((loadedTasks) => {
          setTasks(loadedTasks)
          setError("")
        })
        .catch(() => {
          setError("Could not load tasks")
        })
        .finally(() => {
          setIsLoading(false)
        })
    }, [])

    return {
      tasks,
      setTasks,
      isLoading,
      error,
    }
  },
}
