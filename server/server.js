require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const questionRoutes = require('./routes/questionRoutes');
const askAiRoutes = require('./routes/askAiRoutes');
const mockTestRoutes = require('./routes/mocktestroutes');
const { protect } = require('./middlewares/authMiddleware');
const { generateConceptExplanation, generateInterviewQuestions } = require('./controllers/aiController');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/ask-ai', askAiRoutes);
app.use('/api/mock-test', mockTestRoutes);
app.use('/api/ai/generate-questions', protect, generateInterviewQuestions);
app.use('/api/ai/generate-explanation', protect, generateConceptExplanation);

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {}));

// Base Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Export app for Vercel serverless deployment
module.exports = app;

// Local Development Fallback
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => 
    console.log(`Server running on http://localhost:${PORT}`)
  );
}