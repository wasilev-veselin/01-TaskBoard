import { z } from "zod"

// schemas/ - Zod schemas for request validation.
const allowedStatusIds = [1, 2, 3]

const titleSchema = z
  .string()
  .trim()
  .min(1, "Title is required")
  .max(100, "Title must be 100 characters or less")

const statusIdSchema = z
  .number()
  .int("Status id must be an integer")
  .refine((statusId) => allowedStatusIds.includes(statusId), {
    message: "Status id must be one of: 1, 2, 3",
  })

const descriptionSchema = z
  .string()
  .trim()
  .max(1000, "Description must be 1000 characters or less")

const assigneeSchema = z
  .string()
  .trim()
  .max(100, "Assignee must be 100 characters or less")

const prioritySchema = z.enum(["low", "medium", "high"], {
  error: "Priority must be one of: low, medium, high",
})

export const taskIdParamsSchema = z.object({
  id: z.coerce
    .number()
    .int("Task id must be an integer")
    .positive("Task id must be positive"),
})

export const taskBodySchema = z.strictObject({
  title: titleSchema,
  statusId: statusIdSchema,
  description: descriptionSchema.optional().default(""),
  assignee: assigneeSchema.optional().default(""),
  priority: prioritySchema.optional().default("medium"),
})

export const taskUpdateBodySchema = z.strictObject({
  title: titleSchema.optional(),
  statusId: statusIdSchema.optional(),
  description: descriptionSchema.optional(),
  assignee: assigneeSchema.optional(),
  priority: prioritySchema.optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided" }
)
