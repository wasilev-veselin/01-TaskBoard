import axios from "axios"

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
}
