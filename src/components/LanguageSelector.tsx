import React, { useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../petrovskiLabsTranslations';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  isDark: boolean;
}

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
  { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'it' as Language, name: 'Italiano', flag: '🇮🇹' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
  { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
  { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦' },
  { code: 'hi' as Language, name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tr' as Language, name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  isDark,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLang = languages.find(lang => lang.code === currentLanguage);

  // Закрытие выпадающего списка при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-xl ${
          isDark
            ? 'bg-slate-800/50 hover:bg-slate-700/50 border-purple-500/30 hover:border-purple-400/60 text-white'
            : 'bg-white/70 hover:bg-white/90 border-purple-300/40 hover:border-purple-400/60 text-gray-900'
        } border transition-all duration-300 backdrop-blur-sm group min-w-[60px]`}
      >
        <Globe className={`w-5 h-5 sm:w-4 sm:h-4 ${isDark ? 'text-purple-400 group-hover:text-purple-300' : 'text-purple-600 group-hover:text-purple-500'} transition-colors duration-300`} />
        <span className="text-lg sm:text-base">{currentLang?.flag}</span>
        <span className="hidden sm:inline text-sm">{currentLang?.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isDark ? 'text-purple-400' : 'text-purple-600'} ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 left-0 sm:left-auto sm:right-0 ${
          isDark
            ? 'bg-slate-800/95 border-purple-500/30 shadow-purple-500/20'
            : 'bg-white/95 border-purple-300/40 shadow-purple-300/20'
        } backdrop-blur-xl border rounded-xl shadow-2xl z-50 w-[calc(100vw-2rem)] sm:w-auto sm:min-w-[220px] max-w-[300px] sm:max-w-none max-h-[70vh] overflow-y-auto animate-in slide-in-from-top-2 duration-300`}>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left ${
                isDark ? 'hover:bg-slate-700/50' : 'hover:bg-purple-50/80'
              } transition-all duration-300 first:rounded-t-xl last:rounded-b-xl group min-h-[48px] ${
                currentLanguage === language.code
                  ? `${isDark ? 'bg-purple-600/20 text-purple-300 border-r-2 border-purple-500' : 'bg-purple-100/80 text-purple-700 border-r-2 border-purple-500'}`
                  : `${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`
              }`}
            >
              <span className="text-xl sm:text-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">{language.flag}</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm sm:text-base flex-1 text-left">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};