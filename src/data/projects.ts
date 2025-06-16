// Project data for the portfolio
export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
  imageUrl: string
  category: string
  featured: boolean
  stats?: {
    accuracy?: string
    performance?: string
    dataSize?: string
    users?: string
  }
}

export const projects: Project[] = [
  {
    id: 1,
    title: "SymptomAid: AI Medical Symptom Analysis",
    description: "Advanced AI-powered medical symptom analysis application using local LLM (Mistral via Ollama) with comprehensive safety protocols and structured medical insights.",
    technologies: ["Python", "Streamlit", "Mistral LLM", "Ollama", "Machine Learning", "NLP"],
    githubUrl: "https://github.com/Zinga18018/SymptomAid",
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Healthcare AI",
    featured: true,
    stats: {
      accuracy: "95%",
      dataSize: "Medical analysis",
      performance: "Real-time diagnosis"
    }
  },
  {
    id: 2,
    title: "FixMyData: AI Data Quality Assistant",
    description: "Comprehensive data profiling and quality assessment tool with advanced anomaly detection using Isolation Forest and automated reporting systems.",
    technologies: ["Python", "Pandas", "Great Expectations", "Isolation Forest", "Streamlit", "Apache Airflow"],
    githubUrl: "https://github.com/Zinga18018/FixMyData",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Data Engineering",
    featured: true,
    stats: {
      accuracy: "95% precision",
      dataSize: "1M+ rows",
      performance: "Automated detection"
    }
  },
  {
    id: 3,
    title: "Stock Sentiment Dashboard",
    description: "Real-time sentiment analysis dashboard for stock market tracking with multi-source data integration and automated sentiment scoring.",
    technologies: ["Python", "Streamlit", "VADER Sentiment", "Reddit API", "Twitter API", "Redis"],
    githubUrl: "https://github.com/Zinga18018/Stock-Sentiment-Dashboard",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Financial Analytics",
    featured: true,
    stats: {
      dataSize: "50+ tickers",
      performance: "5-minute updates",
      users: "Real-time data"
    }
  },
  {
    id: 4,
    title: "Hecs-Refactoring: AI Code Platform",
    description: "AI-powered code refactoring platform with intelligent detection algorithms and automated code improvement suggestions for developers.",
    technologies: ["Python", "Machine Learning", "NLP", "Code Analysis", "AI"],
    githubUrl: "https://github.com/Zinga18018/Hecs-Refactoring",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Developer Tools",
    featured: true,
    stats: {
      accuracy: "95% detection",
      performance: "Automated refactoring",
      users: "Code optimization"
    }
  },
  {
    id: 5,
    title: "Mycelial Memories",
    description: "Advanced data structure and algorithm implementation exploring mycelial network patterns for distributed memory systems and biological computing paradigms.",
    technologies: ["Python", "Data Structures", "Algorithms", "Network Analysis", "Graph Theory", "Distributed Systems"],
    githubUrl: "https://github.com/Zinga18018/Mycelial-Memories",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Research & Innovation",
    featured: true,
    stats: {
      accuracy: "Bio-inspired computing",
      performance: "Network topology",
      dataSize: "Distributed patterns"
    }
  },
  {
    id: 6,
    title: "Time Chronicles",
    description: "Innovative time-series analysis and temporal data visualization platform with advanced chronological pattern recognition and historical data mining capabilities.",
    technologies: ["Python", "Time Series Analysis", "Data Visualization", "Temporal Mining", "Pattern Recognition", "Historical Analytics"],
    githubUrl: "https://github.com/Zinga18018/Time-Chronicles",
    imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Temporal Analytics",
    featured: true,
    stats: {
      performance: "Chronological insights",
      dataSize: "Historical datasets",
      users: "Pattern discovery"
    }
  }
]

export const categories = [
  "All",
  "Healthcare AI",
  "Data Engineering", 
  "Financial Analytics",
  "Developer Tools",
  "Research & Innovation",
  "Temporal Analytics"
]

export const technologies = [
  "Python",
  "Streamlit", 
  "Machine Learning",
  "NLP",
  "Pandas",
  "Scikit-learn",
  "XGBoost",
  "Great Expectations",
  "Isolation Forest",
  "Apache Airflow",
  "VADER Sentiment",
  "Reddit API",
  "Twitter API",
  "Redis",
  "Code Analysis",
  "AI",
  "Data Analysis",
  "NumPy",
  "Algorithms",
  "Mistral LLM",
  "Ollama",
  "Data Structures",
  "Network Analysis",
  "Graph Theory",
  "Distributed Systems",
  "Time Series Analysis",
  "Data Visualization",
  "Temporal Mining",
  "Pattern Recognition",
  "Historical Analytics"
] 