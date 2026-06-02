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
- Write ${numberOfQuestions} interview questions
- For each question, generate a detailed but beginner-to-advanced friendly answer
- If needed, include a small code example
- Keep formatting clean
- Return ONLY a valid JSON array

Example:

[
  {
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime..."
  }
]

Important:
- Do not add markdown
- Do not add \`\`\`json
- Do not add explanations outside JSON
- Return only valid JSON
`;

const ConceptExplainPrompt = (question) => `
You are an AI trained to explain interview concepts.

Task:
- Explain the following interview question in depth for a beginner developer
- Question: "${question}"
- Provide a short title
- Include a small code example if necessary
- Return ONLY valid JSON

Example:

{
  "title": "Understanding Closures in JavaScript",
  "explanation": "A closure is..."
}

Important:
- Do not add markdown
- Do not add \`\`\`json
- Return only valid JSON
`;

module.exports = {
  questionAnswerPrompt,
  ConceptExplainPrompt,
};