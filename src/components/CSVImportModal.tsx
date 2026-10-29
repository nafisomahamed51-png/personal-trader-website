import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, AlertCircle, Download } from 'lucide-react';
import { Trade } from '../types/trade';
import { parseCSVToTrades, exportTradesToCSV, downloadCSV } from '../utils/csvHandler';
import { INITIAL_TRADES } from '../data/initialTrades';

interface CSVImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (newTrades: Trade[]) => void;
}

export const CSVImportModal: React.FC<CSVImportModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [parsedTrades, setParsedTrades] = useState<Trade[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const result = parseCSVToTrades(content);
      setParsedTrades(result.trades);
      setErrors(result.errors);
      setIsProcessing(false);
    };
    reader.onerror = () => {
      setErrors(['Faylka lama akhriyi karin. Fadlan hubi inuu yahay CSV sax ah.']);
      setIsProcessing(false);
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    if (parsedTrades.length > 0) {
      onImport(parsedTrades);
      onClose();
    }
  };

  const handleDownloadSample = () => {
    const sampleCsv = exportTradesToCSV(INITIAL_TRADES.slice(0, 3));
    downloadCSV('trader_sample_template.csv', sampleCsv);
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
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-main">Soo Geli Xogta Trades-ka (CSV Import)</h3>
              <p className="text-xs text-text-muted">Ku soo dar trades badan adigoo isticmaalaya fayl CSV ah.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-main rounded-lg hover:bg-[#10151D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Sample template helper */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#151C26] border border-[#232E3E]">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-gold" />
              <span className="text-xs text-text-muted">Ma u baahan tahay tusaalaha qaab-dhismeedka CSV?</span>
            </div>
            <button
              onClick={handleDownloadSample}
              className="flex items-center gap-1.5 text-xs font-bold text-gold hover:underline"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Degso Template-ka</span>
            </button>
          </div>

          {/* Upload Drop Area */}
          <div className="border-2 border-dashed border-[#2A374A] hover:border-gold/50 rounded-2xl p-8 text-center bg-[#151C26]/40 transition-colors">
            <input
              type="file"
              accept=".csv"
              id="csvFileInput"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label htmlFor="csvFileInput" className="cursor-pointer block">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold border border-gold/30 mx-auto flex items-center justify-center mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-text-main block">
                {fileName ? fileName : 'Dooro faylka CSV ama halkan soo jiid'}
              </span>
              <span className="text-xs text-text-muted block mt-1">
                Keliya faylasha noocoodu yahay .csv ayaa la oggol yahay
              </span>
            </label>
          </div>

          {/* Parsing Results & Status */}
          {isProcessing && (
            <div className="p-4 rounded-xl bg-[#151C26] text-center text-xs text-text-muted">
              Xogta waa la falanqaynayaa...
            </div>
          )}

          {parsedTrades.length > 0 && (
            <div className="p-4 rounded-xl bg-profit/10 border border-profit/30 space-y-3">
              <div className="flex items-center gap-2 text-profit font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>{parsedTrades.length} Trades ayaa si guul leh loo helay oo diyaar ah!</span>
              </div>
              
              {/* Preview List of first 3 trades */}
              <div className="max-h-40 overflow-y-auto space-y-1.5 pt-2">
                {parsedTrades.slice(0, 4).map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#10151D] text-xs font-mono">
                    <span className="font-bold text-text-main">{t.pair} ({t.direction})</span>
                    <span className="text-text-muted">{t.date}</span>
                    <span className={t.netProfit >= 0 ? 'text-profit font-bold' : 'text-loss font-bold'}>
                      {t.netProfit >= 0 ? `+$${t.netProfit}` : `-$${Math.abs(t.netProfit)}`}
                    </span>
                  </div>
                ))}
                {parsedTrades.length > 4 && (
                  <span className="text-[11px] text-text-dim text-center block pt-1">
                    Iyo {parsedTrades.length - 4} trade oo kale...
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Errors list if any */}
          {errors.length > 0 && (
            <div className="p-4 rounded-xl bg-loss/10 border border-loss/30 space-y-1">
              <div className="flex items-center gap-2 text-loss font-bold text-xs">
                <AlertCircle className="w-4 h-4" />
                <span>Khaladaad ayaa ka dhacay akhrinta xogta:</span>
              </div>
              <ul className="list-disc list-inside text-[11px] text-loss/80 pl-2 space-y-0.5">
                {errors.slice(0, 4).map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#1E293B] bg-[#151C26] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#10151D] border border-[#232E3E] text-text-muted hover:text-text-main text-xs font-semibold"
          >
            Ka Noqo
          </button>
          <button
            disabled={parsedTrades.length === 0}
            onClick={handleConfirmImport}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D6B56D] to-[#B39247] text-[#080B10] font-bold text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 active:scale-95 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Soo Geli ({parsedTrades.length}) Trades</span>
          </button>
        </div>

      </div>
    </div>
  );
};
