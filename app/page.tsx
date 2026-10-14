"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../styles/globals.css";

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch("/api/questions");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
      } catch (err) {
        setError("Failed to fetch question");
        console.error("Error fetching question:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, []);

  const startQuiz = () => setShowCategories(true);
  const startCategoryQuiz = (category: string) => router.push(`/quiz/${category}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div
        className="home-page"
        style={{
          textAlign: "center",
          padding: "2rem",
          backgroundColor: "#046A38",
          color: "#F9F5EB",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            margin: "0 auto 0.5rem",
            fontSize: "2.8rem",
            fontWeight: "bold",
            color: "#F9F5EB",
          }}
        >
          Welcome to the Indian Food Trivia!
        </h1>

        <div style={{ marginTop: "4rem" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Image src="/images/idli.jpg" alt="Idli" width={250} height={250} style={{ borderRadius: "10px" }} />
            <Image src="/images/chaat.jpg" alt="Chaat" width={250} height={250} style={{ borderRadius: "10px" }} />
            <Image src="/images/kholasapori.jpg" alt="Khola Saporir" width={250} height={250} style={{ borderRadius: "10px" }} />
            <Image src="/images/chole.jpg" alt="Chole" width={250} height={250} style={{ borderRadius: "10px" }} />
          </div>

          <div className="mt-16 ml-0 mr-8" style={{ marginTop: "2rem", maxWidth: "850px", margin: "2rem auto" }}>
            <p>
              Discover the rich and diverse world of Indian cuisine through our fun and engaging trivia quiz.
              Whether you&apos;re a foodie, a culinary adventurer, or just curious about the flavors of India, this quiz
              will take you on a flavorful journey across the subcontinent.
            </p>
            <p>Are you ready to spice up your knowledge?</p>
          </div>

          <button className="neon-button" onClick={startQuiz}>
            Start Quiz
          </button>

          {showCategories && (
            <div
              className="categories"
              style={{
                marginTop: "2rem",
                opacity: showCategories ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              <h2>Select a Category</h2>
              <div className="category-grid">
                <button onClick={() => startCategoryQuiz("popular-dishes")} className="category-button">Popular Dishes</button>
                <button onClick={() => startCategoryQuiz("desserts")} className="category-button">Desserts</button>
                <button onClick={() => startCategoryQuiz("eastern-and-north-eastern-cuisine")} className="category-button">Eastern and North Eastern Cuisine</button>
                <button onClick={() => startCategoryQuiz("beverages")} className="category-button">Beverages</button>
                <button onClick={() => startCategoryQuiz("west-indian-cuisine")} className="category-button">West Indian Cuisine</button>
                <button onClick={() => startCategoryQuiz("indo-western-fusion")} className="category-button">Indo-Western Fusion</button>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          .neon-button {
            background-color: tan;
            color: #046a38;
            padding: 10px 20px;
            font-size: 1.2rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin: 1rem 0;
            text-transform: uppercase;
            font-weight: 600;
            text-shadow: 0 0 5px #0fa, 0 0 10px #0fa, 0 0 15px #0fa, 0 0 20px #0fa;
            animation: flicker 1.5s infinite alternate;
          }

          .category-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
            width: min(100%, 900px);
            margin: 1rem auto 0;
          }

          .category-button {
            min-height: 56px;
            padding: 0.45rem 0.65rem;
            border: 2px solid rgba(249, 245, 235, 0.75);
            border-radius: 8px;
            background: #f9f5eb;
            color: #046a38;
            cursor: pointer;
            font-size: clamp(1.1rem, 1.5vw, 1.25rem);
            font-weight: 700;
            text-align: center;
            transition: background-color 150ms ease, transform 150ms ease;
          }

          .category-button:hover {
            transform: translateY(-2px);
            background: #e8f0e9;
          }

          @media (max-width: 600px) {
            .category-grid {
              gap: 0.65rem;
            }

            .category-button {
              min-height: 50px;
              padding: 0.35rem 0.45rem;
              font-size: 1rem;
            }
          }

          @keyframes flicker {
            0%, 18%, 22%, 25%, 53%, 57%, 100% {
              text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff,
                0 0 40px #0fa, 0 0 80px #0fa, 0 0 90px #0fa, 0 0 100px #0fa,
                0 0 150px #0fa;
            }
            20%, 24%, 55% {
              text-shadow: none;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default function Page() {
  return <HomePage />;
}
