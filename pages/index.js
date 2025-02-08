// pages/index.js
import React from "react";
import Layout from "../components/Layout";

function getDailyAIImage() {
  const images = ["image1.jpg", "image2.jpg", "image3.jpg"];
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return `/images/ai/${images[day % images.length]}`;
}

export default function Home() {
  const dailyImage = getDailyAIImage();
  return (
    <Layout>
      <div className="home-page">
        <div
          className="welcome-section"
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <h1>Welcome to Jackson very tame website!</h1>
          <img
            src={dailyImage}
            alt="Daily AI Generated"
            style={{ maxWidth: "80%", borderRadius: "8px" }}
          />
        </div>
        <style jsx>{`
          .home-page {
            position: relative;
            min-height: 100vh;
            /* Updated retro-inspired background */
            background: linear-gradient(
              135deg,
              cyan,
              salmon,
              burntorange,
              purple
            );
            background-size: 400% 400%;
            animation: background-color-shift 30s infinite;
            color: #222;
          }
          h1 {
            font-family: "Press Start 2P", cursive;
            color:rgb(78, 119, 255);
          }
          @keyframes background-color-shift {
            0% {
              background-position: 0% 50%;
            }
            25% {
              background-position: 100% 50%;
            }
            50% {
              background-position: 0% 50%;
            }
            75% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          header,
          footer {
            background-color: #808080; /* Metallic grey */
            color: white;
            text-align: center;
            padding: 1rem 0;
          }
          header h1,
          footer p {
            margin: 0;
            font-family: "Arial", sans-serif;
            font-size: 1.2rem;
          }
        `}</style>
      </div>
    </Layout>
  );
}
