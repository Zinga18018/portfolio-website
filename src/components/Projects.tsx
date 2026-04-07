const projects = [
  {
    category: 'AI',
    title: 'AI Code Reviewer',
    desc: 'TinyLlama-1.1B code review with severity classification and KV-cache optimization.',
    tags: ['TinyLlama-1.1B', 'FastAPI', 'PyTorch'],
    github: 'https://github.com/Zinga18018/ai-code-reviewer',
    demo: 'https://huggingface.co/spaces/Yogesh18018/ai-code-reviewer',
  },
  {
    category: 'AI',
    title: 'RAG Document Brain',
    desc: 'Retrieval-augmented generation with 384d sentence embeddings, ChromaDB vector search, and TinyLlama synthesis.',
    tags: ['Sentence-Transformers', 'ChromaDB', 'FastAPI'],
    github: 'https://github.com/Zinga18018/rag-document-brain',
    demo: 'https://huggingface.co/spaces/Yogesh18018/rag-document-brain',
  },
  {
    category: 'AI',
    title: 'Sentiment Engine',
    desc: 'DistilBERT (67M params) real-time sentiment analysis with batch processing and trend visualization.',
    tags: ['DistilBERT', 'FastAPI', 'Docker'],
    github: 'https://github.com/Zinga18018/sentiment-engine',
    demo: 'https://huggingface.co/spaces/Yogesh18018/sentiment-engine',
  },
  {
    category: 'AI',
    title: 'Image Captioner',
    desc: 'ViT encoder + GPT-2 decoder for image-to-text generation with beam search.',
    tags: ['ViT', 'GPT-2', 'FastAPI'],
    github: 'https://github.com/Zinga18018/image-captioner',
    demo: 'https://huggingface.co/spaces/Yogesh18018/image-captioner',
  },
  {
    category: 'AI',
    title: 'Multi-Agent Orchestrator',
    desc: 'Specialized LLM agents with planner, domain experts, and synthesizer using chain-of-thought reasoning.',
    tags: ['TinyLlama', 'Agent Framework', 'FastAPI'],
    github: 'https://github.com/Zinga18018/multi-agent-orchestrator',
    demo: 'https://huggingface.co/spaces/Yogesh18018/multi-agent',
  },
  {
    category: 'ML',
    title: 'Neural Style Transfer Lab',
    desc: 'Gatys et al. style transfer with VGG19 plus procedural generative art -- fractals, flow fields, wave interference.',
    tags: ['PyTorch', 'VGG19', 'Streamlit'],
    github: 'https://github.com/Zinga18018/Neural-Style-Transfer-and-Generative-Art-Lab',
    demo: 'https://huggingface.co/spaces/Yogesh18018/neural-style-transfer',
  },
  {
    category: 'ML',
    title: 'Time-Series Forecasting',
    desc: 'Multi-model benchmarking with ARIMA, Holt-Winters, and regression. Automated feature engineering.',
    tags: ['statsmodels', 'ARIMA', 'Streamlit'],
    github: 'https://github.com/Zinga18018/Time-Series-Forecasting-with-Transformer-Architectures',
    demo: 'https://huggingface.co/spaces/Yogesh18018/time-series-forecasting',
  },
  {
    category: 'ML',
    title: 'Anomaly Detection',
    desc: 'Five detection algorithms with ensemble voting and synthetic data augmentation for imbalanced datasets.',
    tags: ['Isolation Forest', 'DBSCAN', 'Streamlit'],
    github: 'https://github.com/Zinga18018/Multimodal-Anomaly-Detection-with-Synthetic-Augmentation',
    demo: 'https://huggingface.co/spaces/Yogesh18018/anomaly-detection',
  },
  {
    category: 'ML',
    title: 'Drift Detection',
    desc: 'Real-time model monitoring with KS test, PSI, and Jensen-Shannon divergence.',
    tags: ['scikit-learn', 'SciPy', 'Streamlit'],
    github: 'https://github.com/Zinga18018/ML-Model-Monitoring-and-Data-Drift-Detection',
    demo: 'https://huggingface.co/spaces/Yogesh18018/drift-detection',
  },
  {
    category: 'ML',
    title: 'Knowledge Graph Engine',
    desc: 'NER-driven knowledge graph with interactive PyVis visualization and community detection.',
    tags: ['spaCy', 'NetworkX', 'Streamlit'],
    github: 'https://github.com/Zinga18018/Knowledge-Graph-Construction-and-Reasoning-Engine',
    demo: 'https://huggingface.co/spaces/Yogesh18018/knowledge-graph-engine',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="section-container">
        <p className="text-sm font-mono text-accent mb-2">Projects</p>
        <h2 className="text-3xl font-bold text-white mb-4">Deployed systems</h2>
        <p className="text-zinc-400 mb-12 max-w-xl">
          10 production systems with live demos on Hugging Face. Each runs real inference.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <article key={i} className="card group">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  p.category === 'AI'
                    ? 'bg-accent/15 text-accent'
                    : 'bg-emerald-500/15 text-emerald-400'
                }`}>
                  {p.category}
                </span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {p.tags.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <div className="flex gap-4 text-sm">
                <a href={p.github} target="_blank" rel="noopener"
                  className="text-zinc-400 hover:text-white transition-colors">
                  Source
                </a>
                <a href={p.demo} target="_blank" rel="noopener"
                  className="text-accent hover:text-white transition-colors">
                  Live demo
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
