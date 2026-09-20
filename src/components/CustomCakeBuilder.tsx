import React, { useState } from 'react';
import { Sparkles, Calendar, Heart, MessageSquare, Check, ShieldAlert, ArrowRight, MessageCircle } from 'lucide-react';
import { CakeCustomization } from '../types';
import { CAKE_FLAVORS, CAKE_SIZES, CAKE_STYLES, BAKERY_INFO } from '../data/bakeryData';
import { getCustomCakeWhatsAppUrl } from '../utils/whatsapp';

export const CustomCakeBuilder: React.FC = () => {
  const [config, setConfig] = useState<CakeCustomization>({
    flavor: CAKE_FLAVORS[0].name,
    sizeKg: 1.0,
    isEggless: false,
    style: CAKE_STYLES[0].name,
    messageOnCake: '',
    deliveryDate: '',
    specialRequests: '',
  });

  const selectedSizeObj = CAKE_SIZES.find((s) => s.weight === `${config.sizeKg} kg`) || CAKE_SIZES[1];
  const selectedFlavorObj = CAKE_FLAVORS.find((f) => f.name === config.flavor) || CAKE_FLAVORS[0];

  // Calculate estimated price
  const estimatedPrice = (selectedSizeObj?.basePrice || 34) + (selectedFlavorObj?.priceDelta || 0);

  const handleWhatsAppOrder = () => {
    const url = getCustomCakeWhatsAppUrl(config, estimatedPrice);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="custom-cakes" className="py-20 md:py-28 bg-[#F5EFE6] border-y border-[#EADBCB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#EADBCB] text-[#C86D51] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Bespoke Celebrations
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#231714] tracking-tight mb-4">
            Custom Cake Studio & Price Estimator
          </h2>
          <p className="text-base sm:text-lg text-[#5C4A3E]">
            Handcrafted specially for birthdays, anniversaries, baby showers, or intimate milestones. Customize every single detail and get an instant quote on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Builder Form Column */}
          <div className="lg:col-span-7 bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#EADBCB] shadow-sm space-y-8">
            {/* Step 1: Select Flavor */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-serif text-lg font-bold text-[#231714] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#3E2723] text-white text-xs flex items-center justify-center font-sans font-bold">1</span>
                  Choose Sponge & Filling Flavor
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CAKE_FLAVORS.map((f) => (
                  <button
                    key={f.id}
                    id={`flavor-${f.id}`}
                    type="button"
                    onClick={() => setConfig({ ...config, flavor: f.name })}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                      config.flavor === f.name
                        ? 'border-[#C86D51] bg-[#F3ECE2] shadow-xs'
                        : 'border-[#EADBCB] hover:border-[#C86D51]/50 bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-[#231714]">{f.name}</span>
                      {f.priceDelta > 0 && (
                        <span className="text-xs text-[#C86D51] font-bold">+₹{f.priceDelta}</span>
                      )}
                    </div>
                    <p className="text-xs text-[#7D6658] mt-1">{f.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Size & Servings */}
            <div>
              <label className="font-serif text-lg font-bold text-[#231714] flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#3E2723] text-white text-xs flex items-center justify-center font-sans font-bold">2</span>
                Choose Size & Servings
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {CAKE_SIZES.map((sz) => {
                  const isSelected = selectedSizeObj.id === sz.id;
                  return (
                    <button
                      key={sz.id}
                      id={`size-${sz.id}`}
                      type="button"
                      onClick={() => setConfig({ ...config, sizeKg: parseFloat(sz.weight) })}
                      className={`p-3 rounded-xl text-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C86D51] bg-[#F3ECE2] ring-1 ring-[#C86D51]'
                          : 'border-[#EADBCB] hover:border-[#C86D51]/40 bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="font-serif font-bold text-sm text-[#231714]">{sz.label}</div>
                      <div className="text-[11px] text-[#7D6658] mt-0.5">{sz.serves}</div>
                      <div className="text-xs font-bold text-[#C86D51] mt-2">₹{sz.basePrice.toLocaleString('en-IN')}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Dietary Choice & Style */}
            <div className="space-y-4">
              <label className="font-serif text-lg font-bold text-[#231714] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#3E2723] text-white text-xs flex items-center justify-center font-sans font-bold">3</span>
                Dietary Preference & Decoration Theme
              </label>

              {/* Eggless toggle */}
              <div className="flex items-center gap-4 p-3.5 bg-[#F3ECE2] rounded-xl border border-[#EADBCB]">
                <span className="text-sm font-semibold text-[#231714] flex-1">
                  100% Eggless Preparation Required?
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setConfig({ ...config, isEggless: false })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      !config.isEggless
                        ? 'bg-[#3E2723] text-white'
                        : 'bg-white/80 text-[#5C4A3E] hover:bg-white'
                    }`}
                  >
                    Regular
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfig({ ...config, isEggless: true })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      config.isEggless
                        ? 'bg-[#2E7D32] text-white'
                        : 'bg-white/80 text-[#5C4A3E] hover:bg-white'
                    }`}
                  >
                    🌱 Eggless (No Egg)
                  </button>
                </div>
              </div>

              {/* Style selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CAKE_STYLES.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setConfig({ ...config, style: st.name })}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      config.style === st.name
                        ? 'border-[#C86D51] bg-[#F3ECE2]'
                        : 'border-[#EADBCB] hover:border-[#C86D51]/50 bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="font-semibold text-xs sm:text-sm text-[#231714]">{st.name}</div>
                    <p className="text-[11px] text-[#7D6658] mt-0.5">{st.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Personal Message & Target Date */}
            <div className="space-y-4 pt-2">
              <label className="font-serif text-lg font-bold text-[#231714] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#3E2723] text-white text-xs flex items-center justify-center font-sans font-bold">4</span>
                Personal Message & Date
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#7D6658] mb-1.5">
                    Piped Message on Cake / Board
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Happy 30th Birthday Alex!"
                    value={config.messageOnCake}
                    onChange={(e) => setConfig({ ...config, messageOnCake: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADBCB] bg-white text-sm text-[#231714] focus:outline-none focus:border-[#C86D51]"
                    maxLength={50}
                  />
                  <span className="text-[10px] text-[#7D6658] mt-1 block">
                    Hand-piped in delicate calligraphy. Max 50 characters.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#7D6658] mb-1.5">
                    Required Delivery / Pickup Date
                  </label>
                  <input
                    type="date"
                    value={config.deliveryDate}
                    onChange={(e) => setConfig({ ...config, deliveryDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADBCB] bg-white text-sm text-[#231714] focus:outline-none focus:border-[#C86D51]"
                  />
                  <span className="text-[10px] text-[#7D6658] mt-1 block">
                    Please allow at least 24-48 hours advance notice.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#7D6658] mb-1.5">
                  Special Notes or Color Theme (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Pastel sage green & cream palette, less sweet frosting, add gold leaf flakes..."
                  value={config.specialRequests}
                  onChange={(e) => setConfig({ ...config, specialRequests: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EADBCB] bg-white text-sm text-[#231714] focus:outline-none focus:border-[#C86D51]"
                />
              </div>
            </div>
          </div>

          {/* Live Quote & WhatsApp Submission Card */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-7 border border-[#EADBCB] shadow-md">
              <div className="flex items-center justify-between border-b border-[#EADBCB] pb-4 mb-5">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#C86D51]">
                    Live Custom Cake Summary
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#231714]">
                    Your Bespoke Bake
                  </h3>
                </div>
                <span className="font-script text-2xl text-[#3E2723] font-bold">
                  Jerryyss
                </span>
              </div>

              {/* Summary Items */}
              <div className="space-y-3.5 text-sm text-[#5C4A3E] pb-5 border-b border-[#EADBCB]">
                <div className="flex justify-between items-center">
                  <span className="text-[#7D6658]">Sponge & Filling:</span>
                  <span className="font-semibold text-[#231714] text-right">{config.flavor}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#7D6658]">Weight & Servings:</span>
                  <span className="font-semibold text-[#231714] text-right">
                    {selectedSizeObj.label} ({selectedSizeObj.serves})
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#7D6658]">Diet Preference:</span>
                  <span className={`font-semibold ${config.isEggless ? 'text-[#2E7D32]' : 'text-[#231714]'}`}>
                    {config.isEggless ? '🌱 100% Eggless' : 'Regular European Butter'}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#7D6658]">Design Style:</span>
                  <span className="font-semibold text-[#231714] text-right">{config.style}</span>
                </div>

                {config.messageOnCake && (
                  <div className="flex justify-between items-start">
                    <span className="text-[#7D6658]">Custom Writing:</span>
                    <span className="font-script text-base text-[#C86D51] font-bold text-right max-w-[200px]">
                      "{config.messageOnCake}"
                    </span>
                  </div>
                )}

                {config.deliveryDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-[#7D6658]">Needed For:</span>
                    <span className="font-semibold text-[#231714]">{config.deliveryDate}</span>
                  </div>
                )}
              </div>

              {/* Total Estimated Price */}
              <div className="pt-5 pb-6">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm font-semibold text-[#7D6658]">Estimated Total:</span>
                  <div className="text-right">
                    <span className="font-serif text-3xl font-bold text-[#231714]">
                      ₹{Math.round(estimatedPrice).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-[#7D6658]">
                  *Exact quotation will be confirmed directly on WhatsApp based on any special topper or floral requirements.
                </p>
              </div>

              {/* Order via WhatsApp Action Button */}
              <button
                id="custom-cake-whatsapp-btn"
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-4 px-6 bg-[#2E7D32] hover:bg-[#256628] text-white font-bold rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 text-sm cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>REQUEST THIS CAKE ON WHATSAPP</span>
              </button>

              <div className="mt-4 text-center space-y-1">
                <div className="text-xs text-[#7D6658] inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
                  <span>Direct WhatsApp: <strong className="text-[#2E7D32] font-semibold">{BAKERY_INFO.displayPhone}</strong></span>
                </div>
                <p className="text-[11px] text-[#7D6658]/80">
                  Opens directly in WhatsApp with your customized cake order details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
