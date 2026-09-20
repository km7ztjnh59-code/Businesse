import React from 'react';
import { ShoppingBag, MessageCircle, ArrowLeft, Cake, Sparkles } from 'lucide-react';
import { PageType, CustomizedOrderItem } from '../types';
import { BAKERY_INFO } from '../data/bakeryData';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

interface StepNavbarProps {
  currentPage: PageType;
  orderItems: CustomizedOrderItem[];
  onNavigate: (page: PageType) => void;
}

export const StepNavbar: React.FC<StepNavbarProps> = ({
  currentPage,
  orderItems,
  onNavigate,
}) => {
  const totalItemCount = orderItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalSubtotal = orderItems.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const steps: { id: PageType; label: string; stepNumber: number }[] = [
    { id: 'home', label: 'Home', stepNumber: 1 },
    { id: 'menu', label: 'Menu & Customize', stepNumber: 2 },
    { id: 'summary', label: 'Order Summary', stepNumber: 3 },
    { id: 'payment', label: 'Payment', stepNumber: 4 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EADBCB] shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-[#3E2723] text-[#FAF7F2] text-[11px] sm:text-xs py-1.5 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
        <span>Freshly baked daily • Free delivery above ₹800 • Direct WhatsApp: <strong>{BAKERY_INFO.displayPhone}</strong></span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[#3E2723] text-[#FAF7F2] flex items-center justify-center shadow-sm group-hover:bg-[#C86D51] transition-colors">
            <Cake className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#231714] block leading-none">
              Jerryyss Bakery
            </span>
            <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-widest text-[#7D6658] font-semibold">
              Fresh Homemade Treats
            </span>
          </div>
        </button>

        {/* 4-Page Step Progress Pill (Hidden on tiny mobile, visible sm+) */}
        <nav aria-label="Order Steps" className="hidden md:flex items-center bg-[#F3ECE2] p-1 rounded-full border border-[#EADBCB]">
          {steps.map((step, idx) => {
            const isActive = currentPage === step.id;
            const isClickable =
              step.id === 'home' ||
              step.id === 'menu' ||
              (step.id === 'summary' && orderItems.length > 0);

            return (
              <React.Fragment key={step.id}>
                {idx > 0 && <div className="w-3 h-px bg-[#D6C4B0] mx-0.5" />}
                <button
                  onClick={() => isClickable && onNavigate(step.id)}
                  disabled={!isClickable && step.id !== currentPage}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#3E2723] text-white shadow-xs font-semibold'
                      : isClickable
                      ? 'text-[#5C4A3E] hover:text-[#231714] hover:bg-white/60 cursor-pointer'
                      : 'text-[#5C4A3E]/40 cursor-not-allowed'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    isActive ? 'bg-[#C86D51] text-white' : 'bg-[#EADBCB] text-[#5C4A3E]'
                  }`}>
                    {step.stepNumber}
                  </span>
                  <span>{step.label}</span>
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Order summary / Cart trigger */}
          {currentPage !== 'summary' && currentPage !== 'payment' && (
            <button
              onClick={() => {
                if (orderItems.length > 0) {
                  onNavigate('summary');
                } else {
                  onNavigate('menu');
                }
              }}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#F3ECE2] hover:bg-[#EADBCB] text-[#3E2723] text-xs sm:text-sm font-semibold border border-[#EADBCB] transition-all cursor-pointer"
              title={orderItems.length > 0 ? "View Order Summary" : "View Menu"}
            >
              <ShoppingBag className="w-4 h-4 text-[#C86D51]" />
              <span className="hidden xs:inline">Order Bag</span>
              {totalItemCount > 0 ? (
                <span className="bg-[#C86D51] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {totalItemCount} (₹{Math.round(totalSubtotal).toLocaleString('en-IN')})
                </span>
              ) : (
                <span className="text-[11px] text-[#7D6658]">0 items</span>
              )}
            </button>
          )}

          {/* WhatsApp Direct Action */}
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-[#2E7D32] hover:bg-[#256628] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer"
            aria-label="WhatsApp Jerryyss Bakery"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Mobile Step Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 bg-[#F3ECE2]/80 border-t border-[#EADBCB] text-xs">
        <span className="text-[#7D6658] font-medium">
          Step {steps.find((s) => s.id === currentPage)?.stepNumber} of 4:
        </span>
        <span className="font-serif font-bold text-[#3E2723]">
          {steps.find((s) => s.id === currentPage)?.label}
        </span>
        {currentPage !== 'home' && (
          <button
            onClick={() => onNavigate(currentPage === 'payment' ? 'summary' : currentPage === 'summary' ? 'menu' : 'home')}
            className="flex items-center gap-1 text-[#C86D51] font-semibold text-xs cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
        )}
      </div>
    </header>
  );
};
