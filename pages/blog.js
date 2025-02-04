// pages/blog.js
import Layout from '../components/Layout';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return { props: { allPostsData } };
}

export default function Blog({ allPostsData }) {
  return (
    <Layout>
      <div className="blog-page">
        <h1>Blog</h1>
        <ul>
          {allPostsData.map(({ slug, title, date }) => (
            <li key={slug}>
              <a href={`/blog/${slug}`}>{title}</a>
              <br />
              <small>{date}</small>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
