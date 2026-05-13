import "dotenv/config"
import { app } from "./app.js"
import { prisma } from "./config/prisma.js"

// server.js - Entry point: Само listen() и shutdown.
const port = process.env.PORT || 4000

const server = app.listen(port, () => {
  console.log(`TaskBoard API listening on http://localhost:${port}`)
})

async function shutdown() {
  await prisma.$disconnect()
  server.close(() => {
    process.exit(0)
  })
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)
