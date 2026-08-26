export interface Project {
  number: string
  title: string
  shortTitle: string
  description: string
  outcome: string
  stack: string[]
  github?: string
  demo: string
  demoLabel?: string
}

export const projects: Project[] = [
  {
    number: '01',
    title: 'Clinical Readmission Risk Modeling',
    shortTitle: 'Readmission Risk',
    description: 'A leakage-safe 30-day readmission pipeline with patient-disjoint cohorts, calibration, missingness analysis, and drift checks.',
    outcome: 'Held-out test: 0.661 ROC-AUC, 0.175 PR-AUC, and 0.077 Brier score on 10,822 encounters.',
    stack: ['CatBoost', 'PyTorch', 'Calibration', 'Streamlit'],
    github: 'https://github.com/Zinga18018/readmission-risk-audit',
    demo: 'https://yogesh-readmission-risk-audit.streamlit.app/',
  },
  {
    number: '02',
    title: 'NewsSnap: Transformer News Classification System',
    shortTitle: 'NewsSnap',
    description: 'A four-class AG News system with a DistilBERT training pipeline, FastAPI service, React dashboard, and explicit inference modes.',
    outcome: 'Held-out evaluation: 0.870 accuracy, 0.869 macro-F1, and 0.827 MCC on 12,000 articles.',
    stack: ['DistilBERT', 'FastAPI', 'React', 'CI/CD'],
    github: 'https://github.com/Zinga18018/NewsSnap',
    demo: 'https://yogesh-newssnap-classifier.streamlit.app/',
    demoLabel: 'Streamlit demo',
  },
  {
    number: '03',
    title: 'Model Behavior Under Distribution Shift',
    shortTitle: 'DriftLab',
    description: 'A deterministic simulator for performance decay, class-prior shift, PSI, approximate KS, and configurable monitoring alerts.',
    outcome: 'Verified mixed-shift run: ROC-AUC fell from 0.758 to 0.372; max PSI reached 0.608; three alerts fired.',
    stack: ['NumPy', 'Pandas', 'PSI / KS', 'Streamlit'],
    github: 'https://github.com/Zinga18018/driftlab-model-monitoring-simulator',
    demo: 'https://yogesh-driftlab-monitoring.streamlit.app/',
  },
  {
    number: '04',
    title: 'Women-Safety Public Discourse Research',
    shortTitle: 'Women-Safety Research',
    description: 'An interactive research dashboard covering 351,501 Reddit and YouTube comments across 16 women-safety cases in India.',
    outcome: 'Paper accepted at ASONAM 2026. The dashboard separates submitted-paper findings from later model audits.',
    stack: ['Python', 'Pandas', 'Qwen', 'Statistical testing'],
    demo: '/research/women-safety',
    demoLabel: 'Research dashboard',
  },
]

export const jobs = [
  {
    title: 'Graduate Researcher, Data Science', org: 'Rochester Institute of Technology', dates: '2025 — 2026',
    bullets: [
      'Built Python and Pandas pipelines to analyze 351,501 Reddit and YouTube comments across 16 women-safety cases in India.',
      'Applied Mann–Whitney U, chi-square, and G-tests; fine-tuned Qwen3.5-9B with LoRA and evaluated 3,000 held-out examples.',
      'Authored a paper accepted at ASONAM 2026 and documented model limitations through high-confidence error review.',
    ],
  },
  {
    title: 'GCCIS Technical Assistant', org: 'Rochester Institute of Technology', dates: 'Aug 2025 — Present',
    bullets: ['Support 200+ Windows and Linux lab systems, troubleshoot access and software issues, and maintain Excel/VBA reports.'],
  },
  {
    title: 'Research Assistant, Data Science', org: 'Rochester Institute of Technology', dates: 'Dec 2024 — Apr 2025',
    bullets: ['Refactored Pandas and NumPy scripts and validated PostgreSQL and Excel data for accurate weekly research reporting.'],
  },
]

export const degrees = [
  { degree: 'M.S. in Data Science', school: 'Rochester Institute of Technology · Rochester, NY', year: 'Aug 2024 — Expected Dec 2026', courses: 'Machine Learning, Deep Learning, Cloud Computing, Big Data Analytics' },
  { degree: 'Postgraduate Program in Data Science', school: 'Vellore Institute of Technology · India', year: 'Aug 2023 — Jul 2024' },
  { degree: 'B.C.A. in Computer Applications', school: 'New Shores International College · India', year: 'Nov 2020 — Dec 2023' },
]

export const skillGroups = [
  { name: 'Languages', skills: ['Python', 'SQL', 'R', 'Java'] },
  { name: 'Machine Learning & NLP', skills: ['PyTorch', 'scikit-learn', 'CatBoost', 'XGBoost', 'Transformers', 'LoRA', 'DistilBERT', 'FT-Transformer'] },
  { name: 'Statistics & Evaluation', skills: ['A/B testing', 'Mann–Whitney U', 'Chi-square', 'G-test', 'ROC-AUC', 'PR-AUC', 'Calibration', 'PSI / KS / JS'] },
  { name: 'Data & Databases', skills: ['Pandas', 'NumPy', 'SciPy', 'Spark', 'PostgreSQL', 'SQLite', 'Window functions'] },
  { name: 'ML Engineering', skills: ['FastAPI', 'Streamlit', 'React', 'Docker', 'GitHub Actions', 'Automated testing', 'Git', 'Excel / VBA'] },
]

export const socialLinks = {
  email: 'kuchimanchiyogesh@gmail.com',
  github: 'https://github.com/Zinga18018',
  linkedin: 'https://www.linkedin.com/in/yogeshkuchimanchi/',
  huggingface: 'https://huggingface.co/Yogesh18018',
}
