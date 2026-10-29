export type MarketCategory = 'Forex' | 'Metals' | 'Indices' | 'Crypto' | 'Commodities';

export type TradeDirection = 'LONG' | 'SHORT';

export type TradeOutcome = 'WIN' | 'LOSS' | 'BREAK_EVEN';

export type EmotionalState = 
  | 'Disciplined' 
  | 'Confident' 
  | 'Patient' 
  | 'Cautious' 
  | 'FOMO' 
  | 'Anxious' 
  | 'Revenge';

export interface Trade {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  pair: string; // e.g. EUR/USD, XAU/USD, NAS100
  category: MarketCategory;
  direction: TradeDirection;
  entryPrice: number;
  exitPrice: number;
  stopLoss: number;
  takeProfit: number;
  positionSize: number; // Lots or contracts
  dollarRisk: number; // $ at risk
  fees: number; // broker commission/swap
  netProfit: number; // Net $ profit or loss
  riskReward: number; // e.g. 2.5 (1:2.5)
  outcome: TradeOutcome;
  strategy: string; // e.g. 'SMC Liquidity Sweep', 'Fair Value Gap', 'Trend Continuation'
  timeframe: string; // '15m', '1h', '4h', 'Daily'
  reason: string; // Setup rationale
  emotions: EmotionalState;
  lessons: string; // Post-trade review & lessons
  chartUrl?: string; // Optional chart screenshot link
  isPublic?: boolean; // Privacy control per trade
}

export interface TraderProfile {
  fullName: string;
  brandName: string;
  tagline: string;
  location: string;
  experienceYears: number;
  specialty: string;
  bio: string;
  tradingStyle: string;
  activeHours: string;
  favoriteMarkets: string[];
  avatarUrl: string;
  rules: string[];
  socialLinks: {
    telegram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
    tradingview: string;
    email: string;
  };
}

export interface PrivacySettings {
  maskBalances: boolean; // Hide dollar values ($ -> *** or %)
  hidePrivateNotes: boolean; // Hide emotional logs and private lessons in public mode
  hideEquityCurve: boolean; // Hide equity curve chart
  isPublicView: boolean; // Toggle between Public Visitor Mode & Private Trader Admin Mode
}

export interface MarketAnalysis {
  id: string;
  title: string;
  date: string;
  pair: string;
  category: MarketCategory | 'Psychology';
  bias: 'Bullish' | 'Bearish' | 'Neutral';
  keySupport: string;
  keyResistance: string;
  summary: string;
  content: string;
  chartUrl: string;
  tags: string[];
  isSample: boolean; // Clearly marked as educational sample
}
