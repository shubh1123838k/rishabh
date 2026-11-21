import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';

interface TopBarProps {
  initials: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
];

export function TopBar({ initials, theme, onToggleTheme }: TopBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-30 h-[76px] md:h-[82px] px-[5vw] md:px-[7vw] flex items-center justify-between gap-4 md:gap-8 border-b transition-colors duration-200"
      style={{
        backgroundColor: 'var(--topbar-bg)',
        borderColor: 'var(--topbar-border)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Zone 1: Brand wordmark */}
      <a
        href="#home"
        className="text-[25px] font-extrabold tracking-[-1.5px] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6233e]"
        style={{ color: 'var(--white)' }}
      >
        {initials}
        <span style={{ color: 'var(--accent)' }}>.</span>
      </a>

      {/* Zone 2: Desktop Navigation */}
      <nav
        aria-label="Primary navigation"
        className="hidden md:flex items-center gap-8"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[13px] uppercase tracking-[1px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#c6233e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6233e]"
            style={{ color: 'var(--muted)' }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Zone 3: Theme Toggle + Primary CTA + Mobile Toggle */}
      <div className="flex items-center gap-3 md:gap-6 shrink-0">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          className="w-10 h-10 rounded-full grid place-items-center border transition-all duration-200 hover:border-[#c6233e] hover:rotate-12 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6233e]"
          style={{
            backgroundColor: theme === 'light' ? '#ffffff' : '#171717',
            borderColor: theme === 'light' ? '#d8d5cd' : '#383735',
            color: 'var(--white)',
          }}
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Sun className="w-4 h-4" aria-hidden="true" />
          )}
        </button>

        <a
          href="#contact"
          className="hidden sm:inline-flex items-center gap-2 text-[13px] uppercase tracking-[1px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#c6233e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6233e]"
          style={{ color: 'var(--white)' }}
        >
          <span>Let&apos;s talk</span>
          <span style={{ color: 'var(--accent)' }} aria-hidden="true">
            ↗
          </span>
        </a>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden w-10 h-10 grid place-items-center rounded-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6233e]"
          style={{ color: 'var(--white)' }}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="md:hidden absolute top-[76px] left-0 right-0 px-[6vw] py-6 flex flex-col gap-5 border-b z-40"
          style={{
            backgroundColor: theme === 'light' ? '#f5f3ee' : '#111111',
            borderColor: 'var(--line)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-[1.2px] font-medium py-1 transition-colors hover:text-[#c6233e]"
              style={{ color: 'var(--white)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-[1.2px] font-semibold py-1 inline-flex items-center gap-2"
            style={{ color: 'var(--accent)' }}
          >
            <span>Let&apos;s talk</span>
            <span aria-hidden="true">↗</span>
          </a>
        </nav>
      )}
    </header>
  );
}
