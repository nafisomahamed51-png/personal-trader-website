import React from 'react';
import { 
  ArrowUpRight, 
  ArrowRight, 
  BarChart3, 
  BookOpen, 
  ShieldCheck, 
  TrendingUp, 
  Lock, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  Calendar,
  Send,
  Globe
} from 'lucide-react';
import { PageId } from '../components/Navbar';
import { Trade, TraderProfile, PrivacySettings } from '../types/trade';
import { calculatePerformanceStats, generateEquityCurve } from '../utils/calculations';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  trades: Trade[];
  profile: TraderProfile;
  privacy: PrivacySettings;
  onViewTrade: (trade: Trade) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  trades,
  profile,
  privacy,
  onViewTrade,
}) => {
  const stats = calculatePerformanceStats(trades);
  const equityData = generateEquityCurve(trades);
  const recentTrades = [...trades].slice(0, 4);
  const initials = profile.fullName ? profile.fullName.split(' ').map(n => n[0]).filter(Boolean).join('') : 'AA';

  // Formatter for dollar figures considering privacy
  const formatMoney = (val: number) => {
    if (privacy.maskBalances && privacy.isPublicView) {
      return '***';
    }
    return `$${Math.abs(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-20 pb-12 animate-fadeIn">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-16 pb-12 overflow-hidden">
        {/* Subtle background glow effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151C26] border border-gold/30 text-xs text-gold font-bold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
                <span>Khabiir Suuqyada Maaliyadda &bull; Prop & Macro Trader</span>
              </div>

              {/* Trader Name & Brand */}
              <div>
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-text-muted block">
                  {profile.brandName} PRESENTS
                </span>
                <h1 className="text-4xl sm:text-6xl font-black text-text-main tracking-tight leading-none mt-2">
                  {profile.fullName}
                </h1>
              </div>

              {/* Slogan with Gold Gradient Text */}
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-wide gold-gradient-text uppercase">
                  "Discipline. Strategy. Consistency."
                </div>
                <p className="text-sm sm:text-base font-semibold text-text-muted italic">
                  "Anshax &bull; Istaraatiijiyad &bull; Joogteyn"
                </p>
              </div>

              {/* Short Bio / Value Edge */}
              <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
                Kusoo dhowow portfolio-gayga rasmiga ah. Waxaan halkan ku soo bandhigaa xaqiiqada dhabta ah ee trading-ka casriga ah: xeerarka maamulka halista (Risk Management), falanqaynta xisaabeed ee Smart Money Concepts (SMC), iyo diiwaan hufan oo trades ah.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate('performance')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D6B56D] via-[#F5D77F] to-[#B39247] text-[#080B10] font-black text-sm shadow-gold-glow hover:shadow-gold-glow-lg hover:brightness-105 active:scale-95 transition-all"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Eeg Waxqabadkayga</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('journal')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#151C26] border border-gold/40 text-text-main font-bold text-sm hover:border-gold hover:bg-[#1B2432] active:scale-95 transition-all"
                >
                  <BookOpen className="w-4 h-4 text-gold" />
                  <span>Eeg Diiwaanka Trades-ka</span>
                </button>
              </div>

              {/* Social Pills */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 text-xs text-text-muted">
                <span className="text-text-dim">Ila Xiriir:</span>
                <a
                  href={profile.socialLinks.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-text-main hover:text-gold transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-gold" />
                  <span>Telegram</span>
                </a>
                <span className="w-1 h-1 bg-[#232E3E] rounded-full"></span>
                <a
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-text-main hover:text-gold transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-gold" />
                  <span>X / Twitter</span>
                </a>
              </div>

            </div>

            {/* Right Card / Avatar Spotlight */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                
                {/* Glowing border card */}
                <div className="p-1 rounded-3xl bg-gradient-to-b from-gold/40 via-[#151C26] to-gold/10 shadow-2xl">
                  <div className="bg-[#10151D] rounded-[22px] p-6 space-y-6">
                    
                    {/* Trader Portrait & Status */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {profile.avatarUrl ? (
                          <img
                            src={profile.avatarUrl}
                            alt={profile.fullName}
                            className="w-20 h-20 rounded-2xl object-cover border-2 border-gold/50 shadow-md"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1A2332] to-[#10151D] border-2 border-gold/50 flex flex-col items-center justify-center text-gold shadow-md select-none">
                            <span className="font-black text-2xl tracking-wider">{initials}</span>
                            <span className="text-[9px] uppercase font-bold text-text-dim mt-0.5">Trader</span>
                          </div>
                        )}
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-profit rounded-full border-2 border-[#10151D]" title="Active Trader"></span>
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-text-main">{profile.fullName}</h3>
                        <p className="text-xs text-gold font-semibold">{profile.specialty}</p>
                        <span className="inline-block mt-1 text-[11px] text-text-dim">
                          Goobta: {profile.location}
                        </span>
                      </div>
                    </div>

                    {/* Quick Metrics Inside Card */}
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#1E293B]">
                      <div className="p-3 rounded-xl bg-[#151C26] border border-[#232E3E]">
                        <span className="text-[11px] text-text-dim uppercase font-semibold">Anshax & Mabda'</span>
                        <span className="text-base font-black text-text-main block mt-0.5">
                          {profile.experienceYears > 0 ? `${profile.experienceYears}+ Sano` : '100% Anshax'}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#151C26] border border-[#232E3E]">
                        <span className="text-[11px] text-text-dim uppercase font-semibold">Win Rate</span>
                        <span className="text-base font-black text-profit block mt-0.5">{stats.winRate}%</span>
                      </div>
                    </div>

                    {/* Favorite Markets Ticker */}
                    <div>
                      <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2">
                        Suuqyada Ugu Badan:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.favoriteMarkets.map((pair, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-[#151C26] border border-gold/25 text-xs font-mono font-bold text-gold"
                          >
                            {pair}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Active Sessions notice */}
                    <div className="p-3 rounded-xl bg-[#151C26]/60 border border-[#232E3E] flex items-center justify-between text-xs text-text-muted">
                      <span>Saacadaha Trading-ka:</span>
                      <span className="font-mono text-gold font-bold">London / NY</span>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS CARDS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          
          {/* Stat 1: Total Trades */}
          <div className="p-5 rounded-2xl bg-[#151C26] border border-[#232E3E] hover:border-gold/40 transition-colors shadow-lg">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-dim block">
              Tirada Trades-ka
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-text-main">
                {stats.totalTrades}
              </span>
              <span className="text-xs text-text-muted font-mono">Diiwaangashan</span>
            </div>
          </div>

          {/* Stat 2: Win Rate */}
          <div className="p-5 rounded-2xl bg-[#151C26] border border-profit/30 hover:border-profit transition-colors shadow-lg">
            <span className="text-xs font-semibold uppercase tracking-wider text-profit block">
              Boqolkiiba Guusha (Win Rate)
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-profit">
                {stats.winRate}%
              </span>
              <span className="text-xs text-text-muted font-mono">{stats.wonTrades} Wins</span>
            </div>
          </div>

          {/* Stat 3: Avg Risk:Reward */}
          <div className="p-5 rounded-2xl bg-[#151C26] border border-gold/30 hover:border-gold transition-colors shadow-lg">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold block">
              Celceliska R:R
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-gold">
                1 : {stats.averageRiskReward}
              </span>
            </div>
          </div>

          {/* Stat 4: Profit Factor */}
          <div className="p-5 rounded-2xl bg-[#151C26] border border-[#232E3E] hover:border-gold/40 transition-colors shadow-lg">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-dim block">
              Profit Factor
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-text-main">
                {stats.profitFactor}
              </span>
              <span className="text-xs text-profit font-mono">Sare</span>
            </div>
          </div>

          {/* Stat 5: Net Profit (Respects privacy) */}
          <div className="col-span-2 sm:col-span-1 p-5 rounded-2xl bg-[#151C26] border border-[#232E3E] hover:border-gold/40 transition-colors shadow-lg">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-dim block">
              Faa'iidada Saafiga (Net P&L)
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className={`text-2xl sm:text-3xl font-black font-mono ${
                stats.netProfit >= 0 ? 'text-profit' : 'text-loss'
              }`}>
                {stats.netProfit >= 0 ? `+${formatMoney(stats.netProfit)}` : `-${formatMoney(stats.netProfit)}`}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. MINI EQUITY CURVE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#10151D] border border-[#1E293B] shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-text-main">Jaantuska Koboca Hantida (Equity Curve)</h3>
                <span className="text-xs font-mono text-gold bg-gold/10 border border-gold/25 px-2 py-0.5 rounded-full">
                  Dhab ah (Audited)
                </span>
              </div>
              <p className="text-xs text-text-muted mt-1">
                Koboc xasilan oo ku salaysan maareynta adag ee halista iyo anshaxa joogtada ah.
              </p>
            </div>

            <button
              onClick={() => onNavigate('performance')}
              className="flex items-center gap-2 text-xs font-bold text-gold hover:text-white transition-colors"
            >
              <span>Eeg Dashboard-ka Buuxa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Chart View (Hidden if privacy hides equity curve) */}
          {(!privacy.hideEquityCurve || !privacy.isPublicView) ? (
            <div className="h-64 sm:h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={equityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D6B56D" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#D6B56D" stopOpacity={0}/>
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
                          <div className="bg-[#151C26] border border-gold/40 p-3 rounded-xl shadow-xl text-xs space-y-1">
                            <span className="text-text-muted block">{data.date} &bull; {data.pair}</span>
                            <span className="font-bold text-gold block">
                              Equity: {formatMoney(data.equity)}
                            </span>
                            {data.change !== 0 && (
                              <span className={`block font-mono ${data.change > 0 ? 'text-profit' : 'text-loss'}`}>
                                {data.change > 0 ? `+${formatMoney(data.change)}` : `-${formatMoney(data.change)}`}
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
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#equityGrad)" 
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
        </div>
      </section>

      {/* 4. RECENT TRADES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-text-main tracking-wide">Trades-kii Ugu Dambeeyay</h3>
              <p className="text-xs text-text-muted mt-0.5">Xogta 4-tii trade ee ugu dambeysay ee la diiwaangeliyay.</p>
            </div>
            <button
              onClick={() => onNavigate('journal')}
              className="flex items-center gap-1.5 text-xs font-bold text-gold hover:underline"
            >
              <span>Dhammaan Diiwaanka</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentTrades.map((t) => (
              <div
                key={t.id}
                onClick={() => onViewTrade(t)}
                className="p-4 rounded-2xl bg-[#151C26] border border-[#232E3E] hover:border-gold/40 transition-all cursor-pointer group shadow-lg"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-text-main group-hover:text-gold transition-colors">
                      {t.pair}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                      t.direction === 'LONG' ? 'bg-profit/20 text-profit' : 'bg-loss/20 text-loss'
                    }`}>
                      {t.direction}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-text-dim">{t.date}</span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Istaraatiijiyadda:</span>
                    <span className="text-text-main font-semibold truncate max-w-[120px]">{t.strategy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Natiijada:</span>
                    <span className={`font-mono font-bold ${t.netProfit > 0 ? 'text-profit' : t.netProfit < 0 ? 'text-loss' : 'text-text-muted'}`}>
                      {t.netProfit > 0 ? `+${formatMoney(t.netProfit)}` : t.netProfit < 0 ? `-${formatMoney(t.netProfit)}` : '$0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Saamiga R:R:</span>
                    <span className="font-mono text-gold font-bold">{t.riskReward > 0 ? `1:${t.riskReward}` : '-'}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#1E293B] flex items-center justify-between text-[11px] text-text-dim">
                  <span>Dareenka: {t.emotions}</span>
                  <span className="text-gold group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRADING PHILOSOPHY: 4 PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#10151D] to-[#0A0D14] border border-gold/25 shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Falsafadda Ganacsiga</span>
            <h2 className="text-2xl sm:text-3xl font-black text-text-main">
              Xeerarka Dahabiga ah ee Guusha Trading-ka
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Trading-ku ma aha nasiib ama khamaar; waa xisaab, anshax maskaxeed, iyo dhowridda shuruucda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1 */}
            <div className="p-5 rounded-2xl bg-[#151C26] border border-[#232E3E] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-black">
                01
              </div>
              <h4 className="text-base font-bold text-text-main">Badbaadada Raasamaalka</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Hadafka koowaad waa inaad berrito suuqa ku jirto. Weligaa ha galin khatar ka badan 1% ilaa 2% halkii trade.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-5 rounded-2xl bg-[#151C26] border border-[#232E3E] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-black">
                02
              </div>
              <h4 className="text-base font-bold text-text-main">Asymmetric Risk-to-Reward</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Keliya gal trades bixinaya ugu yaraan 1:2 ama 1:3 R:R. Sidaas waxaad ku guulaysan kartaa xitaa haddii aad badh trades-kaaga khasaarto.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-5 rounded-2xl bg-[#151C26] border border-[#232E3E] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-black">
                03
              </div>
              <h4 className="text-base font-bold text-text-main">Maaraynta Dareenka (No FOMO)</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Ha eryanin shumacyada ordaya. Ha u aargoosan suuqa (No revenge trading). Sug inta setup-kaagu si buuxda u samaysmayo.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-5 rounded-2xl bg-[#151C26] border border-[#232E3E] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-black">
                04
              </div>
              <h4 className="text-base font-bold text-text-main">Diiwaangelin Joogto ah</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Waxa aan la cabbiri karin lama hagaajin karo. Trade kasta qor sababta aad u gashay, natiijadiisa, iyo casharka aad ka baratay.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
