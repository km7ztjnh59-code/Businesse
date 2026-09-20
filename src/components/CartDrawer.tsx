import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { FALLBACK_CAKE_IMAGE } from '../data/bakeryData';
import { getCartWhatsAppUrl } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onExploreMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreMenu,
}) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    date: '',
    address: '',
    notes: '',
  });

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (total, item) => total + item.item.price * item.quantity,
    0
  );

  const handleCheckoutWhatsApp = () => {
    if (cartItems.length === 0) return;
    const url = getCartWhatsAppUrl(cartItems, customerInfo);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity flex justify-end"
      onClick={onClose}
    >
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#EADBCB]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-[#EADBCB] flex items-center justify-between bg-[#F5EFE6]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#3E2723] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#231714]">Your Order Bag</h3>
              <p className="text-xs text-[#7D6658]">
                {cartItems.length} {cartItems.length === 1 ? 'treat' : 'treats'} selected
              </p>
            </div>
          </div>
          <button
            id="close-cart-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#3E2723] hover:bg-[#EADBCB] transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-[#F3ECE2] text-[#C86D51] mx-auto flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#231714] mb-2">
                Your bag is empty
              </h4>
              <p className="text-xs sm:text-sm text-[#7D6658] mb-6">
                Explore our freshly baked cakes, fudgy brownies, and cookies to start your order.
              </p>
              <button
                id="cart-empty-explore-btn"
                onClick={() => {
                  onClose();
                  onExploreMenu();
                }}
                className="px-6 py-3 bg-[#3E2723] text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-[#231714] transition-all cursor-pointer"
              >
                Browse Our Menu
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                {cartItems.map((cartItem) => (
                  <div
                    key={cartItem.item.id}
                    className="p-3.5 rounded-xl bg-white border border-[#EADBCB] flex gap-3 items-center shadow-xs"
                  >
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.src = FALLBACK_CAKE_IMAGE; }}
                      className="w-16 h-16 rounded-lg object-cover bg-[#F3ECE2] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-sm text-[#231714] truncate">
                        {cartItem.item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-[#C86D51]">
                          ₹{(cartItem.item.price * cartItem.quantity).toLocaleString('en-IN')}
                        </span>
                        {cartItem.isEggless && (
                          <span className="text-[10px] bg-[#2E7D32]/15 text-[#2E7D32] px-1.5 py-0.2 rounded font-semibold">
                            Eggless
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                          className="w-6 h-6 rounded bg-[#F3ECE2] hover:bg-[#EADBCB] flex items-center justify-center text-xs font-bold text-[#3E2723] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                          className="w-6 h-6 rounded bg-[#F3ECE2] hover:bg-[#EADBCB] flex items-center justify-center text-xs font-bold text-[#3E2723] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(cartItem.item.id)}
                      className="text-[#A38F78] hover:text-red-600 p-1 cursor-pointer transition-colors"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Customer Details for WhatsApp message */}
              <div className="pt-3 border-t border-[#EADBCB] space-y-3">
                <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-[#3E2723]">
                  Order Delivery Details
                </h5>

                <div>
                  <label className="block text-[11px] font-bold text-[#7D6658] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Maya Chen"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#EADBCB] bg-white text-xs text-[#231714] focus:outline-none focus:border-[#C86D51]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#7D6658] mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#EADBCB] bg-white text-xs text-[#231714] focus:outline-none focus:border-[#C86D51]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#7D6658] mb-1">
                      Delivery Date
                    </label>
                    <input
                      type="date"
                      value={customerInfo.date}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, date: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#EADBCB] bg-white text-xs text-[#231714] focus:outline-none focus:border-[#C86D51]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#7D6658] mb-1">
                    Delivery Address or Pickup Slot
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Flat 302, Green Glen Layout OR Self Pickup"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#EADBCB] bg-white text-xs text-[#231714] focus:outline-none focus:border-[#C86D51]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#7D6658] mb-1">
                    Cake Note / Special Requests
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Write 'Happy Birthday' on cake, add candles"
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#EADBCB] bg-white text-xs text-[#231714] focus:outline-none focus:border-[#C86D51]"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#EADBCB] bg-[#F5EFE6] space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold text-[#5C4A3E]">Subtotal</span>
              <span className="font-serif text-2xl font-bold text-[#231714]">
                ₹{Math.round(subtotal).toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[11px] text-[#7D6658]">
              *Delivery fee confirmed on WhatsApp based on your distance.
            </p>

            <button
              id="cart-checkout-whatsapp-btn"
              onClick={handleCheckoutWhatsApp}
              className="w-full py-3.5 px-4 bg-[#2E7D32] hover:bg-[#256628] text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>SEND ORDER TO WHATSAPP</span>
            </button>

            <div className="flex items-center justify-between text-[11px] text-[#7D6658] pt-1">
              <span>Freshly baked upon confirmation</span>
              <button
                onClick={onClearCart}
                className="hover:text-red-600 underline cursor-pointer"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
