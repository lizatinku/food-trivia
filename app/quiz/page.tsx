//app/quiz/page.tsx
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

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
        <button onClick={() => startCategoryQuiz('east-and-north-east-dishes')} className="neon-button">
          Eastern and North Eastern Dishes
        </button>
        <button onClick={() => startCategoryQuiz('desserts-and-sweets')} className="neon-button">
          Desserts and Sweets
        </button>
      </div>
    </div>
  );
};

export default CategoriesPage;


