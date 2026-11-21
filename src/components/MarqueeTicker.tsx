interface MarqueeTickerProps {
  topics: string[];
}

export function MarqueeTicker({ topics }: MarqueeTickerProps) {
  const repeated = [...topics, ...topics, ...topics, ...topics];

  return (
    <section
      aria-label="Areas of focus"
      className="ticker-wrapper overflow-hidden border-y py-4 select-none"
      style={{
        borderColor: 'var(--line)',
        backgroundColor: 'var(--bg)',
      }}
    >
      <div className="ticker-track items-center gap-8">
        {repeated.map((topic, idx) => (
          <div key={`${topic}-${idx}`} className="flex items-center gap-8 shrink-0">
            <span
              className="font-mono-label text-[11px] uppercase whitespace-nowrap"
              style={{ color: 'var(--muted)' }}
            >
              {topic}
            </span>
            <span
              aria-hidden="true"
              className="text-xs"
              style={{ color: 'var(--accent)' }}
            >
              ✳
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
