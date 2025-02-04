// pages/blog/[slug].js
import Layout from '../../components/Layout';
import { getSortedPostsData, getPostData } from '../../lib/posts';
import { remark } from 'remark';
import html from 'remark-html';
import { DiscussionEmbed } from 'disqus-react';

export async function getStaticPaths() {
  const allPostsData = getSortedPostsData();
  const paths = allPostsData.map(post => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.slug);
  const processedContent = await remark().use(html).process(postData.content);
  const contentHtml = processedContent.toString();
  return { props: { postData: { ...postData, contentHtml } } };
}

export default function Post({ postData }) {
  const disqusShortname = "your-disqus-shortname"; // Replace with your actual Disqus shortname
  const disqusConfig = {
    url: `http://your-site.com/blog/${postData.slug}`,
    identifier: postData.slug,
    title: postData.title,
  };

  return (
    <Layout>
      <article>
        <h1>{postData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </Layout>
  );
}
