import React from 'react';
import { X, ShieldCheck, Lock } from 'lucide-react';
import { SHOP_INFO } from '../data/barberData';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#12151D] border border-[#2D3547] rounded-sm shadow-2xl overflow-hidden z-10 text-[#E5E7EB] my-auto">
        <div className="px-6 py-4 bg-[#161A24] border-b border-[#242A38] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-serif font-bold text-lg text-white">
              Privacy Policy & Client Data Protection
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-white rounded-sm hover:bg-[#202636] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
          <p className="text-[#CBD5E1]">
            At <strong className="text-white">{SHOP_INFO.name}</strong>, we respect your privacy and are committed to safeguarding personal information collected through our website and booking system.
          </p>

          <div className="space-y-1.5">
            <h4 className="font-serif font-bold text-sm text-white">Information We Collect</h4>
            <p>
              When booking a chair or contacting our concierge, we collect your name, email address, phone number, and appointment preferences solely for service delivery and scheduling notices.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-serif font-bold text-sm text-white">How Information Is Used</h4>
            <p>
              We use your contact details exclusively to generate calendar invitations, send appointment reminders via email or SMS, and process optional discount promotions. We never sell, rent, or trade your personal data to third parties.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-serif font-bold text-sm text-white">Calendar & Device Data</h4>
            <p>
              Google Calendar links and Apple/iCal (.ics) downloads are generated client-side within your browser. No private calendar data is stored on external telemetry servers.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-serif font-bold text-sm text-white">Contacting Data Protection</h4>
            <p>
              If you wish to update or remove your contact records from our client index, please email us at <span className="font-mono text-[#C5A059]">{SHOP_INFO.email}</span>.
            </p>
          </div>
        </div>

        <div className="px-6 py-3.5 bg-[#161A24] border-t border-[#242A38] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#0D0F12] bg-[#C5A059] hover:bg-[#DFBA73] rounded-sm transition-all"
          >
            Close Policy
          </button>
        </div>
      </div>
    </div>
  );
};
