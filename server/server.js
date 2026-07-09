require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');




const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const questionRoutes = require('./routes/questionRoutes');
const askAiRoutes = require('./routes/askAiRoutes');
const mockTestRoutes  = require('./routes/mocktestroutes');
const { protect } = require('./middlewares/authMiddleware');
const { generateConceptExplanation, generateInterviewQuestions } = require('./controllers/aiController');




const app = express();

//middleware to handle CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }

));

connectDB();

//middleware
app.use(express.json());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/ask-ai', askAiRoutes);
app.use('/api/mock-test', mockTestRoutes);
app.use('/api/ai/generate-questions', protect, generateInterviewQuestions);
app.use('/api/ai/generate-explanation', protect, generateConceptExplanation);

//serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {}));




//for test
app.get("/", (req, res) => {
  res.send("API is running...");
});

//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => 
  console.log(`Server running on port http://localhost:${PORT}`));