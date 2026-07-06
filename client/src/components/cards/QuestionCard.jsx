import React, { useEffect, useRef, useState } from "react";
import {
  LuChevronDown,
  LuPin,
  LuPinOff,
  LuSparkles,
} from "react-icons/lu";
import { motion } from "framer-motion";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setHeight(contentRef.current.scrollHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-xl mb-4 overflow-hidden py-4 px-5 shadow-lg shadow-[#0E1116]/[0.04] border border-[#0E1116]/[0.06] hover:border-[#34D399]/30 transition-colors group font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <div className="flex items-start justify-between">
        <div
          className="flex items-start gap-3.5 cursor-pointer"
          onClick={toggleExpand}
        >
          <span className="font-display text-xs md:text-[15px] font-semibold text-[#34D399] leading-[180%]">
            Q
          </span>

          <h3 className="text-xs md:text-[14px] font-medium text-[#0E1116] mr-0 md:mr-20">
            {question}
          </h3>
        </div>

        <div className="flex items-center justify-end ml-4 relative">
          <div
            className={`flex ${
              isExpanded ? "md:flex" : "md:hidden group-hover:flex"
            }`}
          >
            <button
              className="flex items-center gap-2 text-xs text-[#0E1116] font-medium bg-[#0E1116]/[0.05] px-3 py-1 mr-2 rounded-full border border-transparent hover:border-[#0E1116]/15 cursor-pointer transition-colors"
              onClick={onTogglePin}
            >
              {isPinned ? (
                <LuPinOff className="text-xs" />
              ) : (
                <LuPin className="text-xs" />
              )}
            </button>

            <button
              className="flex items-center gap-2 text-xs text-[#0E1116] font-semibold bg-[#34D399]/15 px-3 py-1 mr-2 rounded-full border border-transparent hover:border-[#34D399]/50 cursor-pointer transition-colors"
              onClick={() => {
                setIsExpanded(true);
                onLearnMore();
              }}
            >
              <LuSparkles className="text-[#34D399]" />
              <span className="hidden md:block">Learn More</span>
            </button>
          </div>

          <button
            className="text-[#0E1116]/40 hover:text-[#0E1116] cursor-pointer"
            onClick={toggleExpand}
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          ref={contentRef}
          className="mt-4 text-[#1E2430] bg-[#F7F5F0] px-5 py-3 rounded-lg"
        >
         <AIResponsePreview content={answer}/>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;