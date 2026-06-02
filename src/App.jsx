import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Current URL path check karne ke liye hook
  const location = useLocation();

  // Jin paths par Navbar nahi dikhani, unhe is array mein daal dein
  const hideNavbarPaths = ["/login", "/register"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {/* Conditional Rendering: Agar path array mein nahi hoga, tabhi Navbar render hogi */}
      {shouldShowNavbar && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;