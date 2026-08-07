import type { CefrLevel, LevelInfo } from "../types/quiz";

const LEVEL_WEIGHT: Record<CefrLevel, number> = {
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
  C1: 5,
  C2: 6,
};

const LEVEL_ORDER: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export function calculateLevel(
  answers: Map<string, boolean>,
  questions: { id: string; difficulty: CefrLevel }[],
): CefrLevel {
  let earned = 0;
  let possible = 0;

  for (const question of questions) {
    const weight = LEVEL_WEIGHT[question.difficulty];
    possible += weight;
    if (answers.get(question.id)) {
      earned += weight;
    }
  }

  if (possible === 0) return "A1";

  const ratio = earned / possible;

  if (ratio >= 0.9) return "C2";
  if (ratio >= 0.78) return "C1";
  if (ratio >= 0.65) return "B2";
  if (ratio >= 0.5) return "B1";
  if (ratio >= 0.35) return "A2";
  return "A1";
}

export function scoreQuiz(
  answers: Map<string, boolean>,
  questions: { id: string; difficulty: CefrLevel }[],
): { score: number; maxScore: number; percentage: number } {
  let score = 0;
  let maxScore = 0;

  for (const question of questions) {
    const weight = LEVEL_WEIGHT[question.difficulty];
    maxScore += weight;
    if (answers.get(question.id)) {
      score += weight;
    }
  }

  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  return { score, maxScore, percentage };
}

export const LEVEL_INFO: Record<CefrLevel, LevelInfo> = {
  A1: {
    level: "A1",
    title: "Beginner",
    description:
      "You can understand and use familiar everyday expressions and basic phrases. Great starting point — focus on core vocabulary and simple sentences.",
  },
  A2: {
    level: "A2",
    title: "Elementary",
    description:
      "You handle routine tasks and describe your background in simple terms. Keep building vocabulary and practice short conversations.",
  },
  B1: {
    level: "B1",
    title: "Intermediate",
    description:
      "You can deal with most travel situations and describe experiences, events, and ambitions. Work on nuance and longer-form expression.",
  },
  B2: {
    level: "B2",
    title: "Upper Intermediate",
    description:
      "You interact with fluency and spontaneity with native speakers. Push into complex texts, idioms, and professional contexts.",
  },
  C1: {
    level: "C1",
    title: "Advanced",
    description:
      "You express ideas fluently and spontaneously without much searching for words. Refine style, register, and subtle cultural references.",
  },
  C2: {
    level: "C2",
    title: "Proficient",
    description:
      "You understand virtually everything and express yourself precisely, even in complex situations. Maintain exposure and specialized practice.",
  },
};

export function levelIndex(level: CefrLevel): number {
  return LEVEL_ORDER.indexOf(level);
}
