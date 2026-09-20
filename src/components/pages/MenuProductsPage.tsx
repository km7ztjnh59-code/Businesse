import React, { useState } from 'react';
import { Sparkles, Check, Plus, Minus, Heart, ShoppingBag, ArrowRight, ArrowLeft, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { MenuItem, CategoryType, WeightOption, CustomizedOrderItem } from '../../types';
import { MENU_ITEMS, DECORATION_STYLES } from '../../data/bakeryData';

interface MenuProductsPageProps {
  orderItems: CustomizedOrderItem[];
  onAddCustomizedItem: (item: CustomizedOrderItem) => void;
  onProceedToSummary: () => void;
  onBackToHome: () => void;
}

export const MenuProductsPage: React.FC<MenuProductsPageProps> = ({
  orderItems,
  onAddCustomizedItem,
  onProceedToSummary,
  onBackToHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [activeCustomizingItem, setActiveCustomizingItem] = useState<MenuItem | null>(null);

  // State for the currently active customizer modal/drawer
  const [selectedWeight, setSelectedWeight] = useState<WeightOption | null>(null);
  const [isEggless, setIsEggless] = useState<boolean>(false);
  const [selectedStyle, setSelectedStyle] = useState<string>('Minimalist Korean Pastel');
  const [customMessage, setCustomMessage] = useState<string>('');
  const [specialNote, setSpecialNote] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Treats' },
    { id: 'cakes', label: 'Celebration Cakes' },
    { id: 'bento', label: 'Bento Cakes' },
    { id: 'brownies', label: 'Fudgy Brownies' },
    { id: 'cupcakes', label: 'Gourmet Cupcakes' },
    { id: 'cookies', label: 'Fresh Cookies' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  // Open customizer for a specific item
  const handleOpenCustomizer = (item: MenuItem) => {
    setActiveCustomizingItem(item);
    // Set default weight
    const defWeight = item.weightOptions.find((w) => w.isDefault) || item.weightOptions[0];
    setSelectedWeight(defWeight);
    setIsEggless(false);
    setSelectedStyle(item.category === 'cakes' || item.category === 'bento' ? 'Minimalist Korean Pastel' : '');
    setCustomMessage('');
    setSpecialNote('');
    setQuantity(1);
  };

  // Calculate dynamic price based on selections
  const calculateUnitPrice = (item: MenuItem, weight: WeightOption | null, eggless: boolean, styleName: string) => {
    if (!weight) return item.price;
    const baseWeightPrice = Math.round(item.price * weight.multiplier);
    
    // Style add-on if applicable
    const styleObj = DECORATION_STYLES.find((s) => s.name === styleName);
    const styleAddon = (item.category === 'cakes' || item.category === 'bento') && styleObj ? styleObj.priceAddon : 0;
    
    // Optional slight packaging / eggless adjustment (we keep eggless 100% accessible with small flat +₹50 or 0)
    const egglessAddon = eggless ? 50 : 0;

    return baseWeightPrice + styleAddon + egglessAddon;
  };

  const currentUnitPrice = activeCustomizingItem && selectedWeight
    ? calculateUnitPrice(activeCustomizingItem, selectedWeight, isEggless, selectedStyle)
    : 0;

  const currentTotalPrice = currentUnitPrice * quantity;

  // Add customized item to order
  const handleConfirmAdd = () => {
    if (!activeCustomizingItem || !selectedWeight) return;

    const customizedItem: CustomizedOrderItem = {
      id: `${activeCustomizingItem.id}-${Date.now()}`,
      productId: activeCustomizingItem.id,
      productName: activeCustomizingItem.name,
      category: activeCustomizingItem.category,
      image: activeCustomizingItem.image,
      selectedWeight: selectedWeight,
      isEggless: isEggless,
      customMessage: customMessage.trim(),
      selectedStyle: selectedStyle || undefined,
      specialNote: specialNote.trim() || undefined,
      unitPrice: currentUnitPrice,
      quantity: quantity,
      totalPrice: currentTotalPrice,
    };

    onAddCustomizedItem(customizedItem);

    // Show confirmation toast
    setAddedToast(`Added ${customizedItem.productName} (${selectedWeight.label}) to Order Bag!`);
    setTimeout(() => setAddedToast(null), 3000);

    setActiveCustomizingItem(null);
  };

  const totalOrderCount = orderItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalOrderAmount = orderItems.reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#3E2723] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#C86D51] flex items-center gap-2 animate-slide-in text-xs sm:text-sm font-medium">
          <Check className="w-4 h-4 text-[#2E7D32]" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EADBCB] pb-6">
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7D6658] hover:text-[#C86D51] transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Bakery Home
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADBCB]/50 text-xs font-semibold text-[#5C4A3E] mb-2">
            <Sparkles className="w-3 h-3 text-[#C86D51]" />
            <span>Step 2: Choose Product & Customize Weights</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#231714]">
            Fresh Baked Products
          </h1>
          <p className="text-sm text-[#5C4A3E] mt-1 max-w-2xl">
            Every order is made-to-order. Choose your cake weight (0.5 kg to 2.5 kg), 100% eggless preference, piping style, and personalized message. The price updates dynamically as you customize.
          </p>
        </div>

        {/* Proceed to summary button (top) */}
        {orderItems.length > 0 && (
          <button
            onClick={onProceedToSummary}
            className="px-6 py-3 rounded-full bg-[#C86D51] hover:bg-[#b0583e] text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Proceed to Summary ({totalOrderCount} items • ₹{Math.round(totalOrderAmount).toLocaleString('en-IN')})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as CategoryType)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#3E2723] text-white shadow-xs'
                : 'bg-white text-[#5C4A3E] hover:bg-[#F3ECE2] border border-[#EADBCB]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => {
          // Default lowest weight calculation for preview
          const minWeight = item.weightOptions[0];
          const minPrice = Math.round(item.price * minWeight.multiplier);

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#EADBCB] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Product Photo */}
              <div className="relative h-56 overflow-hidden bg-[#F3ECE2]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Tags */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {item.tags?.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      className="bg-white/90 backdrop-blur-xs text-[#231714] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs border border-[#EADBCB]"
                    >
                      {t}
                    </span>
                  ))}
                  {item.isEgglessAvailable && (
                    <span className="bg-[#2E7D32]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                      🌱 Eggless Available
                    </span>
                  )}
                </div>

                {/* Price Tag (Dynamic range) */}
                <div className="absolute bottom-3 right-3 bg-[#3E2723] text-[#FAF7F2] px-3 py-1 rounded-full font-serif font-bold text-xs shadow-sm">
                  From ₹{minPrice.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Product Content */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-[#231714] group-hover:text-[#C86D51] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#5C4A3E] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Weight Options Preview Pills */}
                  <div className="pt-1">
                    <span className="text-[11px] font-semibold text-[#7D6658] block mb-1">
                      Available Weights / Sizes:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.weightOptions.map((w) => (
                        <span
                          key={w.id}
                          className="text-[10px] bg-[#FAF7F2] text-[#3E2723] px-2 py-0.5 rounded-md border border-[#EADBCB]"
                        >
                          {w.label.split(' ')[0]} {w.label.split(' ')[1] || ''}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action: Customize & Add button */}
                <div className="pt-2 border-t border-[#F3ECE2] flex items-center justify-between">
                  <span className="text-xs text-[#7D6658]">
                    Base: <strong>₹{item.price}</strong>
                  </span>
                  <button
                    onClick={() => handleOpenCustomizer(item)}
                    className="px-4 py-2 rounded-full bg-[#3E2723] hover:bg-[#C86D51] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Customize & Order</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* STICKY BOTTOM TRAY WHEN ITEMS EXIST */}
      {orderItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#EADBCB] p-4 shadow-xl">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C86D51] text-white flex items-center justify-center font-bold">
                {totalOrderCount}
              </div>
              <div>
                <span className="text-xs text-[#7D6658] block">Your Custom Order Tray</span>
                <span className="font-serif text-lg font-bold text-[#231714]">
                  {orderItems.length} unique treats • ₹{Math.round(totalOrderAmount).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onProceedToSummary}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#3E2723] hover:bg-[#231714] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Order Summary</span>
                <ArrowRight className="w-4 h-4 text-[#C86D51]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL / SLIDE-IN CUSTOMIZER FOR THE CHOSEN PRODUCT */}
      {activeCustomizingItem && selectedWeight && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full border border-[#EADBCB] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-white border-b border-[#EADBCB] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C86D51]">
                  Customize Your Treat
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#231714]">
                  {activeCustomizingItem.name}
                </h2>
              </div>
              <button
                onClick={() => setActiveCustomizingItem(null)}
                className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#7D6658] hover:text-black flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-grow">
              {/* Product Preview Bar */}
              <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-[#EADBCB]">
                <img
                  src={activeCustomizingItem.image}
                  alt={activeCustomizingItem.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-grow">
                  <p className="text-xs text-[#5C4A3E] line-clamp-2">
                    {activeCustomizingItem.description}
                  </p>
                  <span className="text-[11px] text-[#7D6658] mt-1 block">
                    Base: ₹{activeCustomizingItem.price}
                  </span>
                </div>
              </div>

              {/* 1. WEIGHT / SIZE SELECTION (Crucial: changes price accordingly!) */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#3E2723] flex items-center justify-between">
                  <span>1. Choose Cake Weight / Pack Size (Required)</span>
                  <span className="text-[#C86D51] font-semibold text-xs lowercase">price updates automatically</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeCustomizingItem.weightOptions.map((weight) => {
                    const isSelected = selectedWeight.id === weight.id;
                    const calculatedPrice = Math.round(activeCustomizingItem.price * weight.multiplier);

                    return (
                      <button
                        key={weight.id}
                        type="button"
                        onClick={() => setSelectedWeight(weight)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#3E2723] text-white border-[#3E2723] shadow-xs'
                            : 'bg-white text-[#231714] border-[#EADBCB] hover:border-[#C86D51]'
                        }`}
                      >
                        <div>
                          <span className="font-semibold text-xs sm:text-sm block">
                            {weight.label}
                          </span>
                          <span className={`text-[11px] block ${isSelected ? 'text-white/80' : 'text-[#7D6658]'}`}>
                            {weight.sublabel}
                          </span>
                        </div>
                        <span className={`font-serif font-bold text-sm ${isSelected ? 'text-[#FAF7F2]' : 'text-[#C86D51]'}`}>
                          ₹{calculatedPrice.toLocaleString('en-IN')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. DIETARY PREFERENCE (100% Eggless Option) */}
              {activeCustomizingItem.isEgglessAvailable && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#3E2723]">
                    2. Dietary Option
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEggless(false)}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                        !isEggless
                          ? 'bg-white border-[#3E2723] text-[#231714] font-semibold shadow-2xs ring-1 ring-[#3E2723]'
                          : 'bg-white/60 border-[#EADBCB] text-[#7D6658]'
                      }`}
                    >
                      <span className="text-xs block">Standard Recipe</span>
                      <span className="text-[11px] text-[#7D6658]">Farm butter & eggs</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsEggless(true)}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                        isEggless
                          ? 'bg-[#2E7D32]/10 border-[#2E7D32] text-[#2E7D32] font-semibold shadow-2xs ring-1 ring-[#2E7D32]'
                          : 'bg-white/60 border-[#EADBCB] text-[#7D6658]'
                      }`}
                    >
                      <span className="text-xs block">🌱 100% Eggless (+₹50)</span>
                      <span className="text-[11px] text-[#7D6658]">Sanitized pure veg bake</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 3. CAKE PIPING / FINISH STYLE (For cakes & bento) */}
              {(activeCustomizingItem.category === 'cakes' || activeCustomizingItem.category === 'bento') && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#3E2723]">
                    3. Aesthetic Piping & Decoration Finish
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {DECORATION_STYLES.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setSelectedStyle(style.name)}
                        className={`p-2.5 rounded-xl border text-left text-xs cursor-pointer transition-all ${
                          selectedStyle === style.name
                            ? 'bg-[#3E2723] text-white border-[#3E2723]'
                            : 'bg-white text-[#231714] border-[#EADBCB] hover:border-[#C86D51]'
                        }`}
                      >
                        <div className="flex items-center justify-between font-medium">
                          <span>{style.name}</span>
                          {style.priceAddon > 0 && (
                            <span className={selectedStyle === style.name ? 'text-[#FAF7F2]' : 'text-[#C86D51]'}>
                              +₹{style.priceAddon}
                            </span>
                          )}
                        </div>
                        <p className={`text-[10px] mt-0.5 ${selectedStyle === style.name ? 'text-white/70' : 'text-[#7D6658]'}`}>
                          {style.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. CUSTOM HANDWRITTEN MESSAGE ON CAKE */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#3E2723] flex items-center justify-between">
                  <span>4. Handwritten Message on Cake / Box (Optional)</span>
                  <span className="text-[11px] text-[#7D6658]">Free of charge</span>
                </label>
                <input
                  type="text"
                  maxLength={35}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="e.g. Happy 25th Birthday Sarah! 🎂"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADBCB] bg-white text-xs sm:text-sm text-[#231714] focus:outline-none focus:border-[#C86D51]"
                />
                <span className="text-[10px] text-[#7D6658]">
                  {customMessage.length}/35 characters
                </span>
              </div>

              {/* 5. SPECIAL BAKING INSTRUCTIONS */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#3E2723]">
                  5. Special Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="e.g. Slightly less sweet, include 1 birthday candle"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EADBCB] bg-white text-xs text-[#231714] focus:outline-none focus:border-[#C86D51]"
                />
              </div>

              {/* 6. QUANTITY SELECTOR */}
              <div className="flex items-center justify-between pt-2 border-t border-[#EADBCB]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3E2723]">
                  Quantity
                </span>
                <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border border-[#EADBCB]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-6 h-6 rounded-full bg-[#FAF7F2] text-[#3E2723] flex items-center justify-center text-xs font-bold hover:bg-[#EADBCB] cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-bold text-[#231714] min-w-5 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-6 h-6 rounded-full bg-[#FAF7F2] text-[#3E2723] flex items-center justify-center text-xs font-bold hover:bg-[#EADBCB] cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer with Dynamic Price & Add Button */}
            <div className="p-4 sm:p-6 bg-white border-t border-[#EADBCB] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-xs text-[#7D6658] block">Calculated Price:</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#231714]">
                    ₹{currentTotalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#7D6658]">
                    ({selectedWeight.label})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveCustomizingItem(null)}
                  className="px-4 py-3 rounded-full text-xs font-semibold text-[#7D6658] hover:text-[#231714] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAdd}
                  className="flex-grow sm:flex-grow-0 px-6 py-3 rounded-full bg-[#C86D51] hover:bg-[#b0583e] text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Customized Treat (₹{currentTotalPrice.toLocaleString('en-IN')})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
