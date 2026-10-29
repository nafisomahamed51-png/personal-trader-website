import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Calculator, 
  HelpCircle, 
  Sliders, 
  CheckCircle2, 
  Info,
  DollarSign,
  TrendingUp,
  Percent
} from 'lucide-react';
import { calculatePositionRisk, PositionCalculationInput } from '../utils/calculations';

export const RiskPage: React.FC = () => {
  const [accountBalance, setAccountBalance] = useState<number>(50000);
  const [riskPercent, setRiskPercent] = useState<number>(1.0);
  const [assetClass, setAssetClass] = useState<'Forex' | 'Metals' | 'Indices' | 'Crypto'>('Metals');
  const [entryPrice, setEntryPrice] = useState<number>(2720.00);
  const [stopLossPrice, setStopLossPrice] = useState<number>(2710.00);
  const [takeProfitPrice, setTakeProfitPrice] = useState<number>(2750.00);

  // Calculation computation
  const calcResult = useMemo(() => {
    return calculatePositionRisk({
      accountBalance,
      riskPercent,
      assetClass,
      entryPrice,
      stopLossPrice,
      takeProfitPrice,
    });
  }, [accountBalance, riskPercent, assetClass, entryPrice, stopLossPrice, takeProfitPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      
      {/* 1. Header */}
      <div className="pb-6 border-b border-[#1E293B]">
        <span className="text-xs font-bold uppercase tracking-widest text-gold block">
          Badbaadada Raasamaalka & Xisaabinta Halista
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-text-main mt-1 tracking-tight">
          Xisaabiyaha Khatarta & Position Size (Risk Management)
        </h1>
        <p className="text-xs text-text-muted mt-1 max-w-2xl">
          Xisaabi cabbirka saxda ah ee lot size-kaaga ka hor intaadan trade galin. Ilaali koontadaada adigoo adeegsanaya hab-xisaabeedka xirfadlayaasha.
        </p>
      </div>

      {/* 2. Main Calculator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#10151D] border border-gold/30 shadow-2xl space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1E293B]">
            <Calculator className="w-5 h-5 text-gold" />
            <h3 className="text-base font-bold text-text-main">Xogta Trade-ka & Koontada</h3>
          </div>

          <div className="space-y-5">
            
            {/* Input 1: Account Balance */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold uppercase text-text-muted">
                  Lacagta Koontada Ku Jirta (Account Balance $) *
                </label>
                <span className="text-xs font-mono text-gold font-bold">
                  ${accountBalance.toLocaleString()}
                </span>
              </div>
              <input
                type="number"
                step="100"
                value={accountBalance || ''}
                onChange={e => setAccountBalance(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm font-mono focus:border-gold focus:outline-none"
              />
            </div>

            {/* Input 2: Risk Percentage with Quick Selectors */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold uppercase text-text-muted">
                  Boqolkiiba Khatarta la Oggol yahay (Risk %) *
                </label>
                <span className={`text-xs font-mono font-bold ${calcResult.isOverRisk ? 'text-loss' : 'text-profit'}`}>
                  {riskPercent}% ({calcResult.isOverRisk ? 'Khatar Sare!' : 'Xeer Anshax leh'})
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="0.25"
                max="5.0"
                step="0.25"
                value={riskPercent}
                onChange={e => setRiskPercent(parseFloat(e.target.value))}
                className="w-full accent-[#D6B56D] h-2 bg-[#151C26] rounded-lg cursor-pointer"
              />

              {/* Quick Pills */}
              <div className="flex items-center gap-2 mt-2">
                {[0.5, 1.0, 1.5, 2.0, 3.0].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRiskPercent(val)}
                    className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
                      riskPercent === val
                        ? 'bg-gold text-[#080B10] shadow-sm'
                        : 'bg-[#151C26] border border-[#232E3E] text-text-muted hover:text-text-main'
                    }`}
                  >
                    {val}%
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Asset Class */}
            <div>
              <label className="block text-xs font-semibold uppercase text-text-muted mb-1.5">
                Nooca Suuqa (Asset Class) *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Metals', 'Forex', 'Indices', 'Crypto'] as const).map(cls => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => {
                      setAssetClass(cls);
                      // Set realistic defaults for demonstration
                      if (cls === 'Metals') {
                        setEntryPrice(2720); setStopLossPrice(2710); setTakeProfitPrice(2750);
                      } else if (cls === 'Forex') {
                        setEntryPrice(1.08500); setStopLossPrice(1.08200); setTakeProfitPrice(1.09200);
                      } else if (cls === 'Indices') {
                        setEntryPrice(20400); setStopLossPrice(20320); setTakeProfitPrice(20650);
                      } else {
                        setEntryPrice(65000); setStopLossPrice(63800); setTakeProfitPrice(68000);
                      }
                    }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      assetClass === cls
                        ? 'bg-gold/20 border-gold text-gold shadow-sm'
                        : 'bg-[#151C26] border-[#232E3E] text-text-muted hover:text-text-main'
                    }`}
                  >
                    {cls === 'Metals' ? 'Dahab (XAU)' : cls === 'Forex' ? 'Forex (Currencies)' : cls === 'Indices' ? 'Indices (NAS/US30)' : 'Crypto (BTC)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Inputs: Entry, Stop-Loss, Take-Profit */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase text-text-muted mb-1">
                  Gelitaanka (Entry Price) *
                </label>
                <input
                  type="number"
                  step="any"
                  value={entryPrice || ''}
                  onChange={e => setEntryPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main font-mono text-xs focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-loss mb-1">
                  Stop-Loss (SL) *
                </label>
                <input
                  type="number"
                  step="any"
                  value={stopLossPrice || ''}
                  onChange={e => setStopLossPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-[#151C26] border border-loss/50 text-loss font-mono text-xs focus:border-loss focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-profit mb-1">
                  Take-Profit (TP)
                </label>
                <input
                  type="number"
                  step="any"
                  value={takeProfitPrice || ''}
                  onChange={e => setTakeProfitPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-[#151C26] border border-profit/50 text-profit font-mono text-xs focus:border-profit focus:outline-none"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Output Results Column */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Recommended Position Size Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#151C26] to-[#10151D] border-2 border-gold/40 shadow-gold-glow space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold block">
                Cabbirka La Soo Jeedinayo (Recommended Size)
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl sm:text-5xl font-black font-mono text-gold">
                  {calcResult.recommendedPositionSize}
                </span>
                <span className="text-sm font-bold text-text-muted">{calcResult.unitName}</span>
              </div>
              <p className="text-xs text-text-dim mt-1">
                Tani waa lot size-ka kugu habboon si aad u dhowrto xadkaaga khatarta.
              </p>
            </div>

            {/* Calculations Breakdown */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#1E293B]">
              <div className="p-3 rounded-xl bg-[#10151D] border border-[#232E3E]">
                <span className="text-[11px] text-text-dim block">Khatarta Lacagta ($ Max Risk)</span>
                <span className="text-base font-black font-mono text-loss block mt-0.5">
                  ${calcResult.maxDollarRisk.toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#10151D] border border-[#232E3E]">
                <span className="text-[11px] text-text-dim block">Saamiga R:R</span>
                <span className="text-base font-black font-mono text-profit block mt-0.5">
                  1 : {calcResult.riskRewardRatio}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#10151D] border border-[#232E3E]">
                <span className="text-[11px] text-text-dim block">Faa'iidada La Filan Karo</span>
                <span className="text-base font-black font-mono text-profit block mt-0.5">
                  +${calcResult.potentialProfit.toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#10151D] border border-[#232E3E]">
                <span className="text-[11px] text-text-dim block">Farqiga Stop-Loss</span>
                <span className="text-base font-mono font-bold text-text-main block mt-0.5">
                  {calcResult.stopLossDistance} Pts/Pips
                </span>
              </div>
            </div>

            {/* Over-Risk Warning */}
            {calcResult.isOverRisk && (
              <div className="p-3.5 rounded-xl bg-loss/15 border border-loss/40 flex items-start gap-2.5 text-xs text-loss leading-relaxed">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Digniin:</strong> Waxaad doortay khatar dhan {riskPercent}% oo ka badan heerka caadiga ah ee 2%. Xisaabaadku wuxuu halis gelin karaa drawdown xad-dhaaf ah!
                </span>
              </div>
            )}
          </div>

          {/* Mathematical Formula Explanation Box */}
          <div className="p-5 rounded-2xl bg-[#10151D] border border-[#232E3E] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
              <Info className="w-4 h-4" />
              <span>Sida Loo Xisaabiyay (Mathematical Formula)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#151C26] font-mono text-xs text-text-main leading-relaxed">
              {calcResult.formulaExplanation}
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Xisaabtu waxay hubinaysaa in haddii qiimuhu taabto Stop-Loss-kaaga, lacagta kaa lumaysa aanay marna dhaafin ${calcResult.maxDollarRisk.toFixed(2)} oo ah dhab ahaan {riskPercent}% ee hantidaada.
            </p>
          </div>

        </div>

      </div>

      {/* 3. The 5 Immutable Laws of Risk Management */}
      <section className="p-8 rounded-3xl bg-[#10151D] border border-gold/25 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold">Xeerarka Maamulka Halista</span>
          <h3 className="text-xl font-black text-text-main mt-1">
            5-ta Xeer ee Badbaadada Koontadaada
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-text-muted">
          <div className="p-4 rounded-xl bg-[#151C26] border border-[#232E3E] space-y-1.5">
            <span className="font-bold text-gold block">1. Xeerka 1% ilaa 2%</span>
            <p>Marna ha u oggolaan hal trade inuu burburiyo shaqo bilo ama sannado ah. Qasaaro 1% ah waxaad ku soo kabsan kartaa hal trade oo wanaagsan.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#151C26] border border-[#232E3E] space-y-1.5">
            <span className="font-bold text-gold block">2. Stop-Loss waa Xaqiijiye</span>
            <p>Marna ha furin trade bilaa Stop-Loss ah. SL ma aha cadaawad; waa caymiska raasamaalkaaga.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#151C26] border border-[#232E3E] space-y-1.5">
            <span className="font-bold text-gold block">3. Xad-gudubka Maalinlaha ah (Daily Loss Limit)</span>
            <p>Haddii aad gaarto khasaaro 3% maalin gudaheed, jooji ganacsiga. Maskaxdaadu waxay u baahan tahay nasasho si aad uga fogaato Revenge Trading.</p>
          </div>
        </div>
      </section>

    </div>
  );
};
