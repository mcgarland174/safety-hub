import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import referencesData from '../data/references_library.json';

interface CitationTextProps {
  text: string;
  className?: string;
}

/**
 * Parses citation text like "Anderson et al. 2020; Wsol et al. 2023"
 * and makes each citation clickable, linking to the references page
 */
export const CitationText: React.FC<CitationTextProps> = ({ text, className = '' }) => {
  const navigate = useNavigate();

  // Function to find a reference by author and year
  const findReference = (authorYear: string) => {
    const cleaned = authorYear.trim();

    // Try to extract author name and year
    const match = cleaned.match(/^(.+?)\s+(\d{4}[a-z]?)/);
    if (!match) return null;

    const [, authorPart, year] = match;
    const firstAuthor = authorPart.replace(/et al\.?/i, '').replace(/,/g, '').trim().toLowerCase();

    // Search for matching reference
    return referencesData.references.find(ref => {
      const refAuthors = ref.authors.toLowerCase();
      const refYear = ref.year;

      // Check if the first author name appears in the reference authors
      // and the year matches
      return refAuthors.includes(firstAuthor) && refYear === year;
    });
  };

  // Split by semicolon to get individual citations
  const citations = text.split(';').map(c => c.trim());

  return (
    <span className={className}>
      {citations.map((citation, index) => {
        const reference = findReference(citation);

        if (reference) {
          return (
            <React.Fragment key={index}>
              <button
                onClick={() => navigate(`/references?cite=${reference.id}`)}
                className="text-[#007F6E] hover:text-[#005F52] hover:underline font-medium transition-colors inline-flex items-center gap-1"
                style={{ fontFamily: 'Inter, sans-serif' }}
                title={`View full reference: ${reference.fullText.substring(0, 100)}...`}
              >
                <BookOpen className="w-3 h-3 inline" />
                {citation}
              </button>
              {index < citations.length - 1 && <span>; </span>}
            </React.Fragment>
          );
        }

        // If no reference found, just display the text
        return (
          <React.Fragment key={index}>
            <span>{citation}</span>
            {index < citations.length - 1 && <span>; </span>}
          </React.Fragment>
        );
      })}
    </span>
  );
};

interface EvidenceDisplayProps {
  citations: string;
  className?: string;
}

/**
 * Display evidence citations with book icon
 */
export const EvidenceDisplay: React.FC<EvidenceDisplayProps> = ({ citations, className = '' }) => {
  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <BookOpen className="w-4 h-4 text-[#6C3000] flex-shrink-0 mt-0.5" />
      <div className="text-sm">
        <span className="font-semibold text-[#6C3000]" style={{ fontFamily: 'Inter, sans-serif' }}>
          Evidence:{' '}
        </span>
        <CitationText text={citations} />
      </div>
    </div>
  );
};

export default CitationText;
