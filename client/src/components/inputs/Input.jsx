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
    <div className="flex flex-col gap-1">

      {label && (
        <label className="text-[13px] text-slate-800">
          {label}
        </label>
      )}

      <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 focus-within:border-orange-500">

        <input
          type={
            type === "password"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={onChange}
          required
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={20}
                className="text-orange-500 cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="text-slate-400 cursor-pointer"
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