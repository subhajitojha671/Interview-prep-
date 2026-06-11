import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import QuestionCard from "../../components/cards/QuestionCard";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMore, setOpenLearnMore] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by ID
  const fetchSessionDetailsById = async () => {
    try {
      setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  // Generate Concept Explanation
  const generateConceptExplanation = async (concept) => {
    try {
      console.log("Generate explanation for:", concept);

      // API call goes here

      setOpenLearnMore(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Pin / Unpin Question
const toggleQuestionPinStatus = async (questionId) => {
  // Save current state for rollback
  const previousData = sessionData;

  // Optimistic update (instant UI update)
  setSessionData((prev) => {
    const updatedQuestions = prev.questions.map((q) =>
      q._id === questionId
        ? { ...q, isPinned: !q.isPinned }
        : q
    );

    updatedQuestions.sort((a, b) => {
      if (a.isPinned === b.isPinned) return 0;
      return a.isPinned ? -1 : 1;
    });

    return {
      ...prev,
      questions: updatedQuestions,
    };
  });

  try {
    await axiosInstance.post(
      API_PATHS.QUESTION.PIN(questionId)
    );

    // Success: do nothing
    // UI already updated
  } catch (error) {
    console.error("Pin update failed:", error);

    // Rollback to previous state
    setSessionData(previousData);

    // Optional: show error toast
    // toast.error("Failed to update pin status");
     // Alert user
    alert("Failed to update pin status. Please try again.");
  }
};

  // Add more questions to session
  const uploadMoreQuestions = async (event) => {
    try {
      console.log(event);

      // API call goes here
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, [sessionId]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <h2 className="text-lg font-medium">Loading...</h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicToFocus={sessionData?.topicToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("DD MMM YYYY")
            : ""
        }
      />

      <div className="container mx-auto pt-4 pb-4 px-[15px]">
        <h2 className="text-lg font-semibold text-black">
          Interview Q & A
        </h2>

        {errorMsg && (
          <p className="text-red-500 mt-2 mb-4">
            {errorMsg}
          </p>
        )}

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${
              openLearnMore ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence mode="popLayout">
              {sessionData?.questions?.map((item, index) => (
                <motion.div
                    key={item._id || index}
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{
    duration: 0.4,
    type: "spring",
    stiffness: 100,
    damping: 15,
    delay: index * 0.1,
  }}
  layout
  layoutId={`question-${item._id || index}`}
>

                  <QuestionCard
                    question={item?.question}
                    answer={item?.answer}
                    isPinned={item?.isPinned}
                    onLearnMore={() =>
                      generateConceptExplanation(item?.question)
                    }
                    onTogglePin={() =>
                      toggleQuestionPinStatus(
                        item?._id,
                        item?.isPinned
                      )
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Learn More Drawer Section */}
          {openLearnMore && (
            <div className="col-span-12 md:col-span-5">
              <div className="bg-white rounded-lg border p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">
                  Concept Explanation
                </h3>

                <p>
                  {explanation ||
                    "Select a question and click Learn More to view detailed explanations."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;