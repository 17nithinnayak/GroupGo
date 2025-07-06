import React, { useState } from "react";

export default function Login() {
  const [loginType] = useState("rider");
  const [formType, setFormType] = useState("login"); // 'login' or 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex">
      {/* Left side image & overlay */}
      
<div className="hidden md:flex relative w-1/2 bg-gradient-to-tr from-purple-600 via-purple-700 to-purple-800">
  {/* background image */}
  <img
    src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e8b21bea-16ba-4760-8597-4176b0fec86d.png"
    alt="Group of students carpooling together, casual and happy at daylight inside a car"
    className="absolute inset-0 w-full h-full object-cover opacity-70"
    onError={(e) => {
      e.currentTarget.style.display = "none";
    }}
  />

  {/* text content on top of the image */}
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
      <br />
      Together
    </h1>
    <p className="mt-4 text-lg max-w-xs drop-shadow-xl">
      Optimizing carpooling for JSSSTU students. <br />
      Save time, money, and the environment.
    </p>
  </div>
</div>

      {/* Right side form */}
      <main className="flex w-full md:w-1/2 justify-center items-center p-8 bg-white">
        <div className="max-w-md w-full space-y-6">
          <header>
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
            <p className="mt-1 text-gray-500 text-sm">
              Sign in to access your rides and connections.
            </p>
          </header>

          {/* Tabs for Login/Signup */}
          <div className="flex border border-gray-200 rounded-md overflow-hidden">
            <button
              type="button"
              className={
                "flex-1 py-2 text-sm font-semibold focus:outline-none " +
                (formType === "login"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200")
              }
              onClick={() => setFormType("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={
                "flex-1 py-2 text-sm font-semibold focus:outline-none " +
                (formType === "signup"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200")
              }
              onClick={() => setFormType("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                `${formType === "login" ? "Logging in" : "Signing up"} as ${
                  loginType.charAt(0).toUpperCase() + loginType.slice(1)
                } with email: ${email}`
              );
            }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                College USN or Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="your.usn@jssstu.in"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
              />
            </div>

            {formType === "login" && (
              <div>
                <label
                  htmlFor="password"
                  className="flex justify-between text-sm font-medium text-gray-700"
                >
                  <span>Password</span>
                  <a
                    href="#forgot-password"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot Password?
                  </a>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                />
              </div>
            )}

            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-gray-700">
                Login As
              </legend>
              {/* <div className="flex gap-4 items-center">
                <label className="inline-flex items-center text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="loginType"
                    value="rider"
                    checked={loginType === "rider"}
                    onChange={() => setLoginType("rider")}
                    className="form-radio border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">Rider</span>
                </label>
                <label className="inline-flex items-center text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="loginType"
                    value="driver"
                    checked={loginType === "driver"}
                    onChange={() => setLoginType("driver")}
                    className="form-radio border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">Driver</span>
                </label>
              </div> */}
            </fieldset>

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white font-bold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {formType === "login" ? "Login" : "Sign Up"}
            </button>
          </form>

          {formType === "login" && (
            <>
              {/* <div className="flex items-center justify-center space-x-2 pt-6 text-gray-400 text-sm">
                <span>OR</span>
              </div> */}
              {/* <div className="space-y-3">
                <button
                  type="button"
                  className="w-full rounded-md border border-gray-300 py-2 px-4 text-center font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => alert("Signing up with Google")}
                >
                  Sign up with Google
                </button>
                <button
                  type="button"
                  className="w-full rounded-md border border-gray-300 py-2 px-4 text-center font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => alert("Signing up with Apple")}
                >
                  Sign up with Apple
                </button>
              </div> */}
              <p className="mt-6 text-center text-gray-500 text-xs">
                Don't have an account?{" "}
                <button
                  onClick={() => setFormType("signup")}
                  className="text-indigo-600 hover:underline focus:outline-none"
                >
                  Sign up
                </button>
              </p>
              <p className="mt-3 text-center text-gray-400 text-xs px-4">
                By continuing, you agree to GroupGo's{" "}
                <a
                  href="#terms"
                  className="text-indigo-600 hover:underline focus:outline-none"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#privacy"
                  className="text-indigo-600 hover:underline focus:outline-none"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </>
          )}

          {formType === "signup" && (
            <p className="text-center text-gray-500 text-sm">
              By signing up, you agree to our{" "}
              <a
                href="#terms"
                className="text-indigo-600 hover:underline focus:outline-none"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#privacy"
                className="text-indigo-600 hover:underline focus:outline-none"
              >
                Privacy Policy
              </a>
              .
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

