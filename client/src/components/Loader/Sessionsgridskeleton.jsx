import React from "react";

function SessionsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pb-6 px-4 md:px-0">
      <style>{`
        @keyframes shimmer-sweep {
          100% { transform: translateX(100%); }
        }
        .sgs-shimmer {
          position: relative;
          overflow: hidden;
          background-color: rgba(14, 17, 22, 0.08);
        }
        .sgs-shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer-sweep 1.6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .sgs-shimmer::after { animation: none; }
        }
      `}</style>

      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="bg-white border border-[#0E1116]/[0.06] rounded-2xl overflow-hidden"
        >
          {/* Header block, mimics SummaryCard's colored header */}
          <div className="p-5 bg-[#0E1116]/[0.03]">
            <div className="flex items-start gap-4">
              <div className="sgs-shimmer w-14 h-14 rounded-xl shrink-0"></div>
              <div className="flex-1 space-y-2 pt-1">
                <div className="sgs-shimmer h-4 rounded w-3/4"></div>
                <div className="sgs-shimmer h-3 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4">
            <div className="flex gap-2">
              <div className="sgs-shimmer h-5 rounded-full w-16"></div>
              <div className="sgs-shimmer h-5 rounded-full w-14"></div>
              <div className="sgs-shimmer h-5 rounded-full w-24"></div>
            </div>
            <div className="space-y-2">
              <div className="sgs-shimmer h-3 rounded w-full"></div>
              <div className="sgs-shimmer h-3 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SessionsGridSkeleton;