import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { ChevronDown, Shield, Eye, Zap, Globe, Heart, Download, ArrowRight } from 'lucide-react';
import { petrovskiStudioTranslations, cryptoForecasterTranslations, Language } from './petrovskiStudioTranslations';
import { LanguageSelector } from './components/LanguageSelector';
import { ThemeToggle } from './components/ThemeToggle';
import { DonationBlock } from './components/DonationBlock';

const DONATION_ENABLED = false;

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showDonation, setShowDonation] = useState(DONATION_ENABLED);

  // Use translations based on selected language
  const t = useMemo(() => petrovskiStudioTranslations[currentLanguage] || petrovskiStudioTranslations.en, [currentLanguage]);
  
  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const themeClasses = useMemo(() => ({
    background: isDarkTheme 
      ? 'bg-[#141414]' 
      : 'bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50',
    text: isDarkTheme ? 'text-white' : 'text-gray-900',
    cardBg: isDarkTheme ? 'bg-slate-800/30' : 'bg-white/70',
    cardBorder: isDarkTheme ? 'border-slate-700/50' : 'border-purple-200/50',
    cardHover: isDarkTheme ? 'hover:bg-slate-800/50 hover:border-purple-500/30' : 'hover:bg-white/90 hover:border-purple-400/60',
    navBg: isDarkTheme ? 'bg-slate-900/80' : 'bg-white/80',
    navBorder: isDarkTheme ? 'border-purple-500/20' : 'border-purple-300/30',
    textSecondary: isDarkTheme ? 'text-gray-300' : 'text-gray-600',
    textMuted: isDarkTheme ? 'text-gray-400' : 'text-gray-500',
    orbColor1: isDarkTheme ? 'bg-purple-500/20' : 'bg-purple-400/30',
    orbColor2: isDarkTheme ? 'bg-cyan-500/20' : 'bg-cyan-400/30',
    orbColor3: isDarkTheme ? 'bg-blue-500/20' : 'bg-blue-400/30',
    gridPattern: isDarkTheme ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.4)',
    particleColor: isDarkTheme ? 'bg-cyan-400' : 'bg-purple-500',
    footerBorder: isDarkTheme ? 'border-purple-500/20' : 'border-purple-300/30'
  }), [isDarkTheme]);

  const cryptoForecasterContent = useMemo(() => {
    const fallback = cryptoForecasterTranslations.en;
    const copy = cryptoForecasterTranslations[currentLanguage] || fallback;
    return {
      ...copy,
      ctaPrimary: copy.visitWebsite,
      ctaSecondary: copy.downloadExtension
    };
  }, [currentLanguage]);

  return (
    <div className={`min-h-screen ${themeClasses.background} ${themeClasses.text} relative overflow-hidden transition-all duration-700`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className={`absolute top-20 left-10 w-72 h-72 ${themeClasses.orbColor1} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute top-40 right-20 w-96 h-96 ${themeClasses.orbColor2} rounded-full blur-3xl animate-pulse delay-1000`}></div>
        <div className={`absolute bottom-20 left-1/3 w-80 h-80 ${themeClasses.orbColor3} rounded-full blur-3xl animate-pulse delay-2000`}></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${themeClasses.gridPattern} 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
        
        {/* Floating Particles */}
        {useMemo(() => {
          const particles = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 3,
            duration: 2 + Math.random() * 2
          }));
          return particles.map((particle) => (
            <div
              key={particle.id}
              className={`absolute w-1 h-1 ${themeClasses.particleColor} rounded-full animate-ping`}
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            ></div>
          ));
        }, [themeClasses.particleColor])}
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full ${themeClasses.navBg} backdrop-blur-xl border-b ${themeClasses.navBorder} z-40 transition-all duration-700`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a
              href="https://open.spotify.com/artist/393Q8JdQXQXqnIW8hhRkiT"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent cursor-pointer truncate"
            >
              PetrovskiStudio
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <ThemeToggle isDark={isDarkTheme} onToggle={useCallback(() => setIsDarkTheme(prev => !prev), [])} />
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
                isDark={isDarkTheme}
              />
              <button 
                onClick={() => scrollToSection('privacy')}
                className={`${isDarkTheme ? 'text-white' : 'text-gray-900'} transition-all duration-300 font-medium relative group text-sm`}
              >
                {t.privacy?.title || 'Privacy Policy'}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle isDark={isDarkTheme} onToggle={useCallback(() => setIsDarkTheme(prev => !prev), [])} />
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
                isDark={isDarkTheme}
              />
              <button 
                onClick={() => scrollToSection('privacy')}
                className={`p-2 rounded-lg ${isDarkTheme ? 'bg-slate-800/50 hover:bg-slate-700/50' : 'bg-white/70 hover:bg-white/90'} transition-colors ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}
                title={t.privacy?.title || 'Privacy Policy'}
              >
                <Shield className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 relative z-10`}>
        <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-4 sm:mb-6">
            <span className={`inline-block px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full border ${isDarkTheme ? 'border-cyan-500/30 bg-cyan-500/10' : 'border-cyan-600/30 bg-cyan-600/10'} ${themeClasses.text} text-xs sm:text-sm font-medium mb-4 sm:mb-6`}>
              {t.hero.badge}
            </span>
          </div>

          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold ${themeClasses.text} mb-4 sm:mb-6 leading-tight px-4`}>
            {t.hero.title}{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>{' '}
            {t.hero.subtitle}
          </h1>

          <p className={`text-base sm:text-xl md:text-2xl ${themeClasses.textSecondary} mb-6 sm:mb-8 max-w-5xl mx-auto leading-relaxed px-4`}>
            {t.hero.description}
          </p>

          {t.hero.quote && (
            <div className={`max-w-5xl mx-auto mb-6 sm:mb-8 px-4`}>
              <p className={`text-base sm:text-xl md:text-2xl ${themeClasses.textSecondary} leading-relaxed mb-4`}>
                {t.hero.quote}
              </p>
              <p className="text-base sm:text-lg md:text-xl font-medium italic text-right bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                — {t.hero.quoteAuthor}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-4 px-4">
            <a
              href="mailto:petrovskilabsinfo@gmail.com"
              className="group relative px-10 py-5 bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 rounded-xl font-semibold text-lg text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-300/25 overflow-hidden inline-flex items-center"
            >
              <span className="relative z-10 flex items-center justify-center">
                {t.hero.startProject}
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

          </div>
          <button
            type="button"
            onClick={useCallback(() => scrollToSection('projects'), [scrollToSection])}
            className={`mt-4 mx-auto flex items-center gap-2 text-sm md:text-base ${themeClasses.textSecondary} ${isDarkTheme ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors duration-200`}
          >
            <span>{t.hero.viewWork || 'Learn More'}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative z-10`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${themeClasses.text} mb-3 sm:mb-4 md:mb-6 px-4`}>
              {t.projects.title}
            </h2>
            <p className={`text-base sm:text-lg md:text-xl ${themeClasses.textSecondary} max-w-4xl mx-auto leading-relaxed mb-4 sm:mb-6 md:mb-8 px-4`}>
              {t.projects.subtitle}
            </p>
          </div>

          {/* MusicAdapt Project */}
          <div className={`relative p-6 sm:p-8 lg:p-10 rounded-3xl ${themeClasses.cardBg} border ${themeClasses.cardBorder} backdrop-blur-sm mb-6 mx-auto max-w-5xl`}>
            <div className={`absolute inset-0 rounded-3xl ${isDarkTheme ? 'bg-gradient-to-br from-indigo-500/5 to-purple-500/5' : 'bg-gradient-to-br from-indigo-100/50 to-purple-100/50'}`}></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-2">
                    {t.projects.musicAdapt.title}
                  </h3>
                  <p className={`text-lg sm:text-xl ${themeClasses.textSecondary} mb-3`}>
                    {t.projects.musicAdapt.subtitle}
                  </p>
                  <p className={`${themeClasses.textSecondary} leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base`}>
                    {t.projects.musicAdapt.description}
                  </p>
                  <div className="mb-4 sm:mb-5">
                    <h4 className={`text-base sm:text-lg font-semibold ${themeClasses.text} mb-2 sm:mb-3`}>{t.projects.technologies}</h4>
                    <div className="flex flex-wrap gap-2">
                      {t.projects.musicAdapt.techList.map((tech, index) => (
                        <span key={index} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium ${isDarkTheme ? 'bg-slate-700/50 text-indigo-300' : 'bg-indigo-50 text-indigo-700'} border ${isDarkTheme ? 'border-indigo-500/30' : 'border-indigo-200'}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-4 lg:min-w-[200px]">
                  <a
                    href="https://www.musicadapt.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-semibold text-white text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
                  >
                    {t.projects.musicAdapt.visitWebsite}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                  <a
                    href="https://chromewebstore.google.com/detail/musicadapt/pmfkpccokjienngicnfdcpodmnfbided"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg font-semibold text-white text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-400/25"
                  >
                    {t.projects.musicAdapt.downloadExtension}
                    <Download className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ColorAdapt Project */}
          <div className={`relative p-6 sm:p-8 lg:p-10 rounded-3xl ${themeClasses.cardBg} border ${themeClasses.cardBorder} backdrop-blur-sm mb-6 mx-auto max-w-5xl`}>
            <div className={`absolute inset-0 rounded-3xl ${isDarkTheme ? 'bg-gradient-to-br from-cyan-500/5 to-blue-500/5' : 'bg-gradient-to-br from-cyan-100/50 to-blue-100/50'}`}></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent mb-2">
                    {t.projects.colorAdapt.title}
                  </h3>
                  <p className={`text-lg sm:text-xl ${themeClasses.textSecondary} mb-3`}>
                    {t.projects.colorAdapt.subtitle}
                  </p>
                  <p className={`${themeClasses.textSecondary} leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base`}>
                    {t.projects.colorAdapt.description}
                  </p>
                  <div className="mb-4 sm:mb-5">
                    <h4 className={`text-base sm:text-lg font-semibold ${themeClasses.text} mb-2 sm:mb-3`}>{t.projects.technologies}</h4>
                    <div className="flex flex-wrap gap-2">
                      {t.projects.colorAdapt.techList.map((tech, index) => (
                        <span key={index} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium ${isDarkTheme ? 'bg-slate-700/50 text-cyan-300' : 'bg-cyan-50 text-cyan-700'} border ${isDarkTheme ? 'border-cyan-500/30' : 'border-cyan-200'}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-4 lg:min-w-[200px]">
                  <a
                    href="https://coloradapt.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg font-semibold text-white text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                  >
                    {t.projects.colorAdapt.visitWebsite}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                  <a
                    href="https://chromewebstore.google.com/detail/coloradapt/mdhhbgaeadiphmhbjkfmjcfahcahcbkg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg font-semibold text-white text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25"
                  >
                    {t.projects.colorAdapt.downloadExtension}
                    <Download className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CryptoForecaster Project */}
          <div className={`relative p-6 sm:p-8 lg:p-10 rounded-3xl ${themeClasses.cardBg} border ${themeClasses.cardBorder} backdrop-blur-sm mb-6 mx-auto max-w-5xl`}>
            <div className={`absolute inset-0 rounded-3xl ${isDarkTheme ? 'bg-gradient-to-br from-amber-500/5 to-orange-500/5' : 'bg-gradient-to-br from-amber-100/50 to-orange-100/50'}`}></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent mb-2">
                    {cryptoForecasterContent.title}
                  </h3>
                  <p className={`text-lg sm:text-xl ${themeClasses.textSecondary} mb-3`}>
                    {cryptoForecasterContent.subtitle}
                  </p>
                  <p className={`${themeClasses.textSecondary} leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base`}>
                    {cryptoForecasterContent.description}
                  </p>
                  <div className="mb-4 sm:mb-5">
                    <h4 className={`text-base sm:text-lg font-semibold ${themeClasses.text} mb-2 sm:mb-3`}>{t.projects.technologies}</h4>
                    <div className="flex flex-wrap gap-2">
                      {cryptoForecasterContent.techList.map((tech, index) => (
                        <span key={index} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium ${isDarkTheme ? 'bg-slate-700/50 text-amber-300' : 'bg-amber-50 text-amber-800'} border ${isDarkTheme ? 'border-amber-500/30' : 'border-amber-200'}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-4 lg:min-w-[200px]">
                  <a
                    href="https://www.petrovskistudio.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg font-semibold text-white text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-400/25"
                  >
                    {cryptoForecasterContent.ctaPrimary}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                  <a
                    href="https://www.petrovskistudio.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg font-semibold text-white text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-400/25"
                  >
                    {cryptoForecasterContent.ctaSecondary}
                    <Download className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* MatrixRain Project */}
          <div className={`relative p-6 sm:p-8 lg:p-10 rounded-3xl ${themeClasses.cardBg} border ${themeClasses.cardBorder} backdrop-blur-sm mb-6 mx-auto max-w-5xl`}>
            <div className={`absolute inset-0 rounded-3xl ${isDarkTheme ? 'bg-gradient-to-br from-emerald-500/5 to-teal-500/5' : 'bg-gradient-to-br from-emerald-100/50 to-teal-100/50'}`}></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent mb-2">
                    {t.projects.matrixRain.title}
                  </h3>
                  <p className={`text-lg sm:text-xl ${themeClasses.textSecondary} mb-3`}>
                    {t.projects.matrixRain.subtitle}
                  </p>
                  <p className={`${themeClasses.textSecondary} leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base`}>
                    {t.projects.matrixRain.description}
                  </p>
                  <div className="mb-4 sm:mb-5">
                    <h4 className={`text-base sm:text-lg font-semibold ${themeClasses.text} mb-2 sm:mb-3`}>{t.projects.technologies}</h4>
                    <div className="flex flex-wrap gap-2">
                      {t.projects.matrixRain.techList.map((tech, index) => (
                        <span key={index} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium ${isDarkTheme ? 'bg-slate-700/50 text-emerald-300' : 'bg-emerald-50 text-emerald-700'} border ${isDarkTheme ? 'border-emerald-500/30' : 'border-emerald-200'}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-4 lg:min-w-[200px]">
                  <a
                    href="https://petrovskistudio.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg font-semibold text-white text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
                  >
                    {t.projects.matrixRain.visitWebsite}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                  <a
                    href="https://chromewebstore.google.com/detail/matrixrain/eonkedgpffaaigppalmjhpdhomehgdfb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg font-semibold text-white text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-400/25"
                  >
                    {t.projects.matrixRain.downloadExtension}
                    <Download className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* GrayTrigger Project */}
          <div className={`relative p-6 sm:p-8 lg:p-10 rounded-3xl ${themeClasses.cardBg} border ${themeClasses.cardBorder} backdrop-blur-sm mb-6 mx-auto max-w-5xl`}>
            <div className={`absolute inset-0 rounded-3xl ${isDarkTheme ? 'bg-gradient-to-br from-gray-500/5 to-slate-500/5' : 'bg-gradient-to-br from-gray-100/50 to-slate-100/50'}`}></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent mb-2">
                    {t.projects.grayTrigger.title}
                  </h3>
                  <p className={`text-lg sm:text-xl ${themeClasses.textSecondary} mb-3`}>
                    {t.projects.grayTrigger.subtitle}
                  </p>
                  <p className={`${themeClasses.textSecondary} leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base`}>
                    {t.projects.grayTrigger.description}
                  </p>
                  <div className="mb-4 sm:mb-5">
                    <h4 className={`text-base sm:text-lg font-semibold ${themeClasses.text} mb-2 sm:mb-3`}>{t.projects.technologies}</h4>
                    <div className="flex flex-wrap gap-2">
                      {t.projects.grayTrigger.techList.map((tech, index) => (
                        <span key={index} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium ${isDarkTheme ? 'bg-slate-700/50 text-gray-300' : 'bg-gray-50 text-gray-700'} border ${isDarkTheme ? 'border-gray-500/30' : 'border-gray-200'}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-4 lg:min-w-[200px]">
                  <a
                    href="https://graytrigger.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg font-semibold text-white text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/25"
                  >
                    {t.projects.grayTrigger.visitWebsite}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                  <a
                    href="https://chromewebstore.google.com/detail/graytrigger/jgmjkhadhfclpekcojcihnkaoooepgeb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-gray-400 to-slate-500 rounded-lg font-semibold text-white text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-400/25"
                  >
                    {t.projects.grayTrigger.downloadExtension}
                    <Download className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Policy Section */}
          <section id="privacy" className={`py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative z-10`}>
            <div className="max-w-5xl mx-auto">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 px-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                {t.privacy?.title || 'Privacy Policy'}
              </h2>
              
              <div className={`w-full relative p-6 sm:p-8 md:p-10 rounded-3xl ${themeClasses.cardBg} border ${isDarkTheme ? 'border-cyan-500/20' : 'border-cyan-300/30'} backdrop-blur-sm max-w-5xl mx-auto`}>
                <div className={`absolute inset-0 rounded-3xl ${isDarkTheme ? 'bg-gradient-to-br from-cyan-500/5 to-blue-500/5' : 'bg-gradient-to-br from-cyan-100/50 to-blue-100/50'}`}></div>
                <div className="relative z-10 space-y-8">
                  {[
                    { icon: Shield, title: t.privacy?.points?.[0]?.title || "No Personal Data Collected", desc: t.privacy?.points?.[0]?.desc || "We do not collect, store, or transmit any personal information.", color: isDarkTheme ? 'text-cyan-400' : 'text-cyan-600' },
                    { icon: Globe, title: t.privacy?.points?.[1]?.title || "Local‑First Design", desc: t.privacy?.points?.[1]?.desc || "All preferences and settings remain on your device. Our apps, extensions, and software run entirely in your browser or locally on your system.", color: isDarkTheme ? 'text-blue-400' : 'text-blue-600' },
                    { icon: Zap, title: t.privacy?.points?.[2]?.title || "Permissions & Processing", desc: t.privacy?.points?.[2]?.desc || "Only the minimal permissions required to enable features are requested. In some cases, temporary processing may occur, but all data stays under your control.", color: isDarkTheme ? 'text-cyan-400' : 'text-cyan-600' },
                    { icon: Heart, title: t.privacy?.points?.[3]?.title || "No Sharing", desc: t.privacy?.points?.[3]?.desc || "We do not sell, share, or transfer any data to third parties.", color: isDarkTheme ? 'text-green-400' : 'text-green-600' },
                    { icon: Eye, title: t.privacy?.points?.[4]?.title || "Full Control", desc: t.privacy?.points?.[4]?.desc || "You remain in control at all times. Removing apps, extensions, software, or clearing storage deletes all related data.", color: isDarkTheme ? 'text-yellow-400' : 'text-yellow-600' }
                  ].map((item, index) => (
                    <div key={index} className={`group flex items-start space-x-6 p-6 rounded-2xl ${isDarkTheme ? 'hover:bg-slate-700/30' : 'hover:bg-cyan-50/50'} transition-all duration-300`}>
                      <div className={`w-12 h-12 rounded-xl ${isDarkTheme ? 'bg-slate-700/50' : 'bg-white/80'} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <div>
                        <h3 className={`font-bold text-xl ${themeClasses.text} mb-3 ${isDarkTheme ? 'group-hover:text-cyan-300' : 'group-hover:text-cyan-600'} transition-colors duration-300`}>
                          {item.title}
                        </h3>
                        <p className={`${themeClasses.textSecondary} leading-relaxed ${isDarkTheme ? 'group-hover:text-gray-200' : 'group-hover:text-gray-700'} transition-colors duration-300`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Donation Section */}
      {showDonation && (
        <section className={`py-10 sm:py-16 md:py-20 px-4 sm:px-6 relative z-10`}>
          <div className="max-w-4xl mx-auto">
            <DonationBlock
              isDark={isDarkTheme}
              currentLanguage={currentLanguage}
              onClose={() => setShowDonation(false)}
            />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className={`py-8 px-6 border-t ${themeClasses.footerBorder} relative z-10`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              {t.footer.copyright}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;