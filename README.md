# Yogesh Kuchimanchi — Portfolio

A personal data science portfolio focused on selected research and machine-learning projects, with direct links to source code, results, and live demos.

**Live site:** [yogeshkuchimanchi.com](https://yogeshkuchimanchi.com/)

## What is included

- Six selected projects: one recorded desktop-tool demo and five data or research projects with documented results
- A Gene Explorer homepage with a schematic evidence-flow animation; it does not depict causal-gene proof
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

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify

```bash
npm run build
```

Built with Next.js 14, TypeScript, React, and Tailwind CSS. Deployed through Vercel.
The published homepage comes from `public/official-portfolio.html`, copied to `out/index.html`
after the build. `npm run dev` shows a simpler React version with the same featured project order.
