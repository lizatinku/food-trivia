"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// Define the type for a single question
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
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current question index

  useEffect(() => {
    if (category && quizStarted) {
      const fetchQuestions = async () => {
        setLoading(true); // Set loading to true when starting fetch
        try {
          const response = await fetch(`/api/questions?category=${category}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data: Question[] = await response.json(); // Explicitly type the response data
          console.log('Fetched questions:', data); // Log the fetched questions
          setQuestions(data);
        } catch (err) {
          setError('Failed to fetch questions');
          console.error('Error fetching questions:', err);
        } finally {
          setLoading(false); // Ensure loading is set to false after fetching
        }
      };

      fetchQuestions();
    }
  }, [category, quizStarted]);

  const displayCategory = typeof category === 'string' ? category.replace(/-/g, ' ') : 'Category';

  // Handler for moving to the next question
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Handler for moving to the previous question
  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="container" style={{ 
      textAlign: 'center', 
      padding: '2rem', 
      backgroundColor: '#046A38', 
      color: 'tan',
      margin: '0 auto',
      maxWidth: '800px',  // Set a max width for the quiz container
      boxSizing: 'border-box',
    }}>
      <h1 style={{ margin: '0 0 1rem 0' }}>Quiz: {displayCategory}</h1>
      {!quizStarted ? (
        <button className="neon-button" onClick={() => setQuizStarted(true)} style={{ margin: '1rem' }}>
          Start Quiz
        </button>
      ) : loading ? (
        <div>Loading...</div> // Show loading while fetching
      ) : error ? (
        <div>{error}</div> // Show error if any
      ) : (
        <div>
          {/* Display the current question */}
          {questions.length === 0 ? (
            <div>No questions available</div>
          ) : (
            <div>
              <div className="question-card">
                <h3>{questions[currentIndex].question}</h3>
                <ul>
                  {questions[currentIndex].options.map((option, i) => (
                    <li key={i}>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Navigation buttons */}
              <div className="button-container" style={{ marginTop: '1rem' }}>
                <button className="button" onClick={() => previousQuestion()}>
                  Previous
                </button>
                <button className="button" onClick={() => nextQuestion()}>
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
