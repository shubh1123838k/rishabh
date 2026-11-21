import { useState } from 'react';
import type { PortfolioProfile } from '../data/portfolioData';
import { formatTelHref, splitDisplayName } from '../utils/portfolioLogic';

interface HeroSectionProps {
  profile: PortfolioProfile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const { primary, accent } = splitDisplayName(profile.name);

  return (
    <section
      id="home"
      className="relative px-[6vw] md:px-[12vw] pt-16 md:pt-24 pb-24 md:pb-28 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-12 lg:gap-[5vw] min-h-[680px]"
    >
      {/* Left column: Typographic hero copy */}
      <div className="max-w-2xl">
        <p
          className="font-mono-label text-[10px] uppercase flex items-center gap-2.5"
          style={{ color: 'var(--muted)' }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-[7px] h-[7px] rounded-full"
            style={{
              backgroundColor: 'var(--accent)',
              boxShadow: '0 0 10px rgba(198, 35, 62, 0.7)',
            }}
          />
          <span>{profile.availabilityLabel}</span>
        </p>

        <p
          className="text-[19px] md:text-[20px] mt-9 mb-1.5 font-normal"
          style={{ color: 'var(--muted)' }}
        >
          {profile.introGreeting}
        </p>

        <h1
          className="text-[clamp(52px,6.8vw,96px)] leading-[0.98] tracking-[-0.045em] font-bold m-0 text-balance"
          style={{ color: 'var(--white)' }}
        >
          <span className="block">{primary}</span>
          {accent && (
            <span className="block" style={{ color: 'var(--accent)' }}>
              {accent}
            </span>
          )}
        </h1>

        <h2
          className="text-[18px] font-medium mt-7 mb-4"
          style={{ color: 'var(--white)' }}
        >
          {profile.roleTitle}{' '}
          <span style={{ color: 'var(--accent)' }} aria-hidden="true">
            ·
          </span>{' '}
          {profile.roleSubLabel}
        </h2>

        <p
          className="max-w-[465px] text-[14px] leading-[1.85]"
          style={{ color: 'var(--muted)' }}
        >
          {profile.heroSummary}
        </p>

        {/* Key stats */}
        <div
          aria-label="Portfolio highlights"
          className="flex flex-wrap items-center gap-5 md:gap-7 mt-7"
        >
          <div
            className="flex items-baseline gap-2.5 px-3 py-2 rounded-[6px] border"
            style={{
              borderColor: 'var(--accent-border)',
              backgroundColor: 'var(--accent-tint)',
            }}
          >
            <strong
              className="text-[27px] font-extrabold tracking-[-0.03em] tabular-nums"
              style={{ color: 'var(--accent)' }}
            >
              {profile.yearsExperience}
            </strong>
            <span
              className="font-mono-label text-[9px] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              YEARS EXPERIENCE
            </span>
          </div>

          <div
            className="flex items-baseline gap-2.5 px-3 py-2 rounded-[6px] border"
            style={{
              borderColor: 'var(--accent-border)',
              backgroundColor: 'var(--accent-tint)',
            }}
          >
            <strong
              className="text-[27px] font-extrabold tracking-[-0.03em] tabular-nums"
              style={{ color: 'var(--accent)' }}
            >
              {profile.projectsCount}
            </strong>
            <span
              className="font-mono-label text-[9px] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              PROJECTS
            </span>
          </div>
        </div>

        {/* Primary CTA actions */}
        <div className="flex flex-wrap items-center gap-7 mt-8">
          <a
            href="#projects"
            className="inline-flex items-center gap-5 px-5 py-3.5 text-[11px] font-bold tracking-[0.5px] whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6233e]"
            style={{
              backgroundColor: 'var(--accent)',
              color: '#ffffff',
            }}
          >
            <span>Explore my work</span>
            <span aria-hidden="true">↘</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 pb-2 text-[12px] font-medium border-b whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#c6233e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6233e]"
            style={{
              color: 'var(--white)',
              borderColor: 'var(--line)',
            }}
          >
            <span>Get in touch</span>
            <span style={{ color: 'var(--accent)' }} aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        {/* Direct socials & contact strip */}
        <div
          className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-11 font-mono-label text-[10.5px]"
          style={{ color: 'var(--muted-soft)' }}
        >
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 whitespace-nowrap transition-colors hover:text-[#c6233e]"
          >
            <span>GITHUB</span>
            <span aria-hidden="true">↗</span>
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 whitespace-nowrap transition-colors hover:text-[#c6233e]"
          >
            <span>LINKEDIN</span>
            <span aria-hidden="true">↗</span>
          </a>
          <span aria-hidden="true" style={{ color: 'var(--line)' }}>
            /
          </span>
          <a
            href={formatTelHref(profile.phone)}
            className="inline-flex items-center whitespace-nowrap transition-colors hover:text-[#c6233e] tabular-nums"
          >
            <span>{profile.phone}</span>
          </a>
          <span aria-hidden="true" style={{ color: 'var(--line)' }}>
            ·
          </span>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center whitespace-nowrap transition-colors hover:text-[#c6233e]"
          >
            <span>{profile.email}</span>
          </a>
        </div>
      </div>

      {/* Right column: Portrait with rotating conic crimson border */}
      <div className="relative max-w-[440px] w-full lg:justify-self-end pr-6 pb-6 mx-auto lg:mx-0">
        <div className="photo-frame w-full aspect-[4/5]">
          {!imageFailed ? (
            <img
              src={profile.portraitUrl}
              alt={`Black and white studio portrait of ${profile.name}`}
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
              style={{
                background:
                  'radial-gradient(circle at 30% 20%, rgba(198,35,62,0.18), var(--surface) 70%)',
              }}
            >
              <span
                className="text-5xl font-extrabold tracking-tight mb-2"
                style={{ color: 'var(--white)' }}
              >
                {profile.initials}
              </span>
              <span
                className="font-mono-label text-[10px] uppercase"
                style={{ color: 'var(--muted)' }}
              >
                {profile.name}
              </span>
            </div>
          )}

          {/* Scrim + Location tag */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(11, 11, 11, 0.85), rgba(11, 11, 11, 0.35), transparent)',
            }}
          />
          <div className="absolute left-4 bottom-4 z-10 flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/55 backdrop-blur-xs">
            <span className="font-mono-label text-[9px] text-neutral-300">
              BASED IN
            </span>
            <strong className="text-[12px] tracking-[0.8px] text-white font-bold">
              {profile.location}
            </strong>
          </div>
        </div>

        {/* Vertical rotated side note */}
        <div
          className="vertical-note hidden sm:block absolute right-0 top-10 font-mono-label text-[10px] uppercase select-none"
          style={{ color: 'var(--muted-soft)' }}
        >
          {profile.portraitNote}
        </div>

        {/* Index marker */}
        <div
          className="absolute right-6 bottom-0 font-mono-label text-[11px] tabular-nums"
          style={{ color: 'var(--muted-soft)' }}
        >
          <span style={{ color: 'var(--accent)' }}>01</span> / 05
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="hidden md:flex items-center gap-3 absolute left-[12vw] bottom-7 font-mono-label text-[10px] uppercase transition-colors hover:text-[#c6233e]"
        style={{ color: 'var(--muted-soft)' }}
      >
        <span
          aria-hidden="true"
          className="inline-block w-8 h-[1px]"
          style={{ backgroundColor: 'var(--accent)' }}
        />
        <span>SCROLL TO EXPLORE</span>
      </a>
    </section>
  );
}
