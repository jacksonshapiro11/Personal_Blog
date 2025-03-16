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
      <div className="blog-page" style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
        <div className="content-container">
          <h1>Blog</h1>
          <div className="posts-list">
            {allPostsData.map(({ slug, title, date }) => (
              <article key={slug} className="post-item">
                <Link href={`/blog/${slug}`}>
                  <h2>{title}</h2>
                </Link>
                <div className="post-meta">
                  <time>{date}</time>
                </div>
              </article>
            ))}
          </div>
        </div>

        <style jsx>{`
          .content-container {
            padding: 2rem calc(96px + 2rem);
            max-width: 1200px;
            margin: 0 auto;
            background-color: #f5e6c3;
            background-image: 
              /* Coffee stains */
              radial-gradient(ellipse at 20% 20%, transparent 95%, rgba(101, 67, 33, 0.07) 96%, transparent 100%),
              radial-gradient(ellipse at 80% 30%, transparent 95%, rgba(101, 67, 33, 0.07) 96%, transparent 100%),
              radial-gradient(ellipse at 40% 70%, transparent 95%, rgba(101, 67, 33, 0.07) 96%, transparent 100%),
              radial-gradient(ellipse at 70% 80%, transparent 95%, rgba(101, 67, 33, 0.07) 96%, transparent 100%),
              radial-gradient(ellipse at 30% 40%, transparent 95%, rgba(101, 67, 33, 0.07) 96%, transparent 100%);
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border-radius: 8px;
            position: relative;
          }

          h1 {
            font-family: 'American Typewriter', 'Special Elite', 'Courier Prime', 'Courier New', Courier, monospace;
            font-size: 2.8rem;
            color: #2c3e50;
            text-transform: uppercase;
            letter-spacing: -1px;
            margin: 0 0 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(101, 67, 33, 0.2);
          }

          .posts-list {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          .post-item {
            border-bottom: 1px solid rgba(101, 67, 33, 0.1);
            padding-bottom: 2rem;
          }

          .post-item:last-child {
            border-bottom: none;
          }

          .post-item h2 {
            font-family: 'American Typewriter', 'Special Elite', 'Courier Prime', 'Courier New', Courier, monospace;
            font-size: 1.8rem;
            margin: 0 0 0.5rem;
            color: #2c3e50;
            cursor: pointer;
            transition: color 0.2s;
            display: inline-block;
            line-height: 1.2;
          }

          .post-item a {
            text-decoration: none;
            display: inline-block;
          }

          .post-item h2:hover {
            color: #654321;
          }

          .post-meta {
            font-family: 'American Typewriter', 'Special Elite', 'Courier Prime', 'Courier New', Courier, monospace;
            color: #654321;
            font-style: italic;
          }

          @media (max-width: 768px) {
            .content-container {
              padding: 1.5rem 2rem;
            }
            h1 {
              font-size: 2rem;
            }
            .post-item h2 {
              font-size: 1.4rem;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
}
