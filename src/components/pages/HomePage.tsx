import React from 'react';
import { ArrowRight, Sparkles, Heart, Clock, Award, ShieldCheck, MessageCircle, Star, Instagram } from 'lucide-react';
import { BAKERY_INFO, TESTIMONIALS, GALLERY_ITEMS, FALLBACK_CAKE_IMAGE } from '../../data/bakeryData';
import { getGeneralWhatsAppUrl } from '../../utils/whatsapp';

interface HomePageProps {
  onProceedToMenu: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onProceedToMenu }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20 bg-radial-[at_top_center] from-[#F8F1E7] to-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Brand Tagline Badge */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EADBCB]/60 border border-[#D6C4B0] text-xs font-semibold tracking-wide text-[#5C4A3E]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
                  <span>{BAKERY_INFO.tagline}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3E2723] text-[#FAF7F2] text-xs font-semibold tracking-wide shadow-2xs">
                  <span>Chef: {BAKERY_INFO.chefName}</span>
                </div>
              </div>

              {/* Major Heading */}
              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#231714] leading-[1.12]">
                  JERRYYSS BAKERY
                </h1>
                <p className="font-serif italic text-2xl sm:text-3xl text-[#C86D51] font-normal font-handwriting">
                  “Little treats. Big happiness.”
                </p>
              </div>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#5C4A3E] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Freshly baked cakes, brownies, cupcakes, and desserts made to order by Head Chef <strong className="text-[#231714] font-semibold">{BAKERY_INFO.chefName}</strong>. Prepared in our home kitchen with real butter, Belgian chocolate, and pure passion.
              </p>

              {/* Trust Points */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-1 text-xs sm:text-sm font-semibold text-[#3E2723]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#EADBCB] shadow-2xs">
                  <span className="text-[#C86D51]">♡</span> Homemade
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#EADBCB] shadow-2xs">
                  <span className="text-[#C86D51]">✦</span> Freshly baked
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#EADBCB] shadow-2xs">
                  <span className="text-[#C86D51]">⌁</span> Made to order
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#EADBCB] shadow-2xs">
                  <span className="text-[#2E7D32]">🌱</span> 100% Eggless Available
                </span>
              </div>

              {/* PRIMARY CALL TO ACTION BUTTON REQUESTED BY USER */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 flex-wrap">
                <button
                  id="btn-check-menu-order"
                  onClick={onProceedToMenu}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#3E2723] hover:bg-[#231714] text-[#FAF7F2] font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group cursor-pointer border border-[#231714]"
                >
                  <span className="tracking-wide uppercase font-serif">check menu and order now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#C86D51]" />
                </button>

                <a
                  href={BAKERY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-4 rounded-full bg-white hover:bg-[#F3ECE2] text-[#231714] font-semibold text-sm border border-[#EADBCB] shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Instagram className="w-4 h-4 text-[#C86D51] group-hover:scale-110 transition-transform" />
                  <span>@jerrys_bakery</span>
                </a>

                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-4 rounded-full bg-white hover:bg-[#F3ECE2] text-[#231714] font-semibold text-sm border border-[#EADBCB] shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#2E7D32]" />
                  <span>Chat: {BAKERY_INFO.displayPhone}</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative background aura */}
                <div className="absolute -inset-2 bg-radial from-[#C86D51]/20 to-transparent rounded-3xl blur-xl" />
                
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
                    alt="Jerryyss Bakery Signature Belgian Chocolate Drip Cake"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = FALLBACK_CAKE_IMAGE; }}
                    className="w-full h-[380px] sm:h-[440px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Floating badge */}
                  <div className="absolute top-4 right-4 bg-[#FAF7F2]/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-[#EADBCB] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] animate-pulse" />
                    <span className="text-xs font-bold text-[#3E2723]">Baking Today’s Batches</span>
                  </div>

                  {/* Bottom caption card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F2]/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-[#EADBCB] flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#231714]">Signature Belgian Truffle</h4>
                      <p className="text-[11px] text-[#7D6658]">Moist sponge & pure cocoa ganache</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#7D6658] block">Starts from</span>
                      <span className="font-serif font-bold text-sm text-[#C86D51]">₹690 (0.5 kg)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Story Section ("Made at home, made for you") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F3ECE2] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#EADBCB] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
                  alt="Jerryyss Bakery Home Bakehouse"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = FALLBACK_CAKE_IMAGE; }}
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#3E2723] text-white p-4 rounded-2xl shadow-lg text-center">
                <span className="block font-serif text-2xl font-bold text-[#C86D51]">100%</span>
                <span className="text-[11px] uppercase tracking-wider font-semibold">Small-Batch</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51]">
                  Our Bakery Story
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EADBCB] text-[#3E2723] font-semibold">
                  Chef {BAKERY_INFO.chefName}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231714]">
                Handcrafted by Chef {BAKERY_INFO.chefName}
              </h2>
              <p className="text-[#5C4A3E] leading-relaxed text-base sm:text-lg">
                Jerryyss Bakery is an artisanal homemade bakery founded and curated by Head Chef <strong className="text-[#231714] font-semibold">{BAKERY_INFO.chefName}</strong>. Focused on fresh, affordable, and exquisitely crafted bakes, every cake, brownie, and cupcake is prepared from scratch with heartfelt dedication.
              </p>
              <p className="text-[#5C4A3E] text-sm leading-relaxed">
                Unlike commercial bakeries that keep cakes chilled in display cases for days, Chef {BAKERY_INFO.chefName} bakes each order fresh on the day of delivery. From selecting exact cake weights to crafting delicate Korean piping and handwritten messages, every creation is made to make your celebration truly unforgettable.
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-sm text-[#3E2723] font-medium">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C86D51]" />
                  <span>Pure European Butter & Belgian Cocoa</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C86D51]" />
                  <span>Sanitized Eggless Baking Sanctuary</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C86D51]" />
                  <span>Freshly Baked Daily to Order</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4 flex-wrap">
                <button
                  onClick={onProceedToMenu}
                  className="inline-flex items-center gap-2 font-serif font-bold text-[#3E2723] hover:text-[#C86D51] transition-colors cursor-pointer group"
                >
                  <span>Explore All Flavors & Weight Options</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href={BAKERY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C86D51] hover:text-[#3E2723] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>View Chef {BAKERY_INFO.chefName}'s work on Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Simple 4-Step Order Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51]">
            Seamless Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231714]">
            How Ordering Works in 4 Easy Steps
          </h2>
          <p className="text-sm text-[#7D6658]">
            Customize exactly what you want and enjoy fresh homemade bakes delivered right to your door.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#EADBCB] shadow-2xs relative">
            <span className="text-3xl font-serif font-bold text-[#EADBCB] absolute top-4 right-4">01</span>
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#C86D51] flex items-center justify-center font-bold mb-4">
              1
            </div>
            <h3 className="font-serif font-bold text-base text-[#231714] mb-1">Check Menu</h3>
            <p className="text-xs text-[#5C4A3E] leading-relaxed">
              Explore our cakes, fudgy brownies, cupcakes, and bento cakes.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#EADBCB] shadow-2xs relative">
            <span className="text-3xl font-serif font-bold text-[#EADBCB] absolute top-4 right-4">02</span>
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#C86D51] flex items-center justify-center font-bold mb-4">
              2
            </div>
            <h3 className="font-serif font-bold text-base text-[#231714] mb-1">Customize Weight</h3>
            <p className="text-xs text-[#5C4A3E] leading-relaxed">
              Pick 0.5kg to 2.5kg, eggless diet, style finish, and custom message with dynamic price updates.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#EADBCB] shadow-2xs relative">
            <span className="text-3xl font-serif font-bold text-[#EADBCB] absolute top-4 right-4">03</span>
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#C86D51] flex items-center justify-center font-bold mb-4">
              3
            </div>
            <h3 className="font-serif font-bold text-base text-[#231714] mb-1">Review Summary</h3>
            <p className="text-xs text-[#5C4A3E] leading-relaxed">
              Check all customized items, enter your delivery address and schedule date.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#EADBCB] shadow-2xs relative">
            <span className="text-3xl font-serif font-bold text-[#EADBCB] absolute top-4 right-4">04</span>
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#C86D51] flex items-center justify-center font-bold mb-4">
              4
            </div>
            <h3 className="font-serif font-bold text-base text-[#231714] mb-1">Pay & WhatsApp</h3>
            <p className="text-xs text-[#5C4A3E] leading-relaxed">
              Pay via UPI, card, or cash, receive your receipt, and confirm with Jerryyss on WhatsApp!
            </p>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="mt-10 text-center">
          <button
            onClick={onProceedToMenu}
            className="px-8 py-3.5 rounded-full bg-[#C86D51] hover:bg-[#b0583e] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>check menu and order now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51]">
            Kind Words
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231714]">
            Loved by Neighborhood Families
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-6 border border-[#EADBCB] shadow-2xs space-y-3">
              <div className="flex items-center gap-1 text-[#C86D51]">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C86D51]" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#5C4A3E] italic leading-relaxed">
                "{t.comment}"
              </p>
              <div className="pt-2 border-t border-[#F3ECE2]">
                <h4 className="font-serif font-bold text-sm text-[#231714]">{t.name}</h4>
                <p className="text-[11px] text-[#7D6658]">{t.occasion} • {t.cakeOrdered}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Visual Gallery Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51]">
              Fresh Creations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#231714]">
              Recent Bakes From Our Kitchen
            </h2>
          </div>
          <button
            onClick={onProceedToMenu}
            className="text-xs font-bold text-[#3E2723] hover:text-[#C86D51] underline underline-offset-4 cursor-pointer"
          >
            Browse All Menu Items →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_ITEMS.slice(0, 4).map((g) => (
            <div key={g.id} className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm border border-[#EADBCB]">
              <img
                src={g.image}
                alt={g.title}
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = FALLBACK_CAKE_IMAGE; }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-serif font-bold">{g.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Follow Card */}
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCB] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FFD600] via-[#FF0169] to-[#D300C5] p-0.5 shadow-md shrink-0">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-[#C86D51]">
                <Instagram className="w-7 h-7" />
              </div>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C86D51] block">
                Follow On Instagram
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#231714]">
                @jerrys_bakery
              </h3>
              <p className="text-xs text-[#7D6658] mt-0.5">
                Watch behind-the-scenes cake decorating and daily oven bakes by Head Chef <strong>{BAKERY_INFO.chefName}</strong>.
              </p>
            </div>
          </div>

          <a
            href={BAKERY_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-[#3E2723] hover:bg-[#231714] text-[#FAF7F2] font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0 group"
          >
            <Instagram className="w-4 h-4 text-[#C86D51] group-hover:scale-110 transition-transform" />
            <span>Follow @jerrys_bakery</span>
          </a>
        </div>
      </section>
    </div>
  );
};
