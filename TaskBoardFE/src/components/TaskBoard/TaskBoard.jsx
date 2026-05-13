import { useMemo } from "react"
import BoardColumn from "../BoardColumn/BoardColumn"
import CreateTaskForm from "../CreateTask"
import { useTasks } from "../../hooks/useTasks"

import {taskStatuses} from "../../constants/taskStatuses"

function TaskBoard() {
  const {
    tasks,
    isLoading,
    isCreating,
    error,
    success,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks()

  const tasksByStatusId = useMemo(() => {
    return tasks.reduce((groups, task) => {
      if (!groups[task.statusId]) {
        groups[task.statusId] = []
      }

      groups[task.statusId].push(task)
      return groups
    }, {})
  }, [tasks])

  return (
    <>
      {isLoading && (
        <p className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
          Loading tasks...
        </p>
      )}

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      {success && (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {success}
        </p>
      )}

      {!isLoading && !error && (
        <div className="grid gap-5 lg:grid-cols-3">
          {taskStatuses.map((status) => {
            const columnTasks = tasksByStatusId[status.id] ?? []

            return (
              <section
                key={status.id}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-base font-semibold text-slate-900">{status.title}</h2>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {columnTasks.length}
                  </span>
                </div>

                <CreateTaskForm
                  statusId={status.id}
                  isCreating={isCreating}
                  onCreateTask={createTask}
                />

                <div className="space-y-3">
                  {columnTasks.map((task) => (
                    <BoardColumn
                      key={task.id}
                      task={task}
                   
                      onUpdateTask={updateTask}
                      onDeleteTask={deleteTask}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </>
  )
}

export default TaskBoard
