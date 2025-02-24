// components/Layout.js
import React from "react";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <header className="navbar">
        <nav>
          <Link href="/">Home</Link> |{" "}
          <Link href="/blog">Blog</Link> |{" "}
          <Link href="/reading-list">Reading List</Link> |{" "}
          <Link href="/admin">Admin</Link>
        </nav>
      </header>

      <main style={{ 
        marginTop: '50px',
        flex: '1 0 auto' // Allow main content to grow
      }}>
        {children}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} My Cosmic Space</p>
      </footer>

      <style jsx>{`
        nav a {
          color: white;
          margin: 0 0.5rem;
          text-decoration: none;
        }
        nav a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

const styles = {
  footer: {
    backgroundColor: "#808080", // Metallic grey
    color: "white",
    textAlign: "center",
    padding: "1rem 0",
  },
};
