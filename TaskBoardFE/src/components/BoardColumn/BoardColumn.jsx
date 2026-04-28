import { useState } from "react";

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function BoardColumn({ task, taskStatuses }) {
  const [isEditing, setIsEditing] = useState(false);

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
              type="text"
              defaultValue={task.title}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </label>

          <label className="mb-3 block text-xs font-medium text-slate-500">
            Edit description
            <textarea
              defaultValue={task.description}
              rows="3"
              className="mt-1 w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </label>

          <div className="mb-3 grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-medium text-slate-500">
              Edit assignee
              <input
                type="text"
                defaultValue={task.assignee}
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </label>

            <label className="block text-xs font-medium text-slate-500">
              Edit priority
              <select
                defaultValue={task.priority}
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
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-md bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                onClick={() => setIsEditing(false)}
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
