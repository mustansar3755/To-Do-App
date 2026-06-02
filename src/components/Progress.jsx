// import React from 'react';

const Progress = ({ totalTasks = 0, completedTasks = 0 }) => {
  // Math Calculations for SVG Ring
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const remainingTasks = totalTasks - completedTasks;

  return (
    <div className="max-w-7xl mt-6 mx-auto rounded-3xl h-44 flex items-center justify-between gap-8 p-6 md:px-12 transition-all duration-500 shadow-xl 
      /* Background colors settings from index.css variables */
      bg-linear-to-r from-primary-start to-primary-end 
      /* Dark-forest me text bright slate hoga, baaki sab gradients par pure white high-contrast text */
      text-white data-[theme=dark-forest]:text-slate-200"
    >
      
      {/* Left: Dynamic Circular Progress Bar */}
      <div className="relative flex items-center justify-center w-28 h-28 shrink-0">
        <svg className="w-full h-full transform -rotate-90">
          {/* Track Circle (Background line) */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            className="text-white/20 data-[theme=dark-forest]:text-slate-800 transition-colors duration-500"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
          />
          {/* Active Progress Circle */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            className="text-white data-[theme=dark-forest]:text-emerald-500 transition-all duration-500 ease-out"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>
        {/* Percentage Number Display */}
        <span className="absolute text-xl font-bold">
          {percentage}%
        </span>
      </div>

      {/* Right: Task Metadata Overview */}
      <div className="flex-1 flex flex-col items-end text-right">
        <h2 className="text-xl font-bold tracking-wide mb-2 opacity-95">
          Today's Task Progress
        </h2>
        
        <div className="flex flex-wrap justify-end gap-3 text-sm font-medium mb-3">
          {/* Completed Badge */}
          <span className="bg-white/20 data-[theme=dark-forest]:bg-emerald-500/10 data-[theme=dark-forest]:text-emerald-400 data-[theme=dark-forest]:border-emerald-500/20 px-3 py-1 rounded-full backdrop-blur-xs border border-white/10">
            ✅ {completedTasks} Completed
          </span>
          {/* Remaining Badge */}
          <span className="bg-white/10 data-[theme=dark-forest]:bg-amber-500/10 data-[theme=dark-forest]:text-amber-400 data-[theme=dark-forest]:border-amber-500/20 px-3 py-1 rounded-full backdrop-blur-xs border border-white/5">
            ⏳ {remainingTasks >= 0 ? remainingTasks : 0} Remaining
          </span>
        </div>

        <p className="text-xs opacity-80 italic">
          {percentage === 100 
            ? "🎉 Amazing! You've done it!" 
            : "Good job! Keep up the great work."}
        </p>
      </div>

    </div>
  );
};

export default Progress;