import React from "react";
import ProfileInfoCard from "../cards/ProfileInfoCard";
import { Link, NavLink } from "react-router-dom";
import { LuSparkles, LuLayoutGrid, LuGraduationCap } from "react-icons/lu";

const NAV_LINKS = [
  { to: "/dashboard", label: "Sessions", icon: LuLayoutGrid, end: true, brand: false },
  { to: "/ask-ai", label: "Ask anything to AI", icon: LuSparkles, brand: true },
  { to: "/mock-test", label: "Mock test", icon: LuGraduationCap, brand: false },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#0E1116]/[0.06] bg-white/80 backdrop-blur-md shadow-sm font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <div className="max-w-7xl mx-auto h-16 px-[15px] grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="group justify-self-start flex items-center gap-2 transition-all duration-300 min-w-0"
        >
          <span className="w-8 h-8 rounded-lg bg-[#34D399] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
            <LuSparkles size={16} className="text-[#0E1116]" />
          </span>
          <h2 className="font-display text-xl font-bold text-[#0E1116] truncate">
            Interview Prep AI
          </h2>
        </Link>

        {/* Nav tabs — true-centered regardless of logo/profile widths */}
        <nav className="justify-self-center flex items-center gap-1 h-16">
          {NAV_LINKS.map(({ to, label, icon: Icon, end, brand }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2 whitespace-nowrap px-3.5 h-16 text-sm border-b-2 transition-colors ${
                  isActive
                    ? "text-[#0E1116] font-semibold border-[#34D399]"
                    : "text-[#5B6472] border-transparent hover:text-[#0E1116]"
                }`
              }
            >
              <Icon size={16} className={brand ? "text-[#34D399]" : ""} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right Section */}
        <div className="justify-self-end flex items-center gap-4">
          <ProfileInfoCard />
        </div>
      </div>
    </header>
  );
};

export default Navbar;