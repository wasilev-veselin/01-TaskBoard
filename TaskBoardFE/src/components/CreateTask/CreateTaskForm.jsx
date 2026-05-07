import { useState } from "react"

function CreateTaskForm({ statusId, isCreating, onCreateTask }) {
  const [title, setTitle] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    const createdTask = await onCreateTask({
      title: trimmedTitle,
      statusId,
    })

    if (createdTask) {
      setTitle("")
    }
  }

  return (
    <form className="mb-4 flex gap-2" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="New task"
        className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
      />

      <button
        type="submit"
        disabled={isCreating}
        className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Add
      </button>
    </form>
  )
}

export default CreateTaskForm
