import { prisma } from "../config/prisma.js"

// services/ - Prisma operations and business logic.
export function getTasks() {
  return prisma.task.findMany({
    orderBy: { id: "asc" },
  })
}

export function getTaskById(taskId) {
  return prisma.task.findUnique({
    where: { id: taskId },
  })
}

export function createTask(taskData) {
  const now = new Date()

  return prisma.task.create({
    data: {
      title: taskData.title,
      statusId: taskData.statusId,
      createdAt: now,
      updatedAt: now,
      description: taskData.description,
      assignee: taskData.assignee,
      priority: taskData.priority,
    },
  })
}

export function updateTask(taskId, taskData) {
  return prisma.task.update({
    where: { id: taskId },
    data: taskData,
  })
}

export function deleteTask(taskId) {
  return prisma.task.delete({
    where: { id: taskId },
  })
}
