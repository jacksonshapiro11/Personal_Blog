// pages/admin.js
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Admin() {
  const [content, setContent] = useState('');
  const [entryType, setEntryType] = useState('blog');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [myRating, setMyRating] = useState('');
  const [myComments, setMyComments] = useState('');
  const [myThemes, setMyThemes] = useState('');

  const generateMarkdown = () => {
    let frontMatter = `---\ntitle: "${title}"\ndate: "${date}"\n`;
    if (entryType === 'reading-list') {
      frontMatter += `myRating: "${myRating}"\nmyComments: "${myComments}"\nmyThemes: "${myThemes}"\n`;
    }
    frontMatter += `---\n\n${content}\n`;
    return frontMatter;
  };

  return (
    <Layout>
      <h1>Admin Panel</h1>
      <div>
        <label>
          Entry Type:
          <select value={entryType} onChange={e => setEntryType(e.target.value)}>
            <option value="blog">Blog Post</option>
            <option value="reading-list">Reading List Entry</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Date:
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
      </div>
      {entryType === 'reading-list' && (
        <>
          <div>
            <label>
              My Rating:
              <input type="text" value={myRating} onChange={e => setMyRating(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              My Comments:
              <textarea value={myComments} onChange={e => setMyComments(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              My Themes:
              <input type="text" value={myThemes} onChange={e => setMyThemes(e.target.value)} />
            </label>
          </div>
        </>
      )}
      <div>
        <label>
          Content (Markdown):
          <textarea value={content} onChange={e => setContent(e.target.value)} rows="10" cols="50" />
        </label>
      </div>
      <div>
        <h3>Generated Markdown</h3>
        <pre>{generateMarkdown()}</pre>
      </div>
      <p>Copy the above Markdown and save it as a file in the appropriate folder (<code>content/blog</code> or <code>content/reading-list</code>).</p>
    </Layout>
  );
}
