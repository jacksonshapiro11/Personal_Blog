// pages/reading-list.js
import Layout from '../components/Layout';
import { getSortedBooksData } from '../lib/readingList';

export async function getStaticProps() {
  const allBooksData = getSortedBooksData();
  return { props: { allBooksData } };
}

export default function ReadingList({ allBooksData }) {
  return (
    <Layout>
      <div className="reading-list-page">
        <h1>Reading List</h1>
        <ul>
          {allBooksData.map(({ slug, title, date }) => (
            <li key={slug}>
              <a href={`/reading-list/${slug}`}>{title}</a>
              <br />
              <small>{date}</small>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
