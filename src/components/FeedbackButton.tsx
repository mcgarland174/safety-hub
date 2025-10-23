import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useFeedback } from '../contexts/FeedbackContext';

const FeedbackButton: React.FC = () => {
  const { openFeedbackModal } = useFeedback();

  return (
    <button
      onClick={() => openFeedbackModal()}
      className="fixed bottom-6 right-6 z-40 bg-[#007F6E] hover:bg-[#005F52] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-200 flex items-center gap-3 group"
      title="Provide Feedback"
    >
      <MessageSquare className="w-6 h-6" />
      <span
        className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-semibold"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Suggest Edit
      </span>
    </button>
  );
};

export default FeedbackButton;
