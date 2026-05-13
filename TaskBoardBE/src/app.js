import express from "express"
import { corsMiddleware } from "./middlewares/cors.js"
import { errorHandler } from "./middlewares/errorHandler.js"
import { tasksRouter } from "./routes/tasks.routes.js"

//
// app.js - Express setup: global middleware, routes, and error handler.

export const app = express()

app.use(corsMiddleware)
app.use(express.json())

app.use("/tasks", tasksRouter)

app.use(errorHandler)
