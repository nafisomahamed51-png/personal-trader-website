import React from 'react';
import { 
  MapPin, 
  Clock, 
  Briefcase, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Edit3,
  TrendingUp,
  Camera
} from 'lucide-react';
import { TraderProfile } from '../types/trade';

interface AboutPageProps {
  profile: TraderProfile;
  onOpenEditProfile: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ profile, onOpenEditProfile }) => {
  const initials = profile.fullName 
    ? profile.fullName.split(' ').map(n => n[0]).filter(Boolean).join('') 
    : 'AA';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fadeIn">
      
      {/* 1. Header Profile Banner */}
      <section className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#151C26] via-[#10151D] to-[#080B10] border border-gold/30 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 relative z-10">
          
          {/* Avatar with Gold Frame */}
          <div className="relative group cursor-pointer" onClick={onOpenEditProfile} title="Guji si aad sawir u geliso ama xogta u beddesho">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-2 border-gold shadow-gold-glow bg-gradient-to-br from-[#1A2332] to-[#10151D] flex flex-col items-center justify-center">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <span className="font-black text-4xl sm:text-5xl text-gold tracking-wider">
                    {initials}
                  </span>
                  <span className="text-xs text-text-muted mt-2 flex items-center gap-1 group-hover:text-gold transition-colors font-medium">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Geli Sawirkaaga</span>
                  </span>
                </div>
              )}
            </div>
            <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-profit text-[#080B10] font-black text-xs shadow-md border-2 border-[#10151D]">
              PRO TRADER
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold block">
                  {profile.brandName}
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-text-main mt-1">
                  {profile.fullName}
                </h1>
                <p className="text-sm font-semibold text-text-muted mt-1">
                  {profile.specialty}
                </p>
              </div>

              {/* Edit Profile CTA */}
              <button
                onClick={onOpenEditProfile}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151C26] border border-gold/40 text-gold hover:bg-gold hover:text-[#080B10] font-bold text-xs transition-all active:scale-95 shadow-sm"
              >
                <Edit3 className="w-4 h-4" />
                <span>Wax Ka Beddel Xogtaada</span>
              </button>
            </div>

            {/* Quick badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 text-xs">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A2332] border border-[#2A374A] text-text-main">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                {profile.location || 'Suuqyada Caalamiga ah'}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A2332] border border-[#2A374A] text-text-main">
                <Briefcase className="w-3.5 h-3.5 text-profit" />
                {profile.experienceYears > 0 ? `${profile.experienceYears}+ Sano oo Khibrad ah` : 'Xirfad & Anshax Adag'}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A2332] border border-[#2A374A] text-text-main">
                <TrendingUp className="w-3.5 h-3.5 text-gold" />
                {profile.tradingStyle}
              </span>
            </div>

            {/* Bio */}
            <p className="text-sm text-text-muted leading-relaxed pt-2">
              {profile.bio}
            </p>
          </div>

        </div>
      </section>

      {/* 2. Three Pillars: Markets, Style & Hours */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Markets Traded */}
        <div className="p-6 rounded-3xl bg-[#151C26] border border-[#232E3E] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-main">Suuqyada Aan Ka Shaqeeyo</h3>
            <p className="text-xs text-text-muted mt-1">
              Waxaan diiradda saaraa suuqyada leh liquidity-ga sare iyo volatility-ga la xisaabin karo:
            </p>
          </div>
          <div className="space-y-2 pt-2">
            {profile.favoriteMarkets.map((m, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-[#10151D] border border-[#232E3E] text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-gold"></span>
                <span className="font-bold text-text-main">{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trading Style */}
        <div className="p-6 rounded-3xl bg-[#151C26] border border-[#232E3E] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-profit/10 border border-profit/30 flex items-center justify-center text-profit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-main">Nooca & Qaabka Trading-ka</h3>
            <p className="text-xs text-text-muted mt-1">
              Habka farsamo ee aan adeegsado si aan suuqa uga helo edge asymmetric ah:
            </p>
          </div>
          <ul className="space-y-2 text-xs text-text-muted pt-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-profit flex-shrink-0 mt-0.5" />
              <span><strong>Day Trading & Swing:</strong> Qabashada dhaqdhaqaaqa maalinlaha ah iyo heshiisyada 1-3 maalmood socda.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-profit flex-shrink-0 mt-0.5" />
              <span><strong>Smart Money Concepts:</strong> Falanqaynta Fair Value Gaps (FVG), Order Blocks, iyo Liquidity Pools.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-profit flex-shrink-0 mt-0.5" />
              <span><strong>Macro Correlation:</strong> Dhegeysiga go'aannada bangiyada dhexe (Fed, ECB) iyo saameynta DXY.</span>
            </li>
          </ul>
        </div>

        {/* Active Trading Hours */}
        <div className="p-6 rounded-3xl bg-[#151C26] border border-[#232E3E] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-main">Waqtiyada & Kalfadhiyada</h3>
            <p className="text-xs text-text-muted mt-1">
              Saacadaha suuqu leeyahay awoodda ugu weyn ee la saadaalin karo:
            </p>
          </div>
          <div className="space-y-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-[#10151D] border border-[#232E3E]">
              <span className="font-bold text-gold block">London Session (07:00 - 11:00 GMT)</span>
              <span className="text-text-muted mt-0.5 block">Xaaqitaanka Asian High/Low iyo bilaabashada trend-ka maalinlaha ah.</span>
            </div>
            <div className="p-3 rounded-xl bg-[#10151D] border border-[#232E3E]">
              <span className="font-bold text-profit block">New York Overlap (13:00 - 17:00 GMT)</span>
              <span className="text-text-muted mt-0.5 block">Furitaanka Wall Street, wararka dhaqaalaha, iyo momentum-ka ugu sarreeya.</span>
            </div>
          </div>
        </div>

      </section>

      {/* 3. Golden Trading Rules */}
      <section className="p-8 sm:p-10 rounded-3xl bg-[#10151D] border border-gold/25 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold">Anshaxa & Mabda'a</span>
            <h3 className="text-2xl font-black text-text-main mt-1">
              Xeerarka Aan Marna La Jabin ee Xisaabteyda
            </h3>
          </div>
          <button
            onClick={onOpenEditProfile}
            className="text-xs font-bold text-gold hover:underline"
          >
            Habee Xeerarka
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.rules.map((rule, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-[#151C26] border border-[#232E3E]">
              <div className="w-7 h-7 rounded-lg bg-gold/15 text-gold border border-gold/30 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                {rule}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Future Milestones & Goals (2025 - 2027) */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold">Tubta Mustaqbalka</span>
          <h3 className="text-2xl font-black text-text-main mt-1">
            Yoolalka & Qorshayaasha Horumarineed (2025 - 2027)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#151C26] border border-[#232E3E] space-y-2">
            <span className="text-xs font-mono text-gold font-bold">2025 - 2026</span>
            <h4 className="text-base font-bold text-text-main">Anshaxa & Maamulka Halista</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Joogteynta anshax 100% ah, ku ekaanshaha xadka 1% risk halkii trade, iyo dhowridda shuruucda diiwaanka.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#151C26] border border-[#232E3E] space-y-2">
            <span className="text-xs font-mono text-profit font-bold">2026</span>
            <h4 className="text-base font-bold text-text-main">Diiwaangelin Qoto-Dheer & Xog-Raacis</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Falanqaynta joogtada ah ee dhammaan trades-ka guulaystay iyo kuwa khasaaray si loo sii kordhiyo faa'iidada.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#151C26] border border-[#232E3E] space-y-2">
            <span className="text-xs font-mono text-gold font-bold">2026 - 2027</span>
            <h4 className="text-base font-bold text-text-main">Fidinta Xirfadda & Wada-shaqaynta</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              La wadaagidda falanqaynta farsamo ee suuqyada maaliyadda bahda ganacsiga iyo kobcinta xirfadda maaliyadeed.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
