import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end flex-col gap-2">
      {/* Friendly small speech bubble */}
      {showTooltip && (
        <div className="relative bg-white text-[#231714] text-xs font-medium py-2 px-3.5 rounded-2xl shadow-lg border border-[#EADBCB] flex items-center gap-2 max-w-[200px] animate-bounce">
          <span>Need a fresh treat or custom cake? Chat with us!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#7D6658] hover:text-black p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
          {/* Arrow */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-[#EADBCB] rotate-45" />
        </div>
      )}

      {/* Main Floating Button */}
      <a
        id="floating-whatsapp-btn"
        href={getGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#2E7D32] hover:bg-[#256628] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 cursor-pointer group"
        aria-label="Chat on WhatsApp with Jerryyss Bakery"
      >
        <MessageCircle className="w-7 h-7 fill-white/20 transition-transform group-hover:scale-110" />
      </a>
    </div>
  );
};
