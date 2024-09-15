"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const QuizPage: React.FC = () => {
  const { category } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
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
            throw new Error('Network response was not ok');
          }
          const data: Question[] = await response.json();
          setQuestions(data);
        } catch (err) {
          setError('Failed to fetch questions');
        } finally {
          setLoading(false); 
        }
      };

      fetchQuestions();
    }
  }, [category, quizStarted]);

  const displayCategory = typeof category === 'string' ? category.replace(/-/g, ' ') : 'Category';

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
    if (option === questions[currentIndex].answer) {
      setFeedback('Correct!');
    } else {
      setFeedback('Wrong! The correct answer is ' + questions[currentIndex].answer + '.');
    }
  };

  return (
    <div className="container" style={{ 
      textAlign: 'center', 
      padding: '2rem', 
      backgroundColor: '#046A38', 
      color: 'tan',
      margin: '0 auto',
      maxWidth: '800px', 
      boxSizing: 'border-box',
    }}>
      <h1 style={{ margin: '0 0 1rem 0' }}>Quiz: {displayCategory}</h1>
      {!quizStarted ? (
        <button className="neon-button" onClick={() => setQuizStarted(true)} style={{ margin: '1rem' }}>
          Start Quiz
        </button>
      ) : loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          {questions.length === 0 ? (
            <div>No questions available</div>
          ) : (
            <div>
              <div className="question-card">
                <h3>{questions[currentIndex].question}</h3>
                <ul>
                  {questions[currentIndex].options.map((option, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handleOptionClick(option)}
                        style={{
                          backgroundColor: option === selectedOption ? '#d3d3d3' : 'transparent',
                        }}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
                {feedback && <p>{feedback}</p>}
              </div>

              <div className="button-container" style={{ marginTop: '1rem' }}>
                <button className="button" onClick={previousQuestion}>
                  Previous
                </button>
                <button className="button" onClick={nextQuestion}>
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
