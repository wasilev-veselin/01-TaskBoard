import { Router } from "express"
import * as tasksController from "../controllers/tasks.controller.js"
import { validateBody, validateParams } from "../middlewares/validateRequest.js"
import {
  taskBodySchema,
  taskIdParamsSchema,
  taskUpdateBodySchema,
} from "../schemas/task.schema.js"

// routes/ - Defines endpoints and the middleware order before controllers.
export const tasksRouter = Router()

////////////////////////////////
// GET /tasks - returns all tasks.
tasksRouter.get("/", tasksController.getTasks)

//////////////////////////////////
// GET /tasks/:id - returns one task.
tasksRouter.get(
  "/:id",
  validateParams(taskIdParamsSchema),
  tasksController.getTaskById
)

//////////////////////////////////
// POST /tasks - creates a new task.
tasksRouter.post(
  "/",
  validateBody(taskBodySchema),
  tasksController.createTask
)

////////////////////////////////////////////////
// PUT /tasks/:id - updates task fields.
tasksRouter.put(
  "/:id",
  validateParams(taskIdParamsSchema),
  validateBody(taskUpdateBodySchema),
  tasksController.updateTask
)

/////////////////////////////////////
// DELETE /tasks/:id - removes task.
tasksRouter.delete(
  "/:id",
  validateParams(taskIdParamsSchema),
  tasksController.deleteTask
)
