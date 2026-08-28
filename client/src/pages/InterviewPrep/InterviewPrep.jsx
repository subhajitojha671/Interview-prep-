import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleinfoHeader";
import QuestionCard from "../../components/cards/QuestionCard";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import SessionPageSkeleton from "../../components/Loader/Sessionsgridskeleton";
import AIResponsePreview from "./components/AIResponsePreview";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";



import { LuCircleAlert, LuListCollapse, LuSparkles, LuX } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  // ===========================
  // State
  // ===========================
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMore, setOpenLearnMore] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [pageLoading, setPageLoading] = useState(false);
  const [explanationLoading, setExplanationLoading] =
    useState(false);

  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // ===========================
  // Fetch Session Details
  // ===========================
  const fetchSessionDetailsById = async () => {
    try {
      setPageLoading(true);

      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      if (response.data?.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to fetch session details.");
    } finally {
      setPageLoading(false);
    }
  };

  // ===========================
  // Generate AI Explanation
  // ===========================
 const generateConceptExplanation = async (concept) => {
  if (explanationLoading) return;

  try {
    setErrorMsg("");
    setExplanation(null);

    setOpenLearnMore(true);
    setExplanationLoading(true);

    const startTime = performance.now();

    const response = await axiosInstance.post(
      API_PATHS.AI.GENERATE_EXPLANATION,
      {
        question: concept,
      }
    );

    const endTime = performance.now();

    console.log(
      `AI Explanation: ${(endTime - startTime).toFixed(2)} ms`
    );

    if (response.data) {
      setExplanation(response.data);
    }
  } catch (error) {
    console.error(error);
    setExplanation(null);
    setErrorMsg(
      "Failed to generate explanation. Please try again."
    );
  } finally {
    setExplanationLoading(false);
  }
};

  // ===========================
  // Pin / Unpin Question
  // ===========================
  const toggleQuestionPinStatus = async (questionId) => {
    const previousData = sessionData;

    setSessionData((prev) => {
      const updatedQuestions = prev.questions.map((q) =>
        q._id === questionId
          ? { ...q, isPinned: !q.isPinned }
          : q
      );

      updatedQuestions.sort((a, b) =>
        a.isPinned === b.isPinned
          ? 0
          : a.isPinned
          ? -1
          : 1
      );

      return {
        ...prev,
        questions: updatedQuestions,
      };
    });

    try {
      await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
    } catch (error) {
      console.error(error);

      setSessionData(previousData);

      alert(
        "Failed to update pin status. Please try again."
      );
    }
  };


  //Add more question to a session 
  const uploadMoreQuestions = async () =>{
    try{
      setIsUpdateLoader(true);
      setErrorMsg("");

      //call Ai API to generate questions
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicToFocus, // backend expects "topicsToFocus" (with an s)
          numberOfQuestions: 5, 
        }
      );
      // Response shape is { questions: [{question, answer}, ...] }
      const generatedQuestions = aiResponse.data?.questions;

      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        }
      );
      if(response.data){
        toast.success("Added More Q&A !!");
        fetchSessionDetailsById();

      }
    }catch(error){
      console.error(error);
      if(error.response && error.response.data.message){
        setErrorMsg(error.response.data.message);
      }else{
        setErrorMsg("Something went wrong. Please try again later.");
      }
    }finally{
        setIsUpdateLoader(false);
    }

  };




  // ===========================
  // Effects
  // ===========================
  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, [sessionId]);

  // ===========================
  // Initial Loading
  // ===========================
  if (pageLoading) {
    return (
      <DashboardLayout>
        <SessionPageSkeleton />
      </DashboardLayout>
    );
  }

  // ===========================
  // UI
  // ===========================
  return (
    
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .explanation-scroll::-webkit-scrollbar { width: 6px; }
        .explanation-scroll::-webkit-scrollbar-track { background: transparent; }
        .explanation-scroll::-webkit-scrollbar-thumb { background: rgba(14,17,22,0.15); border-radius: 999px; }
        .explanation-scroll::-webkit-scrollbar-thumb:hover { background: rgba(52,211,153,0.4); }
        .explanation-scroll { scrollbar-width: thin; scrollbar-color: rgba(14,17,22,0.15) transparent; }
      `}</style>

      <div className="grid grid-cols-12 gap-4">
        {/* Left column — role header + Q&A list */}
        <div
          className={`col-span-12 transition-all duration-300 ${
            openLearnMore ? "md:col-span-7 lg:col-span-7" : "md:col-span-12"
          }`}
        >
          <RoleInfoHeader
            role={sessionData?.role || ""}
            topicToFocus={sessionData?.topicToFocus || ""}
            experience={sessionData?.experience || "-"}
            questions={
              sessionData?.questions?.length || "-"
            }
            description={sessionData?.description || ""}
            lastUpdated={
              sessionData?.updatedAt
                ? moment(sessionData.updatedAt).format(
                    "DD MMM YYYY"
                  )
                : ""
            }
          />

          <div className="px-[15px] pt-4 pb-4 font-body">
            <h2 className="font-display text-lg font-semibold text-[#0E1116]">
              Interview Q &amp; A
            </h2>

            {errorMsg && (
              <p className="text-[#FF6B4A] mt-3">
                {errorMsg}
              </p>
            )}

            <AnimatePresence mode="popLayout">
              {sessionData?.questions?.map((item, index) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  className="mt-5 first:mt-5"
                >
                  <QuestionCard
                    question={item.question}
                    answer={item.answer}
                    isPinned={item.isPinned}
                    onLearnMore={() =>
                      generateConceptExplanation(item.question)
                    }
                    onTogglePin={() =>
                      toggleQuestionPinStatus(item._id)
                    }
                  />

{sessionData?.questions?.length === index + 1 && (
  <div className="flex items-center justify-center mt-5">
    <button
      className="flex items-center gap-3 text-sm text-white font-semibold bg-[#0E1116] hover:bg-[#1c2230] px-5 py-2.5 rounded-full cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399] focus-visible:ring-offset-2"
      disabled={isUpdateLoader}
      onClick={uploadMoreQuestions}
    >
      {isUpdateLoader? <SpinnerLoader /> : <LuListCollapse />}
      Load more
    </button>
  </div>
)}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right column — AI explanation panel, sibling to the left column so both start at the same height */}
        <AnimatePresence>
          {openLearnMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="hidden md:block md:col-span-5 lg:col-span-5"
            >
              <div className="sticky top-20 bg-white border border-[#0E1116]/[0.06] rounded-2xl shadow-xl shadow-[#0E1116]/[0.04] overflow-hidden h-[calc(100vh-104px)] flex flex-col">
                {/* Panel header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#0E1116]/[0.06] shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#34D399]/10 flex items-center justify-center">
                      <LuSparkles size={14} className="text-[#34D399]" />
                    </span>
                    <h3 className="font-display text-sm font-semibold text-[#0E1116]">
                      AI Explanation
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenLearnMore(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[#0E1116]/40 hover:text-[#0E1116] hover:bg-[#0E1116]/[0.05] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399]"
                  >
                    <LuX size={16} />
                  </button>
                </div>

                {/* Panel body — independently scrollable */}
                <div className="flex-1 overflow-y-auto scroll-smooth px-5 py-5 explanation-scroll">
                  {errorMsg && (
                    <p className="flex items-center gap-2 text-[#FF6B4A] mb-4">
                      <LuCircleAlert />
                      {errorMsg}
                    </p>
                  )}

                  {explanationLoading && <SkeletonLoader />}

                  {!explanationLoading && explanation && (
                    <AIResponsePreview
                      content={explanation?.explanation}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Drawer — mobile only, since desktop uses the side-by-side panel above */}
      <div className="md:hidden px-[15px]">
        <Drawer
          isOpen={openLearnMore}
          onClose={() =>
            setOpenLearnMore(false)
          }
        >
          {errorMsg && (
            <p className="flex items-center gap-2 text-[#FF6B4A]">
              <LuCircleAlert />
              {errorMsg}
            </p>
          )}

          {explanationLoading && (
            <SkeletonLoader />
          )}

          {!explanationLoading &&
            explanation && (
              <AIResponsePreview
                content={
                  explanation?.explanation
                }
              />
            )}
        </Drawer>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;