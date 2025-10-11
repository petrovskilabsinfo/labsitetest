import React, { useEffect, useState } from 'react';
import { ChevronDown, Shield, Eye, Palette, Zap, Globe, Heart, Download, Play, ArrowRight, Monitor, Mail, MapPin, Rocket, Code, Lightbulb, Users, TrendingUp, Award } from 'lucide-react';
import { translations, Language } from './translations';
import { LanguageSelector } from './components/LanguageSelector';
import { ThemeToggle } from './components/ThemeToggle';
import { DonationBlock } from './components/DonationBlock';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const t = translations[currentLanguage];

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
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">
              PetrovskiLabs
            </div>
            <div className="flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('about')}
                className={`${themeClasses.textSecondary} hover:text-cyan-400 transition-all duration-300 font-medium relative group`}
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className={`${themeClasses.textSecondary} hover:text-cyan-400 transition-all duration-300 font-medium relative group`}
              >
                Projects
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`${themeClasses.textSecondary} hover:text-cyan-400 transition-all duration-300 font-medium relative group`}
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
              </button>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
                  <Globe className="w-4 h-4" />
                  <span>EN</span>
                </button>
                <ThemeToggle isDark={isDarkTheme} onToggle={() => setIsDarkTheme(!isDarkTheme)} />
              </div>
              <a href="mailto:petrovskilabsinfo@gmail.com" className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25">
                Start Your Project
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`min-h-screen flex items-center justify-center px-6 pt-20 relative z-10`}>
        <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <span className={`inline-block px-6 py-2 rounded-full border ${isDarkTheme ? 'border-cyan-500/30 bg-cyan-500/10' : 'border-cyan-600/30 bg-cyan-600/10'} ${themeClasses.text} text-sm font-medium mb-8`}>
              Innovative Development Studio
            </span>
          </div>

          <h1 className={`text-6xl md:text-8xl font-bold ${themeClasses.text} mb-8 leading-tight`}>
            Building the{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent">
              Future
            </span>{' '}
            of Digital Products
          </h1>

          <p className={`text-xl md:text-2xl ${themeClasses.textSecondary} mb-12 max-w-5xl mx-auto leading-relaxed`}>
            We transform innovative ideas into powerful startups and cutting-edge software solutions. From MVP to market leader, we're your technology partner.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <a
              href="mailto:petrovskilabsinfo@gmail.com"
              className="group relative px-10 py-5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl font-semibold text-lg text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/25 overflow-hidden inline-flex items-center"
            >
              <span className="relative z-10 flex items-center justify-center">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <button
              onClick={() => scrollToSection('projects')}
              className={`group px-10 py-5 rounded-xl font-semibold text-lg ${themeClasses.text} border ${isDarkTheme ? 'border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10' : 'border-cyan-600/30 hover:border-cyan-600/60 hover:bg-cyan-600/10'} transition-all duration-300 transform hover:scale-105 inline-flex items-center`}
            >
              View Our Work
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-32 px-6 relative z-10`}>
        <div className="max-w-7xl mx-auto">
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-32 px-6 relative z-10`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-5xl md:text-6xl font-bold ${themeClasses.text} mb-8`}>
              Featured Projects
            </h2>
            <p className={`text-xl ${themeClasses.textSecondary} max-w-4xl mx-auto leading-relaxed`}>
              Explore our portfolio of successful projects that demonstrate our expertise in creating cutting-edge digital solutions.
            </p>
          </div>

          {/* ColorAdapt Project */}
          <div className={`relative p-8 md:p-12 rounded-3xl ${themeClasses.cardBg} border ${themeClasses.cardBorder} backdrop-blur-sm mb-12`}>
            <div className={`absolute inset-0 rounded-3xl ${isDarkTheme ? 'bg-gradient-to-br from-cyan-500/5 to-blue-500/5' : 'bg-gradient-to-br from-cyan-100/50 to-blue-100/50'}`}></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-start">
              {/* Left side - Video */}
              <div className="space-y-6">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/20 shadow-2xl">
                  <iframe
                    src="https://www.youtube.com/embed/G-gXeljiVw0?rel=0&modestbranding=1&showinfo=0"
                    title="ColorAdapt - Bring color back to your life"
                    className="absolute inset-0 w-full h-full rounded-2xl"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Right side - Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent mb-3">
                    ColorAdapt
                  </h3>
                  <p className={`text-xl ${themeClasses.textSecondary} mb-6`}>
                    bring color back to your life
                  </p>
                  <p className={`${themeClasses.textSecondary} leading-relaxed mb-6`}>
                    Professional-grade visual filters browser extension that delivers cinematic HDR, OLED colors, and accessibility features for your favorite websites. Created by globally recognized artist Yuri Petrovski with privacy-first design and no data collection.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className={`text-lg font-semibold ${themeClasses.text}`}>Key Features:</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>HDR & DVision+</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>HDR‑Lite & DVision</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>OLED Colors</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Tone Balance</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Immersive Modes</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Accessibility</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Petrovski's Movie Stock</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Technical LUTs</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>PiW & PiP Modes</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className={`text-lg font-semibold ${themeClasses.text}`}>Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Browser Extension', 'HDR Technology', 'Color Science', 'WCAG Compliance'].map((tech, index) => (
                      <span key={index} className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkTheme ? 'bg-slate-700/50 text-cyan-300' : 'bg-cyan-50 text-cyan-700'} border ${isDarkTheme ? 'border-cyan-500/30' : 'border-cyan-200'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className={`text-lg font-semibold ${themeClasses.text}`}>Impact & Results:</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Enhanced Visual Experience</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Accessibility Support</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Privacy Protection</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Cross-Browser Compatibility</p>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/20 shadow-2xl mt-6">
                  <iframe
                    src="https://www.youtube.com/embed/G-gXeljiVw0?rel=0&modestbranding=1&showinfo=0"
                    title="ColorAdapt - Bring color back to your life"
                    className="absolute inset-0 w-full h-full rounded-2xl"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href="https://chromewebstore.google.com/detail/coloradapt/mdhhbgaeadiphmhbjkfmjcfahcahcbkg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                  >
                    Visit Website
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                  <button className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold ${themeClasses.text} border ${isDarkTheme ? 'border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10' : 'border-cyan-600/30 hover:border-cyan-600/60 hover:bg-cyan-600/10'} transition-all duration-300`}>
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* GrayTrigger Project */}
          <div className={`relative p-8 md:p-12 rounded-3xl ${themeClasses.cardBg} border ${themeClasses.cardBorder} backdrop-blur-sm mb-12`}>
            <div className={`absolute inset-0 rounded-3xl ${isDarkTheme ? 'bg-gradient-to-br from-gray-500/5 to-slate-500/5' : 'bg-gradient-to-br from-gray-100/50 to-slate-100/50'}`}></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-start">
              {/* Left side - Video */}
              <div className="space-y-6">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/20 shadow-2xl">
                  <iframe
                    src="https://www.youtube.com/embed/HS1VI42IFEM?rel=0&modestbranding=1&showinfo=0"
                    title="GrayTrigger - less screen, more hugs"
                    className="absolute inset-0 w-full h-full rounded-2xl"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Right side - Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent mb-3">
                    GrayTrigger
                  </h3>
                  <p className={`text-xl ${themeClasses.textSecondary} mb-6`}>
                    less screen, more hugs
                  </p>
                  <p className={`${themeClasses.textSecondary} leading-relaxed mb-6`}>
                    Revolutionary productivity tool that automatically switches your screen to grayscale mode when you open social media sites like TikTok, Instagram, YouTube, Snapchat, X/Twitter, and Facebook. Helps reduce social media addiction through gentle visual cues — without blocking, without forcing.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className={`text-lg font-semibold ${themeClasses.text}`}>Key Features:</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Automatic grayscale triggering for social media sites</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>No blocking or forced restrictions</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Cross-platform compatibility</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Gentle approach to digital wellness</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Real-time screen mode switching</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Customizable site targeting</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className={`text-lg font-semibold ${themeClasses.text}`}>Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Desktop App', 'Browser Extension', 'System Integration', 'Cross-Platform'].map((tech, index) => (
                      <span key={index} className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkTheme ? 'bg-slate-700/50 text-gray-300' : 'bg-gray-50 text-gray-700'} border ${isDarkTheme ? 'border-gray-500/30' : 'border-gray-200'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className={`text-lg font-semibold ${themeClasses.text}`}>Impact & Results:</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Reduces Screen Time</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Improves Focus</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Digital Wellness</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>No Blocking Required</p>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/20 shadow-2xl mt-6">
                  <iframe
                    src="https://www.youtube.com/embed/HS1VI42IFEM?rel=0&modestbranding=1&showinfo=0"
                    title="GrayTrigger - Help you and your kids stay focused"
                    className="absolute inset-0 w-full h-full rounded-2xl"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/25"
                  >
                    Visit Website
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                  <button className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold ${themeClasses.text} border ${isDarkTheme ? 'border-gray-500/30 hover:border-gray-500/60 hover:bg-gray-500/10' : 'border-gray-600/30 hover:border-gray-600/60 hover:bg-gray-600/10'} transition-all duration-300`}>
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={`py-32 px-6 relative z-10`}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className={`text-5xl md:text-6xl font-bold mb-8 ${themeClasses.text}`}>
            Ready to Start Your Project?
          </h2>
          <p className={`text-xl md:text-2xl ${themeClasses.textSecondary} mb-12 max-w-4xl mx-auto`}>
            Let's discuss how we can help you achieve your goals with innovative technology solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:petrovskilabsinfo@gmail.com" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg font-semibold text-white text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25">
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <button className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold text-lg ${themeClasses.text} border ${isDarkTheme ? 'border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10' : 'border-cyan-600/30 hover:border-cyan-600/60 hover:bg-cyan-600/10'} transition-all duration-300`}>
              View Case Studies
            </button>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <DonationBlock isDark={isDarkTheme} currentLanguage={currentLanguage} />

      {/* Let's Build Together Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${themeClasses.text}`}>
              Let's Build Together
            </h2>
            <p className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
              Ready to transform your ideas into reality? Get in touch and let's discuss how we can help you achieve your goals.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { value: '50+', label: 'Projects Delivered', icon: Rocket },
              { value: '15+', label: 'Startups Launched', icon: TrendingUp },
              { value: '98%', label: 'Client Satisfaction', icon: Award }
            ].map((stat, index) => (
              <div key={index} className={`p-8 rounded-2xl ${isDarkTheme ? 'bg-slate-900/50 border border-slate-800' : 'bg-white border border-gray-200'} backdrop-blur-sm text-center transform transition-all duration-300 hover:scale-105`}>
                <stat.icon className={`w-12 h-12 mx-auto mb-4 ${isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'}`} />
                <div className={`text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className={`text-lg ${themeClasses.textSecondary}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* About Section */}
          <div className="mb-20">
            <div className="max-w-4xl mx-auto mb-12">
              <h3 className={`text-3xl font-bold mb-6 text-center ${themeClasses.text}`}>
                About PetrovskiLabs
              </h3>
              <p className={`text-lg ${themeClasses.textSecondary} mb-6 leading-relaxed text-center`}>
                We are a forward-thinking development studio specializing in cutting-edge technology solutions. Our team combines technical expertise with creative innovation to deliver exceptional digital products.
              </p>
              <div className={`p-6 rounded-xl ${isDarkTheme ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-cyan-50 border border-cyan-200'} text-center`}>
                <p className={`text-xl font-semibold ${isDarkTheme ? 'text-cyan-400' : 'text-cyan-700'}`}>
                  Transforming Ideas into Digital Reality
                </p>
              </div>
            </div>

            {/* Expertise Cards */}
            <div className="max-w-4xl mx-auto">
              <h3 className={`text-3xl font-bold mb-8 text-center ${themeClasses.text}`}>
                Our Expertise
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Full-Stack Development', desc: 'End-to-end development from concept to deployment', icon: Code },
                  { title: 'Startup Solutions', desc: 'MVP development and scaling for rapid growth', icon: Rocket },
                  { title: 'R&D Projects', desc: 'Innovative research and experimental technologies', icon: Lightbulb }
                ].map((item, index) => (
                  <div key={index} className={`p-6 rounded-xl ${isDarkTheme ? 'bg-slate-900/50 border border-slate-800' : 'bg-white border border-gray-200'} backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:scale-105`}>
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-xl ${isDarkTheme ? 'bg-cyan-500/20' : 'bg-cyan-100'} flex items-center justify-center mx-auto mb-4`}>
                        <item.icon className={`w-8 h-8 ${isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'}`} />
                      </div>
                      <h4 className={`text-xl font-semibold mb-3 ${themeClasses.text}`}>
                        {item.title}
                      </h4>
                      <p className={themeClasses.textSecondary}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Company Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { value: '5+', label: 'Years Experience' },
              { value: '25+', label: 'Team Members' },
              { value: '12', label: 'Countries Served' },
              { value: '$99M+', label: 'Funding Raised' }
            ].map((stat, index) => (
              <div key={index} className={`p-6 rounded-xl text-center ${isDarkTheme ? 'bg-slate-900/30' : 'bg-gray-50'}`}>
                <div className={`text-3xl font-bold mb-2 ${isDarkTheme ? 'text-cyan-400' : 'text-cyan-600'}`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${themeClasses.textMuted}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-2xl ${isDarkTheme ? 'bg-slate-900/50 border border-slate-800' : 'bg-white border border-gray-200'} backdrop-blur-sm`}>
              <div className="flex items-start">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-4 flex-shrink-0`}>
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className={`text-2xl font-semibold mb-2 ${themeClasses.text}`}>
                    Email
                  </h4>
                  <a href="mailto:petrovskilabsinfo@gmail.com" className={`text-lg ${isDarkTheme ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'} transition-colors`}>
                    petrovskilabsinfo@gmail.com
                  </a>
                  <p className={`text-sm ${themeClasses.textMuted} mt-2`}>
                    Send us an email for detailed discussions
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-2xl ${isDarkTheme ? 'bg-slate-900/50 border border-slate-800' : 'bg-white border border-gray-200'} backdrop-blur-sm`}>
              <div className="flex items-start">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-4 flex-shrink-0`}>
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className={`text-2xl font-semibold mb-2 ${themeClasses.text}`}>
                    Location
                  </h4>
                  <p className={`text-lg ${themeClasses.text} font-medium`}>
                    Remote & Global
                  </p>
                  <p className={`text-sm ${themeClasses.textMuted} mt-2`}>
                    Working with clients worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 px-6 border-t ${themeClasses.footerBorder} relative z-10`}>
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="text-center mb-12">
            <h3 className={`text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent`}>
              PetrovskiLabs
            </h3>
            <p className={`${themeClasses.textSecondary} max-w-3xl mx-auto text-lg leading-relaxed`}>
              Transforming innovative ideas into successful digital products. We're your trusted partner for startup development, custom software solutions, and cutting-edge R&D projects.
            </p>
          </div>

          {/* Bottom Section */}
          <div className={`border-t ${isDarkTheme ? 'border-slate-700' : 'border-cyan-200'} pt-8`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className={`${isDarkTheme ? 'text-gray-500' : 'text-gray-600'} text-center md:text-left`}>
                © 2025 PetrovskiLabs. All rights reserved.
              </p>

              <div className="flex flex-wrap justify-center md:justify-end gap-6">
                <a href="#" className={`${isDarkTheme ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'} transition-colors`}>
                  Privacy Policy
                </a>
                <a href="#" className={`${isDarkTheme ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'} transition-colors`}>
                  Terms of Service
                </a>
                <a href="#" className={`${isDarkTheme ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'} transition-colors`}>
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;