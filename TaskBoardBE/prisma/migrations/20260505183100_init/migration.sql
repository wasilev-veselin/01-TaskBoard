CREATE TABLE "tasks" (
  "id" SERIAL NOT NULL,
  "title" TEXT NOT NULL,
  "statusId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "description" TEXT NOT NULL DEFAULT '',
  "assignee" TEXT NOT NULL DEFAULT '',
  "priority" TEXT NOT NULL DEFAULT 'medium',

  CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);
