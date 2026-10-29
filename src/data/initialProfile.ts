import { TraderProfile } from '../types/trade';

export const INITIAL_PROFILE: TraderProfile = {
  fullName: 'Aisha Abdulkadir',
  brandName: 'Aisha Abdulkadir Trading',
  tagline: 'Discipline. Strategy. Consistency.',
  location: '',
  experienceYears: 0,
  specialty: 'Price Action, Smart Money Concepts & Risk Management',
  bio: 'Kusoo dhowow portfolio-gayga rasmiga ah ee trading-ka. Waxaan halkan ku soo bandhigaa diiwaanka trades-kayga dhabta ah, falanqaynta farsamo ee suuqyada maaliyadda, iyo maamulka adag ee khatarta. Falsafaddaydu waxay ku dhisan tahay anshax joogto ah, xisaab cad, iyo ilaalinta raasamaalka.',
  tradingStyle: 'Intraday & Swing Trading',
  activeHours: 'London & New York Sessions',
  favoriteMarkets: ['XAU/USD (Gold)', 'EUR/USD', 'NAS100', 'GBP/JPY', 'BTC/USD'],
  avatarUrl: '', // Default empty so user can upload/set their own photo or use the elegant monogram
  rules: [
    'Badbaadinta Raasamaalka: Weligaa ha gelin khatar ka badan 1% ilaa 2% halkii trade.',
    'Sugitaanka Xaqiijinta: Ha galin trade adigoon arkin Liquidity Sweep iyo Market Structure Shift (MSS).',
    'Ha Eryan Suuqa (No FOMO): Haddii setup-ku ku dhaafo, suuqu berri wuu furnaan doonaa.',
    'Diiwaangelin Toos ah: Trade kasta oo la galo waa in la qoro sababta, natiijada, iyo casharka laga bartay.',
    'Qanacsanaanta Qorshaha: Ha beddelin Stop-Loss marka uu trade-ku socdo.',
  ],
  socialLinks: {
    telegram: 'https://t.me/AishaTrader',
    twitter: 'https://x.com/AishaTrades',
    linkedin: 'https://linkedin.com/in/aisha-abdulkadir-trading',
    youtube: 'https://youtube.com/@AishaTradingDesk',
    tradingview: 'https://tradingview.com/u/AishaTrader',
    email: 'aisha@abdulkadirtrading.com',
  },
};
