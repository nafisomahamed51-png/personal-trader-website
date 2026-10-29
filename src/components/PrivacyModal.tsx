import React from 'react';
import { X, Shield, Eye, EyeOff, Lock, Check } from 'lucide-react';
import { PrivacySettings } from '../types/trade';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  privacy: PrivacySettings;
  onUpdatePrivacy: (newSettings: PrivacySettings) => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
  privacy,
  onUpdatePrivacy,
}) => {
  if (!isOpen) return null;

  const handleToggle = (key: keyof PrivacySettings) => {
    onUpdatePrivacy({
      ...privacy,
      [key]: !privacy[key],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-[#10151D] border border-gold/30 rounded-2xl p-6 shadow-gold-glow-lg text-text-main relative animate-scaleUp"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#151C26] border border-gold/40 flex items-center justify-center text-gold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-main">Habaynta Asturnaanta & Bandhigga</h3>
              <p className="text-xs text-text-muted">Xakamee waxa dadweynuhu ka arki karaan xogtaada trading-ka.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-[#151C26] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Mode Switcher Card */}
        <div className="mt-5 p-4 rounded-xl bg-[#151C26] border border-[#232E3E]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                Qaabka Muuqaalka (Active View Mode)
              </span>
              <p className="text-xs text-text-muted mt-0.5">
                {privacy.isPublicView 
                  ? 'Muuqaalka Dadweynaha: Waxaa la qariyay xogta xasaasiga ah.'
                  : 'Muuqaalka Trader-ka (Admin): Waxaad arkaysaa dhammaan tirooyinka & xogta gaarka ah.'
                }
              </p>
            </div>
            <button
              onClick={() => handleToggle('isPublicView')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                privacy.isPublicView
                  ? 'bg-profit/15 text-profit border border-profit/40'
                  : 'bg-gold/15 text-gold border border-gold/40'
              }`}
            >
              {privacy.isPublicView ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>{privacy.isPublicView ? 'Dadweyne (Public)' : 'Trader (Private)'}</span>
            </button>
          </div>
        </div>

        {/* Granular Toggles */}
        <div className="mt-5 space-y-3">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Xakamaynta Xogta Gaarka ah
          </span>

          {/* Toggle 1: Mask Balances */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#151C26]/70 border border-[#1E293B] hover:border-[#2A374A] transition-colors">
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-gold flex-shrink-0" />
              <div>
                <span className="text-xs font-semibold text-text-main block">Qari Lacagta Account-ka & Saafiga ($)</span>
                <span className="text-[11px] text-text-muted block">Tus oo keliya boqolkiiba (%) ama xiddigo (***)</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('maskBalances')}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                privacy.maskBalances ? 'bg-gold justify-end' : 'bg-[#232E3E] justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-[#080B10] shadow-sm transform transition-transform" />
            </button>
          </div>

          {/* Toggle 2: Hide Private Notes */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#151C26]/70 border border-[#1E293B] hover:border-[#2A374A] transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-gold flex-shrink-0" />
              <div>
                <span className="text-xs font-semibold text-text-main block">Qari Dareenka & Casharrada Gaarka ah</span>
                <span className="text-[11px] text-text-muted block">Keliya muuji sababta farsamo, qari falanqaynta nafsiga ah</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('hidePrivateNotes')}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                privacy.hidePrivateNotes ? 'bg-gold justify-end' : 'bg-[#232E3E] justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-[#080B10] shadow-sm transform transition-transform" />
            </button>
          </div>

          {/* Toggle 3: Hide Equity Curve */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#151C26]/70 border border-[#1E293B] hover:border-[#2A374A] transition-colors">
            <div className="flex items-center gap-3">
              <EyeOff className="w-4 h-4 text-gold flex-shrink-0" />
              <div>
                <span className="text-xs font-semibold text-text-main block">Qari Jaantuska Equity Curve</span>
                <span className="text-[11px] text-text-muted block">Muuji kaliya win rate iyo metrics-ka guud</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('hideEquityCurve')}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                privacy.hideEquityCurve ? 'bg-gold justify-end' : 'bg-[#232E3E] justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-[#080B10] shadow-sm transform transition-transform" />
            </button>
          </div>
        </div>

        {/* Footer info & OK button */}
        <div className="mt-6 pt-4 border-t border-[#1E293B] flex items-center justify-between">
          <span className="text-[11px] text-text-dim">
            Isbeddeladu waxay si toos ah uga muuqanayaan bogga.
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold text-[#080B10] font-bold text-xs hover:brightness-110 active:scale-95 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Waa Sax / Xir</span>
          </button>
        </div>

      </div>
    </div>
  );
};
