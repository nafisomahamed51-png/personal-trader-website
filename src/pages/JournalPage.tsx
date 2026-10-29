import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Download, 
  Upload, 
  Trash2, 
  Edit3, 
  Eye, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter, 
  ArrowUpDown,
  RotateCcw,
  Image as ImageIcon
} from 'lucide-react';
import { Trade, PrivacySettings } from '../types/trade';
import { exportTradesToCSV, downloadCSV } from '../utils/csvHandler';

interface JournalPageProps {
  trades: Trade[];
  onOpenAddModal: () => void;
  onOpenEditModal: (trade: Trade) => void;
  onOpenDeleteModal: (trade: Trade) => void;
  onOpenViewModal: (trade: Trade) => void;
  onOpenImportModal: () => void;
  onResetData: () => void;
  privacy: PrivacySettings;
}

export const JournalPage: React.FC<JournalPageProps> = ({
  trades,
  onOpenAddModal,
  onOpenEditModal,
  onOpenDeleteModal,
  onOpenViewModal,
  onOpenImportModal,
  onResetData,
  privacy,
}) => {
  // Search, filter, sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [directionFilter, setDirectionFilter] = useState('ALL');
  const [outcomeFilter, setOutcomeFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'pnl-desc' | 'pnl-asc' | 'rr-desc'>('date-desc');

  // Filter & sort logic
  const filteredAndSortedTrades = useMemo(() => {
    return trades
      .filter(trade => {
        // Search term check
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchPair = trade.pair.toLowerCase().includes(q);
          const matchId = trade.id.toLowerCase().includes(q);
          const matchStrategy = trade.strategy.toLowerCase().includes(q);
          const matchReason = trade.reason.toLowerCase().includes(q);
          if (!matchPair && !matchId && !matchStrategy && !matchReason) return false;
        }

        // Category
        if (categoryFilter !== 'ALL' && trade.category !== categoryFilter) return false;

        // Direction
        if (directionFilter !== 'ALL' && trade.direction !== directionFilter) return false;

        // Outcome
        if (outcomeFilter !== 'ALL' && trade.outcome !== outcomeFilter) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') {
          return new Date(`${b.date}T${b.time || '00:00'}`).getTime() - new Date(`${a.date}T${a.time || '00:00'}`).getTime();
        }
        if (sortBy === 'date-asc') {
          return new Date(`${a.date}T${a.time || '00:00'}`).getTime() - new Date(`${b.date}T${b.time || '00:00'}`).getTime();
        }
        if (sortBy === 'pnl-desc') {
          return b.netProfit - a.netProfit;
        }
        if (sortBy === 'pnl-asc') {
          return a.netProfit - b.netProfit;
        }
        if (sortBy === 'rr-desc') {
          return b.riskReward - a.riskReward;
        }
        return 0;
      });
  }, [trades, searchTerm, categoryFilter, directionFilter, outcomeFilter, sortBy]);

  // CSV Export action
  const handleExportCSV = () => {
    const csvContent = exportTradesToCSV(trades);
    downloadCSV(`trading_journal_export_${new Date().toISOString().split('T')[0]}.csv`, csvContent);
  };

  // Money formatting with privacy masking
  const formatMoney = (val: number) => {
    if (privacy.maskBalances && privacy.isPublicView) {
      return '***';
    }
    return `$${Math.abs(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* 1. Header Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#1E293B]">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold block">
            Diiwaangelinta Joogtada ah
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-text-main mt-1 tracking-tight">
            Diiwaanka Trades-ka (Trading Journal)
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Diiwaangeli, baar, wax ka beddel, oo dhoofi dhammaan trades-kaaga iyo casharrada aad baratay.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D6B56D] to-[#B39247] text-[#080B10] font-bold text-xs shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Ku Dar Trade Cusub</span>
          </button>

          <button
            onClick={handleExportCSV}
            title="Dhoofi dhammaan trades-ka fayl CSV ah"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-muted hover:text-text-main hover:border-gold/40 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-gold" />
            <span>Dhoofi CSV</span>
          </button>

          <button
            onClick={onOpenImportModal}
            title="Soo geli trades cusub adigoo isticmaalaya CSV"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-muted hover:text-text-main hover:border-gold/40 text-xs font-semibold transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-gold" />
            <span>Soo Geli CSV</span>
          </button>

          <button
            onClick={onResetData}
            title="Dib ugu celi tusaalooyinkii default-ka ahaa"
            className="p-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-dim hover:text-loss transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Search, Filter and Sorting Toolbar */}
      <section className="p-4 rounded-2xl bg-[#10151D] border border-[#232E3E] space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Search Input */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-text-dim absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Raadi pair, istaraatiijiyad, ID, ama sabab..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
            >
              <option value="ALL">Dhammaan Suuqyada</option>
              <option value="Forex">Forex</option>
              <option value="Metals">Metals (Gold/Silver)</option>
              <option value="Indices">Indices (NAS100/US30)</option>
              <option value="Crypto">Crypto</option>
            </select>
          </div>

          {/* Direction & Outcome */}
          <div className="grid grid-cols-2 gap-2">
            <select
              value={directionFilter}
              onChange={e => setDirectionFilter(e.target.value)}
              className="w-full px-2.5 py-2 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
            >
              <option value="ALL">Dhammaan (L/S)</option>
              <option value="LONG">BUY / LONG</option>
              <option value="SHORT">SELL / SHORT</option>
            </select>

            <select
              value={outcomeFilter}
              onChange={e => setOutcomeFilter(e.target.value)}
              className="w-full px-2.5 py-2 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
            >
              <option value="ALL">Natiijo kasta</option>
              <option value="WIN">Wins Keliya</option>
              <option value="LOSS">Losses Keliya</option>
              <option value="BREAK_EVEN">Break-Even</option>
            </select>
          </div>

          {/* Sorting */}
          <div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-[#151C26] border border-[#232E3E] text-gold font-semibold text-xs focus:border-gold focus:outline-none"
            >
              <option value="date-desc">Ugu Dambeeyay (Taariikh)</option>
              <option value="date-asc">Ugu Horeeyay (Taariikh)</option>
              <option value="pnl-desc">Faa'iidada Ugu Weyn (Highest P&L)</option>
              <option value="pnl-asc">Khasaaraha Ugu Weyn (Lowest P&L)</option>
              <option value="rr-desc">Saamiga R:R Ugu Sareeya</option>
            </select>
          </div>

        </div>
      </section>

      {/* 3. Trades Table (Desktop) / Cards (Mobile) */}
      <section className="bg-[#10151D] border border-[#232E3E] rounded-3xl overflow-hidden shadow-2xl">
        
        {filteredAndSortedTrades.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-sm font-bold text-text-main">Wax trades ah lagama helin raadintan.</p>
            <p className="text-xs text-text-muted">Fadlan hagaaji ereyada raadinta ama dib u celi filtarrada.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('ALL');
                setDirectionFilter('ALL');
                setOutcomeFilter('ALL');
              }}
              className="px-4 py-2 rounded-xl bg-gold text-[#080B10] font-bold text-xs"
            >
              Dib u Celi Filtarrada
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#151C26] border-b border-[#1E293B] text-[11px] font-bold uppercase tracking-wider text-text-dim select-none">
                  <th className="py-3.5 px-4">Trade ID & Taariikh</th>
                  <th className="py-3.5 px-3">Suuqa (Pair)</th>
                  <th className="py-3.5 px-3">Jiheynta</th>
                  <th className="py-3.5 px-3">Gelitaanka (Entry)</th>
                  <th className="py-3.5 px-3">Bixitaanka (Exit)</th>
                  <th className="py-3.5 px-3">Lots</th>
                  <th className="py-3.5 px-3">R:R</th>
                  <th className="py-3.5 px-3">Natiijada ($ P&L)</th>
                  <th className="py-3.5 px-3">Istaraatiijiyadda</th>
                  <th className="py-3.5 px-4 text-right">Ficillada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#17202C]">
                {filteredAndSortedTrades.map((t) => {
                  const isLong = t.direction === 'LONG';
                  const isWin = t.outcome === 'WIN';
                  const isLoss = t.outcome === 'LOSS';

                  return (
                    <tr 
                      key={t.id}
                      className="hover:bg-[#151C26]/70 transition-colors group cursor-pointer"
                      onClick={() => onOpenViewModal(t)}
                    >
                      {/* ID & Date */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-gold font-bold block">{t.id}</span>
                        <span className="text-[11px] text-text-dim block">{t.date} &bull; {t.time || '12:00'}</span>
                      </td>

                      {/* Pair */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-text-main text-sm">{t.pair}</span>
                          {t.chartUrl && (
                            <span title="Waxaa ku jira sawir chart ah">
                              <ImageIcon className="w-3.5 h-3.5 text-gold/70" />
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-text-dim block">{t.category}</span>
                      </td>

                      {/* Direction */}
                      <td className="py-3.5 px-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-black ${
                          isLong ? 'bg-profit/15 text-profit border border-profit/30' : 'bg-loss/15 text-loss border border-loss/30'
                        }`}>
                          {isLong ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {t.direction}
                        </span>
                      </td>

                      {/* Entry */}
                      <td className="py-3.5 px-3 font-mono text-text-muted">
                        {t.entryPrice}
                      </td>

                      {/* Exit */}
                      <td className="py-3.5 px-3 font-mono text-text-muted">
                        {t.exitPrice}
                      </td>

                      {/* Lots */}
                      <td className="py-3.5 px-3 font-mono text-text-main font-semibold">
                        {t.positionSize}
                      </td>

                      {/* R:R */}
                      <td className="py-3.5 px-3 font-mono font-bold text-gold">
                        {t.riskReward > 0 ? `1 : ${t.riskReward}` : '-'}
                      </td>

                      {/* Net P&L */}
                      <td className="py-3.5 px-3 font-mono font-extrabold text-sm">
                        <span className={t.netProfit > 0 ? 'text-profit' : t.netProfit < 0 ? 'text-loss' : 'text-text-muted'}>
                          {t.netProfit > 0 ? `+${formatMoney(t.netProfit)}` : t.netProfit < 0 ? `-${formatMoney(t.netProfit)}` : '$0.00'}
                        </span>
                      </td>

                      {/* Strategy */}
                      <td className="py-3.5 px-3 text-text-muted max-w-[140px] truncate">
                        <span className="block font-medium truncate" title={t.strategy}>{t.strategy}</span>
                        <span className="text-[10px] text-text-dim block">Timeframe: {t.timeframe || '15m'}</span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onOpenViewModal(t)}
                            title="Eeg Faahfaahinta"
                            className="p-1.5 rounded-lg text-text-muted hover:text-gold hover:bg-[#10151D] transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onOpenEditModal(t)}
                            title="Wax Ka Beddel"
                            className="p-1.5 rounded-lg text-text-muted hover:text-profit hover:bg-[#10151D] transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onOpenDeleteModal(t)}
                            title="Tirtir Trade-kan"
                            className="p-1.5 rounded-lg text-text-muted hover:text-loss hover:bg-[#10151D] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer of Table */}
        <div className="p-4 bg-[#151C26] border-t border-[#1E293B] flex items-center justify-between text-xs text-text-dim">
          <span>Wadarta Trades-ka Muuqda: <strong>{filteredAndSortedTrades.length}</strong></span>
          <span className="font-mono">Kujiir trade kasta si aad u aragto screenshot-ka iyo casharrada</span>
        </div>

      </section>

    </div>
  );
};
