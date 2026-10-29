import React, { useState, useEffect } from 'react';
import { X, Check, Calculator, Sparkles } from 'lucide-react';
import { Trade, MarketCategory, TradeDirection, TradeOutcome, EmotionalState } from '../types/trade';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (trade: Trade) => void;
  tradeToEdit?: Trade | null;
}

export const TradeModal: React.FC<TradeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  tradeToEdit,
}) => {
  const [formData, setFormData] = useState<Partial<Trade>>({
    pair: 'XAU/USD',
    category: 'Metals',
    direction: 'LONG',
    entryPrice: 2715.00,
    exitPrice: 2740.00,
    stopLoss: 2705.00,
    takeProfit: 2745.00,
    positionSize: 1.0,
    dollarRisk: 1000,
    fees: 15,
    netProfit: 2485,
    riskReward: 2.5,
    strategy: 'SMC Liquidity Sweep',
    timeframe: '15m',
    reason: '',
    emotions: 'Disciplined',
    lessons: '',
    chartUrl: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().substring(0, 5),
    outcome: 'WIN',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (tradeToEdit) {
      setFormData(tradeToEdit);
    } else {
      setFormData({
        id: `TRD-${Math.floor(1000 + Math.random() * 9000)}`,
        pair: 'XAU/USD',
        category: 'Metals',
        direction: 'LONG',
        entryPrice: 2715.00,
        exitPrice: 2740.00,
        stopLoss: 2705.00,
        takeProfit: 2745.00,
        positionSize: 1.0,
        dollarRisk: 1000,
        fees: 15,
        netProfit: 2485,
        riskReward: 2.5,
        strategy: 'SMC Liquidity Sweep',
        timeframe: '15m',
        reason: '',
        emotions: 'Disciplined',
        lessons: '',
        chartUrl: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().substring(0, 5),
        outcome: 'WIN',
        isPublic: true,
      });
    }
    setErrors({});
  }, [tradeToEdit, isOpen]);

  if (!isOpen) return null;

  // Auto-calculation of P&L and Risk-to-Reward
  const handleAutoCalculate = () => {
    const entry = Number(formData.entryPrice) || 0;
    const exit = Number(formData.exitPrice) || 0;
    const sl = Number(formData.stopLoss) || 0;
    const tp = Number(formData.takeProfit) || 0;
    const size = Number(formData.positionSize) || 1;
    const fees = Number(formData.fees) || 0;
    const dir = formData.direction || 'LONG';
    const cat = formData.category || 'Forex';

    const slDist = Math.abs(entry - sl);
    const tpDist = Math.abs(tp - entry);

    let calcRR = slDist > 0 ? tpDist / slDist : 0;
    let computedPnl = 0;

    const priceDelta = dir === 'LONG' ? exit - entry : entry - exit;

    if (cat === 'Forex') {
      const pips = priceDelta / 0.0001;
      computedPnl = pips * 10 * size - fees;
    } else if (cat === 'Metals') {
      computedPnl = priceDelta * 100 * size - fees;
    } else {
      computedPnl = priceDelta * size - fees;
    }

    let outcome: TradeOutcome = 'BREAK_EVEN';
    if (computedPnl > 5) outcome = 'WIN';
    else if (computedPnl < -5) outcome = 'LOSS';

    setFormData(prev => ({
      ...prev,
      netProfit: Number(computedPnl.toFixed(2)),
      riskReward: Number(calcRR.toFixed(2)),
      outcome,
    }));
  };

  const validate = (): boolean => {
    const err: Record<string, string> = {};
    if (!formData.pair?.trim()) err.pair = 'Fadlan geli suuqa ama pair-ka.';
    if (!formData.entryPrice || formData.entryPrice <= 0) err.entryPrice = 'Qiimaha gelitaanku waa inuu ka weynaadaa 0.';
    if (!formData.stopLoss || formData.stopLoss <= 0) err.stopLoss = 'Stop-loss sax ah geli.';
    if (!formData.date) err.date = 'Taariikhda trade-ka waa muhiim.';
    if (!formData.strategy?.trim()) err.strategy = 'Geli istaraatiijiyadda la adeegsaday.';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    let finalOutcome: TradeOutcome = 'BREAK_EVEN';
    const profit = Number(formData.netProfit) || 0;
    if (profit > 1) finalOutcome = 'WIN';
    else if (profit < -1) finalOutcome = 'LOSS';

    const completeTrade: Trade = {
      id: formData.id || `TRD-${Date.now().toString().slice(-4)}`,
      date: formData.date || new Date().toISOString().split('T')[0],
      time: formData.time || '12:00',
      pair: (formData.pair || 'EUR/USD').toUpperCase().trim(),
      category: formData.category || 'Forex',
      direction: formData.direction || 'LONG',
      entryPrice: Number(formData.entryPrice) || 0,
      exitPrice: Number(formData.exitPrice) || 0,
      stopLoss: Number(formData.stopLoss) || 0,
      takeProfit: Number(formData.takeProfit) || 0,
      positionSize: Number(formData.positionSize) || 1,
      dollarRisk: Number(formData.dollarRisk) || 0,
      fees: Number(formData.fees) || 0,
      netProfit: profit,
      riskReward: Number(formData.riskReward) || 0,
      outcome: finalOutcome,
      strategy: formData.strategy || 'Price Action',
      timeframe: formData.timeframe || '15m',
      reason: formData.reason || '',
      emotions: (formData.emotions as EmotionalState) || 'Disciplined',
      lessons: formData.lessons || '',
      chartUrl: formData.chartUrl || '',
      isPublic: formData.isPublic ?? true,
    };

    onSave(completeTrade);
  };

  const emotionList: EmotionalState[] = [
    'Disciplined',
    'Confident',
    'Patient',
    'Cautious',
    'FOMO',
    'Anxious',
    'Revenge',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="w-full max-w-3xl my-8 bg-[#10151D] border border-gold/40 rounded-2xl shadow-gold-glow-lg text-text-main overflow-hidden animate-scaleUp"
        role="dialog"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1E293B] bg-[#151C26]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-main">
                {tradeToEdit ? 'Wax Ka Beddel Trade-ka' : 'Diiwaangeli Trade Cusub'}
              </h3>
              <p className="text-xs text-text-muted">
                Diiwaangeli xogta farsamo, natiijada, iyo falanqayntaada nafsiga ah.
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
          
          {/* Row 1: Pair, Category, Direction */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Suuqa / Pair *
              </label>
              <input
                type="text"
                placeholder="e.g. XAU/USD, EUR/USD"
                value={formData.pair || ''}
                onChange={e => setFormData({ ...formData, pair: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none"
              />
              {errors.pair && <span className="text-[11px] text-loss mt-1 block">{errors.pair}</span>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Nooca Suuqa (Category)
              </label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as MarketCategory })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none"
              >
                <option value="Forex">Forex</option>
                <option value="Metals">Metals (Gold/Silver)</option>
                <option value="Indices">Indices (NAS100/US30)</option>
                <option value="Crypto">Crypto (BTC/ETH)</option>
                <option value="Commodities">Commodities</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Jiheynta (Direction)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, direction: 'LONG' })}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    formData.direction === 'LONG'
                      ? 'bg-profit/20 border-profit text-profit shadow-sm'
                      : 'bg-[#151C26] border-[#232E3E] text-text-muted hover:text-text-main'
                  }`}
                >
                  BUY / LONG
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, direction: 'SHORT' })}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    formData.direction === 'SHORT'
                      ? 'bg-loss/20 border-loss text-loss shadow-sm'
                      : 'bg-[#151C26] border-[#232E3E] text-text-muted hover:text-text-main'
                  }`}
                >
                  SELL / SHORT
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Entry, Exit, SL, TP */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Gelitaanka (Entry) *
              </label>
              <input
                type="number"
                step="any"
                value={formData.entryPrice ?? ''}
                onChange={e => setFormData({ ...formData, entryPrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none"
              />
              {errors.entryPrice && <span className="text-[11px] text-loss mt-1 block">{errors.entryPrice}</span>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Bixitaanka (Exit) *
              </label>
              <input
                type="number"
                step="any"
                value={formData.exitPrice ?? ''}
                onChange={e => setFormData({ ...formData, exitPrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Stop-Loss (SL) *
              </label>
              <input
                type="number"
                step="any"
                value={formData.stopLoss ?? ''}
                onChange={e => setFormData({ ...formData, stopLoss: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none"
              />
              {errors.stopLoss && <span className="text-[11px] text-loss mt-1 block">{errors.stopLoss}</span>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Take-Profit (TP)
              </label>
              <input
                type="number"
                step="any"
                value={formData.takeProfit ?? ''}
                onChange={e => setFormData({ ...formData, takeProfit: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Row 3: Position Size, Dollar Risk, Fees, Auto-Calculate CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#151C26] border border-[#232E3E]">
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Position Size (Lots)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.positionSize ?? ''}
                onChange={e => setFormData({ ...formData, positionSize: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 rounded-lg bg-[#10151D] border border-[#2A374A] text-text-main text-sm focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Khatarta ($ Risk)
              </label>
              <input
                type="number"
                step="any"
                value={formData.dollarRisk ?? ''}
                onChange={e => setFormData({ ...formData, dollarRisk: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 rounded-lg bg-[#10151D] border border-[#2A374A] text-text-main text-sm focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Kharashyada ($ Fees)
              </label>
              <input
                type="number"
                step="any"
                value={formData.fees ?? ''}
                onChange={e => setFormData({ ...formData, fees: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 rounded-lg bg-[#10151D] border border-[#2A374A] text-text-main text-sm focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleAutoCalculate}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gold/15 border border-gold/40 text-gold font-semibold text-xs hover:bg-gold/25 transition-all"
              >
                <Calculator className="w-4 h-4" />
                <span>Toos u Xisaabi</span>
              </button>
            </div>
          </div>

          {/* Row 4: Net P&L, R:R, Outcome Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Faa'iidada / Khasaaraha Saafiga ($ Net P&L) *
              </label>
              <input
                type="number"
                step="any"
                value={formData.netProfit ?? ''}
                onChange={e => setFormData({ ...formData, netProfit: parseFloat(e.target.value) || 0 })}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border text-sm font-bold focus:outline-none ${
                  (formData.netProfit || 0) > 0 
                    ? 'border-profit/50 text-profit' 
                    : (formData.netProfit || 0) < 0 
                    ? 'border-loss/50 text-loss' 
                    : 'border-[#232E3E] text-text-main'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Saamiga R:R (e.g. 2.5)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.riskReward ?? ''}
                onChange={e => setFormData({ ...formData, riskReward: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Taariikhda & Waqtiga *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={formData.date || ''}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="px-2.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
                />
                <input
                  type="time"
                  value={formData.time || ''}
                  onChange={e => setFormData({ ...formData, time: e.target.value })}
                  className="px-2.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Row 5: Strategy, Timeframe, Emotional State */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Istaraatiijiyadda *
              </label>
              <input
                type="text"
                placeholder="e.g. SMC Liquidity Sweep, FVG Retest"
                value={formData.strategy || ''}
                onChange={e => setFormData({ ...formData, strategy: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none"
              />
              {errors.strategy && <span className="text-[11px] text-loss mt-1 block">{errors.strategy}</span>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Timeframe
              </label>
              <select
                value={formData.timeframe || '15m'}
                onChange={e => setFormData({ ...formData, timeframe: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none"
              >
                <option value="1m">1m</option>
                <option value="5m">5m</option>
                <option value="15m">15m</option>
                <option value="30m">30m</option>
                <option value="1h">1h</option>
                <option value="4h">4h</option>
                <option value="Daily">Daily</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Dareenka Trader-ka (Psychology)
              </label>
              <select
                value={formData.emotions || 'Disciplined'}
                onChange={e => setFormData({ ...formData, emotions: e.target.value as EmotionalState })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none"
              >
                {emotionList.map(em => (
                  <option key={em} value={em}>{em}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 6: Rationale & Lessons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Sababta Loo Galay (Setup Rationale)
              </label>
              <textarea
                rows={2}
                placeholder="Sharax sababta farsamo ee setup-kan..."
                value={formData.reason || ''}
                onChange={e => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Casharrada Laga Bartay (Post-Trade Lessons)
              </label>
              <textarea
                rows={2}
                placeholder="Maxaad ka faa'iiday ama saxday trade-kan..."
                value={formData.lessons || ''}
                onChange={e => setFormData({ ...formData, lessons: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Row 7: Chart URL */}
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
              Sawirka Chart-ka (Image URL / Screenshot Link - Ikhtiyaari)
            </label>
            <input
              type="url"
              placeholder="https://... ama link screenshot ah"
              value={formData.chartUrl || ''}
              onChange={e => setFormData({ ...formData, chartUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-[#1E293B] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-muted hover:text-text-main text-xs font-semibold transition-colors"
            >
              Ka Noqo (Cancel)
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D6B56D] to-[#B39247] text-[#080B10] font-bold text-xs shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>{tradeToEdit ? 'Keydi Isbeddelka' : 'Diiwaangeli Trade-ka'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
