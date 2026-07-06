import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
}) => {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-1 font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {label && (
        <label className="text-[13px] text-[#0E1116]/80">
          {label}
        </label>
      )}

      <div className="flex items-center border border-[#0E1116]/15 rounded-lg px-4 py-2 transition-colors focus-within:border-[#34D399] focus-within:ring-2 focus-within:ring-[#34D399]/20">

        <input
          type={
            type === "password"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-[#0E1116] placeholder:text-[#0E1116]/35"
          value={value ?? ""}
          onChange={onChange}
          required
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={20}
                className="text-[#34D399] cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="text-[#0E1116]/30 cursor-pointer hover:text-[#0E1116]/50"
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default Input;