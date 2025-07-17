import React from 'react';
import { NavLink ,Link} from "react-router-dom";
import logo from "../assets/carlogo1.png";

export default function Navbar() {
  // NavLink dynamic style
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

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <NavLink to="/" className={navItemClass}>
              Home
            </NavLink>
            <NavLink to="/createRide" className={navItemClass}>
              Create Ride
            </NavLink>
            <NavLink to="/requestRide" className={navItemClass}>
              Request Ride
            </NavLink>
            <NavLink to="/rideProgress" className={navItemClass}>
              Ride Progress
            </NavLink>
          </nav>
        </div>

        {/* Right: Logout, Notification Icon, Avatar */}
        <div className="flex items-center space-x-4">
          <Link to="/login">
          <button
            type="button"
            className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold"
          >
            Logout
          </button>
          </Link>
          

          <button
            type="button"
            className="relative text-gray-700 hover:text-indigo-600 transition-colors duration-300"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405M18 14.158V11a6 6 0 10-12 0v3.159m0 0l-1.405 1.405"
              />
            </svg>
          </button>

          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold select-none">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
