import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Trade } from '../types/trade';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  trade: Trade | null;
  onClose: () => void;
  onConfirm: (tradeId: string) => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  trade,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !trade) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-md bg-[#10151D] border border-loss/40 rounded-2xl p-6 shadow-2xl text-text-main animate-scaleUp"
        role="dialog"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-loss/15 border border-loss/40 flex items-center justify-center text-loss">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-main">Ma hubtaa inaad tirtirto?</h3>
            <p className="text-xs text-text-muted">Ficilkan lagama noqon karo marka la fuliyo.</p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-[#151C26] border border-[#232E3E] space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-text-muted">Trade ID:</span>
            <span className="font-mono text-gold font-bold">{trade.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Suuqa:</span>
            <span className="font-bold text-text-main">{trade.pair} ({trade.direction})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Taariikhda:</span>
            <span className="text-text-main">{trade.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Natiijada:</span>
            <span className={`font-mono font-bold ${trade.netProfit >= 0 ? 'text-profit' : 'text-loss'}`}>
              {trade.netProfit >= 0 ? `+$${trade.netProfit}` : `-$${Math.abs(trade.netProfit)}`}
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-muted hover:text-text-main text-xs font-semibold transition-colors"
          >
            Ka Noqo (Cancel)
          </button>
          <button
            onClick={() => {
              onConfirm(trade.id);
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-loss text-white font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Haa, Tirtir Trade-kan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
