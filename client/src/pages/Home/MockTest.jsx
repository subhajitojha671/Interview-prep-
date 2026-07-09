import React, { useEffect, useState } from "react";
import {
  LuGraduationCap,
  LuCheck,
  LuX,
  LuChevronLeft,
  LuChevronRight,
  LuClock,
  LuRotateCcw,
  LuHistory,
} from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Drawer from "../../components/Drawer";
import Input from "../../components/inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const LEVELS = ["easy", "medium", "hard"];

const formatTime = (totalSeconds) => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const MockTest = () => {
  // view: 'setup' | 'test' | 'results'
  const [view, setView] = useState("setup");

  // ---------- Setup form ----------
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("medium");
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");

  // ---------- History ----------
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);

  // ---------- Active exam ----------
  const [exam, setExam] = useState(null); // { examId, company, role, level, totalQuestions, durationMinutes, questions }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersMap, setAnswersMap] = useState({}); // { questionIndex: [labels] }
  const [markedForReview, setMarkedForReview] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // ---------- Results ----------
  const [results, setResults] = useState(null);

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);
      const response = await axiosInstance.get(API_PATHS.MOCK_TEST.HISTORY);
      setHistory(response.data?.attempts || []);
    } catch (err) {
      console.error("Fetch mock test history error:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Countdown timer while a test is active
  useEffect(() => {
    if (view !== "test" || !exam) return;

    if (secondsLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, view]);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!company.trim() || !role.trim() || !level) {
      setGenerateError("Company, role and level are all required.");
      return;
    }

    setGenerateError("");
    setGenerating(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.MOCK_TEST.GENERATE,
        {
          company: company.trim(),
          role: role.trim(),
          level,
        }
      );

      const data = response.data;
      setExam(data);
      setCurrentIndex(0);
      setAnswersMap({});
      setMarkedForReview({});
      setSecondsLeft(data.durationMinutes * 60);
      setView("test");
    } catch (err) {
      console.error("Generate mock test error:", err);
      setGenerateError(
        err.response?.data?.message ||
          "Couldn't generate a test right now. Please try again."
      );
    } finally {
      setGenerating(false);
    }
  };

  const toggleOption = (questionIndex, label) => {
    setAnswersMap((prev) => {
      const current = prev[questionIndex] || [];
      const next = current.includes(label)
        ? current.filter((l) => l !== label)
        : [...current, label];
      return { ...prev, [questionIndex]: next };
    });
  };

  const toggleMarkForReview = (questionIndex) => {
    setMarkedForReview((prev) => ({
      ...prev,
      [questionIndex]: !prev[questionIndex],
    }));
  };

  const handleSubmit = async () => {
    if (!exam || submitting) return;
    setSubmitting(true);

    const timeTakenSeconds = exam.durationMinutes * 60 - secondsLeft;
    const answers = Object.entries(answersMap).map(
      ([questionIndex, selected]) => ({
        questionIndex: Number(questionIndex),
        selected,
      })
    );

    try {
      const response = await axiosInstance.post(
        API_PATHS.MOCK_TEST.SUBMIT(exam.examId),
        { answers, timeTakenSeconds }
      );
      setResults(response.data);
      setView("results");
      fetchHistory();
    } catch (err) {
      console.error("Submit mock test error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const viewPastAttempt = async (id) => {
    try {
      const response = await axiosInstance.get(API_PATHS.MOCK_TEST.GET_ONE(id));
      setResults(response.data);
      setHistoryOpen(false);
      setView("results");
    } catch (err) {
      console.error("Fetch mock test attempt error:", err);
    }
  };

  const startOver = () => {
    setExam(null);
    setResults(null);
    setCompany("");
    setRole("");
    setLevel("medium");
    setView("setup");
  };

  const currentQuestion = exam?.questions?.[currentIndex];
  const selectedForCurrent = answersMap[currentIndex] || [];

  // ================= SETUP + HISTORY =================
  if (view === "setup") {
    return (
      <DashboardLayout>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
          .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
          .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        `}</style>

        <div className="max-w-2xl mx-auto px-[15px] py-10 font-body">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-lg bg-[#34D399]/10 flex items-center justify-center">
                <LuGraduationCap size={16} className="text-[#34D399]" />
              </span>
              <h2 className="font-display text-xl font-semibold text-[#0E1116]">
                Mock test
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setHistoryOpen(true)}
              className="flex items-center gap-2 text-sm font-semibold text-[#0E1116] border border-[#0E1116]/15 hover:border-[#34D399]/40 px-4 py-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399]"
            >
              <LuHistory size={15} />
              History
              {!historyLoading && history.length > 0 && (
                <span className="text-xs font-bold text-[#0d8a5f] bg-[#34D399]/15 px-2 py-0.5 rounded-full">
                  {history.length}
                </span>
              )}
            </button>
          </div>
          <p className="text-sm text-[#5B6472] mb-6">
            30 questions, 20 minutes, tailored to the company and role you
            pick. Answers are auto-graded with explanations at the end.
          </p>

          <form
            onSubmit={handleGenerate}
            className="bg-white border border-[#0E1116]/[0.06] rounded-2xl p-6 flex flex-col gap-4"
          >
            <Input
              label="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Google, TCS, Infosys"
              type="text"
            />
            <Input
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. SDE-1, Backend Developer"
              type="text"
            />

            <div className="flex flex-col gap-1">
              <label className="text-[13px] text-[#0E1116]/80">Level</label>
              <div className="flex gap-2">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLevel(l)}
                    className={`flex-1 capitalize text-sm font-semibold px-4 py-2.5 rounded-lg border transition-colors ${
                      level === l
                        ? "bg-[#0E1116] text-white border-[#0E1116]"
                        : "bg-white text-[#5B6472] border-[#0E1116]/15 hover:border-[#34D399]/40"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {generateError && (
              <p className="text-[#FF6B4A] text-sm">{generateError}</p>
            )}

            <button
              type="submit"
              disabled={generating}
              className="mt-2 flex items-center justify-center gap-2 bg-[#0E1116] hover:bg-[#1c2230] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399] focus-visible:ring-offset-2"
            >
              {generating ? "Generating your test..." : "Start test"}
            </button>
          </form>
        </div>

        {/* History sidebar */}
        <Drawer
          isOpen={historyOpen}
          onClose={() => setHistoryOpen(false)}
          title="Mock Test History"
        >
          {historyLoading ? (
            <p className="text-sm text-[#5B6472]">Loading...</p>
          ) : history.length === 0 ? (
            <p className="text-sm text-[#5B6472]">
              Your completed attempts will show up here.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {history.map((h) => {
                const passed = h.scorePercent >= 50;
                return (
                  <div
                    key={h._id}
                    className="flex items-center justify-between gap-4 bg-white border border-[#0E1116]/[0.06] rounded-xl px-5 py-4"
                  >
                    <div className="min-w-0">
                      <p className="font-display font-semibold text-[#0E1116] truncate">
                        {h.company} · {h.role}
                      </p>
                      <p className="text-sm text-[#5B6472] capitalize">
                        {h.level} · {h.totalQuestions} Qs ·{" "}
                        {formatTime(h.timeTakenSeconds)} taken ·{" "}
                        {new Date(h.completedAt).toLocaleDateString(
                          undefined,
                          { day: "numeric", month: "short", year: "numeric" }
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`text-sm font-bold ${
                          passed ? "text-[#0d8a5f]" : "text-[#FF6B4A]"
                        }`}
                      >
                        {h.correctCount}/{h.totalQuestions}
                      </span>
                      <button
                        onClick={() => viewPastAttempt(h._id)}
                        className="text-xs font-semibold text-[#0E1116] border border-[#0E1116]/15 hover:border-[#34D399]/40 px-4 py-2 rounded-full transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Drawer>
      </DashboardLayout>
    );
  }

  // ================= ACTIVE TEST =================
  if (view === "test" && exam) {
    return (
      <DashboardLayout>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
          .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
          .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        `}</style>

        <div className="max-w-2xl mx-auto px-[15px] py-8 font-body">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-[#5B6472]">
              Question {currentIndex + 1} of {exam.totalQuestions}
            </p>
            <div
              className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${
                secondsLeft <= 60
                  ? "text-[#FF6B4A] bg-[#FF6B4A]/10"
                  : "text-[#0E1116] bg-[#0E1116]/[0.05]"
              }`}
            >
              <LuClock size={14} />
              {formatTime(secondsLeft)}
            </div>
          </div>

          <div className="w-full h-1.5 bg-[#0E1116]/[0.06] rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-[#34D399] transition-all duration-300"
              style={{
                width: `${(currentIndex / exam.totalQuestions) * 100}%`,
              }}
            ></div>
          </div>

          <div className="bg-white border border-[#0E1116]/[0.06] rounded-2xl shadow-lg shadow-[#0E1116]/[0.04] p-6">
            <p className="text-xs font-bold text-[#34D399] uppercase tracking-wide mb-2">
              {currentQuestion?.topicTag}
            </p>
            <h3 className="font-display text-lg font-semibold text-[#0E1116] mb-1">
              {currentQuestion?.questionText}
            </h3>
            <p className="text-xs text-[#5B6472] mb-5">
              Select all that apply
            </p>

            <div className="flex flex-col gap-2.5">
              {currentQuestion?.options?.map((opt) => {
                const isSelected = selectedForCurrent.includes(opt.label);
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => toggleOption(currentIndex, opt.label)}
                    className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl border transition-colors ${
                      isSelected
                        ? "bg-[#34D399]/10 border-[#34D399]"
                        : "bg-white border-[#0E1116]/[0.08] hover:border-[#34D399]/30"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-[#34D399] border-[#34D399]"
                          : "border-[#0E1116]/20"
                      }`}
                    >
                      {isSelected && (
                        <LuCheck size={13} className="text-white" />
                      )}
                    </span>
                    <span className="text-sm text-[#0E1116]">
                      <span className="font-semibold">{opt.label}.</span>{" "}
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#5B6472] hover:text-[#0E1116] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <LuChevronLeft size={16} /> Previous
            </button>

            <button
              onClick={() => toggleMarkForReview(currentIndex)}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${
                markedForReview[currentIndex]
                  ? "text-[#FF6B4A] border-[#FF6B4A]/30 bg-[#FF6B4A]/10"
                  : "text-[#5B6472] border-[#0E1116]/15"
              }`}
            >
              {markedForReview[currentIndex] ? "Marked" : "Mark for review"}
            </button>

            {currentIndex + 1 < exam.totalQuestions ? (
              <button
                onClick={() => setCurrentIndex((i) => i + 1)}
                className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#0E1116] hover:bg-[#1c2230] px-5 py-2.5 rounded-full transition-colors"
              >
                Next <LuChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#34D399] hover:bg-[#28b981] disabled:opacity-60 px-5 py-2.5 rounded-full transition-colors"
              >
                {submitting ? "Submitting..." : "Submit test"}
              </button>
            )}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ================= RESULTS =================
  if (view === "results" && results) {
    const passed = results.scorePercent >= 50;
    return (
      <DashboardLayout>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
          .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
          .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        `}</style>

        <div className="max-w-3xl mx-auto px-[15px] py-8 font-body">
          {/* Score summary */}
          <div className="bg-white border border-[#0E1116]/[0.06] rounded-2xl shadow-lg shadow-[#0E1116]/[0.04] p-6 mb-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm text-[#5B6472] capitalize mb-1">
                {results.company} · {results.role} · {results.level}
              </p>
              <p className="font-display text-3xl font-bold text-[#0E1116]">
                {results.correctCount} / {results.totalQuestions}{" "}
                <span className="text-base font-medium text-[#5B6472]">
                  correct
                </span>
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="font-display text-xl font-bold text-[#0d8a5f]">
                  {results.correctCount}
                </p>
                <p className="text-xs text-[#5B6472]">Correct</p>
              </div>
              <div className="text-center">
                <p className="font-display text-xl font-bold text-[#FF6B4A]">
                  {results.wrongCount}
                </p>
                <p className="text-xs text-[#5B6472]">Wrong</p>
              </div>
              <div className="text-center">
                <p className="font-display text-xl font-bold text-[#0E1116]">
                  {formatTime(results.timeTakenSeconds)}
                </p>
                <p className="text-xs text-[#5B6472]">Time taken</p>
              </div>
            </div>
          </div>

          {/* Per-question breakdown */}
          <div className="flex flex-col gap-4">
            {results.questions.map((q) => (
              <div
                key={q.questionIndex}
                className="bg-white border border-[#0E1116]/[0.06] rounded-2xl p-6"
              >
                <div
                  className={`flex items-center gap-2 text-sm font-semibold mb-3 ${
                    q.isCorrect ? "text-[#0d8a5f]" : "text-[#FF6B4A]"
                  }`}
                >
                  {q.isCorrect ? <LuCheck size={16} /> : <LuX size={16} />}
                  Question {q.questionIndex + 1} —{" "}
                  {q.isCorrect ? "Correct" : "Wrong"}
                </div>

                <p className="text-xs font-bold text-[#5B6472] uppercase tracking-wide mb-1">
                  {q.topicTag}
                </p>
                <p className="font-display text-base font-semibold text-[#0E1116] mb-4">
                  {q.questionText}
                </p>

                <div className="flex flex-col gap-2 mb-4">
                  {q.options.map((opt) => {
                    const isCorrectOption = q.correctAnswers.includes(
                      opt.label
                    );
                    const wasSelected = q.selected.includes(opt.label);

                    let styles =
                      "bg-white border-[#0E1116]/[0.08] text-[#0E1116]";
                    let icon = null;
                    let note = "";

                    if (isCorrectOption) {
                      styles = "bg-[#34D399]/10 border-[#34D399]/30 text-[#0E1116]";
                      icon = <LuCheck size={14} className="text-[#0d8a5f]" />;
                      if (wasSelected === false) note = "you missed this";
                    } else if (wasSelected) {
                      styles = "bg-[#FF6B4A]/10 border-[#FF6B4A]/30 text-[#0E1116]";
                      icon = <LuX size={14} className="text-[#FF6B4A]" />;
                      note = "you selected this";
                    }

                    return (
                      <div
                        key={opt.label}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm ${styles}`}
                      >
                        {icon}
                        <span>
                          <span className="font-semibold">{opt.label}.</span>{" "}
                          {opt.text}
                          {note && (
                            <span className="italic text-[#5B6472]">
                              {" "}
                              — {note}
                            </span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-[#F7F5F0] rounded-lg p-4">
                  <p className="text-xs font-semibold text-[#5B6472] uppercase tracking-wide mb-1">
                    Explanation
                  </p>
                  <p className="text-sm text-[#1E2430] leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={startOver}
              className="flex items-center gap-2 bg-[#0E1116] hover:bg-[#1c2230] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
            >
              <LuRotateCcw size={14} /> Take another test
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return null;
};

export default MockTest;