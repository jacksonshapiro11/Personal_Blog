// pages/blog/[slug].js
import { getAllPostSlugs, getPostData } from '../../lib/posts';
import Layout from '../../components/Layout';
import React from 'react';
import { useSession } from '@supabase/auth-helpers-react'
import Comments from '../../components/Comments'

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
  const [showAiContent, setShowAiContent] = React.useState(false);
  const session = useSession() // Used for authentication context

  // Function to split content into AI and main sections
  const splitContent = React.useMemo(() => {
    const aiStartMarker = "<h3>AI Generated Summary and Takeaways</h3>";
    const aiEndMarker = "<h3>Finally the actual post</h3>";
    
    const contentHtml = postData.contentHtml;
    const aiStart = contentHtml.indexOf(aiStartMarker);
    const aiEnd = contentHtml.indexOf(aiEndMarker);
    
    console.log('Markers found:', {
      start: aiStart,
      end: aiEnd,
      contentHtml: contentHtml.substring(0, 200) // First 200 chars for debugging
    });
    
    if (aiStart === -1 || aiEnd === -1) {
      return {
        beforeAi: "",
        aiContent: "",
        afterAi: contentHtml
      };
    }

    return {
      beforeAi: contentHtml.slice(0, aiStart),
      aiContent: contentHtml.slice(aiStart, aiEnd),
      afterAi: contentHtml.slice(aiEnd)
    };
  }, [postData.contentHtml]);

  return (
    <Layout>
      <div className="background-container">
        <div className="content-container">
          <article className="post-article">
            <header>
              <h1>{postData.title}</h1>
              <div className="post-meta">
                <time>{postData.date}</time>
              </div>
            </header>
            <div className="post-content">
              <div dangerouslySetInnerHTML={{ __html: splitContent.beforeAi }} />
              
              {splitContent.aiContent && (
                <>
                  <button 
                    className="toggle-ai-button"
                    onClick={() => setShowAiContent(!showAiContent)}
                  >
                    {showAiContent ? 'Hide AI Analysis' : 'Show AI Analysis'}
                  </button>
                  
                  <div 
                    className={`ai-content ${showAiContent ? 'visible' : ''}`}
                    dangerouslySetInnerHTML={{ __html: splitContent.aiContent }} 
                  />
                </>
              )}
              
              <div dangerouslySetInnerHTML={{ __html: splitContent.afterAi }} />
            </div>
          </article>
          
          <Comments postId={postData.slug} postType="blog" />
        </div>
      </div>
      <style jsx>{`
        .content-container {
          background: #fff;
          padding: 3rem 6rem;
          margin: 2rem auto;
          max-width: 1000px;
          display: flex;
          flex-direction: column;
          background-color: #f5e6c3;
          background-image: 
            /* Main coffee cup ring - made MUCH larger and more prominent */
            radial-gradient(
              circle at 85% 15%,
              transparent 40px,
              rgba(101, 67, 33, 0.6) 42px,
              rgba(101, 67, 33, 0.8) 44px,
              rgba(101, 67, 33, 0.6) 46px,
              transparent 48px
            ),
            /* Darker coffee stain under the ring */
            radial-gradient(
              circle at 85% 15%,
              rgba(101, 67, 33, 0.3) 0px,
              transparent 60px
            ),
            /* Additional coffee drips */
            radial-gradient(
              circle at 82% 12%,
              rgba(101, 67, 33, 0.5) 0px,
              transparent 15px
            ),
            radial-gradient(
              circle at 88% 13%,
              rgba(101, 67, 33, 0.4) 0px,
              transparent 12px
            ),
            radial-gradient(
              circle at 87% 18%,
              rgba(101, 67, 33, 0.4) 0px,
              transparent 18px
            ),
            /* Fold lines */
            repeating-linear-gradient(
              to bottom,
              transparent 0,
              transparent calc(35 * 1.8rem - 12px),
              rgba(101, 67, 33, 0.03) calc(35 * 1.8rem - 12px),
              rgba(101, 67, 33, 0.25) calc(35 * 1.8rem - 1px),
              rgba(101, 67, 33, 0.3) calc(35 * 1.8rem),
              rgba(101, 67, 33, 0.25) calc(35 * 1.8rem + 1px),
              rgba(101, 67, 33, 0.03) calc(35 * 1.8rem + 12px),
              transparent calc(35 * 1.8rem + 12px)
            ),
            /* Existing coffee stains */
            radial-gradient(ellipse at 20% 20%, transparent 95%, rgba(101, 67, 33, 0.07) 96%, transparent 100%),
            radial-gradient(ellipse at 80% 30%, transparent 95%, rgba(101, 67, 33, 0.07) 96%, transparent 100%),
            radial-gradient(ellipse at 40% 70%, transparent 95%, rgba(101, 67, 33, 0.07) 96%, transparent 100%),
            radial-gradient(ellipse at 70% 80%, transparent 95%, rgba(101, 67, 33, 0.07) 96%, transparent 100%),
            radial-gradient(ellipse at 30% 40%, transparent 95%, rgba(101, 67, 33, 0.07) 96%, transparent 100%);
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          border-radius: 8px;
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
          text-indent: 4rem;
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
          font-family: 'Courier New', Courier, monospace;
          font-size: 1.5rem;
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
          font-size: 1.2rem;
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
            font-size: 2rem;
          }
          .post-content :global(p) {
            font-size: 1rem;
          }
          .post-content :global(h2) {
            font-size: 1.5rem;
          }
          .post-content :global(h3) {
            font-size: 1.25rem;
          }
        }

        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .toggle-ai-button {
          display: inline-block;
          padding: 0.5rem 1rem;
          margin: 1rem 0;
          border: none;
          border-radius: 4px;
          font-family: 'American Typewriter', 'Special Elite', 'Courier Prime', 'Courier New', Courier, monospace;
          cursor: pointer;
          color:rgb(0, 0, 0);
          background: linear-gradient(
            45deg,
            #ff0000,
            #ff7300,
            #fffb00,
            #48ff00,
            #00ffd5,
            #002bff,
            #7a00ff,
            #ff00c8,
            #ff0000
          );
          background-size: 200% 200%;
          animation: rainbow 12s linear infinite;
          transition: transform 0.2s;
        }

        .toggle-ai-button:hover {
          transform: scale(1.05);
        }

        .ai-content {
          display: none;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          border-left: 4px solid #654321;
          padding-left: 1rem;
          margin: 1rem 0;
        }

        .ai-content.visible {
          display: block;
          opacity: 1;
        }
      `}</style>
    </Layout>
  );
}
