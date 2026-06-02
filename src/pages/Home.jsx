import { useContext, useEffect, useState } from "react";
import { AppContext } from "../app/AppContext";
import Progress from "../components/Progress";
import Button from "../components/Button";
import ToDoModel from "../components/ToDoModel";
import { useNavigate } from "react-router-dom";
import AllTask from "../components/AllTask";

const Home = () => {
  const { user, isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  // Modal open/close state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Tasks state jo LocalStorage se initialize hogi
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("taskpanda_todos");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // 2. LocalStorage ke data par nazar rakhne ke liye function (Optional but good for sync)
  const refreshTasks = () => {
    const savedTasks = localStorage.getItem("taskpanda_todos");
    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
  };

  // 3. Dynamic Real-time Calculations
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.completed || task.status === "completed",
  ).length;
  // (Note: 'completed' ya 'status' jo bhi aapki key ho, us mutabiq check karlein)

  // Home.jsx ke andar export se pehle ye add kar dein:
  useEffect(() => {
    const handleStorageUpdate = () => {
      const savedTasks = localStorage.getItem("taskpanda_todos");
      setTasks(savedTasks ? JSON.parse(savedTasks) : []);
    };

    // Custom event listener register kiya
    window.addEventListener("storage_updated", handleStorageUpdate);
    return () =>
      window.removeEventListener("storage_updated", handleStorageUpdate);
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 mt-6 animate-fade-in relative min-h-[calc(100vh-120px)]">
      {/* Conditional Rendering Logic */}
      {user && isAuthenticated ? (
        // Case 1: Active authenticated state view (Passing Dynamic Props Correctly)
        <Progress totalTasks={totalTasks} completedTasks={completedTasks} />
      ) : (
        // Case 2: Anonymous external welcome block banners
        <div className="w-full rounded-3xl min-h-44 md:h-44 flex flex-col md:flex-row items-center justify-between gap-6 bg-linear-to-r from-primary-start to-primary-end px-8 md:px-12 py-6 text-white shadow-xl shadow-primary-end/10 transition-all duration-300">
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
              Welcome to TaskPanda! 🐼
            </h2>
            <p className="text-sm md:text-base text-white/90 max-w-md font-medium leading-relaxed">
              Your intelligent full-stack workspace. Please sign in or create an
              account to manage your daily tasks.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              text="Sign In"
              variant="outline"
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-transparent border-white text-white hover:bg-white/10 hover:-translate-y-1"
            />
            <Button
              text="Sign Up Free"
              variant="outline"
              onClick={() => navigate("/register")}
              className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 hover:-translate-y-1"
            />
          </div>
        </div>
      )}

      {/* 1. Floating Action Plus Button (Visible only when authenticated) */}
      {user && isAuthenticated && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-linear-to-r from-primary-start to-primary-end text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          title="Add New Task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      )}

<AllTask/>
      {/* 2. Isolated Modular Popup Modal */}
      {/* Humne yahan refreshTasks pass kiya hai taake task add hone par UI update ho */}
      <ToDoModel
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          refreshTasks(); // Modal band hote hi state refresh hojayegi
        }}
      />
    </div>
  );
};

export default Home;
