import type { PortfolioProfile } from '../data/portfolioData';

export interface ProfileDraft {
  name: string;
  roleTitle: string;
  roleSubLabel: string;
  phone: string;
  email: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  heroSummary: string;
}

export interface ProfileValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
}

export function getInitials(fullName: string): string {
  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return 'RJ';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function splitDisplayName(fullName: string): { primary: string; accent: string } {
  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return { primary: 'Rishabh', accent: 'Jain.' };
  if (parts.length === 1) return { primary: parts[0], accent: '' };
  const last = parts[parts.length - 1];
  const rest = parts.slice(0, -1).join(' ');
  return {
    primary: rest,
    accent: last.endsWith('.') ? last : `${last}.`,
  };
}

export function formatTelHref(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '');
  return `tel:${cleaned}`;
}

export function validateProfileDraft(draft: ProfileDraft): ProfileValidationErrors {
  const errors: ProfileValidationErrors = {};
  if (!draft.name.trim() || draft.name.trim().length < 2) {
    errors.name = 'Please enter a valid full name.';
  }
  const digits = draft.phone.replace(/\D/g, '');
  if (digits.length < 7) {
    errors.phone = 'Please enter a valid phone number (at least 7 digits).';
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(draft.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!draft.location.trim()) {
    errors.location = 'Please enter a city or location.';
  }
  return errors;
}

export function getPortfolioAssistantReply(
  message: string,
  profile: PortfolioProfile
): string {
  const question = message.toLowerCase().trim();
  const firstName = profile.name.trim().split(/\s+/)[0] || 'Rishabh';

  if (/\b(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(question)) {
    return `Hello! Ask me about ${firstName}'s projects, toolkit, experience, or contact details.`;
  }

  if (/project|work|portfolio|dashboard|commute|ddos|accident/.test(question)) {
    const titles = profile.projects.map((p) => p.title).join(', ');
    return `${firstName}'s featured projects include ${titles}. Click any project card in the Selected Work section to inspect its highlights and outcomes.`;
  }

  if (/skill|tool|technology|tech stack|language|software|toolkit/.test(question)) {
    const toolSummary = profile.skills.map((s) => `${s.category}: ${s.items}`).join(' | ');
    return `${firstName}'s toolkit covers ${toolSummary}.`;
  }

  if (/experience|job|career|work history|employ|company|intern/.test(question)) {
    const latest = profile.experience[0];
    if (latest) {
      return `${firstName} works as a ${latest.role} at ${latest.company} (${latest.period}). Scroll to the Experience section for the full career timeline.`;
    }
    return `See the Experience section for ${firstName}'s full career timeline.`;
  }

  if (/contact|email|phone|number|call|hire|connect|linkedin|github|reach/.test(question)) {
    return `You can reach ${firstName} directly by email at ${profile.email} or by phone at ${profile.phone}, or connect via GitHub and LinkedIn in the Contact section.`;
  }

  if (/where|location|based|city|india/.test(question)) {
    return `${firstName} is based in ${profile.location}.`;
  }

  if (/about|who are you|who is/.test(question)) {
    return `${profile.name} is a ${profile.roleTitle} (${profile.roleSubLabel}) focused on turning operational and business data into clear reporting, dashboards, and predictive models.`;
  }

  return `I can help with questions about ${firstName}'s projects, skills, experience, or contact details (${profile.email} · ${profile.phone}). Try one of the suggested questions below.`;
}
