import { useEffect, useState } from "react";

// Hamari defined themes ki list aur unke preview gradients
const themesList = [
  { id: "sunset", name: "Sunset Orange", gradient: "from-[#ffb703] to-[#ff6b00]" },
  { id: "ocean", name: "Ocean Blue", gradient: "from-[#4ea8de] to-[#3a86ff]" },
  { id: "royal", name: "Royal Purple", gradient: "from-[#b5179e] to-[#7209b7]" },
  { id: "forest", name: "Forest Green", gradient: "from-[#06d6a0] to-[#00b4d8]" },
  { id: "dark-forest", name: "Dark Forest", gradient: "from-[#000000] to-[#0c0c0c]" },
];

const ThemeSidebar = ({ isOpen, setIsOpen }) => {
  const [activeTheme, setActiveTheme] = useState(
    localStorage.getItem("todo-theme") || "sunset"
  );

  // Jab bhi activeTheme change hogi, ye pooray DOM ke root element par data-theme set karega
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", activeTheme);
    localStorage.setItem("todo-theme", activeTheme);
  }, [activeTheme]);

  return (
    <>
      {/* 1. Background Backdrop/Overlay when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 transition-opacity duration-300"
        />
      )}

      {/* 2. Sidebar Drawer Container */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-surface shadow-2xl z-50 p-6 border-l border-gray-100 transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-text-main">Customization</h2>
            <p className="text-xs text-text-muted">Choose your interface theme</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-text-muted hover:text-text-main p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Themes Selector Options */}
        <div className="space-y-3">
          {themesList.map((theme) => {
            const isSelected = activeTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary-end bg-linear-to-r from-primary-start/10 to-primary-end/10 font-semibold shadow-xs"
                    : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Theme Gradient Preview Circle */}
                  <span className={`w-6 h-6 rounded-full bg-linear-to-br ${theme.gradient} ring-2 ring-white shadow-xs shrink-0`} />
                  <span className="text-sm text-text-main">{theme.name}</span>
                </div>

                {/* Selected Tick Indicator */}
                {isSelected && (
                  <span className="text-primary-end">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.6c.045-.063.087-.129.125-.197Z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Premium Note Placeholder */}
        <div className="absolute bottom-6 left-6 right-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <p className="text-xs text-text-muted leading-relaxed">
            💡 <strong>Pro Tip:</strong> Theme configurations are completely reactive and match clean modern UI patterns.
          </p>
        </div>
      </div>
    </>
  );
};

export default ThemeSidebar;