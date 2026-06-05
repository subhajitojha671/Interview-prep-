import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import SpinnerLoader from "../Home/SpinnerLoader";

const CreateSessionFrom = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicToFocus } = formData;

    if (!role || !experience || !topicToFocus) {
      setError("Please fill all the required fields.");
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      // API Call Here

      console.log(formData);

      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        Start a New Interview Journey
      </h3>

      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Fill out a few quick details and unlock your personalized set of
        interview questions!
      </p>

      <form
        onSubmit={handleCreateSession}
        className="flex flex-col gap-3"
      >
        <Input
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
          label="Target Role"
          placeholder="Frontend Developer, UI/UX Designer, etc."
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={(e) => handleChange("experience", e.target.value)}
          label="Years of Experience"
          placeholder="0-1, 2-3, 5+ years"
          type="number"
        />

        <Input
          value={formData.topicToFocus}
          onChange={(e) => handleChange("topicToFocus", e.target.value)}
          label="Topic to Focus On"
          placeholder="React, Node.js, MongoDB"
          type="text"
        />

        <Input
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          label="Additional Details (Optional)"
          placeholder="Any specific goals or notes"
          type="text"
        />

        {error && (
          <p className="text-red-500 text-xs pb-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />}
          {isLoading ? "Creating..." : "Create Session"}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionFrom;