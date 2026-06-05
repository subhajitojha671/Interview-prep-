import React from "react";

const SpinnerLoader = ({
  size = "w-6 h-6",
  color = "border-orange-500",
}) => {
  return (
    <div
      className={`${size} border-2 ${color} border-t-transparent rounded-full animate-spin`}
    />
  );
};

export default SpinnerLoader;