
const TaskCard = ({ todo, toggleComplete, deleteTask }) => {
  // Safely local se aane wali priority ko lowercase me convert kar rahe hain
  const currentPriority = todo.priority ? String(todo.priority).toLowerCase() : 'medium';

  // Dynamic Tailwind styling classes based on priority value
  const priorityStyles = {
    high: "bg-rose-50 text-rose-600 border-rose-100",
    medium: "bg-amber-50 text-amber-600 border-amber-100",
    low: "bg-teal-50 text-teal-600 border-teal-100",
  };

  // Safe fallback agar database se koi ajeeb value aa jaye
  const selectedStyle = priorityStyles[currentPriority] || priorityStyles.medium;

  return (
    <div
      className={`group relative flex flex-col justify-between p-5 rounded-xl border border-slate-300  transition-all duration-300 ${
        todo.completed
          ? "bg-slate-50/60 border-slate-400/80 shadow-none"
          : "bg-white border-slate-100 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_20px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
      }`}
    >
      {/* Top Section */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Modern Checkbox */}
            <label className="relative flex items-center justify-center mt-1 cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={todo.completed || false}
                onChange={() => toggleComplete(todo.id)}
                className="peer sr-only"
              />
              <div className="w-5 h-5 border-2 border-slate-300 rounded-md transition-all duration-200 bg-white peer-checked:bg-emerald-500 peer-checked:border-emerald-500 flex items-center justify-center peer-hover:border-slate-400 peer-checked:peer-hover:bg-emerald-600">
                {/* Checkmark Icon */}
                <svg
                  className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${
                    todo.completed ? "scale-100" : "scale-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </label>

            {/* Title (Line-through on Complete) */}
            <h3
              className={`text-base font-medium tracking-tight text-slate-800 transition-all duration-300 wrap-break-word ${
                todo.completed ? "line-through text-slate-400/70 opacity-70" : ""
              }`}
            >
              {todo.title || todo.text}
            </h3>
          </div>

          {/* Badges Container */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Localhost Priority Badge */}
            {!todo.completed && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-md font-semibold tracking-wider uppercase border ${selectedStyle}`}
              >
                {currentPriority}
              </span>
            )}

            {/* Status Badge */}
            <span
              className={`text-[11px] px-2.5 py-0.5 rounded-md font-medium transition-colors ${
                todo.completed
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-slate-100 text-amber-600"
              }`}
            >
              {todo.completed ? "Done" : "Pending"}
            </span>
          </div>
        </div>

        {/* Description (Line-through on Complete) */}
        {todo.description && (
          <p
            className={`text-sm mt-2 pl-8 line-clamp-2 transition-all duration-300 ${
              todo.completed 
                ? "line-through text-slate-400/50 opacity-60 decoration-slate-300" 
                : "text-slate-500"
            }`}
          >
            {todo.description}
          </p>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-end pl-8 mt-4 pt-3 border-t border-slate-100/80">
        {/* Delete Button */}
        <button
          onClick={() => deleteTask(todo.id)}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all duration-200 cursor-pointer"
          title="Delete Task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;