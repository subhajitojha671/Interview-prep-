import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { LuLogOut } from "react-icons/lu";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <img
        src={user?.profileImageUrl}
        alt="Profile"
        className="w-11 h-11 rounded-full object-cover border-2 border-[#34D399]/40"
      />

      <div className="hidden sm:block">
        <h3 className="text-sm font-semibold text-[#0E1116]">
          {user?.name}
        </h3>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-xs text-[#0d8a5f] hover:text-[#FF6B4A] font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399] rounded"
        >
          <LuLogOut size={14} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;