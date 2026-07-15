import React from "react";

function SkeletonLoader() {
  return (
    <div>
      <style>{`
        @keyframes shimmer-sweep {
          100% { transform: translateX(100%); }
        }
        .shimmer {
          position: relative;
          overflow: hidden;
          background-color: rgba(14, 17, 22, 0.08);
        }
        .shimmer::after {
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
        .shimmer-mint {
          position: relative;
          overflow: hidden;
          background-color: rgba(52, 211, 153, 0.12);
        }
        .shimmer-mint::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.7) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer-sweep 1.6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .shimmer::after,
          .shimmer-mint::after {
            animation: none;
          }
        }
      `}</style>

      <div role="status" className="space-y-4 max-w-3xl">
        <div className="shimmer h-6 rounded-md w-1/2"></div>

        <div className="space-y-2">
          <div className="shimmer h-3 rounded w-full"></div>
          <div className="shimmer h-3 rounded w-11/12"></div>
          <div className="shimmer h-3 rounded w-10/12"></div>
          <div className="shimmer h-3 rounded w-9/12"></div>
        </div>

        <div className="shimmer-mint rounded p-4 space-y-2">
          <div className="shimmer-mint h-2.5 rounded w-3/4"></div>
          <div className="shimmer-mint h-2.5 rounded w-2/3"></div>
          <div className="shimmer-mint h-2.5 rounded w-1/2"></div>
        </div>

        <span className="sr-only">Loading...</span>
      </div>

      <div role="status" className="space-y-4 max-w-3xl mt-10">
        <div className="shimmer h-4 rounded-md w-1/2"></div>

        <div className="space-y-2">
          <div className="shimmer h-3 rounded w-full"></div>
          <div className="shimmer h-3 rounded w-11/12"></div>
          <div className="shimmer h-3 rounded w-10/12"></div>
          <div className="shimmer h-3 rounded w-9/12"></div>
        </div>

        <span className="sr-only">Loading...</span>
      </div>

      <div className="space-y-2 mt-6">
        <div className="shimmer h-3 rounded w-full"></div>
        <div className="shimmer h-3 rounded w-11/12"></div>
        <div className="shimmer h-3 rounded w-10/12"></div>
        <div className="shimmer h-3 rounded w-9/12"></div>
      </div>

      <div className="shimmer-mint rounded p-4 space-y-2 mt-4">
        <div className="shimmer-mint h-2.5 rounded w-3/4"></div>
        <div className="shimmer-mint h-2.5 rounded w-2/3"></div>
      </div>

      <div className="shimmer h-4 rounded-md w-1/2 mt-8"></div>

      <div className="space-y-2 mt-4">
        <div className="shimmer h-3 rounded w-full"></div>
        <div className="shimmer h-3 rounded w-11/12"></div>
        <div className="shimmer h-3 rounded w-10/12"></div>
        <div className="shimmer h-3 rounded w-9/12"></div>
      </div>
    </div>
  );
}

export default SkeletonLoader;