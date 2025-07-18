

import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/carlogo1.png";

export default function Navbar() {
  const [userEmail, setUserEmail] = useState(null);
  const [initial, setInitial] = useState("U");
  const navigate = useNavigate();

  useEffect(() => {
    // Clear old login info only on first visit per tab
    const visited = sessionStorage.getItem("visited");
    if (!visited) {
      localStorage.removeItem("userEmail");
      sessionStorage.setItem("visited", "true");
    }

    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
      setInitial(email.trim().charAt(0).toUpperCase());
    }

    const handleStorageChange = () => {
      const updatedEmail = localStorage.getItem("userEmail");
      setUserEmail(updatedEmail);
      setInitial(updatedEmail ? updatedEmail.trim().charAt(0).toUpperCase() : "U");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    setInitial("U");
    navigate("/login");
  };

  const navItemClass = ({ isActive }) =>
    isActive
      ? "text-indigo-700 font-bold transition-colors duration-300"
      : "text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300";

  return (
    <header className="sticky top-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Left: Logo + Navigation */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="GroupGo Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-indigo-700 select-none">
              GroupGo
            </span>
          </div>

          <nav className="hidden md:flex space-x-6">
            <NavLink to="/" className={navItemClass}>Home</NavLink>
            <NavLink to="/createRide" className={navItemClass}>Create Ride</NavLink>
            <NavLink to="/requestRide" className={navItemClass}>Request Ride</NavLink>
            <NavLink to="/rideProgress" className={navItemClass}>Ride Progress</NavLink>
          </nav>
        </div>

        {/* Right: Auth Controls */}
        <div className="flex items-center space-x-4">
          {userEmail ? (
            <>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold"
              >
                Logout
              </button>
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold select-none">
                {initial}
              </div>
            </>
          ) : (
            <Link to="/login">
              <button
                className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold"
              >
                Login / Signup
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

