import React from 'react';
import { ArrowRight, Sparkles, Heart, Clock, Star, Flame } from 'lucide-react';
import heroCakeImg from '../assets/images/hero_chocolate_cake_1789897166412.jpg';

interface HeroProps {
  onOrderNowClick: () => void;
  onExploreMenuClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNowClick, onExploreMenuClick }) => {
  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 overflow-hidden bg-[#FAF7F2]"
    >
      {/* Subtle organic decorative background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#F3ECE2]/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-0 w-80 h-80 bg-[#EADBCB]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand & Copy */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Small handwritten bakery badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE2] border border-[#EADBCB] text-[#3E2723] text-sm font-medium mb-6">
              <span className="font-script text-lg text-[#C86D51] font-bold">Baked fresh every morning</span>
              <span className="text-[#A38F78]">•</span>
              <span className="text-xs uppercase tracking-wider text-[#7D6658]">Local Delivery</span>
            </div>

            {/* Brand Title */}
            <h2 className="text-sm sm:text-base md:text-lg tracking-[0.25em] font-semibold text-[#C86D51] uppercase mb-2">
              JERRYYSS BAKERY
            </h2>

            {/* Main Catchphrase */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-[#231714] leading-[1.12] tracking-tight mb-6">
              “Little treats. <br className="hidden sm:inline" />
              <span className="italic font-normal font-serif text-[#3E2723]">Big happiness.”</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#5C4A3E] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
              Freshly baked cakes, brownies, cupcakes and desserts made to order for birthdays, celebrations and everyday cravings.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                id="hero-order-now-btn"
                onClick={onOrderNowClick}
                className="w-full sm:w-auto px-8 py-4 bg-[#C86D51] hover:bg-[#B55C41] text-white text-base font-semibold tracking-wide rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>ORDER NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-explore-menu-btn"
                onClick={onExploreMenuClick}
                className="w-full sm:w-auto px-8 py-4 bg-[#F3ECE2] hover:bg-[#EADBCB] text-[#3E2723] border border-[#DECBC0] text-base font-semibold tracking-wide rounded-full transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>EXPLORE MENU</span>
              </button>
            </div>

            {/* Small Trust Points */}
            <div className="pt-6 border-t border-[#EADBCB]/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 text-sm sm:text-base font-medium text-[#4A3B32]">
              <div className="flex items-center gap-2">
                <span className="text-[#C86D51] text-lg font-bold">♡</span>
                <span>Homemade</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#D98242] text-lg font-bold">✦</span>
                <span>Freshly baked</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C86D51] text-lg font-bold">⌁</span>
                <span>Made to order</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image with Canva-inspired aesthetic card framing */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none">
              {/* Decorative behind-the-card backdrop */}
              <div className="absolute -inset-2 sm:-inset-4 bg-[#EADBCB]/50 rounded-[32px] -rotate-1 transform transition-transform" />
              
              {/* Main Image Container */}
              <div className="relative rounded-[28px] overflow-hidden bg-[#FAF7F2] p-2.5 sm:p-3 border border-[#EADBCB] shadow-xl">
                <div className="relative rounded-[20px] overflow-hidden aspect-[4/3] sm:aspect-[4/3] bg-[#F3ECE2]">
                  <img
                    id="hero-chocolate-cake-img"
                    src={heroCakeImg}
                    alt="Jerryyss Bakery Signature Belgian Chocolate Cake"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle gradient overlay at base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                  {/* Corner Badge */}
                  <div className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#EADBCB] flex items-center gap-1.5 shadow-sm">
                    <Flame className="w-3.5 h-3.5 text-[#C86D51]" />
                    <span className="text-xs font-bold text-[#3E2723] uppercase tracking-wider">Chef’s Special</span>
                  </div>

                  {/* Bottom Image Overlay Label */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-medium tracking-widest uppercase text-[#FAF7F2]/90 font-sans">
                      Our Bestseller
                    </p>
                    <p className="font-serif text-lg font-bold leading-tight">
                      Belgian Chocolate Ganache Drip Cake
                    </p>
                  </div>
                </div>

                {/* Floating Micro-Card / Trust Pill */}
                <div className="mt-3 px-3 py-2 bg-[#F3ECE2]/80 rounded-xl flex items-center justify-between text-xs text-[#5C4A3E]">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-[#D98242] text-[#D98242]" />
                    <span className="font-bold text-[#231714]">4.9 / 5.0</span>
                    <span className="text-[#7D6658]">(240+ local orders)</span>
                  </div>
                  <span className="text-[#C86D51] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> 100% Real Butter
                  </span>
                </div>
              </div>

              {/* Decorative Stamp Tag */}
              <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 bg-[#3E2723] text-[#FAF7F2] p-3.5 sm:p-4 rounded-2xl shadow-lg border border-[#5C4A3E] transform -rotate-6 hidden sm:flex flex-col items-center justify-center">
                <span className="font-script text-xl text-[#FAF7F2]">Fresh daily</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#EADBCB]">Zero Preservatives</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
