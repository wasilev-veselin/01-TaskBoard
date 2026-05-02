import TaskBoard from "./components/TaskBoard"

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

        <TaskBoard />
      </section>
    </main>
  )
}

export default App
