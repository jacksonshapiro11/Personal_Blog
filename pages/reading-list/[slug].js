// pages/reading-list/[slug].js
import Layout from "../../components/Layout";
import { getSortedBooksData, getBookData } from "../../lib/readingList";
import { remark } from "remark";
import html from "remark-html";
import React from "react";

// Generate all possible paths for reading list entries
export async function getStaticPaths() {
  const allBooksData = getSortedBooksData();
  const paths = allBooksData.map((book) => ({
    params: { slug: book.slug },
  }));
  return { paths, fallback: false };
}

// Fetch data for a single reading list entry
export async function getStaticProps({ params }) {
  const bookData = getBookData(params.slug);
  // Process the Markdown content to HTML
  const processedContent = await remark().use(html).process(bookData.content);
  const contentHtml = processedContent.toString();

  return { props: { bookData: { ...bookData, contentHtml } } };
}

export default function Book({ bookData }) {
  return (
    <Layout>
      <div className="book-page">
        <h1>{bookData.title}</h1>
        <h3>{bookData.date}</h3>
        {/* Render the reading list entry content */}
        <div
          className="book-content"
          dangerouslySetInnerHTML={{ __html: bookData.contentHtml }}
        />
      </div>
      <style jsx>{`
        .book-page {
          padding: 2rem;
        }
        .book-content {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .book-content p {
          margin-bottom: 1rem;
        }
        .book-content h1,
        .book-content h2,
        .book-content h3 {
          color: #ff4e50;
        }
        .book-content pre {
          background-color: #f4f4f4;
          padding: 1rem;
          border-radius: 5px;
          overflow-x: auto;
        }
        .book-content code {
          background-color: #f4f4f4;
          padding: 0.2rem 0.4rem;
          border-radius: 5px;
        }
        .book-content ul,
        .book-content ol {
          margin-left: 2rem;
        }
      `}</style>
    </Layout>
  );
}
