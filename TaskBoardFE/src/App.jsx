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

function formatDate(value) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
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
                    <article
                      key={task.id}
                      className="rounded-md border border-slate-200 bg-slate-50 p-4 text-left"
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <p className="mb-1 text-xs font-medium text-slate-500">TASK-{task.id}</p>
                          <h3 className="text-sm font-semibold text-slate-950">{task.title}</h3>
                        </div>
                        <button
                          type="button"
                          className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Delete task
                        </button>
                      </div>

                      {task.description && (
                        <p className="mb-4 text-sm leading-6 text-slate-600">{task.description}</p>
                      )}

                      <dl className="mb-4 grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <dt className="font-medium text-slate-500">Created</dt>
                          <dd className="mt-1 text-slate-800">{formatDate(task.createdAt)}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-slate-500">Updated</dt>
                          <dd className="mt-1 text-slate-800">{formatDate(task.updatedAt)}</dd>
                        </div>
                        {task.assignee && (
                          <div>
                            <dt className="font-medium text-slate-500">Assignee</dt>
                            <dd className="mt-1 text-slate-800">{task.assignee}</dd>
                          </div>
                        )}
                        {task.priority && (
                          <div>
                            <dt className="font-medium text-slate-500">Priority</dt>
                            <dd className="mt-1 capitalize text-slate-800">{task.priority}</dd>
                          </div>
                        )}
                      </dl>

                      <label className="mb-3 block text-xs font-medium text-slate-500">
                        Edit title
                        <input
                          type="text"
                          defaultValue={task.title}
                          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                        />
                      </label>

                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-medium text-slate-500">
                          Change status
                          <select
                            defaultValue={task.statusId}
                            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                          >
                            {taskStatuses.map((statusOption) => (
                              <option key={statusOption.id} value={statusOption.id}>
                                {statusOption.title}
                              </option>
                            ))}
                          </select>
                        </label>

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="rounded-md bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                          >
                            OK
                          </button>
                        </div>
                      </div>
                    </article>
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
