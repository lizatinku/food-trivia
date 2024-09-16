"use client";
import React from 'react';
import { useRouter } from 'next/router';

const CategoriesPage: React.FC = () => {
  const router = useRouter();

  const startCategoryQuiz = (category: string) => {
    router.push(`/quiz/${category}`);
  };

  return (
    <div className="container" style={{ 
      textAlign: 'center', 
      padding: '2rem', 
      backgroundColor: '#046A38', 
      color: 'tan',
      margin: 0, 
    }}>
      <h1>Select a Category</h1>
      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => startCategoryQuiz('popular-dishes')} className="neon-button">
          Popular Dishes
        </button>
        <button onClick={() => startCategoryQuiz('eastern-and-north-eastern-cuisine')} className="neon-button">
          Eastern and North Eastern Cuisine
        </button>
        <button onClick={() => startCategoryQuiz('west-indian-cuisine')} className="neon-button">
          West Indian Cuisine
        </button>
        <button onClick={() => startCategoryQuiz('desserts')} className="neon-button">
          Desserts
        </button>
        <button onClick={() => startCategoryQuiz('beverages')} className="neon-button">
          Beverages
        </button>
        <button onClick={() => startCategoryQuiz('indo-western-fusion')} className="neon-button">
          Indo-Western Fusion
        </button>
      </div>
    </div>
  );
};

export default CategoriesPage;
