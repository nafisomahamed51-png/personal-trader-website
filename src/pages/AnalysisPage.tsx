import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Search, 
  Plus, 
  Calendar, 
  ArrowRight, 
  Tag, 
  ShieldAlert, 
  Filter,
  Eye,
  Sparkles
} from 'lucide-react';
import { MarketAnalysis, MarketCategory } from '../types/trade';

interface AnalysisPageProps {
  analyses: MarketAnalysis[];
  onOpenAnalysis: (analysis: MarketAnalysis) => void;
  onOpenCreateAnalysis: () => void;
}

export const AnalysisPage: React.FC<AnalysisPageProps> = ({
  analyses,
  onOpenAnalysis,
  onOpenCreateAnalysis,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Metals', 'Forex', 'Indices', 'Crypto', 'Psychology'];

  const filteredAnalyses = useMemo(() => {
    return analyses.filter(item => {
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
        return false;
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchPair = item.pair.toLowerCase().includes(q);
        const matchSummary = item.summary.toLowerCase().includes(q);
        const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchPair && !matchSummary && !matchTags) return false;
      }
      return true;
    });
  }, [analyses, selectedCategory, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#1E293B]">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold block">
            Falanqaynta & Qoraallada Waxbarashada
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-text-main mt-1 tracking-tight">
            Falanqaynta Suuqyada & Cilmi-Baarista
          </h1>
          <p className="text-xs text-text-muted mt-1 max-w-xl">
            Aragtiyaha farsamo ee suuqyada dahabka, lacagaha, iyo indices-ka, oo ay weheliyaan qoraallo ku saabsan maskax-dhiska trading-ka.
          </p>
        </div>

        <button
          onClick={onOpenCreateAnalysis}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6B56D] to-[#B39247] text-[#080B10] font-bold text-xs shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Daabac Falanqayn Cusub</span>
        </button>
      </div>

      {/* 2. Educational Sample Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-[#10151D] border border-gold/30 flex items-start sm:items-center gap-3 text-xs text-text-muted">
        <ShieldAlert className="w-5 h-5 text-gold flex-shrink-0" />
        <p className="leading-relaxed">
          <strong className="text-gold">Xusuusin Muhiim ah:</strong> Dhammaan falanqaynta ku qoran halkan waxaa loogu talagalay <strong>waxbarasho iyo diiwaangelin tusaale ah (Educational Case Studies)</strong>. Ha u isticmaalin sidii calaamado toos ah oo trading (Signal), mana aha talo maaliyadeed.
        </p>
      </div>

      {/* 3. Search & Category Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gold text-[#080B10] shadow-sm'
                  : 'bg-[#151C26] border border-[#232E3E] text-text-muted hover:text-text-main'
              }`}
            >
              {cat === 'ALL' ? 'Dhammaan' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-text-dim absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Raadi mowduuc, pair, ama tag..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
          />
        </div>

      </div>

      {/* 4. Articles Grid */}
      {filteredAnalyses.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#10151D] border border-[#232E3E] space-y-3">
          <p className="text-sm font-bold text-text-main">Wax falanqayn ah lagama helin raadintan.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('ALL'); }}
            className="px-4 py-2 rounded-xl bg-gold text-[#080B10] font-bold text-xs"
          >
            Dib u Celi Filtarrada
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAnalyses.map((item) => (
            <article
              key={item.id}
              onClick={() => onOpenAnalysis(item)}
              className="p-6 rounded-3xl bg-[#151C26] border border-[#232E3E] hover:border-gold/50 transition-all duration-300 cursor-pointer group shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                
                {/* Image if available */}
                {item.chartUrl && (
                  <div className="rounded-2xl overflow-hidden h-48 bg-black relative">
                    <img
                      src={item.chartUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-md ${
                        item.bias === 'Bullish'
                          ? 'bg-profit/80 text-white'
                          : item.bias === 'Bearish'
                          ? 'bg-loss/80 text-white'
                          : 'bg-gold/80 text-[#080B10]'
                      }`}>
                        {item.bias}
                      </span>
                    </div>
                  </div>
                )}

                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-text-dim">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-gold font-semibold">{item.pair}</span>
                    <span>&bull;</span>
                    <span>{item.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Title & Summary */}
                <div>
                  <h3 className="text-lg font-bold text-text-main group-hover:text-gold transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-2 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>

              </div>

              {/* Tags & Action Link */}
              <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="text-[10px] text-text-dim bg-[#10151D] px-2 py-0.5 rounded font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="flex items-center gap-1 text-gold font-bold group-hover:translate-x-1 transition-transform">
                  <span>Akhri Falanqaynta</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </article>
          ))}
        </div>
      )}

    </div>
  );
};
