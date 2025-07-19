
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formType, setFormType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMsg("");
  setLoading(true);

  console.log("📤 Form submitted with:", { email, password });

  try {
    const endpoint =
      formType === "login"
        ? "http://localhost:8000/login"
        : "http://localhost:8000/register";

    const response = await axios.post(
      endpoint,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Response received:", response.data);
    localStorage.setItem("userEmail", email);
    navigate("/");
  } catch (err) {
    console.error("❌ Error occurred:", err);
    setErrorMsg(err?.response?.data?.detail || "Something went wrong");
  } finally {
    setLoading(false);
  }

  // Optional fallback if something hangs
  setTimeout(() => {
    if (loading) {
      console.warn("⏱️ Timeout fallback triggered");
      setErrorMsg("Request taking too long...");
      setLoading(false);
    }
  }, 5000);
};


  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left Image */}
      <div className="hidden md:flex relative w-1/2 bg-gradient-to-tr from-purple-600 via-purple-700 to-purple-800">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e8b21bea-16ba-4760-8597-4176b0fec86d.png"
          alt="Carpooling"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-12 text-center text-white">
          <svg
            aria-hidden="true"
            className="w-16 h-16 mb-4 text-indigo-300 drop-shadow-xl"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polygon points="12 2 22 8 12 14 2 8 12 2" />
            <polyline points="2 17 12 23 22 17" />
            <polyline points="2 12 12 18 22 12" />
          </svg>
          <h1 className="text-5xl font-extrabold leading-snug drop-shadow-xl">
            Ride Smarter,
            <br /> Together
          </h1>
          <p className="mt-4 text-lg max-w-xs drop-shadow-xl">
            Optimizing carpooling for JSSSTU students.
            <br />
            Save time, money, and the environment.
          </p>
        </div>
      </div>

      {/* Right Form */}
      <main className="flex w-full md:w-1/2 justify-center items-center p-6 bg-white">
        <div className="max-w-md w-full space-y-6">
          <header>
            <h2 className="text-2xl font-bold text-gray-900">
              {formType === "login" ? "Welcome Back!" : "Join GroupGo"}
            </h2>
            <p className="mt-1 text-gray-500 text-sm">
              {formType === "login"
                ? "Sign in to access your rides and connections."
                : "Create an account to start offering or finding rides."}
            </p>
          </header>

          {/* Toggle */}
          <div className="flex border border-gray-200 rounded-md overflow-hidden">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold ${
                formType === "login"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setFormType("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold ${
                formType === "signup"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setFormType("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <p className="text-red-600 text-sm font-medium text-center">
                {errorMsg}
              </p>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                College USN or Email
              </label>
              <input
                type="email"
                placeholder="your.usn@jssstu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700">
                <span>Password</span>
                {formType === "login" && (
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Forgot Password?
                  </a>
                )}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow transition"
            >
              {loading
                ? formType === "login"
                  ? "Logging in..."
                  : "Signing up..."
                : formType === "login"
                ? "Login"
                : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-500 text-xs">
            {formType === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              onClick={() =>
                setFormType(formType === "login" ? "signup" : "login")
              }
              className="text-indigo-600 hover:underline"
            >
              {formType === "login" ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
