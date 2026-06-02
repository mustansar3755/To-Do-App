import { useState, useEffect, useMemo } from "react";
import TaskCard from "./TaskCard";

const AllTask = () => {
  // Helper function taake data load karne ka logic aik jagah ho
  const fetchTasksFromStorage = () => {
    const savedTasks = localStorage.getItem("taskpanda_todos");
    return savedTasks ? JSON.parse(savedTasks) : [];
  };

  // State initialization
  const [todos, setTodos] = useState(() => fetchTasksFromStorage());
  const [activeTab, setActiveTab] = useState("all");          
  const [priorityFilter, setPriorityFilter] = useState("all"); 

  // EFFECT 1: Jab is component se koi task complete/delete ho, to sync kare
  useEffect(() => {
    localStorage.setItem("taskpanda_todos", JSON.stringify(todos));
    window.dispatchEvent(new Event("storage_updated"));
  }, [todos]);

  // EFFECT 2: Jab KISI AUR component (jaise floating + button) se data add ho, to bina refresh data fetch kare
  useEffect(() => {
    const handleStorageUpdate = () => {
      setTodos(fetchTasksFromStorage());
    };

    // Listen to custom event and default storage event
    window.addEventListener("storage_updated", handleStorageUpdate);
    window.addEventListener("storage", handleStorageUpdate);

    // Cleanup listeners when component unmounts
    return () => {
      window.removeEventListener("storage_updated", handleStorageUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);

  // 1. Task Completion Status Toggle Handler
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 2. Task Delete Handler
  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  };

  // Advanced Combined Filtration Logic (Status + Priority)
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesStatus =
        activeTab === "all" ||
        (activeTab === "pending" && !todo.completed) ||
        (activeTab === "completed" && todo.completed);

      const todoPriority = todo.priority ? String(todo.priority).toLowerCase() : "medium";
      const matchesPriority =
        priorityFilter === "all" || todoPriority === priorityFilter;

      return matchesStatus && matchesPriority;
    });
  }, [todos, activeTab, priorityFilter]);

  // Counts for Priority Badges
  const priorityCounts = useMemo(() => {
    const currentStatusTodos = todos.filter((todo) => {
      if (activeTab === "pending") return !todo.completed;
      if (activeTab === "completed") return todo.completed;
      return true;
    });

    return {
      all: currentStatusTodos.length,
      high: currentStatusTodos.filter((t) => String(t.priority).toLowerCase() === "high").length,
      medium: currentStatusTodos.filter((t) => !t.priority || String(t.priority).toLowerCase() === "medium").length,
      low: currentStatusTodos.filter((t) => String(t.priority).toLowerCase() === "low").length,
    };
  }, [todos, activeTab]);

  // Status Tab Counter Helpers
  const statusCounts = useMemo(() => {
    return {
      all: todos.length,
      pending: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    };
  }, [todos]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mt-8 mb-12">
      {/* Top Header & Status Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-4 mb-5 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Task Board
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage and track your daily routine tasks</p>
        </div>

        {/* 3-Column Status Navigation Filter */}
        <div className="flex bg-slate-100 p-1 rounded-xl self-start md:self-auto shadow-xs">
          {["all", "pending", "completed"].map((tab) => {
            const isActive = activeTab === tab;
            let activeColor = "bg-white text-slate-800 shadow-sm";
            if (tab === "pending") activeColor = "bg-white text-amber-700 shadow-sm";
            if (tab === "completed") activeColor = "bg-white text-emerald-700 shadow-sm";

            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setPriorityFilter("all"); 
                }}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-all capitalize ${
                  isActive ? activeColor : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
                <span className={`text-[11px] px-1.5 py-0.5 rounded-md font-semibold ${isActive ? 'bg-slate-100 text-slate-700' : 'bg-slate-200/60 text-slate-600'}`}>
                  {statusCounts[tab]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Priority Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-2 pl-1">
          Priority:
        </span>
        
        <button
          onClick={() => setPriorityFilter("all")}
          className={`px-3 py-1 text-xs font-medium rounded-md border cursor-pointer transition-all ${
            priorityFilter === "all"
              ? "bg-slate-800 text-white border-slate-800 shadow-xs"
              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
          }`}
        >
          All ({priorityCounts.all})
        </button>

        <button
          onClick={() => setPriorityFilter("high")}
          className={`px-3 py-1 text-xs font-medium rounded-md border cursor-pointer transition-all ${
            priorityFilter === "high"
              ? "bg-rose-600 text-white border-rose-600 shadow-xs"
              : "bg-white text-rose-600 border-rose-200 hover:bg-rose-50/50"
          }`}
        >
          High ({priorityCounts.high})
        </button>

        <button
          onClick={() => setPriorityFilter("medium")}
          className={`px-3 py-1 text-xs font-medium rounded-md border cursor-pointer transition-all ${
            priorityFilter === "medium"
              ? "bg-amber-500 text-white border-amber-500 shadow-xs"
              : "bg-white text-amber-600 border-amber-200 hover:bg-amber-50/50"
          }`}
        >
          Medium ({priorityCounts.medium})
        </button>

        <button
          onClick={() => setPriorityFilter("low")}
          className={`px-3 py-1 text-xs font-medium rounded-md border cursor-pointer transition-all ${
            priorityFilter === "low"
              ? "bg-teal-600 text-white border-teal-600 shadow-xs"
              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
          }`}
        >
          Low ({priorityCounts.low})
        </button>
      </div>

      {/* Main Grid View */}
      {filteredTodos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-xl mb-3 text-slate-400">
            🔍
          </div>
          <p className="text-slate-700 text-base font-semibold mb-1">
            No matching tasks found
          </p>
          <p className="text-slate-400 text-sm max-w-xs">
            Aapke current filters {" "}
            <span className="font-semibold text-slate-500">({activeTab} + {priorityFilter} priority)</span> {" "}
            ke mutabiq koi task nahi mila.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
          {filteredTodos.map((todo) => (
            <TaskCard
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTask;