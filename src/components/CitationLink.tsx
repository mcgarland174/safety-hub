import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, BookOpen } from 'lucide-react';
import { getReferenceById, getShortCitation } from '../utils/citationUtils';

interface CitationLinkProps {
  citationKey: string;
  showIcon?: boolean;
  className?: string;
}

/**
 * A clickable citation link that navigates to the references page
 */
export const CitationLink: React.FC<CitationLinkProps> = ({
  citationKey,
  showIcon = true,
  className = ''
}) => {
  const navigate = useNavigate();
  const reference = getReferenceById(citationKey);

  if (!reference) {
    return (
      <span className={`text-gray-400 text-xs ${className}`}>
        [{citationKey}]
      </span>
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/references?cite=${citationKey}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-1 text-[#007F6E] hover:text-[#005F52] hover:underline font-semibold transition-colors ${className}`}
      style={{ fontFamily: 'Inter, sans-serif' }}
      title={reference.fullText}
    >
      {showIcon && <BookOpen className="w-3 h-3" />}
      <span className="text-xs">{getShortCitation(reference)}</span>
    </button>
  );
};

interface CitationListProps {
  citationKeys: string[];
  inline?: boolean;
  className?: string;
}

/**
 * Display a list of citations
 */
export const CitationList: React.FC<CitationListProps> = ({
  citationKeys,
  inline = true,
  className = ''
}) => {
  if (!citationKeys || citationKeys.length === 0) {
    return null;
  }

  return (
    <div className={inline ? 'inline-flex flex-wrap gap-2' : 'flex flex-col gap-1'}>
      {citationKeys.map((key, index) => (
        <span key={key}>
          <CitationLink citationKey={key} showIcon={!inline} className={className} />
          {inline && index < citationKeys.length - 1 && <span className="text-gray-400">, </span>}
        </span>
      ))}
    </div>
  );
};

interface CitationBadgeProps {
  citationKey: string;
}

/**
 * Display a citation as a badge/pill
 */
export const CitationBadge: React.FC<CitationBadgeProps> = ({ citationKey }) => {
  const navigate = useNavigate();
  const reference = getReferenceById(citationKey);

  if (!reference) {
    return (
      <span className="inline-block px-2 py-1 bg-gray-200 text-gray-500 text-xs rounded-[6px]">
        [{citationKey}]
      </span>
    );
  }

  const handleClick = () => {
    navigate(`/references?cite=${citationKey}`);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1 px-2 py-1 bg-[#007F6E] hover:bg-[#005F52] text-white text-xs rounded-[6px] transition-colors"
      style={{ fontFamily: 'Inter, sans-serif' }}
      title={reference.fullText}
    >
      <BookOpen className="w-3 h-3" />
      {getShortCitation(reference)}
    </button>
  );
};

export default CitationLink;
