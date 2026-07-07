const express = require("express");
const {
  askAI,
  getAskAiHistory,
  deleteAskAiHistory,
} = require("../controllers/askAiController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, askAI);
router.get("/history", protect, getAskAiHistory);
router.delete("/:id", protect, deleteAskAiHistory);

module.exports = router;