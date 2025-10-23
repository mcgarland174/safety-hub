import referencesData from '../data/references_library.json';

export interface Citation {
  id: string;
  fullText: string;
  authors: string;
  year: string;
  title: string;
  journal: string;
  doi: string | null;
  url: string | null;
  categories: string[];
  citedIn: string[];
}

/**
 * Get a reference by its citation key
 */
export const getReferenceById = (citationKey: string): Citation | undefined => {
  return referencesData.references.find(ref => ref.id === citationKey);
};

/**
 * Get multiple references by their citation keys
 */
export const getReferencesByIds = (citationKeys: string[]): Citation[] => {
  return citationKeys
    .map(key => getReferenceById(key))
    .filter((ref): ref is Citation => ref !== undefined);
};

/**
 * Format a citation for display (APA-like style)
 */
export const formatCitation = (citation: Citation): string => {
  return citation.fullText;
};

/**
 * Get a short citation format (e.g., "Author, Year")
 */
export const getShortCitation = (citation: Citation): string => {
  // Extract first author's last name
  const firstAuthor = citation.authors.split(',')[0]?.split('&')[0]?.trim() || 'Unknown';
  return `${firstAuthor}, ${citation.year}`;
};

/**
 * Create a link to the references page with a specific citation highlighted
 */
export const getCitationLink = (citationKey: string): string => {
  return `/references?cite=${citationKey}`;
};

/**
 * Parse citation keys from a data object (recursively search for "citations" arrays)
 */
export const extractCitationsFromData = (data: any, context: string = ''): Map<string, string[]> => {
  const citationMap = new Map<string, string[]>();

  const traverse = (obj: any, path: string) => {
    if (!obj || typeof obj !== 'object') return;

    if (Array.isArray(obj)) {
      obj.forEach((item, index) => traverse(item, `${path}[${index}]`));
    } else {
      Object.entries(obj).forEach(([key, value]) => {
        if (key === 'citations' && Array.isArray(value)) {
          value.forEach((citationKey: string) => {
            if (!citationMap.has(citationKey)) {
              citationMap.set(citationKey, []);
            }
            citationMap.get(citationKey)!.push(context || path);
          });
        } else {
          traverse(value, path ? `${path}.${key}` : key);
        }
      });
    }
  };

  traverse(data, '');
  return citationMap;
};

/**
 * Build a reverse index of where each citation is used across all substances
 */
export const buildCitationIndex = async (): Promise<Map<string, Set<string>>> => {
  const index = new Map<string, Set<string>>();

  // This would be called at build time or when references are loaded
  // For now, return empty - will be populated when we scan substance files

  return index;
};

/**
 * Check if a citation exists in the library
 */
export const citationExists = (citationKey: string): boolean => {
  return referencesData.references.some(ref => ref.id === citationKey);
};

/**
 * Get all unique categories from references
 */
export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  referencesData.references.forEach(ref => {
    ref.categories.forEach(cat => categories.add(cat));
  });
  return Array.from(categories).sort();
};

/**
 * Search references by query string
 */
export const searchReferences = (query: string): Citation[] => {
  const lowerQuery = query.toLowerCase();
  return referencesData.references.filter(ref =>
    ref.fullText.toLowerCase().includes(lowerQuery) ||
    ref.authors.toLowerCase().includes(lowerQuery) ||
    ref.title.toLowerCase().includes(lowerQuery)
  );
};
