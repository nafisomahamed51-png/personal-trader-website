import React, { useState } from 'react';
import { 
  BarChart3, 
  BookOpen, 
  ShieldCheck, 
  TrendingUp, 
  User, 
  Mail, 
  Menu, 
  X, 
  PlusCircle, 
  Eye, 
  EyeOff,
  Home,
  SlidersHorizontal
} from 'lucide-react';
import { PrivacySettings, TraderProfile } from '../types/trade';

export type PageId = 'home' | 'about' | 'performance' | 'journal' | 'risk' | 'analysis' | 'contact';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  privacy: PrivacySettings;
  onOpenPrivacyModal: () => void;
  onOpenAddTradeModal: () => void;
  profile: TraderProfile;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  privacy,
  onOpenPrivacyModal,
  onOpenAddTradeModal,
  profile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Bogga Hore', icon: <Home className="w-4 h-4" /> },
    { id: 'about', label: 'Xogta Shakhsiga', icon: <User className="w-4 h-4" /> },
    { id: 'performance', label: 'Waxqabadka', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'journal', label: 'Diiwaanka Trades', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'risk', label: 'Maaraynta Khatarta', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'analysis', label: 'Falanqaynta Suuqyada', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'contact', label: 'Xiriirka', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#080B10]/90 backdrop-blur-xl border-b border-[#232E3E]/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1A2332] to-[#10151D] border border-gold/40 flex items-center justify-center shadow-gold-glow group-hover:border-gold transition-all duration-300">
              {/* Candlestick Monogram Icon */}
              <div className="flex items-center gap-1">
                <span className="w-1 h-5 bg-profit rounded-full"></span>
                <span className="w-1.5 h-6 bg-gold rounded-full shadow-sm"></span>
                <span className="w-1 h-4 bg-loss rounded-full"></span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-wider text-text-main group-hover:text-gold transition-colors">
                {profile.fullName.toUpperCase()}
              </span>
              <span className="text-[11px] font-medium tracking-widest text-gold uppercase">
                {profile.brandName}
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-[#151C26] text-gold border border-gold/30 shadow-sm'
                      : 'text-text-muted hover:text-text-main hover:bg-[#151C26]/50'
                  }`}
                >
                  <span className={isActive ? 'text-gold' : 'text-text-dim'}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Privacy Mode Indicator & Button */}
            <button
              onClick={onOpenPrivacyModal}
              title="Habaynta Asturnaanta (Privacy Settings)"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                privacy.isPublicView
                  ? 'border-profit/40 bg-profit/10 text-profit hover:bg-profit/20'
                  : 'border-[#232E3E] bg-[#151C26] text-text-muted hover:text-text-main hover:border-gold/30'
              }`}
            >
              {privacy.isPublicView ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-profit" />
                  <span>Muuqaalka Dadweynaha</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-gold" />
                  <span>Muuqaalka Trader-ka</span>
                </>
              )}
              <SlidersHorizontal className="w-3 h-3 text-text-dim" />
            </button>

            {/* Quick Add Trade CTA */}
            <button
              onClick={onOpenAddTradeModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#D6B56D] to-[#B39247] text-[#080B10] font-bold text-xs shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Diiwaangeli Trade</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenPrivacyModal}
              className="p-2 rounded-lg bg-[#151C26] border border-[#232E3E] text-gold"
              aria-label="Privacy mode"
            >
              {privacy.isPublicView ? <Eye className="w-4 h-4 text-profit" /> : <EyeOff className="w-4 h-4 text-gold" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-[#151C26] border border-[#232E3E] text-text-main hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sliding Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#10151D] border-b border-[#232E3E] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#1A2332]">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Liiska Bogagga
            </span>
            <button
              onClick={onOpenPrivacyModal}
              className="text-xs text-gold flex items-center gap-1.5 font-medium"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Habaynta Asturnaanta
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1.5 pt-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#151C26] text-gold border border-gold/40 shadow-sm'
                      : 'text-text-muted hover:text-text-main hover:bg-[#151C26]/60'
                  }`}
                >
                  <span className={isActive ? 'text-gold' : 'text-text-dim'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#1A2332]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAddTradeModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#D6B56D] to-[#B39247] text-[#080B10] font-bold text-sm shadow-gold-glow"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Diiwaangeli Trade Cusub</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
