const mongoose = require("mongoose");

const askAiHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: { type: String, required: true },
    title: String,
    explanation: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AskAiHistory", askAiHistorySchema);