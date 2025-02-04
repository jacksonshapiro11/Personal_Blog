// pages/reading-list/[slug].js
import Layout from '../../components/Layout';
import { getSortedBooksData, getBookData } from '../../lib/readingList';
import { remark } from 'remark';
import html from 'remark-html';
import { DiscussionEmbed } from 'disqus-react';

export async function getStaticPaths() {
  const allBooksData = getSortedBooksData();
  const paths = allBooksData.map(book => ({ params: { slug: book.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const bookData = getBookData(params.slug);
  const processedContent = await remark().use(html).process(bookData.content);
  const contentHtml = processedContent.toString();
  return { props: { bookData: { ...bookData, contentHtml } } };
}

export default function Book({ bookData }) {
  const disqusShortname = "your-disqus-shortname"; // Replace with your Disqus shortname
  const disqusConfig = {
    url: `http://your-site.com/reading-list/${bookData.slug}`,
    identifier: bookData.slug,
    title: bookData.title,
  };

  return (
    <Layout>
      <article>
        <h1>{bookData.title}</h1>
        <div>
          <h3>My Rating, Comments & Themes</h3>
          <p><strong>Rating:</strong> {bookData.myRating}</p>
          <p><strong>Comments:</strong> {bookData.myComments}</p>
          <p><strong>Themes:</strong> {bookData.myThemes}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: bookData.contentHtml }} />
      </article>
      <section>
        <h2>User Responses</h2>
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </section>
      <style jsx>{`
        .reading-list-page {
          animation: background-color-shift 30s infinite;
          background: linear-gradient(135deg, cyan, salmon, burntorange, purple);
          background-size: 400% 400%;
          height: 100vh;
        }
      `}</style>
    </Layout>
  );
}
