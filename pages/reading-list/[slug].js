// pages/reading-list/[slug].js
import Layout from '../../components/Layout'
import { getAllBookIds, getBookData } from '../../lib/readingList'
import Comments from '../../components/Comments'

// Generate all possible paths for reading list entries
export async function getStaticPaths() {
  const paths = getAllBookIds()
  return {
    paths,
    fallback: false
  }
}

// Fetch data for a single reading list entry
export async function getStaticProps({ params }) {
  const bookData = await getBookData(params.slug)
  return {
    props: {
      bookData
    }
  }
}

export default function Book({ bookData }) {
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
          background: linear-gradient(-45deg, #ffffff, #e6f3ff, #fff9e6, #e6ffe6);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
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
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
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
