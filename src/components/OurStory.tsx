import React from 'react';
import { Heart, Sparkles, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import bakerImg from '../assets/images/baker_decorating_cake_1789897181285.jpg';
import { FALLBACK_CAKE_IMAGE } from '../data/bakeryData';

export const OurStory: React.FC = () => {
  return (
    <section id="our-story" className="py-20 md:py-28 bg-[#F5EFE6] border-y border-[#EADBCB]/80 relative overflow-hidden">
      {/* Decorative subtle texture circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#EADBCB]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#FAF7F2]/60 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with cozy warm framing */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Background accent card */}
              <div className="absolute -inset-3 bg-[#EADBCB] rounded-3xl rotate-2" />

              <div className="relative rounded-2xl overflow-hidden bg-[#FAF7F2] p-2 sm:p-3 border border-[#D8C7B5] shadow-lg">
                <div className="rounded-xl overflow-hidden aspect-[4/3] bg-[#EADBCB]">
                  <img
                    id="our-story-baker-img"
                    src={bakerImg}
                    alt="Jerryyss Bakery passionate artisan home baker decorating cake"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = FALLBACK_CAKE_IMAGE; }}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Photo Caption Note */}
                <div className="p-4 bg-[#FAF7F2] rounded-xl mt-2 text-center">
                  <p className="font-script text-2xl text-[#C86D51] font-bold">
                    “Every whisk, pinch, and fold is done with love.”
                  </p>
                  <p className="text-xs uppercase tracking-wider text-[#7D6658] font-semibold mt-1">
                    Fresh from our home kitchen to your table
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#EADBCB] text-[#C86D51] text-xs font-bold tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Our Story & Philosophy
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#231714] tracking-tight mb-6 leading-tight">
              “Made at home, <br />
              <span className="italic text-[#3E2723]">made for you.”</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#5C4A3E] leading-relaxed mb-8">
              <p>
                <strong className="text-[#231714] font-semibold">Jerryyss Bakery</strong> is a homemade bakery focused on fresh, affordable and beautifully made treats. Every order is prepared with care and can be personalized for your special celebrations, milestones, or simply an afternoon pick-me-up.
              </p>
              <p>
                What started as baking for friends and family in our home kitchen grew through word of mouth into a community kitchen favorite. We refuse shortcuts, artificial preservatives, or commercial premixes. We believe that true homemade baking is an act of warmth — real butter, pure chocolate, aromatic vanilla beans, and personal attention to detail.
              </p>
            </div>

            {/* Core Bakery Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EADBCB] shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#F3ECE2] text-[#C86D51] flex items-center justify-center mb-2.5">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#231714] mb-1">Small Batch Promise</h4>
                <p className="text-xs sm:text-sm text-[#7D6658]">
                  We never freeze cakes. Each item is baked individually upon receiving your order.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EADBCB] shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#F3ECE2] text-[#C86D51] flex items-center justify-center mb-2.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#231714] mb-1">Honest Ingredients</h4>
                <p className="text-xs sm:text-sm text-[#7D6658]">
                  Premium cocoa, European butter, farm eggs, and fresh seasonal fruit.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EADBCB] shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#F3ECE2] text-[#C86D51] flex items-center justify-center mb-2.5">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#231714] mb-1">Tailored for You</h4>
                <p className="text-xs sm:text-sm text-[#7D6658]">
                  Eggless options, customized sweetness levels, and personalized piping messages.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EADBCB] shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#F3ECE2] text-[#C86D51] flex items-center justify-center mb-2.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#231714] mb-1">Affordable Luxury</h4>
                <p className="text-xs sm:text-sm text-[#7D6658]">
                  Boutique aesthetic and gourmet taste at genuine, accessible home-bakery prices.
                </p>
              </div>
            </div>

            {/* Signature signoff */}
            <div className="flex items-center gap-4 pt-2">
              <div>
                <span className="font-script text-3xl text-[#3E2723] block leading-none">
                  Jerryy & the Kitchen Team
                </span>
                <span className="text-xs uppercase tracking-widest text-[#7D6658] font-medium">
                  Founder & Head Baker
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
