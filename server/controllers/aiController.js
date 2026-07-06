const { GoogleGenAI } = require("@google/genai");
const {
  ConceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utills/prompts");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// @desc Generate interview questions and answers
// @route POST /api/ai/generate-questions
// @access Private
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

    // Using the official @google/genai schema syntax inside the config parameter
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            // Note: Update these keys if your questionAnswerPrompt uses a different key structure (e.g., 'questions')
            questions: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  question: { type: "STRING" },
                  answer: { type: "STRING" }
                },
                required: ["question", "answer"]
              }
            }
          },
          required: ["questions"]
        }
      }
    });

    const rawText = typeof response.text === "function" ? response.text() : response.text;
    
    // With responseMimeType, JSON.parse is guaranteed safe without regex cleaning
    const data = JSON.parse(rawText);
    return res.status(200).json(data);

  } catch (error) {
    console.error("Generate Questions Error:", error);
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: "AI request limit reached. Please try again after a minute.",
      });
    }
    return res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// @desc Generate explanation for interview question
// @route POST /api/ai/generate-explanation
// @access Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    const prompt = ConceptExplainPrompt(question);

    // Enforcing strict structured JSON outputs for the explanation
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            title: { type: "STRING" },
            explanation: { type: "STRING" },
          },
          required: ["title", "explanation"],
        },
      },
    });

    const rawText = typeof response.text === "function" ? response.text() : response.text;
    
    // No more parseGeminiJson regex helpers needed
    const data = JSON.parse(rawText);

    return res.status(200).json({
      title: data.title || question,
      explanation: data.explanation || "",
    });

  } catch (error) {
    console.error("Generate Explanation Error:", error);
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: "AI request limit reached. Please try again after a minute.",
      });
    }
    return res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};