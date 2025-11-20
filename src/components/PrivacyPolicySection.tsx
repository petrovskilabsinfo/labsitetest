import React from 'react';
import { Shield, Eye, Zap, Globe, Lightbulb, Heart, type LucideIcon } from 'lucide-react';
import { petrovskiLabsTranslations, type Language } from '../petrovskiLabsTranslations';

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
  const t = petrovskiLabsTranslations[currentLanguage] || petrovskiLabsTranslations.en;
  const policy = (("privacyPolicy" in t ? t.privacyPolicy : undefined) ?? petrovskiLabsTranslations.en.privacyPolicy) as PolicyContent;

  const sceneBg = isDark ? '#03050c' : '#f4f1ff';
  const cardBg = isDark ? 'bg-white/5 border-white/10' : 'bg-white/70 border-purple-100/60';
  const textMuted = isDark ? 'text-slate-300/80' : 'text-slate-600';

  return (
    <section className="relative z-10 py-20 px-6">
      <div
        className="max-w-6xl mx-auto rounded-[40px] p-8 md:p-12 border border-white/10 shadow-[0_35px_120px_rgba(6,3,22,0.65)] relative overflow-hidden backdrop-blur-2xl"
        style={{ backgroundColor: sceneBg }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(88,63,223,0.25),_transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(12,179,180,0.12),_transparent_55%)]" />
        <div className="pointer-events-none absolute -top-32 -left-16 h-72 w-72 rounded-full bg-pink-500/15 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-10 h-80 w-80 rounded-full bg-purple-500/20 blur-[160px]" />

        <div className="relative flex flex-col items-center text-center gap-4 mb-12">
          {policy.badge ? (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-xs uppercase tracking-[0.3em] text-white/80">
              {policy.badge}
            </span>
          ) : null}
          <h2 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-white via-pink-100 to-purple-200 bg-clip-text text-transparent">
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
                className={`p-6 rounded-3xl ${cardBg} backdrop-blur-xl shadow-[0_20px_60px_rgba(5,6,17,0.4)] hover:-translate-y-1 transition-transform duration-300`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center text-white shadow-[0_18px_45px_rgba(170,85,255,0.35)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                </div>
                <p className={`text-base leading-relaxed ${textMuted}`}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="relative mt-10 pt-8 border-t border-white/10">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-200/70 mb-4 text-center">
            {policy.compliance?.title}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {(policy.compliance?.items ?? []).map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="px-4 py-2 rounded-full border border-white/15 bg-white/10 text-sm text-white/90"
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
