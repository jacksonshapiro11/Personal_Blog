/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllNotes } from '../utils/markdownParser';

export default function Notes({ notes }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchType, setSearchType] = useState('content');
  const [filteredNotes, setFilteredNotes] = useState(notes);

  // Calculate tag frequencies for filtered notes
  const calculateTagFrequencies = (notesToCount) => {
    return notesToCount.reduce((acc, note) => {
      // Get unique tags from the book level
      const bookTags = [...new Set(note.tags)];
      
      bookTags.forEach(tag => {
        if (!acc[tag]) {
          acc[tag] = { bookCount: 0, totalCount: 0 };
        }
        acc[tag].bookCount += 1;
      });

      // Count tags from highlights
      note.highlights.forEach(highlight => {
        highlight.tags.forEach(tag => {
          if (!acc[tag]) {
            acc[tag] = { bookCount: 0, totalCount: 0 };
          }
          acc[tag].totalCount += 1;
        });
      });

      return acc;
    }, {});
  };

  // Filter notes based on search
  const getFilteredNotesBySearch = () => {
    if (!searchQuery) return notes;
    
    const query = searchQuery.toLowerCase();
    
    return notes.filter(note => {
      switch (searchType) {
        case 'tags':
          return note.tags.some(tag => 
            tag.toLowerCase().includes(query)
          ) || note.highlights.some(h => 
            h.tags.some(tag => tag.toLowerCase().includes(query))
          );
        case 'author':
          return note.author.toLowerCase().includes(query);
        case 'category':
          return note.category.toLowerCase().includes(query);
        case 'content':
        default:
          return (
            note.title.toLowerCase().includes(query) ||
            note.highlights.some(h => 
              h.text.toLowerCase().includes(query) ||
              h.note?.toLowerCase().includes(query)
            )
          );
      }
    });
  };

  // Get current tag frequencies based on filtered notes
  const currentTagFrequencies = calculateTagFrequencies(getFilteredNotesBySearch());
  
  // Get current available tags
  const currentTags = Object.keys(currentTagFrequencies).sort((a, b) => {
    const totalDiff = currentTagFrequencies[b].totalCount - currentTagFrequencies[a].totalCount;
    if (totalDiff !== 0) return totalDiff;
    return currentTagFrequencies[b].bookCount - currentTagFrequencies[a].bookCount;
  });

  useEffect(() => {
    let filtered = getFilteredNotesBySearch();
    
    if (selectedTags.length > 0) {
      // When tags are selected, filter notes that have highlights matching all selected tags
      filtered = filtered.filter(note =>
        note.highlights.some(highlight =>
          selectedTags.every(tag => highlight.tags.includes(tag))
        )
      );
    }

    setFilteredNotes(filtered);
  }, [searchQuery, selectedTags, searchType, notes]);

  // Modify the rendering logic to show highlights when tags are selected
  const renderContent = () => {
    if (selectedTags.length === 0) {
      // Show books when no tags are selected
      return filteredNotes.map(note => (
        <div className="note-card" key={note.slug}>
          <h3 className="title-container">
            <Link href={`/notes/${encodeURIComponent(note.slug)}`} className="title-link">
              {note.title}
            </Link>
          </h3>
          <p className="author">By {note.author}</p>
          <p className="category">{note.category}</p>
          <div className="tags">
            {note.tags.slice(0, 5).map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
            {note.tags.length > 5 && <span>...</span>}
          </div>
          {note.highlights && note.highlights[0] && (
            <div className="highlight">
              <p>{note.highlights[0].text.substring(0, 200)}...</p>
            </div>
          )}
        </div>
      ));
    } else {
      // Show highlights that contain selected tags
      return filteredNotes.map(note => (
        <div key={note.slug} className="book-highlights">
          <h3 className="title-container">
            <Link href={`/notes/${encodeURIComponent(note.slug)}`} className="title-link">
              {note.title}
            </Link>
          </h3>
          <p className="author">By {note.author}</p>
          {note.highlights
            .filter(highlight => 
              selectedTags.every(tag => highlight.tags.includes(tag))
            )
            .map((highlight, index) => (
              <div key={`${note.slug}-highlight-${index}`} className="highlight-card">
                <div className="highlight-text">{highlight.text}</div>
                <div className="highlight-tags">
                  {highlight.tags.map(tag => (
                    <span key={tag} className="highlight-tag">#{tag}</span>
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
      )).filter(book => book.props.children[2].length > 0);
    }
  };

  return (
    <Layout>
      <div className="notes-page">
        <div className="search-section">
          <div className="search-type-toggle">
            <button 
              className={`toggle-btn ${searchType === 'content' ? 'active' : ''}`}
              onClick={() => setSearchType('content')}
            >
              Content
            </button>
            <button 
              className={`toggle-btn ${searchType === 'tags' ? 'active' : ''}`}
              onClick={() => setSearchType('tags')}
            >
              Tags
            </button>
            <button 
              className={`toggle-btn ${searchType === 'author' ? 'active' : ''}`}
              onClick={() => setSearchType('author')}
            >
              Author
            </button>
            <button 
              className={`toggle-btn ${searchType === 'category' ? 'active' : ''}`}
              onClick={() => setSearchType('category')}
            >
              Category
            </button>
          </div>
          <input
            type="text"
            placeholder={`Search by ${searchType}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="content-layout">
          <aside className="sidebar">
            <h3>Tags</h3>
            <div className="tags-container">
              {currentTags.map(tag => (
                <button
                  key={tag}
                  className={`tag ${selectedTags.includes(tag) ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTags(prev =>
                      prev.includes(tag)
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    );
                  }}
                >
                  <span className="tag-name">#{tag}</span>
                  <span className="tag-metrics">
                    <span className="book-count" title="Number of books">
                      📚 {currentTagFrequencies[tag].bookCount}
                    </span>
                    <span className="total-count" title="Total references">
                      🏷️ {currentTagFrequencies[tag].totalCount}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <main className="notes-container">
            {renderContent()}
          </main>
        </div>

        <style jsx>{`
          .notes-page {
            padding: 20px;
          }

          .search-section {
            margin-bottom: 30px;
          }

          .search-type-toggle {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
          }

          .toggle-btn {
            padding: 8px 16px;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            transition: all 0.3s ease;
          }

          .toggle-btn.active {
            background: linear-gradient(
              to right,
              #ff0000,
              #ff8000,
              #ffff00,
              #00ff00,
              #00ffff,
              #0000ff,
              #8000ff
            );
            color: white;
          }

          .search-input {
            width: 100%;
            padding: 12px;
            border-radius: 25px;
            border: 2px solid transparent;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            transition: all 0.3s ease;
          }

          .search-input:focus {
            outline: none;
            border-color: #ff8000;
            background: rgba(255, 255, 255, 0.2);
          }

          .content-layout {
            display: grid;
            grid-template-columns: 250px 1fr;
            gap: 30px;
          }

          .sidebar {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 8px;
          }

          .tags-container {
            display: flex;
            flex-direction: column;
            gap: 5px;
            max-height: 500px;
            overflow-y: auto;
          }

          .tag {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 12px;
            border-radius: 15px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            margin: 2px 0;
          }

          .tag-name {
            margin-right: 8px;
            flex-grow: 1;
            text-align: left;
          }

          .tag-metrics {
            display: flex;
            gap: 8px;
            font-size: 0.8em;
          }

          .book-count,
          .total-count {
            background: rgba(255, 255, 255, 0.2);
            padding: 2px 6px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 2px;
          }

          .tag.active {
            background: linear-gradient(
              to right,
              #ff0000,
              #ff8000
            );
            color: white;
          }

          .tag.active .book-count,
          .tag.active .total-count {
            background: rgba(255, 255, 255, 0.3);
          }

          .note-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            transition: all 0.3s ease;
          }

          .note-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }

          .highlight {
            margin-top: 10px;
            font-style: italic;
            color: #666;
          }

          .category {
            color: #666;
            font-size: 0.9em;
            margin: 5px 0;
          }

          @media (max-width: 768px) {
            .content-layout {
              grid-template-columns: 1fr;
            }
          }

          /* Add a custom scrollbar for the tags container */
          .tags-container::-webkit-scrollbar {
            width: 8px;
          }

          .tags-container::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }

          .tags-container::-webkit-scrollbar-thumb {
            background: linear-gradient(
              to bottom,
              #ff0000,
              #ff8000
            );
            border-radius: 4px;
          }

          .book-highlights {
            margin-bottom: 40px;
            background: rgba(255, 255, 255, 0.05);
            padding: 20px;
            border-radius: 8px;
          }

          .highlight-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            margin: 15px 0;
            border-radius: 8px;
            border-left: 4px solid #ff8000;
          }

          .highlight-text {
            font-size: 1.1em;
            line-height: 1.6;
            margin-bottom: 10px;
          }

          .highlight-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 10px 0;
          }

          .highlight-tag {
            background: rgba(255, 255, 255, 0.1);
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.9em;
          }

          .highlight-note {
            margin-top: 10px;
            padding: 10px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
            font-style: italic;
          }

          .title-container {
            margin: 0;
            padding: 0;
            font-size: 1.5em;
          }

          .title-link {
            color: white;
            font-weight: 800;
            text-decoration: none;
            transition: color 0.3s ease;
            cursor: pointer;
            display: inline;
          }

          .title-link:hover {
            color: #ff8000;
          }

          .note-card .title-link,
          .book-highlights .title-link {
            font-weight: 700;
            letter-spacing: 0.5px;
          }
        `}</style>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const notes = getAllNotes();
  
  return {
    props: {
      notes,
    },
  };
} 