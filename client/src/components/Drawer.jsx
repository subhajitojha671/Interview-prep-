import React from "react";
import { LuX } from "react-icons/lu";

function Drawer({
  isOpen,
  onClose,
  title = "AI Explanation",
  children,
}) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[55] bg-[#0E1116]/40 backdrop-blur-[2px]"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-[64px] right-0 z-[60]
        h-[calc(100vh-64px)]
        w-full md:w-[35vw]
        bg-white
        shadow-2xl
        border-l border-[#0E1116]/[0.08]
        overflow-y-auto
        transition-transform duration-300 ease-in-out
        ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        {/* Header (UNCHANGED) */}
        <div className="sticky top-0 bg-white z-10 border-b border-[#0E1116]/[0.06] px-5 py-4 flex items-center justify-between">
          <h5
            id="drawer-right-label"
            className="font-display text-lg font-semibold text-[#0E1116]"
          >
            {title}
          </h5>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#0E1116]/[0.05] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399]"
          >
            <LuX className="text-xl text-[#0E1116]/50" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {children}
        </div>
      </div>
    </>
  );
}

export default Drawer;