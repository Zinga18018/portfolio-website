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
  videoSrc?: string
  videoPoster?: string
}

export const projects: Project[] = [
  {
    number: '01',
    title: 'Cardiometabolic GWAS Evidence Explorer',
    shortTitle: 'GWAS Evidence Explorer',
    description: 'A public-data audit of five FinnGen type 2 diabetes regions, comparing available variant, candidate-gene, and molecular evidence while retaining source QC flags.',
    outcome: 'Open Targets 26.09 snapshot: 5 selected regions, 65 variant rows, 11 returned L2G candidates, and 44 colocalisation rows. Source QC flags remain visible.',
    stack: ['Python', 'Open Targets', 'Statistical genetics', 'GitHub Pages'],
    github: 'https://github.com/Zinga18018/cardiometabolic-gwas-evidence-explorer',
    demo: 'https://zinga18018.github.io/cardiometabolic-gwas-evidence-explorer/',
    demoLabel: 'Evidence explorer',
  },
  {
    number: '02',
    title: 'Prompt Rewriter',
    shortTitle: 'Prompt Rewriter',
    description: 'A Windows Python tool that rewrites selected text into a structured AI prompt with a global hotkey.',
    outcome: 'The 68-second case study is a captioned edit of the existing Notepad recording, documented as local Ollama. The recorded wait is preserved; inference speed and reliability across applications are not benchmarked.',
    stack: ['Python', 'Windows automation', 'Ollama', 'Desktop UX'],
    github: 'https://github.com/Zinga18018/prompt-rewriter',
    demo: '/videos/prompt-rewriter-live-demo.mp4',
    demoLabel: 'Full-timing demo',
    videoSrc: '/videos/prompt-rewriter-case-study.mp4',
    videoPoster: '/videos/prompt-rewriter-case-study-poster.png',
  },
  {
    number: '03',
    title: 'Readmission Risk Audit',
    shortTitle: 'Readmission Risk',
    description: 'An educational audit of 30-day readmission models, with patient-disjoint cohorts, probability calibration, missingness analysis, and drift checks.',
    outcome: 'Historical evaluation: 0.661 ROC-AUC, 0.175 PR-AUC, and 0.077 Brier score on 10,822 encounters. This test cohort was inspected across several experiments; it is not an untouched final benchmark or a clinical decision tool.',
    stack: ['CatBoost', 'PyTorch', 'Calibration', 'Streamlit'],
    github: 'https://github.com/Zinga18018/readmission-risk-audit',
    demo: 'https://yogesh-readmission-risk-audit.streamlit.app/',
  },
  {
    number: '04',
    title: 'NewsSnap: News Classification and Serving',
    shortTitle: 'NewsSnap',
    description: 'A four-topic news classifier with a FastAPI service, React dashboard, and separate transformer and keyword-demo modes.',
    outcome: 'Historical evaluation: 0.870 accuracy, 0.869 macro-F1, and 0.827 MCC on a project-created 12,000-article split. Recovered training used 512 examples. Prepared train/test pools share 27 normalized texts; fitted-sample overlap is unknown. The hosted demo uses keyword fallback when weights are unavailable.',
    stack: ['DistilBERT', 'FastAPI', 'React', 'CI/CD'],
    github: 'https://github.com/Zinga18018/NewsSnap',
    demo: 'https://yogesh-newssnap-classifier.streamlit.app/',
    demoLabel: 'Demo — check inference mode',
  },
  {
    number: '05',
    title: 'DriftLab: Model Monitoring Simulator',
    shortTitle: 'DriftLab',
    description: 'A seeded synthetic simulator that compares an independent reference window with a current window to show when data drift does, and does not, mean model degradation.',
    outcome: 'Default synthetic run: reference ROC-AUC 0.771, current ROC-AUC 0.316, maximum PSI 0.482, and two alerts. Training, reference, and current windows are generated independently; this is not production monitoring.',
    stack: ['NumPy', 'Pandas', 'PSI / KS', 'Streamlit'],
    github: 'https://github.com/Zinga18018/driftlab-model-monitoring-simulator',
    demo: 'https://yogesh-driftlab-monitoring.streamlit.app/',
  },
  {
    number: '06',
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
    title: 'Graduate Research Project, Data Science', org: 'Rochester Institute of Technology', dates: 'Aug 2025 - Present',
    bullets: [
      'Built Python and Pandas pipelines to analyze 351,501 Reddit and YouTube comments across 16 women-safety cases in India.',
      'Applied Mann-Whitney U, chi-square, and G-tests; fine-tuned Qwen3.5-9B with LoRA and reviewed a fixed 3,000-row validation sample.',
      'Co-authored a paper accepted at ASONAM 2026 and documented model limitations through high-confidence error review.',
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
