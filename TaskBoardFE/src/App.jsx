import BoardColumn from "./components/BoardColumn/BoardColumn"

const taskStatuses = [
  { id: 1, title: 'Todo' },
  { id: 2, title: 'In Progress' },
  { id: 3, title: 'Done' },
]

const apiResponse = {
  tasks: [
    {
      id: 101,
      title: 'Create task board layout',
      statusId: 1,
      createdAt: '2026-04-27T09:00:00.000Z',
      updatedAt: '2026-04-27T09:00:00.000Z',
      description: 'Build the first static version of the three-column board.',
      assignee: 'Alex',
      priority: 'high',
    },
    {
      id: 102,
      title: 'Add task card controls',
      statusId: 2,
      createdAt: '2026-04-27T09:30:00.000Z',
      updatedAt: '2026-04-27T10:15:00.000Z',
      description: 'Show edit title, delete task, and status change controls.',
      assignee: 'Mira',
      priority: 'medium',
    },
    {
      id: 103,
      title: 'Install Tailwind',
      statusId: 2,
      createdAt: '2026-04-27T08:20:00.000Z',
      updatedAt: '2026-04-27T08:45:00.000Z',
      description: 'Configure Tailwind for the Vite React application.',
      assignee: 'Nikolay',
      priority: 'low',
    },
  ],
}

function App() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
              Mini Jira / Trello
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950">
              Task Board
            </h1>
          </div>

          <button
            type="button"
            className="w-full rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:w-auto"
          >
            Create task
          </button>
        </header>

        <div className="grid gap-5 lg:grid-cols-3">
          {taskStatuses.map((status) => {
            const columnTasks = apiResponse.tasks.filter((task) => task.statusId === status.id)

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

                <button
                  type="button"
                  className="mb-4 w-full rounded-md border border-dashed border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Create task
                </button>

                <div className="space-y-3">
                  {columnTasks.map((task) => (
                    <BoardColumn key={task.id} task={task} taskStatuses={taskStatuses} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default App
