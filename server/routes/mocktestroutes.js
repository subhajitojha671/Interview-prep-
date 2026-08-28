const express = require("express");
const {
  generateMockTest,
  submitMockTest,
  getMockTestHistory,
  getMockTestById,
} = require("../controllers/Mocktestcontroller");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/generate", protect, generateMockTest);
router.post("/:id/submit", protect, submitMockTest);
router.get("/history", protect, getMockTestHistory);
router.get("/:id", protect, getMockTestById);

module.exports = router;