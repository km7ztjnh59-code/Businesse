import React from 'react';
import { Star, Heart, Quote, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/bakeryData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#F5EFE6] border-y border-[#EADBCB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#EADBCB] text-[#C86D51] text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#C86D51]" />
            Love from Our Neighborhood
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#231714] tracking-tight mb-4">
            Words from Happy Sweet Tooths
          </h2>
          <p className="text-base sm:text-lg text-[#5C4A3E]">
            Nothing makes our kitchen happier than being part of your milestones and sweet cravings.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              id={`review-card-${review.id}`}
              className="bg-[#FAF7F2] p-7 rounded-2xl border border-[#EADBCB] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D98242] text-[#D98242]" />
                  ))}
                  <span className="text-xs font-semibold text-[#7D6658] ml-2">5.0</span>
                </div>

                {/* Comment */}
                <div className="relative mb-6">
                  <Quote className="w-6 h-6 text-[#EADBCB] mb-2" />
                  <p className="text-[#3E2723] text-sm sm:text-base leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              </div>

              {/* Author & Cake details */}
              <div className="pt-4 border-t border-[#EADBCB] flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-[#231714] text-base flex items-center gap-1.5">
                    {review.name}
                    <CheckCircle className="w-3.5 h-3.5 text-[#2E7D32]" />
                  </h4>
                  <p className="text-xs text-[#7D6658] mt-0.5">{review.occasion}</p>
                </div>

                <div className="text-right">
                  <span className="inline-block text-[11px] bg-[#F3ECE2] text-[#3E2723] font-medium px-2 py-0.5 rounded-md">
                    {review.cakeOrdered}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust summary strip */}
        <div className="mt-12 text-center text-xs text-[#7D6658] flex flex-wrap items-center justify-center gap-6">
          <span>⭐️ <strong>4.9 Average Rating</strong> across 150+ reviews</span>
          <span>•</span>
          <span>🎂 <strong>Over 500+ Celebrations</strong> Sweetened</span>
          <span>•</span>
          <span>❤️ <strong>100% Home Kitchen Baked</strong></span>
        </div>
      </div>
    </section>
  );
};
