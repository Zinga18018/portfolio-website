export interface Project {
  title: string
  description: string
  stack: string[]
  github: string
  demo?: string
  category: 'ai' | 'ml' | 'data' | 'mlops'
  featured: boolean
}

export const projects: Project[] = [
  // Featured projects (top 5)
  {
    title: 'AI Code Reviewer',
    description: 'Code review server powered by TinyLlama-1.1B with streaming SSE responses, four review modes (general, security, performance, style), and KV-cache optimization for fast inference.',
    stack: ['TinyLlama-1.1B', 'FastAPI', 'PyTorch', 'CUDA'],
    github: 'https://github.com/Zinga18018/ai-code-reviewer',
    demo: 'https://huggingface.co/spaces/Yogesh18018/ai-code-reviewer',
    category: 'ai',
    featured: true,
  },
  {
    title: 'RAG Document Brain',
    description: 'Retrieval-augmented generation pipeline that chunks documents, embeds with 384-dim sentence-transformers, indexes in ChromaDB, and synthesizes answers with TinyLlama.',
    stack: ['Sentence-Transformers', 'ChromaDB', 'TinyLlama', 'FastAPI'],
    github: 'https://github.com/Zinga18018/rag-document-brain',
    demo: 'https://huggingface.co/spaces/Yogesh18018/rag-document-brain',
    category: 'ai',
    featured: true,
  },
  {
    title: 'Multi-Agent Orchestrator',
    description: 'Framework that coordinates specialized LLM agents through a three-phase pipeline: planning, parallel expert execution, and answer synthesis with chain-of-thought reasoning.',
    stack: ['TinyLlama', 'Agent Framework', 'FastAPI', 'Streamlit'],
    github: 'https://github.com/Zinga18018/multi-agent-orchestrator',
    demo: 'https://huggingface.co/spaces/Yogesh18018/multi-agent',
    category: 'ai',
    featured: true,
  },
  {
    title: 'MetalVision AI',
    description: 'Surface defect detection system using PyTorch CNNs with attention mechanisms, ensemble learning, SMOTE augmentation, and cross-validation for industrial quality control.',
    stack: ['PyTorch', 'CNN', 'Attention', 'SMOTE'],
    github: 'https://github.com/Zinga18018/MetalVision-AI',
    category: 'ml',
    featured: true,
  },
  {
    title: 'NewsSnap',
    description: 'Full-stack news aggregator with DistilBERT summarization, React dashboard, automated CI/CD pipeline, Docker containerization, and live deployment on Render.',
    stack: ['DistilBERT', 'React', 'Docker', 'CI/CD'],
    github: 'https://github.com/Zinga18018/NewsSnap',
    demo: 'https://newssnap.onrender.com',
    category: 'mlops',
    featured: true,
  },

  // Grid projects
  {
    title: 'Sentiment Engine',
    description: 'Real-time sentiment analysis with DistilBERT (67M params), batch processing, comparison mode, and trend visualization.',
    stack: ['DistilBERT', 'FastAPI', 'Streamlit'],
    github: 'https://github.com/Zinga18018/sentiment-engine',
    demo: 'https://huggingface.co/spaces/Yogesh18018/sentiment-engine',
    category: 'ai',
    featured: false,
  },
  {
    title: 'Image Captioner',
    description: 'Image-to-text generation with ViT encoder and GPT-2 decoder, beam search for multi-caption output.',
    stack: ['ViT', 'GPT-2', 'FastAPI'],
    github: 'https://github.com/Zinga18018/image-captioner',
    demo: 'https://huggingface.co/spaces/Yogesh18018/image-captioner',
    category: 'ai',
    featured: false,
  },
  {
    title: 'Drift Detection Dashboard',
    description: 'Real-time model monitoring with KS test, PSI, and Jensen-Shannon divergence for data drift detection.',
    stack: ['scikit-learn', 'SciPy', 'Streamlit'],
    github: 'https://github.com/Zinga18018/ML-Model-Monitoring-and-Data-Drift-Detection',
    demo: 'https://huggingface.co/spaces/Yogesh18018/drift-detection',
    category: 'mlops',
    featured: false,
  },
  {
    title: 'Knowledge Graph Engine',
    description: 'NER-driven knowledge graph construction with interactive PyVis visualization and community detection.',
    stack: ['spaCy', 'NetworkX', 'Streamlit'],
    github: 'https://github.com/Zinga18018/Knowledge-Graph-Construction-and-Reasoning-Engine',
    demo: 'https://huggingface.co/spaces/Yogesh18018/knowledge-graph-engine',
    category: 'ml',
    featured: false,
  },
  {
    title: 'Neural Style Transfer Lab',
    description: 'Gatys et al. style transfer with VGG19 plus procedural generative art with fractals and flow fields.',
    stack: ['PyTorch', 'VGG19', 'Streamlit'],
    github: 'https://github.com/Zinga18018/Neural-Style-Transfer-and-Generative-Art-Lab',
    demo: 'https://huggingface.co/spaces/Yogesh18018/neural-style-transfer',
    category: 'ml',
    featured: false,
  },
  {
    title: 'Time-Series Forecasting',
    description: 'Multi-model benchmarking with ARIMA, Holt-Winters, and regression with automated feature engineering.',
    stack: ['statsmodels', 'ARIMA', 'Streamlit'],
    github: 'https://github.com/Zinga18018/Time-Series-Forecasting-with-Transformer-Architectures',
    demo: 'https://huggingface.co/spaces/Yogesh18018/time-series-forecasting',
    category: 'data',
    featured: false,
  },
  {
    title: 'Anomaly Detection',
    description: 'Ensemble of five algorithms with voting and synthetic data augmentation for imbalanced datasets.',
    stack: ['Isolation Forest', 'DBSCAN', 'Streamlit'],
    github: 'https://github.com/Zinga18018/Multimodal-Anomaly-Detection-with-Synthetic-Augmentation',
    demo: 'https://huggingface.co/spaces/Yogesh18018/anomaly-detection',
    category: 'ml',
    featured: false,
  },
  {
    title: 'Stock Sentiment Dashboard',
    description: 'Tracks public sentiment around stock tickers and compares with price trends using NLP and Yahoo Finance.',
    stack: ['NLP', 'Yahoo Finance', 'Streamlit'],
    github: 'https://github.com/Zinga18018/stock-sentiment-dashboard',
    category: 'data',
    featured: false,
  },
  {
    title: 'Credit Card Default Prediction',
    description: 'Ensemble ML models (XGBoost, Random Forest, Logistic Regression) exposed as a REST API via FastAPI.',
    stack: ['XGBoost', 'FastAPI', 'scikit-learn'],
    github: 'https://github.com/Zinga18018/credit-card-default-prediction',
    category: 'ml',
    featured: false,
  },
  {
    title: 'Restaurant Analytics LLM',
    description: 'Natural language to SQL queries using LangChain for intuitive restaurant data exploration and insights.',
    stack: ['LangChain', 'SQLite', 'Streamlit'],
    github: 'https://github.com/Zinga18018/restaurant-analytics-llm',
    category: 'ai',
    featured: false,
  },
]

export const jobs = [
  {
    title: 'GCCIS Technical Assistant',
    org: 'Rochester Institute of Technology',
    dates: 'Aug 2025 -- Present',
    bullets: [
      'Supporting lab infrastructure across 200+ machines with automated diagnostics',
      'Created documentation system that reduced repeat service requests by 25%',
    ],
  },
  {
    title: 'Research Assistant',
    org: 'Rochester Institute of Technology',
    dates: 'Dec 2024 -- Apr 2025',
    bullets: [
      'Refactored Python data pipelines with Pandas and NumPy, cutting processing time by 75%',
      'Validated research datasets using SQL queries for faculty-led analytics projects',
    ],
  },
]

export const degrees = [
  {
    degree: 'M.S. Data Science',
    school: 'Rochester Institute of Technology, NY',
    year: '2024 -- 2026',
    courses: 'Machine Learning, Deep Learning, Cloud Computing, Big Data Analytics, NLP',
  },
  {
    degree: 'PGP Data Science',
    school: 'Vellore Institute of Technology, India',
    year: '2023 -- 2024',
  },
  {
    degree: 'B.C.A. Computer Applications',
    school: 'New Shores International College, India',
    year: '2020 -- 2023',
  },
]

export const skillGroups = [
  {
    name: 'ML & AI',
    skills: ['PyTorch', 'TensorFlow', 'Transformers', 'scikit-learn', 'XGBoost', 'LangChain', 'Hugging Face', 'spaCy'],
  },
  {
    name: 'Models',
    skills: ['TinyLlama', 'DistilBERT', 'ViT', 'GPT-2', 'VGG19', 'ARIMA', 'Isolation Forest', 'RAG'],
  },
  {
    name: 'Infrastructure',
    skills: ['FastAPI', 'Docker', 'AWS', 'GCP', 'CUDA', 'Airflow', 'CI/CD', 'Linux'],
  },
  {
    name: 'Data',
    skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Plotly', 'Tableau', 'Power BI', 'Streamlit'],
  },
  {
    name: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'ChromaDB', 'Redis', 'Snowflake', 'Spark'],
  },
  {
    name: 'Statistics',
    skills: ['Hypothesis Testing', 'A/B Testing', 'Regression', 'Time Series', 'SciPy', 'SHAP'],
  },
]

export const socialLinks = {
  email: 'kuchimanchiyogesh@gmail.com',
  github: 'https://github.com/Zinga18018',
  linkedin: 'https://linkedin.com/in/yogesh-kuchimanchi',
  huggingface: 'https://huggingface.co/Yogesh18018',
}
