import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Percent, 
  ShieldAlert, 
  Filter, 
  RotateCcw,
  Calendar,
  Lock,
  Layers,
  PieChart
} from 'lucide-react';
import { Trade, PrivacySettings, MarketCategory } from '../types/trade';
import { 
  calculatePerformanceStats, 
  generateEquityCurve, 
  generateMonthlyPerformance, 
  getCategoryBreakdown, 
  getStrategyBreakdown 
} from '../utils/calculations';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';

interface PerformancePageProps {
  trades: Trade[];
  privacy: PrivacySettings;
}

export const PerformancePage: React.FC<PerformancePageProps> = ({ trades, privacy }) => {
  // Filters state
  const [dateRange, setDateRange] = useState<'ALL' | '30D' | '90D' | 'YTD'>('ALL');
  const [selectedPair, setSelectedPair] = useState<string>('ALL');
  const [selectedStrategy, setSelectedStrategy] = useState<string>('ALL');
  const [selectedOutcome, setSelectedOutcome] = useState<'ALL' | 'WIN' | 'LOSS' | 'BREAK_EVEN'>('ALL');

  // Available unique pairs & strategies
  const uniquePairs = useMemo(() => {
    return Array.from(new Set(trades.map(t => t.pair))).sort();
  }, [trades]);

  const uniqueStrategies = useMemo(() => {
    return Array.from(new Set(trades.map(t => t.strategy))).sort();
  }, [trades]);

  // Filtered trades calculation
  const filteredTrades = useMemo(() => {
    return trades.filter(t => {
      // Date filter
      if (dateRange !== 'ALL') {
        const tradeDate = new Date(t.date).getTime();
        const now = new Date('2026-10-27').getTime(); // Using consistent local reference date
        const daysDiff = (now - tradeDate) / (1000 * 60 * 60 * 24);

        if (dateRange === '30D' && daysDiff > 35) return false;
        if (dateRange === '90D' && daysDiff > 95) return false;
        if (dateRange === 'YTD') {
          const tradeYear = t.date.substring(0, 4);
          if (tradeYear !== '2026') return false;
        }
      }

      // Pair filter
      if (selectedPair !== 'ALL' && t.pair !== selectedPair) {
        return false;
      }

      // Strategy filter
      if (selectedStrategy !== 'ALL' && t.strategy !== selectedStrategy) {
        return false;
      }

      // Outcome filter
      if (selectedOutcome !== 'ALL' && t.outcome !== selectedOutcome) {
        return false;
      }

      return true;
    });
  }, [trades, dateRange, selectedPair, selectedStrategy, selectedOutcome]);

  // Performance stats for filtered selection
  const stats = useMemo(() => calculatePerformanceStats(filteredTrades), [filteredTrades]);
  const equityPoints = useMemo(() => generateEquityCurve(filteredTrades), [filteredTrades]);
  const monthlyData = useMemo(() => generateMonthlyPerformance(filteredTrades), [filteredTrades]);
  const categoryData = useMemo(() => getCategoryBreakdown(filteredTrades), [filteredTrades]);
  const strategyData = useMemo(() => getStrategyBreakdown(filteredTrades), [filteredTrades]);

  const handleResetFilters = () => {
    setDateRange('ALL');
    setSelectedPair('ALL');
    setSelectedStrategy('ALL');
    setSelectedOutcome('ALL');
  };

  // Currency Formatter
  const formatMoney = (val: number) => {
    if (privacy.maskBalances && privacy.isPublicView) {
      return '***';
    }
    return `$${Math.abs(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      
      {/* 1. Header & Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#1E293B]">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold block">
            Falanqaynta & Xisaabaadka
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-text-main mt-1 tracking-tight">
            Dashboard-ka Waxqabadka Trading-ka
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Xogta dhabta ah ee xisaabta, jaantusyada koboca hantida, iyo natiijooyinka istaraatiijiyad kasta.
          </p>
        </div>

        {/* Live Filter Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono bg-[#151C26] border border-[#232E3E] px-3.5 py-1.5 rounded-xl text-text-muted">
          <span>Trades la doortay:</span>
          <span className="font-bold text-gold">{filteredTrades.length} / {trades.length}</span>
        </div>
      </div>

      {/* 2. Interactive Filter Toolbar */}
      <section className="p-5 rounded-2xl bg-[#10151D] border border-[#232E3E] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1A2332]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-main">
            <Filter className="w-4 h-4 text-gold" />
            <span>Kala Shaandhee Xogta (Dynamic Filters)</span>
          </div>
          {(dateRange !== 'ALL' || selectedPair !== 'ALL' || selectedStrategy !== 'ALL' || selectedOutcome !== 'ALL') && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 text-xs text-gold hover:underline font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Dib u celi Filtarrada</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Filter 1: Date Range */}
          <div>
            <label className="block text-[11px] font-semibold text-text-muted uppercase mb-1">
              Muddada Taariikhda
            </label>
            <div className="grid grid-cols-4 gap-1">
              {(['ALL', '30D', '90D', 'YTD'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    dateRange === range
                      ? 'bg-gold text-[#080B10] shadow-sm'
                      : 'bg-[#151C26] border border-[#232E3E] text-text-muted hover:text-text-main'
                  }`}
                >
                  {range === 'ALL' ? 'Dhammaan' : range}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 2: Pair */}
          <div>
            <label className="block text-[11px] font-semibold text-text-muted uppercase mb-1">
              Suuqa / Pair
            </label>
            <select
              value={selectedPair}
              onChange={e => setSelectedPair(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
            >
              <option value="ALL">Dhammaan Suuqyada (All)</option>
              {uniquePairs.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Filter 3: Strategy */}
          <div>
            <label className="block text-[11px] font-semibold text-text-muted uppercase mb-1">
              Istaraatiijiyadda
            </label>
            <select
              value={selectedStrategy}
              onChange={e => setSelectedStrategy(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
            >
              <option value="ALL">Dhammaan Istaraatiijiyadaha</option>
              {uniqueStrategies.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Filter 4: Outcome */}
          <div>
            <label className="block text-[11px] font-semibold text-text-muted uppercase mb-1">
              Natiijada (Outcome)
            </label>
            <select
              value={selectedOutcome}
              onChange={e => setSelectedOutcome(e.target.value as any)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
            >
              <option value="ALL">Dhammaan Natiijooyinka</option>
              <option value="WIN">Trades Guulaystay (Wins)</option>
              <option value="LOSS">Trades Khasaaray (Losses)</option>
              <option value="BREAK_EVEN">Break-Even</option>
            </select>
          </div>

        </div>
      </section>

      {/* 3. Empty State Warning if 0 trades match filter */}
      {filteredTrades.length === 0 ? (
        <div className="p-12 rounded-3xl bg-[#10151D] border border-[#232E3E] text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold border border-gold/30 mx-auto flex items-center justify-center">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-text-main">Wax trades ah lagama helin xulashadan</h3>
          <p className="text-xs text-text-muted max-w-sm mx-auto">
            Fadlan beddel ama dib u celi filtarrada si aad u aragto xogta trades-ka kale.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-gold text-[#080B10] font-bold text-xs"
          >
            Dib u Celi Dhammaan
          </button>
        </div>
      ) : (
        <>
          {/* 4. KEY METRICS STATS GRID */}
          <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            
            {/* Metric: Win Rate */}
            <div className="p-4 rounded-2xl bg-[#151C26] border border-profit/30 shadow-md">
              <span className="text-[11px] font-semibold uppercase text-profit block">Win Rate</span>
              <span className="text-2xl font-black font-mono text-profit block mt-1">
                {stats.winRate}%
              </span>
              <span className="text-[11px] text-text-muted block mt-0.5">
                {stats.wonTrades}W / {stats.lostTrades}L / {stats.breakEvenTrades}BE
              </span>
            </div>

            {/* Metric: Profit Factor */}
            <div className="p-4 rounded-2xl bg-[#151C26] border border-gold/30 shadow-md">
              <span className="text-[11px] font-semibold uppercase text-gold block">Profit Factor</span>
              <span className="text-2xl font-black font-mono text-gold block mt-1">
                {stats.profitFactor}
              </span>
              <span className="text-[11px] text-text-muted block mt-0.5">
                Gross P: {formatMoney(stats.grossProfit)}
              </span>
            </div>

            {/* Metric: Net Profit */}
            <div className="p-4 rounded-2xl bg-[#151C26] border border-[#232E3E] shadow-md">
              <span className="text-[11px] font-semibold uppercase text-text-muted block">Net P&L</span>
              <span className={`text-2xl font-black font-mono block mt-1 ${
                stats.netProfit >= 0 ? 'text-profit' : 'text-loss'
              }`}>
                {stats.netProfit >= 0 ? `+${formatMoney(stats.netProfit)}` : `-${formatMoney(stats.netProfit)}`}
              </span>
              <span className="text-[11px] text-text-muted block mt-0.5">Saafiga Guud</span>
            </div>

            {/* Metric: Avg Win vs Avg Loss */}
            <div className="p-4 rounded-2xl bg-[#151C26] border border-[#232E3E] shadow-md">
              <span className="text-[11px] font-semibold uppercase text-text-muted block">Avg Win / Loss</span>
              <span className="text-base font-bold font-mono text-profit block mt-1">
                +{formatMoney(stats.averageWin)}
              </span>
              <span className="text-xs font-mono text-loss block">
                -{formatMoney(stats.averageLoss)}
              </span>
            </div>

            {/* Metric: Avg R:R */}
            <div className="p-4 rounded-2xl bg-[#151C26] border border-[#232E3E] shadow-md">
              <span className="text-[11px] font-semibold uppercase text-text-muted block">Celceliska R:R</span>
              <span className="text-2xl font-black font-mono text-text-main block mt-1">
                1 : {stats.averageRiskReward}
              </span>
              <span className="text-[11px] text-gold block mt-0.5 font-semibold">Asymmetric Edge</span>
            </div>

            {/* Metric: Max Drawdown */}
            <div className="p-4 rounded-2xl bg-[#151C26] border border-loss/30 shadow-md">
              <span className="text-[11px] font-semibold uppercase text-loss block">Max Drawdown</span>
              <span className="text-2xl font-black font-mono text-loss block mt-1">
                {stats.maxDrawdownPercent}%
              </span>
              <span className="text-[11px] text-text-muted block mt-0.5">
                {formatMoney(stats.maxDrawdownDollars)} Peak DD
              </span>
            </div>

          </section>

          {/* 5. MAIN EQUITY CURVE CHART */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#10151D] border border-gold/30 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-text-main tracking-wide">
                  Isbeddelka Hantida Xisaabta (Equity Growth Curve)
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Raad-raaca hantida dhabta ah ee trade kasta ka dib (Bilow: $50,000 baseline).
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-profit">
                  <span className="w-2.5 h-2.5 rounded-full bg-profit"></span>
                  Trade Guulaystay
                </span>
                <span className="flex items-center gap-1.5 text-loss">
                  <span className="w-2.5 h-2.5 rounded-full bg-loss"></span>
                  Trade Khasaaray
                </span>
              </div>
            </div>

            {(!privacy.hideEquityCurve || !privacy.isPublicView) ? (
              <div className="h-80 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={equityPoints} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="dashboardEquityGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D6B56D" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#D6B56D" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      stroke="#637083" 
                      fontSize={11} 
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#637083" 
                      fontSize={11} 
                      tickLine={false}
                      domain={['auto', 'auto']}
                      tickFormatter={(v) => privacy.maskBalances && privacy.isPublicView ? '***' : `$${v.toLocaleString()}`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-[#151C26] border border-gold/40 p-3.5 rounded-xl shadow-2xl text-xs space-y-1">
                              <span className="text-text-dim block font-mono">{data.date} &bull; {data.pair}</span>
                              <span className="font-bold text-gold text-sm block">
                                Equity: {formatMoney(data.equity)}
                              </span>
                              {data.change !== 0 && (
                                <span className={`font-mono font-bold block ${data.change > 0 ? 'text-profit' : 'text-loss'}`}>
                                  {data.change > 0 ? `+${formatMoney(data.change)}` : `-${formatMoney(data.change)}`}
                                </span>
                              )}
                              {data.drawdown > 0 && (
                                <span className="text-[11px] text-loss/80 block">
                                  Drawdown: -{formatMoney(data.drawdown)}
                                </span>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="equity" 
                      stroke="#D6B56D" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#dashboardEquityGrad)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center rounded-2xl bg-[#151C26]/50 border border-[#232E3E] text-center p-6 text-xs text-text-dim">
                <Lock className="w-8 h-8 text-gold/40 mb-2" />
                <span>Jaantuska Equity Curve waxaa lagu qariyay Habka Asturnaanta ee dadweynaha.</span>
              </div>
            )}
          </section>

          {/* 6. MONTHLY P&L BAR CHART */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Monthly P&L */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-[#10151D] border border-[#232E3E] space-y-6">
              <div>
                <h3 className="text-base font-black text-text-main">
                  Faa'iidada & Khasaaraha Bil Kasta (Monthly P&L)
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Natiijada saafiga ah ee bil kasta la gaaray (Green = Faa'iido, Red = Khasaaro).
                </p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <XAxis dataKey="monthName" stroke="#637083" fontSize={11} tickLine={false} />
                    <YAxis 
                      stroke="#637083" 
                      fontSize={11} 
                      tickLine={false}
                      tickFormatter={(v) => privacy.maskBalances && privacy.isPublicView ? '***' : `$${v}`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-[#151C26] border border-[#232E3E] p-3 rounded-xl shadow-xl text-xs space-y-1">
                              <span className="font-bold text-text-main block">{data.monthName}</span>
                              <span className={`font-mono font-bold block ${data.netProfit >= 0 ? 'text-profit' : 'text-loss'}`}>
                                Net: {data.netProfit >= 0 ? `+${formatMoney(data.netProfit)}` : `-${formatMoney(data.netProfit)}`}
                              </span>
                              <span className="text-text-muted text-[11px] block">
                                {data.tradesCount} Trades ({data.wins}W / {data.losses}L) &bull; Win Rate: {data.winRate}%
                              </span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="netProfit" radius={[6, 6, 0, 0]}>
                      {monthlyData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.netProfit >= 0 ? '#20C997' : '#F06565'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right: Breakdown by Market Category */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-[#10151D] border border-[#232E3E] space-y-4">
              <div>
                <h3 className="text-base font-black text-text-main">
                  Waxqabadka Suuq Kasta (Market Breakdown)
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Win rate-ka iyo tirada trades-ka suuq kasta.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {categoryData.map((cat) => (
                  <div key={cat.category} className="p-3.5 rounded-xl bg-[#151C26] border border-[#232E3E] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-text-main">{cat.category}</span>
                      <span className="font-mono text-gold font-semibold">{cat.count} Trades</span>
                    </div>

                    <div className="w-full bg-[#10151D] h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-profit h-full rounded-full transition-all duration-500"
                        style={{ width: `${cat.winRate}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-text-muted font-mono">
                      <span>Win Rate: {cat.winRate}%</span>
                      <span className={cat.netProfit >= 0 ? 'text-profit' : 'text-loss'}>
                        {cat.netProfit >= 0 ? `+${formatMoney(cat.netProfit)}` : `-${formatMoney(cat.netProfit)}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </section>

          {/* 7. PERFORMANCE BY STRATEGY TABLE */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#10151D] border border-[#232E3E] space-y-4">
            <div>
              <h3 className="text-base font-black text-text-main">
                Waxqabadka Istaraatiijiyad Kasta (Strategy Breakdown)
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                Istaraatiijiyadaha ugu faa'iidada badan iyo heerka saxnaantooda.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#1E293B] text-text-dim uppercase text-[11px]">
                    <th className="pb-3 font-semibold">Istaraatiijiyadda</th>
                    <th className="pb-3 font-semibold">Tirada Trades</th>
                    <th className="pb-3 font-semibold">Win Rate</th>
                    <th className="pb-3 font-semibold text-right">Faa'iidada Saafiga</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A2332]">
                  {strategyData.map((st) => (
                    <tr key={st.strategy} className="hover:bg-[#151C26]/50 transition-colors">
                      <td className="py-3 font-bold text-text-main">{st.strategy}</td>
                      <td className="py-3 font-mono text-text-muted">{st.count}</td>
                      <td className="py-3 font-mono font-bold text-profit">{st.winRate}%</td>
                      <td className={`py-3 font-mono font-bold text-right ${st.netProfit >= 0 ? 'text-profit' : 'text-loss'}`}>
                        {st.netProfit >= 0 ? `+${formatMoney(st.netProfit)}` : `-${formatMoney(st.netProfit)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Disclaimer at Bottom of Dashboard */}
          <div className="p-4 rounded-2xl bg-[#0D121A] border border-[#232E3E] flex items-center gap-3 text-xs text-text-muted">
            <ShieldAlert className="w-5 h-5 text-gold flex-shrink-0" />
            <p>
              Xogtan waxay ka timaaddaa diiwaanka trades-ka dhabta ah ee la fuliyay. Waxqabadka hore ma aha dammaanad faa'iido mustaqbalka ah. Marna ha gelin khatar aadan awoodin.
            </p>
          </div>
        </>
      )}

    </div>
  );
};
