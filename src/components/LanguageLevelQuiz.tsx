import { useState } from "react";
import {
  QUIZ_QUESTIONS,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "../data/quizQuestions";
import type { CefrLevel, QuizResult } from "../types/quiz";
import {
  calculateLevel,
  LEVEL_INFO,
  scoreQuiz,
} from "../utils/calculateLevel";
import "./LanguageLevelQuiz.css";

type QuizPhase = "intro" | "questions" | "results";

export function LanguageLevelQuiz() {
  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [language, setLanguage] = useState<SupportedLanguage>("Spanish");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, boolean>>(new Map());
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);

  const question = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  function startQuiz() {
    setPhase("questions");
    setCurrentIndex(0);
    setAnswers(new Map());
    setSelectedOption(null);
    setResult(null);
  }

  function submitAnswer() {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === question.correctIndex;
    const nextAnswers = new Map(answers);
    nextAnswers.set(question.id, isCorrect);
    setAnswers(nextAnswers);

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
    } else {
      const level = calculateLevel(nextAnswers, QUIZ_QUESTIONS);
      const { score, maxScore, percentage } = scoreQuiz(
        nextAnswers,
        QUIZ_QUESTIONS,
      );
      setResult({ level, score, maxScore, percentage });
      setPhase("results");
    }
  }

  function retakeQuiz() {
    setPhase("intro");
    setCurrentIndex(0);
    setAnswers(new Map());
    setSelectedOption(null);
    setResult(null);
  }

  if (phase === "intro") {
    return (
      <section className="quiz quiz--intro">
        <header className="quiz__header">
          <p className="quiz__eyebrow">Language Juggler</p>
          <h1 className="quiz__title">Discover your level</h1>
          <p className="quiz__subtitle">
            Answer {totalQuestions} quick questions to estimate your CEFR
            proficiency level. Higher-difficulty questions count more toward
            your result.
          </p>
        </header>

        <label className="quiz__field">
          <span className="quiz__label">Which language are you testing?</span>
          <select
            className="quiz__select"
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value as SupportedLanguage)
            }
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </label>

        <button type="button" className="quiz__button" onClick={startQuiz}>
          Start quiz
        </button>
      </section>
    );
  }

  if (phase === "results" && result) {
    const info = LEVEL_INFO[result.level];

    return (
      <section className="quiz quiz--results">
        <header className="quiz__header">
          <p className="quiz__eyebrow">Your result</p>
          <h1 className="quiz__title">{language}</h1>
        </header>

        <div className="quiz__level-card" data-level={result.level}>
          <span className="quiz__level-badge">{result.level}</span>
          <h2 className="quiz__level-title">{info.title}</h2>
          <p className="quiz__level-description">{info.description}</p>
        </div>

        <p className="quiz__score">
          Weighted score: {result.score} / {result.maxScore} ({result.percentage}
          %)
        </p>

        <LevelScale activeLevel={result.level} />

        <button type="button" className="quiz__button" onClick={retakeQuiz}>
          Take again
        </button>
      </section>
    );
  }

  return (
    <section className="quiz quiz--questions">
      <div className="quiz__progress">
        <div
          className="quiz__progress-bar"
          style={{
            width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
          }}
        />
      </div>

      <p className="quiz__meta">
        Question {currentIndex + 1} of {totalQuestions}
        <span className="quiz__difficulty">{question.difficulty}</span>
      </p>

      <h2 className="quiz__question">{question.prompt}</h2>

      <fieldset className="quiz__options">
        {question.options.map((option, index) => (
          <label
            key={option}
            className={`quiz__option${
              selectedOption === index ? " quiz__option--selected" : ""
            }`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={index}
              checked={selectedOption === index}
              onChange={() => setSelectedOption(index)}
            />
            <span>{option}</span>
          </label>
        ))}
      </fieldset>

      <button
        type="button"
        className="quiz__button"
        disabled={selectedOption === null}
        onClick={submitAnswer}
      >
        {currentIndex + 1 < totalQuestions ? "Next" : "See my level"}
      </button>
    </section>
  );
}

function LevelScale({ activeLevel }: { activeLevel: CefrLevel }) {
  const levels: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

  return (
    <div className="quiz__scale" aria-label="CEFR level scale">
      {levels.map((level) => (
        <div
          key={level}
          className={`quiz__scale-item${
            level === activeLevel ? " quiz__scale-item--active" : ""
          }`}
        >
          {level}
        </div>
      ))}
    </div>
  );
}
