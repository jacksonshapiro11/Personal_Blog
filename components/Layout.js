// components/Layout.js
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Handle route change events
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <div className="page-wrapper">
      {loading && (
        <div className="page-loading-bar">
          <div className="loading-progress"></div>
        </div>
      )}
      
      <header className="navbar">
        <nav>
          <Link href="/" className="nav-link">Home</Link> |{" "}
          <Link href="/blog" className="nav-link">Blog</Link> |{" "}
          {/* <Link href="/reading-list" className="nav-link">Reading List</Link> |{" "} */}
          {/* <Link href="/admin" className="nav-link">Admin</Link> */}
          <Link href="/notes" className="nav-link">Notes</Link> |{" "}
          <Link href="/login" className="nav-link">Login</Link> |{" "}
        </nav>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} My Cosmic Space</p>
      </footer>

      <style jsx>{`
        .page-wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
        }
        .main-content {
          flex: 1 0 auto;
          margin-top: 50px;
          margin-bottom: 50px; /* Exactly match footer height */
          display: flex;
          flex-direction: column;
        }
        nav a {
          color: white;
          margin: 0 0.5rem;
          text-decoration: none;
        }
        nav a:hover {
          text-decoration: underline;
        }
        .footer {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 50px;
        }
        
        .page-loading-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          z-index: 2000;
          background: rgba(255, 255, 255, 0.2);
          overflow: hidden;
        }
        
        .loading-progress {
          height: 100%;
          width: 100%;
          background: linear-gradient(
            to right,
            #ff0000,
            #ff8000,
            #ffff00,
            #00ff00,
            #00ffff,
            #0000ff,
            #8000ff
          );
          background-size: 200% 100%;
          animation: loading-animation 2s infinite linear, gradient-shift 3s infinite;
        }
        
        @keyframes loading-animation {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
