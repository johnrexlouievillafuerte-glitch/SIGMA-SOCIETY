import { ResearchDomain, ResearchPaper, ResearchDataset, ResearchFellow, KeynoteSpeaker, GlobalResearchNode, SigmaOfficer } from '../types';

export type OfficerData = SigmaOfficer;

export const URS_CAINTA_COURSES = [
  'BS in Information Technology',
  'Bachelor of Industrial Technology: Major in Automotive Technology',
  'Bachelor of Technology and Livelihood Education major in Industrial Arts',
  'Bachelor of Elementary Education',
  'Bachelor of Secondary Education: Major in English'
] as const;

export type UrsCaintaCourse = (typeof URS_CAINTA_COURSES)[number];

export const SOCIETY_INFO = {
  acronym: 'SIGMA',
  fullName: 'Statistical Innovation and Growth for Mathematical Advancement Society',
  institution: 'University of Rizal System',
  campus: 'Cainta Campus',
  location: 'Cainta, Rizal, Philippines',
  tagline: 'Quantifying Uncertainty · Cultivating Discovery · Advancing Mathematical Science',
  charter: 'Established at University of Rizal System – Cainta Campus, SIGMA is a premier academic society dedicated to cultivating advanced competence in theoretical statistics, data science, stochastic modeling, and empirical research across student scholars and faculty investigators.',
  foundedYear: '2024',
  pillars: [
    {
      title: 'Statistical Innovation',
      desc: 'Mastery of modern inferential paradigms, Bayesian computation, and algorithmic machine learning pipelines.'
    },
    {
      title: 'Growth in Research',
      desc: 'Mentoring undergraduate and graduate researchers in publishable, peer-reviewed empirical science.'
    },
    {
      title: 'Mathematical Advancement',
      desc: 'Deep theoretical grounding in stochastic calculus, linear algebra, graph theory, and real analysis.'
    },
    {
      title: 'Community & Institutional Impact',
      desc: 'Deploying evidence-based data solutions to address socio-economic and environmental challenges in Rizal Province.'
    }
  ]
};

export const RESEARCH_DIVISIONS = [
  {
    id: 'div-highdim',
    title: 'High-Dimensional Inference & Data Science',
    code: 'DIV-01',
    description: 'Investigating regularized shrinkage estimators, minimax convergence bounds, and matrix decomposition algorithms for high-dimensional feature spaces where p ≫ n.',
    icon: 'Network',
    accentColor: '#38bdf8',
    formula: '\\min_{β} \\frac{1}{2n}\\|y - Xβ\\|_2^2 + λ\\|β\\|_1',
    lead: 'Faculty Research Group · URS Cainta',
    activeProjects: 12,
    papersCount: 38,
    gradient: 'from-cyan-500/10 to-blue-600/5'
  },
  {
    id: 'div-causal',
    title: 'Causal Discovery & Econometric Modeling',
    code: 'DIV-02',
    description: 'Developing Directed Acyclic Graphs (DAGs), instrumental variable estimators, and structural equation models to isolate causal effects from observational surveys in regional economics.',
    icon: 'GitFork',
    accentColor: '#3b82f6',
    formula: 'P(Y \\mid do(X = x)) = \\sum_z P(Y \\mid X=x, Z=z) P(Z=z)',
    lead: 'Division for Socio-Economic Analytics',
    activeProjects: 15,
    papersCount: 44,
    gradient: 'from-blue-500/10 to-indigo-600/5'
  },
  {
    id: 'div-biostats',
    title: 'Educational Psychometrics & Institutional Analytics',
    code: 'DIV-03',
    description: 'Formulating Item Response Theory (IRT) models, student learning trajectories, cohort retention hazards, and multi-level hierarchical linear models for university decision support.',
    icon: 'Dna',
    accentColor: '#10b981',
    formula: 'P(θ) = c + \\frac{1 - c}{1 + e^{-a(θ - b)}}',
    lead: 'URS Academic Performance Lab',
    activeProjects: 18,
    papersCount: 52,
    gradient: 'from-emerald-500/10 to-teal-600/5'
  },
  {
    id: 'div-quantum',
    title: 'Stochastic Processes & Mathematical Modeling',
    code: 'DIV-04',
    description: 'Analyzing continuous-time Markov chains, random walks, Poisson point processes, and Monte Carlo approximations for computational problem-solving.',
    icon: 'Atom',
    accentColor: '#8b5cf6',
    formula: '\\mathbb{P}(X_{t+s} = j \\mid X_s = i) = P_{ij}(t)',
    lead: 'Pure & Applied Mathematics Circle',
    activeProjects: 9,
    papersCount: 27,
    gradient: 'from-purple-500/10 to-pink-600/5'
  },
  {
    id: 'div-econometrics',
    title: 'Spatial Hydrology & Environmental Statistics',
    code: 'DIV-05',
    description: 'Extreme value statistics, spatio-temporal Gaussian processes, and precipitation-runoff time series modeling for flood resilience in the Cainta and Manggahan Floodway basins.',
    icon: 'TrendingUp',
    accentColor: '#f59e0b',
    formula: 'G(z) = \\exp\\left( - \\left[ 1 + \\xi \\left( \\frac{z - \\mu}{\\sigma} \\right) \\right]^{-1/\\xi} \\right)',
    lead: 'Rizal Environmental Modeling Unit',
    activeProjects: 14,
    papersCount: 36,
    gradient: 'from-amber-500/10 to-rose-600/5'
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'sig-urs-2026-001',
    title: 'Extreme Value Spatial Modeling of Flood Runoff Frequencies across the Cainta-Taytay Hydrological Basin',
    authors: ['SIGMA Environmental Analytics Group', 'URS Cainta Faculty Mentors'],
    domain: 'Econometrics & Risk',
    date: 'February 2026',
    doi: '10.1016/j.sigma-urs.2026.02.014',
    citations: 89,
    reproducibilityScore: 99.6,
    sampleSize: 'N = 120,000 hourly precipitation sensor readings (2015–2025)',
    pMetric: 'p < 0.0001',
    abstract: 'We apply a Generalized Extreme Value (GEV) distribution coupled with spatial Bayesian smoothing to quantify return periods of catastrophic inundation across the Cainta lowlands and Pasig-Marikina drainage basins. The non-stationary parameterization reveals a 23% intensification in 10-year crest probabilities under regional urban development.',
    keyEquation: 'Z_t \\sim \\text{GEV}(\\mu(t), \\sigma, \\xi), \\quad \\mu(t) = \\beta_0 + \\beta_1 \\cdot \\text{UrbanRunoffIndex}(t)',
    equationDescription: 'Non-stationary extreme value parameterization tracking impervious land-use expansion.',
    datasetName: 'RIZAL-HYDRO-FLOOD-TIMESERIES',
    codeRepo: 'github.com/sigma-urs-cainta/flood-gev-cainta',
    downloads: 2180
  },
  {
    id: 'sig-urs-2026-002',
    title: 'Hierarchical Bayesian Estimation of Mathematics Proficiency Trajectories in Higher Education STEM Programs',
    authors: ['URS Cainta Institutional Analytics Working Group', 'SIGMA Society'],
    domain: 'Biostatistics & Genomics',
    date: 'January 2026',
    doi: '10.1016/j.sigma-urs.2026.01.077',
    citations: 64,
    reproducibilityScore: 98.8,
    sampleSize: 'N = 4,850 student assessments over 8 academic terms',
    pMetric: 'p < 10⁻⁸',
    abstract: 'By constructing a multi-level 3-Parameter Logistic (3PL) Item Response Model with latent student random intercepts, we evaluate the predictive validity of diagnostic calculus assessments. Results indicate that early diagnostic interventions reduce prerequisite mathematics attrition by 34.2%.',
    keyEquation: '\\text{logit}(P(Y_{ij} = 1)) = \\alpha_j (\\theta_i - \\beta_j) + \\gamma_{\\text{program}[i]}',
    equationDescription: 'Hierarchical 3PL formulation capturing item discrimination alpha and student latent mastery theta.',
    datasetName: 'URS-CAINTA-STUDENT-ANALYTICS',
    codeRepo: 'github.com/sigma-urs-cainta/irt-stem-mastery',
    downloads: 1840
  },
  {
    id: 'sig-urs-2025-042',
    title: 'Invariant Causal DAG Discovery for Informal Micro-Enterprise Productivity in Rizal Province',
    authors: ['SIGMA Econometrics Chapter', 'URS Department of Business & Computer Studies'],
    domain: 'Causal Discovery & DAGs',
    date: 'November 2025',
    doi: '10.1016/j.sigma-urs.2025.11.042',
    citations: 112,
    reproducibilityScore: 100,
    sampleSize: 'N = 1,420 registered micro-enterprises in Cainta, Taytay & Antipolo',
    pMetric: 'p = 1.8 × 10⁻¹²',
    abstract: 'Disentangling spurious correlation from invariant causal drivers in micro-enterprise survival requires structural causal models with latent unmeasured liquidity factors. Using Peter-Clark (PC) algorithmic discovery with bootstrap resilience bounds, we demonstrate that digital payment ledger adoption exerts an invariant positive causal effect of +28% on 12-month net resilience.',
    keyEquation: '\\mathfrak{D}_{KL}(P_{\\text{intervene}}(Y \\mid do(X)) \\,\\|\\, P(Y \\mid X)) \\le \\epsilon_{\\text{invariance}}',
    equationDescription: 'Interventional divergence bounding structural invariance across regional trade corridors.',
    datasetName: 'RIZAL-MICRO-ENTERPRISE-SURVEY',
    codeRepo: 'github.com/sigma-urs-cainta/causal-sme-dag',
    downloads: 3120
  },
  {
    id: 'sig-urs-2025-031',
    title: 'Adaptive Sparse Regularization under Collinear High-Dimensional Covariates in Small-Sample Academic Studies',
    authors: ['SIGMA Theory & Algorithms Lab', 'URS Cainta Mathematics Faculty'],
    domain: 'High-Dimensional Inference',
    date: 'September 2025',
    doi: '10.1016/j.sigma-urs.2025.09.018',
    citations: 78,
    reproducibilityScore: 97.4,
    sampleSize: 'p = 1,200 predictors, n = 85 survey cohorts',
    pMetric: 'p < 10⁻⁵',
    abstract: 'Small-sample academic studies frequently confront severe multicollinearity and high parameter ratios. We propose an adaptive Elastic Net penalty with empirical Bayes tuning parameters that maintains exact oracle variable selection guarantees under mild irrepresentable conditions.',
    keyEquation: '\\hat{\\beta} = \\arg\\min_\\beta \\left\\{ \\|y - X\\beta\\|_2^2 + \\lambda_1 \\sum_{j=1}^p \\hat{w}_j |\\beta_j| + \\lambda_2 \\|\\beta\\|_2^2 \\right\\}',
    equationDescription: 'Adaptive weighted regularization ensuring stability under near-singular empirical gram matrices.',
    datasetName: 'HIGH-DIM-ACADEMIC-SURVEY',
    codeRepo: 'github.com/sigma-urs-cainta/adaptive-enet-solver',
    downloads: 1450
  }
];

export const RESEARCH_DATASETS: ResearchDataset[] = [
  {
    id: 'ds-urs-cainta-students',
    name: 'URS-CAINTA-STUDENT-ANALYTICS',
    category: 'Institutional Analytics & Psychometrics',
    rows: 4850,
    columns: 24,
    fileSize: '18.4 MB',
    lastUpdated: 'March 2026',
    description: 'Anonymized longitudinal dataset of student diagnostic evaluations, prerequisite mathematics scores, study-habit metrics, and cumulative academic performance at URS Cainta.',
    metrics: {
      mean: 84.62,
      stdDev: 6.45,
      skewness: -0.24,
      kurtosis: 2.88,
      median: 85.10,
      iqr: 8.75
    },
    sampleData: [
      { index: 1, x: 78.5, y: 82.0, density: 0.72, category: 'College of Computing' },
      { index: 2, x: 84.0, y: 86.5, density: 0.88, category: 'College of Computing' },
      { index: 3, x: 89.2, y: 91.0, density: 0.94, category: 'Engineering & Tech' },
      { index: 4, x: 92.5, y: 94.8, density: 0.82, category: 'Engineering & Tech' },
      { index: 5, x: 71.0, y: 74.5, density: 0.45, category: 'Business Studies' },
      { index: 6, x: 83.2, y: 85.0, density: 0.79, category: 'Business Studies' },
      { index: 7, x: 88.0, y: 89.4, density: 0.91, category: 'Education Sciences' },
      { index: 8, x: 95.0, y: 97.2, density: 0.61, category: 'Education Sciences' }
    ]
  },
  {
    id: 'ds-cainta-flood-hydro',
    name: 'RIZAL-HYDRO-FLOOD-TIMESERIES',
    category: 'Spatial Hydrology & Extreme Values',
    rows: 120000,
    columns: 14,
    fileSize: '64.2 MB',
    lastUpdated: 'February 2026',
    description: 'Hourly rainfall gauging telemetry, Cainta River water levels, Manggahan Floodway sluice gate flow rates, and meteorological humidity readings.',
    metrics: {
      mean: 18.34,
      stdDev: 12.80,
      skewness: 2.14,
      kurtosis: 7.82,
      median: 14.20,
      iqr: 16.50
    },
    sampleData: [
      { index: 1, x: 12.4, y: 1.82, density: 0.85, category: 'Normal Flow' },
      { index: 2, x: 28.6, y: 3.40, density: 0.74, category: 'Alert Level 1' },
      { index: 3, x: 54.2, y: 6.12, density: 0.92, category: 'Alert Level 2' },
      { index: 4, x: 88.5, y: 9.85, density: 0.98, category: 'Crest Inundation' },
      { index: 5, x: 42.0, y: 5.10, density: 0.65, category: 'Receding Flow' },
      { index: 6, x: 19.8, y: 2.30, density: 0.77, category: 'Normal Flow' },
      { index: 7, x: 14.5, y: 1.95, density: 0.81, category: 'Normal Flow' },
      { index: 8, x: 9.2, y: 1.40, density: 0.52, category: 'Base Low' }
    ]
  },
  {
    id: 'ds-cainta-micro-sme',
    name: 'RIZAL-MICRO-ENTERPRISE-SURVEY',
    category: 'Causal Inference & Regional Economics',
    rows: 1420,
    columns: 32,
    fileSize: '8.6 MB',
    lastUpdated: 'January 2026',
    description: 'Survey data from 1,420 registered micro and small enterprises in Cainta, Taytay, and Angono measuring capital liquidity, digital payment adoption, and quarterly revenue.',
    metrics: {
      mean: 42.15,
      stdDev: 14.90,
      skewness: 0.58,
      kurtosis: 3.42,
      median: 39.80,
      iqr: 18.20
    },
    sampleData: [
      { index: 1, x: 15.0, y: 24.5, density: 0.68, category: 'Retail / Sari-Sari' },
      { index: 2, x: 32.5, y: 45.2, density: 0.84, category: 'Food & Beverage' },
      { index: 3, x: 50.0, y: 68.9, density: 0.92, category: 'Garments & Crafts' },
      { index: 4, x: 65.2, y: 84.0, density: 0.78, category: 'Services & IT' },
      { index: 5, x: 28.0, y: 39.4, density: 0.71, category: 'Retail / Sari-Sari' },
      { index: 6, x: 44.5, y: 58.0, density: 0.89, category: 'Food & Beverage' },
      { index: 7, x: 82.0, y: 104.5, density: 0.55, category: 'Wholesale Dist.' },
      { index: 8, x: 94.0, y: 118.2, density: 0.42, category: 'Wholesale Dist.' }
    ]
  }
];

export const KEYNOTE_SPEAKERS: KeynoteSpeaker[] = [
  {
    id: 'spk-1',
    name: 'Dr. Maria Elena Del Rosario',
    title: 'Senior Biostatistician & Dean Emeritus',
    organization: 'University of Rizal System · Research Council',
    talkTitle: 'Statistical Modeling in Institutional Health & Regional Higher Education',
    time: 'Day 1 · 09:30 PST',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    field: 'Institutional Biostatistics'
  },
  {
    id: 'spk-2',
    name: 'Prof. Ronald B. Tan, Ph.D.',
    title: 'Chair of Mathematical Sciences',
    organization: 'Philippine Statistical Association & URS Partner',
    talkTitle: 'Conformal Inference and Non-Parametric Guarantees in Survey Sampling',
    time: 'Day 1 · 13:30 PST',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    field: 'Distribution-Free Prediction'
  },
  {
    id: 'spk-3',
    name: 'Engr. Carlos Mendoza, M.Sc.',
    title: 'Lead Hydrological Systems Modeler',
    organization: 'Rizal Disaster Risk Reduction & Management Research Group',
    talkTitle: 'Extreme Value Stochastic Time Series for Flood Mitigation in Cainta Valley',
    time: 'Day 2 · 10:00 PST',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    field: 'Environmental Stochastics'
  },
  {
    id: 'spk-4',
    name: 'Prof. Kenji Takahashi',
    title: 'Collaborating Investigator in Stochastics',
    organization: 'Tokyo Institute of Technology & SIGMA East Asia Partner',
    talkTitle: 'Universality in Random Matrices and High-Dimensional Machine Learning',
    time: 'Day 2 · 15:00 PST',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    field: 'Random Matrix Theory'
  }
];

export const RESEARCH_FELLOWS: ResearchFellow[] = [
  {
    id: 'fel-1',
    name: 'John Rex Louie Villafuerte',
    role: 'Lead Student Researcher & Technical Chair',
    institution: 'SIGMA Society · URS Cainta Campus',
    hIndex: 8,
    citationsCount: 420,
    focus: ['Computational Statistics', 'Algorithmic Optimization', 'Web StatLab Architecture'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    publicationsCount: 6
  },
  {
    id: 'fel-2',
    name: 'Faculty Adviser, Mathematical Sciences',
    role: 'Lead Faculty Mentor & Chapter Adviser',
    institution: 'University of Rizal System – Cainta Campus',
    hIndex: 14,
    citationsCount: 1250,
    focus: ['Applied Linear Algebra', 'Differential Models', 'Pedagogical Statistics'],
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    publicationsCount: 18
  },
  {
    id: 'fel-3',
    name: 'Student Research Lead, Data Science',
    role: 'Co-Lead for Empirical Surveys & Datasets',
    institution: 'SIGMA Society · URS Cainta Campus',
    hIndex: 5,
    citationsCount: 180,
    focus: ['R & Python Analytics', 'Socio-Economic Surveys', 'Causal Modeling'],
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    publicationsCount: 4
  },
  {
    id: 'fel-4',
    name: 'Student Research Lead, Environmental Modeling',
    role: 'Hydrological & Time Series Analyst',
    institution: 'SIGMA Society · URS Cainta Campus',
    hIndex: 6,
    citationsCount: 210,
    focus: ['Spatial Point Processes', 'Precipitation Models', 'Flood Risk Analytics'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    publicationsCount: 5
  }
];

export const GLOBAL_NODES: GlobalResearchNode[] = [
  {
    id: 'node-urs-cainta',
    city: 'Cainta, Rizal',
    country: 'Philippines (Host Campus)',
    x: 77.5,
    y: 47.0,
    leadFellow: 'SIGMA URS Cainta Central Lab',
    activeSimulations: 3420,
    latencyMs: 4,
    specialization: 'Institutional Analytics, Psychometrics & Flood Hydrology'
  },
  {
    id: 'node-urs-morong',
    city: 'Morong, Rizal',
    country: 'Philippines',
    x: 78.5,
    y: 48.0,
    leadFellow: 'URS STEM Research Center',
    activeSimulations: 1840,
    latencyMs: 7,
    specialization: 'Engineering Mathematics & Applied Computing'
  },
  {
    id: 'node-urs-tanay',
    city: 'Tanay, Rizal',
    country: 'Philippines',
    x: 80.0,
    y: 46.5,
    leadFellow: 'URS Agro-Forestry Analytics',
    activeSimulations: 1210,
    latencyMs: 9,
    specialization: 'Ecological Statistics & Agricultural Yield Modeling'
  },
  {
    id: 'node-tokyo',
    city: 'Tokyo',
    country: 'Japan (Academic Partner)',
    x: 84.5,
    y: 35.0,
    leadFellow: 'Prof. Kenji Takahashi',
    activeSimulations: 4900,
    latencyMs: 48,
    specialization: 'Quantum Stochastics & Random Matrix Theory'
  },
  {
    id: 'node-zurich',
    city: 'Zurich',
    country: 'Switzerland (Partner)',
    x: 49.5,
    y: 32.5,
    leadFellow: 'Minimax Theoretical Cluster',
    activeSimulations: 3820,
    latencyMs: 145,
    specialization: 'High-Dimensional Geometry & SVD'
  },
  {
    id: 'node-stanford',
    city: 'Palo Alto',
    country: 'United States (Partner)',
    x: 18.0,
    y: 38.0,
    leadFellow: 'Conformal Inference Lab',
    activeSimulations: 4250,
    latencyMs: 160,
    specialization: 'Distribution-Free Prediction Guarantees'
  }
];

export const MISSION_VISION_DATA = {
  mission: {
    statement: 'To cultivate empirical rigor, statistical literacy, and advanced mathematical reasoning at the University of Rizal System – Cainta Campus by creating an inclusive, research-driven environment where students and faculty collaboratively investigate scientific inquiries, develop computational analytics, and solve societal and institutional challenges with ethical precision.',
    commitments: [
      {
        title: 'Research Incubation & Mentorship',
        description: 'Empowering undergraduate students to formulate hypotheses, design robust sampling methodologies, and author publishable scientific papers in peer-reviewed journals.',
        tag: 'Academic Rigor'
      },
      {
        title: 'Computational Statistical Literacy',
        description: 'Providing hands-on mastery of modern analytics frameworks including R, Python for Data Science, Bayesian simulation engines, and reproducible data workflows.',
        tag: 'Digital Innovation'
      },
      {
        title: 'Community & Institutional Analytics',
        description: 'Deploying evidence-based data solutions to address local environmental, educational psychometrics, and socio-economic challenges in Cainta and Rizal Province.',
        tag: 'Public Service'
      }
    ]
  },
  vision: {
    statement: 'To be the vanguard academic society for statistical innovation and mathematical advancement in the CALABARZON region, recognized for developing ethical, analytical, and visionary researchers who champion data-driven truth and drive impactful discoveries in academia and industry.',
    horizons: [
      {
        year: 'Horizon 2027',
        target: 'Institutional Data Lab',
        description: 'Establish a dedicated high-performance student research laboratory and open repository at URS Cainta.'
      },
      {
        year: 'Horizon 2028',
        target: 'Regional Research Symposium',
        description: 'Host the premier inter-university collegiate mathematics & statistical conference across Rizal and Region IV-A.'
      },
      {
        year: 'Horizon 2030',
        target: 'Global Open-Science Nodes',
        description: 'Form collaborative cross-border research exchanges with international institutes in computational stochastics and AI.'
      }
    ]
  },
  coreValues: [
    { name: 'Precision', desc: 'Uncompromising commitment to mathematical validity and mathematical proof.' },
    { name: 'Integrity', desc: 'Ethical stewardship of data, transparent p-values, and non-p-hacked research.' },
    { name: 'Growth', desc: 'Fostering continuous learning, student leadership, and interdisciplinary curiosity.' },
    { name: 'Advancement', desc: 'Pushing boundaries in applied computing, flood modeling, and machine learning.' }
  ]
};

export const BYLAWS_ARTICLE_VI = {
  article: 'ARTICLE VI',
  title: 'POWER AND FUNCTION OF SIGMA SOCIETY OFFICERS AND COMMITTEES',
  section1: 'The SIGMA Society shall be the official academic and professional student organization dedicated to promoting excellence in statistics, mathematics, data analytics, research, and innovation. It shall provide opportunities for academic growth, leadership development, and collaborative learning among its members while supporting the educational objectives of the College.',
  section2: 'The SIGMA Society shall be composed of Elected Officers and Committee Heads as follows:'
};

export const BYLAWS_ARTICLE_VII = {
  article: 'ARTICLE VII',
  title: 'DUTIES AND RESPONSIBILITIES OF SIGMA SOCIETY COMMITTEE HEADS AND OFFICERS',
  section1Title: 'Section 1. Duties and Responsibilities of Committee Heads',
  section2Title: 'Section 2. Duties and Responsibilities of Elected Officers'
};

export const SIGMA_OFFICERS_DATA: SigmaOfficer[] = [
  // ==========================================
  // A. ELECTED OFFICERS (In Constitutional Order)
  // ==========================================
  {
    id: 'off-president',
    name: 'John Rex Louie O. Villafuerte',
    role: 'President',
    category: 'Elected Officers',
    bylawFunction: 'Leads the organization and represents the Society in all University matters.',
    programOrDept: 'BS in Information Technology (BSIT)',
    yearLevel: '2nd Year',
    term: 'A.Y. 2026 – 2027',
    bio: 'Elected chief executive officer leading the SIGMA Society, presiding over all governance assemblies, and representing the Society across university bodies.',
    responsibilities: [
      'Serve as head and official representative of the SIGMA Society',
      'Preside over all meetings, assemblies, and official functions',
      'Approve disbursement of funds in coordination with the Treasurer and Auditor',
      'Supervise officers and committee heads to ensure effective operations',
      'Represent the Society in University councils, conferences, and policy-making bodies',
      'Assign tasks to officers and committee heads as necessary',
      'Motivate and guide members to achieve the Society’s goals'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    email: 'president.sigma@urs.edu.ph',
    statsMetric: 'Elected President',
    specialization: 'Executive Leadership & Computing Analytics'
  },
  {
    id: 'off-vp',
    name: 'Kevin SJ. Losabio',
    role: 'Vice President',
    category: 'Elected Officers',
    bylawFunction: 'Oversees internal operations and member engagement.',
    programOrDept: 'BS in Information Technology (BSIT)',
    yearLevel: '2nd Year',
    term: 'A.Y. 2026 – 2027',
    bio: 'Executive officer directly overseeing internal organizational operations, committee coordination, and member engagement activities across all college programs.',
    responsibilities: [
      'Assist the President and oversee internal operations',
      'Supervise internal communications and member engagement',
      'Coordinate among officers and committees to ensure smooth operations',
      'Act as second-in-command in the President’s absence'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    email: 'vp.sigma@urs.edu.ph',
    statsMetric: 'Elected VP',
    specialization: 'Internal Operations & Member Engagement'
  },
  {
    id: 'off-sec',
    name: 'Maria Luisa B. Algaba',
    role: 'Secretary',
    category: 'Elected Officers',
    bylawFunction: 'Maintains records, minutes, and official documentation.',
    programOrDept: 'BS in Information Technology (BSIT)',
    yearLevel: '2nd Year',
    term: 'A.Y. 2026 – 2027',
    bio: 'Elected custodian of official records, recording secretary for executive sessions, and coordinator for institutional documentation and compliance.',
    responsibilities: [
      'Maintain official records, meeting minutes, and documentation',
      'Oversee the Technical and IT Committee for digital operations',
      'Prepare and distribute official communications',
      'Ensure proper filing and archiving of documents'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    email: 'secretary.sigma@urs.edu.ph',
    statsMetric: 'Elected Secretary',
    specialization: 'Official Records & Documentation'
  },
  {
    id: 'off-treasurer',
    name: 'Jamilla A. Sallinas',
    role: 'Treasurer',
    category: 'Elected Officers',
    bylawFunction: 'Manages finances, budgets, and reports.',
    programOrDept: 'Bachelor of Elementary Education (BEED)',
    yearLevel: '3rd Year',
    term: 'A.Y. 2026 – 2027',
    bio: 'Elected officer managing society treasury, project budgeting, financial records, and fiscal disbursements.',
    responsibilities: [
      'Manage Society funds, financial records, and budgets',
      'Supervise the Membership and Outreach Committee',
      'Prepare financial reports for submission to the President and Auditor',
      'Approve expenditures in coordination with the President and Auditor'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    email: 'treasurer.sigma@urs.edu.ph',
    statsMetric: 'Elected Treasurer',
    specialization: 'Financial Stewardship & Budget Planning'
  },
  {
    id: 'off-auditor',
    name: 'Rivenz S. Pontilla',
    role: 'Auditor',
    category: 'Elected Officers',
    bylawFunction: 'Ensures financial accountability and compliance.',
    programOrDept: 'Bachelor of Industrial Technology: Major in Automotive Technology (BIT-Auto)',
    yearLevel: '2nd Year',
    term: 'A.Y. 2026 – 2027',
    bio: 'Elected auditor ensuring fiscal transparency, constitutional compliance, and accurate financial reporting across all society operations.',
    responsibilities: [
      'Review and certify the accuracy of financial statements',
      'Conduct regular audits and submit findings to the Executive Board',
      'Advise officers on fiscal management and fund allocation'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    email: 'auditor.sigma@urs.edu.ph',
    statsMetric: 'Elected Auditor',
    specialization: 'Financial Accountability & Compliance'
  },
  {
    id: 'off-pro1',
    name: 'Jm A. Villanueva',
    role: 'Public Relations Officer (PRO 1)',
    category: 'Elected Officers',
    bylawFunction: 'Handles communication, announcements, and external relations.',
    programOrDept: 'BS in Information Technology (BSIT)',
    yearLevel: '2nd Year',
    term: 'A.Y. 2026 – 2027',
    bio: 'Elected PR officer managing external linkages, institutional communications, partnership coordination, and society announcements.',
    responsibilities: [
      'Lead communication and promotion of the Society’s activities',
      'Manage announcements, media, and social media accounts',
      'Coordinate with committees to ensure timely dissemination of information'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    email: 'pro1.sigma@urs.edu.ph',
    statsMetric: 'Elected PRO 1',
    specialization: 'External Relations & Institutional Linkages'
  },
  {
    id: 'off-pro2',
    name: 'Trishtine Khate M. Albao',
    role: 'Public Relations Officer (PRO 2)',
    category: 'Elected Officers',
    bylawFunction: 'Handles communication, announcements, and external relations.',
    programOrDept: 'Bachelor of Elementary Education (BEED)',
    yearLevel: '2nd Year',
    term: 'A.Y. 2026 – 2027',
    bio: 'Elected PR officer directing communication channels, public announcements, visual information media, and society broadcasts.',
    responsibilities: [
      'Lead communication and promotion of the Society’s activities',
      'Manage announcements, media, and social media accounts',
      'Coordinate with committees to ensure timely dissemination of information'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    email: 'pro2.sigma@urs.edu.ph',
    statsMetric: 'Elected PRO 2',
    specialization: 'Communications & Media Relations'
  },

  // ==========================================
  // B. COMMITTEE HEADS (In Constitutional Order)
  // ==========================================
  {
    id: 'off-head-research',
    name: 'Princess Ann Aiceya Bañez',
    role: 'Research and Data Analytics Committee Head',
    category: 'Committee Heads',
    bylawFunction: 'Oversees research projects, data collection, and analytics initiatives.',
    programOrDept: 'BS in Information Technology (BSIT)',
    yearLevel: '1st Year',
    term: 'A.Y. 2026 – 2027',
    bio: 'Oversees society research initiatives, empirical data collection workflows, and quantitative analytics projects for the SIGMA Society at URS Cainta.',
    responsibilities: [
      'Lead and oversee all research initiatives and data-driven projects of the Society',
      'Analyze results from academic, statistical, and community-based activities',
      'Ensure research outputs align with ethical standards and the Society’s objectives',
      'Prepare and submit research reports and accomplishments each semester',
      'Coordinate with other committees for collaborative projects requiring research and analytics'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    email: 'research.sigma@urs.edu.ph',
    statsMetric: 'Committee Head',
    specialization: 'Research Methodologies & Data Analytics'
  },
  {
    id: 'off-head-academic',
    name: 'Martina P. Pantaleon',
    role: 'Academic and Training Committee Head',
    category: 'Committee Heads',
    bylawFunction: 'Leads academic support programs, trainings, and workshops.',
    programOrDept: 'Bachelor of Elementary Education (BEED)',
    yearLevel: '2nd Year',
    term: 'A.Y. 2026 – 2027',
    bio: 'Spearheads academic tutorial networks, skills development clinics, mathematical workshops, and training modules for student members.',
    responsibilities: [
      'Organize and oversee trainings, workshops, and academic programs for members',
      'Ensure programs enhance members’ knowledge, skills, and leadership abilities',
      'Monitor participation and engagement in academic initiatives',
      'Assist officers in planning educational projects aligned with the Society’s vision'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    email: 'academics.sigma@urs.edu.ph',
    statsMetric: 'Committee Head',
    specialization: 'Academic Support & Training Programs'
  },
  {
    id: 'off-head-events',
    name: 'Jorge Russle Leyva',
    role: 'Events and Programs Committee Head',
    category: 'Committee Heads',
    bylawFunction: 'Plans and executes Society events, programs, and community activities.',
    programOrDept: 'BS in Information Technology (BSIT)',
    yearLevel: '2nd Year',
    term: 'A.Y. 2026 – 2027',
    bio: 'Plans and coordinates society assemblies, academic colloquia, math competitions, seminar logistics, and community activities.',
    responsibilities: [
      'Plan, organize, and execute all Society events, programs, and activities',
      'Ensure smooth implementation and high-quality execution of programs',
      'Collaborate with other committees to secure resources and support',
      'Promote participation and engagement among members and the campus community'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80',
    email: 'events.sigma@urs.edu.ph',
    statsMetric: 'Committee Head',
    specialization: 'Events Planning & Program Execution'
  },
  {
    id: 'off-head-tech',
    name: 'Jester Greian F. Araneta',
    role: 'Technical and IT Committee Head',
    category: 'Committee Heads',
    bylawFunction: 'Manages IT systems, technical support, and digital platforms.',
    programOrDept: 'BS in Information Technology (BSIT)',
    yearLevel: '2nd Year',
    term: 'A.Y. 2026 – 2027',
    bio: 'Directs society IT infrastructure, web applications, computational platforms, and provides technical assistance during society events and assemblies.',
    responsibilities: [
      'Manage IT systems, digital platforms, and technical resources of the Society',
      'Document meetings, events, and official records',
      'Assist committees and officers with technical support for projects and programs',
      'Ensure proper filing, archiving, and accessibility of official documents'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    email: 'tech.sigma@urs.edu.ph',
    statsMetric: 'Committee Head',
    specialization: 'IT Systems & Digital Platforms'
  },
  {
    id: 'off-head-membership',
    name: 'Lyza S. Tesorero',
    role: 'Membership and Outreach Committee Head',
    category: 'Committee Heads',
    bylawFunction: 'Handles recruitment, member engagement, and outreach initiatives.',
    programOrDept: 'Bachelor of Technology and Livelihood Education (BTLED)',
    yearLevel: '3rd Year',
    term: 'A.Y. 2026 – 2027',
    bio: 'Manages member onboarding, student recruitment across URS Cainta programs, credentialing, and community math outreach initiatives.',
    responsibilities: [
      'Lead recruitment, member engagement, and retention initiatives',
      'Coordinate outreach programs to promote the Society’s mission and projects',
      'Maintain accurate records of members and participation',
      'Build relationships with the campus community, partner organizations, and stakeholders'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    email: 'membership.sigma@urs.edu.ph',
    statsMetric: 'Committee Head',
    specialization: 'Recruitment & Community Outreach'
  },

  // ==========================================
  // C. FACULTY ADVISER
  // ==========================================
  {
    id: 'off-adviser',
    name: 'Prof. Jandee G. Dolores',
    role: 'Faculty Adviser',
    category: 'Faculty Advisers',
    bylawFunction: 'Supports the educational objectives of the College and advises the Society.',
    programOrDept: 'College of Education & Industrial Technology · URS Cainta',
    term: 'Institutional Appointment',
    bio: 'Faculty adviser providing academic counsel, institutional alignment, and mentorship to the SIGMA Society at URS Cainta.',
    responsibilities: [
      'Provide strategic counsel, institutional alignment, and academic advice to the Society',
      'Support the educational objectives of the College and mentor student leaders',
      'Advise on academic research ethics, symposiums, and university policies',
      'Endorse official society events, academic projects, and delegations to university bodies'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    email: 'jandee.dolores@urs.edu.ph',
    statsMetric: 'Faculty Adviser',
    specialization: 'Academic Advisory & Faculty Mentorship'
  }
];


export const PRINCIPLES_AND_OBJECTIVES = {
  title: 'PRINCIPLES AND OBJECTIVES',
  principles: {
    section: '2.1 Principles',
    items: [
      'Academic excellence and lifelong learning',
      'Integrity, honesty, and ethical conduct',
      'Innovation and creativity in research and applications',
      'Collaboration and teamwork',
      'Service to the academic community and society'
    ]
  },
  generalObjectives: {
    section: '2.2 General Objectives',
    items: [
      'Enhance analytical, critical, and problem-solving abilities',
      'Advance competence in mathematics, statistics, and data analytics',
      'Promote a research-oriented culture',
      'Foster collaborative learning'
    ]
  },
  specificObjectives: {
    section: '2.3 Specific Objectives',
    items: [
      'Conduct seminars, workshops, tutorials, and training programs',
      'Facilitate research projects and collaborations',
      'Organize competitions, conferences, and outreach programs',
      'Establish academic and industry partnerships',
      'Support academic and career development'
    ]
  }
};

export const MEMBERSHIP_TRACKS = [
  {
    id: 'cat-regular',
    title: 'Regular Member',
    badge: 'Officially Enrolled',
    tagline: 'Officially enrolled student at URS Cainta',
    description: 'Officially enrolled students at University of Rizal System – Cainta Campus actively participating in mathematical growth, statistics, data analytics, and society governance.',
    benefits: [
      'Full voting rights in General Assemblies and eligibility for executive officer leadership',
      'Priority admission to seminars, tutorials, workshops, and training programs',
      'Active participation in collaborative research projects and competitions',
      'Official Certificate of Regular Membership recognized by URS Office of Student Affairs'
    ],
    requirement: 'Must be an officially enrolled student of University of Rizal System – Cainta Campus.'
  }
];
