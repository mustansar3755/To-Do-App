import { useContext, useState } from "react";
import { AppContext } from "../app/AppContext";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import ThemeSidebar from "./ThemeSidebar";
import { Palette } from "lucide-react"; // Import Lucide Palette Icon

const Navbar = () => {
  const { user, isAuthenticated, logoutUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  return (
    <nav className="w-full h-20 bg-surface px-10 flex items-center justify-between border-b border-gray-100 relative">
      <span className="text-xl font-bold bg-linear-to-r from-primary-start to-primary-end bg-clip-text text-main">
        TaskPanda 🐼
      </span>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-5">
            {/* Theme Toggle Button using Lucide Icon */}
            <button
              onClick={() => setIsThemeOpen(true)}
              className="p-2.5 rounded-xl bg-background hover:bg-gray-100 border border-gray-100 text-gray-500 hover:text-text-main transition-all cursor-pointer group"
              title="Change Workspace Theme"
            >
              <Palette className="w-5 h-5 text-purple-600 group-hover:rotate-12 transition-transform duration-200" />
            </button>

            <span className="text-[1.02rem] font-medium text-text-main">
              Hi,{" "}
              <span className="font-bold text-primary-end text-[1.00rem]">
                {user?.name || "User"}
              </span>
            </span>

            <Button
              text="Logout"
              variant="gradient"
              className="text-white"
              onClick={logoutUser}
            />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-sm cursor-pointer font-semibold text-text-main px-4 py-2"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-sm cursor-pointer font-bold text-white bg-linear-to-r from-primary-start to-primary-end px-5 py-2.5 rounded-md"
            >
              Get Started
            </button>
          </div>
        )}
      </div>

      <ThemeSidebar isOpen={isThemeOpen} setIsOpen={setIsThemeOpen} />
    </nav>
  );
};

export default Navbar;
