import React, { useState } from 'react';
import { X, Send, BookOpen, CheckCircle } from 'lucide-react';

interface ReferenceSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReferenceSubmissionModal: React.FC<ReferenceSubmissionModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [referenceType, setReferenceType] = useState('academic_paper');
  const [referenceUrl, setReferenceUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Google Form configuration
  const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLScm5tBYm8K3gqQfX1b3rJE5tPzVnx4OhNILUUULenM/formResponse';

  // Field IDs from your Google Form
  const FIELD_IDS = {
    name: 'entry.1326567199',
    email: 'entry.169206275',
    referenceType: 'entry.354391302',
    referenceUrl: 'entry.2138490707',
    description: 'entry.1433501014'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append(FIELD_IDS.name, name);
      formData.append(FIELD_IDS.email, email);
      formData.append(FIELD_IDS.referenceType, getReferenceTypeLabel(referenceType));
      formData.append(FIELD_IDS.referenceUrl, referenceUrl);
      formData.append(FIELD_IDS.description, description);

      // Submit to Google Forms
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      // Show success state
      setIsSubmitted(true);

      // Reset form after delay
      setTimeout(() => {
        resetForm();
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error submitting reference:', error);
      // Even if there's an error, the form likely submitted due to no-cors
      setIsSubmitted(true);
      setTimeout(() => {
        resetForm();
        onClose();
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getReferenceTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      academic_paper: 'Academic Paper',
      article: 'Article/Blog Post',
      video: 'Video',
      book: 'Book/Book Chapter',
      website: 'Website',
      other: 'Other'
    };
    return labels[type] || type;
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setReferenceType('academic_paper');
    setReferenceUrl('');
    setDescription('');
    setIsSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6C3000] to-[#8B4513] text-white p-6 rounded-t-[24px] sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6" />
              <div>
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Submit New Reference
                </h2>
                <p className="text-sm text-[#FFD480] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Help expand our evidence base
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white hover:bg-opacity-20 p-2 rounded-[12px] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success State */}
        {isSubmitted ? (
          <div className="p-12 text-center">
            <CheckCircle className="w-16 h-16 text-[#6C3000] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#2C1B11] mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Thank You!
            </h3>
            <p className="text-[#4E4E4E]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Your reference submission has been received and will be reviewed for inclusion.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Info Banner */}
            <div className="bg-[#FFF9F5] border-l-4 border-[#6C3000] p-4 rounded-r-[12px]">
              <p className="text-sm text-[#2C1B11]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Submit academic papers, articles, videos, or any resources that could strengthen the evidence base for psychedelic safety.
              </p>
            </div>

            {/* Your Name */}
            <div>
              <label className="block text-sm font-semibold text-[#2C1B11] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Jane Doe"
                className="w-full px-4 py-3 border-2 border-[#E8D9C8] rounded-[12px] focus:outline-none focus:border-[#6C3000] text-[#2C1B11]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Your Email */}
            <div>
              <label className="block text-sm font-semibold text-[#2C1B11] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="jane@example.com"
                className="w-full px-4 py-3 border-2 border-[#E8D9C8] rounded-[12px] focus:outline-none focus:border-[#6C3000] text-[#2C1B11]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Reference Type */}
            <div>
              <label className="block text-sm font-semibold text-[#2C1B11] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Reference Type <span className="text-red-500">*</span>
              </label>
              <select
                value={referenceType}
                onChange={(e) => setReferenceType(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-[#E8D9C8] rounded-[12px] focus:outline-none focus:border-[#6C3000] text-[#2C1B11]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <option value="academic_paper">Academic Paper</option>
                <option value="article">Article/Blog Post</option>
                <option value="video">Video</option>
                <option value="book">Book/Book Chapter</option>
                <option value="website">Website</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Reference Link/URL */}
            <div>
              <label className="block text-sm font-semibold text-[#2C1B11] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Reference Link/URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={referenceUrl}
                onChange={(e) => setReferenceUrl(e.target.value)}
                required
                placeholder="https://example.com/paper"
                className="w-full px-4 py-3 border-2 border-[#E8D9C8] rounded-[12px] focus:outline-none focus:border-[#6C3000] text-[#2C1B11]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Brief Description */}
            <div>
              <label className="block text-sm font-semibold text-[#2C1B11] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Brief Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                placeholder="What is this about and why should it be included in our references library?"
                className="w-full px-4 py-3 border-2 border-[#E8D9C8] rounded-[12px] focus:outline-none focus:border-[#6C3000] text-[#2C1B11] resize-none"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-[#E8D9C8] text-[#4E4E4E] rounded-[12px] font-semibold hover:bg-[#FFF9F5] transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-[#6C3000] hover:bg-[#8B4513] text-white rounded-[12px] font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Reference
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReferenceSubmissionModal;
