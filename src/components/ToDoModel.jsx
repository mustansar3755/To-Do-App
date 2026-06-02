import { useState, useContext } from "react";
import { AppContext } from "../app/AppContext";

const ToDoModel = ({ isOpen, onClose }) => {
  const { addTodo } = useContext(AppContext);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [priority, setPriority] = useState("medium"); // Default priority

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    // Payload structures
    const taskData = {
      title: taskTitle,
      details: taskDetails,
      priority: priority,
    };

    // ✅ FIX: Teeno parameters context ke function ko pass kar diye hain
    addTodo(taskData.title, taskData.details, taskData.priority);

    // Reset states
    setTaskTitle("");
    setTaskDetails("");
    setPriority("medium");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="bg-white w-full max-w-md p-6 rounded-3xl shadow-2xl border border-gray-100 relative z-10 scale-100 transition-all">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h3 className="text-lg font-black text-gray-800">
              Create New Task
            </h3>
            <p className="text-xs text-gray-400">
              Organize your stack schedule workflow
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Task Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Task Title
            </label>
            <input
              type="text"
              required
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g., Fix MERN Context Auth propagation..."
              className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-indigo-500 text-sm transition-colors"
            />
          </div>

          {/* 2. Task Details / Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Description / Notes
            </label>
            <textarea
              rows={3}
              value={taskDetails}
              onChange={(e) => setTaskDetails(e.target.value)}
              placeholder="Write execution breakdown details here..."
              className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-indigo-500 text-sm transition-colors resize-none"
            />
          </div>

          {/* 3. Priority Selection Row */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Task Priority
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {/* High Priority */}
              <button
                type="button"
                onClick={() => setPriority("high")}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-md border text-xs font-bold transition-all cursor-pointer ${
                  priority === "high"
                    ? "bg-red-50 border-red-500 text-red-600 shadow-xs scale-[1.02]"
                    : "bg-gray-50/50 border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500" />
                High
              </button>

              {/* Medium Priority */}
              <button
                type="button"
                onClick={() => setPriority("medium")}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-md border text-xs font-bold transition-all cursor-pointer ${
                  priority === "medium"
                    ? "bg-amber-50 border-amber-500 text-amber-600 shadow-xs scale-[1.02]"
                    : "bg-gray-50/50 border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Medium
              </button>

              {/* Low Priority */}
              <button
                type="button"
                onClick={() => setPriority("low")}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-md border text-xs font-bold transition-all cursor-pointer ${
                  priority === "low"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-600 shadow-xs scale-[1.02]"
                    : "bg-gray-50/50 border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Low
              </button>
            </div>
          </div>

          {/* Action Trigger Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl text-sm shadow-md hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer mt-4"
          >
            Save Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default ToDoModel;