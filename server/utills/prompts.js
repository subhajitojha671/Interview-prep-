const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => `
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Generate exactly ${numberOfQuestions} interview questions.
- For each question, generate a detailed beginner-to-advanced friendly answer.
- Include practical examples wherever possible.
- Include code examples when the topic requires code.
- Specify the programming language for every markdown code block (javascript, python, java, c++, etc.).

Requirements for the 'answer' text:
- Answers must contain rich Markdown.
- Feel free to use Markdown headings, bolding, bullet points, and triple-backtick code blocks directly inside the answer string values.
`;

const ConceptExplainPrompt = (question) => `
You are a Senior Software Engineer and Technical Interview Mentor.

Question:
"${question}"

Generate a comprehensive learning guide.

Requirements for the 'explanation' text:
- Use detailed Markdown formatting (headings, bold text, lists) natively.
- Include code examples where applicable wrapped in clean triple-backtick code blocks.
- Specify the language for every code block (javascript, python, java, c++, etc.).
- Content length: At least 800-1500 words.

Structure your technical response layout using these exact content milestones:
1. Short, catchy title.
2. Simple beginner-friendly definition.
3. Step-by-step breakdown of the concept.
4. Deep dive into how it works internally.
5. Real-world analogies and practical use cases.
6. Advantages and disadvantages.
7. Common technical interview questions related to this topic.
8. Common pitfalls/mistakes beginners make.
9. Best practices and production guidelines.
`;

const AskAiPrompt = (question) => 
  `You are an expert technical interviewer, software engineer, and mentor.

Answer the following question in a clear, interview-focused manner.

Requirements:

* Keep the answer between 250 and 300 words.
* Use simple and easy-to-understand language.
* Start with a short definition or overview.
* Explain the concept with key points.
* Include a real-world example when relevant.
* If the topic is related to programming, web development, databases, APIs, system design, data structures, algorithms, or software engineering, include a short practical code example.
* Keep code examples concise (5–15 lines maximum).
* Format code examples using proper code blocks with the appropriate language.
* Use bullet points where helpful.
* Focus on interview preparation and practical understanding.
* Do not exceed 300 words for the explanation (code example not included in the word count).
* Do not include phrases like "As an AI language model".
* Return only the answer.

Question:
${question}
`;

const mockTestPrompt = (company, role, level, numberOfQuestions) => `
You are an AI trained to generate realistic mock technical interview exams
for job placement preparation.
 
Task:
- Target Company: ${company}
- Role: ${role}
- Difficulty Level: ${level}
- Generate exactly ${numberOfQuestions} multiple-choice questions covering
  topics this company commonly tests for this role, spanning core CS
  fundamentals (data structures, algorithms, OS, DBMS, networks, OOP,
  system design basics) as relevant to the role and level.
 
Requirements:
- Each question must have exactly 4 options, labeled "A", "B", "C", "D".
- Vary question type naturally: some questions have exactly ONE correct
  option, others have TWO OR MORE correct options ("select all that
  apply"), similar to a real competitive exam. Do not make every question
  single-answer.
- correctAnswers must be an array of the correct option labels only
  (e.g. ["A"] or ["A","C"]).
- Give each question a short topicTag describing its subject, formatted
  like "Data Structures · Trees" or "Operating Systems · Deadlocks".
- Provide a concise explanation (2-4 sentences) covering why each option
  is correct or incorrect — this is shown to the learner after grading.
- Questions must be technically accurate, unambiguous, and appropriately
  difficult for the stated level.
- Spread topics broadly; avoid repeating the same narrow topic more than
  2-3 times across the full set.
`;

module.exports = {
  questionAnswerPrompt,
  ConceptExplainPrompt,
  AskAiPrompt,
  mockTestPrompt,
};