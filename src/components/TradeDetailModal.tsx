import React from 'react';
import { X, Calendar, Clock, DollarSign, Percent, Shield, ArrowUpRight, ArrowDownRight, Edit3, Trash2 } from 'lucide-react';
import { Trade, PrivacySettings } from '../types/trade';

interface TradeDetailModalProps {
  trade: Trade | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (trade: Trade) => void;
  onDelete: (trade: Trade) => void;
  privacy: PrivacySettings;
}

export const TradeDetailModal: React.FC<TradeDetailModalProps> = ({
  trade,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  privacy,
}) => {
  if (!isOpen || !trade) return null;

  const isWin = trade.outcome === 'WIN';
  const isLoss = trade.outcome === 'LOSS';

  // Format currency with privacy masking support
  const formatMoney = (val: number) => {
    if (privacy.maskBalances && privacy.isPublicView) {
      return '***';
    }
    return `$${Math.abs(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="w-full max-w-2xl my-8 bg-[#10151D] border border-gold/40 rounded-2xl shadow-gold-glow-lg text-text-main overflow-hidden animate-scaleUp"
        role="dialog"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#1E293B] bg-[#151C26] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`p-2.5 rounded-xl border ${
              trade.direction === 'LONG'
                ? 'bg-profit/15 border-profit/40 text-profit'
                : 'bg-loss/15 border-loss/40 text-loss'
            }`}>
              {trade.direction === 'LONG' ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-text-main tracking-wide">{trade.pair}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                  trade.direction === 'LONG' ? 'bg-profit/20 text-profit' : 'bg-loss/20 text-loss'
                }`}>
                  {trade.direction}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  isWin ? 'bg-profit/15 text-profit border border-profit/30' : isLoss ? 'bg-loss/15 text-loss border border-loss/30' : 'bg-text-dim/20 text-text-muted'
                }`}>
                  {trade.outcome === 'WIN' ? 'GUUL (WIN)' : trade.outcome === 'LOSS' ? 'KHASAARO (LOSS)' : 'BREAK-EVEN'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  {trade.date}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-text-dim" />
                  {trade.time || '12:00'}
                </span>
                <span className="text-gold font-mono font-semibold">#{trade.id}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onEdit(trade);
              }}
              title="Wax ka beddel"
              className="p-2 rounded-xl bg-[#10151D] border border-[#232E3E] text-text-muted hover:text-gold transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onClose();
                onDelete(trade);
              }}
              title="Tirtir trade-kan"
              className="p-2 rounded-xl bg-[#10151D] border border-[#232E3E] text-text-muted hover:text-loss transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#10151D] border border-[#232E3E] text-text-muted hover:text-text-main transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Highlight Cards: Net Profit & R:R */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#151C26] border border-[#232E3E]">
              <span className="text-[11px] font-semibold text-text-muted uppercase block">Natiijada (P&L)</span>
              <span className={`text-lg font-black font-mono block mt-0.5 ${
                trade.netProfit > 0 ? 'text-profit' : trade.netProfit < 0 ? 'text-loss' : 'text-text-main'
              }`}>
                {trade.netProfit > 0 ? `+${formatMoney(trade.netProfit)}` : trade.netProfit < 0 ? `-${formatMoney(trade.netProfit)}` : '$0.00'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#151C26] border border-[#232E3E]">
              <span className="text-[11px] font-semibold text-text-muted uppercase block">Saamiga R:R</span>
              <span className="text-lg font-black font-mono text-gold block mt-0.5">
                {trade.riskReward > 0 ? `1 : ${trade.riskReward}` : '0.00'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#151C26] border border-[#232E3E]">
              <span className="text-[11px] font-semibold text-text-muted uppercase block">Position Size</span>
              <span className="text-lg font-bold font-mono text-text-main block mt-0.5">
                {trade.positionSize} Lots
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#151C26] border border-[#232E3E]">
              <span className="text-[11px] font-semibold text-text-muted uppercase block">Khatarta ($ Risk)</span>
              <span className="text-lg font-bold font-mono text-text-muted block mt-0.5">
                {formatMoney(trade.dollarRisk)}
              </span>
            </div>
          </div>

          {/* Pricing Execution Grid */}
          <div className="p-4 rounded-xl bg-[#151C26] border border-[#232E3E] space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gold block">
              Heerarka Fulinta (Execution Price Levels)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-text-dim block text-[11px]">Gelitaanka (Entry)</span>
                <span className="font-bold text-text-main text-sm">{trade.entryPrice}</span>
              </div>
              <div>
                <span className="text-text-dim block text-[11px]">Bixitaanka (Exit)</span>
                <span className="font-bold text-text-main text-sm">{trade.exitPrice}</span>
              </div>
              <div>
                <span className="text-text-dim block text-[11px]">Stop-Loss (SL)</span>
                <span className="font-bold text-loss text-sm">{trade.stopLoss}</span>
              </div>
              <div>
                <span className="text-text-dim block text-[11px]">Take-Profit (TP)</span>
                <span className="font-bold text-profit text-sm">{trade.takeProfit}</span>
              </div>
            </div>
          </div>

          {/* Setup Strategy & Timeframe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#151C26] border border-[#232E3E]">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted block mb-1">
                Istaraatiijiyadda
              </span>
              <span className="text-sm font-bold text-text-main block">
                {trade.strategy}
              </span>
              <span className="text-xs text-gold font-mono mt-1 block">
                Timeframe: {trade.timeframe || '15m'} &bull; Category: {trade.category}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#151C26] border border-[#232E3E]">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted block mb-1">
                Dareenka Trader-ka (Psychology)
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold/15 text-gold border border-gold/30">
                  {trade.emotions || 'Disciplined'}
                </span>
                <span className="text-xs text-text-muted">
                  {trade.emotions === 'Disciplined' ? 'Fuliyay qorshaha bilaa cabsi' : 'Dareen la diiwaangeliyay'}
                </span>
              </div>
            </div>
          </div>

          {/* Rationale and Lessons (Subject to privacy settings if enabled) */}
          {(!privacy.hidePrivateNotes || !privacy.isPublicView) ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#151C26] border border-[#232E3E]">
                <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1.5">
                  Sababta Loo Galay (Setup Rationale)
                </span>
                <p className="text-xs text-text-muted leading-relaxed whitespace-pre-wrap">
                  {trade.reason || 'Ma jiro qoraal sabab ah oo la qoray.'}
                </p>
              </div>

              {trade.lessons && (
                <div className="p-4 rounded-xl bg-[#151C26] border border-gold/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-profit block mb-1.5">
                    Casharka Laga Bartay (Post-Trade Review)
                  </span>
                  <p className="text-xs text-text-muted leading-relaxed whitespace-pre-wrap">
                    {trade.lessons}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#151C26]/50 border border-[#232E3E] text-xs text-text-dim text-center">
              Falanqaynta nafsiga ah iyo casharrada gaarka ah waxaa qariyay Habka Asturnaanta.
            </div>
          )}

          {/* Chart Screenshot Lightbox/Preview if available */}
          {trade.chartUrl && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted block">
                Sawirka Chart-ka
              </span>
              <div className="rounded-xl overflow-hidden border border-[#232E3E] bg-black">
                <img
                  src={trade.chartUrl}
                  alt={`Chart ${trade.pair}`}
                  className="w-full h-auto max-h-96 object-cover hover:scale-[1.01] transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback on image error
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1E293B] bg-[#151C26] flex items-center justify-between">
          <span className="text-[11px] text-text-dim">
            Kharashyada Broker-ka (Fees): ${trade.fees}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gold text-[#080B10] font-bold text-xs hover:brightness-110 transition-all"
          >
            Xir (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
