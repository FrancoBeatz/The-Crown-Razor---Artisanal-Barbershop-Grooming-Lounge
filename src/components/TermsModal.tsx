import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { SHOP_INFO } from '../data/barberData';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#12151D] border border-[#2D3547] rounded-sm shadow-2xl overflow-hidden z-10 text-[#E5E7EB] my-auto">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#161A24] border-b border-[#242A38] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-serif font-bold text-lg text-white">
              Terms & Conditions of Service
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-white rounded-sm hover:bg-[#202636] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legal Text Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
          <p className="text-[#CBD5E1]">
            Last updated: September 2026. Welcome to <strong className="text-white">{SHOP_INFO.name}</strong>. By scheduling an appointment or using our services, you agree to comply with and be bound by the following terms.
          </p>

          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-white">1. Appointment Booking & Reservations</h4>
            <p>
              All chair reservations made online or by telephone require accurate contact details (Name, valid Email, and Phone Number). You will receive an automated confirmation and calendar export capability upon successful booking.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-white">2. Cancellation & Rescheduling Policy</h4>
            <p>
              We value the time of both our master craftsmen and our clients. We request at least <strong className="text-white">12 hours advance notice</strong> for any cancellations or schedule modifications. Failure to attend without prior notice ("No-Show") may require advance payment for future bookings.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-white">3. Punctuality & Late Arrivals</h4>
            <p>
              Please arrive 5 to 10 minutes prior to your scheduled service to enjoy our complimentary lounge refreshments. We allow a <strong className="text-white">10-minute grace period</strong> for late arrivals. If you arrive beyond 10 minutes past your start time, we may need to modify your service scope or reschedule to avoid delaying subsequent appointments.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-white">4. Health, Hygiene & Sanitation</h4>
            <p>
              {SHOP_INFO.name} adheres to strict medical-grade sanitation protocols. All straight razor blades are single-use disposable surgical steel, and metal shears are autoclaved. Please notify your barber of any skin sensitivities, allergies, or scalp conditions prior to service.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-white">5. Pricing & Payments</h4>
            <p>
              All prices listed on our menu are in US Dollars and subject to applicable local taxes. Payment is completed in-person after service completion via major credit cards, debit cards, cash, or verified gift vouchers.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-white">6. Service Guarantee</h4>
            <p>
              We stand behind our craft. If you are not completely satisfied with your haircut or beard sculpt, please inform us within 48 hours and we will gladly perform any necessary refinement free of charge.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#161A24] border-t border-[#242A38] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#0D0F12] bg-[#C5A059] hover:bg-[#DFBA73] rounded-sm transition-all"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
