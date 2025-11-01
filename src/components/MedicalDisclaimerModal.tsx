import React, { useState, useEffect } from 'react';
import { AlertCircle, Shield } from 'lucide-react';

const MedicalDisclaimerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen the disclaimer
    const hasSeenDisclaimer = localStorage.getItem('hasSeenMedicalDisclaimer');

    if (!hasSeenDisclaimer) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('hasSeenMedicalDisclaimer', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
    >
      <div className="bg-[#FFF9F5] rounded-[24px] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#E8D9C8]">
        {/* Header */}
        <div className="bg-[#E6543E] p-6 rounded-t-[24px]">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-full">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 id="disclaimer-title" className="text-2xl font-bold text-white" style={{fontFamily: 'Satoshi, sans-serif'}}>
                Medical Disclaimer
              </h2>
              <p className="text-white/90 text-sm mt-1" style={{fontFamily: 'Inter, sans-serif'}}>
                Beta Version - Currently Under Medical Review
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Beta Notice */}
          <div className="bg-[#F7DCC3] border-2 border-[#E9D5B8] p-4 rounded-[12px]">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-[#F4B63A] rounded-full flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-[#2C1B11]" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-[#2C1B11]" style={{fontFamily: 'Inter, sans-serif'}}>
                  <strong>Beta Version:</strong> This tool is currently undergoing comprehensive medical review to improve accuracy and completeness. Content is being actively refined and verified.
                </p>
              </div>
            </div>
          </div>

          {/* Educational Purpose */}
          <div>
            <h3 className="font-semibold text-[#2C1B11] mb-2 flex items-center gap-2" style={{fontFamily: 'Satoshi, sans-serif'}}>
              <Shield className="w-5 h-5 text-[#003B73]" />
              Educational Information Only
            </h3>
            <p className="text-[#4E4E4E] text-sm leading-relaxed" style={{fontFamily: 'Inter, sans-serif'}}>
              The information provided on this website is for <strong>educational and informational purposes only</strong>. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>

          {/* Consult Healthcare Provider */}
          <div>
            <h3 className="font-semibold text-[#2C1B11] mb-2 flex items-center gap-2" style={{fontFamily: 'Satoshi, sans-serif'}}>
              <AlertCircle className="w-5 h-5 text-[#007F6E]" />
              Always Consult a Healthcare Provider
            </h3>
            <p className="text-[#4E4E4E] text-sm leading-relaxed" style={{fontFamily: 'Inter, sans-serif'}}>
              <strong>Never disregard professional medical advice or delay seeking it</strong> because of information you have read on this website. Always consult with a qualified healthcare provider before making any decisions about your health, medical treatment, or substance use.
            </p>
          </div>

          {/* Emergency Notice */}
          <div className="bg-[#E6543E] p-4 rounded-[12px]">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white" style={{fontFamily: 'Inter, sans-serif'}}>
                  <strong>Medical Emergency:</strong> If you are experiencing a medical emergency, call 911 (US) or your local emergency number immediately.
                </p>
              </div>
            </div>
          </div>

          {/* No Medical Relationship */}
          <div>
            <h3 className="font-semibold text-[#2C1B11] mb-2 flex items-center gap-2" style={{fontFamily: 'Satoshi, sans-serif'}}>
              <AlertCircle className="w-5 h-5 text-[#F4B63A]" />
              No Medical Relationship
            </h3>
            <p className="text-[#4E4E4E] text-sm leading-relaxed" style={{fontFamily: 'Inter, sans-serif'}}>
              Use of this website does not establish a doctor-patient or healthcare provider-patient relationship. The information presented should not be used for diagnosing or treating any health condition.
            </p>
          </div>

          {/* Accuracy Limitations */}
          <div>
            <h3 className="font-semibold text-[#2C1B11] mb-2 flex items-center gap-2" style={{fontFamily: 'Satoshi, sans-serif'}}>
              <AlertCircle className="w-5 h-5 text-[#E6543E]" />
              Accuracy and Completeness
            </h3>
            <p className="text-[#4E4E4E] text-sm leading-relaxed" style={{fontFamily: 'Inter, sans-serif'}}>
              While we strive for accuracy, medical knowledge evolves rapidly and individual circumstances vary significantly. This information may not be complete, up-to-date, or applicable to your specific situation.
            </p>
          </div>

          {/* Legal Notice */}
          <div className="bg-white border-2 border-[#E8D9C8] p-4 rounded-[12px] text-xs text-[#4E4E4E] leading-relaxed" style={{fontFamily: 'Inter, sans-serif'}}>
            <p className="font-semibold mb-2 text-[#2C1B11]">Legal Notice:</p>
            <p>
              By clicking "I Understand" below, you acknowledge that you have read and understood this disclaimer and agree that the creators and contributors of this website are not liable for any decisions you make based on the information provided herein.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-4 rounded-b-[24px] border-t-2 border-[#E8D9C8]">
          <button
            onClick={handleAccept}
            className="w-full bg-[#003B73] hover:bg-[#002951] text-white font-semibold py-3 px-6 rounded-[12px] transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.1)]"
            style={{fontFamily: 'Inter, sans-serif'}}
          >
            I Understand and Agree
          </button>
          <p className="text-center text-xs text-[#6C3000] mt-3" style={{fontFamily: 'Inter, sans-serif'}}>
            This message will only appear once per browser
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicalDisclaimerModal;
