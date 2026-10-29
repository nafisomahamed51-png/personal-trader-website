import { Trade, TraderProfile, PrivacySettings, MarketAnalysis } from '../types/trade';
import { INITIAL_TRADES } from '../data/initialTrades';
import { INITIAL_PROFILE } from '../data/initialProfile';
import { INITIAL_ANALYSES } from '../data/initialAnalyses';

const TRADES_STORAGE_KEY = 'aisha_trades_v1';
const PROFILE_STORAGE_KEY = 'aisha_profile_v1';
const PRIVACY_STORAGE_KEY = 'aisha_privacy_v1';
const ANALYSES_STORAGE_KEY = 'aisha_analyses_v1';

export const DEFAULT_PRIVACY: PrivacySettings = {
  maskBalances: false,
  hidePrivateNotes: false,
  hideEquityCurve: false,
  isPublicView: false, // Default is Trader Admin View, user can switch to Public Visitor mode
};

export function loadTrades(): Trade[] {
  try {
    const raw = localStorage.getItem(TRADES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load trades from localStorage', err);
  }
  return INITIAL_TRADES;
}

export function saveTrades(trades: Trade[]): void {
  try {
    localStorage.setItem(TRADES_STORAGE_KEY, JSON.stringify(trades));
  } catch (err) {
    console.error('Failed to save trades to localStorage', err);
  }
}

export function loadProfile(): TraderProfile {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure we don't accidentally preserve old placeholder name
      if (parsed.fullName && parsed.fullName !== 'Khaalid Warsame') {
        return { ...INITIAL_PROFILE, ...parsed };
      }
    }
  } catch (err) {
    console.warn('Failed to load profile', err);
  }
  return INITIAL_PROFILE;
}

export function saveProfile(profile: TraderProfile): void {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile', err);
  }
}

export function loadPrivacy(): PrivacySettings {
  try {
    const raw = localStorage.getItem(PRIVACY_STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_PRIVACY, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.warn('Failed to load privacy settings', err);
  }
  return DEFAULT_PRIVACY;
}

export function savePrivacy(privacy: PrivacySettings): void {
  try {
    localStorage.setItem(PRIVACY_STORAGE_KEY, JSON.stringify(privacy));
  } catch (err) {
    console.error('Failed to save privacy settings', err);
  }
}

export function loadAnalyses(): MarketAnalysis[] {
  try {
    const raw = localStorage.getItem(ANALYSES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load analyses', err);
  }
  return INITIAL_ANALYSES;
}

export function saveAnalyses(analyses: MarketAnalysis[]): void {
  try {
    localStorage.setItem(ANALYSES_STORAGE_KEY, JSON.stringify(analyses));
  } catch (err) {
    console.error('Failed to save analyses', err);
  }
}

export function resetAllData(): void {
  try {
    localStorage.removeItem(TRADES_STORAGE_KEY);
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    localStorage.removeItem(PRIVACY_STORAGE_KEY);
    localStorage.removeItem(ANALYSES_STORAGE_KEY);
    // Also clean any previous storage
    localStorage.removeItem('kw_trades_v1');
    localStorage.removeItem('kw_profile_v1');
    localStorage.removeItem('kw_privacy_v1');
    localStorage.removeItem('kw_analyses_v1');
  } catch (err) {
    console.error('Failed to reset localStorage', err);
  }
}
