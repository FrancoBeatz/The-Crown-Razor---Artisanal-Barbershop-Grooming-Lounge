import { ClientBooking } from '../types/barber';
import { SHOP_INFO } from '../data/barberData';

/**
 * Parses booking date ("YYYY-MM-DD") and time slot ("HH:MM") into start and end Date objects.
 */
export function getAppointmentDateRange(dateStr: string, timeSlot: string, durationMinutes: number) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeSlot.split(':').map(Number);

  const startDate = new Date(year, month - 1, day, hours, minutes, 0);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

  return { startDate, endDate };
}

/**
 * Formats a Date object to Google Calendar timestamp format (YYYYMMDDTHHmmssZ)
 */
function formatGoogleCalendarTime(date: Date): string {
  return date.toISOString().replace(/-|:|\.\d+/g, '');
}

/**
 * Formats a Date object to iCalendar timestamp format (YYYYMMDDTHHMMSSZ)
 */
function formatICalTime(date: Date): string {
  const pad = (n: number) => (n < 10 ? '0' + n : n);
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  );
}

/**
 * Generates a one-click pre-filled Google Calendar URL.
 */
export function generateGoogleCalendarUrl(booking: ClientBooking): string {
  const totalDuration = booking.services.reduce((acc, s) => acc + s.durationMinutes, 0) || 45;
  const { startDate, endDate } = getAppointmentDateRange(booking.date, booking.timeSlot, totalDuration);

  const barberName = booking.barber === 'any' ? 'Any Master Barber' : booking.barber.name;
  const servicesList = booking.services.map(s => `• ${s.name} ($${s.price})`).join('\n');

  const title = `Barber Appointment: ${booking.services.map(s => s.name).join(' & ')} at ${SHOP_INFO.name}`;
  const details = [
    `APPOINTMENT CONFIRMATION - ${SHOP_INFO.name}`,
    `Reference: ${booking.bookingRef}`,
    `Client: ${booking.clientName}`,
    `Barber: ${barberName}`,
    `Date & Time: ${booking.date} at ${booking.timeSlot}`,
    `Total: $${booking.totalPrice}`,
    ``,
    `Selected Services:`,
    servicesList,
    ``,
    `Location: ${SHOP_INFO.address}, ${SHOP_INFO.city}`,
    `Phone: ${SHOP_INFO.phone}`,
    booking.notes ? `Special Notes: ${booking.notes}` : '',
    ``,
    `Please arrive 5-10 minutes early to enjoy a complimentary espresso or single malt scotch in our private lounge.`
  ].filter(Boolean).join('\n');

  const location = `${SHOP_INFO.name}, ${SHOP_INFO.address}, ${SHOP_INFO.city}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${formatGoogleCalendarTime(startDate)}/${formatGoogleCalendarTime(endDate)}`,
    details: details,
    location: location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates and triggers download of an Apple Calendar / iCal / Outlook compatible .ics file.
 */
export function downloadICalFile(booking: ClientBooking): void {
  const totalDuration = booking.services.reduce((acc, s) => acc + s.durationMinutes, 0) || 45;
  const { startDate, endDate } = getAppointmentDateRange(booking.date, booking.timeSlot, totalDuration);

  const barberName = booking.barber === 'any' ? 'Any Available Master Barber' : booking.barber.name;
  const servicesSummary = booking.services.map(s => s.name).join(' and ');
  const title = `Appointment: ${servicesSummary} - ${SHOP_INFO.name}`;
  const location = `${SHOP_INFO.name}, ${SHOP_INFO.address}, ${SHOP_INFO.city}`;
  
  const description = `Booking Ref: ${booking.bookingRef}\\nBarber: ${barberName}\\nClient: ${booking.clientName}\\nTotal: $${booking.totalPrice}\\nPhone: ${SHOP_INFO.phone}\\nLocation: ${location}\\nArrive 5-10 min early for complimentary lounge refreshments.`;

  const now = new Date();
  const uid = `${booking.bookingRef}-${Date.now()}@crownandrazor.com`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Crown and Razor//Barber Reservation System//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatICalTime(now)}`,
    `DTSTART:${formatICalTime(startDate)}`,
    `DTEND:${formatICalTime(endDate)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Barber Appointment in 1 hour at The Crown & Razor',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `The_Crown_Razor_Appointment_${booking.bookingRef}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
