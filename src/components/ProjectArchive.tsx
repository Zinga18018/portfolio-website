'use client';

import { useMemo, useState } from 'react';

type Project = {
  name: string;
  description: string;
  language: string;
  updated: string;
  category: 'ML & Data' | 'LLM & NLP' | 'Vision & Creative' | 'Apps & Utilities';
  featured?: boolean;
};

const projects: Project[] = [
  { name: 'readmission-risk-audit', description: 'Leakage-aware healthcare readmission modeling, calibration, and drift audit.', language: 'Python', updated: '2026-08-24', category: 'ML & Data', featured: true },
  { name: 'nyc-311-service-monitor', description: 'Public-service operations analysis, volume forecasting, and anomaly monitoring.', language: 'Python', updated: '2026-06-23', category: 'ML & Data', featured: true },
  { name: 'driftlab-model-monitoring-simulator', description: 'Synthetic model-monitoring simulator for drift, degradation, and alert behavior.', language: 'Python', updated: '2026-06-21', category: 'ML & Data', featured: true },
  { name: 'womens-safety-discourse-dashboard', description: 'Aggregate-only research dashboard for public discourse across women-safety cases.', language: 'Python', updated: '2026-06-21', category: 'LLM & NLP', featured: true },
  { name: 'rag-evaluation-deployment-api', description: 'Deployable RAG evaluation API with citations, retrieval tests, and reproducible metrics.', language: 'Python', updated: '2026-06-16', category: 'LLM & NLP', featured: true },
  { name: 'product-analytics-experimentation-lab', description: 'Product analytics and A/B testing with Python, SQL, Streamlit, and reproducible metrics.', language: 'Python', updated: '2026-06-09', category: 'ML & Data', featured: true },
  { name: 'ML-Portfolio-Projects', description: 'A public collection of machine-learning portfolio work.', language: 'Python', updated: '2026-04-27', category: 'ML & Data' },
  { name: 'rag-document-brain', description: 'RAG pipeline with sentence-transformer embeddings, ChromaDB search, and TinyLlama synthesis.', language: 'Python', updated: '2026-04-27', category: 'LLM & NLP' },
  { name: 'ai-code-reviewer', description: 'FastAPI code-review server using TinyLlama, streaming responses, and severity classification.', language: 'Python', updated: '2026-04-27', category: 'LLM & NLP' },
  { name: 'image-captioner', description: 'Image-to-text generation with a ViT encoder, GPT-2 decoder, beam search, and FastAPI.', language: 'Python', updated: '2026-04-27', category: 'Vision & Creative' },
  { name: 'sentiment-engine', description: 'Sentiment analysis API with DistilBERT, batch processing, and trend visualization.', language: 'Python', updated: '2026-04-27', category: 'LLM & NLP' },
  { name: 'multi-agent-orchestrator', description: 'Multi-agent LLM framework with a planner, domain experts, and a synthesizer.', language: 'Python', updated: '2026-04-27', category: 'LLM & NLP' },
  { name: 'portfolio-website', description: 'Interactive portfolio website built with Next.js, TypeScript, and Tailwind CSS.', language: 'TypeScript', updated: '2026-04-09', category: 'Apps & Utilities' },
  { name: 'credit-card-default-prediction', description: 'Machine-learning pipeline for credit-card default prediction exposed through FastAPI.', language: 'Python', updated: '2026-04-09', category: 'ML & Data' },
  { name: 'restaurant-analytics-llm', description: 'Restaurant analytics dashboard with natural-language SQL, Streamlit, and SQLite.', language: 'Python', updated: '2026-04-09', category: 'LLM & NLP' },
  { name: 'Multimodal-Anomaly-Detection-with-Synthetic-Augmentation', description: 'Ensemble anomaly detection with Isolation Forest, LOF, DBSCAN, and synthetic augmentation.', language: 'Python', updated: '2026-04-09', category: 'ML & Data' },
  { name: 'Time-Series-Forecasting-with-Transformer-Architectures', description: 'Time-series benchmarking with ARIMA, Holt-Winters, and automated feature engineering.', language: 'Python', updated: '2026-04-09', category: 'ML & Data' },
  { name: 'NewsSnap', description: 'Full-stack news application with a DistilBERT workflow, React dashboard, CI/CD, and Docker.', language: 'Python', updated: '2026-04-09', category: 'LLM & NLP' },
  { name: 'Knowledge-Graph-Construction-and-Reasoning-Engine', description: 'NER-driven knowledge-graph construction with PyVis and community detection.', language: 'Python', updated: '2026-04-09', category: 'LLM & NLP' },
  { name: 'Neural-Style-Transfer-and-Generative-Art-Lab', description: 'VGG19 neural style transfer and procedural generative-art experiments.', language: 'Python', updated: '2026-04-09', category: 'Vision & Creative' },
  { name: 'ML-Model-Monitoring-and-Data-Drift-Detection', description: 'Model-monitoring dashboard using KS, PSI, and Jensen-Shannon drift measures.', language: 'Python', updated: '2026-04-09', category: 'ML & Data' },
  { name: 'Ipynb_Project_Snippets', description: 'A public collection of project notebooks and experiments.', language: 'Jupyter Notebook', updated: '2026-02-12', category: 'ML & Data' },
  { name: 'SymptomAid-AI', description: 'Educational symptom-analysis tool using Ollama and Streamlit with safety disclaimers.', language: 'Python', updated: '2026-02-07', category: 'LLM & NLP' },
  { name: 'stock-sentiment-dashboard', description: 'NLP sentiment dashboard comparing stock discussion with market-price trends.', language: 'Python', updated: '2026-02-05', category: 'ML & Data' },
  { name: 'MetalVision-AI', description: 'Metal-surface defect detection experiments using PyTorch, CNNs, attention, and ensembles.', language: 'Python', updated: '2026-02-05', category: 'Vision & Creative' },
  { name: 'Hecs-Refactoring', description: 'Public Python refactoring repository; source and documentation are available on GitHub.', language: 'Python', updated: '2025-11-03', category: 'Apps & Utilities' },
  { name: 'DataGuard-AI', description: 'CSV data-quality application for missing values, outliers, duplicates, and type issues.', language: 'Python', updated: '2025-10-20', category: 'ML & Data' },
  { name: 'Job-Hustles', description: 'Public repository; source and documentation are available on GitHub.', language: 'Repository', updated: '2025-08-30', category: 'Apps & Utilities' },
  { name: 'imdb-sentiment-analysis-deep-learning', description: 'Deep-learning experiments for IMDB movie-review sentiment analysis.', language: 'Repository', updated: '2025-06-25', category: 'LLM & NLP' },
  { name: 'Wispr-Clone', description: 'Public Python application repository; source and documentation are available on GitHub.', language: 'Python', updated: '2025-06-25', category: 'Apps & Utilities' },
  { name: 'NeuroCanvas', description: 'Creative AI platform for art generation, emotion analysis, and narrative experiences.', language: 'Repository', updated: '2025-06-18', category: 'Vision & Creative' },
  { name: 'Project-Aegis', description: 'Public Python project; source and documentation are available on GitHub.', language: 'Python', updated: '2025-06-17', category: 'Apps & Utilities' },
  { name: 'NeuroCanvas-AI-Art-Generator', description: 'Multimodal emotional-art generation with contextual memory and narrative output.', language: 'Python', updated: '2025-06-16', category: 'Vision & Creative' },
  { name: 'time-chronicles-ai', description: 'Interactive AI-assisted historical storytelling application with multimodal narratives.', language: 'JavaScript', updated: '2025-06-15', category: 'Vision & Creative' },
  { name: 'ai-slide-deck-generator', description: 'Presentation generator using Gemini with style, chart, and speaker-note workflows.', language: 'HTML', updated: '2025-06-15', category: 'LLM & NLP' },
  { name: 'ml-digits-exploration', description: 'Foundational machine-learning exploration using a handwritten-digits dataset.', language: 'Python', updated: '2025-06-15', category: 'ML & Data' },
  { name: 'ml-iris-data-analysis', description: 'Foundational machine-learning analysis using the Iris dataset.', language: 'Python', updated: '2025-06-15', category: 'ML & Data' },
  { name: 'ollama-image-recognition-tool', description: 'Flask image-recognition application using Ollama and a multimodal model.', language: 'HTML', updated: '2025-06-15', category: 'Vision & Creative' },
  { name: 'Python-Script', description: 'Python utility for detecting duplicate files.', language: 'Python', updated: '2025-06-15', category: 'Apps & Utilities' },
  { name: 'mycelial-memories', description: 'AI-assisted exploration of historical letters visualized as living fungal networks.', language: 'JavaScript', updated: '2025-06-15', category: 'Vision & Creative' },
  { name: 'sonic-symbiosis', description: 'Creative AI project generating therapeutic soundscapes from plant bioacoustic data.', language: 'HTML', updated: '2025-06-15', category: 'Vision & Creative' },
  { name: 'echo-muse-therapeutic-storytelling', description: 'AI-assisted storytelling companion with personalized narratives and ambient soundscapes.', language: 'Python', updated: '2025-06-15', category: 'Vision & Creative' },
  { name: 'customer-churn-prediction', description: 'Machine-learning project for customer-churn prediction.', language: 'Python', updated: '2025-05-23', category: 'ML & Data' },
];

const filters = ['All 43', 'Featured 6', 'ML & Data', 'LLM & NLP', 'Vision & Creative', 'Apps & Utilities'] as const;

export default function ProjectArchive() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All 43');
  const [query, setQuery] = useState('');

  const visibleProjects = useMemo(() => {
    const search = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesFilter = filter === 'All 43'
        || (filter === 'Featured 6' && project.featured)
        || project.category === filter;
      const matchesSearch = !search
        || `${project.name} ${project.description} ${project.language}`.toLowerCase().includes(search);
      return matchesFilter && matchesSearch;
    });
  }, [filter, query]);

  return (
    <section className="project-atlas" id="project-atlas" aria-labelledby="project-atlas-title">
      <div className="atlas-heading">
        <div>
          <p className="kicker">GITHUB PROJECTS · 43 REPOSITORIES</p>
          <h2 id="project-atlas-title">Project archive.</h2>
          <p>Browse my public GitHub projects by topic.</p>
        </div>
        <a href="https://github.com/Zinga18018?tab=repositories" target="_blank" rel="noreferrer">Open GitHub profile ↗</a>
      </div>

      <div className="atlas-controls">
        <label>
          <span>SEARCH PROJECTS</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: RAG, vision, drift…" />
        </label>
        <div className="atlas-filters" aria-label="Filter project archive">
          {filters.map((item) => (
            <button key={item} type="button" className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>
          ))}
        </div>
      </div>

      <div className="atlas-readout"><span>SHOWING {visibleProjects.length.toString().padStart(2, '0')} / 43</span><span>GITHUB SNAPSHOT · 2026-08-24</span></div>
      <div className="archive-grid">
        {visibleProjects.map((project) => (
          <article key={project.name}>
            <div className="archive-meta">
              <span>{(projects.indexOf(project) + 1).toString().padStart(2, '0')}</span>
              <span>{project.featured ? 'FEATURED ABOVE' : project.category}</span>
            </div>
            <h3>{project.name.replaceAll('-', ' ')}</h3>
            <p>{project.description}</p>
            <div className="archive-footer"><span>{project.language}</span><time>{project.updated}</time></div>
            <a className="archive-link" href={`https://github.com/Zinga18018/${project.name}`} target="_blank" rel="noreferrer">View source ↗</a>
          </article>
        ))}
      </div>
      {visibleProjects.length === 0 && <p className="archive-empty">No project matched that search. Try a broader keyword.</p>}
    </section>
  );
}
