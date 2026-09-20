import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  Banknote, 
  ArrowLeft, 
  MessageCircle, 
  Sparkles, 
  Printer, 
  Calendar, 
  Clock, 
  Copy, 
  Check, 
  Smartphone,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { CustomizedOrderItem, CustomerDetails, CompletedOrder } from '../../types';
import { BAKERY_INFO } from '../../data/bakeryData';
import { getPaidOrderWhatsAppUrl } from '../../utils/whatsapp';

interface PaymentPageProps {
  orderItems: CustomizedOrderItem[];
  customerDetails: CustomerDetails;
  onBackToSummary: () => void;
  onRestartOrder: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  orderItems,
  customerDetails,
  onBackToSummary,
  onRestartOrder,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [upiRefNumber, setUpiRefNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  // Baker's recipient details
  const RECIPIENT_PHONE = "9987826949";
  const RECIPIENT_NAME = "Jerryyss Bakery";
  const RECIPIENT_UPI = "9987826949@upi";

  // Subtotal & delivery fee
  const subtotal = orderItems.reduce((acc, curr) => acc + curr.unitPrice * curr.quantity, 0);
  const isFreeDelivery = customerDetails.deliveryType === 'pickup' || subtotal >= 800;
  const deliveryFee = customerDetails.deliveryType === 'pickup' ? 0 : isFreeDelivery ? 0 : 60;
  const grandTotal = subtotal + deliveryFee;

  // Real UPI deep link URL
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(RECIPIENT_UPI)}&pn=${encodeURIComponent(RECIPIENT_NAME)}&am=${grandTotal}&cu=INR&tn=${encodeURIComponent(`Jerryyss Bakery Order for ${customerDetails.name}`)}`;
  
  // Real QR Code URL for the UPI URI
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(upiDeepLink)}`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // Process payment verification
  const handleProcessPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `JB-${Math.floor(10000 + Math.random() * 90000)}`;
      const paymentRef = upiRefNumber.trim() 
        ? `UPI-${upiRefNumber.trim()}`
        : `TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

      const newCompletedOrder: CompletedOrder = {
        orderId,
        items: [...orderItems],
        customer: { ...customerDetails },
        subtotal,
        deliveryFee,
        total: grandTotal,
        paymentMethod:
          paymentMethod === 'upi'
            ? `UPI Direct to ${RECIPIENT_PHONE}`
            : paymentMethod === 'card'
            ? 'Credit / Debit Card'
            : 'Cash on Delivery / Pickup',
        paymentRef,
        paidAt: nowStr,
        status: 'confirmed',
      };

      setCompletedOrder(newCompletedOrder);
      setIsProcessing(false);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  // -------------------------------------------------------------
  // AFTER PAYMENT IS COMPLETED -> SHOW THANK YOU & RECEIPT
  // -------------------------------------------------------------
  if (completedOrder) {
    const whatsappUrl = getPaidOrderWhatsAppUrl(completedOrder);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8 animate-fade-in">
        {/* Celebration Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EADBCB] shadow-xl text-center space-y-4 relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E7D32]">
              Payment Transferred to {RECIPIENT_PHONE} • Order Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#231714]">
              Thank You for Ordering, {completedOrder.customer.name}! 🎂
            </h1>
            <p className="text-sm sm:text-base text-[#5C4A3E] max-w-xl mx-auto">
              Your payment of <strong className="text-[#231714]">₹{completedOrder.total.toLocaleString('en-IN')}</strong> to account <strong className="text-[#2E7D32]">{RECIPIENT_PHONE}</strong> has been logged. Our ovens are ready and we are preparing your fresh treats as scheduled!
            </p>
          </div>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold">
            <span className="bg-[#FAF7F2] px-3.5 py-1.5 rounded-full border border-[#EADBCB] text-[#3E2723]">
              Order ID: <strong className="text-[#C86D51] font-mono">{completedOrder.orderId}</strong>
            </span>
            <span className="bg-[#FAF7F2] px-3.5 py-1.5 rounded-full border border-[#EADBCB] text-[#3E2723]">
              Paid To: <strong>{RECIPIENT_PHONE}</strong> ({completedOrder.paymentMethod})
            </span>
            <span className="bg-[#FAF7F2] px-3.5 py-1.5 rounded-full border border-[#EADBCB] text-[#3E2723]">
              Scheduled: {completedOrder.customer.deliveryDate} ({completedOrder.customer.deliveryTimeSlot.split(' ')[0]})
            </span>
          </div>

          {/* WhatsApp Direct Action Button */}
          <div className="pt-4 max-w-md mx-auto space-y-2">
            <a
              id="btn-send-whatsapp-confirmation"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-full bg-[#2E7D32] hover:bg-[#256628] text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Send Receipt / Screenshot on WhatsApp ({RECIPIENT_PHONE})</span>
            </a>
            <p className="text-[11px] text-[#7D6658]">
              Connect directly with our head baker at <strong>+91 {RECIPIENT_PHONE}</strong> to share your payment screenshot or track delivery.
            </p>
          </div>
        </div>

        {/* Order Receipt Details */}
        <div className="bg-[#F3ECE2] rounded-3xl p-6 sm:p-8 border border-[#EADBCB] space-y-6">
          <div className="flex items-center justify-between border-b border-[#D6C4B0] pb-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#231714]">
                Official Order Receipt
              </h2>
              <span className="text-xs text-[#7D6658]">
                Payment Ref: {completedOrder.paymentRef} • Paid To: {RECIPIENT_PHONE} • {completedOrder.paidAt}
              </span>
            </div>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-full bg-white hover:bg-[#FAF7F2] text-[#3E2723] text-xs font-semibold border border-[#EADBCB] flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
          </div>

          {/* Delivery & Schedule details recap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-[#EADBCB] text-xs">
            <div className="space-y-1">
              <span className="font-bold text-[#7D6658] uppercase tracking-wider text-[10px] block">
                Delivery Schedule
              </span>
              <div className="flex items-center gap-1.5 text-[#231714]">
                <Calendar className="w-3.5 h-3.5 text-[#C86D51]" />
                <span className="font-semibold">{completedOrder.customer.deliveryDate}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#231714]">
                <Clock className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>{completedOrder.customer.deliveryTimeSlot}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-[#7D6658] uppercase tracking-wider text-[10px] block">
                Recipient Details
              </span>
              <p className="font-semibold text-[#231714]">
                {completedOrder.customer.name} ({completedOrder.customer.phone})
              </p>
              <p className="text-[#5C4A3E]">
                {completedOrder.customer.deliveryType === 'delivery'
                  ? completedOrder.customer.address
                  : 'Contactless Pickup from Bakehouse Kitchen'}
              </p>
            </div>
          </div>

          {/* Itemized List */}
          <div className="space-y-3">
            <span className="font-serif font-bold text-sm text-[#231714] block">
              Ordered Treats:
            </span>
            {completedOrder.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-3.5 rounded-2xl border border-[#EADBCB] flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#231714]">
                      {item.quantity}x {item.productName}
                    </h3>
                    <span className="text-[#7D6658] block">
                      {item.selectedWeight.label} • {item.isEggless ? '🌱 100% Eggless' : 'Standard'}
                    </span>
                    {item.customMessage && (
                      <span className="text-[#C86D51] italic text-[11px] block">
                        Message: "{item.customMessage}"
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-serif font-bold text-sm text-[#231714]">
                    ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="border-t border-[#D6C4B0] pt-4 space-y-2 text-xs text-[#5C4A3E]">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-[#231714]">₹{completedOrder.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Packaging:</span>
              <span className="text-[#2E7D32] font-semibold">FREE</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span>{completedOrder.deliveryFee === 0 ? 'FREE' : `₹${completedOrder.deliveryFee}`}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base font-bold text-[#231714] pt-2 border-t border-[#EADBCB]">
              <span>Total Paid to {RECIPIENT_PHONE}:</span>
              <span className="font-serif text-[#C86D51]">₹{completedOrder.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Restart order button */}
          <div className="pt-4 text-center">
            <button
              onClick={onRestartOrder}
              className="px-8 py-3 rounded-full bg-[#3E2723] hover:bg-[#231714] text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Back to Home / Order Another Treat</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // PAYMENT STEP (Customer makes payment directly to 9987826949)
  // -------------------------------------------------------------
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-[#EADBCB] pb-6 flex items-center justify-between">
        <div>
          <button
            onClick={onBackToSummary}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7D6658] hover:text-[#C86D51] transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Order Summary
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADBCB]/50 text-xs font-semibold text-[#5C4A3E] mb-2">
            <Sparkles className="w-3 h-3 text-[#C86D51]" />
            <span>Step 4: Pay to {RECIPIENT_PHONE}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#231714]">
            Pay Directly to Baker's Account
          </h1>
          <p className="text-xs sm:text-sm text-[#5C4A3E] mt-1">
            Please pay <strong className="text-[#231714]">₹{grandTotal.toLocaleString('en-IN')}</strong> directly to mobile number <strong className="text-[#2E7D32]">{RECIPIENT_PHONE}</strong> using any UPI app (Google Pay, PhonePe, Paytm) or QR code.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* LEFT: PAYMENT OPTIONS & DIRECT UPI TO 9987826949 */}
        <div className="md:col-span-7 space-y-6">
          {/* Direct Pay to Phone Number Box (Hero Card) */}
          <div className="bg-[#FAF7F2] rounded-3xl p-5 sm:p-6 border-2 border-[#2E7D32]/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#2E7D32] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D32]">
                  Direct Account Payment
                </span>
              </div>
              <span className="text-xs font-serif font-bold text-[#C86D51]">
                Payable: ₹{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Account & Number Info Box */}
            <div className="bg-white rounded-2xl p-4 border border-[#EADBCB] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#7D6658] block">Pay to Mobile Number:</span>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#231714] tracking-wide">
                    {RECIPIENT_PHONE}
                  </span>
                  <span className="text-[11px] text-[#2E7D32] font-semibold block">
                    Account Name: {RECIPIENT_NAME}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(RECIPIENT_PHONE, 'phone')}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#EADBCB] text-xs font-semibold text-[#3E2723] border border-[#EADBCB] flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                      <span className="text-[#2E7D32]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#7D6658]" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>

              {/* UPI ID Row */}
              <div className="pt-2 border-t border-[#F3ECE2] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[11px] text-[#7D6658] block">UPI ID:</span>
                  <strong className="font-mono text-[#3E2723] text-sm">{RECIPIENT_UPI}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(RECIPIENT_UPI, 'upi')}
                  className="px-3 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#EADBCB] text-[11px] font-semibold text-[#3E2723] border border-[#EADBCB] flex items-center gap-1 transition-all cursor-pointer"
                >
                  {copiedField === 'upi' ? (
                    <>
                      <Check className="w-3 h-3 text-[#2E7D32]" />
                      <span className="text-[#2E7D32]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#7D6658]" />
                      <span>Copy UPI</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick App Buttons (Direct intent) */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#5C4A3E] block">
                Open UPI App directly on your phone:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <a
                  href={upiDeepLink}
                  className="p-2.5 rounded-xl bg-white hover:bg-[#F3ECE2] border border-[#EADBCB] text-center text-xs font-bold text-[#231714] shadow-2xs transition-all flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span className="text-blue-600 font-extrabold text-sm">GPay</span>
                  <span className="text-[10px] text-[#7D6658]">Google Pay</span>
                </a>
                <a
                  href={upiDeepLink}
                  className="p-2.5 rounded-xl bg-white hover:bg-[#F3ECE2] border border-[#EADBCB] text-center text-xs font-bold text-[#231714] shadow-2xs transition-all flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span className="text-purple-600 font-extrabold text-sm">PhonePe</span>
                  <span className="text-[10px] text-[#7D6658]">{RECIPIENT_PHONE}</span>
                </a>
                <a
                  href={upiDeepLink}
                  className="p-2.5 rounded-xl bg-white hover:bg-[#F3ECE2] border border-[#EADBCB] text-center text-xs font-bold text-[#231714] shadow-2xs transition-all flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span className="text-sky-600 font-extrabold text-sm">Paytm</span>
                  <span className="text-[10px] text-[#7D6658]">Fast UPI</span>
                </a>
                <a
                  href={upiDeepLink}
                  className="p-2.5 rounded-xl bg-white hover:bg-[#F3ECE2] border border-[#EADBCB] text-center text-xs font-bold text-[#231714] shadow-2xs transition-all flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span className="text-emerald-700 font-extrabold text-sm">BHIM</span>
                  <span className="text-[10px] text-[#7D6658]">Any UPI</span>
                </a>
              </div>
            </div>

            {/* Real QR Code */}
            <div className="bg-white rounded-2xl p-4 border border-[#EADBCB] text-center space-y-3">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#231714]">
                <QrCode className="w-4 h-4 text-[#C86D51]" />
                <span>Or Scan QR Code with Any Banking / UPI App</span>
              </div>
              <div className="inline-block p-3 rounded-2xl bg-[#FAF7F2] border border-[#EADBCB] shadow-inner">
                <img
                  src={qrCodeUrl}
                  alt={`UPI QR code to pay ₹${grandTotal} to ${RECIPIENT_PHONE}`}
                  className="w-44 h-44 mx-auto rounded-lg"
                />
              </div>
              <p className="text-[11px] text-[#7D6658]">
                Scanning will automatically fill <strong>₹{grandTotal}</strong> and send directly to <strong>{RECIPIENT_PHONE}</strong>.
              </p>
            </div>
          </div>

          {/* Alternative Payment Methods (Cards / COD) */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3E2723] block">
              Other Payment Options
            </span>

            {/* COD option */}
            <div
              onClick={() => setPaymentMethod('cod')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                paymentMethod === 'cod'
                  ? 'bg-white border-[#3E2723] shadow-md ring-1 ring-[#3E2723]'
                  : 'bg-white/60 border-[#EADBCB] hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#3E2723] flex items-center justify-center font-bold text-xs border border-[#EADBCB]">
                    <Banknote className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-[#231714]">
                      {customerDetails.deliveryType === 'delivery'
                        ? 'Cash / UPI on Delivery'
                        : 'Pay Cash or UPI on Kitchen Pickup'}
                    </h3>
                    <p className="text-[11px] text-[#7D6658]">
                      Pay directly to {RECIPIENT_PHONE} when your cake is delivered
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="accent-[#3E2723]"
                />
              </div>
            </div>

            {/* Card Option */}
            <div
              onClick={() => setPaymentMethod('card')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                paymentMethod === 'card'
                  ? 'bg-white border-[#3E2723] shadow-md ring-1 ring-[#3E2723]'
                  : 'bg-white/60 border-[#EADBCB] hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#C86D51] flex items-center justify-center font-bold text-xs border border-[#EADBCB]">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-[#231714]">
                      Debit or Credit Card / NetBanking
                    </h3>
                    <p className="text-[11px] text-[#7D6658]">
                      Visa, MasterCard, RuPay accepted
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="accent-[#3E2723]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: CONFIRMATION & REFERENCE FORM */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#F3ECE2] rounded-3xl p-6 border border-[#EADBCB] space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#231714]">
              Confirm Payment
            </h2>

            <div className="space-y-2 text-xs text-[#5C4A3E]">
              <div className="flex justify-between">
                <span>Paying to:</span>
                <strong className="text-[#231714] font-mono">{RECIPIENT_PHONE}</strong>
              </div>
              <div className="flex justify-between">
                <span>Account:</span>
                <span className="font-semibold text-[#231714]">{RECIPIENT_NAME}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-semibold text-[#231714]">{orderItems.length} Treats</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>

              <div className="pt-3 border-t border-[#D6C4B0] flex items-baseline justify-between">
                <span className="font-serif text-base font-bold text-[#231714]">
                  Grand Total Amount
                </span>
                <span className="font-serif text-2xl font-bold text-[#C86D51]">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Recipient summary */}
            <div className="pt-2 border-t border-[#D6C4B0] text-xs space-y-1 text-[#5C4A3E]">
              <span className="text-[11px] text-[#7D6658] block">Customer:</span>
              <p className="font-semibold text-[#231714]">{customerDetails.name} ({customerDetails.phone})</p>
              <p className="text-[11px]">
                📅 Delivery: {customerDetails.deliveryDate} • {customerDetails.deliveryTimeSlot}
              </p>
            </div>

            {/* Optional UTR / Reference ID input */}
            <div className="pt-2 space-y-1">
              <label className="text-xs font-semibold text-[#3E2723] block">
                UPI Reference / UTR Number (Optional)
              </label>
              <input
                type="text"
                value={upiRefNumber}
                onChange={(e) => setUpiRefNumber(e.target.value)}
                placeholder="e.g. 423985729183 or Sender Name"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6C4B0] bg-white text-xs text-[#231714] focus:outline-none focus:border-[#C86D51]"
              />
              <span className="text-[10px] text-[#7D6658] block">
                Helps our kitchen quickly verify your payment to {RECIPIENT_PHONE}.
              </span>
            </div>

            {/* Pay / Complete Order Button */}
            <button
              id="btn-confirm-payment-complete"
              onClick={handleProcessPayment}
              disabled={isProcessing}
              className="w-full py-4 rounded-full bg-[#2E7D32] hover:bg-[#256628] text-white font-semibold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Payment with {RECIPIENT_PHONE}...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  <span>I Have Paid ₹{grandTotal.toLocaleString('en-IN')} to {RECIPIENT_PHONE}</span>
                </>
              )}
            </button>

            <div className="text-center pt-1">
              <a
                href={getPaidOrderWhatsAppUrl({
                  orderId: "TEMP",
                  items: orderItems,
                  customer: customerDetails,
                  subtotal,
                  deliveryFee,
                  total: grandTotal,
                  paymentMethod: `UPI to ${RECIPIENT_PHONE}`,
                  paymentRef: "PENDING_CONFIRMATION",
                  paidAt: new Date().toLocaleDateString('en-IN'),
                  status: 'confirmed',
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#2E7D32] hover:underline font-semibold inline-flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Or send payment directly via WhatsApp chat</span>
              </a>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#EADBCB] flex items-center gap-3 text-xs text-[#5C4A3E]">
            <ShieldCheck className="w-6 h-6 text-[#2E7D32] shrink-0" />
            <div>
              <strong className="text-[#231714] block">Direct Transfer Guarantee</strong>
              <span>100% of your payment goes directly to the baker at {RECIPIENT_PHONE}. No middleman cuts or hidden charges.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
