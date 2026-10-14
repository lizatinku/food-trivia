"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface QuestionProps {
  category: string;
  question: string;
  options: string[];
  currentIndex: number;
  totalQuestions: number;
  selectedOption: string | null;
  feedback: string | null;
  funFact?: string;
  onSelect: (option: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

const Question: React.FC<QuestionProps> = ({
  category,
  question,
  options,
  currentIndex,
  totalQuestions,
  selectedOption,
  feedback,
  funFact,
  onSelect,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}) => {
  const isCorrect = feedback?.startsWith("✅") ?? false;

  return (
    <section className="question-card" aria-label="Current question">
      <header className="question-header">
        <p className="category-title">{category}</p>
        <p className="question-count">
          Question {currentIndex + 1} of {totalQuestions}
        </p>
      </header>

      <h2 className="question-text">{question}</h2>
      <p className="choose-label">CHOOSE ONE ANSWER</p>

      <ul className="answer-grid">
        {options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => onSelect(option)}
              className={`answer-option ${
                selectedOption === option
                  ? isCorrect
                    ? "selected correct"
                    : "selected incorrect"
                  : ""
              }`}
              aria-pressed={selectedOption === option}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
              {selectedOption === option && (
                <span className="option-result" aria-hidden="true">
                  {isCorrect ? "✓" : "×"}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {feedback && (
        <div className={`feedback ${isCorrect ? "correct" : "incorrect"}`} role="status">
          <span className="feedback-icon" aria-hidden="true">{isCorrect ? "✓" : "!"}</span>
          <div>
            <p className="feedback-title">{isCorrect ? "Correct!" : "Not quite"}</p>
            <p className="feedback-message">
              {isCorrect
                ? funFact
                  ? `Did you know? ${funFact}`
                  : "Great job!"
                : feedback.replace("❌ Wrong! ", "")}
            </p>
          </div>
        </div>
      )}

      <nav className="quiz-navigation" aria-label="Question navigation">
        <button className="previous-button" onClick={onPrevious} disabled={!canGoPrevious}>
          <span aria-hidden="true">←</span> Previous
        </button>
        <button className="next-button" onClick={onNext} disabled={!canGoNext}>
          Next <span aria-hidden="true">→</span>
        </button>
      </nav>

      <style jsx>{`
        .question-card {
          width: 100%;
          box-sizing: border-box;
          padding: clamp(1.25rem, 4vw, 2rem);
          border: 1px solid #dce5dd;
          border-radius: 22px;
          background: #fff;
          box-shadow: 0 12px 32px rgba(23, 59, 42, 0.08);
        }

        .question-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .category-title,
        .question-count {
          margin: 0;
          font-weight: 700;
        }

        .category-title {
          color: #087044;
          font-size: clamp(0.85rem, 2vw, 1rem);
          letter-spacing: 0.045em;
          text-transform: uppercase;
        }

        .question-count {
          padding: 0.4rem 0.7rem;
          border-radius: 8px;
          background: #f0f3ef;
          color: #496357;
          font-size: 0.82rem;
          white-space: nowrap;
        }

        .question-text {
          margin: 0 0 1.1rem;
          color: #193f32;
          font-size: clamp(1.45rem, 3.5vw, 2.35rem);
          line-height: 1.3;
          font-weight: 700;
          text-align: left;
          text-wrap: pretty;
        }

        .choose-label {
          margin: 0 0 0.75rem;
          color: #718076;
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.035em;
        }

        .answer-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.65rem 0.75rem;
          margin: 0 0 1rem;
          padding: 0;
          list-style: none;
        }

        .answer-option {
          display: flex;
          width: 100%;
          min-height: 76px;
          box-sizing: border-box;
          align-items: center;
          gap: 0.8rem;
          padding: 0.85rem 1rem;
          border: 2px solid #dce5dd;
          border-radius: 12px;
          background: #fff;
          color: #193f32;
          font-size: clamp(0.95rem, 2vw, 1.12rem);
          line-height: 1.4;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: border-color 150ms ease, background-color 150ms ease;
        }

        .answer-option:hover {
          border-color: #087044;
          background: #f8faf8;
        }

        .option-letter {
          display: grid;
          width: 46px;
          height: 46px;
          flex: 0 0 46px;
          place-items: center;
          border-radius: 10px;
          background: #f0f3ef;
          color: #496357;
          font-size: 1rem;
          font-weight: 700;
        }

        .answer-option.selected {
          border-color: #087044;
          background: #e5f0e8;
        }

        .option-letter,
        .option-result {
          transition: background-color 150ms ease, color 150ms ease;
        }

        .answer-option.selected.correct .option-letter {
          background: #087044;
          color: #fff;
        }

        .answer-option.selected.incorrect {
          border-color: #b64035;
          background: #f8e9e6;
        }

        .answer-option.selected.incorrect .option-letter {
          background: #b64035;
          color: #fff;
        }

        .option-text {
          flex: 1;
        }

        .option-result {
          color: #087044;
          font-size: 1.2rem;
          font-weight: 800;
        }

        .answer-option.selected.incorrect .option-result {
          color: #b64035;
        }

        .feedback {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          margin: 0 0 1rem;
          padding: 1rem 1.15rem;
          border-radius: 12px;
        }

        .feedback.correct {
          background: #e3f1e7;
          color: #087044;
        }

        .feedback.incorrect {
          background: #f8e9e6;
          color: #a2342b;
        }

        .feedback-icon {
          display: grid;
          width: 30px;
          height: 30px;
          flex: 0 0 30px;
          place-items: center;
          border: 2px solid currentColor;
          border-radius: 50%;
          font-size: 1rem;
          font-weight: 800;
        }

        .feedback-title,
        .feedback-message {
          margin: 0;
          text-align: left;
        }

        .feedback-title {
          font-size: 1rem;
          font-weight: 750;
        }

        .feedback-message {
          margin-top: 0.15rem;
          font-size: 0.95rem;
          line-height: 1.4;
        }

        .quiz-navigation {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 1rem;
        }

        .previous-button,
        .next-button {
          display: inline-flex;
          min-height: 54px;
          box-sizing: border-box;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.75rem 1.2rem;
          border: 2px solid transparent;
          border-radius: 12px;
          color: #193f32;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 150ms ease, border-color 150ms ease;
        }

        .previous-button {
          border-color: #b7c8bb;
          background: #fff;
        }

        .previous-button:hover:not(:disabled) {
          background: #f4f7f4;
        }

        .next-button {
          background: #f5ca57;
        }

        .next-button:hover:not(:disabled) {
          background: #ffda72;
        }

        .previous-button:disabled,
        .next-button:disabled {
          cursor: not-allowed;
          opacity: 0.48;
        }

        @media (max-width: 600px) {
          .question-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .answer-grid {
            grid-template-columns: 1fr;
            gap: 0.6rem;
          }

          .answer-option {
            min-height: 60px;
          }

          .option-letter {
            width: 36px;
            height: 36px;
            flex-basis: 36px;
          }

          .previous-button,
          .next-button {
            min-height: 48px;
            padding: 0.65rem 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};

interface QuestionData {
  question: string;
  options: string[];
  answer: string;
  funFact?: string;
}

const Quiz: React.FC = () => {
  const { category } = useParams();
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (category && quizStarted) {
      const fetchQuestions = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/questions?category=${category}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data: QuestionData[] = await response.json();
          setQuestions(data);
        } catch {
          setError("Failed to fetch questions");
        } finally {
          setLoading(false);
        }
      };

      fetchQuestions();
    }
  }, [category, quizStarted]);

  const displayCategory =
    typeof category === "string"
      ? category
          .replace(/-/g, " ")
          .replace(/\b\w/g, (letter) => letter.toUpperCase())
          .replace(/\bAnd\b/g, "and")
      : "Category";

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setFeedback(null);
    }
  };

  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null);
      setFeedback(null);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setFeedback(
      option === questions[currentIndex].answer
        ? "✅ Correct!"
        : `❌ Wrong! Correct answer: ${questions[currentIndex].answer}`
    );
  };

  return (
    <div className="quiz-page">
      <main className="quiz-shell">
        {!quizStarted ? (
          <section className="welcome-card">
            <p className="category-label">{displayCategory}</p>
            <h2>Ready to play?</h2>
            <p>Test what you know about the flavors and traditions of this region.</p>
            <button className="primary-button" onClick={() => setQuizStarted(true)}>
              Start Quiz
            </button>
          </section>
        ) : loading ? (
          <section className="status-card" role="status">Loading questions...</section>
        ) : error ? (
          <section className="status-card" role="alert">{error}</section>
        ) : questions.length === 0 ? (
          <section className="status-card">No questions available</section>
        ) : (
          <Question
            category={displayCategory}
            question={questions[currentIndex].question}
            options={questions[currentIndex].options}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            selectedOption={selectedOption}
            feedback={feedback}
            funFact={questions[currentIndex].funFact}
            onSelect={handleOptionClick}
            onPrevious={previousQuestion}
            onNext={nextQuestion}
            canGoPrevious={currentIndex > 0}
            canGoNext={currentIndex < questions.length - 1}
          />
        )}
      </main>

      <style jsx>{`
        .quiz-page {
          min-height: 100vh;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(0.75rem, 2vw, 2rem);
          background: #f5f4ef;
          color: #173b2a;
        }

        .quiz-shell {
          width: min(100%, 1480px);
        }

        .welcome-card,
        .status-card {
          width: 100%;
          box-sizing: border-box;
          padding: clamp(1.5rem, 5vw, 3rem);
          border: 1px solid #dce5dd;
          border-radius: 22px;
          background: #fff;
          box-shadow: 0 12px 32px rgba(23, 59, 42, 0.08);
        }

        .primary-button {
          min-height: 48px;
          box-sizing: border-box;
          padding: 0.75rem 1.5rem;
          border: 0;
          border-radius: 10px;
          background: #f5ca57;
          color: #193f32;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 150ms ease;
        }

        .primary-button:hover {
          background: #ffda72;
        }

        .welcome-card h2 {
          margin: 0 0 0.6rem;
          color: #193f32;
          font-size: 1.8rem;
        }

        .category-label {
          margin: 0 0 0.75rem;
          color: #087044;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .welcome-card p {
          margin: 0 0 1.5rem;
          color: #526258;
        }

        .status-card {
          color: #173b2a;
          font-weight: 650;
        }

        @media (max-width: 600px) {
          .quiz-page {
            padding: 1rem 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Quiz;
