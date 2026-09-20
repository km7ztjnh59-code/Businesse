import React, { useState } from 'react';
import { Sparkles, Plus, Eye, Check, Clock, Users, MessageCircle } from 'lucide-react';
import { MenuItem, CategoryType } from '../types';
import { MENU_ITEMS, FALLBACK_CAKE_IMAGE } from '../data/bakeryData';
import { getSingleItemWhatsAppUrl } from '../utils/whatsapp';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, isEggless: boolean) => void;
  onSelectItemForModal: (item: MenuItem) => void;
  onGoToCustomCakes: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onSelectItemForModal,
  onGoToCustomCakes,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [onlyEggless, setOnlyEggless] = useState<boolean>(false);
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All Bakes' },
    { id: 'cakes', label: 'Celebration Cakes' },
    { id: 'brownies', label: 'Fudgy Brownies' },
    { id: 'bento', label: 'Bento Mini Cakes' },
    { id: 'cupcakes', label: 'Gourmet Cupcakes' },
    { id: 'cookies', label: 'Cookies & Treats' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesEggless = !onlyEggless || item.isEgglessAvailable;
    return matchesCategory && matchesEggless;
  });

  const handleQuickAdd = (item: MenuItem) => {
    onAddToCart(item, onlyEggless);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section id="menu" className="py-20 md:py-28 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3ECE2] border border-[#EADBCB] text-[#C86D51] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Handmade with Love
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#231714] tracking-tight mb-4">
            Our Freshly Baked Menu
          </h2>
          <p className="text-base sm:text-lg text-[#5C4A3E]">
            Everything is baked to order with premium butter, rich Belgian chocolate, and pure natural flavors.
          </p>
        </div>

        {/* Filters and Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-4 border-b border-[#EADBCB]">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#3E2723] text-[#FAF7F2] shadow-sm'
                    : 'bg-[#F3ECE2] text-[#5C4A3E] hover:bg-[#EADBCB]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Eggless Filter Toggle */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-medium text-[#3E2723] select-none bg-[#F3ECE2] px-3.5 py-2 rounded-full border border-[#EADBCB]">
              <input
                type="checkbox"
                checked={onlyEggless}
                onChange={(e) => setOnlyEggless(e.target.checked)}
                className="w-4 h-4 rounded text-[#2E7D32] focus:ring-0 cursor-pointer accent-[#2E7D32]"
              />
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                Eggless Friendly Only
              </span>
            </label>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const isAdded = !!addedIds[item.id];
            return (
              <div
                key={item.id}
                id={`menu-item-${item.id}`}
                className="group bg-[#FAF7F2] rounded-2xl border border-[#EADBCB] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[4/3] bg-[#F3ECE2] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = FALLBACK_CAKE_IMAGE; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.popular && (
                      <span className="bg-[#FAF7F2]/95 backdrop-blur-xs text-[#C86D51] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-[#EADBCB]">
                        ★ Bestseller
                      </span>
                    )}
                    {item.isEgglessAvailable && (
                      <span className="bg-[#2E7D32]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-xs flex items-center gap-1">
                        🌱 Eggless Opt.
                      </span>
                    )}
                  </div>

                  {/* Quick View Button */}
                  <button
                    id={`quick-view-${item.id}`}
                    onClick={() => onSelectItemForModal(item)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-[#FAF7F2]/90 hover:bg-[#FAF7F2] text-[#3E2723] shadow-sm transition-transform hover:scale-110 cursor-pointer"
                    title="Quick Details"
                    aria-label={`View details for ${item.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Price Tag pill */}
                  <div className="absolute bottom-3 right-3 bg-[#3E2723] text-[#FAF7F2] px-3 py-1 rounded-full font-serif font-bold text-sm shadow-sm">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#231714] mb-1.5 group-hover:text-[#C86D51] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#7D6658] line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Metadata tags: Serving & Lead time */}
                    <div className="flex items-center gap-3 text-xs text-[#7D6658] mb-4 pb-3 border-b border-[#EADBCB]/60">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#C86D51]" />
                        {item.servingSize}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#D98242]" />
                        {item.leadTimeHours}h notice
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      id={`add-to-cart-${item.id}`}
                      onClick={() => handleQuickAdd(item)}
                      className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isAdded
                          ? 'bg-[#2E7D32] text-white'
                          : 'bg-[#C86D51] hover:bg-[#B55C41] text-white shadow-xs'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>

                    <a
                      id={`whatsapp-item-${item.id}`}
                      href={getSingleItemWhatsAppUrl(item.name, item.price, onlyEggless)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#F3ECE2] hover:bg-[#EADBCB] text-[#2E7D32] transition-colors cursor-pointer"
                      title="Inquire directly on WhatsApp"
                      aria-label="Direct WhatsApp inquiry"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Cake Banner Prompt */}
        <div className="mt-16 rounded-2xl bg-[#F3ECE2] border border-[#EADBCB] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51]">
              Celebration Special
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231714] mt-1 mb-2">
              Looking for a custom cake or themed design?
            </h3>
            <p className="text-sm sm:text-base text-[#5C4A3E]">
              From vintage Lambeth ruffles to Korean bento boxes and tiered anniversary cakes — choose your exact sponge flavor, size, and message.
            </p>
          </div>
          <button
            id="menu-open-custom-builder-btn"
            onClick={onGoToCustomCakes}
            className="px-6 py-3.5 bg-[#3E2723] hover:bg-[#231714] text-[#FAF7F2] font-semibold text-sm rounded-full shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            Design Custom Cake &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
