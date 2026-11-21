import type { PortfolioProfile } from '../data/portfolioData';

interface AboutSectionProps {
  profile: PortfolioProfile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="px-[6vw] md:px-[12vw] py-24 md:py-32"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="flex items-center gap-5">
        <span
          className="font-mono-label text-[10px] uppercase whitespace-nowrap shrink-0"
          style={{ color: 'var(--accent)' }}
        >
          01 / ABOUT
        </span>
        <span
          aria-hidden="true"
          className="h-[1px] flex-1"
          style={{ backgroundColor: 'var(--line)' }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[8vw] mt-14 md:mt-16">
        <h2
          className="text-[clamp(40px,4.8vw,66px)] leading-[1.05] tracking-[-0.04em] font-semibold m-0 text-balance"
          style={{ color: 'var(--white)' }}
        >
          Making data
          <br />
          make{' '}
          <em className="not-italic" style={{ color: 'var(--accent)' }}>
            sense.
          </em>
        </h2>

        <div className="max-w-[520px]">
          <p
            className="text-[19px] md:text-[21px] leading-[1.55] m-0 mb-5 font-normal"
            style={{ color: 'var(--white)' }}
          >
            {profile.aboutLead}
          </p>

          {profile.aboutParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[13px] md:text-[14px] leading-[1.95] mb-4"
              style={{ color: 'var(--muted)' }}
            >
              {paragraph}
            </p>
          ))}

          <a
            href="#contact"
            className="inline-flex items-center gap-2 mt-4 pb-2 text-[12px] font-medium border-b transition-colors hover:text-[#c6233e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6233e]"
            style={{
              color: 'var(--white)',
              borderColor: 'var(--line)',
            }}
          >
            <span>More about working together</span>
            <span style={{ color: 'var(--accent)' }} aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* 3-Column Principles Strip */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 border-t mt-20 md:mt-24 pt-7"
        style={{ borderColor: 'var(--line)' }}
      >
        {profile.principles.map((item) => (
          <div key={item.number} className="flex items-center gap-4">
            <strong
              className="text-[32px] md:text-[34px] font-medium tabular-nums"
              style={{ color: 'var(--accent)' }}
            >
              {item.number}
            </strong>
            <span
              className="font-mono-label text-[9px] leading-[1.7] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              {item.labelLines[0]}
              <br />
              {item.labelLines[1]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
