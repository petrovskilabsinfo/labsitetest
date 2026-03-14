import React from 'react';
import { Shield, Eye, Zap, Globe, Lightbulb, Heart, type LucideIcon } from 'lucide-react';
import { petrovskiStudioTranslations, type Language } from '../petrovskiStudioTranslations';

interface PrivacyPolicySectionProps {
  isDark: boolean;
  currentLanguage: Language;
}

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Eye,
  Zap,
  Globe,
  Lightbulb,
  Heart
};

interface PolicyHighlight {
  icon?: keyof typeof iconMap | string;
  title: string;
  description: string;
}

interface PolicyContent {
  badge: string;
  title: string;
  subtitle: string;
  highlights?: PolicyHighlight[];
  compliance?: {
    title?: string;
    items?: string[];
  };
}

export const PrivacyPolicySection: React.FC<PrivacyPolicySectionProps> = ({ isDark, currentLanguage }) => {
  const t = petrovskiStudioTranslations[currentLanguage] || petrovskiStudioTranslations.en;
  // This component is not used in App.tsx, but if needed, it should use t.privacy structure
  const policy = {
    badge: "Privacy First",
    title: t.privacy?.title || "Privacy Policy",
    subtitle: "Your data stays yours, always.",
    highlights: t.privacy?.points?.map(point => ({
      title: point.title,
      description: point.desc
    })) || []
  } as PolicyContent;

  const sceneBg = isDark ? '#03050c' : '#f4f1ff';
  const wrapperBorder = isDark ? 'border-white/10' : 'border-purple-100/80';
  const wrapperShadow = isDark
    ? 'shadow-[0_35px_120px_rgba(6,3,22,0.65)]'
    : 'shadow-[0_35px_120px_rgba(167,139,255,0.35)]';
  const overlayTop = isDark
    ? 'bg-[radial-gradient(circle_at_top,_rgba(88,63,223,0.25),_transparent_60%)]'
    : 'bg-[radial-gradient(circle_at_top,_rgba(167,139,255,0.25),_transparent_60%)]';
  const overlayBottom = isDark
    ? 'bg-[radial-gradient(circle_at_bottom,_rgba(12,179,180,0.12),_transparent_55%)]'
    : 'bg-[radial-gradient(circle_at_bottom,_rgba(232,201,255,0.3),_transparent_55%)]';
  const glowOne = isDark ? 'bg-pink-500/15' : 'bg-pink-200/60';
  const glowTwo = isDark ? 'bg-purple-500/20' : 'bg-purple-300/50';
  const badgeStyles = isDark
    ? 'border-white/20 bg-white/10 text-white/80'
    : 'border-purple-200/70 bg-white/80 text-purple-700/80';
  const headingGradient = isDark
    ? 'from-white via-pink-100 to-purple-200'
    : 'from-purple-900 via-pink-600 to-indigo-500';
  const textMuted = isDark ? 'text-slate-300/80' : 'text-slate-600';
  const cardSurface = isDark
    ? 'bg-white/5 border-white/10 shadow-[0_20px_60px_rgba(5,6,17,0.4)] hover:border-white/30'
    : 'bg-white border-purple-100/80 shadow-[0_30px_80px_rgba(175,151,255,0.3)] hover:border-purple-200/90';
  const highlightTitle = isDark ? 'text-white' : 'text-slate-900';
  const complianceDivider = isDark ? 'border-white/10' : 'border-purple-100/80';
  const complianceLabel = isDark ? 'text-pink-200/70' : 'text-purple-500/70';
  const complianceChip = isDark
    ? 'border-white/15 bg-white/10 text-white/90'
    : 'border-purple-100 bg-white text-slate-700 shadow-sm';

  return (
    <section className="relative z-10 py-20 px-6">
      <div
        className={`max-w-6xl mx-auto rounded-[40px] p-8 md:p-12 border ${wrapperBorder} ${wrapperShadow} relative overflow-hidden backdrop-blur-2xl`}
        style={{ backgroundColor: sceneBg }}
      >
        <div className={`pointer-events-none absolute inset-0 ${overlayTop}`} />
        <div className={`pointer-events-none absolute inset-0 ${overlayBottom}`} />
        <div className={`pointer-events-none absolute -top-32 -left-16 h-72 w-72 rounded-full ${glowOne} blur-[140px]`} />
        <div className={`pointer-events-none absolute -bottom-32 -right-10 h-80 w-80 rounded-full ${glowTwo} blur-[160px]`} />

        <div className="relative flex flex-col items-center text-center gap-4 mb-12">
          {policy.badge ? (
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs uppercase tracking-[0.3em] ${badgeStyles}`}>
              {policy.badge}
            </span>
          ) : null}
          <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${headingGradient} bg-clip-text text-transparent`}>
            {policy.title}
          </h2>
          <p className={`text-lg max-w-3xl ${textMuted}`}>
            {policy.subtitle}
          </p>
        </div>

        <div className="relative grid gap-4 md:gap-6 md:grid-cols-2">
          {(policy.highlights ?? []).map((item, index) => {
            const Icon = iconMap[item.icon ?? 'Shield'] ?? Shield;
            return (
              <div
                key={`${item.title}-${index}`}
                className={`p-6 rounded-3xl border backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 ${cardSurface}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center text-white shadow-[0_18px_45px_rgba(170,85,255,0.35)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-xl font-semibold ${highlightTitle}`}>{item.title}</h3>
                </div>
                <p className={`text-base leading-relaxed ${textMuted}`}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className={`relative mt-10 pt-8 border-t ${complianceDivider}`}>
          <p className={`text-sm uppercase tracking-[0.3em] mb-4 text-center ${complianceLabel}`}>
            {policy.compliance?.title}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {(policy.compliance?.items ?? []).map((item, index) => (
              <span
                key={`${item}-${index}`}
                className={`px-4 py-2 rounded-full border text-sm ${complianceChip}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
