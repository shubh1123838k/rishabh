import type { SkillGroup } from '../data/portfolioData';

interface SkillsSectionProps {
  skills: SkillGroup[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section
      id="skills"
      className="px-[6vw] md:px-[12vw] py-24 md:py-32"
      style={{ backgroundColor: 'var(--panel)' }}
    >
      <div className="flex items-center gap-5">
        <span
          className="font-mono-label text-[10px] uppercase whitespace-nowrap shrink-0"
          style={{ color: 'var(--accent)' }}
        >
          04 / TOOLKIT
        </span>
        <span
          aria-hidden="true"
          className="h-[1px] flex-1"
          style={{ backgroundColor: 'var(--line)' }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[8vw] mt-14">
        <h2
          className="text-[clamp(40px,4.8vw,66px)] leading-[1.05] tracking-[-0.04em] font-semibold m-0"
          style={{ color: 'var(--white)' }}
        >
          Tools of
          <br />
          <em className="not-italic" style={{ color: 'var(--accent)' }}>
            the trade.
          </em>
        </h2>

        <div className="border-t" style={{ borderColor: 'var(--line)' }}>
          {skills.map((skill) => (
            <div
              key={skill.number}
              className="grid grid-cols-[42px_1fr] py-5 border-b"
              style={{ borderColor: 'var(--line)' }}
            >
              <span
                className="font-mono-label text-[11px] pt-0.5 tabular-nums"
                style={{ color: 'var(--accent)' }}
              >
                {skill.number}
              </span>
              <div>
                <h3
                  className="font-mono-label text-[11px] uppercase m-0 mb-2.5 font-medium"
                  style={{ color: 'var(--white)' }}
                >
                  {skill.category}
                </h3>
                <p
                  className="text-[13px] md:text-[14px] m-0"
                  style={{ color: 'var(--muted)' }}
                >
                  {skill.items}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
