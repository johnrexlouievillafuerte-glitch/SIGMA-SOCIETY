export type ResearchDomain = 
  | 'High-Dimensional Inference'
  | 'Causal Discovery & DAGs'
  | 'Biostatistics & Genomics'
  | 'Quantum Stochastics'
  | 'Econometrics & Risk';

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  domain: ResearchDomain;
  date: string;
  doi: string;
  citations: number;
  reproducibilityScore: number; // e.g. 98%
  sampleSize: string;
  pMetric: string;
  abstract: string;
  keyEquation: string;
  equationDescription: string;
  datasetName: string;
  codeRepo: string;
  downloads: number;
}

export interface ResearchDataset {
  id: string;
  name: string;
  category: string;
  rows: number;
  columns: number;
  fileSize: string;
  lastUpdated: string;
  description: string;
  metrics: {
    mean: number;
    stdDev: number;
    skewness: number;
    kurtosis: number;
    median: number;
    iqr: number;
  };
  sampleData: Array<{ index: number; x: number; y: number; density: number; category: string }>;
}

export interface ResearchFellow {
  id: string;
  name: string;
  role: string;
  institution: string;
  hIndex: number;
  citationsCount: number;
  focus: string[];
  avatarUrl: string;
  publicationsCount: number;
}

export interface KeynoteSpeaker {
  id: string;
  name: string;
  title: string;
  organization: string;
  talkTitle: string;
  time: string;
  avatar: string;
  field: string;
}

export interface GlobalResearchNode {
  id: string;
  city: string;
  country: string;
  x: number; // percentage on map
  y: number;
  leadFellow: string;
  activeSimulations: number;
  latencyMs: number;
  specialization: string;
}

export interface SigmaOfficer {
  id: string;
  name: string;
  role: string;
  category: 'Elected Officers' | 'Committee Heads' | 'Faculty Advisers' | 'Executive Board';
  programOrDept: string;
  yearLevel?: string;
  term: string;
  bio: string;
  responsibilities: string[];
  avatarUrl: string;
  email?: string;
  statsMetric?: string;
  specialization: string;
  bylawFunction?: string;
}
