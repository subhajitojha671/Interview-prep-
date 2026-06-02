export const BASE_URL = 'http://localhost:8000';

export const API_PATHS ={
  AUTH: {
    REGISTER:  "/api/auth/register", //Signup
    LOGIN: "/api/auth/login", //Authenticate user & return JWT token
    GET_PROFILE: "/api/auth/profile", //Get logged-in user details
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image", // upload profile picture

  },

  AI: {
    GENERATE_QUESTION: "/api/ai/generate-question", //Generate interview question and answers using Gemini
    GENERATE_EXPLANATION: "/api/ai/generate-explanation" //Generate concept explanation using Gemini
  },

  SESSION: {
    CREATE: "/api/questions/add", // Add more question to a session
    GET_ALL: "api/session/my-session", //Get all user session
    GET_ONE: `/api/session/${id}` ,// Get session details with question
    DELETE: `/api/sessions/${id}`, // Delete a session
  },

  QUESTION: {
    ADD_TO_SESSION: "/api/questions/add", // Add more question to a session
    PIN: (id) => `/api/question/${id}/pin`, //Pin or Unpin a question
    UPDATE_NOTE: (id) =>`/api/questions/${id}/note`, //Update/Add a note to a question
  },
};