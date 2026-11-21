import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { EditProfileModal } from './components/EditProfileModal';
import { ExperienceSection } from './components/ExperienceSection';
import { HeroSection } from './components/HeroSection';
import { MarqueeTicker } from './components/MarqueeTicker';
import { PortfolioAssistant } from './components/PortfolioAssistant';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { TopBar } from './components/TopBar';
import {
  DEFAULT_PORTFOLIO_PROFILE,
  type PortfolioProfile,
  type ProjectItem,
} from './data/portfolioData';

const THEME_STORAGE_KEY = 'portfolio-theme';
const PROFILE_STORAGE_KEY = 'portfolio-profile-v2';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [profile, setProfile] = useState<PortfolioProfile>(() => {
    try {
      const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
      if (!raw) return DEFAULT_PORTFOLIO_PROFILE;
      const parsed = JSON.parse(raw) as Partial<PortfolioProfile>;
      return { ...DEFAULT_PORTFOLIO_PROFILE, ...parsed };
    } catch {
      return DEFAULT_PORTFOLIO_PROFILE;
    }
  });

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  useEffect(() => {
    if (theme === 'light') {
      document.body.dataset.theme = 'light';
    } else {
      delete document.body.dataset.theme;
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors in restricted environments.
    }
  }, [theme]);

  useEffect(() => {
    document.title = `${profile.name} | ${profile.roleTitle}`;
  }, [profile.name, profile.roleTitle]);

  const handleSaveProfile = (updated: Partial<PortfolioProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      try {
        window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage errors.
      }
      return next;
    });
  };

  const handleResetProfile = () => {
    setProfile(DEFAULT_PORTFOLIO_PROFILE);
    try {
      window.localStorage.removeItem(PROFILE_STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="grain-overlay" aria-hidden="true" />

      <TopBar
        initials={profile.initials}
        theme={theme}
        onToggleTheme={() =>
          setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
        }
      />

      <main>
        <HeroSection profile={profile} />
        <MarqueeTicker topics={profile.tickerTopics} />
        <AboutSection profile={profile} />
        <ProjectsSection
          projects={profile.projects}
          onSelectProject={setSelectedProject}
        />
        <ExperienceSection experience={profile.experience} />
        <SkillsSection skills={profile.skills} />
      </main>

      <ContactSection
        profile={profile}
        onOpenEditProfile={() => setIsEditProfileOpen(true)}
      />

      <PortfolioAssistant profile={profile} theme={theme} />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <EditProfileModal
        open={isEditProfileOpen}
        profile={profile}
        onClose={() => setIsEditProfileOpen(false)}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
      />
    </div>
  );
}
