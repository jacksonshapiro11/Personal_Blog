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
        <div className="welcome-section">
          <h1>Welcome to Random Musings and Tame Thoughts!</h1>
          <div className="image-container">
            <img
              src={dailyImage}
              alt="Daily AI Generated"
              style={{ 
                width: "auto", 
                height: "auto",
                maxWidth: "95%",
                maxHeight: "calc(100vh - 150px)", // Reduced margin for header/footer
                objectFit: "contain", 
                borderRadius: "8px",
                margin: "auto",
                display: "block",
              }}
            />
          </div>
        </div>
        <style jsx>{`
          .home-page {
            position: relative;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background: black;
            overflow: hidden;
          }
          .welcome-section {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            position: relative;
          }
          .image-container {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
          }
          h1 {
            text-align: center;
            font-family: "Press Start 2P", cursive;
            color: white;
            margin-bottom: 20px;
            z-index: 2;
          }
          .home-page::before {
            content: '';
            position: absolute;
            width: 200%;
            height: 200%;
            top: -50%;
            left: -50%;
            background-image: 
              /* Galaxies */
              radial-gradient(ellipse at 80% 20%, rgba(186,123,255,0.15) 0%, transparent 70%),
              radial-gradient(ellipse at 20% 70%, rgba(255,123,123,0.15) 0%, transparent 65%),
              /* Planets */
              /* Mercury - small, grey */
              radial-gradient(circle at 75% 80%, rgba(169,169,169,0.8) 0%, rgba(169,169,169,0.4) 0.5%, transparent 1%),
              /* Venus - yellowish */
              radial-gradient(circle at 25% 30%, rgba(255,198,73,0.8) 0%, rgba(255,198,73,0.4) 1%, transparent 1.5%),
              /* Earth - blue-green */
              radial-gradient(circle at 85% 40%, rgba(78,205,196,0.8) 0%, rgba(78,205,196,0.4) 1.2%, transparent 2%),
              /* Mars - red */
              radial-gradient(circle at 15% 60%, rgba(255,107,107,0.8) 0%, rgba(255,107,107,0.4) 0.8%, transparent 1.4%),
              /* Jupiter - largest, orange-brown */
              radial-gradient(circle at 65% 20%, rgba(255,167,38,0.8) 0%, rgba(255,167,38,0.4) 2%, transparent 3%),
              /* Saturn - yellow with rings */
              radial-gradient(circle at 35% 85%, rgba(255,214,102,0.8) 0%, rgba(255,214,102,0.4) 1.5%, transparent 2.2%),
              /* Uranus - pale blue */
              radial-gradient(circle at 55% 50%, rgba(173,216,230,0.8) 0%, rgba(173,216,230,0.4) 1%, transparent 1.8%),
              /* Neptune - deep blue */
              radial-gradient(circle at 90% 70%, rgba(0,127,255,0.8) 0%, rgba(0,127,255,0.4) 1.2%, transparent 2%),
              /* Multiple star layers */
              radial-gradient(1px 1px at 50% 50%, white, rgba(255,255,255,0)),
              radial-gradient(1px 1px at 30% 30%, white, rgba(255,255,255,0)),
              radial-gradient(2px 2px at 40% 60%, rgba(255,255,255,0.8), rgba(255,255,255,0)),
              radial-gradient(2px 2px at 60% 40%, rgba(255,255,255,0.8), rgba(255,255,255,0)),
              radial-gradient(1px 1px at 70% 70%, rgba(255,255,255,0.6), rgba(255,255,255,0));
            background-size: 
              120% 120%,
              120% 120%,
              120% 120%,
              120% 120%,
              120% 120%,
              120% 120%,
              120% 120%,
              120% 120%,
              120% 120%,
              120% 120%,
              200px 200px,
              240px 240px,
              180px 180px,
              160px 160px,
              200px 200px;
            background-position: 
              0 0,
              0 0,
              0 0,
              0 0,
              0 0,
              0 0,
              0 0,
              0 0,
              0 0,
              0 0,
              0 0,
              0 0,
              0 0,
              0 0,
              0 0;
            animation: spaceMove 100s linear infinite;
            transform-origin: center center;
          }

          /* Saturn's rings */
          .home-page::after {
            content: '';
            position: absolute;
            width: 200%;
            height: 200%;
            top: -50%;
            left: -50%;
            background: 
              /* Saturn's rings */
              linear-gradient(75deg, 
                transparent 48%, 
                rgba(255,214,102,0.2) 49%, 
                rgba(255,214,102,0.3) 50%, 
                rgba(255,214,102,0.2) 51%, 
                transparent 52%) 35% 85% / 80px 30px no-repeat;
            animation: spaceMove 100s linear infinite;
            transform-origin: center center;
          }

          @keyframes spaceMove {
            0% {
              transform: rotate(0deg) scale(1.2);
            }
            50% {
              transform: rotate(180deg) scale(1.3);
            }
            100% {
              transform: rotate(360deg) scale(1.2);
            }
          }

          @keyframes starTwinkle {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }

          .shooting-star {
            position: absolute;
            width: 150px;
            height: 1px; /* Made thinner for more natural look */
            background: linear-gradient(90deg, 
              rgba(255,255,255,0.8), 
              rgba(255,255,255,0.4) 20%, 
              transparent);
            opacity: 0;
          }
          .shooting-star:nth-child(1) { top: 5%; left: 0; transform-origin: 0 0; animation: shooting1 4s linear infinite; }
          .shooting-star:nth-child(2) { top: 20%; left: 20%; transform-origin: 0 0; animation: shooting2 4s linear infinite; animation-delay: 0.8s; }
          .shooting-star:nth-child(3) { top: 35%; left: 10%; transform-origin: 0 0; animation: shooting1 4s linear infinite; animation-delay: 1.6s; }
          .shooting-star:nth-child(4) { top: 50%; left: 30%; transform-origin: 0 0; animation: shooting2 4s linear infinite; animation-delay: 2.4s; }
          .shooting-star:nth-child(5) { top: 65%; left: 0; transform-origin: 0 0; animation: shooting1 4s linear infinite; animation-delay: 3.2s; }
          .shooting-star:nth-child(6) { top: 80%; left: 15%; transform-origin: 0 0; animation: shooting2 4s linear infinite; animation-delay: 1.2s; }
          .shooting-star:nth-child(7) { top: 15%; left: 60%; transform-origin: 0 0; animation: shooting1 4s linear infinite; animation-delay: 2.0s; }
          .shooting-star:nth-child(8) { top: 45%; left: 45%; transform-origin: 0 0; animation: shooting2 4s linear infinite; animation-delay: 2.8s; }
          .shooting-star:nth-child(9) { top: 75%; left: 35%; transform-origin: 0 0; animation: shooting1 4s linear infinite; animation-delay: 3.6s; }
          .shooting-star:nth-child(10) { top: 25%; left: 50%; transform-origin: 0 0; animation: shooting2 4s linear infinite; animation-delay: 1.4s; }
          @keyframes shooting1 {
            0% {
              transform: translate(0, 0) rotate(45deg);
              opacity: 0;
            }
            5% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translate(200%, 200%) rotate(45deg);
              opacity: 0;
            }
          }
          @keyframes shooting2 {
            0% {
              transform: translate(0, 0) rotate(35deg);
              opacity: 0;
            }
            5% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translate(180%, 180%) rotate(35deg);
              opacity: 0;
            }
          }
        `}</style>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>
    </Layout>
  );
}
