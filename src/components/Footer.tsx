import React from 'react';
import { Heart, MessageCircle, Instagram, Mail, Phone, ArrowUp } from 'lucide-react';
import { BAKERY_INFO } from '../data/bakeryData';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#3E2723] text-[#FAF7F2] pt-16 pb-12 border-t border-[#2C1810]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#3E2723] flex items-center justify-center font-serif text-xl font-bold">
                J
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F2]">
                  Jerryyss Bakery
                </span>
                <p className="font-script text-base text-[#EADBCB] leading-none">
                  “Little treats. Big happiness.”
                </p>
              </div>
            </div>

            <p className="text-sm text-[#EADBCB]/80 leading-relaxed max-w-sm">
              {BAKERY_INFO.tagline}. Handcrafted with love by Head Chef <strong className="text-white font-semibold">{BAKERY_INFO.chefName}</strong> in small batches with European butter and Belgian chocolate.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#2E7D32] flex items-center justify-center text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={BAKERY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#C86D51] text-white text-xs font-semibold transition-colors"
                aria-label={`Instagram ${BAKERY_INFO.instagram}`}
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>{BAKERY_INFO.instagram}</span>
              </a>
              <a
                href={`mailto:${BAKERY_INFO.email}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D98242] flex items-center justify-center text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-base text-[#FAF7F2] tracking-wider uppercase text-xs">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#EADBCB]/80">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fresh Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('custom-cakes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Custom Cake Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('our-story')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Creations Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Kitchen Schedule */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-base text-[#FAF7F2] tracking-wider uppercase text-xs">
              Bake Schedules & Notice
            </h4>
            <div className="text-xs sm:text-sm text-[#EADBCB]/80 space-y-2">
              <p>
                <strong className="text-white block">Monday – Saturday:</strong>
                8:00 AM – 7:30 PM
              </p>
              <p>
                <strong className="text-white block">Sunday Special Bakes:</strong>
                9:00 AM – 4:00 PM
              </p>
              <p className="pt-2 text-xs text-[#EADBCB]/60 italic">
                *Cakes require 24–48 hours advance booking. Brownies and cookies baked daily.
              </p>
            </div>
          </div>

          {/* WhatsApp Direct Banner */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-base text-[#FAF7F2] tracking-wider uppercase text-xs">
              Direct Order
            </h4>
            <p className="text-xs text-[#EADBCB]/80 leading-relaxed">
              Order directly via WhatsApp for fast responses and bespoke flavor requests.
            </p>
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2E7D32] hover:bg-[#256628] text-white px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm w-full justify-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright & credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EADBCB]/70">
          <p className="flex items-center gap-1 flex-wrap">
            &copy; {new Date().getFullYear()} Jerryyss Bakery. Head Chef <strong className="text-white font-medium">{BAKERY_INFO.chefName}</strong>. Handcrafted with
            <Heart className="w-3.5 h-3.5 fill-[#C86D51] text-[#C86D51] inline" /> for sweet celebrations.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#EADBCB] hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
