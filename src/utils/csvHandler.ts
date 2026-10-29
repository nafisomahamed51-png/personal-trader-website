import { Trade, MarketCategory, TradeDirection, TradeOutcome, EmotionalState } from '../types/trade';

export function exportTradesToCSV(trades: Trade[]): string {
  const headers = [
    'ID',
    'Date',
    'Time',
    'Pair',
    'Category',
    'Direction',
    'EntryPrice',
    'ExitPrice',
    'StopLoss',
    'TakeProfit',
    'PositionSize',
    'DollarRisk',
    'Fees',
    'NetProfit',
    'RiskReward',
    'Outcome',
    'Strategy',
    'Timeframe',
    'Reason',
    'Emotions',
    'Lessons',
    'ChartUrl',
  ];

  const rows = trades.map(t => {
    return [
      `"${t.id}"`,
      `"${t.date}"`,
      `"${t.time || ''}"`,
      `"${t.pair}"`,
      `"${t.category}"`,
      `"${t.direction}"`,
      t.entryPrice,
      t.exitPrice,
      t.stopLoss,
      t.takeProfit,
      t.positionSize,
      t.dollarRisk,
      t.fees,
      t.netProfit,
      t.riskReward,
      `"${t.outcome}"`,
      `"${(t.strategy || '').replace(/"/g, '""')}"`,
      `"${t.timeframe || ''}"`,
      `"${(t.reason || '').replace(/"/g, '""')}"`,
      `"${t.emotions || 'Disciplined'}"`,
      `"${(t.lessons || '').replace(/"/g, '""')}"`,
      `"${t.chartUrl || ''}"`,
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

export function downloadCSV(filename: string, csvContent: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export interface CSVParseResult {
  trades: Trade[];
  errors: string[];
  totalParsed: number;
}

export function parseCSVToTrades(csvText: string): CSVParseResult {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  const errors: string[] = [];
  const trades: Trade[] = [];

  if (lines.length < 2) {
    return { trades: [], errors: ['Faylka CSV waa madhan yahay ama ma laha xog ku filan.'], totalParsed: 0 };
  }

  // Parse header
  const headerLine = lines[0].toLowerCase();
  if (!headerLine.includes('pair') || !headerLine.includes('entryprice')) {
    return {
      trades: [],
      errors: ['Cinwaannada (headers) ee CSV-gu waa kuwo khaldan. Hubi inay ku jiraan ugu yaraan: Pair, EntryPrice, ExitPrice, NetProfit.'],
      totalParsed: 0,
    };
  }

  // Process rows
  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i];
    // Simple CSV tokenizer respecting quotes
    const cells: string[] = [];
    let insideQuote = false;
    let currentCell = '';

    for (let c = 0; c < rawLine.length; c++) {
      const char = rawLine[c];
      if (char === '"' && insideQuote && rawLine[c + 1] === '"') {
        currentCell += '"';
        c++;
      } else if (char === '"') {
        insideQuote = !insideQuote;
      } else if (char === ',' && !insideQuote) {
        cells.push(currentCell.trim());
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    cells.push(currentCell.trim());

    if (cells.length < 7) {
      errors.push(`Khadka ${i + 1}: Xogtu kuma filna (tiro tiirar ah oo yar).`);
      continue;
    }

    try {
      const id = cells[0]?.replace(/^"|"$/g, '') || `TRD-${Date.now()}-${i}`;
      const date = cells[1]?.replace(/^"|"$/g, '') || new Date().toISOString().split('T')[0];
      const time = cells[2]?.replace(/^"|"$/g, '') || '12:00';
      const pair = cells[3]?.replace(/^"|"$/g, '').toUpperCase() || 'EUR/USD';
      
      const categoryRaw = cells[4]?.replace(/^"|"$/g, '') || 'Forex';
      const category: MarketCategory = ['Forex', 'Metals', 'Indices', 'Crypto', 'Commodities'].includes(categoryRaw)
        ? (categoryRaw as MarketCategory)
        : 'Forex';

      const dirRaw = cells[5]?.replace(/^"|"$/g, '').toUpperCase() || 'LONG';
      const direction: TradeDirection = dirRaw === 'SHORT' ? 'SHORT' : 'LONG';

      const entryPrice = parseFloat(cells[6]) || 0;
      const exitPrice = parseFloat(cells[7]) || entryPrice;
      const stopLoss = parseFloat(cells[8]) || (direction === 'LONG' ? entryPrice * 0.99 : entryPrice * 1.01);
      const takeProfit = parseFloat(cells[9]) || (direction === 'LONG' ? entryPrice * 1.02 : entryPrice * 0.98);
      const positionSize = parseFloat(cells[10]) || 1.0;
      const dollarRisk = parseFloat(cells[11]) || 500;
      const fees = parseFloat(cells[12]) || 0;
      
      let netProfit = parseFloat(cells[13]);
      if (isNaN(netProfit)) {
        // Auto-compute approximate netProfit
        const diff = direction === 'LONG' ? exitPrice - entryPrice : entryPrice - exitPrice;
        netProfit = (diff / entryPrice) * (dollarRisk * 2) - fees;
      }

      let outcome: TradeOutcome = 'BREAK_EVEN';
      if (netProfit > 1) outcome = 'WIN';
      else if (netProfit < -1) outcome = 'LOSS';

      const riskReward = parseFloat(cells[14]) || (outcome === 'WIN' ? 2.0 : 0);
      const strategy = cells[16]?.replace(/^"|"$/g, '') || 'Price Action';
      const timeframe = cells[17]?.replace(/^"|"$/g, '') || '15m';
      const reason = cells[18]?.replace(/^"|"$/g, '') || 'CSV Import trade';
      const emotions = (cells[19]?.replace(/^"|"$/g, '') as EmotionalState) || 'Disciplined';
      const lessons = cells[20]?.replace(/^"|"$/g, '') || '';
      const chartUrl = cells[21]?.replace(/^"|"$/g, '') || '';

      trades.push({
        id,
        date,
        time,
        pair,
        category,
        direction,
        entryPrice,
        exitPrice,
        stopLoss,
        takeProfit,
        positionSize,
        dollarRisk,
        fees,
        netProfit: Number(netProfit.toFixed(2)),
        riskReward: Number(riskReward.toFixed(2)),
        outcome,
        strategy,
        timeframe,
        reason,
        emotions,
        lessons,
        chartUrl,
        isPublic: true,
      });
    } catch {
      errors.push(`Khadka ${i + 1}: Waxaa ku jira xog qaabkeedu khaldan yahay.`);
    }
  }

  return { trades, errors, totalParsed: lines.length - 1 };
}
