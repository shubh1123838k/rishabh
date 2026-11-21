import { useState } from 'react';
import { Check, Copy, Pencil } from 'lucide-react';
import type { PortfolioProfile } from '../data/portfolioData';
import { formatTelHref } from '../utils/portfolioLogic';

interface ContactSectionProps {
  profile: PortfolioProfile;
  onOpenEditProfile: () => void;
}

export function ContactSection({
  profile,
  onOpenEditProfile,
}: ContactSectionProps) {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 1800);
    } catch {
      // Clipboard API may be blocked in restricted contexts; direct links still work.
    }
  };

  return (
    <footer
      id="contact"
      className="px-[6vw] md:px-[12vw] pt-24 pb-10"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="flex items-center gap-5">
        <span
          className="font-mono-label text-[10px] uppercase whitespace-nowrap shrink-0"
          style={{ color: 'var(--accent)' }}
        >
          05 / CONTACT
        </span>
        <span
          aria-hidden="true"
          className="h-[1px] flex-1"
          style={{ backgroundColor: 'var(--line)' }}
        />
      </div>

      <p
        className="font-mono-label text-[10px] uppercase mt-16 mb-0"
        style={{ color: 'var(--muted)' }}
      >
        HAVE A ROLE OR PROJECT IN MIND?
      </p>

      <h2
        className="text-[clamp(48px,7.6vw,100px)] leading-[0.98] tracking-[-0.045em] font-bold mt-6 mb-10 text-balance"
        style={{ color: 'var(--white)' }}
      >
        Let&apos;s make
        <br />
        <em className="not-italic" style={{ color: 'var(--accent)' }}>
          something
        </em>{' '}
        clear.
      </h2>

      {/* Direct Email & Phone Contact Strip */}
      <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
        <div className="inline-flex items-center gap-3 pb-2.5 border-b" style={{ borderColor: 'var(--line)' }}>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-6 text-[15px] font-medium transition-colors hover:text-[#c6233e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6233e]"
            style={{ color: 'var(--white)' }}
          >
            <span>{profile.email}</span>
            <span style={{ color: 'var(--accent)' }} aria-hidden="true">
              ↗
            </span>
          </a>
          <button
            type="button"
            onClick={() => handleCopy(profile.email, 'email')}
            aria-label="Copy email address"
            title="Copy email address"
            className="w-8 h-8 rounded-md border grid place-items-center cursor-pointer transition-colors hover:border-[#c6233e]"
            style={{
              borderColor: 'var(--line)',
              color: copiedField === 'email' ? 'var(--accent)' : 'var(--muted)',
            }}
          >
            {copiedField === 'email' ? (
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="inline-flex items-center gap-3 pb-2.5 border-b" style={{ borderColor: 'var(--line)' }}>
          <a
            href={formatTelHref(profile.phone)}
            className="inline-flex items-center gap-6 text-[15px] font-medium tabular-nums transition-colors hover:text-[#c6233e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6233e]"
            style={{ color: 'var(--white)' }}
          >
            <span>{profile.phone}</span>
            <span style={{ color: 'var(--accent)' }} aria-hidden="true">
              ↗
            </span>
          </a>
          <button
            type="button"
            onClick={() => handleCopy(profile.phone, 'phone')}
            aria-label="Copy phone number"
            title="Copy phone number"
            className="w-8 h-8 rounded-md border grid place-items-center cursor-pointer transition-colors hover:border-[#c6233e]"
            style={{
              borderColor: 'var(--line)',
              color: copiedField === 'phone' ? 'var(--accent)' : 'var(--muted)',
            }}
          >
            {copiedField === 'phone' ? (
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Bottom Metadata Bar */}
      <div
        className="border-t mt-24 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono-label text-[10px] uppercase"
        style={{
          borderColor: 'var(--line)',
          color: 'var(--muted-soft)',
        }}
      >
        <span>{profile.location}</span>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[#c6233e]"
          >
            GITHUB ↗
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[#c6233e]"
          >
            LINKEDIN ↗
          </a>
          <button
            type="button"
            onClick={onOpenEditProfile}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-[#c6233e] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6233e]"
          >
            <Pencil className="w-3 h-3" aria-hidden="true" />
            <span>EDIT DETAILS</span>
          </button>
        </div>

        <span>© 2026 {profile.name.toUpperCase()}</span>
      </div>
    </footer>
  );
}
