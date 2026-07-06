import React from "react";
import { Trash2 } from "lucide-react";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      onClick={onSelect}
      className="mx-2 bg-white border border-[#0E1116]/[0.06] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#34D399]/[0.08] hover:-translate-y-1 hover:border-[#34D399]/30 relative group font-body"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* Header */}
      <div
        className="p-5"
        style={{ background: colors?.bgcolor }}
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <span className="font-display text-lg font-bold text-[#0E1116]">
              {getInitials(role)}
            </span>
          </div>

          <div className="flex-1">
            <h2 className="font-display text-lg font-bold text-[#0E1116]">
              {role}
            </h2>

            <p className="text-sm text-[#0E1116]/70 mt-1 line-clamp-2">
              {topicToFocus}
            </p>
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-[#FF6B4A] p-2 rounded-lg shadow-md hover:bg-[#FF6B4A]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A]"
      >
        <Trash2 size={16} />
      </button>

      {/* Content */}
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#0E1116]/[0.06] text-[#0E1116]">
            {experience} {experience == 1 ? "Year" : "Years"}
          </span>

          <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#34D399]/15 text-[#0d8a5f]">
            {questions} Q&A
          </span>

          <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#F7F5F0] text-[#5B6472]">
            Last Updated: {lastUpdated}
          </span>
        </div>

        <p className="text-sm text-[#5B6472] line-clamp-3 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;