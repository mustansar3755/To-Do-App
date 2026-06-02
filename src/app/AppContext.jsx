import { createContext, useState, useEffect } from "react";

// Context Create Kiya
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

// Provider Component jo pooray app ko data supply karega
export const AppProvider = ({ children }) => {
  // 1. Authentication State (Initial value LocalStorage se uthayenge)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("taskpanda_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("taskpanda_token") || null;
  });

  // 2. Application Data State (Todos, Categories wagera kal ko full-stack sync krne k lie)
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("taskpanda_todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // 3. Jab bhi user ya token change ho, LocalStorage automatic sync ho jaye
  useEffect(() => {
    if (user) {
      localStorage.setItem("taskpanda_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("taskpanda_user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("taskpanda_token", token);
    } else {
      localStorage.removeItem("taskpanda_token");
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("taskpanda_todos", JSON.stringify(todos));
  }, [todos]);

  // ==========================================
  // ACTION FUNCTIONS (Login, Register, Logout, Todos)
  // ==========================================

  // A. Register Function
  const registerUser = (signUpData) => {
    const existingUser = localStorage.getItem("taskpanda_user");
    // Check if email already exists
    const userExists = existingUser
      ? JSON.parse(existingUser).some((u) => u.email === signUpData.email)
      : false;
    if (userExists) {
      alert("User with this email already exists!");
      return false;
    }
    // If not exists, save the new user
    const newUser = { ...signUpData, id: Date.now() };
    const updatedUsers = existingUser
      ? [...JSON.parse(existingUser), newUser]
      : [newUser];
    localStorage.setItem("taskpanda_user", JSON.stringify(updatedUsers));
    return true;
  };

  // B. Login Function
  const loginUser = (email, password) => {
    const existingUser = localStorage.getItem("taskpanda_user");
    const matchedUser = existingUser
      ? JSON.parse(existingUser).find(
          (u) => u.email === email && u.password === password,
        )
      : null;
    if (!matchedUser) {
      alert("No user found with this email!");
      return false;
    }
    const sessionUser = { name: matchedUser.name, email: matchedUser.email };
    const mockToken = "mock-jwt-token-" + Date.now(); // Mock token for demonstration
    setUser(sessionUser);
    setToken(mockToken);
    return true;
  };

  // C. Logout Function
  const logoutUser = () => {
    setUser(null);
    setToken(null);
    setTodos([]); // Logout pr state clear
    localStorage.removeItem("taskpanda_user");
    localStorage.removeItem("taskpanda_token");
    localStorage.removeItem("taskpanda_todos");
  };

  // D. Add New Todo Task (Updated with Priority and LocalStorage Sync)
const addTodo = (taskText, taskDetails, taskPriority = "Medium") => {
  const newTodo = {
    id: Date.now(),
    text: taskText,
    description: taskDetails, // Humne yahan 'description' use kiya hai kyunki AllTask component isi key ko read kar raha hai
    priority: taskPriority,   // "High", "Medium", ya "Low"
    completed: false,
    createdAt: new Date().toISOString(), // ISO String standard format hai dates ke liye
  };

  setTodos((prevTodos) => {
    const updatedTodos = [newTodo, ...prevTodos];
    
    // LocalStorage ko foran update karein taake baqi components ko real-time data mile
    localStorage.setItem("taskpanda_todos", JSON.stringify(updatedTodos));
    
    // Yeh event baqi page components (jaise Home ka Progress Bar) ko real-time update karwayega
    window.dispatchEvent(new Event("storage_updated"));
    
    return updatedTodos;
  });
};

  // E. Toggle Todo Completion (Check/Uncheck)
  const toggleTodo = (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // F. Delete Todo
  const deleteTodo = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  // Context Provider Return values jo pure app ko accessible hongi
  return (
    <AppContext.Provider
      value={{
        user,
        token,
        todos,
        isAuthenticated: !!token, // Helper boolean to check login status
        registerUser,
        loginUser,
        logoutUser,
        addTodo,
        toggleTodo,
        deleteTodo,
        setTodos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
