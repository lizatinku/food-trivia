// /app/quiz/[category]/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const QuizPage: React.FC = () => {
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      const fetchQuestions = async () => {
        try {
          const response = await fetch(`/api/questions?category=${category}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setQuestions(data);
        } catch (err) {
          setError('Failed to fetch questions');
          console.error('Error fetching questions:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchQuestions();
    }
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const displayCategory = typeof category === 'string' ? category.replace(/-/g, ' ') : 'Category';

  return (
    <div className="container" style={{ 
      textAlign: 'center', 
      padding: '2rem', 
      backgroundColor: '#046A38', 
      color: 'tan',
      margin: 0, 
    }}>
      <h1 style={{ margin: 0 }}>Quiz: {displayCategory}</h1>
      <div>
      </div>
    </div>
  );
};

export default QuizPage;
