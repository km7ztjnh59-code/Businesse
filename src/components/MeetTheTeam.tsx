import React from 'react';
import { ChefHat, Laptop, PackageCheck, CalendarClock, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { TEAM_MEMBERS, BAKERY_INFO } from '../data/bakeryData';

interface MeetTheTeamProps {
  onOrderClick?: () => void;
}

export const MeetTheTeam: React.FC<MeetTheTeamProps> = ({ onOrderClick }) => {
  const getMemberIcon = (id: string) => {
    switch (id) {
      case 'noor':
        return <ChefHat className="w-5 h-5 text-[#C86D51]" />;
      case 'anas':
        return <Laptop className="w-5 h-5 text-[#C86D51]" />;
      case 'ayan':
        return <PackageCheck className="w-5 h-5 text-[#C86D51]" />;
      case 'anam':
        return <CalendarClock className="w-5 h-5 text-[#C86D51]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C86D51]" />;
    }
  };

  return (
    <section
      id="meet-the-team"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EADBCB]/50 border border-[#D6C4B0] text-xs font-semibold tracking-wider uppercase text-[#5C4A3E]">
          <Heart className="w-3.5 h-3.5 fill-[#C86D51] text-[#C86D51]" />
          <span>The Artisans & Minds</span>
        </div>

        <h2
          id="meet-the-team-heading"
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231714] tracking-tight leading-[1.15]"
        >
          Meet the Team
        </h2>

        <p className="text-sm sm:text-base text-[#5C4A3E] leading-relaxed">
          The dedicated individuals working together behind every whisk, customized bake, smooth delivery, and celebration order at <strong className="text-[#231714] font-semibold">{BAKERY_INFO.name}</strong>.
        </p>
      </div>

      {/* Modern 4-Card Grid Without Photos */}
      <div
        id="team-members-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6"
      >
        {TEAM_MEMBERS.map((member) => (
          <article
            key={member.id}
            id={`team-card-${member.id}`}
            className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-[#EADBCB] shadow-2xs hover:shadow-md hover:border-[#C86D51]/40 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Row: Initials Avatar & Role Icon */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-5">
                {/* Monogram / Initials Badge */}
                <div
                  id={`avatar-${member.id}`}
                  className="relative w-14 h-14 rounded-2xl bg-radial from-[#F8F1E7] to-[#EFE4D6] border border-[#D6C4B0] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform"
                >
                  <span className="font-serif text-2xl font-bold text-[#3E2723] select-none tracking-tight">
                    {member.initials}
                  </span>
                  {/* Micro Accent Dot */}
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#C86D51] border-2 border-white" />
                </div>

                {/* Role Icon Emblem */}
                <div
                  id={`icon-badge-${member.id}`}
                  className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#EADBCB] flex items-center justify-center group-hover:bg-[#C86D51]/10 transition-colors"
                  title={member.role}
                >
                  {getMemberIcon(member.id)}
                </div>
              </div>

              {/* Department Pill */}
              <div className="mb-2.5">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-[#F3ECE2] text-[#5C4A3E] border border-[#EADBCB]">
                  {member.department}
                </span>
              </div>

              {/* Name & Official Title */}
              <div className="space-y-1 mb-3">
                <h3
                  id={`name-${member.id}`}
                  className="font-serif text-xl sm:text-2xl font-bold text-[#231714] tracking-tight group-hover:text-[#C86D51] transition-colors"
                >
                  {member.name}
                </h3>
                <p className="text-xs sm:text-[13px] font-semibold text-[#C86D51] leading-snug">
                  {member.role}
                </p>
              </div>

              {/* Role Bio Description */}
              <p className="text-xs sm:text-[13px] text-[#5C4A3E] leading-relaxed mb-5">
                {member.bio}
              </p>
            </div>

            {/* Core Responsibilities List */}
            <div className="pt-4 border-t border-[#F3ECE2] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7D6658] block mb-1.5">
                Key Focus & Responsibilities
              </span>
              <ul className="space-y-1.5">
                {member.responsibilities.map((resp, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-1.5 text-xs text-[#3E2723]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C86D51] shrink-0 mt-0.5" />
                    <span className="leading-tight text-[11px] sm:text-xs font-medium text-[#4A3B32]">
                      {resp}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* Subtle Bottom Assurance / Order Banner */}
      <div
        id="team-assurance-banner"
        className="mt-10 sm:mt-12 bg-[#F5EFE6] rounded-2xl p-5 sm:p-7 border border-[#EADBCB] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
      >
        <div className="space-y-1">
          <h4 className="font-serif font-bold text-base sm:text-lg text-[#231714]">
            Handcrafted with collaborative care for every celebration
          </h4>
          <p className="text-xs sm:text-sm text-[#5C4A3E]">
            From Chef Noor's oven to timely doorstep dispatch managed by Ayan and planned by Anam, our entire team ensures your bake is fresh and memorable.
          </p>
        </div>

        {onOrderClick && (
          <button
            id="team-cta-menu-btn"
            onClick={onOrderClick}
            className="shrink-0 px-6 py-3 rounded-full bg-[#3E2723] hover:bg-[#231714] text-[#FAF7F2] text-xs sm:text-sm font-semibold shadow-2xs hover:shadow-sm transition-all cursor-pointer"
          >
            Explore Fresh Menu
          </button>
        )}
      </div>
    </section>
  );
};
