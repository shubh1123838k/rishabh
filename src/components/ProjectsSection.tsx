import type { ProjectItem } from '../data/portfolioData';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

function ProjectArtwork({
  artType,
  caption,
}: {
  artType: ProjectItem['artType'];
  caption?: string;
}) {
  if (artType === 'commute') {
    const heights = ['35%', '55%', '42%', '75%', '60%', '90%', '70%'];
    return (
      <div className="project-art-box h-[165px] flex items-center justify-center p-4">
        <div
          className="h-[90px] w-3/4 flex items-end gap-2 border-b pb-0.5"
          style={{ borderColor: '#68645a' }}
        >
          {heights.map((h, i) => (
            <span
              key={i}
              className="flex-1 opacity-85"
              style={{ height: h, backgroundColor: 'var(--accent)' }}
            />
          ))}
        </div>
        {caption && (
          <small
            className="font-mono-label text-[8px] uppercase absolute bottom-3 left-3.5"
            style={{ color: 'var(--muted-soft)' }}
          >
            {caption}
          </small>
        )}
      </div>
    );
  }

  if (artType === 'dashboard') {
    const bars = ['25%', '60%', '45%', '80%', '55%', '95%'];
    return (
      <div className="project-art-box h-[165px] p-5 flex flex-col justify-between">
        <div
          className="h-2 w-1/2"
          style={{ backgroundColor: '#a5a095' }}
        />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-7 flex-1 border"
              style={{
                borderColor: 'var(--line)',
                background:
                  'linear-gradient(130deg, rgba(165,160,149,0.16), rgba(0,0,0,0.08))',
              }}
            />
          ))}
        </div>
        <div
          className="h-[64px] flex items-end gap-1.5 border-b"
          style={{ borderColor: 'var(--line)' }}
        >
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1"
              style={{ height: h, backgroundColor: 'var(--accent)' }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (artType === 'network') {
    return (
      <div className="project-art-box h-[165px] flex items-center justify-center p-4">
        <div
          className="font-mono-label text-[22px] text-center leading-[1.45]"
          style={{ color: 'var(--accent)' }}
        >
          <div>
            ◎ <span style={{ color: 'var(--muted)' }}>⌁</span> ◎
          </div>
          <div className="text-[14px]" style={{ color: 'var(--muted-soft)' }}>
            ╱ ╲ ╱
          </div>
          <div>
            ◎ <span style={{ color: 'var(--muted)' }}>⌁</span> ◎
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-art-box h-[165px] flex items-center justify-center p-4">
      <div
        className="w-[106px] h-[106px] rounded-full border grid place-items-center outline-1 outline-dashed outline-offset-8"
        style={{
          borderColor: 'var(--accent)',
          outlineColor: 'var(--muted-soft)',
        }}
      >
        <span
          className="font-mono-label text-[9px] text-center leading-[1.45] uppercase"
          style={{ color: 'var(--white)' }}
        >
          {caption?.split(' ').map((word, idx) => (
            <span key={idx} className="block">
              {word}
            </span>
          )) || (
            <>
              <span className="block">DATA</span>
              <span className="block">INSIGHT</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
}

export function ProjectsSection({
  projects,
  onSelectProject,
}: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="px-[6vw] md:px-[12vw] py-24 md:py-32"
      style={{ backgroundColor: 'var(--panel)' }}
    >
      <div className="flex items-center gap-5">
        <span
          className="font-mono-label text-[10px] uppercase whitespace-nowrap shrink-0"
          style={{ color: 'var(--accent)' }}
        >
          02 / SELECTED WORK
        </span>
        <span
          aria-hidden="true"
          className="h-[1px] flex-1"
          style={{ backgroundColor: 'var(--line)' }}
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-12 mb-10">
        <h2
          className="text-[clamp(40px,4.8vw,66px)] leading-[1.05] tracking-[-0.04em] font-semibold m-0"
          style={{ color: 'var(--white)' }}
        >
          Projects<span style={{ color: 'var(--accent)' }}>.</span>
        </h2>
        <p
          className="max-w-[320px] text-[13px] leading-[1.75] m-0"
          style={{ color: 'var(--muted)' }}
        >
          A selection of projects where I explore data, build models and
          communicate insights.
        </p>
      </div>

      <div className="border-t" style={{ borderColor: 'var(--line)' }}>
        {projects.map((project) => (
          <article
            key={project.id}
            className="project-row group grid grid-cols-[28px_minmax(0,1fr)_32px] md:grid-cols-[45px_1.1fr_0.8fr_45px] items-center gap-4 md:gap-7 py-8 border-b transition-all duration-200 hover:px-3 hover:bg-[var(--accent-tint)]"
            style={{ borderColor: 'var(--line)' }}
          >
            <div
              className="font-mono-label text-[11px] self-start pt-1.5 tabular-nums"
              style={{ color: 'var(--accent)' }}
            >
              {project.number}
            </div>

            <div className="min-w-0">
              <p
                className="font-mono-label text-[9px] uppercase mb-2.5 leading-relaxed"
                style={{ color: 'var(--muted-soft)' }}
              >
                {project.category}
              </p>

              <h3 className="m-0 mb-3">
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="text-left text-[22px] md:text-[25px] leading-[1.25] tracking-[-0.025em] font-semibold transition-colors duration-200 group-hover:text-[#c6233e] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6233e]"
                  style={{ color: 'var(--white)' }}
                >
                  {project.title}
                </button>
              </h3>

              <p
                className="text-[12px] md:text-[13px] leading-[1.75] max-w-[430px] m-0"
                style={{ color: 'var(--muted)' }}
              >
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono-label text-[9px] px-2.5 py-1.5 border"
                    style={{
                      borderColor: 'var(--line)',
                      color: 'var(--muted)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectProject(project)}
              aria-label={`Open case study for ${project.title}`}
              className="col-start-2 md:col-start-3 w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6233e]"
            >
              <ProjectArtwork
                artType={project.artType}
                caption={project.artCaption}
              />
            </button>

            <button
              type="button"
              onClick={() => onSelectProject(project)}
              aria-label={`Inspect ${project.title} details`}
              className="col-start-3 row-start-1 md:col-start-4 text-[24px] justify-self-end transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6233e]"
              style={{ color: 'var(--accent)' }}
            >
              ↗
            </button>
          </article>
        ))}
      </div>

      <p
        className="text-[11px] mt-5 m-0"
        style={{ color: 'var(--muted-soft)' }}
      >
        Select any project row to view methodology, key metrics, and repository
        links.
      </p>
    </section>
  );
}
