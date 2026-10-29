import React, { useState } from 'react';
import { X, Check, Calendar, TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';
import { MarketAnalysis, MarketCategory } from '../types/trade';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisToView?: MarketAnalysis | null;
  isCreateMode?: boolean;
  onSaveAnalysis?: (analysis: MarketAnalysis) => void;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({
  isOpen,
  onClose,
  analysisToView,
  isCreateMode = false,
  onSaveAnalysis,
}) => {
  const [formData, setFormData] = useState<Partial<MarketAnalysis>>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    pair: 'XAU/USD',
    category: 'Metals',
    bias: 'Bullish',
    keySupport: '$2,700',
    keyResistance: '$2,750',
    summary: '',
    content: '',
    chartUrl: '',
    tags: ['Analysis', 'SMC'],
    isSample: true,
  });

  const [tagInput, setTagInput] = useState('');

  if (!isOpen) return null;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.content?.trim()) return;

    if (onSaveAnalysis) {
      onSaveAnalysis({
        id: `ANL-${Date.now().toString().slice(-4)}`,
        title: formData.title.trim(),
        date: formData.date || new Date().toISOString().split('T')[0],
        pair: formData.pair?.trim() || 'EUR/USD',
        category: formData.category || 'Forex',
        bias: formData.bias || 'Neutral',
        keySupport: formData.keySupport || 'N/A',
        keyResistance: formData.keyResistance || 'N/A',
        summary: formData.summary || formData.content.slice(0, 100),
        content: formData.content,
        chartUrl: formData.chartUrl || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
        tags: formData.tags || ['Market'],
        isSample: true,
      });
    }
    onClose();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(t => t !== tagToRemove) || [],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="w-full max-w-2xl my-8 bg-[#10151D] border border-gold/40 rounded-2xl shadow-gold-glow-lg text-text-main overflow-hidden animate-scaleUp"
        role="dialog"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#1E293B] bg-[#151C26] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-main">
                {isCreateMode ? 'Daabac Falanqayn Cusub' : (analysisToView?.pair || 'Falanqaynta')}
              </h3>
              <p className="text-xs text-text-muted">
                {isCreateMode 
                  ? 'La wadaag falanqayntaada farsamo iyo heerarka muhiimka ah.' 
                  : 'Falanqayn qoto-dheer iyo xogta suuqa.'
                }
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-main rounded-lg hover:bg-[#10151D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Mode */}
        {!isCreateMode && analysisToView && (
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  analysisToView.bias === 'Bullish'
                    ? 'bg-profit/15 text-profit border-profit/30'
                    : analysisToView.bias === 'Bearish'
                    ? 'bg-loss/15 text-loss border-loss/30'
                    : 'bg-gold/15 text-gold border-gold/30'
                }`}>
                  Bias: {analysisToView.bias.toUpperCase()}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#151C26] border border-[#232E3E] text-text-muted">
                  {analysisToView.category}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-dim">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span>{analysisToView.date}</span>
                {analysisToView.isSample && (
                  <span className="text-[11px] bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded">
                    Tusaale / Waxbarasho
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-xl font-black text-text-main leading-tight">
                {analysisToView.title}
              </h2>
              <p className="text-xs text-text-muted mt-2 leading-relaxed italic">
                "{analysisToView.summary}"
              </p>
            </div>

            {/* Key Levels Card */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#151C26] border border-[#232E3E]">
              <div>
                <span className="text-[11px] font-bold text-profit uppercase block">Heerka Taageerada (Key Support)</span>
                <span className="text-sm font-mono font-bold text-text-main mt-0.5 block">
                  {analysisToView.keySupport}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-loss uppercase block">Heerka Is-hortaagga (Key Resistance)</span>
                <span className="text-sm font-mono font-bold text-text-main mt-0.5 block">
                  {analysisToView.keyResistance}
                </span>
              </div>
            </div>

            {/* Chart Image */}
            {analysisToView.chartUrl && (
              <div className="rounded-xl overflow-hidden border border-[#232E3E] bg-black">
                <img
                  src={analysisToView.chartUrl}
                  alt={analysisToView.title}
                  className="w-full h-auto max-h-80 object-cover"
                />
              </div>
            )}

            {/* Detailed Content */}
            <div className="p-4 rounded-xl bg-[#151C26]/60 border border-[#232E3E] text-xs leading-relaxed text-text-muted whitespace-pre-line">
              {analysisToView.content}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              {analysisToView.tags.map((tag, i) => (
                <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-[#151C26] border border-[#232E3E] text-gold font-mono">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Educational Disclaimer */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gold/10 border border-gold/20 text-[11px] text-text-muted">
              <ShieldAlert className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <span>
                Falanqayntani waa aragti waxbarasho oo ku salaysan qaab-dhismeedka suuqa. Marna ha u qaadan talo maaliyadeed oo dammaanad qaadaysa faa'iido.
              </span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-gold text-[#080B10] font-bold text-xs hover:brightness-110 transition-all"
              >
                Xir Falanqaynta
              </button>
            </div>
          </div>
        )}

        {/* Create Mode Form */}
        {isCreateMode && (
          <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
                Cinwaanka Falanqaynta (Title) *
              </label>
              <input
                type="text"
                placeholder="e.g. XAU/USD: London Sweep & Target $2,750"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
                  Suuqa / Pair
                </label>
                <input
                  type="text"
                  placeholder="e.g. EUR/USD, XAU/USD"
                  value={formData.pair}
                  onChange={e => setFormData({ ...formData, pair: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
                  Nooca (Category)
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as MarketCategory })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
                >
                  <option value="Forex">Forex</option>
                  <option value="Metals">Metals</option>
                  <option value="Indices">Indices</option>
                  <option value="Crypto">Crypto</option>
                  <option value="Psychology">Psychology / Mindset</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
                  Bias
                </label>
                <select
                  value={formData.bias}
                  onChange={e => setFormData({ ...formData, bias: e.target.value as 'Bullish' | 'Bearish' | 'Neutral' })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
                >
                  <option value="Bullish">Bullish (Kor u socda)</option>
                  <option value="Bearish">Bearish (Hoos u socda)</option>
                  <option value="Neutral">Neutral (Dhex-dhexaad)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
                  Heerka Taageerada (Key Support)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1.08500 ama $2,705"
                  value={formData.keySupport}
                  onChange={e => setFormData({ ...formData, keySupport: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
                  Heerka Is-hortaagga (Key Resistance)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1.09200 ama $2,750"
                  value={formData.keyResistance}
                  onChange={e => setFormData({ ...formData, keyResistance: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
                Faallada & Sharaxaadda Falanqaynta *
              </label>
              <textarea
                rows={4}
                placeholder="Ku qor sharaxaad faahfaahsan oo ku saabsan sababta farsamo..."
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
                Link-ga Sawirka Chart-ka (URL)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/... ama TradingView snapshot link"
                value={formData.chartUrl}
                onChange={e => setFormData({ ...formData, chartUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
              />
            </div>

            {/* Tags input */}
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
                Tags / Qaybaha
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Gold, SMC, London"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#151C26] border border-[#232E3E] text-xs text-text-main focus:border-gold focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-1.5 rounded-lg bg-gold/15 text-gold border border-gold/30 text-xs font-bold hover:bg-gold/25"
                >
                  Ku Dar Tag
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {formData.tags?.map((t, idx) => (
                  <span key={idx} className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-[#151C26] border border-[#232E3E] text-gold">
                    #{t}
                    <button type="button" onClick={() => handleRemoveTag(t)}>
                      <X className="w-3 h-3 text-text-muted hover:text-loss" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E293B] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-muted hover:text-text-main text-xs font-semibold"
              >
                Ka Noqo
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D6B56D] to-[#B39247] text-[#080B10] font-bold text-xs shadow-gold-glow hover:brightness-110 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Daabac Falanqaynta</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
