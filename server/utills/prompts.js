// ============================================================
// LEVEL 3 — Session Q&A generation (CreateSessionFrom)
// Scope: definition + how it works + code + example + a quick tip.
// More depth than a bare definition, but still well short of the
// full Level 5 guide (ConceptExplainPrompt).
// ============================================================
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

DEPTH LEVEL: 3 of 5 — Solid, interview-ready depth. Aim for roughly 300-500 words per answer.

CRITICAL STRUCTURAL REQUIREMENT:
For each question, you must strictly output the question followed by exactly 5 distinct sections using the Markdown headers specified below. Do not use HTML tags like <ul> or <li>. Use standard Markdown.

Format every single question and answer exactly like this:

## Question [Number]: [Insert Question Here]

### Definition
- For Single Concepts: A clear, direct answer defining the concept (2-4 sentences).
- For Comparisons/Differences: A concise 2-3 sentence summary explaining the core fundamental difference between the items being compared.

### How It Works
- For Single Concepts: A short breakdown of the key mechanics or reasoning behind the concept (3-5 Markdown bullets).
- For Comparisons/Differences: A clean Markdown comparison table mapping 3-5 key criteria (e.g., Core Function, Memory Management, Examples) side-by-side. 

### Code / Architecture
- For Code Topics: An isolated, practical code snippet (8-20 lines) using triple backticks and language syntax (e.g., \`\`\`javascript).
- For Non-Code/System Topics (like OS vs DBMS): Provide a small Markdown text diagram or a structural architectural breakdown of how they interact or sit in a system stack.

### Example
- One real-world scenario or practical production use-case that makes the answer concrete.

### Quick Tip
- One short, high-value tip, gotcha, common mistake to avoid, or interview-specific insight related to this question (1-2 sentences).

---
`;
// ============================================================
// LEVEL 5 — Full concept explanation ("Learn More" in InterviewPrep)
// Scope: the deepest, most complete guide format in the app.
// ============================================================
const ConceptExplainPrompt = (question) => `
You are a Senior Software Engineer and Technical Interview Mentor.

Question:
"${question}"

Generate a comprehensive learning guide.

DEPTH LEVEL: 5 of 5 — this is the most detailed explanation format in the
app. Go deep. Target length: 900-1600 words.

Requirements for the 'explanation' text:
- Use detailed Markdown formatting (headings, bold text, lists) natively.
- Include code examples where applicable, wrapped in clean triple-backtick
  code blocks with the language specified (javascript, python, java, c++,
  etc.).

Structure your response using these exact content milestones, in order:
1. Short, catchy title.
2. **Definition** — a clear, more detailed beginner-friendly definition
   than a one-liner; establish full context.
3. **Explanation** — step-by-step breakdown of the concept and a deep
   dive into how it works internally (mechanics, not just surface level).
4. **Code** — one or more worked code examples demonstrating the concept
   in practice.
5. **Types** — if the concept has meaningful variations, categories, or
   types, list and briefly describe each. Skip this milestone if not
   applicable to the topic.
6. **Real-life Example** — a concrete real-world analogy or scenario that
   makes the concept intuitive.
7. **Application** — practical use cases, where and why this is actually
   used in real systems/projects.
8. Advantages and disadvantages.
9. Common technical interview questions related to this topic.
10. Common pitfalls/mistakes beginners make.
11. Best practices and production guidelines.
`;

// ============================================================
// Ask AI — quick free-form answer (unchanged)
// ============================================================
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

// ============================================================
// Mock Test — MCQ exam generation, explicitly tuned per level
// ============================================================
const LEVEL_GUIDANCE = {
  easy: `
- Target audience: freshers / screening-round difficulty.
- Focus on fundamental definitions, basic syntax, straightforward
  single-concept questions (e.g. basic loops, array traversal, simple
  OOP definitions, basic SQL queries, basic OS/DBMS terminology).
- Coding questions (when included) should be simple: predict the output
  of a short, easy-to-trace snippet, spot an obvious bug, or identify
  time complexity of a basic loop/algorithm.
- Avoid multi-step reasoning or edge-case-heavy questions.`,
  medium: `
- Target audience: mid-level applied-knowledge round, similar to a
  typical Round 1/2 technical interview at a product-based company.
- Focus on applied problem-solving: moderate data structures (trees,
  graphs basics, hashing, recursion), intermediate algorithms (sorting
  variants, two-pointer, sliding window, intro DP), scenario-based
  OS/DBMS/networking questions (deadlocks, indexing, normalization,
  TCP vs UDP), and intermediate OOP/design questions.
- Coding questions (when included) should require tracing through
  moderately complex logic, predicting output of code with loops/
  recursion, or choosing the most efficient of several approaches —
  comparable to LeetCode Easy-to-Medium style.`,
  hard: `
- Target audience: advanced round difficulty at competitive product-based
  companies (FAANG-style / high-bar tech interviews).
- Focus on advanced data structures and algorithms (advanced trees/graphs,
  dynamic programming, greedy, backtracking), tricky corner cases,
  system design fundamentals (scalability, caching, load balancing basics),
  and nuanced conceptual questions that require careful reasoning, not
  just recall.
- Coding questions (when included) should involve non-obvious output
  prediction, subtle bugs, complexity analysis of non-trivial code, or
  choosing between competing algorithmic approaches — comparable to
  LeetCode Medium-to-Hard style, similar to what candidates report being
  asked by top product-based companies.`,
};

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

LEVEL-SPECIFIC GUIDANCE (follow this closely — it defines the actual
difficulty and style of every question in this set):
${LEVEL_GUIDANCE[level] || LEVEL_GUIDANCE.medium}

Company interview style:
- Tailor question style to how "${company}" is generally known to
  interview for this kind of role (e.g. more DSA/coding-output-prediction
  heavy for competitive product-based companies, more fundamentals- and
  concept-heavy for service-based companies with high-volume hiring). Use
  your best general knowledge of that company's interview pattern; if
  unfamiliar, default to a well-rounded mix appropriate for the level.
- Include a meaningful portion of actual short code snippets inside
  question text (e.g. "What is the output of the following code?",
  "Which line contains a bug?", "What is the time complexity of this
  function?") — not just theory-only questions. The exact proportion of
  code-based vs. theory-based questions should follow the level guidance
  above.

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
- Any code shown inside a question must be short (under ~12 lines),
  syntactically valid, and formatted in a Markdown code block with the
  language specified.
`;

module.exports = {
  questionAnswerPrompt,
  ConceptExplainPrompt,
  AskAiPrompt,
  mockTestPrompt,
};