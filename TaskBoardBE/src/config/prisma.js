import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"

// config/ - Prisma client, environment config, and shared setup.
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL is required")
}

const adapter = new PrismaPg({ connectionString })

export const prisma = new PrismaClient({ adapter })
