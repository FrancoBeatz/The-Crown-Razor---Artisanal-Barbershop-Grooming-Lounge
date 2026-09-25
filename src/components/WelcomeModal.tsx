import React, { useState } from 'react';
import { X, Gift, Sparkles, Scissors, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SHOP_ASSETS } from '../data/barberData';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimOffer: (code: string) => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  onClaimOffer,
}) => {
  const [email, setEmail] = useState('');
  const [claimed, setClaimed] = useState(false);

  if (!isOpen) return null;

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setClaimed(true);
  };

  const handleApplyAndBook = () => {
    onClaimOffer('ROYAL15');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#12151D] border border-[#2D3547] rounded-sm shadow-2xl overflow-hidden z-10 text-[#E5E7EB]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close welcome modal"
          className="absolute top-4 right-4 z-20 p-1.5 text-[#94A3B8] hover:text-white bg-[#0D0F12]/70 rounded-full hover:bg-[#1E2433] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Visual Banner */}
        <div className="relative h-44 overflow-hidden bg-[#181C26]">
          <img
            src={SHOP_ASSETS.hotShave}
            alt="The Crown & Razor ritual straight razor shave"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12151D] via-[#12151D]/60 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>First-Time Guest Privilege</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white leading-tight">
              15% Off Your Maiden Appointment
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-2 space-y-4">
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-light">
            Welcome to <strong className="text-white">The Crown & Razor</strong>. Experience classical barbering elevated to an art form. Enjoy 15% off any service and a complimentary apothecary styling product on your first chair reservation.
          </p>

          {claimed ? (
            <div className="p-4 bg-[#16211B] border border-[#284C37] rounded-sm space-y-3 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div>
                <div className="text-xs text-[#94A3B8] uppercase tracking-wider font-semibold">
                  Your Exclusive Code
                </div>
                <div className="text-2xl font-mono font-bold text-[#C5A059] tracking-widest my-1">
                  ROYAL15
                </div>
                <p className="text-xs text-[#94A3B8]">
                  Code automatically unlocked for <span className="text-white">{email}</span>.
                </p>
              </div>

              <button
                onClick={handleApplyAndBook}
                className="w-full py-3 text-xs font-bold uppercase tracking-widest text-[#0D0F12] bg-[#C5A059] hover:bg-[#DFBA73] rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Apply 15% Discount & Book Chair</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleClaim} className="space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#8C98A9] mb-1">
                  Enter email to unlock privilege code:
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gentleman@domain.com"
                  className="w-full px-4 py-2.5 bg-[#181C26] border border-[#2A3142] focus:border-[#C5A059] focus:outline-none rounded-sm text-xs text-white placeholder-[#586478]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold uppercase tracking-widest text-[#0D0F12] bg-[#C5A059] hover:bg-[#DFBA73] rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Unlock 15% Welcome Pass</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-[10px] text-center text-[#64748B]">
                No spam. Unsubscribe anytime. Valid for new clients on their inaugural service.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
