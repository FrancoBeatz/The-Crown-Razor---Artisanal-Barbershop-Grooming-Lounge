import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import { TESTIMONIALS, FAQS } from '../data/barberData';

export const TestimonialsSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="reviews" className="py-24 bg-[#0D0F12] relative border-t border-[#1C202B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs tracking-[0.25em] uppercase font-bold text-[#C5A059]">
            Client Acclaim
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Trusted by Leaders, Creators & Discerning Gentlemen
          </h2>
          <div className="flex items-center justify-center gap-1.5 pt-2 text-[#C5A059]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
            ))}
            <span className="text-xs font-mono text-white ml-2 font-bold">4.98 / 5.0 Average</span>
            <span className="text-xs text-[#64748B]">· 1,420+ Reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-[#12151D] border border-[#202534] p-7 rounded-sm flex flex-col justify-between relative group hover:border-[#C5A059]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#64748B] font-mono">{review.date}</span>
                </div>

                <Quote className="w-6 h-6 text-[#2A3142] mb-3 group-hover:text-[#C5A059]/40 transition-colors" />

                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed mb-6 font-light">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1E2330]">
                <div className="text-sm font-serif font-bold text-white">
                  {review.author}
                </div>
                <div className="text-xs text-[#8A97A8]">
                  {review.role}
                </div>
                <div className="text-[11px] text-[#C5A059] mt-1 font-mono">
                  Service: {review.serviceUsed}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto pt-8 border-t border-[#1F2430]">
          <div className="text-center mb-10 space-y-2">
            <div className="text-xs uppercase tracking-widest font-bold text-[#C5A059]">
              Common Questions
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Everything You Need to Know
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#12151D] border border-[#202534] rounded-sm overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:text-[#C5A059] transition-colors"
                  >
                    <span className="text-sm sm:text-base font-serif font-bold text-white">
                      {faq.question}
                    </span>
                    <span className="text-[#C5A059] shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#1C202B]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
