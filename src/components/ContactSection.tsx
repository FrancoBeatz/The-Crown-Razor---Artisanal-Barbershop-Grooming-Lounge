import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation } from 'lucide-react';
import { SHOP_INFO } from '../data/barberData';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0C0F] relative border-t border-[#1C202B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs tracking-[0.25em] uppercase font-bold text-[#C5A059]">
            Location & Concierge
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Visit The Atelier
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] font-light">
            Conveniently situated in the historic Heritage Quarter with valet parking and transit access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left 7 cols: Contact Details & Opening Hours */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Address card */}
              <div className="bg-[#12151D] border border-[#202534] p-6 rounded-sm space-y-3">
                <div className="w-8 h-8 rounded-sm bg-[#1A1F2C] text-[#C5A059] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-serif font-bold text-white">Atelier Address</h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {SHOP_INFO.address}<br />
                  {SHOP_INFO.city}
                </p>
                <div className="pt-1 text-[11px] text-[#C5A059] flex items-center gap-1">
                  <Navigation className="w-3 h-3" />
                  <span>Validated Valet Parking on St. Clair</span>
                </div>
              </div>

              {/* Direct Inquiries */}
              <div className="bg-[#12151D] border border-[#202534] p-6 rounded-sm space-y-3">
                <div className="w-8 h-8 rounded-sm bg-[#1A1F2C] text-[#C5A059] flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-serif font-bold text-white">Direct Concierge</h4>
                <div className="space-y-1.5 text-xs text-[#94A3B8]">
                  <p>
                    <strong className="text-white">Phone: </strong>
                    <a href={`tel:${SHOP_INFO.phone}`} className="hover:text-[#C5A059] font-mono transition-colors">
                      {SHOP_INFO.phone}
                    </a>
                  </p>
                  <p>
                    <strong className="text-white">Email: </strong>
                    <a href={`mailto:${SHOP_INFO.email}`} className="hover:text-[#C5A059] transition-colors">
                      {SHOP_INFO.email}
                    </a>
                  </p>
                </div>
              </div>

            </div>

            {/* Operating Hours Table */}
            <div className="bg-[#12151D] border border-[#202534] p-6 sm:p-8 rounded-sm">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-[#C5A059]" />
                <h3 className="text-lg font-serif font-bold text-white">
                  Chair Operating Hours
                </h3>
              </div>

              <div className="divide-y divide-[#1C212E] text-xs sm:text-sm">
                {SHOP_INFO.hours.map((h, i) => (
                  <div key={i} className="py-3 flex items-center justify-between text-[#CBD5E1]">
                    <span className="font-medium text-white">{h.day}</span>
                    <span className="font-mono text-[#C5A059]">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 cols: Message & Inquiry Form */}
          <div className="lg:col-span-5 bg-[#12151D] border border-[#202534] p-6 sm:p-8 rounded-sm">
            <h3 className="text-lg font-serif font-bold text-white mb-2">
              Send an Atelier Inquiry
            </h3>
            <p className="text-xs text-[#94A3B8] mb-6">
              Have a special event request, bridal party inquiry, or grooming question? Our concierge responds within 2 business hours.
            </p>

            {formSubmitted ? (
              <div className="p-6 bg-[#16201B] border border-[#224430] rounded-sm text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-serif font-bold text-white">Inquiry Received</h4>
                <p className="text-xs text-[#94A3B8]">
                  Thank you, <strong className="text-white">{contactName}</strong>. A Crown & Razor concierge will reach out to you shortly at <span className="font-mono text-[#C5A059]">{contactEmail}</span>.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setContactName('');
                    setContactEmail('');
                    setContactMessage('');
                  }}
                  className="mt-3 text-xs uppercase tracking-wider text-[#C5A059] underline hover:text-white"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Richard Hawthorne"
                    className="w-full px-4 py-2.5 bg-[#181C26] border border-[#2A3142] focus:border-[#C5A059] focus:outline-none rounded-sm text-xs text-white placeholder-[#586478]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="richard@example.com"
                    className="w-full px-4 py-2.5 bg-[#181C26] border border-[#2A3142] focus:border-[#C5A059] focus:outline-none rounded-sm text-xs text-white placeholder-[#586478]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1.5">
                    Message or Special Request
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell us about your event, preferred date, or grooming requirements..."
                    className="w-full px-4 py-2.5 bg-[#181C26] border border-[#2A3142] focus:border-[#C5A059] focus:outline-none rounded-sm text-xs text-white placeholder-[#586478] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-bold uppercase tracking-widest text-[#0D0F12] bg-[#C5A059] hover:bg-[#DFBA73] rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
