import React from "react";
import ProfileInfoCard from "../cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-4">
        <Link to="/dashboard">
          <h2 className="text-xl font-bold text-gray-900">
            Interview Prep AI
          </h2>
        </Link>

        <ProfileInfoCard />
      </div>
    </header>
  );
};

export default Navbar;