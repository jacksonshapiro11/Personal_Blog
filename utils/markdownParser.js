import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

export function getAllNotes() {
  const notesDirectory = path.join(process.cwd(), 'content/notes');
  
  // Check if directory exists
  if (!fs.existsSync(notesDirectory)) {
    console.warn('Notes directory does not exist:', notesDirectory);
    return [];
  }

  const filenames = fs.readdirSync(notesDirectory);
  
  const notes = filenames.map(filename => {
    const filePath = path.join(notesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Extract title (after the # and before the first newline)
    const titleMatch = fileContents.match(/# (.*?)\n/);
    const title = titleMatch ? titleMatch[1].trim() : '';

    // Parse metadata section
    const metadataMatch = fileContents.match(/### Metadata\n\n([\s\S]*?)(?=###|$)/);
    const metadata = {};
    if (metadataMatch) {
      const metadataLines = metadataMatch[1].split('\n');
      metadataLines.forEach(line => {
        if (line.startsWith('- ')) {
          const [key, value] = line.replace('- ', '').split(': ');
          metadata[key.trim()] = value ? value.trim() : '';
        }
      });
    }

    // Parse highlights section
    const highlightsMatch = fileContents.match(/### Highlights\n\n([\s\S]*?)(?=###|$)/);
    const highlights = [];
    if (highlightsMatch) {
      // Split by bullet points but keep the content
      const highlightBlocks = highlightsMatch[1].split('\n- ').filter(Boolean);
      
      highlightBlocks.forEach(block => {
        const highlightText = block.split('\n    - ')[0].trim();
        const tagsMatch = block.match(/\*\*Tags:\*\* (.*?)(?=\n|$)/);
        const noteMatch = block.match(/\*\*Note:\*\* (.*?)(?=\n|$)/);
        
        const highlight = {
          text: highlightText,
          tags: tagsMatch ? 
            tagsMatch[1].split(', ')
              .map(tag => tag.trim())
              .filter(tag => tag.startsWith('#'))
              .map(tag => tag.substring(1)) : [],
          note: noteMatch ? noteMatch[1].trim() : ''
        };
        
        highlights.push(highlight);
      });
    }

    return {
      slug: filename.replace('.md', ''),
      title,
      author: metadata.Author || '',
      fullTitle: metadata['Full Title'] || '',
      category: metadata.Category || '',
      highlights,
      // Get all unique tags from all highlights
      tags: [...new Set(highlights.flatMap(h => h.tags))],
      content: fileContents
    };
  });

  return notes;
} 