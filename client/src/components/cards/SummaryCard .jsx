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
      className="mx-2 bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative group"
    >
      {/* Header */}
      <div
        className="p-5"
        style={{ background: colors?.bgcolor }}
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-lg font-bold text-gray-800">
              {getInitials(role)}
            </span>
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900">
              {role}
            </h2>

            <p className="text-sm text-gray-700 mt-1 line-clamp-2">
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
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-red-500 p-2 rounded-lg shadow-md hover:bg-red-50"
      >
        <Trash2 size={16} />
      </button>

      {/* Content */}
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700">
            {experience} {experience == 1 ? "Year" : "Years"}
          </span>

          <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-700">
            {questions} Q&A
          </span>

          <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700">
            Last Updated: {lastUpdated}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;