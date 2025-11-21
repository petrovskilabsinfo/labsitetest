export const petrovskiStudioTranslations = {
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
      startProject: "Start Your Project",
      language: "EN"
    },
    hero: {
      badge: "Innovative Development Studio",
      title: "Building the",
      titleHighlight: "Future",
      subtitle: "of Digital Products",
      description: "We transform innovative ideas into powerful startups and cutting-edge software solutions. From MVP to market leader, we're your technology partner.",
      startProject: "Start Your Project",
      viewWork: "View Our Work"
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Explore our portfolio of successful projects that demonstrate our expertise in creating cutting-edge digital solutions.",
      colorAdapt: {
        title: "ColorAdapt",
        subtitle: "bring color back to your life",
        description: "Professional-grade visual filters browser extension that delivers cinematic HDR, OLED colors, and accessibility features for your favorite websites. Created by globally recognized artist Yuri Petrovski with privacy-first design and no data collection.",
        technologies: "Technologies:",
        techList: ["Browser Extension", "HDR Technology", "Color Science", "WCAG Compliance", "Privacy-First Design"],
        visitWebsite: "Visit Website",
        downloadExtension: "Download Extension"
      },
      musicAdapt: {
        title: "MusicAdapt",
        subtitle: "bring perfect sound everywhere",
        description: "MusicAdapt is an innovative platform for automatic mastering and sound adaptation across devices, genres, and audiences. We combine professional-grade DSP algorithms with an intuitive interface, making premium sound accessible to every musician, producer, or brand.",
        technologies: "Technologies:",
        techList: ["Web Audio API", "React", "Node.js", "DSP Algorithms", "Cloud Processing"],
        visitWebsite: "Visit Website",
        downloadExtension: "Download Extension"
      },
      matrixRain: {
        title: "MatrixRain",
        subtitle: "fullscreen digital rain for your browser",
        description: "MatrixRain — a fullscreen digital rain effect inspired by The Matrix. Bring a stylish cinematic atmosphere to your browser: select from 237 languages and one of 15 preset colors, then enjoy the immersive visuals.",
        technologies: "Technologies:",
        techList: ["HTML5 Canvas", "TypeScript", "React", "WebGL", "Real-time Rendering"],
        visitWebsite: "Visit Website",
        downloadExtension: "Download Extension"
      },
      grayTrigger: {
        title: "GrayTrigger",
        subtitle: "less screen, more hugs",
        description: "Revolutionary productivity tool that automatically switches your screen to grayscale mode when you open social media sites like TikTok, Instagram, YouTube, Snapchat, X/Twitter, and Facebook. Helps reduce social media addiction through gentle visual cues — without blocking, without forcing.",
        technologies: "Technologies:",
        techList: ["Desktop App", "Browser Extension", "System Integration", "Cross-Platform", "Digital Wellness"],
        visitWebsite: "Visit Website",
        downloadExtension: "Download Extension"
      }
    },
    footer: {
      copyright: "© 2026 PetrovskiStudio – Founded by Yuri Petrovski"
    }
  }
};

export type Language = keyof typeof petrovskiStudioTranslations;
export type TranslationKey = keyof typeof petrovskiStudioTranslations.en;

