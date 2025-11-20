import React, { useEffect, useState } from 'react';
import { ChevronDown, Shield, Eye, Palette, Zap, Globe, Heart, Download, Play, ArrowRight, Monitor, Mail, MapPin, Rocket, Code, Lightbulb, Users, TrendingUp, Award } from 'lucide-react';
import { petrovskiLabsTranslations, Language } from './petrovskiLabsTranslations';
import { LanguageSelector } from './components/LanguageSelector';
import { ThemeToggle } from './components/ThemeToggle';
import { DonationBlock } from './components/DonationBlock';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const t = petrovskiLabsTranslations[currentLanguage];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const themeClasses = {
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
    mouseFollower: isDarkTheme ? 'from-purple-500 to-cyan-500' : 'from-purple-600 to-pink-500',
    footerBorder: isDarkTheme ? 'border-purple-500/20' : 'border-purple-300/30'
  };

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
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 ${themeClasses.particleColor} rounded-full animate-ping`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full ${themeClasses.navBg} backdrop-blur-xl border-b ${themeClasses.navBorder} z-40 transition-all duration-700`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent cursor-pointer" onClick={() => scrollToSection('hero')}>
              PetrovskiLabs
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-5">
              {/* Controls */}
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
                isDark={isDarkTheme}
              />
              <ThemeToggle isDark={isDarkTheme} onToggle={() => setIsDarkTheme(!isDarkTheme)} />

              {/* Privacy Policy link */}
              <a
                href="#privacy"
                className={`text-sm font-medium ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors duration-200`}
              >
                Privacy Policy
              </a>
            </div>

            {/* Mobile Navigation Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
                isDark={isDarkTheme}
              />
              <ThemeToggle isDark={isDarkTheme} onToggle={() => setIsDarkTheme(!isDarkTheme)} />
              <button className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`min-h-screen flex items-center justify-center px-6 pt-16 relative z-10`}>
        <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-4 sm:mb-6">
            <span className={`inline-block px-4 py-2 sm:px-6 sm:py-2 rounded-full border ${isDarkTheme ? 'border-cyan-500/30 bg-cyan-500/10' : 'border-cyan-600/30 bg-cyan-600/10'} ${themeClasses.text} text-xs sm:text-sm font-medium mb-4 sm:mb-6`}>
              {t.hero.badge}
            </span>
          </div>

          <h1 className={`text-6xl md:text-8xl font-bold ${themeClasses.text} mb-6 leading-tight`}>
            {t.hero.title}{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>{' '}
            {t.hero.subtitle}
          </h1>

          <p className={`text-xl md:text-2xl ${themeClasses.textSecondary} mb-8 max-w-5xl mx-auto leading-relaxed`}>
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-4">
            <a
              href="mailto:petrovskilabsinfo@gmail.com"
              className="group relative px-10 py-5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl font-semibold text-lg text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/25 overflow-hidden inline-flex items-center"
            >
              <span className="relative z-10 flex items-center justify-center">
                {t.hero.startProject}
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

          </div>
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className={`mt-4 mx-auto flex items-center gap-2 text-sm md:text-base ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors duration-200`}
          >
            <span>Learn More</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-32 px-6 relative z-10`}>
        <div className="max-w-7xl mx-auto">
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-10 px-6 relative z-10`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-5xl md:text-6xl font-bold ${themeClasses.text} mb-6`}>
              {t.projects.title}
            </h2>
            <p className={`text-xl ${themeClasses.textSecondary} max-w-4xl mx-auto leading-relaxed mb-8`}>
              {t.projects.subtitle}
            </p>
          </div>

          {/* ColorAdapt Project */}
          <div className={`relative p-6 md:p-8 rounded-3xl ${themeClasses.cardBg} border ${themeClasses.cardBorder} backdrop-blur-sm mb-6 mx-auto max-w-3xl`}>
            <div className={`absolute inset-0 rounded-3xl ${isDarkTheme ? 'bg-gradient-to-br from-cyan-500/5 to-blue-500/5' : 'bg-gradient-to-br from-cyan-100/50 to-blue-100/50'}`}></div>

            <div className="relative z-10">
              <div className="max-w-4xl">
                <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent mb-2">
                  {t.projects.colorAdapt.title}
                </h3>
                <p className={`text-xl ${themeClasses.textSecondary} mb-4`}>
                  {t.projects.colorAdapt.subtitle}
                </p>
                <p className={`${themeClasses.textSecondary} leading-relaxed mb-6`}>
                  {t.projects.colorAdapt.description}
                </p>

                <div className="mb-5">
                  <h4 className={`text-lg font-semibold ${themeClasses.text} mb-3`}>{t.projects.colorAdapt.technologies}</h4>
                  <div className="flex flex-wrap gap-2">
                    {t.projects.colorAdapt.techList.map((tech, index) => (
                      <span key={index} className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkTheme ? 'bg-slate-700/50 text-cyan-300' : 'bg-cyan-50 text-cyan-700'} border ${isDarkTheme ? 'border-cyan-500/30' : 'border-cyan-200'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <a
                    href="https://coloradapt.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                  >
                    {t.projects.colorAdapt.visitWebsite}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* GrayTrigger Project */}
          <div className={`relative p-6 md:p-8 rounded-3xl ${themeClasses.cardBg} border ${themeClasses.cardBorder} backdrop-blur-sm mb-6 mx-auto max-w-3xl`}>
            <div className={`absolute inset-0 rounded-3xl ${isDarkTheme ? 'bg-gradient-to-br from-gray-500/5 to-slate-500/5' : 'bg-gradient-to-br from-gray-100/50 to-slate-100/50'}`}></div>

            <div className="relative z-10">
              <div className="max-w-4xl">
                <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent mb-2">
                  {t.projects.grayTrigger.title}
                </h3>
                <p className={`text-xl ${themeClasses.textSecondary} mb-4`}>
                  {t.projects.grayTrigger.subtitle}
                </p>
                <p className={`${themeClasses.textSecondary} leading-relaxed mb-6`}>
                  {t.projects.grayTrigger.description}
                </p>

                <div className="mb-5">
                  <h4 className={`text-lg font-semibold ${themeClasses.text} mb-3`}>{t.projects.grayTrigger.technologies}</h4>
                  <div className="flex flex-wrap gap-2">
                    {t.projects.grayTrigger.techList.map((tech, index) => (
                      <span key={index} className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkTheme ? 'bg-slate-700/50 text-gray-300' : 'bg-gray-50 text-gray-700'} border ${isDarkTheme ? 'border-gray-500/30' : 'border-gray-200'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <a
                    href="https://graytrigger.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/25"
                  >
                    {t.projects.grayTrigger.visitWebsite}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* MusicAdapt Project */}
          <div className={`relative p-6 md:p-8 rounded-3xl ${themeClasses.cardBg} border ${themeClasses.cardBorder} backdrop-blur-sm mb-6 mx-auto max-w-3xl`}>
            <div className={`absolute inset-0 rounded-3xl ${isDarkTheme ? 'bg-gradient-to-br from-indigo-500/5 to-purple-500/5' : 'bg-gradient-to-br from-indigo-100/50 to-purple-100/50'}`}></div>

            <div className="relative z-10">
              <div className="max-w-4xl">
                <h3 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  MusicAdapt
                </h3>
                <p className={`text-xl ${themeClasses.textSecondary} mb-4`}>
                  bring perfect sound everywhere
                </p>
                <p className={`${themeClasses.textSecondary} leading-relaxed mb-6`}>
                  MusicAdapt is an innovative platform for automatic mastering and sound adaptation across devices, genres, and audiences. We combine professional-grade DSP algorithms with an intuitive interface, making premium sound accessible to every musician, producer, or brand.
                </p>

                <div className="mb-5">
                  <h4 className={`text-lg font-semibold ${themeClasses.text} mb-3`}>Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkTheme ? 'bg-slate-700/50 text-indigo-300' : 'bg-indigo-50 text-indigo-700'} border ${isDarkTheme ? 'border-indigo-500/30' : 'border-indigo-200'}`}>
                      Web Audio API
                    </span>
                    <span className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkTheme ? 'bg-slate-700/50 text-indigo-300' : 'bg-indigo-50 text-indigo-700'} border ${isDarkTheme ? 'border-indigo-500/30' : 'border-indigo-200'}`}>
                      React
                    </span>
                    <span className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkTheme ? 'bg-slate-700/50 text-indigo-300' : 'bg-indigo-50 text-indigo-700'} border ${isDarkTheme ? 'border-indigo-500/30' : 'border-indigo-200'}`}>
                      Node.js
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <a
                    href="https://www.musicadapt.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
                  >
                    Visit Website
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* MatrixRain Project */}
          <div className={`relative p-6 md:p-8 rounded-3xl ${themeClasses.cardBg} border ${themeClasses.cardBorder} backdrop-blur-sm mx-auto max-w-3xl`}>
            <div className={`absolute inset-0 rounded-3xl ${isDarkTheme ? 'bg-gradient-to-br from-emerald-500/5 to-slate-900/40' : 'bg-gradient-to-br from-emerald-100/50 to-gray-900/10'}`}></div>

            <div className="relative z-10">
              <div className="max-w-4xl">
                <h3 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent mb-2">
                  MatrixRain
                </h3>
                <p className={`text-xl ${themeClasses.textSecondary} mb-4`}>
                  fullscreen digital rain for your browser
                </p>
                <p className={`${themeClasses.textSecondary} leading-relaxed mb-6`}>
                  MatrixRain — a fullscreen digital rain effect inspired by The Matrix. Bring a stylish cinematic atmosphere to your browser: select from 237 languages and one of 15 preset colors, then enjoy the immersive visuals.
                </p>

                <div className="mb-5">
                  <h4 className={`text-lg font-semibold ${themeClasses.text} mb-3`}>Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkTheme ? 'bg-slate-700/50 text-emerald-300' : 'bg-emerald-50 text-emerald-700'} border ${isDarkTheme ? 'border-emerald-500/30' : 'border-emerald-200'}`}>
                      HTML5 Canvas
                    </span>
                    <span className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkTheme ? 'bg-slate-700/50 text-emerald-300' : 'bg-emerald-50 text-emerald-700'} border ${isDarkTheme ? 'border-emerald-500/30' : 'border-emerald-200'}`}>
                      TypeScript
                    </span>
                    <span className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkTheme ? 'bg-slate-700/50 text-emerald-300' : 'bg-emerald-50 text-emerald-700'} border ${isDarkTheme ? 'border-emerald-500/30' : 'border-emerald-200'}`}>
                      React
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <a
                    href="#"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
                  >
                    Coming soon
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Policy Section */}
          <section id="privacy" className={`py-16 px-6 relative z-10 ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
            <div className="max-w-5xl mx-auto">
              <h2 className={`text-5xl font-bold text-center bg-gradient-to-r ${isDarkTheme ? 'from-purple-400 to-cyan-400' : 'from-purple-600 to-cyan-600'} bg-clip-text text-transparent mb-16`}>
                Privacy Policy — Our Extensions
              </h2>
              
              <div className={`relative p-10 rounded-3xl ${themeClasses.cardBg} border ${isDarkTheme ? 'border-purple-500/20' : 'border-purple-300/30'} backdrop-blur-sm`}>
                <div className={`absolute inset-0 rounded-3xl ${isDarkTheme ? 'bg-gradient-to-br from-purple-500/5 to-cyan-500/5' : 'bg-gradient-to-br from-purple-100/50 to-cyan-100/50'}`}></div>
                <div className="relative z-10 space-y-8">
                  <div className={`group flex items-start space-x-6 p-6 rounded-2xl hover:${isDarkTheme ? 'bg-slate-700/30' : 'bg-purple-50/50'} transition-all duration-300`}>
                    <div className={`w-12 h-12 rounded-xl ${isDarkTheme ? 'bg-slate-700/50' : 'bg-white/80'} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Shield className={`w-6 h-6 ${isDarkTheme ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-xl ${themeClasses.text} mb-3 group-hover:${isDarkTheme ? 'text-purple-300' : 'text-purple-600'} transition-colors duration-300`}>
                        No Personal Data Collected
                      </h3>
                      <p className={`${themeClasses.textSecondary} leading-relaxed group-hover:${isDarkTheme ? 'text-gray-200' : 'text-gray-700'} transition-colors duration-300`}>
                        We do not collect, store, or transmit any personal information.
                      </p>
                    </div>
                  </div>

                  <div className={`group flex items-start space-x-6 p-6 rounded-2xl hover:${isDarkTheme ? 'bg-slate-700/30' : 'bg-purple-50/50'} transition-all duration-300`}>
                    <div className={`w-12 h-12 rounded-xl ${isDarkTheme ? 'bg-slate-700/50' : 'bg-white/80'} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Globe className={`w-6 h-6 ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-xl ${themeClasses.text} mb-3 group-hover:${isDarkTheme ? 'text-purple-300' : 'text-purple-600'} transition-colors duration-300`}>
                        Local‑First Design
                      </h3>
                      <p className={`${themeClasses.textSecondary} leading-relaxed group-hover:${isDarkTheme ? 'text-gray-200' : 'text-gray-700'} transition-colors duration-300`}>
                        All preferences and settings remain on your device. Our apps run entirely in your browser or locally on your system.
                      </p>
                    </div>
                  </div>

                  <div className={`group flex items-start space-x-6 p-6 rounded-2xl hover:${isDarkTheme ? 'bg-slate-700/30' : 'bg-purple-50/50'} transition-all duration-300`}>
                    <div className={`w-12 h-12 rounded-xl ${isDarkTheme ? 'bg-slate-700/50' : 'bg-white/80'} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Zap className={`w-6 h-6 ${isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'}`} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-xl ${themeClasses.text} mb-3 group-hover:${isDarkTheme ? 'text-purple-300' : 'text-purple-600'} transition-colors duration-300`}>
                        Permissions & Processing
                      </h3>
                      <p className={`${themeClasses.textSecondary} leading-relaxed group-hover:${isDarkTheme ? 'text-gray-200' : 'text-gray-700'} transition-colors duration-300`}>
                        Only the minimal access required to enable features is requested. In some cases, temporary processing may occur, but all data stays under your control.
                      </p>
                    </div>
                  </div>

                  <div className={`group flex items-start space-x-6 p-6 rounded-2xl hover:${isDarkTheme ? 'bg-slate-700/30' : 'bg-purple-50/50'} transition-all duration-300`}>
                    <div className={`w-12 h-12 rounded-xl ${isDarkTheme ? 'bg-slate-700/50' : 'bg-white/80'} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Heart className={`w-6 h-6 ${isDarkTheme ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-xl ${themeClasses.text} mb-3 group-hover:${isDarkTheme ? 'text-purple-300' : 'text-purple-600'} transition-colors duration-300`}>
                        No Sharing
                      </h3>
                      <p className={`${themeClasses.textSecondary} leading-relaxed group-hover:${isDarkTheme ? 'text-gray-200' : 'text-gray-700'} transition-colors duration-300`}>
                        We do not sell, share, or transfer any data to third parties.
                      </p>
                    </div>
                  </div>

                  <div className={`group flex items-start space-x-6 p-6 rounded-2xl hover:${isDarkTheme ? 'bg-slate-700/30' : 'bg-purple-50/50'} transition-all duration-300`}>
                    <div className={`w-12 h-12 rounded-xl ${isDarkTheme ? 'bg-slate-700/50' : 'bg-white/80'} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Eye className={`w-6 h-6 ${isDarkTheme ? 'text-yellow-400' : 'text-yellow-600'}`} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-xl ${themeClasses.text} mb-3 group-hover:${isDarkTheme ? 'text-purple-300' : 'text-purple-600'} transition-colors duration-300`}>
                        Full Control
                      </h3>
                      <p className={`${themeClasses.textSecondary} leading-relaxed group-hover:${isDarkTheme ? 'text-gray-200' : 'text-gray-700'} transition-colors duration-300`}>
                        You remain in control at all times. Removing the app or clearing storage deletes all related data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Donation Section */}
      <DonationBlock isDark={isDarkTheme} currentLanguage={currentLanguage} />

      {/* Footer */}
      <footer className={`py-8 px-6 border-t ${themeClasses.footerBorder} relative z-10`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              © 2025 PetrovskiLabs – Founded by Yuri Petrovski
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;