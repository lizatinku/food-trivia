"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch('/api/questions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
      } catch (err) {
        setError('Failed to fetch question');
        console.error('Error fetching question:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, []);

  const startQuiz = () => {
    setShowCategories(true);
  };

  const startCategoryQuiz = (category: string) => {
    router.push(`/quiz/${category}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container" style={{ 
      textAlign: 'center', 
      padding: '2rem', 
      backgroundColor: '#046A38', 
      color: 'tan',
      margin: 0, 
    }}>
      <h1 style={{ margin: 0 }}>Welcome to the Indian Food Trivia Challenge! 🍛</h1>
      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <img src="/images/idli.jpg" alt="Idli" style={{ width: '150px', height: 'auto', borderRadius: '10px' }} />
          <img src="/images/chaat.jpg" alt="Chaat" style={{ width: '150px', height: 'auto', borderRadius: '10px' }} />
          <img src="/images/kholasapori.jpg" alt="Khola Saporir" style={{ width: '150px', height: 'auto', borderRadius: '10px' }} />
          <img src="/images/chole.jpg" alt="Chole" style={{ width: '150px', height: 'auto', borderRadius: '10px' }} />
        </div>

        <p style={{ margin: '1rem 0' }}>
          Discover the rich and diverse world of Indian cuisine through our fun and engaging trivia quiz. Whether you're a foodie, a culinary adventurer, or just curious about the flavors of India, this quiz will take you on a flavorful journey across the subcontinent. Test your knowledge, learn new facts, and see how well you know from dosas to dal!
        </p>
        <p style={{ margin: '1rem 0' }}>
          Are you ready to spice up your knowledge?
        </p>
        <button className="neon-button" onClick={startQuiz}>
          Start Quiz
        </button>

        {showCategories && (
          <div className="categories" style={{ marginTop: '2rem', opacity: showCategories ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
            <h2>Select a Category</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
              <button onClick={() => startCategoryQuiz('popular-dishes')} className="neon-button">
                Popular Dishes
              </button>
              <button onClick={() => startCategoryQuiz('ingredients-and-spices')} className="neon-button">
                Ingredients and Spices
              </button>
              <button onClick={() => startCategoryQuiz('desserts-and-sweets')} className="neon-button">
                Desserts and Sweets
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;