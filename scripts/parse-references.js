import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the references file
const referencesPath = '/Users/malcolmgarland/Desktop/References - Literature Review (1).txt';
const content = fs.readFileSync(referencesPath, 'utf-8');

// Split into lines and filter out header/empty lines
const lines = content.split('\n').filter(line => {
  const trimmed = line.trim();
  return trimmed && !trimmed.startsWith('References') && !trimmed.startsWith('﻿');
});

// Parse each reference
const references = [];
const citationKeyMap = {};

lines.forEach((line, index) => {
  try {
    // Extract basic info using patterns
    const text = line.trim();

    // Try to extract authors (text before year)
    const yearMatch = text.match(/\((\d{4}[a-z]?)\)/);
    const year = yearMatch ? yearMatch[1] : 'n.d.';

    // Extract first author's last name for citation key
    let firstAuthor = '';
    const authorMatch = text.match(/^([^,.(]+)/);
    if (authorMatch) {
      firstAuthor = authorMatch[1].trim().replace(/[^a-zA-Z]/g, '').toLowerCase();
    }

    // Create citation key
    let citationKey = firstAuthor && year !== 'n.d.'
      ? `${firstAuthor}_${year}`.toLowerCase()
      : `ref_${String(index + 1).padStart(4, '0')}`;

    // Handle duplicates
    let finalKey = citationKey;
    let counter = 1;
    while (citationKeyMap[finalKey]) {
      finalKey = `${citationKey}_${counter}`;
      counter++;
    }
    citationKeyMap[finalKey] = true;

    // Extract DOI
    const doiMatch = text.match(/https:\/\/doi\.org\/([^\s]+)/);
    const doi = doiMatch ? doiMatch[1] : null;

    // Extract URL (non-DOI)
    const urlMatch = text.match(/https?:\/\/[^\s]+/);
    const url = urlMatch ? urlMatch[0] : null;

    // Extract title (text between year and journal/source)
    let title = '';
    if (yearMatch) {
      const afterYear = text.substring(text.indexOf(yearMatch[0]) + yearMatch[0].length).trim();
      // Title usually ends with a period before journal name
      const titleMatch = afterYear.match(/^([^.]+\.)/);
      if (titleMatch) {
        title = titleMatch[1].trim();
      } else {
        // Or just take first chunk
        const chunks = afterYear.split('.');
        title = chunks[0] ? chunks[0].trim() : '';
      }
    }

    // Try to extract journal/source
    let journal = '';
    if (title) {
      const afterTitle = text.substring(text.indexOf(title) + title.length).trim();
      const journalMatch = afterTitle.match(/^([^.]+)\./);
      if (journalMatch) {
        journal = journalMatch[1].replace(/https?:\/\/[^\s]+/g, '').trim();
      }
    }

    // Determine categories based on keywords
    const categories = [];
    const lowerText = text.toLowerCase();
    if (lowerText.includes('safety') || lowerText.includes('adverse') || lowerText.includes('risk')) {
      categories.push('safety');
    }
    if (lowerText.includes('contraindication') || lowerText.includes('interaction')) {
      categories.push('contraindications');
    }
    if (lowerText.includes('harm reduction') || lowerText.includes('therapeutic')) {
      categories.push('harm_reduction');
    }
    if (lowerText.includes('clinical') || lowerText.includes('trial')) {
      categories.push('clinical');
    }
    if (lowerText.includes('mechanism') || lowerText.includes('pharmacology')) {
      categories.push('pharmacology');
    }

    // Default category if none found
    if (categories.length === 0) {
      categories.push('general');
    }

    const reference = {
      id: finalKey,
      fullText: text,
      authors: text.split(/\(\d{4}[a-z]?\)/)[0]?.trim() || '',
      year: year,
      title: title,
      journal: journal,
      doi: doi,
      url: url,
      categories: categories,
      citedIn: [] // Will be populated later by analyzing substance schemas
    };

    references.push(reference);
  } catch (error) {
    console.error(`Error parsing line ${index + 1}:`, error.message);
  }
});

// Sort by first author
references.sort((a, b) => {
  const authorA = a.authors.toLowerCase();
  const authorB = b.authors.toLowerCase();
  return authorA.localeCompare(authorB);
});

// Create the output
const output = {
  version: "1.0",
  lastUpdated: new Date().toISOString().split('T')[0],
  totalReferences: references.length,
  references: references
};

// Write to file
const outputPath = path.join(__dirname, '..', 'src', 'data', 'references_library.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log(`✅ Successfully parsed ${references.length} references`);
console.log(`📝 Written to: ${outputPath}`);
console.log(`\nSample references:`);
references.slice(0, 3).forEach(ref => {
  console.log(`- [${ref.id}] ${ref.authors} (${ref.year})`);
  console.log(`  Title: ${ref.title.substring(0, 80)}...`);
});
