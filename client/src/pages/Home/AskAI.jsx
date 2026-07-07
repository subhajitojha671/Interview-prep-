import React, { useEffect, useState } from "react";
import { LuSparkles, LuSend, LuTrash2, LuClock } from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import AIResponsePreview from "../InterviewPrep/components/AIResponsePreview";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";

const AskAI = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);
      const response = await axiosInstance.get(API_PATHS.ASK_AI.HISTORY);
      setHistory(response.data?.history || []);
    } catch (err) {
      console.error("Fetch Ask AI history error:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleAsk = async (e) => {
    e.preventDefault();

    if (!question.trim()) return;

    setError("");
    setAnswer(null);
    setLoading(true);

    try {
      // This endpoint generates the answer AND saves it to the DB.
      const response = await axiosInstance.post(API_PATHS.ASK_AI.ASK, {
        question: question.trim(),
      });

      setAnswer(response.data);
      setQuestion("");
      fetchHistory(); // refresh sidebar so the new entry shows up
    } catch (err) {
      console.error("Ask AI error:", err);
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const openHistoryEntry = (entry) => {
    setAnswer({ title: entry.title, explanation: entry.explanation });
    setError("");
  };

  const handleDeleteHistory = async (e, id) => {
    e.stopPropagation();
    try {
      await axiosInstance.delete(API_PATHS.ASK_AI.DELETE(id));
      setHistory((prev) => prev.filter((h) => h._id !== id));
    } catch (err) {
      console.error("Delete Ask AI history error:", err);
    }
  };

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <div className="flex h-[calc(100vh-64px)] font-body">
        {/* Recent questions rail */}
        <div className="hidden md:block w-[230px] shrink-0 border-r border-[#0E1116]/[0.06] p-5 overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-[#34D399]/10 flex items-center justify-center shrink-0">
              <LuClock size={14} className="text-[#34D399]" />
            </span>
            <p className="font-display text-sm font-semibold text-[#0E1116]">
              Recent Questions
            </p>
          </div>

          {historyLoading ? (
            <SkeletonLoader />
          ) : history.length === 0 ? (
            <p className="text-xs text-[#5B6472]">
              Questions you ask will show up here.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {history.map((entry) => (
                <div key={entry._id} className="group flex items-start gap-1">
                  <button
                    onClick={() => openHistoryEntry(entry)}
                    className="flex-1 text-left text-sm text-[#0E1116]/80 hover:text-[#34D399] transition-colors line-clamp-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399] rounded"
                  >
                    {entry.question}
                  </button>
                  <button
                    onClick={(e) => handleDeleteHistory(e, entry._id)}
                    className="opacity-0 group-hover:opacity-100 shrink-0 text-[#0E1116]/25 hover:text-[#FF6B4A] transition-all"
                  >
                    <LuTrash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main panel */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto">
            {!answer && !loading ? (
              <div className="h-full flex flex-col items-center justify-center gap-2 px-8 text-center">
                <span className="w-11 h-11 rounded-lg bg-[#34D399]/10 flex items-center justify-center mb-2">
                  <LuSparkles size={20} className="text-[#34D399]" />
                </span>
                <p className="font-display text-xl font-semibold text-[#0E1116]">
                  How can I help you today?
                </p>
                <p className="text-sm text-[#5B6472] max-w-sm">
                  Type any interview or concept question below to generate
                  a response.
                </p>
                {error && (
                  <p className="text-[#FF6B4A] text-sm mt-2">{error}</p>
                )}
              </div>
            ) : (
              <div className="p-6 max-w-3xl mx-auto">
                {error && (
                  <p className="text-[#FF6B4A] text-sm mb-4">{error}</p>
                )}

                {loading && <SkeletonLoader />}

                {!loading && answer && (
                  <div className="bg-white border border-[#0E1116]/[0.06] rounded-2xl shadow-lg shadow-[#0E1116]/[0.04] p-6">
                    <AIResponsePreview content={answer?.explanation} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input bar */}
          <form
            onSubmit={handleAsk}
            className="border-t border-[#0E1116]/[0.06] px-6 py-4 flex gap-2"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask an interview or concept question…"
              className="flex-1 border border-[#0E1116]/15 rounded-full px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#34D399] focus:ring-2 focus:ring-[#34D399]/20 text-[#0E1116] placeholder:text-[#0E1116]/35"
            />
            <button
              type="submit"
              disabled={loading}
              className="whitespace-nowrap flex items-center gap-2 bg-[#0E1116] hover:bg-[#1c2230] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399] focus-visible:ring-offset-2"
            >
              {loading ? "Thinking..." : (<>Ask <LuSend size={14} /></>)}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AskAI;