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
    const {
      role,
      experience,
      topicsToFocus,
      numberOfQuestions,
    } = req.body;

    if (
      !role ||
      !experience ||
      !topicsToFocus ||
      !numberOfQuestions
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const rawText = response.text;

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
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
        message: "Missing required fields",
      });
    }

    const prompt = ConceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const rawText = response.text;

    const cleanedText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    let data;

    try {
      data = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);

      return res.status(500).json({
        message: "Invalid JSON returned from Gemini",
        rawResponse: cleanedText,
      });
    }

    res.status(200).json({
      title: data.title,
      explanation: data.explanation,
    });
  } catch (error) {
    console.error("Generate Explanation Error:", error);

    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};