import React, { useState } from 'react';
import { Heart, Coffee, Zap, Star, Gift } from 'lucide-react';

interface DonationBlockProps {
  isDark: boolean;
  currentLanguage: string;
}

const donationTexts = {
  en: {
    title: "Support PetrovskiStudio Development",
    subtitle: "Help us bring a better future for everyone",
    description: "Brave New World",
    amounts: ["Buy me a coffee", "Support development", "Premium support", "Custom amount"],
    thankYou: "Thank you for your support! 💜",
    thankYouMessage: "Your contribution helps make ColorAdapt better for everyone!",
    poweredBy: "Powered by PayPal",
    enterAmount: "Enter amount",
    donateButton: "Donate"
  },
};

export const DonationBlock: React.FC<DonationBlockProps> = ({ isDark, currentLanguage }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const t = donationTexts.en;
  
  const predefinedAmounts = [
    { amount: 3, icon: Coffee, label: t.amounts[0], color: 'from-amber-500 to-orange-500' },
    { amount: 10, icon: Heart, label: t.amounts[1], color: 'from-pink-500 to-red-500' },
    { amount: 25, icon: Star, label: t.amounts[2], color: 'from-purple-500 to-indigo-500' },
    { amount: 0, icon: Gift, label: t.amounts[3], color: 'from-green-500 to-emerald-500' }
  ];

  const themeClasses = {
    background: isDark ? 'bg-slate-800/30' : 'bg-white/70',
    border: isDark ? 'border-purple-500/30' : 'border-purple-300/40',
    text: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
    textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
    cardBg: isDark ? 'bg-slate-700/50' : 'bg-white/80',
    cardHover: isDark ? 'hover:bg-slate-600/50' : 'hover:bg-purple-50/80',
    inputBg: isDark ? 'bg-slate-700/50' : 'bg-white/90',
    inputBorder: isDark ? 'border-slate-600' : 'border-purple-200'
  };

  const handleDonate = (amount: number) => {
    const finalAmount = amount === 0 ? parseFloat(customAmount) || 5 : amount;
    
    // PayPal donation URL using email address
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${encodeURIComponent('hoper_Jay@i.ua')}&amount=${finalAmount}&currency_code=USD&item_name=${encodeURIComponent('PetrovskiStudio Development Support')}&no_note=0&cn=${encodeURIComponent('Message for developer (optional)')}&no_shipping=1&return=${encodeURIComponent('https://coloradapt-visual-co-cab6.bolt.host')}&cancel_return=${encodeURIComponent('https://coloradapt-visual-co-cab6.bolt.host')}`;
    
    // Show thank you message and open PayPal
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
    
    // Open PayPal donation page
    window.open(paypalUrl, '_blank');
  };

  if (showThankYou) {
    return (
      <div className="px-4 py-10">
        <div className={`relative max-w-3xl mx-auto p-6 sm:p-8 lg:p-10 rounded-3xl ${themeClasses.background} border ${themeClasses.border} backdrop-blur-sm text-center`}>
        <div className="animate-bounce mb-4">
          <Heart className="w-16 h-16 mx-auto text-pink-500" />
        </div>
        <h3 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>
          {t.thankYou}
        </h3>
        <p className={themeClasses.textSecondary}>
          {t.thankYouMessage}
        </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-10">
      <div className={`relative max-w-5xl mx-auto p-6 sm:p-8 lg:p-10 rounded-3xl ${themeClasses.background} border ${themeClasses.border} backdrop-blur-sm overflow-hidden`}>
        {/* Decorative background */}
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-purple-500/5 to-pink-500/5' : 'bg-gradient-to-br from-purple-100/50 to-pink-100/50'}`}></div>
        
        {/* Floating hearts animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <Heart
              key={i}
              className={`absolute w-4 h-4 text-pink-400/30 animate-pulse`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 2) * 70}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mr-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${isDark ? 'from-pink-400 to-purple-400' : 'from-pink-600 to-purple-600'} bg-clip-text text-transparent`}>
                {t.title}
              </h3>
            </div>
            <p className={`text-lg sm:text-xl ${themeClasses.textSecondary} mb-3`}>
              {t.subtitle}
            </p>
            <p className={`${themeClasses.textMuted} max-w-2xl mx-auto`}>
              {t.description}
            </p>
          </div>

          {/* Donation amounts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 items-stretch">
            {predefinedAmounts.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedAmount(item.amount);
                  if (item.amount > 0) handleDonate(item.amount);
                }}
                className={`group relative p-5 sm:p-6 rounded-2xl h-full flex flex-col justify-between ${themeClasses.cardBg} border ${
                  selectedAmount === item.amount ? 'border-purple-500' : themeClasses.border
                } ${themeClasses.cardHover} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} p-3 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  {item.amount > 0 && (
                    <div className={`text-2xl font-bold ${themeClasses.text} mb-1`}>
                      ${item.amount}
                    </div>
                  )}
                  <div className={`text-sm ${themeClasses.textSecondary}`}>
                    {item.label}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Custom amount input */}
          {selectedAmount === 0 && (
            <div className="mb-8 animate-in slide-in-from-top-2 duration-300">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
                <div className="relative w-full sm:w-60">
                  <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted}`}>$</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder={t.enterAmount}
                    className={`pl-8 pr-4 py-3 w-full rounded-xl ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                    min="1"
                    step="0.01"
                  />
                </div>
                <button
                  onClick={() => handleDonate(0)}
                  disabled={!customAmount || parseFloat(customAmount) <= 0}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                  {t.donateButton}
                </button>
              </div>
            </div>
          )}

          {/* PayPal branding */}
          <div className="text-center mt-4">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${isDark ? 'bg-slate-700/50' : 'bg-gray-100/80'} ${themeClasses.textMuted} text-sm`}>
              <Zap className="w-4 h-4" />
              <span>{t.poweredBy}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};