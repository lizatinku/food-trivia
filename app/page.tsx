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

  const startQuiz = () => {
    setShowCategories(true);
  };

  const startCategoryQuiz = (category: string) => {
    router.push(`/quiz/${category}`);
  };

  const goToLogin = () => {
    router.push("/login");
  };

  const goToSignUp = () => {
    router.push("/signup");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      className="container"
      style={{
        position: "relative",
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "#046A38",
        color: "F9F5EB",
        margin: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <button
          onClick={goToLogin}
          style={{
            background: "white",
            color: "#046A38",
            padding: "0.5rem 0.5rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <button
          onClick={goToSignUp}
          style={{
            background: "white",
            color: "#046A38",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </div>

      <h1 style={{ margin: "2rem 0 2.5rem 0" }}>
        Welcome to the Indian Food Trivia!
      </h1>
      <div style={{ marginTop: "4rem" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Image
            src="/images/idli.jpg"
            alt="Idli"
            width={250}
            height={250}
            style={{ borderRadius: "10px" }}
          />
          <Image
            src="/images/chaat.jpg"
            alt="Chaat"
            width={250}
            height={250}
            style={{ borderRadius: "10px" }}
          />
          <Image
            src="/images/kholasapori.jpg"
            alt="Khola Saporir"
            width={250}
            height={250}
            style={{ borderRadius: "10px" }}
          />
          <Image
            src="/images/chole.jpg"
            alt="Chole"
            width={250}
            height={250}
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div className="mt-16 ml-0 mr-8">
          <p>
            Discover the rich and diverse world of Indian cuisine through our
            fun and engaging trivia quiz. Whether you're a foodie, a culinary
            adventurer, or just curious about the flavors of India, this quiz
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <button
                onClick={() => startCategoryQuiz("popular-dishes")}
                className="neon-button"
              >
                Popular Dishes
              </button>
              <button
                onClick={() =>
                  startCategoryQuiz("eastern-and-north-eastern-cuisine")
                }
                className="neon-button"
              >
                Eastern and North Eastern Cuisine
              </button>
              <button
                onClick={() => startCategoryQuiz("west-indian-cuisine")}
                className="neon-button"
              >
                West Indian Cuisine
              </button>
              <button
                onClick={() => startCategoryQuiz("desserts")}
                className="neon-button"
              >
                Desserts
              </button>
              <button
                onClick={() => startCategoryQuiz("beverages")}
                className="neon-button"
              >
                Beverages
              </button>
              <button
                onClick={() => startCategoryQuiz("indo-western-fusion")}
                className="neon-button"
              >
                Indo-Western Fusion
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Neon button styles properly scoped */}
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

        @keyframes flicker {
          0%,
          18%,
          22%,
          25%,
          53%,
          57%,
          100% {
            text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff,
              0 0 40px #0fa, 0 0 80px #0fa, 0 0 90px #0fa, 0 0 100px #0fa,
              0 0 150px #0fa;
          }
          20%,
          24%,
          55% {
            text-shadow: none;
          }
        }
      `}</style>
    </div>
  );
};

export default function Page() {
  return <HomePage />;
}
