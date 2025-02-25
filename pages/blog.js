// pages/blog.js
import Layout from '../components/Layout';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return { props: { allPostsData } };
}

export default function Blog({ allPostsData }) {
  return (
    <Layout>
      <div className="blog-page">
        <div className="content-container">
          <h1>Blog Posts</h1>
          <div className="book">
            <ul className="post-list">
              {allPostsData.map(({ slug, title, date }) => (
                <li key={slug} className="post-item">
                  <Link href={`/blog/${slug}`} className="post-link">
                    <div className="post-content">
                      <div className="post-header">
                        <h2>{title}</h2>
                        <small className="post-date">{date}</small>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <style jsx>{`
          .content-container {
            padding: 2rem calc(96px + 2rem);
            max-width: 1200px;
            margin: 0 auto;
          }
          .book {
            perspective: 1000px;
          }
          .post-list {
            list-style: none;
            padding: 0;
            transform-style: preserve-3d;
            transition: transform 0.5s;
          }
          .post-item {
            margin-bottom: 0.75rem;
            display: flex;
            transform-origin: left center;
            transition: transform 0.3s ease-out;
            position: relative;
          }
          .post-item:hover {
            transform: rotateY(-15deg);
            z-index: 1;
          }
          .post-link {
            display: block;
            text-decoration: none;
            color: inherit;
            border: 2px solid transparent;
            border-radius: 5px;
            transition: all 0.3s ease-in-out;
            width: 100%;
            overflow: hidden;
            box-shadow: 2px 4px 8px rgba(0,0,0,0.1);
          }
          .post-link:hover {
            animation: rainbow-border 3s infinite;
            transform: translateY(-2px);
          }
          .post-content {
            padding: 1rem 1.5rem;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 3px;
            white-space: nowrap;
            overflow: hidden;
            position: relative;
          }
          .post-content::after {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            width: 30px;
            background: linear-gradient(to right, transparent, rgba(255,255,255,0.9));
            pointer-events: none;
          }
          .post-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
          }
          .post-content h2 {
            margin: 0;
            color: #2c3e50;
            font-size: 2.4rem;
            font-family: 'Courier New', Courier, monospace;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex: 1;
            text-transform: uppercase;
            letter-spacing: -1px;
          }
          .post-date {
            color: #666;
            font-style: italic;
            white-space: nowrap;
            font-size: 1.2rem;
            font-family: 'Courier New', Courier, monospace;
          }
          @keyframes rainbow-border {
            0% { border-color: red; }
            14% { border-color: orange; }
            28% { border-color: yellow; }
            42% { border-color: green; }
            57% { border-color: cyan; }
            71% { border-color: blue; }
            85% { border-color: purple; }
            100% { border-color: red; }
          }
          @media (max-width: 768px) {
            .content-container {
              padding: 1.5rem 2rem;
            }
            .post-content h2 {
              font-size: 1.8rem;
            }
            .post-date {
              font-size: 1rem;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
}
