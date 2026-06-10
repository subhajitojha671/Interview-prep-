import React from "react";
import ProfileInfoCard from "../cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto h-16 px-[15px] flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/dashboard"
          className="group transition-all duration-300"
        >
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
            Interview Prep AI
          </h2>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <ProfileInfoCard />
        </div>
      </div>
    </header>
  );
};

export default Navbar;