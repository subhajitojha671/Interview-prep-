const { GoogleGenAI } = require("@google/genai");
const { AskAiPrompt } = require("../utills/prompts");
const AskAiHistory = require("../models/Askaihistory");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// @desc Ask the AI a free-form question and save it to the user's history
// @route POST /api/ask-ai
// @access Private
exports.askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ message: "Question is required" });
    }

    const trimmedQuestion = question.trim();
    const prompt = AskAiPrompt(trimmedQuestion);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
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
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const rawText =
      typeof response.text === "function" ? response.text() : response.text;
    const data = JSON.parse(rawText);

    const historyEntry = await AskAiHistory.create({
      user: req.user.id,
      question: trimmedQuestion,
      title: data.title || trimmedQuestion,
      explanation: data.explanation || "",
    });

    res.status(200).json({
      success: true,
      historyId: historyEntry._id,
      title: historyEntry.title,
      explanation: historyEntry.explanation,
    });
  } catch (error) {
    console.error("Ask AI Error:", error);
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: "AI request limit reached. Please try again after a minute.",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to get AI answer",
    });
  }
};

// @desc Get Ask AI history for the logged-in user
// @route GET /api/ask-ai/history
// @access Private
exports.getAskAiHistory = async (req, res) => {
  try {
    const history = await AskAiHistory.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, history });
  } catch (error) {
    console.error("Get Ask AI History Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc Delete a single Ask AI history entry
// @route DELETE /api/ask-ai/:id
// @access Private
exports.deleteAskAiHistory = async (req, res) => {
  try {
    const entry = await AskAiHistory.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: "History entry not found" });
    }

    if (entry.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await entry.deleteOne();

    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    console.error("Delete Ask AI History Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};