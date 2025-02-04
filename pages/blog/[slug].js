// pages/blog/[slug].js
import { getAllPostSlugs, getPostData } from '../../lib/posts';
import Layout from '../../components/Layout';
import React from 'react';

export async function getStaticPaths() {
  const paths = getAllPostSlugs().map((slug) => ({
    params: { slug }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug);
  return { props: { postData } };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <div className="post-page">
        <h1>{postData.title}</h1>
        <h3>{postData.date}</h3>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </div>
      <style jsx>{`
        .post-content {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .post-content p {
          margin-bottom: 1rem;
        }
        .post-content h1, .post-content h2, .post-content h3 {
          color: #ff4e50;
        }
        .post-content pre {
          background-color: #f4f4f4;
          padding: 1rem;
          border-radius: 5px;
          overflow-x: auto;
        }
        .post-content code {
          background-color: #f4f4f4;
          padding: 0.2rem 0.4rem;
          border-radius: 5px;
        }
        .post-content ul, .post-content ol {
          margin-left: 2rem;
        }
      `}</style>
    </Layout>
  );
}
