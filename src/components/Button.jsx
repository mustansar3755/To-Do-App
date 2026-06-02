
const Button = ({
  text,               // Button ka displayed text
  onClick,            // Click handler function
  type = "button",    // button, submit, ya reset
  variant = "solid",  // solid, outline, ya gradient
  disabled = false,   // Disabled state boolean
  className = "",     // Kisi specific jagah extra margin/padding styling add krne k lie
  icon,               // Optional: Button k andar checkmark ya plus icon show krne k lie
}) => {

  // 1. Core Styles (Base Button Formatting)
  const baseStyles = "flex items-center justify-center gap-2 font-bold text-sm px-5 py-2.5 rounded-md transition-all duration-200 active:scale-[0.98] cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none";

  // 2. Multi-Theme Variations Setup
  const variantStyles = {
    // Dynamic Primary Accent Base Color
    solid: "bg-primary text-text-main shadow-xs hover:opacity-90 active:bg-primary/90",
    
    // Transparent outline tracking theme text accents
    outline: "bg-transparent border-2 border-primary text-text-main hover:bg-primary/10",
    
    // Full Premium Multi-Theme Shiftable Gradient
    gradient: "bg-linear-to-r from-primary-start to-primary-end text-white shadow-md hover:opacity-95 shadow-primary-end/10"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {/* Agar icon pass kiya ho to render hoga */}
      {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
      
      {/* Main text descriptor */}
      <span>{text}</span>
    </button>
  );
};

export default Button;