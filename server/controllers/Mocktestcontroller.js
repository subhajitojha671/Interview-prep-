const { GoogleGenAI } = require("@google/genai");
const { mockTestPrompt } = require("../utills/prompts");
const MockTestExam = require("../models/Mocktestexam");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const TOTAL_QUESTIONS = 30;
const DURATION_MINUTES = 20;

const QUESTION_SCHEMA = {
  type: "OBJECT",
  properties: {
    questions: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          questionText: { type: "STRING" },
          topicTag: { type: "STRING" },
          options: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                label: { type: "STRING" },
                text: { type: "STRING" },
              },
              required: ["label", "text"],
            },
          },
          correctAnswers: {
            type: "ARRAY",
            items: { type: "STRING" },
          },
          explanation: { type: "STRING" },
        },
        required: [
          "questionText",
          "topicTag",
          "options",
          "correctAnswers",
          "explanation",
        ],
      },
    },
  },
  required: ["questions"],
};

// Strips answer-revealing fields before sending questions to the client
// while a test is in progress.
const stripAnswers = (question, index) => ({
  questionIndex: index,
  questionText: question.questionText,
  topicTag: question.topicTag,
  options: question.options,
});

// @desc Generate a new mock test exam (company/role/level -> 30 MCQs)
// @route POST /api/mock-test/generate
// @access Private
exports.generateMockTest = async (req, res) => {
  try {
    const { company, role, level } = req.body;

    if (!company || !role || !level) {
      return res.status(400).json({
        message: "Company, role and level are required",
      });
    }

    const prompt = mockTestPrompt(company, role, level, TOTAL_QUESTIONS);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: QUESTION_SCHEMA,
        thinkingConfig: { thinkingBudget: 0 },
        maxOutputTokens: 65536,
      },
    });

    const rawText =
      typeof response.text === "function" ? response.text() : response.text;
    const data = JSON.parse(rawText);

    if (!data.questions || data.questions.length === 0) {
      throw new Error("Failed to generate questions");
    }

    const exam = await MockTestExam.create({
      user: req.user.id,
      company,
      role,
      level,
      totalQuestions: data.questions.length,
      durationMinutes: DURATION_MINUTES,
      questions: data.questions,
      status: "in_progress",
      startedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      examId: exam._id,
      company: exam.company,
      role: exam.role,
      level: exam.level,
      totalQuestions: exam.totalQuestions,
      durationMinutes: exam.durationMinutes,
      startedAt: exam.startedAt,
      questions: exam.questions.map(stripAnswers),
    });
  } catch (error) {
    console.error("Generate Mock Test Error:", error);
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: "AI request limit reached. Please try again after a minute.",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to generate mock test",
    });
  }
};

// @desc Submit answers for an in-progress exam and get graded results
// @route POST /api/mock-test/:id/submit
// @access Private
// Expects: { answers: [{ questionIndex, selected: [labels] }], timeTakenSeconds }
exports.submitMockTest = async (req, res) => {
  try {
    const { answers, timeTakenSeconds } = req.body;

    const exam = await MockTestExam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ message: "Mock test not found" });
    }

    if (exam.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (exam.status === "completed") {
      return res.status(400).json({ message: "This test is already submitted" });
    }

    const answerMap = new Map(
      (answers || []).map((a) => [a.questionIndex, a.selected || []])
    );

    let correctCount = 0;
    let wrongCount = 0;

    const gradedQuestions = exam.questions.map((q, index) => {
      const selected = (answerMap.get(index) || []).slice().sort();
      const correct = [...q.correctAnswers].sort();

      const isCorrect =
        selected.length === correct.length &&
        selected.every((v, i) => v === correct[i]);

      if (isCorrect) correctCount++;
      else wrongCount++;

      return {
        questionIndex: index,
        questionText: q.questionText,
        topicTag: q.topicTag,
        options: q.options,
        correctAnswers: q.correctAnswers,
        selected,
        isCorrect,
        explanation: q.explanation,
      };
    });

    exam.answers = Array.from(answerMap.entries()).map(
      ([questionIndex, selected]) => ({ questionIndex, selected })
    );
    exam.correctCount = correctCount;
    exam.wrongCount = wrongCount;
    exam.scorePercent = Math.round(
      (correctCount / exam.totalQuestions) * 100
    );
    exam.timeTakenSeconds = timeTakenSeconds || 0;
    exam.status = "completed";
    exam.completedAt = new Date();

    await exam.save();

    res.status(200).json({
      success: true,
      examId: exam._id,
      company: exam.company,
      role: exam.role,
      level: exam.level,
      totalQuestions: exam.totalQuestions,
      correctCount,
      wrongCount,
      scorePercent: exam.scorePercent,
      timeTakenSeconds: exam.timeTakenSeconds,
      questions: gradedQuestions,
    });
  } catch (error) {
    console.error("Submit Mock Test Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc Get mock test history (completed attempts) for the logged-in user
// @route GET /api/mock-test/history
// @access Private
exports.getMockTestHistory = async (req, res) => {
  try {
    const attempts = await MockTestExam.find({
      user: req.user.id,
      status: "completed",
    })
      .sort({ completedAt: -1 })
      .select(
        "company role level totalQuestions correctCount wrongCount scorePercent timeTakenSeconds completedAt"
      );

    res.status(200).json({ success: true, attempts });
  } catch (error) {
    console.error("Get Mock Test History Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc Get a single completed mock test attempt in full (for "View")
// @route GET /api/mock-test/:id
// @access Private
exports.getMockTestById = async (req, res) => {
  try {
    const exam = await MockTestExam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ message: "Mock test not found" });
    }

    if (exam.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const answerMap = new Map(
      exam.answers.map((a) => [a.questionIndex, a.selected])
    );

    const questions = exam.questions.map((q, index) => ({
      questionIndex: index,
      questionText: q.questionText,
      topicTag: q.topicTag,
      options: q.options,
      correctAnswers: q.correctAnswers,
      selected: answerMap.get(index) || [],
      isCorrect:
        JSON.stringify([...(answerMap.get(index) || [])].sort()) ===
        JSON.stringify([...q.correctAnswers].sort()),
      explanation: q.explanation,
    }));

    res.status(200).json({
      success: true,
      examId: exam._id,
      company: exam.company,
      role: exam.role,
      level: exam.level,
      totalQuestions: exam.totalQuestions,
      correctCount: exam.correctCount,
      wrongCount: exam.wrongCount,
      scorePercent: exam.scorePercent,
      timeTakenSeconds: exam.timeTakenSeconds,
      status: exam.status,
      questions,
    });
  } catch (error) {
    console.error("Get Mock Test By Id Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};