import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border p-6 md:p-8 shadow-2xl"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--line)',
          color: 'var(--white)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className="font-mono-label text-[10px] uppercase m-0 mb-2"
              style={{ color: 'var(--accent)' }}
            >
              {project.number} / {project.category}
            </p>
            <h3
              id="project-modal-title"
              className="text-2xl md:text-3xl font-bold tracking-tight m-0"
            >
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="w-10 h-10 rounded-full border grid place-items-center shrink-0 cursor-pointer transition-colors hover:border-[#c6233e]"
            style={{
              borderColor: 'var(--line)',
              color: 'var(--white)',
            }}
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <p
          className="text-sm leading-relaxed mt-4 mb-5"
          style={{ color: 'var(--muted)' }}
        >
          {project.summary}
        </p>

        <div
          className="p-4 rounded-xl border mb-5"
          style={{
            borderColor: 'var(--accent-border)',
            backgroundColor: 'var(--accent-tint)',
          }}
        >
          <span
            className="font-mono-label text-[9px] uppercase block mb-1"
            style={{ color: 'var(--accent)' }}
          >
            KEY OUTCOME
          </span>
          <p className="text-sm font-medium m-0">{project.outcome}</p>
        </div>

        <div className="mb-6">
          <h4
            className="font-mono-label text-[10px] uppercase mb-3 m-0"
            style={{ color: 'var(--muted-soft)' }}
          >
            METHODOLOGY & HIGHLIGHTS
          </h4>
          <ul className="space-y-2 m-0 pl-4 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            {project.highlights.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t" style={{ borderColor: 'var(--line)' }}>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono-label text-[9px] px-2.5 py-1 border"
                style={{
                  borderColor: 'var(--line)',
                  color: 'var(--muted)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold whitespace-nowrap transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--accent)',
              color: '#ffffff',
            }}
          >
            <span>View on GitHub</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
