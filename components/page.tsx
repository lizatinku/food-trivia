"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Question from "@/components/Question";

interface QuestionData {
  question: string;
  options: string[];
  answer: string;
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
        } catch (err) {
          setError("Failed to fetch questions");
        } finally {
          setLoading(false);
        }
      };

      fetchQuestions();
    }
  }, [category, quizStarted]);

  const displayCategory =
    typeof category === "string" ? category.replace(/-/g, " ") : "Category";

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
    <div className="container" style={{ textAlign: "center", padding: "2rem", backgroundColor: "#046A38", color: "tan", margin: "0 auto", maxWidth: "800px", boxSizing: "border-box" }}>
      <h1 style={{ margin: "0 0 1rem 0" }}>Quiz: {displayCategory}</h1>

      {!quizStarted ? (
        <button className="neon-button" onClick={() => setQuizStarted(true)} style={{ margin: "1rem" }}>
          Start Quiz
        </button>
      ) : loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : questions.length === 0 ? (
        <div>No questions available</div>
      ) : (
        <div>
          <Question
            question={questions[currentIndex].question}
            options={questions[currentIndex].options}
            onSelect={handleOptionClick}
          />
          {feedback && <p>{feedback}</p>}

          <div className="button-container" style={{ marginTop: "1rem" }}>
            <button className="button" onClick={previousQuestion} disabled={currentIndex === 0}>
              Previous
            </button>
            <button className="button" onClick={nextQuestion} disabled={currentIndex === questions.length - 1}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
