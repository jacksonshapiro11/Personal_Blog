// lib/readingList.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const readingListDirectory = path.join(process.cwd(), 'content/reading-list');

export function getSortedBooksData() {
  const fileNames = fs.readdirSync(readingListDirectory);
  const allBooksData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(readingListDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return { slug, ...matterResult.data };
  });
  return allBooksData.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getBookData(slug) {
  const fullPath = path.join(readingListDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  return { slug, content: matterResult.content, ...matterResult.data };
}
