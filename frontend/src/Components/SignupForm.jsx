import React, { useState } from "react";

const SignupForm = ({ closeModal, goToLogin }) => {
  const [isProvider, setIsProvider] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = {
      name: e.target.fullName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      isProvider
    };

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      alert("Account created successfully ");
      goToLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30" />
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg flex w-11/12 md:w-2/3 lg:w-1/2 h-[470px] overflow-hidden">
          
          {/* Left Image */}
          <div className="hidden md:block md:w-1/2">
            <img
              src="https://i.pinimg.com/1200x/98/e8/76/98e876a068ab5c14b9031f3ae7c7c8e0.jpg"
              alt="signup"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Form */}
          <div className="w-full md:w-1/2 p-6 relative flex flex-col justify-center">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">Create Account</h2>

            {error && (
              <p className="text-red-500 text-sm mb-2">{error}</p>
            )}

            <form className="space-y-4" onSubmit={handleSignup}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full border rounded px-3 py-2"
                required
              />

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

              {/* Provider Checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="provider"
                  checked={isProvider}
                  onChange={() => setIsProvider(!isProvider)}
                  className="w-4 h-4"
                />
                <label htmlFor="provider" className="text-sm">
                  Are you a service provider?
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <p className="mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={goToLogin}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
