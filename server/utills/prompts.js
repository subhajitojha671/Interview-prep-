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
- All code examples MUST be wrapped in Markdown code blocks using triple backticks.
- Always specify the language of the code block.

Example code block:

\`\`\`javascript
const http = require("http");
\`\`\`

Response Format:

[
  {
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime environment...\\n\\nExample:\\n\\n\`\`\`javascript\\nconst http = require('http');\\n\`\`\`"
  }
]

Important Rules:
- Return ONLY a valid JSON array.
- Do NOT wrap the JSON response in markdown.
- Do NOT use \`\`\`json around the response.
- Do NOT add explanations before or after the JSON.
- Answers must contain valid Markdown.
- Preserve Markdown headings, bullet points, and code blocks inside answer strings.
- Escape newlines correctly so the JSON remains valid.
- Return only valid parsable JSON.
`;

const ConceptExplainPrompt = (question) => `
You are a Senior Software Engineer and Technical Interview Mentor.

Question:
"${question}"

Generate a comprehensive learning guide.

Requirements:
- Provide a short title.
- Explanation must be at least 800-1500 words.
- Start with a simple beginner-friendly definition.
- Explain the concept step by step.
- Explain how it works internally.
- Include real-world examples.
- Include practical use cases.
- Include advantages and disadvantages.
- Include common interview questions related to this topic.
- Include common mistakes beginners make.
- Include best practices.
- Include code examples where applicable.
- ALL code examples MUST be wrapped in Markdown code blocks using triple backticks.
- Specify the language for every code block (javascript, python, java, c++, etc.).
- Use proper Markdown formatting.

Example code block format:

\`\`\`javascript
const app = express();
app.listen(3000);
\`\`\`

Return ONLY valid JSON:

{
  "title": "string",
  "explanation": "markdown content here"
}

Important:
- explanation must contain raw markdown.
- code examples must use triple backticks.
- do not escape markdown code blocks.
- do not wrap the JSON response in markdown.
- do not add any text before or after JSON.
- return only valid JSON.
`;

module.exports = {
  questionAnswerPrompt,
  ConceptExplainPrompt,
};