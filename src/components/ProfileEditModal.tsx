import React, { useState } from 'react';
import { X, Check, UserCheck, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { TraderProfile } from '../types/trade';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: TraderProfile;
  onSaveProfile: (updated: TraderProfile) => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<TraderProfile>({ ...profile });
  const [newRule, setNewRule] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  const handleAddRule = () => {
    if (newRule.trim()) {
      setFormData({
        ...formData,
        rules: [...formData.rules, newRule.trim()],
      });
      setNewRule('');
    }
  };

  const handleRemoveRule = (index: number) => {
    setFormData({
      ...formData,
      rules: formData.rules.filter((_, i) => i !== index),
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          avatarUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const initials = formData.fullName
    ? formData.fullName.split(' ').map(n => n[0]).filter(Boolean).join('')
    : 'AA';

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
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-main">Wax Ka Beddel Xogtaada Shakhsiga ah</h3>
              <p className="text-xs text-text-muted">Habee magacaaga, brand-kaaga, sawirkaaga, iyo falsafaddaada.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-main rounded-lg hover:bg-[#10151D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Avatar Section: Upload, URL or Initials */}
          <div className="p-4 rounded-2xl bg-[#151C26] border border-[#232E3E] space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gold block">
              Sawirkaaga Profile-ka (Avatar)
            </span>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Preview */}
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-gold/50 bg-[#10151D] flex items-center justify-center flex-shrink-0 shadow-md">
                {formData.avatarUrl ? (
                  <img
                    src={formData.avatarUrl}
                    alt={formData.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-black text-gold tracking-wider">
                    {initials}
                  </span>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1 space-y-2 w-full text-xs">
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gold/15 border border-gold/30 text-gold hover:bg-gold/25 font-bold transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Ka Soo Xulo Computer-kaaga</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {formData.avatarUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, avatarUrl: '' }))}
                      className="px-3 py-2 rounded-xl bg-[#10151D] border border-[#232E3E] text-text-muted hover:text-loss transition-colors"
                    >
                      Ka Saar Sawirka
                    </button>
                  )}
                </div>
                <input
                  type="url"
                  placeholder="Ama halkan ku dheji Image URL..."
                  value={formData.avatarUrl}
                  onChange={e => setFormData({ ...formData, avatarUrl: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#10151D] border border-[#232E3E] text-text-main text-xs focus:border-gold focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
                Magacaaga oo Buuxa *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
                Magaca Brand-ka / Shirkadda *
              </label>
              <input
                type="text"
                value={formData.brandName}
                onChange={e => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
                Goobta (Location - Ikhtiyaari)
              </label>
              <input
                type="text"
                placeholder="e.g. Suuqyada Maaliyadda Caalamiga ah"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
                Sannadaha Khibradda (Ikhtiyaari)
              </label>
              <input
                type="number"
                placeholder="0"
                value={formData.experienceYears || ''}
                onChange={e => setFormData({ ...formData, experienceYears: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
              Takhasuska & Qaabka (Specialty)
            </label>
            <input
              type="text"
              value={formData.specialty}
              onChange={e => setFormData({ ...formData, specialty: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
              Qoraalka Kooban ee Shakhsiga (Bio)
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-main text-sm focus:border-gold focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Rules Section */}
          <div className="p-4 rounded-xl bg-[#151C26] border border-[#232E3E] space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gold block">
              Xeerarka Dahabiga ah ee Trading-ka (Trading Rules)
            </span>
            <div className="space-y-2 max-h-36 overflow-y-auto">
              {formData.rules.map((rule, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#10151D] text-xs">
                  <span className="text-text-main">{rule}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRule(idx)}
                    className="text-text-muted hover:text-loss transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Ku dar xeer cusub..."
                value={newRule}
                onChange={e => setNewRule(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-[#10151D] border border-[#232E3E] text-xs text-text-main focus:border-gold focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddRule}
                className="px-3 py-1.5 rounded-lg bg-gold/15 border border-gold/30 text-gold text-xs font-bold hover:bg-gold/25"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-text-muted mb-1">Telegram Link:</label>
              <input
                type="text"
                value={formData.socialLinks.telegram}
                onChange={e => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, telegram: e.target.value },
                })}
                className="w-full px-3 py-1.5 rounded-lg bg-[#151C26] border border-[#232E3E] text-text-main"
              />
            </div>
            <div>
              <label className="block text-text-muted mb-1">Email:</label>
              <input
                type="email"
                value={formData.socialLinks.email}
                onChange={e => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, email: e.target.value },
                })}
                className="w-full px-3 py-1.5 rounded-lg bg-[#151C26] border border-[#232E3E] text-text-main"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-[#1E293B] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#151C26] border border-[#232E3E] text-text-muted hover:text-text-main text-xs font-semibold"
            >
              Ka Noqo
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D6B56D] to-[#B39247] text-[#080B10] font-bold text-xs shadow-gold-glow hover:brightness-110 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Keydi Xogta</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
