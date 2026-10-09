# Yogesh Kuchimanchi — Portfolio

A personal data science portfolio focused on selected research and machine-learning projects, with direct links to source code, results, and live demos.

**Live site:** [yogeshkuchimanchi.com](https://yogeshkuchimanchi.com/)

## What is included

- Six selected projects: one recorded desktop-tool demo and five data or research projects with documented results
- A Gene Explorer homepage atlas based on returned public-source records, not causal-gene proof
- A searchable index of public GitHub repositories
- Résumé-backed experience, education, and technical skills
- Responsive desktop and mobile layouts

## Projects

- [Cardiometabolic GWAS Evidence Explorer](https://github.com/Zinga18018/cardiometabolic-gwas-evidence-explorer)
- [Prompt Rewriter — trailer and continuous demo](https://github.com/Zinga18018/prompt-rewriter)
- [Clinical Readmission Risk Audit](https://github.com/Zinga18018/readmission-risk-audit)
- [NewsSnap](https://github.com/Zinga18018/NewsSnap)
- [DriftLab](https://github.com/Zinga18018/driftlab-model-monitoring-simulator)
- [Women-Safety Research Dashboard](https://yogeshkuchimanchi.com/research/women-safety)

## Preview the published homepage locally

```bash
npm install
npm run build
python -m http.server 8777 --directory out
```

Open `http://localhost:8777/`. `npm run dev` runs the simpler React version;
the published homepage is `public/official-portfolio.html`, copied to `out/index.html` by `postbuild`.

## Evidence shown in the hero

The atlas uses a static Open Targets 26.09 / FinnGen R12 snapshot from
`reports/locus_summary.csv` in the linked Gene Explorer repository. Counts are
returned records, **not evidence strength**. “Not returned” is not a negative
biological finding. The selected source records carry quality-control flags;
the full explorer preserves those flags and the underlying provenance.

## Verify

```bash
npm run build
```

Built with Next.js 14, TypeScript, React, and Tailwind CSS. Deployed through Vercel.
