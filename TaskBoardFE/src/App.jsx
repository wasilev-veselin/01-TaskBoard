const columns = [
  {
    title: 'Todo',
    tasks: ['new task'],
  },
  {
    title: 'In Progress',
    tasks: [],
  },
  {
    title: 'Done',
    tasks: [],
  },
]
const statuses = ['Todo', 'In Progress', 'Done']

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
          {columns.map((column) => (
            <section
              key={column.title}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-slate-900">{column.title}</h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {column.tasks.length}
                </span>
              </div>

              <button
                type="button"
                className="mb-4 w-full rounded-md border border-dashed border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Create task
              </button>

              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <article
                    key={task}
                    className="rounded-md border border-slate-200 bg-slate-50 p-4 text-left"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <h3 className="text-sm font-semibold text-slate-950">{task}</h3>
                      <button
                        type="button"
                        className="rounded-md px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      >
                        Delete task
                      </button>
                    </div>

                    <label className="mb-3 block text-xs font-medium text-slate-500">
                      Edit title
                      <input
                        type="text"
                        defaultValue={task}
                        className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                      />
                    </label>

                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-medium text-slate-500">
                        Change status
                        <select
                          defaultValue={column.title}
                          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                        >
                          {statuses.map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                      </label>

                      <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                          >
                            OK
                          </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
