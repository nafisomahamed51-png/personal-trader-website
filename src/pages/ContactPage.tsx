import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Clock, 
  Globe, 
  ArrowUpRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { TraderProfile } from '../types/trade';

interface ContactPageProps {
  profile: TraderProfile;
  onShowToast: (title: string, message: string, type: 'success' | 'error' | 'info') => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ profile, onShowToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [inquiryType, setInquiryType] = useState('Mentorship & Tababar');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam field
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const err: Record<string, string> = {};
    if (!name.trim()) err.name = 'Fadlan geli magacaaga oo buuxa.';
    if (!email.trim()) {
      err.email = 'Fadlan geli email-kaaga.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      err.email = 'Fadlan geli email sax ah oo shaqaynaya.';
    }
    if (!subject.trim()) err.subject = 'Fadlan dooro ama qor mawduuca farriinta.';
    if (!message.trim() || message.trim().length < 15) {
      err.message = 'Farriintu waa inay ka koobnaataa ugu yaraan 15 xaraf.';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Spam detected silently
      return;
    }

    if (!validate()) {
      onShowToast('Khalad Xogta ah', 'Fadlan sax meelaha khaldan ee foomka.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Realistic secure submission handling
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onShowToast(
        'Farriintaada Waa La Helay!', 
        `Waad mahadsan tahay ${name}. Waxaan kugu soo jawaabi doonaa 24 saac gudahood.`, 
        'success'
      );
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setErrors({});
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      
      {/* 1. Header */}
      <div className="pb-6 border-b border-[#1E293B]">
        <span className="text-xs font-bold uppercase tracking-widest text-gold block">
          Is-dhaafsiga & Xiriirka
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-text-main mt-1 tracking-tight">
          La Xiriir Trader-ka (Contact Desk)
        </h1>
        <p className="text-xs text-text-muted mt-1 max-w-xl">
          Waxaad igala soo xiriiri kartaa wada-shaqaynta hay'adaha, tababarka trading-ka, falanqaynta gaarka ah, ama weydiimaha guud.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Direct Info & Social Channels */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Desk Info Card */}
          <div className="p-6 rounded-3xl bg-[#10151D] border border-gold/30 shadow-2xl space-y-5">
            <div>
              <h3 className="text-base font-bold text-text-main">Xafiiska & Xiriirka Tooska ah</h3>
              <p className="text-xs text-text-muted mt-0.5">Xiriir rasmi ah oo la aamini karo.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#151C26] border border-[#232E3E]">
                <Mail className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-text-dim uppercase text-[10px] font-bold block">Email-ka Rasmiga ah</span>
                  <a href={`mailto:${profile.socialLinks.email}`} className="text-text-main font-semibold hover:text-gold transition-colors font-mono">
                    {profile.socialLinks.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#151C26] border border-[#232E3E]">
                <Send className="w-4 h-4 text-profit flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-text-dim uppercase text-[10px] font-bold block">Telegram Toos ah</span>
                  <a href={profile.socialLinks.telegram} target="_blank" rel="noreferrer" className="text-text-main font-semibold hover:text-profit transition-colors font-mono">
                    @AishaTrader
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#151C26] border border-[#232E3E]">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-text-dim uppercase text-[10px] font-bold block">Goobta Xafiiska</span>
                  <span className="text-text-main font-semibold">
                    {profile.location}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#151C26] border border-[#232E3E]">
                <Clock className="w-4 h-4 text-text-muted flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-text-dim uppercase text-[10px] font-bold block">Waqtiga Jawaabta</span>
                  <span className="text-text-main font-semibold">
                    Wax ka yar 24 saacadood gudahood
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Social Portfolios Box */}
          <div className="p-6 rounded-3xl bg-[#10151D] border border-[#232E3E] space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Baraha Bulshada & Falanqaynta
            </h4>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={profile.socialLinks.telegram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#151C26] border border-[#232E3E] hover:border-gold/50 transition-colors"
              >
                <span className="font-semibold text-text-main">Telegram</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
              </a>
              <a
                href={profile.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#151C26] border border-[#232E3E] hover:border-gold/50 transition-colors"
              >
                <span className="font-semibold text-text-main">X / Twitter</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
              </a>
              <a
                href={profile.socialLinks.tradingview}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#151C26] border border-[#232E3E] hover:border-gold/50 transition-colors"
              >
                <span className="font-semibold text-text-main">TradingView</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
              </a>
              <a
                href={profile.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#151C26] border border-[#232E3E] hover:border-gold/50 transition-colors"
              >
                <span className="font-semibold text-text-main">YouTube Desk</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#10151D] border border-gold/30 shadow-2xl space-y-6">
          <div className="pb-2 border-b border-[#1E293B]">
            <h3 className="text-lg font-bold text-text-main">Dir Farriin Qoraal ah</h3>
            <p className="text-xs text-text-muted mt-0.5">
              Buuxi foomka hoose, waxaan kugu soo jawaabi doonnaa email-kaaga.
            </p>
          </div>

          {/* Success Banner if message sent */}
          {isSuccess && (
            <div className="p-4 rounded-2xl bg-profit/15 border border-profit/40 flex items-start gap-3 text-xs text-profit leading-relaxed animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm">Farriintaada waa la diray!</strong>
                <span>Waad ku mahadsan tahay xiriirkaaga. Waxaan dib kula soo xiriiri doonaa waqti dhow.</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Honeypot field (hidden from users to catch bots) */}
            <input
              type="text"
              name="honeypot"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                  Magacaaga oo Buuxa *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maxamed Cali"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
                />
                {errors.name && <span className="text-[11px] text-loss mt-1 block">{errors.name}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                  Email-kaaga *
                </label>
                <input
                  type="email"
                  placeholder="e.g. maxamed@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
                />
                {errors.email && <span className="text-[11px] text-loss mt-1 block">{errors.email}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                  Nooca Weydiinta (Inquiry Type)
                </label>
                <select
                  value={inquiryType}
                  onChange={e => setInquiryType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
                >
                  <option value="Mentorship & Tababar">Mentorship & Tababarka Trading-ka</option>
                  <option value="Wada-shaqayn Ganacsi">Wada-shaqayn Ganacsi (Prop Firm / Fund)</option>
                  <option value="Falanqaynta Suuqa">Weydiin ku saabsan Falanqayn Gaar ah</option>
                  <option value="Su'aal Guud">Su'aal Guud</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                  Mawduuca Farriinta (Subject) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ka qaybgalka barnaamijka tababarka"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
                />
                {errors.subject && <span className="text-[11px] text-loss mt-1 block">{errors.subject}</span>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1.5">
                Qoraalka Farriintaada *
              </label>
              <textarea
                rows={5}
                placeholder="Ku qor faahfaahinta fariintaada halkan..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none resize-none leading-relaxed"
              />
              {errors.message && <span className="text-[11px] text-loss mt-1 block">{errors.message}</span>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#D6B56D] to-[#B39247] text-[#080B10] font-black text-xs shadow-gold-glow hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Farriinta waa la dirayaa...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Dir Farriinta Hadda</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
};
