import React, { useContext, useState } from "react";
import HERO_IMG from "../assets/hero-img.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import {
  LuSparkles,
  LuTarget,
  LuLayers,
  LuMessageCircle,
  LuBookOpen,
  LuTrendingUp,
  LuArrowRight,
} from "react-icons/lu";
import Login from "./Auth/Login";
import Modal from "../components/Modal";
import SignUP from "./Auth/SignUP";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/cards/ProfileInfoCard";

// Cycled onto feature cards by index — purely visual, no dependency on data shape.
const FEATURE_ICONS = [LuTarget, LuLayers, LuMessageCircle, LuBookOpen, LuTrendingUp];

// Placeholder outcome metrics — swap in real numbers when you have them.
const OUTCOME_STATS = [
  { value: "10,000+", label: "Mock interviews run" },
  { value: "500+", label: "Companies covered" },
  { value: "92%", label: "Feel placement-ready" },
  { value: "4.8/5", label: "Learner rating" },
];

function LandingPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* Fonts: add these two lines to index.html <head> for best results.
          Space Grotesk = display face, Inter = body face. Falls back gracefully without them. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        @keyframes float-chip {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .chip-float { animation: float-chip 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .chip-float { animation: none; }
        }
      `}</style>

      <div className="font-body">
        {/* ================= HERO ================= */}
        <div className="w-full bg-[#0E1116] relative overflow-hidden">
          {/* subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          ></div>
          {/* glow */}
          <div className="w-[560px] h-[560px] bg-[#34D399]/10 blur-[110px] absolute -top-32 -left-32 rounded-full pointer-events-none"></div>
          <div className="w-[420px] h-[420px] bg-[#FF6B4A]/10 blur-[110px] absolute top-40 right-0 rounded-full pointer-events-none"></div>

          <div className="container mx-auto px-4 py-8 relative z-10">
            {/* Header */}
            <header className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#34D399] flex items-center justify-center">
                  <LuSparkles size={16} className="text-[#0E1116]" />
                </span>
                <h2 className="font-display text-xl font-bold text-white">
                  Interview Prep AI
                </h2>
              </div>

              {user ? (
                <ProfileInfoCard />
              ) : (
                <button
                  className="bg-[#34D399] text-sm font-semibold text-[#0E1116] px-6 py-2.5 rounded-full hover:bg-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1116]"
                  onClick={() => setOpenAuthModal(true)}
                >
                  Login / Sign Up
                </button>
              )}
            </header>

            {/* Hero Content */}
            <div className="flex flex-col lg:flex-row items-center gap-12 pb-24">
              {/* Left Side — copy */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-2 text-[13px] text-[#34D399] font-semibold bg-[#34D399]/10 px-3 py-1 rounded-full border border-[#34D399]/30 w-fit mb-6">
                  <LuSparkles size={16} />
                  <span>Your AI interview coach</span>
                </div>

                <h1 className="font-display text-5xl text-white font-semibold mb-6 leading-[1.1]">
                  Walk into every
                  <br />
                  interview{" "}
                  <span className="text-[#34D399]">placement-ready</span>
                </h1>

                <p className="text-[17px] text-[#93A0B4] mb-8 max-w-md">
                  Get role-specific questions, expand any answer the moment
                  you need more depth, and keep every concept organized in
                  one place. Your whole interview toolkit, in one app.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    className="inline-flex items-center gap-2 bg-[#FF6B4A] text-sm font-semibold text-white px-7 py-3 rounded-full hover:bg-[#ff8064] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1116]"
                    onClick={handleCTA}
                  >
                    Start Practicing Free
                    <LuArrowRight size={16} />
                  </button>

                  <a
                    href="#features"
                    className="text-sm font-semibold text-white/80 hover:text-white px-4 py-3 transition-colors"
                  >
                    See how it works
                  </a>
                </div>
              </div>

              {/* Right Side — framed product shot */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-3 shadow-2xl">
                  {/* window chrome */}
                  <div className="flex items-center gap-1.5 px-2 pb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B4A]/70"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFD166]/70"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]/70"></span>
                  </div>
                  <img
                    src={HERO_IMG}
                    alt="Interview Prep AI product preview"
                    className="w-full rounded-lg"
                  />
                </div>

                {/* floating chip: outcome */}
                <div className="chip-float hidden md:flex absolute -left-6 bottom-10 bg-[#0E1116] border border-white/10 rounded-xl px-4 py-3 shadow-xl items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#34D399]/15 flex items-center justify-center">
                    <LuTrendingUp size={16} className="text-[#34D399]" />
                  </span>
                  <div>
                    <p className="text-white text-sm font-semibold leading-none mb-1">
                      92% more confident
                    </p>
                    <p className="text-[#93A0B4] text-xs leading-none">
                      after 3 mock rounds
                    </p>
                  </div>
                </div>

                {/* floating chip: ai follow-up */}
                <div
                  className="chip-float hidden md:flex absolute -right-4 -top-6 bg-[#0E1116] border border-white/10 rounded-xl px-4 py-2.5 shadow-xl items-center gap-2"
                  style={{ animationDelay: "1.5s" }}
                >
                  <LuMessageCircle size={14} className="text-[#FF6B4A]" />
                  <p className="text-white text-xs font-medium">
                    "Can you go deeper on that?"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= OUTCOME STRIP ================= */}
        <div className="w-full bg-[#0E1116] border-t border-white/10">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {OUTCOME_STATS.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="font-display text-3xl font-semibold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[#93A0B4] text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= FEATURES ================= */}
        <div id="features" className="w-full bg-[#F7F5F0]">
          <div className="container mx-auto px-4 pt-20 pb-24">
            <div className="max-w-xl mb-14">
              <p className="text-[13px] font-semibold text-[#FF6B4A] uppercase tracking-wide mb-3">
                Built for the placement season
              </p>
              <h2 className="font-display text-3xl font-semibold text-[#0E1116]">
                Everything you need to walk in prepared
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {APP_FEATURES.map((feature, index) => {
                const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
                return (
                  <div
                    key={feature.id}
                    className="bg-white p-6 rounded-2xl border border-[#0E1116]/[0.06] hover:border-[#34D399]/40 hover:shadow-lg hover:shadow-[#34D399]/[0.06] transition-all cursor-pointer"
                  >
                    <span className="w-10 h-10 rounded-lg bg-[#34D399]/10 flex items-center justify-center mb-4">
                      <Icon size={18} className="text-[#34D399]" />
                    </span>

                    <h3 className="font-display text-base font-semibold mb-2 text-[#0E1116]">
                      {feature.title}
                    </h3>

                    <p className="text-[#5B6472] text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="text-sm bg-[#0E1116] text-[#93A0B4] text-center p-6">
          Made with ❤️ Happy Coding
        </div>

        {/* Auth Modal */}
        <Modal
          isOpen={openAuthModal}
          onClose={() => {
            setOpenAuthModal(false);
            setCurrentPage("login");
          }}
          hideHeader
        >
          <div>
            {currentPage === "login" && (
              <Login setCurrentPage={setCurrentPage} />
            )}

            {currentPage === "signup" && (
              <SignUP setCurrentPage={setCurrentPage} />
            )}
          </div>
        </Modal>
      </div>
    </>
  );
}

export default LandingPage;