import type { ExperienceItem } from '../data/portfolioData';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="px-[6vw] md:px-[12vw] py-24 md:py-32"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="flex items-center gap-5">
        <span
          className="font-mono-label text-[10px] uppercase whitespace-nowrap shrink-0"
          style={{ color: 'var(--accent)' }}
        >
          03 / EXPERIENCE
        </span>
        <span
          aria-hidden="true"
          className="h-[1px] flex-1"
          style={{ backgroundColor: 'var(--line)' }}
        />
      </div>

      <h2
        className="text-[clamp(40px,4.8vw,66px)] leading-[1.05] tracking-[-0.04em] font-semibold m-0 mt-14"
        style={{ color: 'var(--white)' }}
      >
        Where I&apos;ve
        <br />
        <em className="not-italic" style={{ color: 'var(--accent)' }}>
          been learning.
        </em>
      </h2>

      <div
        className="mt-14 ml-2 md:ml-[22%] border-l"
        style={{ borderColor: 'var(--line)' }}
      >
        {experience.map((item) => (
          <div
            key={item.id}
            className="relative grid grid-cols-1 md:grid-cols-[155px_1fr] gap-3 md:gap-9 pl-7 md:pl-9 pb-12 last:pb-2"
          >
            {/* Crimson timeline node */}
            <span
              aria-hidden="true"
              className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full"
              style={{
                backgroundColor: 'var(--accent)',
                boxShadow: '0 0 0 5px var(--bg)',
              }}
            />

            <div
              className="font-mono-label text-[9px] uppercase pt-1.5 tabular-nums"
              style={{ color: 'var(--accent)' }}
            >
              {item.period}
            </div>

            <div className="min-w-0">
              <h3
                className="text-[20px] font-semibold m-0 mb-1"
                style={{ color: 'var(--white)' }}
              >
                {item.role}
              </h3>
              <h4
                className="text-[13px] font-medium m-0 mb-3.5"
                style={{ color: 'var(--muted)' }}
              >
                {item.company}
              </h4>

              {item.bullets && item.bullets.length > 0 && (
                <ul
                  className="pl-4 m-0 space-y-2 text-[12px] md:text-[13px] leading-[1.8] list-disc"
                  style={{ color: 'var(--muted)' }}
                >
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              )}

              {item.summary && (
                <p
                  className="text-[12px] md:text-[13px] leading-[1.8] m-0"
                  style={{ color: 'var(--muted)' }}
                >
                  {item.summary}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
