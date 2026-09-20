import React, { useState } from 'react';
import { X, Check, Plus, Minus, MessageCircle, Clock, Users, ShieldCheck, Heart } from 'lucide-react';
import { MenuItem } from '../types';
import { FALLBACK_CAKE_IMAGE } from '../data/bakeryData';
import { getSingleItemWhatsAppUrl } from '../utils/whatsapp';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, isEggless: boolean, qty: number) => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isEggless, setIsEggless] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    onAddToCart(item, isEggless, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div
      id="item-details-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        id="item-details-modal"
        className="relative max-w-2xl w-full bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#EADBCB] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-item-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Image */}
        <div className="relative aspect-[16/9] sm:aspect-[2/1] bg-[#F3ECE2] overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            onError={(e) => { e.currentTarget.src = FALLBACK_CAKE_IMAGE; }}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-4 bg-[#3E2723] text-white px-3.5 py-1 rounded-full font-serif font-bold text-sm shadow-sm">
            ₹{item.price.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Scrollable details */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-widest text-[#C86D51] font-bold">
                {item.category}
              </span>
              {item.isEgglessAvailable && (
                <span className="text-[10px] bg-[#2E7D32]/10 text-[#2E7D32] px-2 py-0.5 rounded-full font-semibold">
                  Eggless Available
                </span>
              )}
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231714]">
              {item.name}
            </h3>
            <p className="text-sm sm:text-base text-[#5C4A3E] mt-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Key Attributes */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#F5EFE6] border border-[#EADBCB] text-xs sm:text-sm text-[#5C4A3E]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C86D51]" />
              <span><strong>Portion:</strong> {item.servingSize}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D98242]" />
              <span><strong>Notice:</strong> {item.leadTimeHours}h advance bake</span>
            </div>
          </div>

          {/* Ingredients list */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div>
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#3E2723] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C86D51]" />
                Key Homemade Ingredients
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#EADBCB] text-xs text-[#5C4A3E]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Eggless Option Choice */}
          {item.isEgglessAvailable && (
            <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#EADBCB] flex items-center justify-between">
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#231714] block">
                  Select Eggless Preparation
                </span>
                <span className="text-[11px] text-[#7D6658]">
                  Baked using our special yogurt & condensed milk egg-free recipe
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsEggless(!isEggless)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isEggless
                    ? 'bg-[#2E7D32] text-white'
                    : 'bg-[#F3ECE2] text-[#5C4A3E] hover:bg-[#EADBCB]'
                }`}
              >
                {isEggless ? '✓ Eggless Selected' : '+ Make it Eggless'}
              </button>
            </div>
          )}

          {/* Action Row: Quantity + Add + WhatsApp */}
          <div className="pt-2 border-t border-[#EADBCB] flex flex-col sm:flex-row items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center gap-3 bg-[#F3ECE2] px-3 py-2 rounded-xl border border-[#EADBCB]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-lg bg-white flex items-center justify-center font-bold text-sm text-[#3E2723] cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-sm w-5 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-lg bg-white flex items-center justify-center font-bold text-sm text-[#3E2723] cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Bag Button */}
            <button
              onClick={handleAdd}
              className={`flex-1 w-full py-3 px-5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                addedSuccess
                  ? 'bg-[#2E7D32] text-white'
                  : 'bg-[#C86D51] hover:bg-[#B55C41] text-white shadow-xs'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added {quantity} to Bag!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Order Bag (₹{(item.price * quantity).toLocaleString('en-IN')})</span>
                </>
              )}
            </button>

            {/* Direct WhatsApp button */}
            <a
              href={getSingleItemWhatsAppUrl(item.name, item.price * quantity, isEggless)}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-[#2E7D32] hover:bg-[#256628] text-white font-bold text-sm transition-all flex items-center justify-center gap-1.5 shrink-0"
              title="Order on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
