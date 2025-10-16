import React, { useState, useMemo } from 'react';
import { FileText, Search, Filter, X, AlertCircle, Calendar, Beaker, MapPin } from 'lucide-react';
import caseStudiesData from '../data/case_studies_schema.json';

const CaseStudiesExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubstance, setSelectedSubstance] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCase, setSelectedCase] = useState(null);

  const caseStudies = caseStudiesData.caseStudies;

  // Get unique values for filters
  const substances = useMemo(() => {
    const allSubstances = new Set();
    caseStudies.forEach(cs => {
      cs.substances.forEach(s => allSubstances.add(s));
    });
    return Array.from(allSubstances).sort();
  }, [caseStudies]);

  const years = useMemo(() => {
    const allYears = new Set();
    caseStudies.forEach(cs => {
      if (cs.year) allYears.add(cs.year);
    });
    return Array.from(allYears).sort().reverse();
  }, [caseStudies]);

  // Filter case studies
  const filteredCases = useMemo(() => {
    return caseStudies.filter(cs => {
      const matchesSearch = searchQuery === '' ||
        cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cs.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubstance = selectedSubstance === 'all' ||
        cs.substances.includes(selectedSubstance);

      const matchesSeverity = selectedSeverity === 'all' ||
        cs.severity === selectedSeverity;

      const matchesYear = selectedYear === 'all' ||
        cs.year === selectedYear;

      return matchesSearch && matchesSubstance && matchesSeverity && matchesYear;
    });
  }, [caseStudies, searchQuery, selectedSubstance, selectedSeverity, selectedYear]);

  const substanceColors = {
    psilocybin: '#E6543E',
    lsd: '#F4B63A',
    '2cb': '#007F6E',
    dmt: '#003B73',
    '5meodmt': '#47A8E0',
    ibogaine: '#A33D2C',
    mdma: '#F7DCC3',
    ketamine: '#E9D5B8',
    ayahuasca: '#000000',
    other: '#4E4E4E'
  };

  const substanceNames = {
    psilocybin: 'Psilocybin',
    lsd: 'LSD',
    '2cb': '2C-B',
    dmt: 'DMT',
    '5meodmt': '5-MeO-DMT',
    ibogaine: 'Ibogaine',
    mdma: 'MDMA',
    ketamine: 'Ketamine',
    ayahuasca: 'Ayahuasca',
    other: 'Other/Unknown'
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'moderate': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      case 'fatal': return 'bg-black text-white';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSubstance('all');
    setSelectedSeverity('all');
    setSelectedYear('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedSubstance !== 'all' ||
    selectedSeverity !== 'all' || selectedYear !== 'all';

  // Helper function to parse and format case text
  const parseCaseText = (fullText) => {
    if (!fullText) return { sections: [], caseStudyText: '' };

    const lines = fullText.split('\n');
    const sections = [];
    const fieldPatterns = [
      'Subject identity details:',
      'Setting:',
      'Year:',
      'Substance/Dose – Primary:',
      'Substance(s)/Dose(s) – Secondary:',
      'Confidence level of identification:',
      'Case Report Source:',
      'Case Study Source:',
      'Summary:',
      'Case Study:'
    ];

    let currentSection = null;
    let caseStudyStartIndex = -1;

    lines.forEach((line, idx) => {
      const trimmedLine = line.trim();

      // Check if this line matches any field pattern
      const matchedField = fieldPatterns.find(pattern => trimmedLine.startsWith(pattern));

      if (matchedField) {
        // Save previous section if exists
        if (currentSection) {
          sections.push(currentSection);
        }

        // Check if this is the start of the main case study text
        if (matchedField === 'Case Study:') {
          caseStudyStartIndex = idx;
          currentSection = null;
        } else {
          // Start new section
          const value = trimmedLine.substring(matchedField.length).trim();
          currentSection = {
            label: matchedField.replace(':', ''),
            value: value
          };
        }
      } else if (currentSection && trimmedLine) {
        // Continue building current section value
        currentSection.value += (currentSection.value ? ' ' : '') + trimmedLine;
      }
    });

    // Add last section if exists
    if (currentSection) {
      sections.push(currentSection);
    }

    // Extract case study text (everything after "Case Study:" label)
    let caseStudyText = '';
    if (caseStudyStartIndex >= 0) {
      caseStudyText = lines.slice(caseStudyStartIndex + 1).join('\n').trim();
    }

    return { sections, caseStudyText };
  };

  // Helper function to convert URLs to clickable links and handle line breaks
  const linkifyText = (text) => {
    if (!text) return '';

    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Split by newlines first to preserve paragraph structure
    const lines = text.split('\n');

    return lines.map((line, lineIdx) => {
      // For each line, split by URLs
      const parts = line.split(urlRegex);

      const lineContent = parts.map((part, partIdx) => {
        if (part.match(urlRegex)) {
          return (
            <a
              key={`${lineIdx}-${partIdx}`}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007F6E] hover:underline break-all"
            >
              {part}
            </a>
          );
        }
        return <span key={`${lineIdx}-${partIdx}`}>{part}</span>;
      });

      // Add line break after each line except the last one
      return (
        <React.Fragment key={lineIdx}>
          {lineContent}
          {lineIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5]">
      {/* Header */}
      <div className="max-w-[1280px] mx-auto px-6 pt-8">
        <div className="bg-[#A33D2C] text-white rounded-[24px] shadow-[0_6px_18px_rgba(0,0,0,0.1)] overflow-hidden p-8">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-10 h-10" />
            <div>
              <h1 className="text-4xl font-bold" style={{fontFamily: 'Satoshi, sans-serif'}}>
                Case Studies
              </h1>
              <p className="text-[#F7DCC3] text-lg" style={{fontFamily: 'Inter, sans-serif'}}>
                Real-world documented experiences and adverse events
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-[1280px] mx-auto px-6 mt-6">
        <div className="bg-[#FDE9D6] border-2 border-[#FCA300] rounded-[24px] p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-[#D26600] flex-shrink-0 mt-0.5" />
            <div className="text-sm text-[#6C3000]" style={{fontFamily: 'Inter, sans-serif'}}>
              <strong>Important:</strong> These case studies document real harms and adverse events.
              They are provided for educational purposes to illustrate potential risks. Some content may be distressing.
              <br />
              <em className="text-xs">Source: Psychedelic Safety Institute Case Book, 2025</em>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-[1280px] mx-auto px-6 py-6">
        <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4E4E4E] w-5 h-5" />
              <input
                type="text"
                placeholder="Search case studies by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-[#E8D9C8] rounded-[12px] focus:border-[#FCA300] focus:outline-none"
                style={{fontFamily: 'Inter, sans-serif'}}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Substance Filter */}
            <div>
              <label className="block text-sm font-semibold text-[#2C1B11] mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>
                <Beaker className="w-4 h-4 inline mr-1" />
                Substance
              </label>
              <select
                value={selectedSubstance}
                onChange={(e) => setSelectedSubstance(e.target.value)}
                className="w-full px-3 py-2 border-2 border-[#E8D9C8] rounded-[12px] focus:border-[#FCA300] focus:outline-none"
                style={{fontFamily: 'Inter, sans-serif'}}
              >
                <option value="all">All Substances</option>
                {substances.map(sub => (
                  <option key={sub} value={sub}>{substanceNames[sub] || sub}</option>
                ))}
              </select>
            </div>

            {/* Severity Filter */}
            <div>
              <label className="block text-sm font-semibold text-[#2C1B11] mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>
                <AlertCircle className="w-4 h-4 inline mr-1" />
                Severity
              </label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full px-3 py-2 border-2 border-[#E8D9C8] rounded-[12px] focus:border-[#FCA300] focus:outline-none"
                style={{fontFamily: 'Inter, sans-serif'}}
              >
                <option value="all">All Levels</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
                <option value="fatal">Fatal</option>
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-semibold text-[#2C1B11] mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>
                <Calendar className="w-4 h-4 inline mr-1" />
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border-2 border-[#E8D9C8] rounded-[12px] focus:border-[#FCA300] focus:outline-none"
                style={{fontFamily: 'Inter, sans-serif'}}
              >
                <option value="all">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-[#FEEAD8] text-[#D26600] rounded-[12px] font-semibold hover:bg-[#FFD480] transition-all flex items-center justify-center space-x-2"
                  style={{fontFamily: 'Inter, sans-serif'}}
                >
                  <X className="w-4 h-4" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>
            Showing <strong>{filteredCases.length}</strong> of <strong>{caseStudies.length}</strong> case studies
          </div>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="max-w-[1280px] mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCases.map(cs => (
            <div
              key={cs.id}
              className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.1)] transition-all overflow-hidden border-2 border-[#E8D9C8]"
            >
              {/* Color strip */}
              <div
                className="h-2"
                style={{backgroundColor: substanceColors[cs.substances[0]] || '#4E4E4E'}}
              ></div>

              <div className="p-6">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-[8px] text-xs font-semibold ${getSeverityColor(cs.severity)}`}>
                    {cs.severity.charAt(0).toUpperCase() + cs.severity.slice(1)}
                  </span>
                  {cs.substances.map(sub => (
                    <span
                      key={sub}
                      className="px-2 py-1 rounded-[8px] text-xs font-semibold text-white"
                      style={{backgroundColor: substanceColors[sub] || '#4E4E4E'}}
                    >
                      {substanceNames[sub] || sub}
                    </span>
                  ))}
                  {cs.year && (
                    <span className="px-2 py-1 rounded-[8px] text-xs font-semibold bg-[#E8D9C8] text-[#2C1B11]">
                      {cs.year}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#2C1B11] mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>
                  {cs.title}
                </h3>

                {/* Metadata */}
                <div className="flex flex-wrap gap-3 mb-3 text-sm text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>
                  {cs.setting && cs.setting !== 'Unknown' && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{cs.setting}</span>
                    </div>
                  )}
                  {cs.substanceDetails?.primary && (
                    <div className="flex items-center space-x-1">
                      <Beaker className="w-4 h-4" />
                      <span className="truncate">{cs.substanceDetails.primary}</span>
                    </div>
                  )}
                </div>

                {/* Summary Preview */}
                <p className="text-[#4E4E4E] text-sm leading-relaxed mb-4" style={{fontFamily: 'Inter, sans-serif'}}>
                  {cs.summary.substring(0, 200)}...
                </p>

                {/* Read More Button */}
                <button
                  onClick={() => setSelectedCase(cs)}
                  className="w-full px-4 py-2 bg-[#A33D2C] text-white rounded-[12px] font-semibold hover:opacity-90 transition-all"
                  style={{fontFamily: 'Inter, sans-serif'}}
                >
                  Read Full Case Study
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-[#E8D9C8] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#2C1B11] mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>
              No case studies found
            </h3>
            <p className="text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[24px] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div
              className="text-white p-6 flex items-start justify-between sticky top-0 z-10"
              style={{backgroundColor: substanceColors[selectedCase.substances[0]] || '#4E4E4E'}}
            >
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>
                  {selectedCase.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-[8px] text-sm font-semibold ${getSeverityColor(selectedCase.severity)}`}>
                    {selectedCase.severity.charAt(0).toUpperCase() + selectedCase.severity.slice(1)} Severity
                  </span>
                  {selectedCase.year && (
                    <span className="px-3 py-1 rounded-[8px] text-sm font-semibold bg-white/20">
                      {selectedCase.year}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="ml-4 p-2 hover:bg-white/20 rounded-[12px] transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Quick Facts */}
              <div className="bg-[#FFF9F5] rounded-[12px] p-4 border-2 border-[#E8D9C8]">
                <h3 className="font-bold text-lg text-[#2C1B11] mb-3" style={{fontFamily: 'Satoshi, sans-serif'}}>
                  Quick Facts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm" style={{fontFamily: 'Inter, sans-serif'}}>
                  <div>
                    <strong className="text-[#2C1B11]">Substance:</strong>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {selectedCase.substances.map(sub => (
                        <span
                          key={sub}
                          className="px-2 py-1 rounded-[8px] text-xs font-semibold text-white"
                          style={{backgroundColor: substanceColors[sub] || '#4E4E4E'}}
                        >
                          {substanceNames[sub] || sub}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedCase.substanceDetails?.primary && (
                    <div>
                      <strong className="text-[#2C1B11]">Primary Substance:</strong>
                      <p className="text-[#4E4E4E] mt-1">{selectedCase.substanceDetails.primary}</p>
                    </div>
                  )}
                  {selectedCase.substanceDetails?.confidenceLevel && (
                    <div>
                      <strong className="text-[#2C1B11]">Confidence Level:</strong>
                      <p className="text-[#4E4E4E] mt-1">{selectedCase.substanceDetails.confidenceLevel}</p>
                    </div>
                  )}
                  {selectedCase.setting && selectedCase.setting !== 'Unknown' && (
                    <div>
                      <strong className="text-[#2C1B11]">Setting:</strong>
                      <p className="text-[#4E4E4E] mt-1">{selectedCase.setting}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="font-bold text-xl text-[#2C1B11] mb-3" style={{fontFamily: 'Satoshi, sans-serif'}}>
                  Summary
                </h3>
                <p className="text-[#4E4E4E] leading-relaxed" style={{fontFamily: 'Inter, sans-serif'}}>
                  {selectedCase.summary}
                </p>
              </div>

              {/* Full Case Study */}
              <div>
                <h3 className="font-bold text-xl text-[#2C1B11] mb-3" style={{fontFamily: 'Satoshi, sans-serif'}}>
                  Full Case Description
                </h3>
                {(() => {
                  const { sections, caseStudyText } = parseCaseText(selectedCase.fullText);

                  return (
                    <div className="space-y-4">
                      {/* Metadata Sections */}
                      {sections.length > 0 && (
                        <div className="bg-[#FFF9F5] rounded-[12px] p-4 border-2 border-[#E8D9C8] space-y-3">
                          {sections.map((section, idx) => (
                            <div key={idx} className="text-sm" style={{fontFamily: 'Inter, sans-serif'}}>
                              <div className="font-bold text-[#2C1B11] mb-1">{section.label}:</div>
                              <div className="text-[#4E4E4E] leading-relaxed">
                                {linkifyText(section.value)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Main Case Study Text */}
                      {caseStudyText && (
                        <div>
                          <h4 className="font-bold text-lg text-[#2C1B11] mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>
                            Case Study
                          </h4>
                          <div className="text-[#4E4E4E] leading-relaxed" style={{fontFamily: 'Inter, sans-serif'}}>
                            {linkifyText(caseStudyText)}
                          </div>
                        </div>
                      )}

                      {/* Fallback if parsing fails */}
                      {sections.length === 0 && !caseStudyText && (
                        <div className="text-[#4E4E4E] leading-relaxed" style={{fontFamily: 'Inter, sans-serif'}}>
                          {linkifyText(selectedCase.fullText)}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Close Button */}
              <div className="pt-4 border-t border-[#E8D9C8]">
                <button
                  onClick={() => setSelectedCase(null)}
                  className="w-full px-6 py-3 bg-[#A33D2C] text-white rounded-[12px] font-semibold hover:opacity-90 transition-all"
                  style={{fontFamily: 'Inter, sans-serif'}}
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudiesExplorer;
