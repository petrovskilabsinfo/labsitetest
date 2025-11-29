import { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { Heart, Coffee, Zap, Star, Gift, X } from 'lucide-react';

interface DonationBlockProps {
  isDark: boolean;
  currentLanguage: string;
  onClose?: () => void;
}

const donationTexts: Record<string, any> = {
  en: {
    title: "Support PetrovskiStudio",
    subtitle: "Creating a Better Future for Everyone.",
    amounts: ["Buy me a coffee", "Support development", "Premium support", "Custom amount"],
    thankYou: "Thank you for your support! 💜",
    thankYouMessage: "💜",
    poweredBy: "Powered by PayPal",
    enterAmount: "Enter amount",
    donateButton: "Donate"
  },
  es: {
    title: "Apoya a PetrovskiStudio",
    subtitle: "Creando un Mejor Futuro para Todos.",
    amounts: ["Invítame un café", "Apoya el desarrollo", "Soporte premium", "Cantidad personalizada"],
    thankYou: "¡Gracias por tu apoyo! 💜",
    thankYouMessage: "💜",
    poweredBy: "Con tecnología de PayPal",
    enterAmount: "Ingresa la cantidad",
    donateButton: "Donar"
  },
  zh: {
    title: "支持 PetrovskiStudio",
    subtitle: "为每个人创造更美好的未来。",
    amounts: ["请我喝咖啡", "支持开发", "高级支持", "自定义金额"],
    thankYou: "感谢您的支持！💜",
    thankYouMessage: "💜",
    poweredBy: "由 PayPal 提供支持",
    enterAmount: "输入金额",
    donateButton: "捐赠"
  },
  hi: {
    title: "PetrovskiStudio का समर्थन करें",
    subtitle: "सभी के लिए बेहतर भविष्य बना रहे हैं।",
    amounts: ["मुझे एक कॉफी खरीदें", "विकास का समर्थन करें", "प्रीमियम सहायता", "कस्टम राशि"],
    thankYou: "आपके समर्थन के लिए धन्यवाद! 💜",
    thankYouMessage: "💜",
    poweredBy: "PayPal द्वारा संचालित",
    enterAmount: "राशि दर्ज करें",
    donateButton: "दान करें"
  },
  ar: {
    title: "ادعم PetrovskiStudio",
    subtitle: "بناء مستقبل أفضل للجميع.",
    amounts: ["اشتري لي قهوة", "ادعم التطوير", "دعم ممتاز", "مبلغ مخصص"],
    thankYou: "شكرًا لدعمك! 💜",
    thankYouMessage: "💜",
    poweredBy: "مدعوم من PayPal",
    enterAmount: "أدخل المبلغ",
    donateButton: "تبرع"
  },
  pt: {
    title: "Apoie PetrovskiStudio",
    subtitle: "Criando um Futuro Melhor para Todos.",
    amounts: ["Compre-me um café", "Apoie o desenvolvimento", "Suporte premium", "Valor personalizado"],
    thankYou: "Obrigado pelo seu apoio! 💜",
    thankYouMessage: "💜",
    poweredBy: "Alimentado por PayPal",
    enterAmount: "Digite o valor",
    donateButton: "Doar"
  },
  ru: {
    title: "Поддержите PetrovskiStudio",
    subtitle: "Создавая лучшее будущее для всех.",
    amounts: ["Купите мне кофе", "Поддержать разработку", "Премиум поддержка", "Произвольная сумма"],
    thankYou: "Спасибо за вашу поддержку! 💜",
    thankYouMessage: "💜",
    poweredBy: "Работает на PayPal",
    enterAmount: "Введите сумму",
    donateButton: "Пожертвовать"
  },
  bn: {
    title: "PetrovskiStudio কে সমর্থন করুন",
    subtitle: "সবার জন্য একটি উন্নত ভবিষ্যৎ তৈরি করছি।",
    amounts: ["আমাকে একটি কফি কিনুন", "উন্নয়ন সমর্থন করুন", "প্রিমিয়াম সমর্থন", "কাস্টম পরিমাণ"],
    thankYou: "আপনার সমর্থনের জন্য ধন্যবাদ! 💜",
    thankYouMessage: "💜",
    poweredBy: "PayPal দ্বারা পরিচালিত",
    enterAmount: "পরিমাণ লিখুন",
    donateButton: "দান করুন"
  },
  ja: {
    title: "PetrovskiStudioをサポート",
    subtitle: "みんなのためのより良い未来を創造しています。",
    amounts: ["コーヒーをおごってください", "開発をサポート", "プレミアムサポート", "カスタム金額"],
    thankYou: "ご支援ありがとうございます！💜",
    thankYouMessage: "💜",
    poweredBy: "PayPal提供",
    enterAmount: "金額を入力",
    donateButton: "寄付する"
  },
  de: {
    title: "PetrovskiStudio unterstützen",
    subtitle: "Eine bessere Zukunft für alle schaffen.",
    amounts: ["Kaufen Sie mir einen Kaffee", "Entwicklung unterstützen", "Premium-Support", "Benutzerdefinierter Betrag"],
    thankYou: "Vielen Dank für Ihre Unterstützung! 💜",
    thankYouMessage: "💜",
    poweredBy: "Unterstützt von PayPal",
    enterAmount: "Betrag eingeben",
    donateButton: "Spenden"
  },
  ko: {
    title: "PetrovskiStudio 지원",
    subtitle: "모든 이를 위한 더 나은 미래를 만들고 있습니다.",
    amounts: ["커피 사주기", "개발 지원", "프리미엄 지원", "사용자 지정 금액"],
    thankYou: "지원해 주셔서 감사합니다! 💜",
    thankYouMessage: "💜",
    poweredBy: "PayPal 제공",
    enterAmount: "금액 입력",
    donateButton: "기부하기"
  },
  fr: {
    title: "Soutenir PetrovskiStudio",
    subtitle: "Créer un meilleur avenir pour tous.",
    amounts: ["Offrez-moi un café", "Soutenir le développement", "Support premium", "Montant personnalisé"],
    thankYou: "Merci pour votre soutien ! 💜",
    thankYouMessage: "💜",
    poweredBy: "Propulsé par PayPal",
    enterAmount: "Entrez le montant",
    donateButton: "Faire un don"
  },
  pa: {
    title: "PetrovskiStudio ਦਾ ਸਮਰਥਨ ਕਰੋ",
    subtitle: "ਸਭ ਲਈ ਇੱਕ ਬਿਹਤਰ ਭਵਿੱਖ ਬਣਾ ਰਹੇ ਹਾਂ।",
    amounts: ["ਮੈਨੂੰ ਇੱਕ ਕੌਫੀ ਖਰੀਦੋ", "ਵਿਕਾਸ ਦਾ ਸਮਰਥਨ ਕਰੋ", "ਪ੍ਰੀਮੀਅਮ ਸਹਾਇਤਾ", "ਕਸਟਮ ਰਕਮ"],
    thankYou: "ਤੁਹਾਡੇ ਸਮਰਥਨ ਲਈ ਧੰਨਵਾਦ! 💜",
    thankYouMessage: "💜",
    poweredBy: "PayPal ਦੁਆਰਾ ਸੰਚਾਲਿਤ",
    enterAmount: "ਰਕਮ ਦਰਜ ਕਰੋ",
    donateButton: "ਦਾਨ ਕਰੋ"
  },
  jv: {
    title: "Dhukung PetrovskiStudio",
    subtitle: "Nggawe Mangsa Depan sing Luwih Apik kanggo Kabeh.",
    amounts: ["Tuku kopi kanggo aku", "Dhukung pangembangan", "Dhukungan premium", "Jumlah kustom"],
    thankYou: "Matur nuwun kanggo dhukungane! 💜",
    thankYouMessage: "💜",
    poweredBy: "Didukung dening PayPal",
    enterAmount: "Ketik jumlah",
    donateButton: "Nyumbang"
  },
  te: {
    title: "PetrovskiStudio ను మద్దతు ఇవ్వండి",
    subtitle: "అందరికీ మెరుగైన భవిష్యత్తును సృష్టిస్తున్నాము.",
    amounts: ["నాకు కాఫీ కొనండి", "అభివృద్ధిని మద్దతు ఇవ్వండి", "ప్రీమియం మద్దతు", "కస్టమ్ మొత్తం"],
    thankYou: "మీ మద్దతుకు ధన్యవాదాలు! 💜",
    thankYouMessage: "💜",
    poweredBy: "PayPal ద్వారా అందించబడింది",
    enterAmount: "మొత్తం నమోదు చేయండి",
    donateButton: "దానం చేయండి"
  },
  tr: {
    title: "PetrovskiStudio'yu Destekleyin",
    subtitle: "Herkes İçin Daha İyi Bir Gelecek Yaratıyoruz.",
    amounts: ["Bana bir kahve ısmarla", "Geliştirmeyi destekle", "Premium destek", "Özel tutar"],
    thankYou: "Desteğiniz için teşekkürler! 💜",
    thankYouMessage: "💜",
    poweredBy: "PayPal ile desteklenmektedir",
    enterAmount: "Tutarı girin",
    donateButton: "Bağış Yap"
  },
  vi: {
    title: "Hỗ trợ PetrovskiStudio",
    subtitle: "Tạo tương lai tốt đẹp hơn cho mọi người.",
    amounts: ["Mua cho tôi một ly cà phê", "Hỗ trợ phát triển", "Hỗ trợ cao cấp", "Số tiền tùy chỉnh"],
    thankYou: "Cảm ơn bạn đã hỗ trợ! 💜",
    thankYouMessage: "💜",
    poweredBy: "Được hỗ trợ bởi PayPal",
    enterAmount: "Nhập số tiền",
    donateButton: "Quyên góp"
  },
  it: {
    title: "Supporta PetrovskiStudio",
    subtitle: "Creare un futuro migliore per tutti.",
    amounts: ["Offrimi un caffè", "Supporta lo sviluppo", "Supporto premium", "Importo personalizzato"],
    thankYou: "Grazie per il tuo sostegno! 💜",
    thankYouMessage: "💜",
    poweredBy: "Supportato da PayPal",
    enterAmount: "Inserisci l'importo",
    donateButton: "Dona"
  },
  th: {
    title: "สนับสนุน PetrovskiStudio",
    subtitle: "กำลังสร้างอนาคตที่ดีกว่าสำหรับทุกคน",
    amounts: ["ซื้อกาแฟให้ฉัน", "สนับสนุนการพัฒนา", "การสนับสนุนระดับพรีเมียม", "จำนวนเงินที่กำหนดเอง"],
    thankYou: "ขอบคุณสำหรับการสนับสนุนของคุณ! 💜",
    thankYouMessage: "💜",
    poweredBy: "ขับเคลื่อนโดย PayPal",
    enterAmount: "ใส่จำนวนเงิน",
    donateButton: "บริจาค"
  },
  uk: {
    title: "Підтримайте PetrovskiStudio",
    subtitle: "Створюємо краще майбутнє для всіх.",
    amounts: ["Купи мені каву", "Підтримати розробку", "Преміум підтримка", "Довільна сума"],
    thankYou: "Дякуємо за вашу підтримку! 💜",
    thankYouMessage: "💜",
    poweredBy: "Працює на PayPal",
    enterAmount: "Введіть суму",
    donateButton: "Пожертвувати"
  },
  id: {
    title: "Dukung PetrovskiStudio",
    subtitle: "Menciptakan Masa Depan yang Lebih Baik untuk Semua Orang.",
    amounts: ["Beli saya kopi", "Dukung pengembangan", "Dukungan premium", "Jumlah kustom"],
    thankYou: "Terima kasih atas dukungan Anda! 💜",
    thankYouMessage: "💜",
    poweredBy: "Didukung oleh PayPal",
    enterAmount: "Masukkan jumlah",
    donateButton: "Donasi"
  },
  nl: {
    title: "Steun PetrovskiStudio",
    subtitle: "Een betere toekomst creëren voor iedereen.",
    amounts: ["Koop me een koffie", "Ondersteun ontwikkeling", "Premium ondersteuning", "Aangepast bedrag"],
    thankYou: "Bedankt voor uw steun! 💜",
    thankYouMessage: "💜",
    poweredBy: "Aangedreven door PayPal",
    enterAmount: "Voer bedrag in",
    donateButton: "Doneren"
  },
  pl: {
    title: "Wesprzyj PetrovskiStudio",
    subtitle: "Tworzenie lepszej przyszłości dla wszystkich.",
    amounts: ["Kup mi kawę", "Wspieraj rozwój", "Wsparcie premium", "Niestandardowa kwota"],
    thankYou: "Dziękujemy za wsparcie! 💜",
    thankYouMessage: "💜",
    poweredBy: "Wspierane przez PayPal",
    enterAmount: "Wprowadź kwotę",
    donateButton: "Wpłać darowiznę"
  },
  sv: {
    title: "Stöd PetrovskiStudio",
    subtitle: "Skapar en bättre framtid för alla.",
    amounts: ["Köp en kaffe åt mig", "Stöd utveckling", "Premium stöd", "Anpassat belopp"],
    thankYou: "Tack för ditt stöd! 💜",
    thankYouMessage: "💜",
    poweredBy: "Drivs av PayPal",
    enterAmount: "Ange belopp",
    donateButton: "Donera"
  },
  ro: {
    title: "Sprijină PetrovskiStudio",
    subtitle: "Creând un viitor mai bun pentru toți.",
    amounts: ["Cumpără-mi o cafea", "Sprijină dezvoltarea", "Sprijin premium", "Sumă personalizată"],
    thankYou: "Mulțumim pentru sprijin! 💜",
    thankYouMessage: "💜",
    poweredBy: "Alimentat de PayPal",
    enterAmount: "Introdu suma",
    donateButton: "Donează"
  },
  my: {
    title: "PetrovskiStudio ကို ထောက်ခံပါ",
    subtitle: "လူတိုင်းအတွက် ပိုမိုကောင်းမွန်သော အနာဂတ်ကို ဖန်တီးနေသည်။",
    amounts: ["ကျွန်ုပ်အတွက် ကော်ဖီတစ်ခွက် ဝယ်ပါ", "ဖွံ့ဖြိုးတိုးတက်မှုကို ထောက်ခံပါ", "ပရီမီယံ ထောက်ခံမှု", "စိတ်ကြိုက် ပမာဏ"],
    thankYou: "သင်၏ထောက်ခံမှုအတွက် ကျေးဇူးတင်ပါသည်! 💜",
    thankYouMessage: "💜",
    poweredBy: "PayPal ဖြင့် မောင်းနှင်သည်",
    enterAmount: "ပမာဏကို ထည့်သွင်းပါ",
    donateButton: "လှူဒါန်းပါ"
  },
  hu: {
    title: "Támogasd a PetrovskiStudio-t",
    subtitle: "Jobb jövőt teremtünk mindenkinek.",
    amounts: ["Vegyél nekem egy kávét", "Támogasd a fejlesztést", "Prémium támogatás", "Egyedi összeg"],
    thankYou: "Köszönjük a támogatást! 💜",
    thankYouMessage: "💜",
    poweredBy: "A PayPal támogatásával",
    enterAmount: "Adja meg az összeget",
    donateButton: "Adományozás"
  },
  cs: {
    title: "Podpořte PetrovskiStudio",
    subtitle: "Vytváření lepší budoucnosti pro všechny.",
    amounts: ["Kupte mi kávu", "Podpořte vývoj", "Prémiová podpora", "Vlastní částka"],
    thankYou: "Děkujeme za vaši podporu! 💜",
    thankYouMessage: "💜",
    poweredBy: "Poháněno PayPal",
    enterAmount: "Zadejte částku",
    donateButton: "Darovat"
  },
  el: {
    title: "Υποστηρίξτε το PetrovskiStudio",
    subtitle: "Δημιουργώντας ένα καλύτερο μέλλον για όλους.",
    amounts: ["Αγοράστε μου έναν καφέ", "Υποστηρίξτε την ανάπτυξη", "Premium υποστήριξη", "Προσαρμοσμένο ποσό"],
    thankYou: "Ευχαριστούμε για την υποστήριξή σας! 💜",
    thankYouMessage: "💜",
    poweredBy: "Με την υποστήριξη PayPal",
    enterAmount: "Εισάγετε ποσό",
    donateButton: "Δωρεά"
  },
  he: {
    title: "תמכו ב-PetrovskiStudio",
    subtitle: "יוצרים עתיד טוב יותר לכולם.",
    amounts: ["קנו לי קפה", "תמכו בפיתוח", "תמיכה פרימיום", "סכום מותאם אישית"],
    thankYou: "תודה על התמיכה שלכם! 💜",
    thankYouMessage: "💜",
    poweredBy: "נתמך על ידי PayPal",
    enterAmount: "הזן סכום",
    donateButton: "תרמו"
  }
};

// Fallback to English for languages not yet translated
const getDonationText = (lang: string) => {
  return donationTexts[lang] || donationTexts.en;
};

export const DonationBlock: FC<DonationBlockProps> = ({ isDark, currentLanguage, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  // Auto-hide after 8 seconds
  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const timer = setTimeout(handleClose, 8000);

    return () => clearTimeout(timer);
  }, [handleClose, isVisible]);

  if (!isVisible) {
    return null;
  }

  const t = getDonationText(currentLanguage);
  
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
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${encodeURIComponent('hoper_Jay@i.ua')}&amount=${finalAmount}&currency_code=USD&item_name=${encodeURIComponent('PetrovskiStudio Development Support')}&no_note=0&cn=${encodeURIComponent('Message for developer (optional)')}&no_shipping=1&return=${encodeURIComponent(window.location.origin)}&cancel_return=${encodeURIComponent(window.location.origin)}`;
    
    // Show thank you message and open PayPal
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
    
    // Open PayPal donation page
    window.open(paypalUrl, '_blank');
  };

  if (showThankYou) {
    return (
      <div className={`relative p-8 rounded-3xl ${themeClasses.background} border ${themeClasses.border} backdrop-blur-sm text-center`}>
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
    );
  }

  return (
    <div className={`relative p-8 rounded-3xl ${themeClasses.background} border ${themeClasses.border} backdrop-blur-sm overflow-hidden`}>
      {/* Close button */}
      <button
        onClick={handleClose}
        className={`absolute top-4 right-4 z-20 p-2 rounded-full ${isDark ? 'bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white' : 'bg-white/70 hover:bg-white/90 text-gray-600 hover:text-gray-900'} transition-all duration-300`}
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
      
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
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mr-3">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className={`text-3xl font-bold bg-gradient-to-r ${isDark ? 'from-pink-400 to-purple-400' : 'from-pink-600 to-purple-600'} bg-clip-text text-transparent`}>
              {t.title}
            </h3>
          </div>
          <p className={`text-xl ${themeClasses.textSecondary} mb-4`}>
            {t.subtitle}
          </p>
        </div>

        {/* Donation amounts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {predefinedAmounts.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedAmount(item.amount);
                if (item.amount > 0) handleDonate(item.amount);
              }}
              className={`group relative p-6 rounded-2xl ${themeClasses.cardBg} border ${
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
            <div className="flex items-center justify-center space-x-4">
              <div className="relative">
                <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted}`}>$</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder={t.enterAmount}
                  className={`pl-8 pr-4 py-3 rounded-xl ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
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
        <div className="text-center">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${isDark ? 'bg-slate-700/50' : 'bg-gray-100/80'} ${themeClasses.textMuted} text-sm`}>
            <Zap className="w-4 h-4" />
            <span>{t.poweredBy}</span>
          </div>
        </div>
      </div>
    </div>
  );
};