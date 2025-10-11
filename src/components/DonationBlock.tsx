import React, { useState } from 'react';
import { Heart, Coffee, Star } from 'lucide-react';

interface DonationBlockProps {
  isDark: boolean;
  currentLanguage: string;
}

const donationTexts = {
  en: {
    title: "Support Our Mission",
    subtitle: "Your support helps us continue creating innovative solutions and delivering exceptional value to the community.",
    chooseAmount: "Choose an amount",
    amounts: ["Buy us a coffee", "Support our work", "Become a sponsor"],
    customAmountLabel: "or enter custom amount",
    customAmountPlaceholder: "Custom amount",
    donateButton: "Donate via PayPal",
    securePayment: "Secure payment through PayPal",
    quickDonate: "Quick donate",
    infoTitle: "Your donation helps us maintain and improve our projects, invest in research & development, and create more value for the community.",
    infoSubtitle: "Every contribution, no matter the size, makes a difference!",
    thankYou: "Thank you for your support!",
    thankYouMessage: "Your contribution helps make our work better for everyone!",
  },
  ru: {
    title: "Поддержите нашу миссию",
    subtitle: "Ваша поддержка помогает нам создавать инновационные решения и приносить исключительную ценность сообществу.",
    chooseAmount: "Выберите сумму",
    amounts: ["Купить нам кофе", "Поддержать нашу работу", "Стать спонсором"],
    customAmountLabel: "или введите свою сумму",
    customAmountPlaceholder: "Своя сумма",
    donateButton: "Поддержать через PayPal",
    securePayment: "Безопасная оплата через PayPal",
    quickDonate: "Быстрая поддержка",
    infoTitle: "Ваша поддержка помогает нам поддерживать и улучшать наши проекты, инвестировать в исследования и разработки и создавать больше ценности для сообщества.",
    infoSubtitle: "Каждый вклад, независимо от размера, имеет значение!",
    thankYou: "Спасибо за вашу поддержку!",
    thankYouMessage: "Ваш вклад помогает сделать нашу работу лучше для всех!",
  }
};

export const DonationBlock: React.FC<DonationBlockProps> = ({ isDark, currentLanguage }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const t = donationTexts[currentLanguage as keyof typeof donationTexts] || donationTexts.en;

  const predefinedAmounts = [
    { amount: 5, icon: Coffee, label: t.amounts[0] },
    { amount: 10, icon: Heart, label: t.amounts[1] },
    { amount: 25, icon: Star, label: t.amounts[2] }
  ];

  const quickDonateAmounts = [5, 10, 25];

  const handleDonate = (amount?: number) => {
    const finalAmount = amount !== undefined ? amount : parseFloat(customAmount) || 5;

    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${encodeURIComponent('hoper_Jay@i.ua')}&amount=${finalAmount}&currency_code=USD&item_name=${encodeURIComponent('PetrovskiLabs Support')}&no_note=0&cn=${encodeURIComponent('Message (optional)')}&no_shipping=1`;

    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);

    window.open(paypalUrl, '_blank');
  };

  if (showThankYou) {
    return (
      <div className={`relative p-8 rounded-2xl ${isDark ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm text-center`}>
        <div className="animate-bounce mb-4">
          <Heart className="w-16 h-16 mx-auto text-pink-500" />
        </div>
        <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
          {t.thankYou}
        </h3>
        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
          {t.thankYouMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            {t.title}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            {t.subtitle}
          </p>
        </div>

        <div className={`rounded-3xl p-8 md:p-12 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/80 border-gray-200'} backdrop-blur-sm border`}>
          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} text-center mb-8`}>
            {t.chooseAmount}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {predefinedAmounts.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedAmount(item.amount);
                  handleDonate(item.amount);
                }}
                className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${
                  isDark
                    ? 'border-slate-700 hover:border-cyan-500/50 bg-slate-800/50 hover:bg-cyan-500/5'
                    : 'border-gray-200 hover:border-cyan-300 bg-white hover:bg-cyan-50/50'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                    item.amount === 5 ? 'bg-cyan-500/20' : item.amount === 10 ? 'bg-pink-500/20' : 'bg-cyan-400/20'
                  }`}>
                    <item.icon className={`w-6 h-6 ${
                      item.amount === 5 ? 'text-cyan-400' : item.amount === 10 ? 'text-pink-400' : 'text-cyan-300'
                    }`} />
                  </div>
                  <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    ${item.amount}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.label}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center mb-6">
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-4`}>
              {t.customAmountLabel}
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="relative max-w-xs">
                <span className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  $
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder={t.customAmountPlaceholder}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 ${
                    isDark
                      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-cyan-500'
                  } focus:outline-none transition-colors`}
                  min="1"
                  step="1"
                />
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={() => handleDonate()}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <Heart className="w-5 h-5 mr-2" />
              {t.donateButton}
            </button>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-3`}>
              {t.securePayment}
            </p>
          </div>

          <div className={`pt-6 border-t ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center mb-4`}>
              {t.quickDonate}
            </p>
            <div className="flex justify-center gap-4">
              {quickDonateAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleDonate(amount)}
                  className={`px-6 py-2 rounded-lg border-2 font-medium transition-all duration-300 hover:scale-105 ${
                    isDark
                      ? 'border-slate-700 hover:border-cyan-500/50 text-gray-300 hover:bg-slate-800/50'
                      : 'border-gray-200 hover:border-cyan-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart className="w-4 h-4 inline mr-2" />
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          <div className={`mt-8 p-6 rounded-2xl ${isDark ? 'bg-cyan-500/5 border border-cyan-500/20' : 'bg-cyan-50 border border-cyan-100'}`}>
            <div className="flex items-start">
              <Star className={`w-5 h-5 mt-1 mr-3 flex-shrink-0 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  {t.infoTitle}
                </p>
                <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.infoSubtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
