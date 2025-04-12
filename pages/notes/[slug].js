import Layout from '../../components/Layout';
import { getAllNotes } from '../../utils/markdownParser';
import Link from 'next/link';

export default function NotePage({ note }) {
  if (!note) return <div>Note not found</div>;

  return (
    <Layout>
      <div className="note-page">
        <div className="note-header">
          <h1>{note.title}</h1>
          <p className="author">By {note.author}</p>
          <div className="tags">
            {note.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        </div>

        <div className="highlights-section">
          <h2>Highlights</h2>
          {note.highlights.map((highlight, index) => (
            <div key={index} className="highlight-card">
              <div className="highlight-text">{highlight.text}</div>
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

        <Link href="/notes" className="back-link">
          ← Back to Notes
        </Link>

        <style jsx>{`
          .note-page {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }

          .note-header {
            margin-bottom: 40px;
            text-align: center;
          }

          h1 {
            margin-bottom: 10px;
            color: white;
          }

          .author {
            color: #666;
            font-style: italic;
            margin-bottom: 20px;
          }

          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;
            margin: 20px 0;
          }

          .tag {
            background: rgba(255, 255, 255, 0.1);
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 0.9em;
          }

          .highlights-section {
            margin: 40px 0;
          }

          .highlight-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border-left: 4px solid #ff8000;
          }

          .highlight-text {
            font-size: 1.1em;
            line-height: 1.6;
            margin-bottom: 15px;
          }

          .highlight-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 10px 0;
          }

          .highlight-note {
            margin-top: 15px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
            font-style: italic;
          }

          .back-link {
            display: inline-block;
            margin-top: 30px;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            transition: all 0.3s ease;
          }

          .back-link:hover {
            background: linear-gradient(
              to right,
              #ff0000,
              #ff8000
            );
            transform: translateX(-5px);
          }
        `}</style>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const notes = getAllNotes();
  const paths = notes.map(note => {
    console.log('Generated path for:', note.title, 'with slug:', note.slug);
    return {
      params: { slug: note.slug }
    };
  });

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  console.log('Attempting to find note with slug:', params.slug);
  const notes = getAllNotes();
  console.log('Available slugs:', notes.map(n => n.slug));
  const note = notes.find(note => {
    console.log('Comparing:', {
      paramSlug: params.slug,
      noteSlug: note.slug,
      matches: note.slug === params.slug
    });
    return note.slug === params.slug;
  });

  if (!note) {
    console.log('Note not found for slug:', params.slug);
    return {
      notFound: true
    };
  }

  return {
    props: {
      note
    }
  };
} 