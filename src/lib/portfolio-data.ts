export type ProjectMetric = {
  label: string
  value: string
}

export type FeaturedProject = {
  chapter: string
  id: string
  eyebrow: string
  title: string
  summary: string
  image: string
  imageAlt: string
  route: string
  repo: string
  proof: string
  metrics: ProjectMetric[]
  note: string
  status?: string
}

export const featuredProjects: FeaturedProject[] = [
  {
    chapter: 'CH 01',
    id: 'womens-safety',
    eyebrow: 'NLP RESEARCH · PUBLIC DISCOURSE',
    title: 'Women’s Safety Narratives',
    summary: 'An aggregate research dashboard for stance, platform, temporal phase, and case-level patterns across public discussions.',
    image: '/project-visuals/stance-lens.png',
    imageAlt: 'Verified project plot showing public Reddit and YouTube discourse volume over time',
    route: '/projects/womens-safety-narratives',
    repo: 'https://github.com/Zinga18018/womens-safety-discourse-dashboard',
    proof: 'https://github.com/Zinga18018/womens-safety-discourse-dashboard/blob/main/EVIDENCE.md',
    metrics: [
      { label: 'Public records', value: '351,501' },
      { label: 'Canonical cases', value: '16' },
      { label: 'Reddit records', value: '328,199' },
      { label: 'YouTube records', value: '23,302' },
    ],
    note: 'Aggregate-only dashboard. Raw post text is not displayed.',
    status: 'Accepted Paper, ASONAM 2026',
  },
  {
    chapter: 'CH 02',
    id: 'readmission',
    eyebrow: 'HEALTHCARE ML · HELD-OUT EVALUATION',
    title: 'Clinical Readmission Risk Audit',
    summary: 'A patient-disjoint evaluation of 30-day readmission risk with discrimination, calibration, confusion-matrix, and drift checks.',
    image: '/project-visuals/readmission-audit.png',
    imageAlt: 'Verified held-out readmission metrics and confusion matrix from the project repository',
    route: '/projects/readmission-risk-audit',
    repo: 'https://github.com/Zinga18018/readmission-risk-audit',
    proof: 'https://github.com/Zinga18018/readmission-risk-audit/blob/main/outputs/metrics.json',
    metrics: [
      { label: 'Held-out encounters', value: '10,822' },
      { label: 'ROC-AUC', value: '0.6612' },
      { label: 'PR-AUC', value: '0.1747' },
      { label: 'Brier score', value: '0.0773' },
    ],
    note: 'Patient-disjoint split with zero patient overlap.',
  },
  {
    chapter: 'CH 03',
    id: 'rag',
    eyebrow: 'ML ENGINEERING · RETRIEVAL EVALUATION',
    title: 'Source-Grounded RAG API',
    summary: 'A FastAPI retrieval system with cited answers, four documented endpoints, automated tests, Docker configuration, and a seeded local benchmark.',
    image: '/project-visuals/rag-evaluation.png',
    imageAlt: 'Verified seeded RAG evaluation dashboard with retrieval and citation results',
    route: '/projects/rag-evaluation-api',
    repo: 'https://github.com/Zinga18018/rag-evaluation-deployment-api',
    proof: 'https://github.com/Zinga18018/rag-evaluation-deployment-api/blob/main/outputs/evaluation_metrics.json',
    metrics: [
      { label: 'Retrieval@1', value: '95%' },
      { label: 'Retrieval@3', value: '100%' },
      { label: 'Citation coverage', value: '100%' },
      { label: 'Evaluation queries', value: '20' },
    ],
    note: 'Seeded local benchmark over 32 documents.',
  },
]

export const experience = [
  {
    date: 'AUG 2025 — PRESENT',
    role: 'GCCIS Technical Assistant',
    org: 'Rochester Institute of Technology',
    detail: 'Support 200+ Windows and Linux lab systems, resolve access and software issues, and maintain Excel/VBA reports.',
  },
  {
    date: 'JAN 2025 — JAN 2026',
    role: 'Graduate Researcher, Data Science',
    org: 'Rochester Institute of Technology',
    detail: 'Built reproducible social-media analysis and statistical-testing workflows and fine-tuned a Qwen3.5-9B model with LoRA for stance classification.',
  },
  {
    date: 'DEC 2024 — APR 2025',
    role: 'Research Assistant, Data Science',
    org: 'Rochester Institute of Technology',
    detail: 'Refactored Pandas and NumPy scripts and validated PostgreSQL and Excel data for consistent research reporting.',
  },
] as const

export const skillLines = [
  ['ANALYZE', 'Python · SQL · R · Pandas · NumPy · SciPy'],
  ['MODEL', 'scikit-learn · CatBoost · XGBoost · PyTorch · Transformers · LoRA'],
  ['BUILD', 'PostgreSQL · Spark · FastAPI · Docker · React · Next.js'],
  ['EVALUATE', 'ROC-AUC · PR-AUC · Calibration · PSI · KS · Statistical tests'],
] as const
