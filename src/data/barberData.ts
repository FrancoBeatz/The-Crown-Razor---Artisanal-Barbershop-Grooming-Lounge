import { BarberService, BarberProfile, LookbookItem, Testimonial } from '../types/barber';

// Import generated image assets
import heroImage from '../assets/images/hero_barbershop_interior_1790354017632.jpg';
import hotShaveImage from '../assets/images/barber_service_hot_shave_1790354029731.jpg';
import precisionCutImage from '../assets/images/barber_service_precision_cut_1790354041866.jpg';
import masterBarberImage from '../assets/images/barber_team_master_1790354053952.jpg';
import apothecaryImage from '../assets/images/barber_apothecary_products_1790354064489.jpg';

export const SHOP_ASSETS = {
  hero: heroImage,
  hotShave: hotShaveImage,
  precisionCut: precisionCutImage,
  masterBarber: masterBarberImage,
  apothecary: apothecaryImage,
};

export const SHOP_INFO = {
  name: "The Crown & Razor",
  tagline: "Precision Cuts. Timeless Rituals. Modern Mastery.",
  address: "442 St. Clair Avenue, Heritage Quarter, Suite 100",
  city: "San Francisco, CA 94108",
  phone: "(415) 555-8392",
  email: "concierge@crownandrazor.com",
  instagram: "@crownandrazor",
  hours: [
    { day: "Monday – Thursday", time: "9:00 AM – 8:00 PM", status: "open" },
    { day: "Friday", time: "8:30 AM – 8:30 PM", status: "open" },
    { day: "Saturday", time: "8:00 AM – 6:30 PM", status: "open" },
    { day: "Sunday", time: "10:00 AM – 5:00 PM", status: "open" },
  ],
  amenities: [
    "Complimentary Single Malt Scotch & Espresso",
    "Pre-cut Bespoke Consultation",
    "Apothecary Hot Towel Steam Finish",
    "Heated Italian Leather Barber Chairs",
    "Ultra-High-Speed Private Wi-Fi",
  ]
};

export const SERVICES_LIST: BarberService[] = [
  {
    id: 'sig-cut',
    name: 'The Crown Signature Cut',
    category: 'haircut',
    price: 48,
    durationMinutes: 45,
    tagline: 'Tailored precision cut tailored to facial anatomy & hair growth patterns.',
    description: 'Includes a bespoke consultation, precision shear and clipper work, straight-razor clean neck shave with warm foam, hot eucalyptus towel refresh, and styling with artisanal apothecary clay.',
    popular: true,
    includes: [
      'Comprehensive style consultation',
      'Precision scissor & clipper craft',
      'Straight-razor neck taper',
      'Hot steam eucalyptus towel',
      'Custom apothecary matte/shine styling'
    ]
  },
  {
    id: 'skin-fade',
    name: 'Executive Skin Fade & Foil Razor Finish',
    category: 'haircut',
    price: 54,
    durationMinutes: 50,
    tagline: 'Flawless seamless gradient from skin to desired crown length.',
    description: 'Expert low, mid, or high drop fade blended smoothly down to skin with electric foil razor and straight-blade crisp line enhancement.',
    popular: true,
    includes: [
      'Custom zero-gap taper or drop fade',
      'Electric foil razor smooth finish',
      'Razor sharp line detailing',
      'Scalp tonic invigorating rinse',
      'Matte texture dust or pomade styling'
    ]
  },
  {
    id: 'royal-shave',
    name: 'Royal Hot Lather Straight-Razor Shave',
    category: 'shave',
    price: 46,
    durationMinutes: 45,
    tagline: 'The timeless gentleman’s ritual of deep steam and polished steel.',
    description: 'Pre-shave essential oils, three layered herbal hot steam towels, rich lather applied with badger hair brush, two-pass straight razor shave, and soothing cold alum stone & calming balm.',
    popular: true,
    includes: [
      'Pre-shave botanical essential oil massage',
      '3-stage steaming eucalyptus towels',
      'Badger brush warm foam application',
      'Two-pass artisan straight-razor shave',
      'Cold compress & witch hazel soothing balm'
    ]
  },
  {
    id: 'beard-sculpt',
    name: 'Master Beard Sculpt & Razor Line-Up',
    category: 'shave',
    price: 36,
    durationMinutes: 35,
    tagline: 'Sharp geometric contours, length de-bulking, and organic oil deep conditioning.',
    description: 'Freehand shear sculpting, clipper shaping to enhance jawline structure, warm lather straight-razor cheek and neck lines, finished with hot towel and cedarwood conditioning oil.',
    includes: [
      'Facial profile and jawline assessment',
      'Freehand scissor & clipper taper',
      'Straight-razor clean cheek & neck edging',
      'Warm towel beard steam',
      'Organic cedarwood & jojoba oil finish'
    ]
  },
  {
    id: 'gentleman-combo',
    name: 'The Grand Atelier Cut & Beard Combo',
    category: 'combo',
    price: 78,
    durationMinutes: 70,
    tagline: 'The complete grooming overhaul. Signature haircut paired with full beard sculpting.',
    description: 'Our most requested comprehensive service. Combines the Signature Haircut with full beard de-bulking, razor line work, and double hot towel treatment.',
    popular: true,
    includes: [
      'Full Signature Haircut & Styling',
      'Complete Beard Shaping & Conditioning',
      'Two straight-razor neck & cheek details',
      'Dual hot towel herbal steam rituals',
      'Take-home grooming tip consultation'
    ]
  },
  {
    id: 'vip-crown',
    name: 'The Sovereign VIP Lounge Experience',
    category: 'vip',
    price: 120,
    durationMinutes: 90,
    tagline: 'The ultimate luxury pampering package for weddings, milestones, and discerning gentlemen.',
    description: 'Haircut, Hot Lather Royal Shave or Beard Sculpting, Deep Cleansing Charcoal Facial Mask, Relaxing Scalp & Neck Acupressure Massage, and private lounge beverage service.',
    popular: false,
    includes: [
      'Complete Master Haircut & Beard/Shave',
      'Deep pore black charcoal clay mask',
      'Acupressure scalp & neck tension massage',
      'Under-eye botanical revitalizing patches',
      'Complimentary top-shelf whiskey or espresso'
    ]
  },
  {
    id: 'junior-cut',
    name: 'Young Gentleman Cut (Ages 12 & Under)',
    category: 'haircut',
    price: 34,
    durationMinutes: 30,
    tagline: 'Patient, sharp, and confident cuts for the next generation of gentlemen.',
    description: 'Gentle and precise haircut tailored to young boys, including scissor styling, subtle clipper taper, and gentle rinse.',
    includes: [
      'Patient and engaging consultation',
      'Scissor and gentle clipper cut',
      'Natural pomade styling',
      'Choice of premium juice or craft soda'
    ]
  },
  {
    id: 'grey-blend',
    name: 'Subtle Grey Camouflage & Scalp Therapy',
    category: 'grooming',
    price: 45,
    durationMinutes: 30,
    tagline: 'Natural tone blending that subtly reduces grey hair without looking artificial.',
    description: '10-minute discreet color treatment at the washbasin paired with tea tree scalp detox massage.',
    includes: [
      'Demi-permanent tone matching',
      'Zero harsh line natural fading',
      'Tea tree invigorating scalp detox',
      'Blow-dry & texturizing finish'
    ]
  }
];

export const BARBERS_LIST: BarberProfile[] = [
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    title: 'Founder & Master Craftsman',
    experienceYears: 14,
    specialty: 'Precision Shear Work & Classic Pompadours',
    bio: 'Trained in London and Florence, Marcus founded The Crown & Razor with a singular ethos: reviving traditional barbershop camaraderie while executing the sharpest technical cuts in the city.',
    avatar: masterBarberImage,
    rating: 4.99,
    cutsDelivered: '12,000+',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    title: 'Senior Style Director',
    experienceYears: 10,
    specialty: 'Skin Fades, Textured Crops & Scissor Over Comb',
    bio: 'An award-winning stylist renowned for effortless textured tapers, modern European crops, and precision geometric fades that stay sharp for weeks.',
    avatar: precisionCutImage,
    rating: 4.98,
    cutsDelivered: '8,500+',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  {
    id: 'dante-cole',
    name: 'Dante "Blade" Cole',
    title: 'Master Shave & Beard Artisan',
    experienceYears: 12,
    specialty: 'Straight-Razor Hot Lather & Architectural Beard Sculpting',
    bio: 'Dante is an undisputed master of the straight razor and facial geometry. His hot towel ritual is regarded as a transformative therapeutic experience.',
    avatar: hotShaveImage,
    rating: 4.97,
    cutsDelivered: '9,400+',
    availableDays: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'look-1',
    title: 'The Low Drop Skin Fade & French Crop',
    category: 'fades',
    duration: '50 min',
    price: '$54',
    barberName: 'Elena Rostova',
    description: 'Textured matte top with razor-sharp blunt fringe and seamless drop fade around the ears.',
    tags: ['Skin Fade', 'Matte Clay', 'Drop Fade'],
    imageUrl: precisionCutImage
  },
  {
    id: 'look-2',
    title: 'Heritage Straight-Razor Royal Steam',
    category: 'ritual',
    duration: '45 min',
    price: '$46',
    barberName: 'Dante Cole',
    description: 'Classic three-pass hot steam lather with alum soothing stone and cold compress finish.',
    tags: ['Straight Razor', 'Hot Towel', 'Luxury Ritual'],
    imageUrl: hotShaveImage
  },
  {
    id: 'look-3',
    title: 'Executive Taper & Sculpted Full Beard',
    category: 'beards',
    duration: '70 min',
    price: '$78',
    barberName: 'Marcus Vance',
    description: 'Clean side taper blended effortlessly into sharp, geometric beard cheek lines.',
    tags: ['Beard Sculpt', 'Executive Taper', 'Cedarwood Oil'],
    imageUrl: masterBarberImage
  },
  {
    id: 'look-4',
    title: 'Handcrafted Apothecary Grooming Kit',
    category: 'classic',
    duration: 'Curated Goods',
    price: 'From $24',
    barberName: 'Crown & Razor Apothecary',
    description: 'Small-batch organic pomades, matte texture clays, and botanical beard tonics formulated in-house.',
    tags: ['Apothecary', 'Matte Pomade', 'Beard Balm'],
    imageUrl: apothecaryImage
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Julian Sterling',
    role: 'Managing Partner, Sterling & Co.',
    serviceUsed: 'The Sovereign VIP Lounge Experience',
    rating: 5,
    date: '3 days ago',
    comment: 'Without question the highest echelon of grooming in the city. Marcus and his team understand proportion, restraint, and service. The hot towel and scotch before my board meeting was perfection.'
  },
  {
    id: 't-2',
    author: 'Alexander Kim',
    role: 'Creative Director',
    serviceUsed: 'Executive Skin Fade & Foil Razor Finish',
    rating: 5,
    date: '1 week ago',
    comment: 'Elena delivered the sharpest skin fade I’ve ever had. She took 5 minutes just studying my hair crown before cutting. The booking system was instant and synced right to my Apple calendar.'
  },
  {
    id: 't-3',
    author: 'David Van Houten',
    role: 'Architect & Designer',
    serviceUsed: 'Grand Atelier Cut & Beard Combo',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Dante’s beard sculpt is pure architectural artistry. Cleanest lines, no razor irritation whatsoever. The vibe in the shop is masculine, calm, and unmistakably premium.'
  }
];

export const FAQS = [
  {
    question: "Do you accept walk-ins or is booking required?",
    answer: "We strongly recommend booking in advance through our online calendar to guarantee your preferred master barber and time slot. We accept walk-ins based on real-time chair availability."
  },
  {
    question: "What is your cancellation and rescheduling policy?",
    answer: "We kindly request at least 12 hours notice if you need to reschedule or cancel your appointment so we can offer the chair to clients on our waitlist. You can easily manage your booking from your confirmation email or by calling us."
  },
  {
    question: "What amenities are included with my service?",
    answer: "Every appointment includes a consultation, hot steam towel finish, neck taper shave, custom hair styling, and complimentary access to our beverage lounge featuring single malt scotch, sparkling water, and artisanal espresso."
  },
  {
    question: "How do I add my booked appointment to Google or Apple Calendar?",
    answer: "Upon completing your reservation, our confirmation screen generates instant 'Add to Google Calendar' and 'Download Apple/iCal (.ics)' buttons containing your exact booking details, barber name, and salon address."
  }
];
