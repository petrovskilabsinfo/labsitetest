import React, { useState } from 'react';
import { Heart, Coffee, Star, Gift, Zap, type LucideIcon } from 'lucide-react';
import { petrovskiLabsTranslations, Language } from '../petrovskiLabsTranslations';

interface DonationBlockProps {
  isDark: boolean;
  currentLanguage: Language;
}

type AccentColor = 'orange' | 'pink' | 'purple' | 'green';

interface DonationPreset {
  amount: number | 'custom';
  icon: LucideIcon;
  label: string;
  color: AccentColor;
}

const floatingHearts = [
  { top: '8%', left: '8%', size: '16px', delay: '0s' },
  { top: '15%', right: '12%', size: '12px', delay: '1s' },
  { bottom: '18%', left: '12%', size: '10px', delay: '0.5s' },
  { bottom: '12%', right: '10%', size: '14px', delay: '1.5s' }
];

const accentPalette: Record<AccentColor, { iconBg: string; iconColor: string; borderGlow: string; iconShadow: string }> = {
  orange: {
    iconBg: 'bg-[linear-gradient(135deg,#ffc235,#ff7b00)]',
    iconColor: 'text-white',
    borderGlow: 'hover:border-[#ffb347]/60 hover:shadow-[0_18px_45px_rgba(255,179,71,0.35)]',
    iconShadow: 'shadow-[0_15px_30px_rgba(255,140,66,0.45)]'
  },
  pink: {
    iconBg: 'bg-[linear-gradient(135deg,#ff7ed1,#f24a9d)]',
    iconColor: 'text-white',
    borderGlow: 'hover:border-[#ff7fd1]/60 hover:shadow-[0_18px_45px_rgba(255,127,209,0.35)]',
    iconShadow: 'shadow-[0_15px_30px_rgba(244,90,157,0.45)]'
  },
  purple: {
    iconBg: 'bg-[linear-gradient(135deg,#b98aff,#7e63ff)]',
    iconColor: 'text-white',
    borderGlow: 'hover:border-[#b084ff]/60 hover:shadow-[0_18px_45px_rgba(176,132,255,0.35)]',
    iconShadow: 'shadow-[0_15px_30px_rgba(126,99,255,0.4)]'
  },
  green: {
    iconBg: 'bg-[linear-gradient(135deg,#79f2c2,#32c77d)]',
    iconColor: 'text-white',
    borderGlow: 'hover:border-[#7ef7c2]/60 hover:shadow-[0_18px_45px_rgba(126,247,194,0.35)]',
    iconShadow: 'shadow-[0_15px_30px_rgba(90,220,150,0.4)]'
  }
};

export const DonationBlock: React.FC<DonationBlockProps> = ({ isDark, currentLanguage }) => {
  const [customAmount, setCustomAmount] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const t = petrovskiLabsTranslations[currentLanguage] || petrovskiLabsTranslations.en;
  const sceneBackground = isDark ? 'transparent' : 'transparent';
  const gratitudeBackground = isDark ? '#030611' : '#101943';

  const predefinedAmounts: DonationPreset[] = [
    { amount: 3, icon: Coffee, label: t.donation.amounts[0], color: 'orange' },
    { amount: 10, icon: Heart, label: t.donation.amounts[1], color: 'pink' },
    { amount: 25, icon: Star, label: t.donation.amounts[2], color: 'purple' },
    { amount: 'custom', icon: Gift, label: t.donation.customAmountPlaceholder, color: 'green' }
  ];

  const handleDonate = (amount?: number) => {
    const finalAmount = amount !== undefined ? amount : parseFloat(customAmount) || 5;

    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${encodeURIComponent('hoper_Jay@i.ua')}&amount=${finalAmount}&currency_code=USD&item_name=${encodeURIComponent('PetrovskiLabs Support')}&no_note=0&cn=${encodeURIComponent('Message (optional)')}&no_shipping=1`;

    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);

    window.open(paypalUrl, '_blank');
  };

  if (showThankYou) {
    return (
      <div className="relative isolate py-20 px-4 md:px-6 overflow-hidden" style={{ backgroundColor: gratitudeBackground }}>
        <div className="absolute inset-0 bg-[#030611]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(156,105,255,0.18),_transparent_55%)]" />
        <div className="absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-pink-500/20 blur-[140px]" />
        <div className="absolute -bottom-10 right-1/4 h-72 w-72 rounded-full bg-purple-500/25 blur-[140px]" />

        <div className="relative max-w-2xl mx-auto text-center">
          <div className="rounded-[32px] p-12 backdrop-blur-2xl border border-white/10 bg-white/5 shadow-[0_30px_120px_rgba(5,6,17,0.85)]">
            <div className="animate-bounce mb-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t.donation.thankYou}
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              {t.donation.thankYouMessage}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-20 px-4 md:px-6" style={{ backgroundColor: sceneBackground }}>

      {floatingHearts.map((heart, index) => (
        <span
          key={index}
          className="pointer-events-none absolute text-pink-400/20 animate-pulse"
          style={{ ...heart }}
        >
          ♥
        </span>
      ))}

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center space-y-5 mb-12">
          <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600/80 p-1.5 shadow-[0_15px_35px_rgba(255,85,170,0.45)]">
            <div className="w-16 h-16 rounded-full bg-[#080c1d] flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-pink-200/70 mb-3">{t.donation.quickDonate}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white via-pink-100 to-purple-200 bg-clip-text text-transparent">
              {t.donation.title}
            </h2>
            <p className="text-lg text-slate-200/80 max-w-3xl mx-auto leading-relaxed">
              {t.donation.subtitle}
            </p>
          </div>
        </div>

        <div className="relative rounded-[36px] p-8 md:p-12 backdrop-blur-3xl border border-[#6f4bd8]/20 bg-[#070d1f]/85 shadow-[0_45px_140px_rgba(2,4,12,0.9)] overflow-hidden">
          <div className="absolute inset-x-6 inset-y-0 bg-[radial-gradient(circle_at_top,_rgba(255,99,214,0.12),_transparent_55%)] pointer-events-none" />
          <div className="absolute inset-x-0 inset-y-0 bg-[radial-gradient(circle_at_bottom,_rgba(89,122,255,0.12),_transparent_50%)] pointer-events-none" />
          <div className="relative text-center space-y-3 mb-10">
            <p className="text-xl text-white/90 font-semibold">
              {t.donation.infoTitle}
            </p>
            <p className="text-base text-slate-300/80">
              {t.donation.infoSubtitle}
            </p>
          </div>

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-10">
            {predefinedAmounts.map((item, index) => {
              const palette = accentPalette[item.color];

              return (
                <button
                  key={index}
                  onClick={() => {
                    if (item.amount === 'custom') {
                      const input = document.querySelector<HTMLInputElement>('input[data-donation-input="true"]');
                      if (input) input.focus();
                      return;
                    }
                    handleDonate(item.amount as number);
                  }}
                  className={`relative p-6 rounded-[28px] border border-[#6f4bd8]/40 bg-[#0b1020]/80/80 hover:bg-[#101833] transition-all duration-300 transform hover:-translate-y-1 group ${palette.borderGlow}`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center ${palette.iconBg} group-hover:scale-110 transition-transform duration-300 ${palette.iconShadow}`}>
                      <item.icon className={`w-6 h-6 ${palette.iconColor}`} />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {item.amount === 'custom' ? '—' : `$${item.amount}`}
                    </div>
                    <div className="text-sm text-slate-300/80 leading-tight">
                      {item.label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative text-center space-y-6">
            <div className="flex flex-col items-center gap-3">
              <label htmlFor="customDonation" className="text-sm uppercase tracking-[0.4em] text-slate-300/60">
                {t.donation.customAmount}
              </label>
              <div className="w-full max-w-sm">
                <div className="rounded-2xl p-[1px] bg-gradient-to-r from-pink-500/80 via-purple-500/80 to-blue-500/80">
                  <div className="relative rounded-[18px] bg-[#080f22]/95">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-white/70">$</span>
                    <Heart className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      id="customDonation"
                      data-donation-input="true"
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder={t.donation.customAmountPlaceholder}
                      className="w-full bg-transparent pl-10 pr-10 py-3 rounded-[18px] text-white placeholder-white/40 focus:outline-none"
                      min="1"
                      step="1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDonate()}
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-[22px] bg-gradient-to-r from-[#ff4fb8] via-[#c24cff] to-[#5a7bff] text-white font-semibold text-lg tracking-wide shadow-[0_18px_45px_rgba(170,85,255,0.35)] hover:shadow-[0_22px_60px_rgba(170,85,255,0.45)] transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-pink-400/40"
            >
              <Heart className="w-5 h-5" />
              {t.donation.donateButton}
            </button>

            <div className="pt-6 flex items-center justify-center border-t border-white/10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2b3245] px-5 py-2 text-sm text-slate-200 bg-[#0f162c]/80">
                <Zap className="w-4 h-4 text-pink-300" />
                {t.donation.securePayment}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
