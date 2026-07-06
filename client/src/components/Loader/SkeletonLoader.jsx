import React from "react";

function SkeletonLoader() {
  return (
    <div>
      <div role="status" className="animate-pulse space-y-4 max-w-3xl">
        <div className="h-6 bg-[#0E1116]/[0.08] rounded-md w-1/2"></div>

        <div className="space-y-2">
          <div className="h-3 bg-[#0E1116]/[0.08] rounded w-full"></div>
          <div className="h-3 bg-[#0E1116]/[0.08] rounded w-11/12"></div>
          <div className="h-3 bg-[#0E1116]/[0.08] rounded w-10/12"></div>
          <div className="h-3 bg-[#0E1116]/[0.08] rounded w-9/12"></div>
        </div>

        <div className="bg-[#34D399]/[0.08] rounded p-4 space-y-2">
          <div className="h-2.5 bg-[#34D399]/20 rounded w-3/4"></div>
          <div className="h-2.5 bg-[#34D399]/20 rounded w-2/3"></div>
          <div className="h-2.5 bg-[#34D399]/20 rounded w-1/2"></div>
        </div>

        <span className="sr-only">Loading...</span>
      </div>

      <div role="status" className="animate-pulse space-y-4 max-w-3xl mt-10">
        <div className="h-4 bg-[#0E1116]/[0.08] rounded-md w-1/2"></div>

        <div className="space-y-2">
          <div className="h-3 bg-[#0E1116]/[0.08] rounded w-full"></div>
          <div className="h-3 bg-[#0E1116]/[0.08] rounded w-11/12"></div>
          <div className="h-3 bg-[#0E1116]/[0.08] rounded w-10/12"></div>
          <div className="h-3 bg-[#0E1116]/[0.08] rounded w-9/12"></div>
        </div>

        <span className="sr-only">Loading...</span>
      </div>

      <div className="space-y-2 mt-6">
        <div className="h-3 bg-[#0E1116]/[0.08] rounded w-full"></div>
        <div className="h-3 bg-[#0E1116]/[0.08] rounded w-11/12"></div>
        <div className="h-3 bg-[#0E1116]/[0.08] rounded w-10/12"></div>
        <div className="h-3 bg-[#0E1116]/[0.08] rounded w-9/12"></div>
      </div>

      <div className="bg-[#34D399]/[0.08] rounded p-4 space-y-2 mt-4">
        <div className="h-2.5 bg-[#34D399]/20 rounded w-3/4"></div>
        <div className="h-2.5 bg-[#34D399]/20 rounded w-2/3"></div>
      </div>

      <div className="h-4 bg-[#0E1116]/[0.08] rounded-md w-1/2 mt-8"></div>

      <div className="space-y-2 mt-4">
        <div className="h-3 bg-[#0E1116]/[0.08] rounded w-full"></div>
        <div className="h-3 bg-[#0E1116]/[0.08] rounded w-11/12"></div>
        <div className="h-3 bg-[#0E1116]/[0.08] rounded w-10/12"></div>
        <div className="h-3 bg-[#0E1116]/[0.08] rounded w-9/12"></div>
      </div>
    </div>
  );
}

export default SkeletonLoader;