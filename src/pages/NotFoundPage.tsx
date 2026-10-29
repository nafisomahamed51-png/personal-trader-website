import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { PageId } from '../components/Navbar';

interface NotFoundPageProps {
  onNavigate: (page: PageId) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6 animate-fadeIn">
      <div className="w-20 h-20 rounded-3xl bg-gold/10 border border-gold/40 flex items-center justify-center text-gold text-3xl font-black shadow-gold-glow">
        404
      </div>
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-text-main">
          Boggan Lama Helin (Page Not Found)
        </h2>
        <p className="text-xs sm:text-sm text-text-muted mt-2 max-w-md mx-auto">
          Bogga aad raadinayso ma jiro ama waa la beddelay. Fadlan dib ugu laabo bogga hore ee portfolio-ga.
        </p>
      </div>
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6B56D] to-[#B39247] text-[#080B10] font-bold text-xs shadow-gold-glow hover:brightness-110 transition-all"
      >
        <Home className="w-4 h-4" />
        <span>Ku Noqo Bogga Hore</span>
      </button>
    </div>
  );
};
