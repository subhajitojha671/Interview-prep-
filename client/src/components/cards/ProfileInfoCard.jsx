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
    <div className="flex items-center gap-3">
      <img
        src={user?.profileImageUrl}
        alt="Profile"
        className="w-11 h-11 rounded-full object-cover border-2 border-gray-200"
      />

      <div className="hidden sm:block">
        <h3 className="text-sm font-semibold text-gray-900">
          {user?.name}
        </h3>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-xs text-orange-500 hover:text-orange-700 hover:underline font-medium cursor-pointer transition-colors"
        >
          <LuLogOut size={14} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;