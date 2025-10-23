import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FeedbackContextType {
  pageContext: string;
  contentContext: string;
  setPageContext: (context: string) => void;
  setContentContext: (context: string) => void;
  openFeedbackModal: (specificContext?: string) => void;
  isFeedbackModalOpen: boolean;
  closeFeedbackModal: () => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};

interface FeedbackProviderProps {
  children: ReactNode;
}

export const FeedbackProvider: React.FC<FeedbackProviderProps> = ({ children }) => {
  const [pageContext, setPageContext] = useState('');
  const [contentContext, setContentContext] = useState('');
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const openFeedbackModal = (specificContext?: string) => {
    if (specificContext) {
      setContentContext(specificContext);
    }
    setIsFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
    // Don't clear context immediately - wait for modal animation
    setTimeout(() => {
      setContentContext('');
    }, 300);
  };

  return (
    <FeedbackContext.Provider
      value={{
        pageContext,
        contentContext,
        setPageContext,
        setContentContext,
        openFeedbackModal,
        isFeedbackModalOpen,
        closeFeedbackModal,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
