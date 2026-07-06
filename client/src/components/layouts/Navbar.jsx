import React from "react";
import ProfileInfoCard from "../cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#0E1116]/[0.06] bg-white/80 backdrop-blur-md shadow-sm font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <div className="max-w-7xl mx-auto h-16 px-[15px] flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/dashboard"
          className="group flex items-center gap-2 transition-all duration-300"
        >
          <span className="w-8 h-8 rounded-lg bg-[#34D399] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <LuSparkles size={16} className="text-[#0E1116]" />
          </span>
          <h2 className="font-display text-xl font-bold text-[#0E1116]">
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