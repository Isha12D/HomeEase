import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";

const LoginForm = ({ closeModal, goToSignup }) => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      login({
        id: data.user.id,
        name: data.user.name,
        role: data.user.role,
        token: data.token
      });

      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30" />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg flex w-11/12 md:w-2/3 lg:w-1/2 h-[470px] overflow-hidden">
          
          {/* Image */}
          <div className="hidden md:block md:w-1/2">
            <img
              src="https://i.pinimg.com/1200x/98/e8/76/98e876a068ab5c14b9031f3ae7c7c8e0.jpg"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Form */}
          <div className="w-full md:w-1/2 p-6 relative flex flex-col justify-center">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <form className="space-y-4" onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border rounded px-3 py-2"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border rounded px-3 py-2"
                required
              />

              <button
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-4 text-sm">
              Don’t have an account?{" "}
              <span
                onClick={goToSignup}
                className="text-blue-600 cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
