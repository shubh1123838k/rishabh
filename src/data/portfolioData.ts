export interface ProjectItem {
  id: string;
  number: string;
  category: string;
  title: string;
  summary: string;
  tags: string[];
  artType: 'commute' | 'dashboard' | 'network' | 'insight';
  artCaption?: string;
  repoUrl: string;
  highlights: string[];
  outcome: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  bullets?: string[];
  summary?: string;
}

export interface SkillGroup {
  number: string;
  category: string;
  items: string;
}

export interface PrincipleItem {
  number: string;
  labelLines: [string, string];
}

export interface PortfolioProfile {
  name: string;
  initials: string;
  roleTitle: string;
  roleSubLabel: string;
  availabilityLabel: string;
  introGreeting: string;
  heroSummary: string;
  yearsExperience: string;
  projectsCount: string;
  location: string;
  phone: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  portraitNote: string;
  portraitUrl: string;
  aboutLead: string;
  aboutParagraphs: string[];
  principles: PrincipleItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  skills: SkillGroup[];
  tickerTopics: string[];
}

export const DEFAULT_PORTFOLIO_PROFILE: PortfolioProfile = {
  name: 'Rishabh Jain',
  initials: 'RJ',
  roleTitle: 'Data Analyst',
  roleSubLabel: 'Business Analytics',
  availabilityLabel: 'OPEN TO OPPORTUNITIES',
  introGreeting: "Hello, I'm",
  heroSummary:
    'I turn data into clear insights that help teams understand performance, spot opportunities, and make faster, sharper decisions.',
  yearsExperience: '2+',
  projectsCount: '8+',
  location: 'BENGALURU, INDIA',
  phone: '+91 98112 34567',
  email: 'rishabh@test.com',
  githubUrl: 'https://example.com/rishabh-jain/github',
  linkedinUrl: 'https://example.com/rishabh-jain/linkedin',
  portraitNote: 'CURIOUS MIND. DATA-DRIVEN APPROACH.',
  portraitUrl: '/src/assets/images/analyst_bw_portrait_1795288912515.jpg',
  aboutLead:
    "I'm a data analyst who enjoys finding the story behind numbers and turning raw datasets into clear, decision-ready insight.",
  aboutParagraphs: [
    'My work spans revenue and operations reporting, automated KPI tracking across daily, weekly, and monthly cadences, clean data modeling, and building executive dashboards.',
    "I'm continually expanding my craft across business intelligence, SQL optimization, statistical modeling, and applied machine learning.",
  ],
  principles: [
    { number: '01', labelLines: ['DATA-FIRST', 'THINKING'] },
    { number: '02', labelLines: ['ANALYTICAL', 'PROBLEM SOLVING'] },
    { number: '03', labelLines: ['CONTINUOUS', 'LEARNING'] },
  ],
  tickerTopics: [
    'DATA ANALYTICS',
    'VISUALIZATION',
    'BUSINESS INSIGHTS',
    'MACHINE LEARNING',
  ],
  projects: [
    {
      id: 'commute-prediction',
      number: '01',
      category: 'PYTHON · MACHINE LEARNING · STREAMLIT',
      title: 'Personal Commute Time Prediction',
      summary:
        'An end-to-end analytics project using time-stamped urban travel logs to uncover congestion patterns and forecast door-to-door trip duration.',
      tags: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit'],
      artType: 'commute',
      artCaption: 'COMMUTE / ANALYTICS',
      repoUrl: 'https://example.com/rishabh-jain/projects/commute-prediction',
      highlights: [
        'Engineered departure window, weather, and route segment features across 400+ recorded trips.',
        'Evaluated Gradient Boosting and Random Forest regressors with 5-fold cross-validation.',
        'Shipped an interactive Streamlit estimator showing confidence intervals by departure time.',
      ],
      outcome: 'Reduced trip duration prediction MAE to 4.2 minutes across peak hours.',
    },
    {
      id: 'sales-dashboard',
      number: '02',
      category: 'POWER BI · LOOKER · BUSINESS INTELLIGENCE',
      title: 'Sales Performance Dashboard',
      summary:
        'Executive BI reporting suite tracking pipeline velocity, regional collections, team attainment, and monthly cohort trends.',
      tags: ['Power BI', 'Looker', 'Google Sheets'],
      artType: 'dashboard',
      repoUrl: 'https://example.com/rishabh-jain/projects/sales-dashboard',
      highlights: [
        'Consolidated multi-sheet CRM exports and payment ledgers into a unified star schema.',
        'Built DAX measures for collection efficiency, aged receivables, and rep quota attainment.',
        'Automated weekly management snapshot distribution with variance alerts.',
      ],
      outcome: 'Cut manual weekly reporting preparation time by over 65%.',
    },
    {
      id: 'ddos-detection',
      number: '03',
      category: 'PYTHON · XGBOOST · CLASSIFICATION',
      title: 'Network Traffic DDoS Detection',
      summary:
        'Supervised machine learning pipeline analyzing packet flow telemetry to isolate anomalous traffic bursts and classify malicious sessions.',
      tags: ['Python', 'XGBoost', 'Classification'],
      artType: 'network',
      repoUrl: 'https://example.com/rishabh-jain/projects/ddos-detection',
      highlights: [
        'Cleaned and normalized high-dimensional flow statistics with class-imbalance handling.',
        'Tuned XGBoost hyperparameters and inspected SHAP feature attributions for packet rate spikes.',
        'Benchmarked precision-recall trade-offs to minimize false-positive alerts.',
      ],
      outcome: 'Achieved 98.4% F1-score on held-out validation traffic captures.',
    },
    {
      id: 'accident-severity',
      number: '04',
      category: 'PYTHON · RANDOM FOREST · PREDICTION',
      title: 'Accident Severity Prediction',
      summary:
        'Predictive modeling of municipal collision records to identify high-risk road geometry, lighting, and traffic factors tied to severe outcomes.',
      tags: ['Python', 'Pandas', 'Machine Learning'],
      artType: 'insight',
      artCaption: 'DATA INSIGHT',
      repoUrl: 'https://example.com/rishabh-jain/projects/accident-severity',
      highlights: [
        'Performed exploratory spatial and temporal aggregation across multi-year incident logs.',
        'Trained Random Forest and Logistic Regression baselines with feature importance ranking.',
        'Translated top risk drivers into a concise visual briefing for safety planning.',
      ],
      outcome: 'Identified top 6 environmental and junction risk factors driving severe incidents.',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      period: 'APR 2026 — PRESENT',
      role: 'Junior Data Analyst',
      company: 'Apex Analytics Pvt. Ltd.',
      bullets: [
        'Prepare and maintain daily, weekly, and monthly revenue and operational performance reports.',
        'Analyze sales, collections, and customer cohort data to monitor conversion velocity and pending dues.',
        'Audit CRM and portal records to uphold reporting accuracy across regional teams.',
      ],
    },
    {
      id: 'exp-2',
      period: 'SEP 2025 — JAN 2026',
      role: 'Data Analyst Intern',
      company: 'Apex Analytics Pvt. Ltd.',
      summary:
        'Built hands-on fluency in commercial datasets, SQL querying, automated reporting workflows, and stakeholder dashboarding.',
    },
    {
      id: 'exp-3',
      period: '2024 — 2025',
      role: 'Data Science Trainee',
      company: 'Meridian Data Labs',
      summary:
        'Completed applied machine learning projects covering predictive regression, multi-class classification, feature engineering, and model evaluation.',
    },
  ],
  skills: [
    {
      number: '01',
      category: 'DATA ANALYSIS',
      items: 'Excel · SQL · Python · Pandas',
    },
    {
      number: '02',
      category: 'DATA VISUALIZATION',
      items: 'Power BI · Looker · Tableau',
    },
    {
      number: '03',
      category: 'MACHINE LEARNING',
      items: 'Scikit-learn · XGBoost · Model Evaluation',
    },
    {
      number: '04',
      category: 'WORKFLOW',
      items: 'Google Sheets · Reporting · Data Cleaning',
    },
  ],
};
