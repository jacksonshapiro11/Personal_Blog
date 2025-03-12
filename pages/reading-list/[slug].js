// pages/reading-list/[slug].js
import Layout from "../../components/Layout";
import { getSortedBooksData, getBookData } from "../../lib/readingList";
import { remark } from "remark";
import html from "remark-html";
import React from "react";
import { useSession } from '@supabase/auth-helpers-react'
import Comments from '../../components/Comments'

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
  const session = useSession() // Used for authentication context
  
  return (
    <Layout>
      <div className="background-container">
        <div className="content-container">
          <article className="post-article">
            <header>
              <h1>{bookData.title}</h1>
              <div className="post-meta">
                <time>{bookData.date}</time>
              </div>
            </header>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: bookData.contentHtml }}
            />
          </article>
          
          <Comments postId={bookData.slug} postType="reading-list" />
        </div>
      </div>
      <style jsx>{`
        .background-container {
          background: linear-gradient(-45deg, #ffffff,rgb(89, 148, 202),rgb(240, 245, 90),rgb(34, 227, 34));
          background-size: 400% 400%;
          animation: gradient 5s ease infinite;
          min-height: 100vh;
          padding: 0 20px;
        }
        
        @keyframes gradient {
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

        .content-container {
          background-color: #f5e6c3;
          padding: 3rem 6rem;
          margin: 2rem auto;
          max-width: 1000px;
          display: flex;
          flex-direction: column;
          background-image:
            /* Main coffee cup ring - made MUCH larger and more prominent */
            radial-gradient(
              circle at 85% 15%,
              transparent 40px,
              rgba(101, 67, 33, 0.6) 42px,
              rgba(101, 67, 33, 0.8) 44px,
              rgba(101, 67, 33, 0.6) 46px,
              transparent 48px
            ),
            /* Darker coffee stain under the ring */
            radial-gradient(
              circle at 85% 15%,
              rgba(101, 67, 33, 0.3) 0px,
              transparent 60px
            ),
            /* Additional coffee drips */
            radial-gradient(
              circle at 82% 12%,
              rgba(101, 67, 33, 0.5) 0px,
              transparent 15px
            ),
            radial-gradient(
              circle at 88% 13%,
              rgba(101, 67, 33, 0.4) 0px,
              transparent 12px
            ),
            radial-gradient(
              circle at 87% 18%,
              rgba(101, 67, 33, 0.4) 0px,
              transparent 18px
            ),
            /* Fold lines */
            repeating-linear-gradient(
              to bottom,
              transparent 0,
              transparent calc(35 * 1.8rem - 12px),
              rgba(101, 67, 33, 0.03) calc(35 * 1.8rem - 12px),
              rgba(101, 67, 33, 0.25) calc(35 * 1.8rem - 1px),
              rgba(101, 67, 33, 0.3) calc(35 * 1.8rem),
              rgba(101, 67, 33, 0.25) calc(35 * 1.8rem + 1px),
              rgba(101, 67, 33, 0.03) calc(35 * 1.8rem + 12px),
              transparent calc(35 * 1.8rem + 12px)
            ),
            /* Existing coffee stains */
            radial-gradient(ellipse at 20% 20%, transparent 95%, rgba(101, 67, 33, 0.07) 96%, transparent 100%),
            radial-gradient(ellipse at 80% 30%, transparent 95%, rgba(101, 67, 33, 0.07) 96%, transparent 100%),
            radial-gradient(ellipse at 40% 70%, transparent 95%, rgba(101, 67, 33, 0.07) 96%, transparent 100%),
            radial-gradient(ellipse at 70% 80%, transparent 95%, rgba(101, 67, 33, 0.07) 96%, transparent 100%),
            radial-gradient(ellipse at 30% 40%, transparent 95%, rgba(101, 67, 33, 0.07) 96%, transparent 100%);
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          border-radius: 8px;
          position: relative;
        }

          /* Sharper fold shadow effect */
          .content-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: repeating-linear-gradient(
              to bottom,
              transparent 0,
              transparent calc(35 * 1.8rem - 12px),
              rgba(0, 0, 0, 0.03) calc(35 * 1.8rem - 12px),
              rgba(0, 0, 0, 0.1) calc(35 * 1.8rem - 1px),
              rgba(0, 0, 0, 0.15) calc(35 * 1.8rem),
              rgba(0, 0, 0, 0.1) calc(35 * 1.8rem + 1px),
              rgba(0, 0, 0, 0.03) calc(35 * 1.8rem + 12px),
              transparent calc(35 * 1.8rem + 12px)
            );
            pointer-events: none;
          }

          .post-article {
            flex: 1 0 auto;
            margin-bottom: 2rem;
            position: relative;
            z-index: 1;
          }
          
          header {
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(101, 67, 33, 0.2);
          }
          header h1 {
            font-family: 'Courier New', Courier, monospace;
            font-size: 2.8rem;
            color: #2c3e50;
            text-transform: uppercase;
            letter-spacing: -1px;
            margin: 0;
          }
          .post-meta {
            color: #654321;
            font-style: italic;
            margin-top: 0.5rem;
            font-family: 'Courier New', Courier, monospace;
          }
          .post-content {
            font-family: 'Courier New', Courier, monospace;
            line-height: 1.8;
            color: #2c3e50;
            position: relative;
            z-index: 2;
          }
          .post-content :global(p) {
            margin-bottom: 2.25rem;
            font-size: 1.2rem;
            text-indent: 2rem;
          }
          .post-content :global(h2) {
            font-family: 'Courier New', Courier, monospace;
            font-size: 2rem;
            margin: 2rem 0 1rem 0;
            color: #2c3e50;
            text-transform: uppercase;
            letter-spacing: -1px;
          }
          .post-content :global(h3) {
            font-size: 1.2rem;
            margin: 1.5rem 0 1rem 0;
            color: #2c3e50;
            text-transform: uppercase;
            letter-spacing: -1px;
          }
          .post-content :global(ul), .post-content :global(ol) {
            margin: 1.5rem 0;
            padding-left: 2rem;
          }
          .post-content :global(li) {
            margin-bottom: 0.5rem;
            font-size: 0.96rem;
          }
          .post-content :global(pre) {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 4px;
            overflow-x: auto;
            margin: 1.5rem 0;
          }
          .post-content :global(code) {
            font-family: 'Courier New', Courier, monospace;
            background: #f8f9fa;
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
          }
          .post-content :global(blockquote) {
            border-left: 4px solid #3498db;
            margin: 1.5rem 0;
            padding: 1rem 2rem;
            background: #f8f9fa;
            font-style: italic;
          }

        @media (max-width: 768px) {
          .content-container {
            padding: 1.5rem 2rem;
          }
          header h1 {
            font-size: 1.6rem;
          }
          .post-content :global(p) {
            font-size: 0.8rem;
          }
          .post-content :global(h2) {
            font-size: 1.2rem;
          }
          .post-content :global(h3) {
            font-size: 1rem;
          }
        }
      `}</style>
    </Layout>
  );
}
