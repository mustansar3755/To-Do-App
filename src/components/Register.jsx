import { useState, useContext } from "react";
import { AppContext } from "../app/AppContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simple validation check
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Complex payload pass kiya context action controller ko
      registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert("Account created successfully!");
      navigate("/"); // Dynamic dashboard transfer
    } catch (err) {
      setError(err.message || "Registration failed.");
    }
  };

  return (
    <div className=" h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md mx-auto mt-12 bg-surface border border-gray-100 p-8 rounded-3xl shadow-xl transition-colors duration-300">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black bg-linear-to-r from-primary-start to-primary-end bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Join TaskPanda to sync your full-stack roadmap
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl mb-4 font-medium border border-red-100">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-end bg-background/50 text-sm transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-end bg-background/50 text-sm transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-end bg-background/50 text-sm transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-linear-to-r from-primary-start to-primary-end text-white font-bold rounded-xl text-sm shadow-md hover:opacity-95 active:scale-[0.99] transition-all mt-2 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-xs text-text-muted mt-5">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-primary-end font-bold hover:underline bg-transparent border-none cursor-pointer"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
