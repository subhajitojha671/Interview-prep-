const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    label: { type: String, required: true }, // "A" | "B" | "C" | "D"
    text: { type: String, required: true },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: true },
    topicTag: { type: String, required: true },
    options: { type: [optionSchema], required: true },
    correctAnswers: { type: [String], required: true }, // e.g. ["A"] or ["A","B"]
    explanation: { type: String, required: true },
  },
  { _id: false }
);

const answerSchema = new mongoose.Schema(
  {
    questionIndex: { type: Number, required: true },
    selected: { type: [String], default: [] },
  },
  { _id: false }
);

const mockTestExamSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: { type: String, required: true },
    role: { type: String, required: true },
    level: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    totalQuestions: { type: Number, required: true, default: 30 },
    durationMinutes: { type: Number, required: true, default: 20 },
    questions: { type: [questionSchema], required: true },

    status: {
      type: String,
      enum: ["in_progress", "completed"],
      default: "in_progress",
    },
    answers: { type: [answerSchema], default: [] },
    correctCount: { type: Number, default: 0 },
    wrongCount: { type: Number, default: 0 },
    scorePercent: { type: Number, default: 0 },
    timeTakenSeconds: { type: Number, default: 0 },
    startedAt: { type: Date, default: Date.now },
    completedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("MockTestExam", mockTestExamSchema);