import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShieldCheck, MapPin, Calendar, Clock, ShoppingBag, AlertCircle, Sparkles, MessageCircle } from 'lucide-react';
import { CustomizedOrderItem, CustomerDetails } from '../../types';
import { BAKERY_INFO, FALLBACK_CAKE_IMAGE } from '../../data/bakeryData';
import { getPaidOrderWhatsAppUrl } from '../../utils/whatsapp';

interface OrderSummaryPageProps {
  orderItems: CustomizedOrderItem[];
  customerDetails: CustomerDetails;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onUpdateCustomerDetails: (details: CustomerDetails) => void;
  onProceedToPayment: () => void;
  onBackToMenu: () => void;
}

export const OrderSummaryPage: React.FC<OrderSummaryPageProps> = ({
  orderItems,
  customerDetails,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateCustomerDetails,
  onProceedToPayment,
  onBackToMenu,
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);

  // Subtotal calculation
  const subtotal = orderItems.reduce((acc, curr) => acc + curr.unitPrice * curr.quantity, 0);

  // Delivery fee logic: Free if pickup OR order >= ₹800, else ₹60
  const isFreeDelivery = customerDetails.deliveryType === 'pickup' || subtotal >= 800;
  const deliveryFee = customerDetails.deliveryType === 'pickup' ? 0 : isFreeDelivery ? 0 : 60;
  const grandTotal = subtotal + deliveryFee;

  // Tomorrow as default minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const handleValidateAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderItems.length === 0) {
      setValidationError('Please add at least one treat to your order.');
      return;
    }
    if (!customerDetails.name.trim()) {
      setValidationError('Please enter your full name for the order.');
      return;
    }
    if (!customerDetails.phone.trim() || customerDetails.phone.trim().length < 8) {
      setValidationError('Please provide a valid contact phone number.');
      return;
    }
    if (!customerDetails.deliveryDate) {
      setValidationError('Please choose your required delivery or pickup date.');
      return;
    }
    if (customerDetails.deliveryType === 'delivery' && !customerDetails.address.trim()) {
      setValidationError('Please provide your complete delivery address.');
      return;
    }

    setValidationError(null);
    onProceedToPayment();
  };

  if (orderItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#F3ECE2] text-[#C86D51] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#231714]">
          Your Order Tray is Empty
        </h2>
        <p className="text-sm text-[#5C4A3E] max-w-md mx-auto">
          You haven't selected any treats yet. Head over to our fresh menu to choose your cakes, customize the weights, and personalize your bakes.
        </p>
        <div>
          <button
            onClick={onBackToMenu}
            className="px-8 py-3.5 rounded-full bg-[#3E2723] hover:bg-[#231714] text-white font-semibold text-sm shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to Menu & Pick Treats</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-[#EADBCB] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToMenu}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7D6658] hover:text-[#C86D51] transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Menu & Customizer
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADBCB]/50 text-xs font-semibold text-[#5C4A3E] mb-2">
            <Sparkles className="w-3 h-3 text-[#C86D51]" />
            <span>Step 3: Order Summary & Price Breakdown</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#231714]">
            Review Your Order Summary
          </h1>
          <p className="text-xs sm:text-sm text-[#5C4A3E] mt-1">
            Please review your customized weights, dietary preferences, delivery details, and final price before payment.
          </p>
        </div>

        <button
          onClick={onBackToMenu}
          className="text-xs font-bold text-[#C86D51] hover:underline self-start sm:self-auto cursor-pointer"
        >
          + Add More Treats
        </button>
      </div>

      {/* Validation Error Alert */}
      {validationError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-2xl flex items-center gap-2 text-xs sm:text-sm font-medium">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Main Grid: Items on Left, Details & Price on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Itemized Customized Products */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#231714] flex items-center justify-between">
            <span>Customized Treats ({orderItems.length})</span>
            <span className="text-xs font-sans text-[#7D6658] font-normal">
              Freshly baked to your exact specs
            </span>
          </h2>

          <div className="space-y-3">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EADBCB] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Image & Info */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={item.image}
                    alt={item.productName}
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = FALLBACK_CAKE_IMAGE; }}
                    className="w-20 h-20 rounded-xl object-cover border border-[#EADBCB] shrink-0"
                  />
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#231714]">
                      {item.productName}
                    </h3>
                    
                    {/* Selected Weight Badge */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="bg-[#FAF7F2] font-semibold text-[#3E2723] px-2.5 py-0.5 rounded-md border border-[#EADBCB]">
                        Weight: {item.selectedWeight.label}
                      </span>
                      {item.isEggless && (
                        <span className="bg-[#2E7D32]/10 text-[#2E7D32] font-bold px-2 py-0.5 rounded-md">
                          🌱 100% Eggless
                        </span>
                      )}
                    </div>

                    {/* Custom Message */}
                    {item.customMessage && (
                      <p className="text-xs text-[#5C4A3E] italic">
                        Piped Message: <strong className="text-[#231714]">"{item.customMessage}"</strong>
                      </p>
                    )}

                    {/* Style finish */}
                    {item.selectedStyle && (
                      <p className="text-[11px] text-[#7D6658]">
                        Style Finish: {item.selectedStyle}
                      </p>
                    )}

                    {item.specialNote && (
                      <p className="text-[11px] text-[#7D6658]">
                        Note: {item.specialNote}
                      </p>
                    )}
                  </div>
                </div>

                {/* Pricing & Quantity Controls */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-[#F3ECE2] gap-3">
                  <div className="text-right">
                    <span className="font-serif font-bold text-base sm:text-lg text-[#231714] block">
                      ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-[#7D6658] block">
                      ₹{item.unitPrice.toLocaleString('en-IN')} each
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#EADBCB]">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-5 h-5 rounded-full bg-white text-[#3E2723] flex items-center justify-center text-xs font-bold hover:bg-[#EADBCB] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#231714] min-w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-5 h-5 rounded-full bg-white text-[#3E2723] flex items-center justify-center text-xs font-bold hover:bg-[#EADBCB] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#7D6658] hover:text-red-600 p-1.5 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bakery promise card */}
          <div className="p-4 rounded-2xl bg-[#F3ECE2] border border-[#EADBCB] flex items-center gap-3 text-xs text-[#5C4A3E]">
            <ShieldCheck className="w-6 h-6 text-[#2E7D32] shrink-0" />
            <div>
              <strong className="text-[#231714] block">Freshness Guarantee</strong>
              <span>Every cake is baked from scratch within hours of your scheduled delivery time slot.</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Delivery Details Form & Price Summary */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleValidateAndProceed} className="space-y-6">
            {/* Delivery Details Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EADBCB] shadow-2xs space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#231714] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C86D51]" />
                <span>Delivery & Schedule Details</span>
              </h2>

              {/* Delivery or Pickup toggle */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateCustomerDetails({ ...customerDetails, deliveryType: 'delivery' })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                    customerDetails.deliveryType === 'delivery'
                      ? 'bg-[#3E2723] text-white border-[#3E2723]'
                      : 'bg-[#FAF7F2] text-[#5C4A3E] border-[#EADBCB] hover:bg-white'
                  }`}
                >
                  🛵 Doorstep Delivery
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateCustomerDetails({ ...customerDetails, deliveryType: 'pickup' })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                    customerDetails.deliveryType === 'pickup'
                      ? 'bg-[#3E2723] text-white border-[#3E2723]'
                      : 'bg-[#FAF7F2] text-[#5C4A3E] border-[#EADBCB] hover:bg-white'
                  }`}
                >
                  🏡 Kitchen Pickup (Free)
                </button>
              </div>

              {/* Name & Phone */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-[#3E2723] block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerDetails.name}
                    onChange={(e) => onUpdateCustomerDetails({ ...customerDetails, name: e.target.value })}
                    placeholder="e.g. Diya Kapoor"
                    className="w-full px-3 py-2 rounded-xl border border-[#EADBCB] text-xs text-[#231714] focus:outline-none focus:border-[#C86D51]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#3E2723] block mb-1">
                    Contact Phone (for WhatsApp updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerDetails.phone}
                    onChange={(e) => onUpdateCustomerDetails({ ...customerDetails, phone: e.target.value })}
                    placeholder="e.g. +91 93725 07748"
                    className="w-full px-3 py-2 rounded-xl border border-[#EADBCB] text-xs text-[#231714] focus:outline-none focus:border-[#C86D51]"
                  />
                </div>

                {/* Date and Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#3E2723] flex items-center gap-1 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C86D51]" />
                      <span>Required Date *</span>
                    </label>
                    <input
                      type="date"
                      required
                      min={minDateStr}
                      value={customerDetails.deliveryDate}
                      onChange={(e) => onUpdateCustomerDetails({ ...customerDetails, deliveryDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#EADBCB] text-xs text-[#231714] focus:outline-none focus:border-[#C86D51]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#3E2723] flex items-center gap-1 mb-1">
                      <Clock className="w-3.5 h-3.5 text-[#C86D51]" />
                      <span>Time Slot *</span>
                    </label>
                    <select
                      value={customerDetails.deliveryTimeSlot}
                      onChange={(e) => onUpdateCustomerDetails({ ...customerDetails, deliveryTimeSlot: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#EADBCB] text-xs text-[#231714] focus:outline-none focus:border-[#C86D51] bg-white"
                    >
                      <option value="Morning (10:00 AM – 1:00 PM)">Morning (10 AM – 1 PM)</option>
                      <option value="Afternoon (1:00 PM – 5:00 PM)">Afternoon (1 PM – 5 PM)</option>
                      <option value="Evening (5:00 PM – 8:00 PM)">Evening (5 PM – 8 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Address (if delivery) */}
                {customerDetails.deliveryType === 'delivery' && (
                  <div>
                    <label className="text-xs font-semibold text-[#3E2723] block mb-1">
                      Complete Delivery Address & Landmark *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={customerDetails.address}
                      onChange={(e) => onUpdateCustomerDetails({ ...customerDetails, address: e.target.value })}
                      placeholder="e.g. Flat 402, Oakwood Towers, Near Central Park, Mumbai"
                      className="w-full px-3 py-2 rounded-xl border border-[#EADBCB] text-xs text-[#231714] focus:outline-none focus:border-[#C86D51]"
                    />
                  </div>
                )}

                {/* Instructions */}
                <div>
                  <label className="text-xs font-semibold text-[#3E2723] block mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerDetails.specialInstructions}
                    onChange={(e) => onUpdateCustomerDetails({ ...customerDetails, specialInstructions: e.target.value })}
                    placeholder="e.g. Call upon arrival, leave with reception"
                    className="w-full px-3 py-2 rounded-xl border border-[#EADBCB] text-xs text-[#231714] focus:outline-none focus:border-[#C86D51]"
                  />
                </div>
              </div>
            </div>

            {/* Price Summary Card */}
            <div className="bg-[#F3ECE2] rounded-3xl p-5 sm:p-6 border border-[#EADBCB] space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#231714]">
                Price Breakdown
              </h2>

              <div className="space-y-2.5 text-xs text-[#5C4A3E]">
                <div className="flex justify-between">
                  <span>Treats Subtotal ({orderItems.length} items)</span>
                  <span className="font-semibold text-[#231714]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between">
                  <span>Custom Gift Box & Thermal Insulation</span>
                  <span className="text-[#2E7D32] font-semibold">FREE</span>
                </div>

                <div className="flex justify-between">
                  <span>Complimentary Cake Knife & Candles</span>
                  <span className="text-[#2E7D32] font-semibold">Included</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>
                    Doorstep Delivery Fee
                    {customerDetails.deliveryType === 'delivery' && subtotal < 800 && (
                      <span className="block text-[10px] text-[#7D6658]">
                        (Free on orders over ₹800)
                      </span>
                    )}
                  </span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-[#2E7D32]">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#D6C4B0] flex items-baseline justify-between">
                  <div>
                    <span className="font-serif text-base sm:text-lg font-bold text-[#231714] block">
                      Total Payable Amount
                    </span>
                    <span className="text-[11px] text-[#7D6658]">Inclusive of all taxes</span>
                  </div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C86D51]">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Proceed to Payment Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#3E2723] hover:bg-[#231714] text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Proceed to Payment (₹{grandTotal.toLocaleString('en-IN')})</span>
                <ArrowRight className="w-5 h-5 text-[#C86D51]" />
              </button>

              {/* Direct WhatsApp Order Summary Button */}
              <button
                type="button"
                onClick={() => {
                  const url = getPaidOrderWhatsAppUrl({
                    orderId: `JB-${Math.floor(10000 + Math.random() * 90000)}`,
                    items: orderItems,
                    customer: customerDetails,
                    subtotal,
                    deliveryFee,
                    total: grandTotal,
                    paymentMethod: `UPI to ${BAKERY_INFO.whatsappNumber.replace(/[^0-9]/g, '').slice(-10)}`,
                    paymentRef: "DIRECT_WHATSAPP_ORDER",
                    paidAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
                    status: 'confirmed',
                  });
                  window.open(url, '_blank');
                }}
                className="w-full py-3.5 rounded-full bg-[#2E7D32]/10 hover:bg-[#2E7D32]/20 text-[#2E7D32] border border-[#2E7D32]/30 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Order Summary on WhatsApp ({BAKERY_INFO.displayPhone})</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
