import { MarketAnalysis } from '../types/trade';

export const INITIAL_ANALYSES: MarketAnalysis[] = [
  {
    id: 'ANL-201',
    title: 'XAU/USD (Gold): London Sweep & Weekly Liquidity Target ($2,750)',
    date: '2026-10-24',
    pair: 'XAU/USD',
    category: 'Metals',
    bias: 'Bullish',
    keySupport: '$2,705.00 (4H FVG)',
    keyResistance: '$2,758.00 (All-time High Extension)',
    summary: 'Falanqaynta dahabka ee ku dhisan xaaqitaanka hoos-u-dhaca London iyo u jeedka heerka $2,750.',
    content: `Dahabku wuxuu muujinayaa awood bullish oo aad u sarreysa. Ka dib markii suuqu xaaqay (swept) Sell-Side Liquidity oo ku hoos jirtay $2,708 intii lagu jiray bilowgii London session, waxaan aragnay shumac xooggan oo 15m ah oo xiray Change of Character (CHoCH).

Qodobbada muhiimka ah:
1. Imbalance / Fair Value Gap oo ku yaal inta u dhaxaysa $2,712 iyo $2,718 ayaa noqotay goobta ugu habboon ee dib-u-tijaabinta (retest).
2. DXY (Dollar Index) wuxuu ku dhacay resistance muhiim ah oo 104.50 ah, taasoo taageeraysa kor u kaca dahabka.
3. Hadafkayaga ugu dhow waa $2,745 - $2,750 halkaas oo ay yaalliin Buy-Side Liquidity baaxad weyn leh.

Digniin: Ha gelin adigoon arkin diidmada heerka support-ka. Xisaabi lot size-kaaga ka hor intaadan go'aan gaarin.`,
    chartUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    tags: ['Gold', 'XAUUSD', 'SMC', 'Liquidity Sweep', 'London Session'],
    isSample: true,
  },
  {
    id: 'ANL-202',
    title: 'EUR/USD: DXY Correlation & Daily Bearish Order Block Rejection',
    date: '2026-10-21',
    pair: 'EUR/USD',
    category: 'Forex',
    bias: 'Bearish',
    keySupport: '1.07800',
    keyResistance: '1.08900',
    summary: 'Sidee kor u kaca Dollar Index uu cadaadis ugu hayaa lacagta Euro heerarka muhiimka ah.',
    content: `EUR/USD wuxuu ku guuldareystay inuu jabiyo 1.0900 oo ah heer nafsi ah (Psychological Level) iyo Daily Bearish Order Block. 

Falanqaynta qaab-dhismeedka suuqa:
- Waqtiga 4H wuxuu sameeyay Lower High iyo Lower Low cad.
- ECB (Bangiga Yurub) ayaa la filayaa inuu yareeyo dulsaarka, taasoo daciifinaysa Euro-da marka la barbardhigo USD.
- Qorshuhu wuxuu ahaa in la raadiyo fursado iib ah (Short) xilliga suuqu uu dib ugu laabto 1.0865 ilaa 1.0880.

Qorshaha maaraynta khatarta:
Stop-loss waa inuu ka sarreeyaa 1.0895, iyadoo hannaanka Take-profit la dhigayo 1.0810 iyo 1.0780.`,
    chartUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&auto=format&fit=crop&q=80',
    tags: ['Forex', 'EURUSD', 'DXY', 'OrderBlock', 'Macroeconomics'],
    isSample: true,
  },
  {
    id: 'ANL-203',
    title: 'NAS100: Tech Earnings Momentum & Orderflow Invalidation Levels',
    date: '2026-10-18',
    pair: 'NAS100',
    category: 'Indices',
    bias: 'Bullish',
    keySupport: '20,250',
    keyResistance: '20,800',
    summary: 'Falanqaynta index-ka Nasdaq xilliga warbixinnada shirkadaha tiknoolajiyadda waaweyn.',
    content: `Nasdaq (NAS100) wuxuu ku sugan yahay marxalad xasaasi ah iyadoo shirkadaha waaweyn ee tech-ka ay soo saarayaan natiijooyinkooda maaliyadeed.

Qodobbada farsamada:
- Heerka 20,250 wuxuu u shaqeeyay sidii gogol adag (Institutional Demand Floor).
- Muddooyinkii ugu dambeeyay waxaa la arkayay urursi xooggan oo iibsasho ah (Accumulation Phase) inta lagu jiro saacadaha New York.
- Haddii suuqu jabiyo 20,600, waddada waxay u furan tahay 20,800+.

Waxaa xusid mudan in indices-ku yihiin kuwo si degdeg ah u socda; sidaa darteed, xaddid position size-kaaga si aadan drawdown weyn u gelin.`,
    chartUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80',
    tags: ['Indices', 'NAS100', 'Tech', 'Orderflow', 'New York Session'],
    isSample: true,
  },
  {
    id: 'ANL-204',
    title: 'Casharka Toddobaadka: Sidee Looga Badbaadaa Revenge Trading & FOMO?',
    date: '2026-10-15',
    pair: 'Guud / Mindset',
    category: 'Psychology',
    bias: 'Neutral',
    keySupport: 'Xeerarkaaga Shaqada',
    keyResistance: 'Dareenka Xad-dhaafka ah',
    summary: 'Qormo waxbarasho oo ku saabsan cilmu-nafsiga trading-ka iyo sida anshaxu uu guul ku gaarsiiyo.',
    content: `In ka badan 90% dadka trading-ka ku khasaara ma aha farsamo la\'aan, balse waa xakameyn la\'aanta dareenka. 

Revenge Trading waa marka aad trade khasaarto, kadibna adigoo xanaaqsan aad furto trade cusub oo cabbirkiisu weyn yahay si aad lacagtii u soo celiso. Tani waa dabin horseeda baabi\'inta xisaabta (Account Blowout).

3 Xeer oo aad kaga badbaadi karto:
1. Xeerka 2-da Khasaaro: Haddii aad 2 trade isku xigta maanta khasaarto, dami computer-ka oo ka fogow suuqa inta maalinta ka dhiman.
2. Aqbal Khasaaraha: Khasaaruhu waa kharashka ganacsigaaga, sida kirada dukaan caadi ah. Qofna ganacsi bilaa kharash ma hayo.
3. Raac Xisaabtaada: Marna ha kordhin lot size-ka sababtoo ah waxaad doonaysaa inaad soo kabsato.`,
    chartUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    tags: ['Psychology', 'Mindset', 'Risk Management', 'Discipline', 'Education'],
    isSample: true,
  },
];
