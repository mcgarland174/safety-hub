import React, { useState, useEffect } from 'react';
import { X, Send, MessageSquare, CheckCircle } from 'lucide-react';
import { useFeedback } from '../contexts/FeedbackContext';

const FeedbackModal: React.FC = () => {
  const { isFeedbackModalOpen, closeFeedbackModal, pageContext, contentContext } = useFeedback();
  const [feedbackType, setFeedbackType] = useState('correction');
  const [subject, setSubject] = useState('');
  const [detailedFeedback, setDetailedFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Google Form configuration
  const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSeeqURw9iwha6kahrw6pnstvuqcB80bQFGe4hJ-XhSr8fWG-w/formResponse';

  // Field IDs from your Google Form (verified via prefill URL)
  const FIELD_IDS = {
    name: 'entry.1857981835',          // Name field
    email: 'entry.1522983172',         // Email (REQUIRED)
    pageSection: 'entry.245620168',    // Page/Section (REQUIRED)
    url: 'entry.794285773',            // URL
    contentReference: 'entry.681488840', // Content Reference (REQUIRED)
    feedbackType: 'entry.1199030960',  // Feedback Type (REQUIRED - Radio)
    detailedFeedback: 'entry.286641150' // Detailed Feedback
  };

  useEffect(() => {
    if (isFeedbackModalOpen) {
      setIsSubmitted(false);
    }
  }, [isFeedbackModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create a hidden form and submit it to a hidden iframe
    const form = document.createElement('form');
    form.action = GOOGLE_FORM_ACTION;
    form.method = 'POST';
    form.target = 'hidden_iframe';
    form.style.display = 'none';

    // Add all form fields
    const nameField = `[${getFeedbackTypeLabel(feedbackType)}] ${subject}`;
    const fields = {
      [FIELD_IDS.name]: nameField,
      [FIELD_IDS.email]: email,
      [FIELD_IDS.pageSection]: pageContext || 'General',  // Ensure not empty
      [FIELD_IDS.url]: window.location.href,
      [FIELD_IDS.contentReference]: contentContext || subject,  // Use subject if contentContext is empty
      [FIELD_IDS.feedbackType]: getFeedbackTypeLabel(feedbackType),
      [FIELD_IDS.detailedFeedback]: detailedFeedback
    };

    // Debug: log the fields being submitted
    console.log('Submitting feedback with fields:', fields);

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value || '';
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    // Show success state immediately
    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after delay
    setTimeout(() => {
      resetForm();
      closeFeedbackModal();
    }, 2000);
  };

  const getFeedbackTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      correction: 'Correction (something is wrong/inaccurate)',
      addition: 'Addition (missing information)',
      question: 'Question (need clarification)',
      general: 'General Feedback'
    };
    return labels[type] || type;
  };

  const resetForm = () => {
    setFeedbackType('correction');
    setSubject('');
    setDetailedFeedback('');
    setEmail('');
    setIsSubmitted(false);
  };

  if (!isFeedbackModalOpen) return null;

  return (
    <>
      <iframe name="hidden_iframe" style={{ display: 'none' }}></iframe>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#007F6E] to-[#005F52] text-white p-6 rounded-t-[24px] sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6" />
              <div>
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Community Feedback
                </h2>
                <p className="text-sm text-[#B3F5E8] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Help us improve the Psychedelic Safety Hub
                </p>
              </div>
            </div>
            <button
              onClick={closeFeedbackModal}
              className="hover:bg-white hover:bg-opacity-20 p-2 rounded-[12px] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success State */}
        {isSubmitted ? (
          <div className="p-12 text-center">
            <CheckCircle className="w-16 h-16 text-[#007F6E] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#2C1B11] mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Thank You!
            </h3>
            <p className="text-[#4E4E4E]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Your feedback has been submitted and will help improve this platform.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Context Display */}
            <div className="bg-[#E6F7F4] border-l-4 border-[#007F6E] p-4 rounded-r-[12px]">
              <p className="text-xs font-semibold text-[#005F52] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                YOU ARE PROVIDING FEEDBACK FOR:
              </p>
              <p className="text-sm text-[#2C1B11] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                {pageContext || 'General Page'}
              </p>
              {contentContext && (
                <p className="text-sm text-[#4E4E4E] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {contentContext}
                </p>
              )}
            </div>

            {/* Feedback Type */}
            <div>
              <label className="block text-sm font-semibold text-[#2C1B11] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Feedback Type <span className="text-red-500">*</span>
              </label>
              <select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-[#E8D9C8] rounded-[12px] focus:outline-none focus:border-[#007F6E] text-[#2C1B11]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <option value="correction">Correction (something is wrong/inaccurate)</option>
                <option value="addition">Addition (missing information)</option>
                <option value="question">Question (need clarification)</option>
                <option value="general">General Feedback</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-[#2C1B11] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                placeholder="Brief summary of your feedback"
                className="w-full px-4 py-3 border-2 border-[#E8D9C8] rounded-[12px] focus:outline-none focus:border-[#007F6E] text-[#2C1B11]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Detailed Feedback */}
            <div>
              <label className="block text-sm font-semibold text-[#2C1B11] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Detailed Feedback <span className="text-red-500">*</span>
              </label>
              <textarea
                value={detailedFeedback}
                onChange={(e) => setDetailedFeedback(e.target.value)}
                required
                rows={5}
                placeholder="Please provide as much detail as possible..."
                className="w-full px-4 py-3 border-2 border-[#E8D9C8] rounded-[12px] focus:outline-none focus:border-[#007F6E] text-[#2C1B11] resize-none"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Email (Required) */}
            <div>
              <label className="block text-sm font-semibold text-[#2C1B11] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border-2 border-[#E8D9C8] rounded-[12px] focus:outline-none focus:border-[#007F6E] text-[#2C1B11]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={closeFeedbackModal}
                className="flex-1 px-6 py-3 border-2 border-[#E8D9C8] text-[#4E4E4E] rounded-[12px] font-semibold hover:bg-[#FFF9F5] transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-[#007F6E] hover:bg-[#005F52] text-white rounded-[12px] font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Feedback
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
    </>
  );
};

export default FeedbackModal;
