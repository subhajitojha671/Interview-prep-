import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import Input from "../../components/inputs/Input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

function CreateSessionFrom() {
  // =========================
  // Form State
  // =========================
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicToFocus: "",
    description: "",
    numberOfQuestions: 20,
  });

  // =========================
  // UI State
  // =========================
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // =========================
  // Handle Input Changes
  // =========================
  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // =========================
  // Create Interview Session
  // =========================
  const handleCreateSession = async (e) => {
    e.preventDefault();

    setError("");

    const {
      role,
      experience,
      topicToFocus,
      description,
      numberOfQuestions,
    } = formData;

    // =========================
    // Validation
    // =========================
    if (
      !role.trim() ||
      !topicToFocus.trim() ||
      experience === "" ||
      Number(experience) < 0 ||
      !numberOfQuestions ||
      Number(numberOfQuestions) <= 0
    ) {
      setError(
        "Role, Experience, Topic, and Number of Questions are required."
      );
      return;
    }

    // Limit Question Count
    if (Number(numberOfQuestions) > 100) {
      setError("Maximum 100 questions allowed.");
      return;
    }

    setIsLoading(true);

    try {
      // =========================
      // Step 1: Generate Questions
      // =========================
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: role.trim(),
          experience,
          topicsToFocus: topicToFocus.trim(), // Backend AI expects this field
          numberOfQuestions: Number(numberOfQuestions),
        }
      );

      const generatedQuestions = aiResponse.data?.questions;

      // Safety Check
      if (
        !generatedQuestions ||
        !Array.isArray(generatedQuestions)
      ) {
        throw new Error("Failed to generate questions");
      }

      // =========================
      // Step 2: Create Session
      // =========================
      const sessionResponse = await axiosInstance.post(
        API_PATHS.SESSION.CREATE,
        {
          role: role.trim(),
          experience,
          topicToFocus: topicToFocus.trim(),
          description: description.trim(),
          questions: generatedQuestions,
        }
      );

      // =========================
      // Step 3: Redirect User
      // =========================
      if (sessionResponse.data?.session?._id) {
        navigate(
          `/interview-prep/${sessionResponse.data.session._id}`
        );
      }

      // =========================
      // Optional: Reset Form
      // =========================
      setFormData({
        role: "",
        experience: "",
        topicToFocus: "",
        description: "",
        numberOfQuestions: 20,
      });

    } catch (error) {
      console.error("Create Session Error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* =========================
          Heading
      ========================= */}
      <span className="w-9 h-9 rounded-lg bg-[#34D399]/10 flex items-center justify-center mb-4">
        <LuSparkles size={16} className="text-[#34D399]" />
      </span>

      <h3 className="font-display text-2xl font-semibold text-[#0E1116]">
        Start a new interview journey
      </h3>

      <p className="text-sm text-[#5B6472] mt-1 mb-5">
        Fill out a few quick details and unlock your personalized
        set of interview questions.
      </p>

      {/* =========================
          Form
      ========================= */}
      <form
        onSubmit={handleCreateSession}
        className="flex flex-col gap-4"
      >
        {/* Role */}
        <Input
          value={formData.role}
          onChange={(e) =>
            handleChange("role", e.target.value)
          }
          label="Target Role"
          placeholder="Frontend Developer, Backend Developer, UI/UX Designer"
          type="text"
        />

        {/* Experience */}
        <Input
          value={formData.experience}
          onChange={(e) =>
            handleChange("experience", e.target.value)
          }
          label="Years of Experience"
          placeholder="0, 1, 2, 5..."
          type="number"
        />

        {/* Topic */}
        <Input
          value={formData.topicToFocus}
          onChange={(e) =>
            handleChange("topicToFocus", e.target.value)
          }
          label="Topic To Focus On"
          placeholder="React, Node.js, MongoDB"
          type="text"
        />

        {/* Description */}
        <Input
          value={formData.description}
          onChange={(e) =>
            handleChange("description", e.target.value)
          }
          label="Additional Details (Optional)"
          placeholder="Any specific goals or notes"
          type="text"
        />

        {/* Number Of Questions */}
        <Input
          value={formData.numberOfQuestions}
          onChange={(e) =>
            handleChange(
              "numberOfQuestions",
              e.target.value
            )
          }
          label="Number Of Questions"
          placeholder="20"
          type="number"
        />

        {/* Error Message */}
        {error && (
          <p className="text-[#FF6B4A] text-sm -mt-1">
            {error}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#0E1116] text-sm font-semibold text-white px-6 py-3 rounded-full hover:bg-[#1c2230] disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer mt-2 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399] focus-visible:ring-offset-2"
        >
          {isLoading && <SpinnerLoader />}

          {isLoading
            ? "Creating session..."
            : "Create session"}
        </button>
      </form>
    </div>
  );
}

export default CreateSessionFrom;