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
  
  // Add pagination state
  const [visibleNotes, setVisibleNotes] = useState([]);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Add loading state
  const [isLoading, setIsLoading] = useState(true);

  // Add page loading state
  const [pageLoading, setPageLoading] = useState(true);

  // Calculate tag frequencies from all notes (not just visible ones)
  const tagFrequencies = notes.reduce((acc, note) => {
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

  // Sort tags by total references
  const sortedTags = Object.keys(tagFrequencies).sort((a, b) => {
    const totalDiff = tagFrequencies[b].totalCount - tagFrequencies[a].totalCount;
    if (totalDiff !== 0) return totalDiff;
    return tagFrequencies[b].bookCount - tagFrequencies[a].bookCount;
  });

  // Add a function to count total tags in a note
  const countNoteTags = (note) => {
    // Get unique tags from the note level
    const bookLevelTags = note.tags ? note.tags.length : 0;
    
    // Count tags from all highlights
    const highlightTags = note.highlights.reduce((count, highlight) => {
      return count + (highlight.tags ? highlight.tags.length : 0);
    }, 0);
    
    return bookLevelTags + highlightTags;
  };

  // Initialize filtered notes with sorted notes on component mount
  useEffect(() => {
    const sortedNotes = [...notes].sort((a, b) => {
      const aTagCount = countNoteTags(a);
      const bTagCount = countNoteTags(b);
      return bTagCount - aTagCount; // Descending order
    });
    
    setFilteredNotes(sortedNotes);
    setIsLoading(false);
  }, [notes]);

  // Filter notes based on search and tags
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = getFilteredNotesBySearch();
      
      if (selectedTags.length > 0) {
        filtered = filtered.filter(note =>
          note.highlights.some(highlight =>
            selectedTags.every(tag => highlight.tags.includes(tag))
          )
        );
      }
      
      // Sort notes by tag count (most tags to least)
      filtered.sort((a, b) => {
        const aTagCount = countNoteTags(a);
        const bTagCount = countNoteTags(b);
        return bTagCount - aTagCount; // Descending order
      });

      setFilteredNotes(filtered);
      setCurrentPage(1);
      setIsLoading(false);
    }, 300);
  }, [searchQuery, selectedTags, searchType]);

  // Update visible notes based on pagination
  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * pageSize;
    setVisibleNotes(filteredNotes.slice(startIndex, endIndex));
  }, [filteredNotes, currentPage, pageSize]);

  // Load more handler
  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setIsLoading(false);
    }, 300);
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

  // Modify the rendering logic to show highlights when tags are selected
  const renderContent = () => {
    if (selectedTags.length === 0) {
      // Show books when no tags are selected
      return visibleNotes.map((note, index) => (
        <div className="note-card" key={`${note.slug}-${index}`}>
          <h3 className="title-container">
            <Link 
              href={`/notes/${encodeURIComponent(note.slug.trim())}`} 
              className="title-link"
            >
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
      // Show highlights that contain selected tags with improved styling
      return visibleNotes.map((note, index) => (
        <div key={`${note.slug}-${index}`} className="note-page">
          <div className="note-header">
            <h1>{note.title}</h1>
            <p className="author">By {note.author}</p>
          </div>

          <div className="highlights-section">
            {note.highlights
              .filter(highlight => 
                selectedTags.every(tag => highlight.tags.includes(tag))
              )
              .map((highlight, hIndex) => (
                <div key={`${note.slug}-highlight-${hIndex}`} className="highlight-block">
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

          <Link href={`/notes/${encodeURIComponent(note.slug.trim())}`} className="view-full-note">
            View Full Note →
          </Link>
        </div>
      )).filter(note => note.props.children[1].props.children.length > 0);
    }
  };

  // Add this useEffect to handle initial page load
  useEffect(() => {
    // Show loading on initial page load
    setPageLoading(true);
    
    // Set timeout to simulate loading and ensure UI feedback
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {pageLoading ? (
        <div className="full-page-loading">
          <div className="loading-animation">
            <div className="loading-spinner"></div>
            <p>Loading Notes Repository...</p>
          </div>
        </div>
      ) : (
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
                {sortedTags.map(tag => (
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
                        📚 {tagFrequencies[tag].bookCount}
                      </span>
                      <span className="total-count" title="Total references">
                        🏷️ {tagFrequencies[tag].totalCount}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            <main className="notes-container">
              {isLoading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Loading notes...</p>
                </div>
              ) : (
                <>
                  {renderContent()}
                  
                  {visibleNotes.length < filteredNotes.length && (
                    <button 
                      className="load-more-btn"
                      onClick={handleLoadMore}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : 'Load More'}
                    </button>
                  )}
                </>
              )}
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
              margin-bottom: 50px;
              background: rgba(255, 255, 255, 0.05);
              padding: 20px;
              border-radius: 8px;
              position: relative;
            }

            .book-highlights::after {
              content: '';
              position: absolute;
              bottom: -25px;
              left: 5%;
              right: 5%;
              height: 2px;
              background: linear-gradient(
                to right,
                transparent,
                rgba(255, 128, 0, 0.5),
                transparent
              );
            }

            .highlights-container {
              position: relative;
              padding-bottom: 10px;
            }

            .highlight-card {
              background: rgba(255, 255, 255, 0.1);
              padding: 20px;
              margin: 30px 0;
              border-radius: 8px;
              border-left: 4px solid #ff8000;
              position: relative;
              border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
              padding-bottom: 30px;
            }

            .highlight-separator {
              height: 2px;
              background: linear-gradient(
                to right,
                transparent, 
                rgba(255, 255, 255, 0.5),
                transparent
              );
              margin-top: 20px;
              margin-bottom: 10px;
              width: 90%;
              margin-left: auto;
              margin-right: auto;
            }

            .highlights-container > .highlight-card:first-child {
              margin-top: 15px;
            }

            .highlight-card:last-child {
              border-bottom: none;
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

            .loading-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              margin: 50px 0;
            }

            .loading-spinner {
              width: 50px;
              height: 50px;
              border: 5px solid rgba(255, 255, 255, 0.3);
              border-radius: 50%;
              border-top-color: #ff8000;
              animation: spin 1s ease-in-out infinite;
              margin-bottom: 20px;
            }

            @keyframes spin {
              to { transform: rotate(360deg); }
            }

            .load-more-btn {
              padding: 12px 24px;
              margin: 20px auto;
              display: block;
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
              background-size: 200% auto;
              border: none;
              border-radius: 25px;
              color: white;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.3s ease;
              animation: gradient-shift 3s infinite;
            }

            .load-more-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 15px rgba(255, 128, 0, 0.4);
            }

            .load-more-btn:disabled {
              opacity: 0.7;
              cursor: not-allowed;
            }

            @keyframes gradient-shift {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }

            .full-page-loading {
              min-height: 80vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2));
            }
            
            .loading-animation {
              text-align: center;
            }
            
            .loading-spinner {
              width: 70px;
              height: 70px;
              border: 6px solid rgba(255, 255, 255, 0.3);
              border-radius: 50%;
              border-top-color: #ff8000;
              animation: spin 1s ease-in-out infinite;
              margin: 0 auto 20px;
            }
            
            @keyframes spin {
              to { transform: rotate(360deg); }
            }

            /* Add these new styles for the highlight view that matches individual note pages */
            .note-page {
              max-width: 800px;
              margin: 0 auto 50px;
              padding: 20px;
              background: rgba(255, 255, 255, 0.05);
              border-radius: 8px;
            }

            .note-header {
              margin-bottom: 30px;
              text-align: center;
            }

            .note-header h1 {
              margin-bottom: 10px;
              color: white;
              font-size: 1.8em;
            }

            .highlights-section {
              margin: 40px 0;
            }

            .highlight-block {
              background: rgba(255, 255, 255, 0.1);
              padding: 20px;
              margin: 20px 0;
              border-radius: 8px;
              border-left: 4px solid #ff8000;
            }

            .highlight-block blockquote {
              margin: 0 0 15px 0;
              padding: 10px 20px;
              border-left: 4px solid rgba(255, 128, 0, 0.5);
              background: rgba(255, 255, 255, 0.05);
              font-size: 1.1em;
              line-height: 1.6;
            }

            .highlight-block .highlight-tags {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
              margin: 15px 0;
            }

            .highlight-block .tag {
              background: rgba(255, 255, 255, 0.1);
              padding: 5px 10px;
              border-radius: 15px;
              font-size: 0.9em;
            }

            .highlight-block .highlight-note {
              margin-top: 15px;
              padding: 15px;
              background: rgba(255, 255, 255, 0.05);
              border-radius: 4px;
              font-style: italic;
            }

            .view-full-note {
              display: inline-block;
              margin-top: 20px;
              padding: 8px 16px;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 20px;
              color: white;
              text-decoration: none;
              transition: all 0.3s ease;
            }

            .view-full-note:hover {
              background: linear-gradient(
                to right,
                #ff0000,
                #ff8000
              );
              transform: translateX(5px);
            }
          `}</style>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const allNotes = getAllNotes();
  
  // Sort notes by tag count (most tags to least)
  const countNoteTags = (note) => {
    const bookLevelTags = note.tags ? note.tags.length : 0;
    const highlightTags = note.highlights.reduce((count, highlight) => {
      return count + (highlight.tags ? highlight.tags.length : 0);
    }, 0);
    return bookLevelTags + highlightTags;
  };
  
  const sortedNotes = allNotes.sort((a, b) => {
    const aTagCount = countNoteTags(a);
    const bTagCount = countNoteTags(b);
    return bTagCount - aTagCount; // Descending order
  });
  
  return {
    props: {
      notes: sortedNotes,
    },
  };
} 