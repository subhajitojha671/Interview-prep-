export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },

  AI: {
    GENERATE_QUESTION: "/api/ai/generate-question",
    GENERATE_EXPLANATION: "/api/ai/generate-explanation",
  },

  SESSION: {
    CREATE: "/api/questions/add",
    GET_ALL: "/api/session/my-session",
    GET_ONE: (id) => `/api/session/${id}`,
    DELETE: (id) => `/api/session/${id}`,
  },

  QUESTION: {
    ADD_TO_SESSION: "/api/questions/add",
    PIN: (id) => `/api/question/${id}/pin`,
    UPDATE_NOTE: (id) => `/api/questions/${id}/note`,
  },
};