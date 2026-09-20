import React from 'react';
import { ShoppingBag, MessageCircle, Sparkles, Truck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Pick Your Treats',
      desc: 'Browse our menu of artisan cakes, fudgy brownies, cookies, or configure a custom cake with your dream flavors.',
      icon: ShoppingBag,
    },
    {
      num: '02',
      title: 'Choose Date & Notes',
      desc: 'Let us know if you need 100% eggless, any custom piped calligraphy on the cake, and your preferred delivery date.',
      icon: Sparkles,
    },
    {
      num: '03',
      title: 'Chat on WhatsApp',
      desc: 'Click Order on WhatsApp to send your selections directly to our kitchen. We confirm your slot and send payment details.',
      icon: MessageCircle,
    },
    {
      num: '04',
      title: 'Baked Fresh & Delivered',
      desc: 'We bake your order from scratch on the delivery morning and bring it safely to your doorstep or ready for kitchen pickup.',
      icon: Truck,
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51]">
            Simple & Seamless
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#231714] tracking-tight mt-1 mb-4">
            How to Order from Jerryyss
          </h2>
          <p className="text-base sm:text-lg text-[#5C4A3E]">
            We keep the order process personal and friendly, just like ordering from a neighbor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#F5EFE6] p-6 rounded-2xl border border-[#EADBCB] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#EADBCB] text-[#C86D51] flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-serif font-bold text-2xl text-[#EADBCB] select-none">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#231714] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
