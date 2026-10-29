import React from 'react';
import { ShieldAlert, Send, Globe, TrendingUp, ArrowUpRight } from 'lucide-react';
import { PageId } from './Navbar';
import { TraderProfile } from '../types/trade';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  profile: TraderProfile;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, profile }) => {
  return (
    <footer className="bg-[#05070A] border-t border-[#1C2533] mt-24">
      {/* Upper Footer: Brand, Navigation, Socials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1A2332] to-[#10151D] border border-gold/40 flex items-center justify-center shadow-gold-glow">
                <div className="flex items-center gap-1">
                  <span className="w-1 h-4 bg-profit rounded-full"></span>
                  <span className="w-1.5 h-5 bg-gold rounded-full"></span>
                  <span className="w-1 h-3 bg-loss rounded-full"></span>
                </div>
              </div>
              <div>
                <span className="font-extrabold text-base tracking-wider text-text-main">
                  {profile.fullName.toUpperCase()}
                </span>
                <span className="block text-[11px] font-semibold tracking-widest text-gold uppercase">
                  {profile.brandName}
                </span>
              </div>
            </div>

            <p className="text-xs text-text-muted leading-relaxed max-w-sm">
              Portfolio shakhsiyeed iyo madal diiwaangelineed oo ku dhisan anshax xisaabeed, falanqaynta institutional orderflow, iyo maamulka sare ee khatarta.
            </p>

            <div className="pt-2">
              <span className="inline-block text-xs font-bold text-gold tracking-wider bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">
                {profile.tagline}
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-main">
              Bogagga Muhiimka ah
            </h4>
            <ul className="space-y-2 text-xs text-text-muted">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">
                  Bogga Hore (Home)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-gold transition-colors">
                  Xogta Shakhsiga (About Me)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('performance')} className="hover:text-gold transition-colors">
                  Waxqabadka (Performance)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-gold transition-colors">
                  Diiwaanka Trades-ka (Journal)
                </button>
              </li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-main">
              Aaladaha & Falanqaynta
            </h4>
            <ul className="space-y-2 text-xs text-text-muted">
              <li>
                <button onClick={() => onNavigate('risk')} className="hover:text-gold transition-colors">
                  Xisaabiyaha Khatarta (Risk Calc)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('analysis')} className="hover:text-gold transition-colors">
                  Falanqaynta Suuqyada (Market Analysis)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-gold transition-colors">
                  La Xiriir Trader-ka (Contact)
                </button>
              </li>
              <li>
                <span className="text-text-dim text-[11px] block pt-1">
                  Xafiiska: {profile.location}
                </span>
              </li>
            </ul>
          </div>

          {/* Social Channels */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-main">
              Baraha Bulshada
            </h4>
            <div className="flex flex-col gap-2 text-xs text-text-muted">
              <a
                href={profile.socialLinks.telegram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-gold" />
                <span>Telegram Channel</span>
                <ArrowUpRight className="w-3 h-3 text-text-dim" />
              </a>
              <a
                href={profile.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-gold" />
                <span>X / Twitter</span>
                <ArrowUpRight className="w-3 h-3 text-text-dim" />
              </a>
              <a
                href={profile.socialLinks.tradingview}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <TrendingUp className="w-3.5 h-3.5 text-gold" />
                <span>TradingView Ideas</span>
                <ArrowUpRight className="w-3 h-3 text-text-dim" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Financial Risk Disclaimer & Copyright */}
      <div className="border-t border-[#141A24] bg-[#030508] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0D121A] border border-[#232E3E]/70 text-[11px] text-text-muted leading-relaxed">
            <ShieldAlert className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-text-main">Digniin ku saabsan Khatarta (Risk Disclaimer):</strong> Trading-ka suuqyada maaliyadda (Forex, Saamiyada, Indices, iyo Commodities) wuxuu xambaarsan yahay khatar sare oo maaliyadeed, kumana habboona qof kasta. Waxqabadka hore ma dammaanad qaadayo natiijooyinka mustaqbalka. Dhammaan xogta ku jirta website-kan waxaa loogu talagalay waxbarasho iyo diiwaangelin shakhsiyeed, mana aha talo maaliyadeed (Not Financial Advice). Weligaa ha gelin suuqa lacag aadan awoodin inaad khasaarto.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-text-dim gap-2 pt-2">
            <div>
              © 2026 {profile.fullName} — {profile.brandName}. Dhammaan xuquuqda waa la dhowray.
            </div>
            <div className="flex items-center gap-4">
              <span>Nidaamka Diiwaangelinta: Version 2.4 Pro</span>
              <span className="w-1 h-1 bg-text-dim rounded-full"></span>
              <span>Anshax &bull; Istaraatiijiyad &bull; Joogteyn</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
