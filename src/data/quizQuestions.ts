import type { QuizQuestion } from "../types/quiz";

/** Sample proficiency questions — replace or extend per target language. */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    prompt: 'What does "hello" mean in most languages you are learning?',
    options: ["A greeting", "Goodbye", "Thank you", "Please"],
    correctIndex: 0,
    difficulty: "A1",
    explanation: "Basic greetings are among the first words every learner picks up.",
  },
  {
    id: "q2",
    prompt: 'Choose the correct word: "I ___ a student."',
    options: ["am", "is", "are", "be"],
    correctIndex: 0,
    difficulty: "A1",
    explanation: '"I" takes "am" in English — the same pattern appears in many languages with person agreement.',
  },
  {
    id: "q3",
    prompt: "Which phrase asks for the price of something?",
    options: [
      "How much does this cost?",
      "Where is the bathroom?",
      "What time is it?",
      "Nice to meet you.",
    ],
    correctIndex: 0,
    difficulty: "A2",
  },
  {
    id: "q4",
    prompt: 'Pick the sentence in past tense: "Yesterday I ___ to the market."',
    options: ["went", "go", "going", "goes"],
    correctIndex: 0,
    difficulty: "A2",
    explanation: "Past tense verbs are a core A2 milestone.",
  },
  {
    id: "q5",
    prompt: "What does a conditional sentence express?",
    options: [
      "A hypothetical or dependent outcome",
      "A completed action in the past",
      "A direct command",
      "A list of items",
    ],
    correctIndex: 0,
    difficulty: "B1",
  },
  {
    id: "q6",
    prompt: 'Which option best completes: "If I had more time, I ___ learn another language."',
    options: ["would", "will", "am", "was"],
    correctIndex: 0,
    difficulty: "B1",
    explanation: "Second conditional uses past simple + would + base verb.",
  },
  {
    id: "q7",
    prompt: "What is the difference between 'few' and 'a few' in English?",
    options: [
      "'Few' is negative (not many); 'a few' is positive (some)",
      "They mean exactly the same thing",
      "'A few' means none at all",
      "'Few' always means many",
    ],
    correctIndex: 0,
    difficulty: "B2",
  },
  {
    id: "q8",
    prompt: "Which sentence uses the subjunctive mood correctly?",
    options: [
      "It is essential that she be on time.",
      "It is essential that she is on time.",
      "It is essential that she was on time.",
      "It is essential that she will be on time.",
    ],
    correctIndex: 0,
    difficulty: "B2",
  },
  {
    id: "q9",
    prompt: "In discourse, what does ' hedging ' language accomplish?",
    options: [
      "Softens claims and shows nuance or uncertainty",
      "Makes statements more aggressive",
      "Eliminates the need for evidence",
      "Always indicates the speaker is lying",
    ],
    correctIndex: 0,
    difficulty: "C1",
  },
  {
    id: "q10",
    prompt: "Which best describes 'register' in sociolinguistics?",
    options: [
      "Variation in language formality based on context and audience",
      "The alphabet used by a language",
      "A type of verb conjugation",
      "The speed at which someone speaks",
    ],
    correctIndex: 0,
    difficulty: "C1",
  },
  {
    id: "q11",
    prompt: "What distinguishes ' prescriptive ' from ' descriptive ' grammar?",
    options: [
      "Prescriptive rules how people should speak; descriptive records how they do",
      "Prescriptive grammar only applies to written language",
      "Descriptive grammar is always incorrect",
      "There is no meaningful difference",
    ],
    correctIndex: 0,
    difficulty: "C2",
  },
  {
    id: "q12",
    prompt: "Which phenomenon involves a word's form changing based on surrounding sounds?",
    options: ["Assimilation", "Calque", "Code-switching", "False cognate"],
    correctIndex: 0,
    difficulty: "C2",
    explanation: "Assimilation is a phonological process common across languages.",
  },
];

export const SUPPORTED_LANGUAGES = [
  "Spanish",
  "French",
  "German",
  "Japanese",
  "English",
  "Other",
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
