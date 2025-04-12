// components/Layout.js
import React from "react";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="page-wrapper">
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
      `}</style>
    </div>
  );
}
