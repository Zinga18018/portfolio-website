const groups = [
  {
    name: 'ML and AI',
    skills: ['PyTorch', 'TensorFlow', 'Transformers', 'Scikit-learn', 'XGBoost', 'TinyLlama', 'DistilBERT', 'ViT'],
  },
  {
    name: 'Infrastructure',
    skills: ['FastAPI', 'Docker', 'AWS', 'GCP', 'Azure', 'CUDA', 'Airflow', 'Linux'],
  },
  {
    name: 'Data',
    skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Plotly', 'Tableau', 'Power BI', 'Seaborn'],
  },
  {
    name: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'ChromaDB', 'MySQL', 'Hadoop', 'Spark'],
  },
  {
    name: 'Languages',
    skills: ['Python', 'Java', 'R', 'SQL', 'Git', 'Jupyter', 'Streamlit'],
  },
  {
    name: 'Statistics',
    skills: ['Hypothesis Testing', 'A/B Testing', 'Regression', 'Time Series', 'SciPy'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="section-container">
        <p className="text-sm font-mono text-accent mb-2">Skills</p>
        <h2 className="text-3xl font-bold text-white mb-10">Technical stack</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g, i) => (
            <div key={i} className="card">
              <h3 className="text-white font-semibold mb-4">{g.name}</h3>
              <div className="flex flex-wrap gap-1.5">
                {g.skills.map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
