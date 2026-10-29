import { Trade, MarketCategory } from '../types/trade';

export interface PerformanceStats {
  totalTrades: number;
  wonTrades: number;
  lostTrades: number;
  breakEvenTrades: number;
  winRate: number; // in percent e.g. 66.7
  lossRate: number;
  netProfit: number;
  grossProfit: number;
  grossLoss: number;
  profitFactor: number;
  averageWin: number;
  averageLoss: number;
  winLossRatio: number;
  averageRiskReward: number;
  maxDrawdownDollars: number;
  maxDrawdownPercent: number;
  bestTrade: number;
  worstTrade: number;
  currentStreak: { type: 'WIN' | 'LOSS' | 'NONE'; count: number };
}

export interface EquityPoint {
  index: number;
  date: string;
  pair: string;
  change: number;
  equity: number;
  peak: number;
  drawdown: number;
  outcome: string;
}

export interface MonthlyPerformance {
  monthKey: string; // e.g. "2026-10"
  monthName: string; // e.g. "Oct 2026"
  tradesCount: number;
  netProfit: number;
  wins: number;
  losses: number;
  winRate: number;
}

export interface CategoryPerformance {
  category: MarketCategory;
  count: number;
  winRate: number;
  netProfit: number;
}

export interface StrategyPerformance {
  strategy: string;
  count: number;
  winRate: number;
  netProfit: number;
}

const STARTING_BALANCE = 50000;

export function calculatePerformanceStats(trades: Trade[]): PerformanceStats {
  if (!trades || trades.length === 0) {
    return {
      totalTrades: 0,
      wonTrades: 0,
      lostTrades: 0,
      breakEvenTrades: 0,
      winRate: 0,
      lossRate: 0,
      netProfit: 0,
      grossProfit: 0,
      grossLoss: 0,
      profitFactor: 0,
      averageWin: 0,
      averageLoss: 0,
      winLossRatio: 0,
      averageRiskReward: 0,
      maxDrawdownDollars: 0,
      maxDrawdownPercent: 0,
      bestTrade: 0,
      worstTrade: 0,
      currentStreak: { type: 'NONE', count: 0 },
    };
  }

  const totalTrades = trades.length;
  let wonTrades = 0;
  let lostTrades = 0;
  let breakEvenTrades = 0;
  let grossProfit = 0;
  let grossLoss = 0;
  let netProfit = 0;
  let totalRR = 0;
  let rrCount = 0;
  let bestTrade = -Infinity;
  let worstTrade = Infinity;

  // Chronological sort for streak and drawdown
  const sorted = [...trades].sort((a, b) => {
    const timeA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
    const timeB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
    return timeA - timeB;
  });

  sorted.forEach(t => {
    netProfit += t.netProfit;
    if (t.netProfit > bestTrade) bestTrade = t.netProfit;
    if (t.netProfit < worstTrade) worstTrade = t.netProfit;

    if (t.outcome === 'WIN' || t.netProfit > 0) {
      wonTrades++;
      grossProfit += t.netProfit;
      if (t.riskReward > 0) {
        totalRR += t.riskReward;
        rrCount++;
      }
    } else if (t.outcome === 'LOSS' || t.netProfit < 0) {
      lostTrades++;
      grossLoss += Math.abs(t.netProfit);
    } else {
      breakEvenTrades++;
    }
  });

  const winRate = totalTrades > 0 ? (wonTrades / totalTrades) * 100 : 0;
  const lossRate = totalTrades > 0 ? (lostTrades / totalTrades) * 100 : 0;
  const averageWin = wonTrades > 0 ? grossProfit / wonTrades : 0;
  const averageLoss = lostTrades > 0 ? grossLoss / lostTrades : 0;
  const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : (grossProfit > 0 ? grossProfit : 1);
  const winLossRatio = averageLoss > 0 ? averageWin / averageLoss : averageWin;
  const averageRiskReward = rrCount > 0 ? totalRR / rrCount : 0;

  // Max Drawdown calculation
  let runningEquity = STARTING_BALANCE;
  let peakEquity = STARTING_BALANCE;
  let maxDrawdownDollars = 0;
  let maxDrawdownPercent = 0;

  sorted.forEach(t => {
    runningEquity += t.netProfit;
    if (runningEquity > peakEquity) {
      peakEquity = runningEquity;
    }
    const currentDrawdown = peakEquity - runningEquity;
    const currentDrawdownPct = peakEquity > 0 ? (currentDrawdown / peakEquity) * 100 : 0;

    if (currentDrawdown > maxDrawdownDollars) {
      maxDrawdownDollars = currentDrawdown;
    }
    if (currentDrawdownPct > maxDrawdownPercent) {
      maxDrawdownPercent = currentDrawdownPct;
    }
  });

  // Streak
  let streakType: 'WIN' | 'LOSS' | 'NONE' = 'NONE';
  let streakCount = 0;
  for (let i = sorted.length - 1; i >= 0; i--) {
    const outcome = sorted[i].outcome;
    if (outcome === 'BREAK_EVEN') continue;
    if (streakType === 'NONE') {
      streakType = outcome;
      streakCount = 1;
    } else if (outcome === streakType) {
      streakCount++;
    } else {
      break;
    }
  }

  return {
    totalTrades,
    wonTrades,
    lostTrades,
    breakEvenTrades,
    winRate: Number(winRate.toFixed(1)),
    lossRate: Number(lossRate.toFixed(1)),
    netProfit: Number(netProfit.toFixed(2)),
    grossProfit: Number(grossProfit.toFixed(2)),
    grossLoss: Number(grossLoss.toFixed(2)),
    profitFactor: Number(profitFactor.toFixed(2)),
    averageWin: Number(averageWin.toFixed(2)),
    averageLoss: Number(averageLoss.toFixed(2)),
    winLossRatio: Number(winLossRatio.toFixed(2)),
    averageRiskReward: Number(averageRiskReward.toFixed(2)),
    maxDrawdownDollars: Number(maxDrawdownDollars.toFixed(2)),
    maxDrawdownPercent: Number(maxDrawdownPercent.toFixed(1)),
    bestTrade: bestTrade === -Infinity ? 0 : Number(bestTrade.toFixed(2)),
    worstTrade: worstTrade === Infinity ? 0 : Number(worstTrade.toFixed(2)),
    currentStreak: { type: streakType, count: streakCount },
  };
}

export function generateEquityCurve(trades: Trade[], startingBalance: number = STARTING_BALANCE): EquityPoint[] {
  if (!trades || trades.length === 0) {
    return [
      {
        index: 0,
        date: 'Bilow',
        pair: 'Baseline',
        change: 0,
        equity: startingBalance,
        peak: startingBalance,
        drawdown: 0,
        outcome: 'START',
      }
    ];
  }

  const sorted = [...trades].sort((a, b) => {
    const timeA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
    const timeB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
    return timeA - timeB;
  });

  let currentEquity = startingBalance;
  let peak = startingBalance;

  const points: EquityPoint[] = [
    {
      index: 0,
      date: sorted[0]?.date || 'Bilow',
      pair: 'Initial Capital',
      change: 0,
      equity: startingBalance,
      peak: startingBalance,
      drawdown: 0,
      outcome: 'START',
    }
  ];

  sorted.forEach((t, i) => {
    currentEquity += t.netProfit;
    if (currentEquity > peak) {
      peak = currentEquity;
    }
    const dd = peak - currentEquity;
    points.push({
      index: i + 1,
      date: t.date,
      pair: t.pair,
      change: t.netProfit,
      equity: currentEquity,
      peak: peak,
      drawdown: dd,
      outcome: t.outcome,
    });
  });

  return points;
}

export function generateMonthlyPerformance(trades: Trade[]): MonthlyPerformance[] {
  const monthMap = new Map<string, { netProfit: number; wins: number; losses: number; count: number }>();

  trades.forEach(t => {
    const monthKey = t.date.substring(0, 7); // e.g. "2026-10"
    const current = monthMap.get(monthKey) || { netProfit: 0, wins: 0, losses: 0, count: 0 };
    current.netProfit += t.netProfit;
    current.count += 1;
    if (t.outcome === 'WIN') current.wins++;
    if (t.outcome === 'LOSS') current.losses++;
    monthMap.set(monthKey, current);
  });

  const sortedKeys = Array.from(monthMap.keys()).sort();
  const monthFormatter = new Intl.DateTimeFormat('so-SO', { month: 'short', year: 'numeric' });

  return sortedKeys.map(key => {
    const data = monthMap.get(key)!;
    const [year, month] = key.split('-').map(Number);
    const dateObj = new Date(year, month - 1, 1);
    const monthName = monthFormatter.format(dateObj);

    return {
      monthKey: key,
      monthName: monthName.charAt(0).toUpperCase() + monthName.slice(1),
      tradesCount: data.count,
      netProfit: Number(data.netProfit.toFixed(2)),
      wins: data.wins,
      losses: data.losses,
      winRate: data.count > 0 ? Number(((data.wins / data.count) * 100).toFixed(1)) : 0,
    };
  });
}

export function getCategoryBreakdown(trades: Trade[]): CategoryPerformance[] {
  const categories: MarketCategory[] = ['Forex', 'Metals', 'Indices', 'Crypto', 'Commodities'];
  return categories.map(cat => {
    const matched = trades.filter(t => t.category === cat);
    const count = matched.length;
    const wins = matched.filter(t => t.outcome === 'WIN').length;
    const netProfit = matched.reduce((acc, t) => acc + t.netProfit, 0);
    return {
      category: cat,
      count,
      winRate: count > 0 ? Number(((wins / count) * 100).toFixed(1)) : 0,
      netProfit: Number(netProfit.toFixed(2)),
    };
  }).filter(c => c.count > 0);
}

export function getStrategyBreakdown(trades: Trade[]): StrategyPerformance[] {
  const map = new Map<string, { count: number; wins: number; netProfit: number }>();

  trades.forEach(t => {
    const strat = t.strategy || 'Other';
    const cur = map.get(strat) || { count: 0, wins: 0, netProfit: 0 };
    cur.count++;
    if (t.outcome === 'WIN') cur.wins++;
    cur.netProfit += t.netProfit;
    map.set(strat, cur);
  });

  return Array.from(map.entries()).map(([strategy, data]) => ({
    strategy,
    count: data.count,
    winRate: Number(((data.wins / data.count) * 100).toFixed(1)),
    netProfit: Number(data.netProfit.toFixed(2)),
  })).sort((a, b) => b.netProfit - a.netProfit);
}

// Position Size and Risk Calculator helper
export interface PositionCalculationInput {
  accountBalance: number;
  riskPercent: number;
  assetClass: 'Forex' | 'Metals' | 'Indices' | 'Crypto';
  entryPrice: number;
  stopLossPrice: number;
  takeProfitPrice: number;
}

export interface PositionCalculationResult {
  maxDollarRisk: number;
  stopLossDistance: number;
  takeProfitDistance: number;
  recommendedPositionSize: number; // lots or units
  unitName: string;
  potentialLoss: number;
  potentialProfit: number;
  riskRewardRatio: number;
  riskPercentActual: number;
  isOverRisk: boolean; // warning if > 2%
  formulaExplanation: string;
}

export function calculatePositionRisk(input: PositionCalculationInput): PositionCalculationResult {
  const { accountBalance, riskPercent, assetClass, entryPrice, stopLossPrice, takeProfitPrice } = input;

  const maxDollarRisk = accountBalance * (riskPercent / 100);
  const stopLossDistance = Math.abs(entryPrice - stopLossPrice);
  const takeProfitDistance = Math.abs(takeProfitPrice - entryPrice);

  let recommendedPositionSize = 0;
  let unitName = 'Lots';
  let formulaExplanation = '';

  if (stopLossDistance === 0) {
    return {
      maxDollarRisk,
      stopLossDistance: 0,
      takeProfitDistance,
      recommendedPositionSize: 0,
      unitName: 'Lots',
      potentialLoss: 0,
      potentialProfit: 0,
      riskRewardRatio: 0,
      riskPercentActual: riskPercent,
      isOverRisk: riskPercent > 2,
      formulaExplanation: 'Stop-loss distance cannot be zero.',
    };
  }

  if (assetClass === 'Forex') {
    // 1 standard lot = 100,000 units. Typically ~$10 per pip on EUR/USD.
    // Pip distance: for 4/5 decimal pairs, 1 pip = 0.0001
    const pips = stopLossDistance / 0.0001;
    // Position Size (Lots) = Dollar Risk / (Pips * 10)
    recommendedPositionSize = pips > 0 ? maxDollarRisk / (pips * 10) : 0;
    unitName = 'Lots (Standard 100k)';
    formulaExplanation = `Position Size (Lots) = Khatarta Lacagta ($${maxDollarRisk.toFixed(2)}) ÷ (${pips.toFixed(1)} pips × $10)`;
  } else if (assetClass === 'Metals') {
    // 1 lot of gold (XAU/USD) = 100 troy ounces. $1 change = $100 per lot.
    // Position Size = Dollar Risk / (Stop Distance * 100)
    recommendedPositionSize = maxDollarRisk / (stopLossDistance * 100);
    unitName = 'Lots (100 oz per lot)';
    formulaExplanation = `Position Size (Lots) = Khatarta ($${maxDollarRisk.toFixed(2)}) ÷ (Farqiga Stop-loss ($${stopLossDistance.toFixed(2)}) × 100)`;
  } else if (assetClass === 'Indices') {
    // 1 point move = $1 per contract (NAS100 / US30 standard cfd)
    recommendedPositionSize = maxDollarRisk / stopLossDistance;
    unitName = 'Contracts / Points';
    formulaExplanation = `Position Size = Khatarta ($${maxDollarRisk.toFixed(2)}) ÷ Farqiga Points ($${stopLossDistance.toFixed(2)})`;
  } else {
    // Crypto: Fractional coins (e.g. BTC, ETH)
    recommendedPositionSize = maxDollarRisk / stopLossDistance;
    unitName = 'Coins (Crypto Units)';
    formulaExplanation = `Coins = Khatarta ($${maxDollarRisk.toFixed(2)}) ÷ Farqiga Qiimaha ($${stopLossDistance.toFixed(2)})`;
  }

  // Rounded position size
  const roundedSize = Number(recommendedPositionSize.toFixed(2));
  const potentialLoss = maxDollarRisk;
  const potentialProfit = stopLossDistance > 0 ? maxDollarRisk * (takeProfitDistance / stopLossDistance) : 0;
  const riskRewardRatio = stopLossDistance > 0 ? Number((takeProfitDistance / stopLossDistance).toFixed(2)) : 0;

  return {
    maxDollarRisk: Number(maxDollarRisk.toFixed(2)),
    stopLossDistance: Number(stopLossDistance.toFixed(4)),
    takeProfitDistance: Number(takeProfitDistance.toFixed(4)),
    recommendedPositionSize: roundedSize,
    unitName,
    potentialLoss: Number(potentialLoss.toFixed(2)),
    potentialProfit: Number(potentialProfit.toFixed(2)),
    riskRewardRatio,
    riskPercentActual: riskPercent,
    isOverRisk: riskPercent > 2.0,
    formulaExplanation,
  };
}
