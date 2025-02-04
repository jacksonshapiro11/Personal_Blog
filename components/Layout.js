// components/Layout.js
import React from "react";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <header style={styles.header}>
        <nav>
          <Link href="/">Home</Link> |{" "}
          <Link href="/blog">Blog</Link> |{" "}
          <Link href="/reading-list">Reading List</Link> |{" "}
          <Link href="/admin">Admin</Link>
        </nav>
      </header>

      <main>{children}</main>

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} My Cosmic Space</p>
      </footer>

      <style jsx>{`
        nav a {
          color: white;
          margin: 0 0.5rem;
          text-decoration: none;
        }
        nav a:hover {
          color: #ff4e50;
        }
      `}</style>
    </div>
  );
}

const styles = {
  header: {
    backgroundColor: "#808080", // Metallic grey
    color: "white",
    textAlign: "center",
    padding: "1rem 0",
  },
  footer: {
    backgroundColor: "#808080", // Metallic grey
    color: "white",
    textAlign: "center",
    padding: "1rem 0",
  },
};
