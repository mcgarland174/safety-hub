import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Search, ExternalLink, Filter, X, Info, Plus } from 'lucide-react';
import referencesData from '../data/references_library.json';
import ReferenceSubmissionModal from './ReferenceSubmissionModal';

const ReferencesExplorer: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [yearRange, setYearRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('author');
  const [highlightedCitation, setHighlightedCitation] = useState<string | null>(null);
  const citationRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  // Handle citation highlighting from URL
  useEffect(() => {
    const cite = searchParams.get('cite');
    if (cite) {
      setHighlightedCitation(cite);
      // Scroll to citation after a brief delay to ensure rendering
      setTimeout(() => {
        const element = citationRefs.current.get(cite);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [searchParams]);

  // Get year ranges
  const yearRanges = [
    { value: 'all', label: 'All Years' },
    { value: '2020-2025', label: '2020-2025 (Recent)' },
    { value: '2015-2019', label: '2015-2019' },
    { value: '2010-2014', label: '2010-2014' },
    { value: '2005-2009', label: '2005-2009' },
    { value: '2000-2004', label: '2000-2004' },
    { value: 'pre-2000', label: 'Before 2000' },
  ];

  // Filter and sort references
  const filteredReferences = useMemo(() => {
    let filtered = referencesData.references.filter(ref => {
      // Search filter
      const matchesSearch = searchQuery === '' ||
        ref.fullText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ref.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ref.title.toLowerCase().includes(searchQuery.toLowerCase());

      // Year range filter
      const refYear = parseInt(ref.year.replace(/[a-z]/g, '')) || 0;
      let matchesYear = true;

      if (yearRange !== 'all') {
        if (yearRange === 'pre-2000') {
          matchesYear = refYear < 2000;
        } else {
          const [startYear, endYear] = yearRange.split('-').map(y => parseInt(y));
          matchesYear = refYear >= startYear && refYear <= endYear;
        }
      }

      return matchesSearch && matchesYear;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'author':
          return a.authors.localeCompare(b.authors);
        case 'year-desc':
          const yearA = parseInt(a.year.replace(/[a-z]/g, '')) || 0;
          const yearB = parseInt(b.year.replace(/[a-z]/g, '')) || 0;
          return yearB - yearA;
        case 'year-asc':
          const yearA2 = parseInt(a.year.replace(/[a-z]/g, '')) || 0;
          const yearB2 = parseInt(b.year.replace(/[a-z]/g, '')) || 0;
          return yearA2 - yearB2;
        case 'relevance':
          // If searching, sort by relevance (exact matches first)
          if (searchQuery) {
            const aScore = (a.authors.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 : 0) +
                          (a.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0);
            const bScore = (b.authors.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 : 0) +
                          (b.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0);
            return bScore - aScore;
          }
          return a.authors.localeCompare(b.authors);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, yearRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setYearRange('all');
    setSortBy('author');
  };

  const formatCategoryName = (cat: string) => {
    return cat.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] via-[#FEEAD8] to-[#FFF9F5]">
      <div className="max-w-[1400px] mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-[16px] bg-[#6C3000] flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>
                  References Library
                </h1>
                <p className="text-[#6C3000] mt-1" style={{fontFamily: 'Inter, sans-serif'}}>
                  {referencesData.totalReferences} evidence-based sources supporting this platform
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsSubmissionModalOpen(true)}
              className="px-6 py-3 bg-[#6C3000] hover:bg-[#8B4513] text-white rounded-[12px] font-semibold transition-colors flex items-center gap-2 shadow-lg"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              <Plus className="w-5 h-5" />
              Submit Reference
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-[20px] p-6 shadow-lg border-2 border-[#E8D9C8] mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Search */}
            <div className="md:col-span-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6C3000] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by author, title, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#E8D9C8] rounded-[12px] focus:outline-none focus:border-[#6C3000] text-[#2C1B11]"
                  style={{fontFamily: 'Inter, sans-serif'}}
                />
              </div>
            </div>

            {/* Year Range Filter */}
            <div>
              <label className="block text-sm font-semibold text-[#6C3000] mb-2" style={{fontFamily: 'Inter, sans-serif'}}>
                Year Range
              </label>
              <select
                value={yearRange}
                onChange={(e) => setYearRange(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#E8D9C8] rounded-[12px] focus:outline-none focus:border-[#6C3000] text-[#2C1B11]"
                style={{fontFamily: 'Inter, sans-serif'}}
              >
                {yearRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-[#6C3000] mb-2" style={{fontFamily: 'Inter, sans-serif'}}>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#E8D9C8] rounded-[12px] focus:outline-none focus:border-[#6C3000] text-[#2C1B11]"
                style={{fontFamily: 'Inter, sans-serif'}}
              >
                <option value="author">Author (A-Z)</option>
                <option value="year-desc">Year (Newest First)</option>
                <option value="year-asc">Year (Oldest First)</option>
                {searchQuery && <option value="relevance">Relevance</option>}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-[#FEEAD8] hover:bg-[#E8D9C8] text-[#6C3000] font-semibold rounded-[12px] transition-colors flex items-center justify-center gap-2"
                style={{fontFamily: 'Inter, sans-serif'}}
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="text-sm text-[#6C3000]" style={{fontFamily: 'Inter, sans-serif'}}>
            Showing {filteredReferences.length} of {referencesData.totalReferences} references
          </div>
        </div>

        {/* References List */}
        <div className="space-y-4">
          {filteredReferences.length === 0 ? (
            <div className="bg-white rounded-[20px] p-12 shadow-lg border-2 border-[#E8D9C8] text-center">
              <BookOpen className="w-16 h-16 text-[#E8D9C8] mx-auto mb-4" />
              <p className="text-[#6C3000] text-lg" style={{fontFamily: 'Inter, sans-serif'}}>
                No references found matching your criteria
              </p>
            </div>
          ) : (
            filteredReferences.map((ref, index) => {
              const isHighlighted = ref.id === highlightedCitation;
              return (
                <div
                  key={ref.id}
                  ref={(el) => {
                    if (el) citationRefs.current.set(ref.id, el);
                  }}
                  className={`bg-white rounded-[16px] p-6 shadow-md border-2 transition-all ${
                    isHighlighted
                      ? 'border-[#E6543E] shadow-2xl ring-4 ring-[#E6543E] ring-opacity-20'
                      : 'border-[#E8D9C8] hover:shadow-lg'
                  }`}
                >
                {/* Full citation with inline year */}
                <div className="mb-3">
                  <span className="inline-block text-xs font-bold text-white bg-[#6C3000] px-2 py-0.5 rounded-[6px] mr-2" style={{fontFamily: 'Inter, sans-serif'}}>
                    {ref.year}
                  </span>
                  <p className="inline text-[#2C1B11] leading-relaxed" style={{fontFamily: 'Inter, sans-serif'}}>
                    {ref.fullText}
                  </p>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3">
                  {ref.doi && (
                    <a
                      href={`https://doi.org/${ref.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[#007F6E] hover:text-[#005F52] hover:underline font-semibold transition-colors"
                      style={{fontFamily: 'Inter, sans-serif'}}
                    >
                      <ExternalLink className="w-4 h-4" />
                      DOI: {ref.doi}
                    </a>
                  )}
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[#007F6E] hover:text-[#005F52] hover:underline font-semibold transition-colors break-all"
                      style={{fontFamily: 'Inter, sans-serif'}}
                    >
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{ref.url.length > 60 ? ref.url.substring(0, 60) + '...' : ref.url}</span>
                    </a>
                  )}
                </div>

                {/* Cited in (placeholder for future implementation) */}
                {ref.citedIn && ref.citedIn.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#E8D9C8]">
                    <p className="text-xs text-[#6C3000] font-semibold mb-1" style={{fontFamily: 'Inter, sans-serif'}}>
                      Cited in:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ref.citedIn.map((citation: string) => (
                        <span
                          key={citation}
                          className="text-xs px-2 py-1 bg-[#E6543E] text-white rounded-[6px]"
                          style={{fontFamily: 'Inter, sans-serif'}}
                        >
                          {citation}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-sm text-[#6C3000]" style={{fontFamily: 'Inter, sans-serif'}}>
          <p>Last updated: {referencesData.lastUpdated}</p>
          <p className="mt-2">All references support evidence-based information throughout this platform</p>
        </div>
      </div>

      {/* Reference Submission Modal */}
      <ReferenceSubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
      />
    </div>
  );
};

export default ReferencesExplorer;
