import { useEffect, useState, type FormEvent } from 'react';
import { RotateCcw, X } from 'lucide-react';
import type { PortfolioProfile } from '../data/portfolioData';
import {
  getInitials,
  validateProfileDraft,
  type ProfileDraft,
  type ProfileValidationErrors,
} from '../utils/portfolioLogic';

interface EditProfileModalProps {
  open: boolean;
  profile: PortfolioProfile;
  onClose: () => void;
  onSave: (updated: Partial<PortfolioProfile>) => void;
  onReset: () => void;
}

export function EditProfileModal({
  open,
  profile,
  onClose,
  onSave,
  onReset,
}: EditProfileModalProps) {
  const [draft, setDraft] = useState<ProfileDraft>({
    name: profile.name,
    roleTitle: profile.roleTitle,
    roleSubLabel: profile.roleSubLabel,
    phone: profile.phone,
    email: profile.email,
    location: profile.location,
    githubUrl: profile.githubUrl,
    linkedinUrl: profile.linkedinUrl,
    heroSummary: profile.heroSummary,
  });
  const [errors, setErrors] = useState<ProfileValidationErrors>({});

  useEffect(() => {
    if (!open) return;
    setDraft({
      name: profile.name,
      roleTitle: profile.roleTitle,
      roleSubLabel: profile.roleSubLabel,
      phone: profile.phone,
      email: profile.email,
      location: profile.location,
      githubUrl: profile.githubUrl,
      linkedinUrl: profile.linkedinUrl,
      heroSummary: profile.heroSummary,
    });
    setErrors({});
  }, [open, profile]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateProfileDraft(draft);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    onSave({
      name: draft.name.trim(),
      initials: getInitials(draft.name),
      roleTitle: draft.roleTitle.trim() || 'Data Analyst',
      roleSubLabel: draft.roleSubLabel.trim() || 'Business Analytics',
      phone: draft.phone.trim(),
      email: draft.email.trim(),
      location: draft.location.trim().toUpperCase(),
      githubUrl: draft.githubUrl.trim(),
      linkedinUrl: draft.linkedinUrl.trim(),
      heroSummary: draft.heroSummary.trim(),
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border p-6 md:p-7 shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--line)',
          color: 'var(--white)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p
              className="font-mono-label text-[10px] uppercase m-0 mb-1"
              style={{ color: 'var(--accent)' }}
            >
              PORTFOLIO DETAILS
            </p>
            <h3 id="edit-profile-title" className="text-xl font-bold m-0">
              Update Name, Phone &amp; Email
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit profile dialog"
            className="w-10 h-10 rounded-full border grid place-items-center cursor-pointer hover:border-[#c6233e]"
            style={{ borderColor: 'var(--line)', color: 'var(--white)' }}
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="profile-name"
                className="font-mono-label text-[10px] uppercase block mb-1.5"
                style={{ color: 'var(--muted)' }}
              >
                Full Name
              </label>
              <input
                id="profile-name"
                type="text"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-[#c6233e]"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: errors.name ? 'var(--accent)' : 'var(--line)',
                  color: 'var(--white)',
                }}
                required
              />
              {errors.name && (
                <p className="text-xs mt-1 m-0" style={{ color: 'var(--accent)' }}>
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="profile-phone"
                className="font-mono-label text-[10px] uppercase block mb-1.5"
                style={{ color: 'var(--muted)' }}
              >
                Phone Number
              </label>
              <input
                id="profile-phone"
                type="tel"
                value={draft.phone}
                onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-[#c6233e]"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: errors.phone ? 'var(--accent)' : 'var(--line)',
                  color: 'var(--white)',
                }}
                required
              />
              {errors.phone && (
                <p className="text-xs mt-1 m-0" style={{ color: 'var(--accent)' }}>
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="profile-email"
                className="font-mono-label text-[10px] uppercase block mb-1.5"
                style={{ color: 'var(--muted)' }}
              >
                Email Address
              </label>
              <input
                id="profile-email"
                type="email"
                value={draft.email}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-[#c6233e]"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: errors.email ? 'var(--accent)' : 'var(--line)',
                  color: 'var(--white)',
                }}
                required
              />
              {errors.email && (
                <p className="text-xs mt-1 m-0" style={{ color: 'var(--accent)' }}>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="profile-location"
                className="font-mono-label text-[10px] uppercase block mb-1.5"
                style={{ color: 'var(--muted)' }}
              >
                Location
              </label>
              <input
                id="profile-location"
                type="text"
                value={draft.location}
                onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-[#c6233e]"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: errors.location ? 'var(--accent)' : 'var(--line)',
                  color: 'var(--white)',
                }}
                required
              />
              {errors.location && (
                <p className="text-xs mt-1 m-0" style={{ color: 'var(--accent)' }}>
                  {errors.location}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="profile-role"
                className="font-mono-label text-[10px] uppercase block mb-1.5"
                style={{ color: 'var(--muted)' }}
              >
                Primary Role
              </label>
              <input
                id="profile-role"
                type="text"
                value={draft.roleTitle}
                onChange={(e) => setDraft({ ...draft, roleTitle: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-[#c6233e]"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--line)',
                  color: 'var(--white)',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="profile-subrole"
                className="font-mono-label text-[10px] uppercase block mb-1.5"
                style={{ color: 'var(--muted)' }}
              >
                Specialty
              </label>
              <input
                id="profile-subrole"
                type="text"
                value={draft.roleSubLabel}
                onChange={(e) =>
                  setDraft({ ...draft, roleSubLabel: e.target.value })
                }
                className="w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-[#c6233e]"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--line)',
                  color: 'var(--white)',
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="profile-github"
                className="font-mono-label text-[10px] uppercase block mb-1.5"
                style={{ color: 'var(--muted)' }}
              >
                GitHub URL
              </label>
              <input
                id="profile-github"
                type="url"
                value={draft.githubUrl}
                onChange={(e) =>
                  setDraft({ ...draft, githubUrl: e.target.value })
                }
                className="w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-[#c6233e]"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--line)',
                  color: 'var(--white)',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="profile-linkedin"
                className="font-mono-label text-[10px] uppercase block mb-1.5"
                style={{ color: 'var(--muted)' }}
              >
                LinkedIn URL
              </label>
              <input
                id="profile-linkedin"
                type="url"
                value={draft.linkedinUrl}
                onChange={(e) =>
                  setDraft({ ...draft, linkedinUrl: e.target.value })
                }
                className="w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-[#c6233e]"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--line)',
                  color: 'var(--white)',
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t" style={{ borderColor: 'var(--line)' }}>
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs border rounded-lg cursor-pointer transition-colors hover:border-[#c6233e]"
              style={{
                borderColor: 'var(--line)',
                color: 'var(--muted)',
              }}
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset defaults</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs border rounded-lg cursor-pointer"
                style={{
                  borderColor: 'var(--line)',
                  color: 'var(--white)',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold rounded-lg cursor-pointer transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: '#ffffff',
                }}
              >
                Save details
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
