import React from 'react';
import {
  Eye,
  Droplet,
  Moon,
  Activity,
  Monitor,
  Heart,
  Film,
  Cpu,
  PanelsTopLeft,
  Contrast,
  ShieldCheck,
  Globe,
  Brain,
  Zap,
  SlidersHorizontal,
  Sparkles,
  type LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Eye,
  Droplet,
  Moon,
  Activity,
  Monitor,
  Heart,
  Film,
  Cpu,
  PanelsTopLeft,
  Contrast,
  ShieldCheck,
  Globe,
  Brain,
  Zap,
  SlidersHorizontal
};

const accentPalette = {
  violet: {
    iconBg: 'from-[#a58bff] to-[#7251ff]',
    glow: 'shadow-[0_18px_55px_rgba(128,97,255,0.35)]'
  },
  cyan: {
    iconBg: 'from-[#6de3ff] to-[#2cc3eb]',
    glow: 'shadow-[0_18px_55px_rgba(74,198,235,0.35)]'
  },
  emerald: {
    iconBg: 'from-[#79f2c2] to-[#2ecf87]',
    glow: 'shadow-[0_18px_55px_rgba(55,195,141,0.35)]'
  },
  amber: {
    iconBg: 'from-[#ffc04d] to-[#ff8e3c]',
    glow: 'shadow-[0_18px_55px_rgba(255,160,76,0.35)]'
  },
  blue: {
    iconBg: 'from-[#8ac4ff] to-[#4a7dff]',
    glow: 'shadow-[0_18px_55px_rgba(80,126,255,0.35)]'
  },
  pink: {
    iconBg: 'from-[#ff8ad6] to-[#ff4fb8]',
    glow: 'shadow-[0_18px_55px_rgba(255,111,194,0.35)]'
  },
  rose: {
    iconBg: 'from-[#ff9aa2] to-[#ff5f78]',
    glow: 'shadow-[0_18px_55px_rgba(255,111,136,0.35)]'
  },
  indigo: {
    iconBg: 'from-[#a59dff] to-[#6f6bff]',
    glow: 'shadow-[0_18px_55px_rgba(115,108,255,0.35)]'
  },
  teal: {
    iconBg: 'from-[#67f0ff] to-[#2dd5c3]',
    glow: 'shadow-[0_18px_55px_rgba(57,216,203,0.35)]'
  }
};

type AccentKey = keyof typeof accentPalette;

interface FeatureCard {
  icon?: keyof typeof iconMap | string;
  title: string;
  description: string;
  accent?: AccentKey | string;
}

interface FeatureCardGridProps {
  cards?: FeatureCard[];
  isDark: boolean;
  variant?: 'colorAdapt' | 'grayTrigger';
}

const variantConfig: Record<NonNullable<FeatureCardGridProps['variant']>, {
  gradient: string;
  border: string;
  overlay: string;
  lightGradient: string;
  lightBorder: string;
  lightOverlay: string;
}> = {
  colorAdapt: {
    gradient: 'from-[#141b31] via-[#0c1122] to-[#070a18]',
    border: 'border-[#4f64f4]/30',
    overlay: 'bg-[radial-gradient(circle_at_top,_rgba(88,113,255,0.22),_transparent_65%)]',
    lightGradient: 'from-white via-[#eef1ff] to-white',
    lightBorder: 'border-[#cfd7ff]/80',
    lightOverlay: 'bg-[radial-gradient(circle_at_top,_rgba(103,80,235,0.18),_transparent_65%)]'
  },
  grayTrigger: {
    gradient: 'from-[#1a1a26] via-[#0f111b] to-[#07070e]',
    border: 'border-[#646b86]/30',
    overlay: 'bg-[radial-gradient(circle_at_top,_rgba(138,146,173,0.2),_transparent_60%)]',
    lightGradient: 'from-white via-[#f5f6fb] to-white',
    lightBorder: 'border-[#d5dae9]',
    lightOverlay: 'bg-[radial-gradient(circle_at_top,_rgba(156,163,175,0.18),_transparent_60%)]'
  }
};

export const FeatureCardGrid: React.FC<FeatureCardGridProps> = ({ cards, isDark, variant = 'colorAdapt' }) => {
  if (!cards || cards.length === 0) return null;

  const fallbackIcon = Sparkles;
  const variantStyles = variantConfig[variant];
  const containerBorder = isDark ? variantStyles.border : variantStyles.lightBorder;
  const containerGradient = isDark ? variantStyles.gradient : variantStyles.lightGradient;
  const containerOverlay = isDark ? variantStyles.overlay : variantStyles.lightOverlay;
  const innerOverlay = isDark
    ? 'bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.04),_transparent_70%)]'
    : 'bg-[radial-gradient(circle_at_bottom,_rgba(124,106,255,0.08),_transparent_70%)]';
  const cardSurface = isDark
    ? 'border-white/5 bg-white/5 shadow-[0_20px_60px_rgba(5,6,17,0.4)]'
    : 'border-purple-100/70 bg-white/95 shadow-[0_25px_70px_rgba(136,107,246,0.25)]';
  const cardTitle = isDark ? 'text-white' : 'text-slate-900';

  return (
    <div className="relative">
      <div
        className={`relative overflow-hidden rounded-[30px] border ${containerBorder} bg-gradient-to-br ${containerGradient} p-5 md:p-6`}>
        <div className={`pointer-events-none absolute inset-0 rounded-[30px] ${containerOverlay}`} />
        <div className={`pointer-events-none absolute inset-0 rounded-[30px] ${innerOverlay}`} />
        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = (card.icon && iconMap[card.icon]) || fallbackIcon;
            const accentKey = (card.accent as AccentKey) || 'violet';
            const accent = accentPalette[accentKey] ?? accentPalette.violet;

            return (
              <div
                key={`${card.title}-${index}`}
                className={`relative rounded-[26px] border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${cardSurface} ${isDark ? 'hover:border-white/30' : 'hover:border-purple-200'} ${accent.glow}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 aspect-square flex-shrink-0 rounded-[18px] bg-gradient-to-br ${accent.iconBg} flex items-center justify-center text-white shadow-inner shadow-black/10`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className={`text-lg font-semibold mb-1 ${cardTitle}`}>{card.title}</h5>
                    <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeatureCardGrid;
