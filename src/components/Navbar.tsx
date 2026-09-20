import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle, Menu as MenuIcon, X, Sparkles, Heart } from 'lucide-react';
import { BAKERY_INFO } from '../data/bakeryData';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm py-3 border-b border-[#EADBCB]/60'
            : 'bg-[#FAF7F2]/80 backdrop-blur-sm py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <button
              id="nav-logo-btn"
              onClick={() => handleNavClick('hero')}
              className="text-left group focus:outline-none flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#3E2723] text-[#FAF7F2] flex items-center justify-center font-serif text-xl font-bold shadow-sm transition-transform group-hover:scale-105">
                J
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#231714] group-hover:text-[#C86D51] transition-colors leading-none">
                  Jerryyss Bakery
                </div>
                <div className="text-[11px] uppercase tracking-widest text-[#7D6658] font-medium mt-1 font-sans">
                  Homemade &bull; Baked Daily
                </div>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#4A3B32]">
              <button
                id="nav-link-home"
                onClick={() => handleNavClick('hero')}
                className="hover:text-[#C86D51] transition-colors cursor-pointer py-1"
              >
                Home
              </button>
              <button
                id="nav-link-menu"
                onClick={() => handleNavClick('menu')}
                className="hover:text-[#C86D51] transition-colors cursor-pointer py-1"
              >
                Menu
              </button>
              <button
                id="nav-link-custom-cakes"
                onClick={() => handleNavClick('custom-cakes')}
                className="hover:text-[#C86D51] transition-colors cursor-pointer py-1 flex items-center gap-1.5"
              >
                Custom Cakes
                <span className="text-[10px] bg-[#EADBCB] text-[#3E2723] px-1.5 py-0.5 rounded-full font-semibold">
                  Custom
                </span>
              </button>
              <button
                id="nav-link-story"
                onClick={() => handleNavClick('our-story')}
                className="hover:text-[#C86D51] transition-colors cursor-pointer py-1"
              >
                Our Story
              </button>
              <button
                id="nav-link-gallery"
                onClick={() => handleNavClick('gallery')}
                className="hover:text-[#C86D51] transition-colors cursor-pointer py-1"
              >
                Gallery
              </button>
              <button
                id="nav-link-contact"
                onClick={() => handleNavClick('contact')}
                className="hover:text-[#C86D51] transition-colors cursor-pointer py-1"
              >
                Contact
              </button>
            </nav>

            {/* Action Buttons: Cart & Order on WhatsApp */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Order Bag / Cart Button */}
              <button
                id="navbar-cart-btn"
                onClick={onOpenCart}
                className="relative p-2.5 rounded-full bg-[#F3ECE2] text-[#3E2723] hover:bg-[#EADBCB] transition-colors cursor-pointer flex items-center justify-center shadow-xs"
                title="View your bakery treats order"
                aria-label="View shopping bag"
              >
                <ShoppingBag className="w-5 h-5 text-[#3E2723]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C86D51] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Order on WhatsApp Button */}
              <a
                id="nav-whatsapp-btn"
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 bg-[#2E7D32] hover:bg-[#256628] text-white px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>ORDER ON WHATSAPP</span>
              </a>

              {/* Mobile Hamburger Toggle */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-[#3E2723] hover:bg-[#F3ECE2] transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#FAF7F2] p-6 shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#EADBCB]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#3E2723] text-white flex items-center justify-center font-serif font-bold">
                    J
                  </div>
                  <div>
                    <span className="font-serif font-bold text-lg text-[#231714]">
                      Jerryyss Bakery
                    </span>
                    <p className="text-[10px] text-[#7D6658]">Little treats. Big happiness.</p>
                  </div>
                </div>
                <button
                  id="mobile-menu-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-[#3E2723] hover:bg-[#F3ECE2]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 flex flex-col gap-3 font-medium text-[#3E2723]">
                <button
                  id="mobile-nav-home"
                  onClick={() => handleNavClick('hero')}
                  className="text-left px-3 py-2.5 rounded-lg hover:bg-[#F3ECE2] transition-colors flex items-center justify-between"
                >
                  <span>Home</span>
                  <span className="text-xs text-[#7D6658]">Top</span>
                </button>
                <button
                  id="mobile-nav-menu"
                  onClick={() => handleNavClick('menu')}
                  className="text-left px-3 py-2.5 rounded-lg hover:bg-[#F3ECE2] transition-colors flex items-center justify-between"
                >
                  <span>Explore Menu</span>
                  <span className="text-xs text-[#C86D51] font-semibold">Cakes, Brownies</span>
                </button>
                <button
                  id="mobile-nav-custom-cakes"
                  onClick={() => handleNavClick('custom-cakes')}
                  className="text-left px-3 py-2.5 rounded-lg hover:bg-[#F3ECE2] transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#C86D51]" />
                    Custom Cakes
                  </span>
                  <span className="text-[10px] bg-[#EADBCB] text-[#3E2723] px-1.5 py-0.5 rounded-full font-semibold">
                    Order Builder
                  </span>
                </button>
                <button
                  id="mobile-nav-story"
                  onClick={() => handleNavClick('our-story')}
                  className="text-left px-3 py-2.5 rounded-lg hover:bg-[#F3ECE2] transition-colors flex items-center justify-between"
                >
                  <span>Our Story</span>
                  <Heart className="w-4 h-4 text-[#C86D51]" />
                </button>
                <button
                  id="mobile-nav-gallery"
                  onClick={() => handleNavClick('gallery')}
                  className="text-left px-3 py-2.5 rounded-lg hover:bg-[#F3ECE2] transition-colors"
                >
                  Gallery & Moments
                </button>
                <button
                  id="mobile-nav-contact"
                  onClick={() => handleNavClick('contact')}
                  className="text-left px-3 py-2.5 rounded-lg hover:bg-[#F3ECE2] transition-colors"
                >
                  Contact & FAQs
                </button>
              </div>
            </div>

            {/* Mobile Footer action */}
            <div className="pt-4 border-t border-[#EADBCB] space-y-3">
              <a
                id="mobile-whatsapp-btn"
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#256628] text-white py-3 rounded-xl font-semibold text-sm shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>ORDER ON WHATSAPP</span>
              </a>

              <div className="text-center text-xs text-[#7D6658]">
                Fresh baked daily &bull; Local delivery
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
