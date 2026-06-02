import  { useState, useEffect } from "react";

const themes = [
  { id: "sunset", name: "Sunset Orange", bg: "from-[#ffb703] to-[#ff6b00]" },
  { id: "ocean", name: "Ocean Blue", bg: "from-[#4ea8de] to-[#3a86ff]" },
  { id: "royal", name: "Royal Purple", bg: "from-[#b5179e] to-[#7209b7]" },
  { id: "forest", name: "Forest Green", bg: "from-[#06d6a0] to-[#00b4d8]" },
  { id: "dark-forest", name: "Dark Forest", bg: "from-[#000000] to-[#0c0c0c]" },
];

export default function ThemeSwitcher() {
  // Default theme sunset rakhi hai, localstorage se check bhi kr skte hain
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("todo-theme") || "sunset"
  );

  useEffect(() => {
    // HTML root element par data-theme attribute set krna
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("todo-theme", currentTheme);
  }, [currentTheme]);

  return (
    <div className="p-4 bg-surface rounded-xl shadow-sm border border-gray-100 max-w-md mx-auto my-4">
      <h3 className="text-text-main font-semibold mb-3 text-sm">Select Application Theme</h3>
      <div className="grid grid-cols-2 gap-2">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setCurrentTheme(theme.id)}
            className={`flex items-center gap-3 p-2 rounded-lg border text-left transition-all ${
              currentTheme === theme.id
                ? "border-primary-end bg-gray-50 font-medium"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            {/* Theme preview dot */}
            <span className={`w-5 h-5 rounded-full bg-linear-to-r ${theme.bg}`} />
            <span className="text-xs text-text-main">{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}