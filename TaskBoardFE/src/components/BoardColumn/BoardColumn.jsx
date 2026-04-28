import { useState } from "react";

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function createTaskForm(task) {
  return {
    title: task.title,
    description: task.description ?? "",
    assignee: task.assignee ?? "",
    priority: task.priority ?? "medium",
    statusId: task.statusId,
  };
}

function BoardColumn({ task, taskStatuses, onUpdateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(() => createTaskForm(task));

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: name === "statusId" ? Number(value) : value,
    }));
  }

  function handleCancel() {
    setFormData(createTaskForm(task));
    setIsEditing(false);
  }

  function handleSave() {
    onUpdateTask({
      ...task,
      ...formData,
    });
    setIsEditing(false);
  }

  return (
    <article className="rounded-md border border-slate-200 bg-slate-50 p-4 text-left">
      {!isEditing && (
        <section>
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="mb-1 text-xs font-medium text-slate-500">
                TASK-{task.id}
              </p>
              <h3 className="text-sm font-semibold text-slate-950">
                {task.title}
              </h3>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
            >
              Delete task
            </button>
          </div>

          {task.description && (
            <p className="mb-4 text-sm leading-6 text-slate-600">
              {task.description}
            </p>
          )}

          <dl className="mb-4 grid grid-cols-2 gap-3 text-xs">
            <div>
              <dt className="font-medium text-slate-500">Created</dt>
              <dd className="mt-1 text-slate-800">
                {formatDate(task.createdAt)}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Updated</dt>
              <dd className="mt-1 text-slate-800">
                {formatDate(task.updatedAt)}
              </dd>
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
                <dd className="mt-1 capitalize text-slate-800">
                  {task.priority}
                </dd>
              </div>
            )}
          </dl>

          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
              onClick={() => setIsEditing(true)}
            >
              Edit task
            </button>
          </div>
        </section>
      )}

      {isEditing && (
        <section>
          <label className="mb-3 block text-xs font-medium text-slate-500">
            Edit title
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </label>

          <label className="mb-3 block text-xs font-medium text-slate-500">
            Edit description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </label>

          <div className="mb-3 grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-medium text-slate-500">
              Edit assignee
              <input
                name="assignee"
                type="text"
                value={formData.assignee}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </label>

            <label className="block text-xs font-medium text-slate-500">
              Edit priority
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-medium text-slate-500">
              Change status
              <select
                name="statusId"
                value={formData.statusId}
                onChange={handleInputChange}
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
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-md bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                onClick={handleSave}
              >
                OK
              </button>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

export default BoardColumn;
