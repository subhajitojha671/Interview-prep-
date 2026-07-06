import React from "react";

const RoleInfoHeader = ({
  role,
  topicToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-white relative px-[15px] font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="h-[200px] flex flex-col justify-center relative z-10 ">
          <div className="flex items-start">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-[#0E1116]">
                    {role}
                  </h2>

                  <p className="text-sm font-medium text-[#34D399] mt-1">
                    {topicToFocus}
                  </p>

                  {description && (
                    <p className="text-sm text-[#5B6472] mt-2 max-w-3xl">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <div className="text-[10px] font-semibold text-white bg-[#0E1116] px-3 py-1 rounded-full">
              Experience: {experience}{" "}
              {experience === 1 ? "Year" : "Years"}
            </div>

            <div className="text-[10px] font-semibold text-[#0E1116] bg-[#34D399] px-3 py-1 rounded-full">
              {questions} Q&A
            </div>

            <div className="text-[10px] font-semibold text-white bg-[#0E1116] px-3 py-1 rounded-full">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>

        {/* Background Glow Effect */}
        <div className="hidden md:flex w-[30vw] h-[200px] items-center justify-center bg-white overflow-hidden absolute top-0 right-0 pointer-events-none">
          <div className="w-16 h-16 bg-[#34D399] blur-[65px] animate-blob1"></div>
          <div className="w-16 h-16 bg-[#FF6B4A] blur-[65px] animate-blob2"></div>
          <div className="w-16 h-16 bg-[#0E1116]/40 blur-[45px] animate-blob3"></div>
          <div className="w-16 h-16 bg-[#34D399]/60 blur-[45px] animate-blob4"></div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;