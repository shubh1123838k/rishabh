import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_PORTFOLIO_PROFILE } from '../data/portfolioData';
import {
  formatTelHref,
  getInitials,
  getPortfolioAssistantReply,
  splitDisplayName,
  validateProfileDraft,
} from './portfolioLogic';

test('getInitials extracts first and last initials accurately', () => {
  assert.equal(getInitials('Rishabh Jain'), 'RJ');
  assert.equal(getInitials('Gautham K Sasidharan'), 'GS');
  assert.equal(getInitials('Maya'), 'MA');
  assert.equal(getInitials('   '), 'RJ');
});

test('splitDisplayName splits primary words and adds trailing period on accent word', () => {
  assert.deepEqual(splitDisplayName('Rishabh Jain'), { primary: 'Rishabh', accent: 'Jain.' });
  assert.deepEqual(splitDisplayName('Rishabh Kumar Jain'), {
    primary: 'Rishabh Kumar',
    accent: 'Jain.',
  });
  assert.deepEqual(splitDisplayName('Rishabh.'), { primary: 'Rishabh.', accent: '' });
});

test('formatTelHref strips formatting characters and preserves leading plus', () => {
  assert.equal(formatTelHref('+91 98112 34567'), 'tel:+919811234567');
  assert.equal(formatTelHref('(415) 555-0192'), 'tel:4155550192');
});

test('validateProfileDraft catches invalid email, short phone, and blank name', () => {
  const invalid = validateProfileDraft({
    name: 'A',
    roleTitle: 'Data Analyst',
    roleSubLabel: 'BI',
    phone: '123',
    email: 'not-an-email',
    location: '',
    githubUrl: '',
    linkedinUrl: '',
    heroSummary: '',
  });
  assert.ok(invalid.name);
  assert.ok(invalid.phone);
  assert.ok(invalid.email);
  assert.ok(invalid.location);

  const valid = validateProfileDraft({
    name: 'Rishabh Jain',
    roleTitle: 'Data Analyst',
    roleSubLabel: 'Business Analytics',
    phone: '+91 98112 34567',
    email: 'rishabh@test.com',
    location: 'Bengaluru, India',
    githubUrl: 'https://example.com/rishabh-jain/github',
    linkedinUrl: 'https://example.com/rishabh-jain/linkedin',
    heroSummary: 'Summary',
  });
  assert.deepEqual(valid, {});
});

test('getPortfolioAssistantReply dynamically uses profile contact, projects, and experience', () => {
  const contactReply = getPortfolioAssistantReply(
    'How can I contact him?',
    DEFAULT_PORTFOLIO_PROFILE
  );
  assert.match(contactReply, /rishabh@test\.com/);
  assert.match(contactReply, /\+91 98112 34567/);

  const customProfile = {
    ...DEFAULT_PORTFOLIO_PROFILE,
    name: 'Riya Verma',
    email: 'riya@example.com',
    phone: '+91 99999 11111',
  };
  const customReply = getPortfolioAssistantReply('email please', customProfile);
  assert.match(customReply, /Riya/);
  assert.match(customReply, /riya@example\.com/);
  assert.match(customReply, /\+91 99999 11111/);

  const projectReply = getPortfolioAssistantReply(
    'What projects has he done?',
    DEFAULT_PORTFOLIO_PROFILE
  );
  assert.match(projectReply, /Personal Commute Time Prediction/);
  assert.match(projectReply, /Sales Performance Dashboard/);
});
