import React from 'react'
import { LuTriangleAlert } from "react-icons/lu";

const DeleteAlAlertContent = ({ content, onDelete, onCancel }) => {
  return (
    <div className="p-5 font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <div className="flex items-start gap-3">
        <span className="w-9 h-9 rounded-lg bg-[#FF6B4A]/10 flex items-center justify-center shrink-0">
          <LuTriangleAlert size={16} className="text-[#FF6B4A]" />
        </span>
        <p className="text-sm text-[#5B6472] leading-relaxed pt-1.5">
          {content}
        </p>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-semibold text-[#5B6472] hover:text-[#0E1116] px-5 py-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399]"
          >
            Cancel
          </button>
        )}

        <button
          type="button"
          onClick={onDelete}
          className="text-sm font-semibold text-white bg-[#FF6B4A] hover:bg-[#ff8064] px-6 py-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A] focus-visible:ring-offset-2 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAlAlertContent