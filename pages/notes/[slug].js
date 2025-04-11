import Layout from '../../components/Layout';
import { getAllNotes } from '../../utils/markdownParser';
import ReactMarkdown from 'react-markdown';

export default function NotePage({ note }) {
  return (
    <Layout>
      <div className="note-page">
        <h1>{note.title}</h1>
        <p className="author">By {note.author}</p>
        
        <div className="tags">
          {note.tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>

        <div className="highlights">
          <h2>Key Highlights</h2>
          {note.highlights.map((highlight, index) => (
            <div key={index} className="highlight-block">
              <blockquote>{highlight.text}</blockquote>
              <div className="highlight-tags">
                {highlight.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
              {highlight.note && (
                <div className="highlight-note">
                  <strong>Note:</strong> {highlight.note}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="content">
          <ReactMarkdown>{note.content}</ReactMarkdown>
        </div>

        <style jsx>{`
          .note-page {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }

          .author {
            color: #666;
            font-style: italic;
          }

          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 20px 0;
          }

          .tag {
            padding: 5px 10px;
            border-radius: 15px;
            background: rgba(255, 255, 255, 0.1);
            color: #666;
          }

          .highlights {
            margin: 30px 0;
          }

          .highlight-block {
            margin: 30px 0;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
          }

          blockquote {
            margin: 10px 0;
            padding: 10px 20px;
            border-left: 4px solid #ff8000;
            background: rgba(255, 255, 255, 0.05);
          }

          .highlight-tags {
            margin: 10px 0;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .highlight-note {
            margin-top: 10px;
            font-style: italic;
            color: #666;
          }

          .content {
            line-height: 1.6;
          }
        `}</style>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const notes = getAllNotes();
  const paths = notes.map(note => ({
    params: { slug: note.slug }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const notes = getAllNotes();
  const note = notes.find(n => n.slug === params.slug);

  return {
    props: {
      note
    }
  };
} 