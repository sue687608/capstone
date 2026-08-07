export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  difficulty: CefrLevel;
  explanation?: string;
};

export type QuizResult = {
  level: CefrLevel;
  score: number;
  maxScore: number;
  percentage: number;
};

export type LevelInfo = {
  level: CefrLevel;
  title: string;
  description: string;
};
