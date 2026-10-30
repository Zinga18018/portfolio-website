# Yogesh Kuchimanchi — Portfolio

A personal data science portfolio focused on selected research and machine-learning projects, with direct links to source code, results, and live demos.

**Live site:** [yogeshkuchimanchi.com](https://yogeshkuchimanchi.com/)

## What is included

- Seven selected projects, led by NLP research, model evaluation, and product analytics
- A Gene Explorer secondary interactive atlas based on returned public-source records, not causal-gene proof
- A searchable index of public GitHub repositories
- Résumé-backed experience, education, and technical skills
- Responsive desktop and mobile layouts

## Projects

- [Cardiometabolic GWAS Evidence Explorer](https://github.com/Zinga18018/cardiometabolic-gwas-evidence-explorer)
- [Prompt Rewriter — trailer and continuous demo](https://github.com/Zinga18018/prompt-rewriter)
- [Clinical Readmission Risk Audit](https://github.com/Zinga18018/readmission-risk-audit)
- [NewsSnap](https://github.com/Zinga18018/NewsSnap)
- [DriftLab](https://github.com/Zinga18018/driftlab-model-monitoring-simulator)
- [Product Analytics Experimentation Lab](https://github.com/Zinga18018/product-analytics-experimentation-lab)
- [Women-Safety Research Dashboard](https://yogeshkuchimanchi.com/research/women-safety)

## Preview the published homepage locally

```bash
npm install
npm run build
python -m http.server 8777 --directory out
```

Open `http://localhost:8777/`. `npm run dev` runs the simpler React version;
the published homepage is `public/official-portfolio.html`, copied to `out/index.html` by `postbuild`.

## Evidence shown in the gene atlas

The atlas uses a static Open Targets 26.09 / FinnGen R12 snapshot from
`reports/locus_summary.csv` in the linked Gene Explorer repository. Counts are
returned records, **not evidence strength**. “Not returned” is not a negative
biological finding. The selected source records carry quality-control flags;
the full explorer preserves those flags and the underlying provenance.

## Verify

```bash
npm run build
python qa/verify_static.py
node --check qa/home-script.js
```

The static checks use Python's standard library and verify local links, page structure, project order, and the bundled 10,000-record evidence file.

Built with Next.js 14, TypeScript, React, and Tailwind CSS. Deployed through Vercel.

## Recruiter-focused review (October 2026)

The published static homepage leads with role targets, expected graduation, three evidence paths, and a printable career summary. It preserves historical evaluation limitations and links a reproducible 10,000-trial synthetic DriftLab evidence bundle. No production impact, guaranteed hiring outcome, or unsupported employment claim is implied. The résumé is available by request; the printable summary is not a substitute for a verified résumé.

Run `npm run build`, then serve `out` as above. `npm run dev` remains a simpler React fallback; the production homepage is the static file. Both project lists have been synchronized.
