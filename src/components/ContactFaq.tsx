import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, ChevronDown, ChevronUp, Send, Sparkles } from 'lucide-react';
import { BAKERY_INFO, FAQS } from '../data/bakeryData';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

export const ContactFaq: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquiryDate, setInquiryDate] = useState('');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi Jerryyss Bakery! 👋 My name is ${inquiryName || 'Customer'}.\n\nI have a question about ordering:\n"${inquiryMessage}"\n${
        inquiryDate ? `Date needed: ${inquiryDate}\n` : ''
      }\nCould you please help me? Thank you!`
    );
    window.open(`https://wa.me/${BAKERY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F5EFE6] border-t border-[#EADBCB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#EADBCB] text-[#C86D51] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Always Happy to Help
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#231714] tracking-tight mb-4">
            Contact Us & Frequently Asked
          </h2>
          <p className="text-base sm:text-lg text-[#5C4A3E]">
            Have a question about custom designs, dietary requests, or delivery zones? Reach out anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Interactive Message Form */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#EADBCB] shadow-xs">
              <h3 className="font-serif text-2xl font-bold text-[#231714] mb-6">
                Bakery Information
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-[#5C4A3E]">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F3ECE2] text-[#C86D51] flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#231714]">WhatsApp & Phone</h4>
                    <p className="text-[#5C4A3E]">{BAKERY_INFO.displayPhone}</p>
                    <a
                      href={getGeneralWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#2E7D32] hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      Chat directly on WhatsApp &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F3ECE2] text-[#C86D51] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#231714]">Email</h4>
                    <p className="text-[#5C4A3E]">{BAKERY_INFO.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F3ECE2] text-[#C86D51] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#231714]">Baking & Pickup Hours</h4>
                    <p className="text-xs sm:text-sm text-[#5C4A3E]">{BAKERY_INFO.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F3ECE2] text-[#C86D51] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#231714]">Delivery & Pickup Zone</h4>
                    <p className="text-xs sm:text-sm text-[#5C4A3E]">
                      Free delivery within 5 km for orders over ₹800. Friendly local doorstep delivery and easy contact-free pickup.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Inquiry Form */}
            <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#EADBCB] shadow-xs">
              <h3 className="font-serif text-xl font-bold text-[#231714] mb-2">
                Send a Quick WhatsApp Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-[#7D6658] mb-5">
                Fill this out and click to send your exact question straight into our WhatsApp chat.
              </p>

              <form onSubmit={handleSendInquiry} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#7D6658] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jessica Smith"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADBCB] bg-white text-sm text-[#231714] focus:outline-none focus:border-[#C86D51]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#7D6658] mb-1">
                    Occasion / Delivery Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={inquiryDate}
                    onChange={(e) => setInquiryDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADBCB] bg-white text-sm text-[#231714] focus:outline-none focus:border-[#C86D51]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#7D6658] mb-1">
                    How can we help?
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="e.g. Do you have gluten-friendly brownies this Friday or can I book a custom cake for 15 guests?"
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EADBCB] bg-white text-sm text-[#231714] focus:outline-none focus:border-[#C86D51]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-5 bg-[#2E7D32] hover:bg-[#256628] text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send to Jerryyss Bakery on WhatsApp</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right: FAQ Accordion */}
          <div className="lg:col-span-6">
            <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#EADBCB] shadow-xs">
              <h3 className="font-serif text-2xl font-bold text-[#231714] mb-2">
                Frequently Asked Questions
              </h3>
              <p className="text-xs sm:text-sm text-[#7D6658] mb-6">
                Everything you need to know about our fresh homemade baking process.
              </p>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-[#EADBCB] bg-white/60 overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 text-left font-serif font-bold text-base sm:text-lg text-[#231714] flex items-center justify-between gap-4 cursor-pointer hover:text-[#C86D51] transition-colors"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-[#C86D51] shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#7D6658] shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#5C4A3E] leading-relaxed border-t border-[#EADBCB]/40">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Extra WhatsApp prompt in FAQ */}
              <div className="mt-8 p-4 rounded-xl bg-[#F3ECE2] border border-[#EADBCB] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#231714]">Still have a specific question?</h4>
                  <p className="text-[11px] text-[#7D6658]">Our baker answers WhatsApp messages quickly.</p>
                </div>
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#2E7D32] text-white text-xs font-bold rounded-lg hover:bg-[#256628] transition-colors whitespace-nowrap"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
