import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  Scissors,
  Check,
  ChevronRight,
  ChevronLeft,
  Download,
  ExternalLink,
  ShieldCheck,
  Tag,
  MapPin,
  Sparkles
} from 'lucide-react';
import { SERVICES_LIST, BARBERS_LIST, SHOP_INFO } from '../data/barberData';
import { BarberService, BarberProfile, ClientBooking } from '../types/barber';
import { generateGoogleCalendarUrl, downloadICalFile } from '../utils/calendar';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedBarberId?: string;
  promoCodeApplied?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedBarberId,
  promoCodeApplied,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServices, setSelectedServices] = useState<BarberService[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<BarberProfile | 'any'>('any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  
  // Client details form
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState<string>('');

  // Completed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<ClientBooking | null>(null);

  // Initialize preselected options when modal opens
  useEffect(() => {
    if (isOpen) {
      // Set initial date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      setSelectedDate(`${yyyy}-${mm}-${dd}`);

      if (preselectedServiceId) {
        const foundService = SERVICES_LIST.find((s) => s.id === preselectedServiceId);
        if (foundService) setSelectedServices([foundService]);
      } else if (selectedServices.length === 0) {
        setSelectedServices([SERVICES_LIST[0]]);
      }

      if (preselectedBarberId) {
        const foundBarber = BARBERS_LIST.find((b) => b.id === preselectedBarberId);
        if (foundBarber) setSelectedBarber(foundBarber);
      }

      if (promoCodeApplied) {
        setPromoCodeInput(promoCodeApplied);
        if (promoCodeApplied.toUpperCase() === 'ROYAL15') {
          setDiscountPercent(15);
        }
      }
    }
  }, [isOpen, preselectedServiceId, preselectedBarberId, promoCodeApplied]);

  if (!isOpen) return null;

  // Compute available dates for next 14 days
  const availableDates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = d.toLocaleDateString('en-US', { day: 'numeric' });
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    return { dateStr, dayName, dayNum, monthName };
  });

  // Time slots
  const morningSlots = ['09:00', '09:45', '10:30', '11:15', '11:45'];
  const afternoonSlots = ['12:30', '13:15', '14:00', '14:45', '15:30', '16:15'];
  const eveningSlots = ['17:00', '17:45', '18:30', '19:15'];

  const toggleService = (service: BarberService) => {
    if (selectedServices.some((s) => s.id === service.id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
      }
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleApplyPromo = () => {
    setPromoError('');
    if (promoCodeInput.trim().toUpperCase() === 'ROYAL15') {
      setDiscountPercent(15);
    } else if (promoCodeInput.trim().toUpperCase() === 'GENTLEMAN20') {
      setDiscountPercent(20);
    } else {
      setPromoError('Invalid promotion code');
    }
  };

  const rawTotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const discountAmount = Math.round((rawTotal * discountPercent) / 100);
  const finalTotal = Math.max(0, rawTotal - discountAmount);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone || !selectedTimeSlot) return;

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const bookingRef = `CR-${randomNum}`;

    const newBooking: ClientBooking = {
      id: `book-${Date.now()}`,
      bookingRef,
      services: selectedServices,
      barber: selectedBarber,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      clientName,
      clientEmail,
      clientPhone,
      notes: clientNotes,
      totalPrice: finalTotal,
      discountApplied: discountAmount,
      promoCode: discountPercent > 0 ? promoCodeInput : undefined,
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(newBooking);
    setStep(5);
  };

  const resetAndClose = () => {
    setStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={resetAndClose}
      />

      {/* Modal Window */}
      <div className="relative w-full max-w-3xl bg-[#12151D] border border-[#272D3D] rounded-sm shadow-2xl overflow-hidden z-10 my-auto text-[#E5E7EB]">
        
        {/* Top Header */}
        <div className="px-6 py-4.5 bg-[#161A24] border-b border-[#242A38] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1F2533] border border-[#C5A059]/40 text-[#C5A059] flex items-center justify-center rounded-sm">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base sm:text-lg text-white">
                {step === 5 ? 'Appointment Confirmed' : 'Reserve Your Atelier Chair'}
              </h2>
              <div className="text-[11px] text-[#94A3B8] font-sans">
                {SHOP_INFO.name} · {SHOP_INFO.address}
              </div>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-1.5 text-[#94A3B8] hover:text-white rounded-sm hover:bg-[#202636] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Steps 1 to 4) */}
        {step < 5 && (
          <div className="px-6 py-3 bg-[#0E1118] border-b border-[#1E2330] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-1">
              {[
                { s: 1, label: 'Services' },
                { s: 2, label: 'Master Barber' },
                { s: 3, label: 'Date & Time' },
                { s: 4, label: 'Your Details' },
              ].map((item) => (
                <button
                  key={item.s}
                  onClick={() => {
                    if (item.s < step) setStep(item.s);
                  }}
                  disabled={item.s > step}
                  className={`flex items-center gap-1.5 whitespace-nowrap uppercase tracking-wider font-semibold transition-colors ${
                    step === item.s
                      ? 'text-[#C5A059]'
                      : item.s < step
                      ? 'text-[#CBD5E1] hover:text-white cursor-pointer'
                      : 'text-[#475569] cursor-not-allowed'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                      step === item.s
                        ? 'bg-[#C5A059] text-[#0D0F12]'
                        : item.s < step
                        ? 'bg-[#262C3A] text-white'
                        : 'bg-[#181C26] text-[#64748B]'
                    }`}
                  >
                    {item.s < step ? '✓' : item.s}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[#C5A059] font-mono text-xs">
              <span>{totalDuration} min</span>
              <span>·</span>
              <span className="font-bold">${finalTotal}</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: SERVICE SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wider font-bold text-[#94A3B8]">
                  Select one or more grooming services:
                </p>
                <span className="text-xs text-[#C5A059]">
                  {selectedServices.length} Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES_LIST.map((service) => {
                  const isSelected = selectedServices.some((s) => s.id === service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service)}
                      className={`p-4 rounded-sm border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#1D2230] border-[#C5A059] shadow-lg shadow-[#C5A059]/10'
                          : 'bg-[#151822] border-[#242A3A] hover:border-[#384157]'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-serif font-bold text-sm text-white">
                            {service.name}
                          </h4>
                          <span className="font-mono text-sm font-bold text-[#C5A059] shrink-0">
                            ${service.price}
                          </span>
                        </div>
                        <p className="text-xs text-[#94A3B8] line-clamp-2 mb-3">
                          {service.tagline}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#222838] text-[11px] text-[#8190A5]">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-[#C5A059]" />
                          {service.durationMinutes} min
                        </span>
                        <div
                          className={`w-4 h-4 rounded-sm flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#C5A059] text-[#0D0F12]'
                              : 'border border-[#475569]'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: BARBER SELECTION */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-wider font-bold text-[#94A3B8]">
                Choose your master craftsman:
              </p>

              {/* Any Barber Option */}
              <div
                onClick={() => setSelectedBarber('any')}
                className={`p-4 rounded-sm border cursor-pointer transition-all flex items-center justify-between ${
                  selectedBarber === 'any'
                    ? 'bg-[#1D2230] border-[#C5A059]'
                    : 'bg-[#151822] border-[#242A3A] hover:border-[#384157]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#1B202C] border border-[#2D3548] rounded-sm flex items-center justify-center text-[#C5A059]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">
                      First Available Master Barber
                    </h4>
                    <p className="text-xs text-[#94A3B8]">
                      Maximum flexibility for your preferred appointment time.
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-sm flex items-center justify-center ${
                    selectedBarber === 'any'
                      ? 'bg-[#C5A059] text-[#0D0F12]'
                      : 'border border-[#475569]'
                  }`}
                >
                  {selectedBarber === 'any' && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>

              {/* Individual Barbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BARBERS_LIST.map((barber) => {
                  const isSelected =
                    selectedBarber !== 'any' && selectedBarber.id === barber.id;
                  return (
                    <div
                      key={barber.id}
                      onClick={() => setSelectedBarber(barber)}
                      className={`p-4 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#1D2230] border-[#C5A059] shadow-md shadow-[#C5A059]/10'
                          : 'bg-[#151822] border-[#242A3A] hover:border-[#384157]'
                      }`}
                    >
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border border-[#384157]">
                          <img
                            src={barber.avatar}
                            alt={barber.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-sm text-white">
                            {barber.name}
                          </h4>
                          <p className="text-[11px] text-[#C5A059]">
                            {barber.title}
                          </p>
                        </div>
                        <p className="text-[11px] text-[#94A3B8] line-clamp-2">
                          {barber.specialty}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#222838] mt-3 flex items-center justify-between text-[11px] text-[#8190A5]">
                        <span className="font-mono">★ {barber.rating}</span>
                        <div
                          className={`w-4 h-4 rounded-sm flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#C5A059] text-[#0D0F12]'
                              : 'border border-[#475569]'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME SELECTION */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Date Scroll Strip */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#94A3B8] mb-2.5">
                  Select Date:
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {availableDates.map((d) => {
                    const isSelected = selectedDate === d.dateStr;
                    return (
                      <button
                        key={d.dateStr}
                        onClick={() => setSelectedDate(d.dateStr)}
                        className={`p-3 rounded-sm border text-center min-w-[70px] shrink-0 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#C5A059] text-[#0D0F12] border-[#C5A059] font-bold shadow-md'
                            : 'bg-[#151822] text-[#CBD5E1] border-[#242A3A] hover:border-[#384157]'
                        }`}
                      >
                        <div className="text-[10px] uppercase">{d.dayName}</div>
                        <div className="text-base font-serif font-bold my-0.5">{d.dayNum}</div>
                        <div className="text-[10px]">{d.monthName}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-4">
                <label className="block text-xs uppercase tracking-wider font-bold text-[#94A3B8]">
                  Select Chair Time Slot for {selectedDate}:
                </label>

                {/* Morning */}
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-[#8C98A9] mb-2">
                    Morning (9:00 AM – 12:00 PM)
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {morningSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 text-xs font-mono rounded-sm border transition-all cursor-pointer ${
                          selectedTimeSlot === slot
                            ? 'bg-[#C5A059] text-[#0D0F12] border-[#C5A059] font-bold'
                            : 'bg-[#151822] text-[#CBD5E1] border-[#242A3A] hover:border-[#384157]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Afternoon */}
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-[#8C98A9] mb-2">
                    Afternoon (12:00 PM – 5:00 PM)
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {afternoonSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 text-xs font-mono rounded-sm border transition-all cursor-pointer ${
                          selectedTimeSlot === slot
                            ? 'bg-[#C5A059] text-[#0D0F12] border-[#C5A059] font-bold'
                            : 'bg-[#151822] text-[#CBD5E1] border-[#242A3A] hover:border-[#384157]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Evening */}
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-[#8C98A9] mb-2">
                    Evening (5:00 PM – 8:00 PM)
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {eveningSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 text-xs font-mono rounded-sm border transition-all cursor-pointer ${
                          selectedTimeSlot === slot
                            ? 'bg-[#C5A059] text-[#0D0F12] border-[#C5A059] font-bold'
                            : 'bg-[#151822] text-[#CBD5E1] border-[#242A3A] hover:border-[#384157]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CLIENT DETAILS & PROMOTION CODE */}
          {step === 4 && (
            <form id="booking-form" onSubmit={handleCompleteBooking} className="space-y-4">
              <p className="text-xs uppercase tracking-wider font-bold text-[#94A3B8]">
                Guest Information & Booking Summary:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Thomas Wayne"
                    className="w-full px-3.5 py-2.5 bg-[#181C26] border border-[#2A3142] focus:border-[#C5A059] focus:outline-none rounded-sm text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">
                    Email Address (For Calendar & Confirmation) *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="thomas@wayne.com"
                    className="w-full px-3.5 py-2.5 bg-[#181C26] border border-[#2A3142] focus:border-[#C5A059] focus:outline-none rounded-sm text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">
                    Mobile Phone (For SMS Reminders) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="(415) 555-0192"
                    className="w-full px-3.5 py-2.5 bg-[#181C26] border border-[#2A3142] focus:border-[#C5A059] focus:outline-none rounded-sm text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">
                    Promotion Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder="e.g. ROYAL15"
                      className="w-full px-3.5 py-2 bg-[#181C26] border border-[#2A3142] focus:border-[#C5A059] focus:outline-none rounded-sm text-xs text-white uppercase font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3 py-2 bg-[#262C3D] hover:bg-[#343C52] text-xs font-semibold uppercase text-white rounded-sm shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                  {discountPercent > 0 && (
                    <span className="text-[11px] text-emerald-400 mt-1 block">
                      ✓ {discountPercent}% discount applied!
                    </span>
                  )}
                  {promoError && (
                    <span className="text-[11px] text-rose-400 mt-1 block">
                      {promoError}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">
                  Special Notes or Beverage Preference (Optional)
                </label>
                <input
                  type="text"
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="e.g. Prefer neat single malt scotch, sensitive skin on neck"
                  className="w-full px-3.5 py-2.5 bg-[#181C26] border border-[#2A3142] focus:border-[#C5A059] focus:outline-none rounded-sm text-xs text-white"
                />
              </div>

              {/* Order Breakdown Box */}
              <div className="p-4 bg-[#161922] border border-[#242A38] rounded-sm space-y-2 text-xs">
                <div className="flex justify-between text-[#94A3B8]">
                  <span>Barber:</span>
                  <span className="text-white font-medium">
                    {selectedBarber === 'any' ? 'First Available Master Barber' : selectedBarber.name}
                  </span>
                </div>
                <div className="flex justify-between text-[#94A3B8]">
                  <span>Date & Time:</span>
                  <span className="text-white font-mono">
                    {selectedDate} at {selectedTimeSlot || 'Not Selected'}
                  </span>
                </div>
                <div className="flex justify-between text-[#94A3B8]">
                  <span>Services Subtotal ({totalDuration} min):</span>
                  <span className="font-mono text-white">${rawTotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discountPercent}%):</span>
                    <span className="font-mono">-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-[#222736] text-sm font-bold text-white">
                  <span>Total Due at Chair:</span>
                  <span className="font-mono text-[#C5A059] text-base">${finalTotal}</span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 5: BOOKING CONFIRMATION & CALENDAR INTEGRATION */}
          {step === 5 && confirmedBooking && (
            <div className="space-y-6 py-2">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#182B20] border border-[#2B6040] text-emerald-400 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Chair Successfully Reserved!
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8]">
                  We look forward to welcoming you, <strong className="text-white">{confirmedBooking.clientName}</strong>.
                </p>
                <div className="inline-block bg-[#1B202C] border border-[#2A3142] px-4 py-1.5 rounded-sm text-xs font-mono text-[#C5A059]">
                  Booking Reference: <strong className="text-white">{confirmedBooking.bookingRef}</strong>
                </div>
              </div>

              {/* Receipt Card */}
              <div className="p-5 bg-[#151922] border border-[#252B3A] rounded-sm space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[#202534]">
                  <div>
                    <span className="text-[#8391A3] block">Date & Time</span>
                    <span className="text-white font-mono font-medium">
                      {confirmedBooking.date} @ {confirmedBooking.timeSlot}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8391A3] block">Master Barber</span>
                    <span className="text-white font-medium">
                      {confirmedBooking.barber === 'any'
                        ? 'First Available Master Barber'
                        : confirmedBooking.barber.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8391A3] block">Atelier Location</span>
                    <span className="text-white">
                      {SHOP_INFO.address}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8391A3] block">Total Service Value</span>
                    <span className="text-[#C5A059] font-mono font-bold text-sm">
                      ${confirmedBooking.totalPrice}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[#8391A3] block mb-1">Booked Services:</span>
                  <div className="space-y-1">
                    {confirmedBooking.services.map((s) => (
                      <div key={s.id} className="flex justify-between text-white">
                        <span>• {s.name}</span>
                        <span className="font-mono text-[#C5A059]">${s.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CALENDAR INTEGRATION BUTTONS */}
              <div className="space-y-3 pt-2">
                <div className="text-xs uppercase tracking-wider font-bold text-[#C5A059] text-center">
                  Add This Appointment to Your Calendar:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Google Calendar */}
                  <a
                    href={generateGoogleCalendarUrl(confirmedBooking)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#1C212E] hover:bg-[#272E3F] border border-[#2E374A] rounded-sm text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all group"
                  >
                    <CalendarIcon className="w-4 h-4 text-[#C5A059]" />
                    <span>Add to Google Calendar</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8493A8] group-hover:text-white" />
                  </a>

                  {/* Apple / iCal (.ics) */}
                  <button
                    onClick={() => downloadICalFile(confirmedBooking)}
                    className="p-3 bg-[#1C212E] hover:bg-[#272E3F] border border-[#2E374A] rounded-sm text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#C5A059]" />
                    <span>Download Apple / iCal (.ics)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-[#161A24] border-t border-[#242A38] flex items-center justify-between">
          {step < 5 ? (
            <>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#94A3B8] hover:text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (step === 3 && !selectedTimeSlot) {
                      alert('Please choose a time slot to continue.');
                      return;
                    }
                    setStep(step + 1);
                  }}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#0D0F12] bg-[#C5A059] hover:bg-[#DFBA73] rounded-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  form="booking-form"
                  className="px-7 py-2.5 text-xs font-bold uppercase tracking-widest text-[#0D0F12] bg-[#C5A059] hover:bg-[#DFBA73] rounded-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Confirm Reservation</span>
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex justify-end">
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#0D0F12] bg-[#C5A059] hover:bg-[#DFBA73] rounded-sm transition-all"
              >
                Done
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
