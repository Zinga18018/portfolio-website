# Recruiter-focused portfolio revision

## Scope and source

Based on `Zinga18018/portfolio-website` master commit `56e3374` (restored homepage). The deployed homepage fetched on 2026-10-29 matched `public/official-portfolio.html` byte-for-byte before editing. The existing black/blue design, project charts, video, research route, education, and role dates were preserved. This review does not predict or guarantee hiring outcomes.

## Changes

- Clear early-career Data Scientist / ML Engineer positioning and expected December 2026 graduation in the first screen.
- Three immediate proof paths: accepted NLP research, model evaluation, and Python/SQL product analytics.
- Research and DriftLab moved ahead of specialist genetics and desktop tooling; all six original projects remain, with product analytics added.
- Project narratives make the question, engineering/evaluation decision, result, and limits easy to scan.
- DriftLab's 10,000-trial extension has a readable methods page, downloadable report, source, and complete per-seed evidence. No production false-alert guarantee is implied.
- A printable career summary and explicit résumé-request link reduce contact friction. No unverified résumé PDF was published.
- Skills link to project evidence. The searchable archive is collapsed by default; unverified repository marketing text is not repeated.
- Gene atlas remains interactive below selected work. Native radio targets and keyboard interaction are repaired.
- Added skip link, reduced-motion handling, mobile wrapping, independent non-overlapping case-study cards, and clipboard failure handling.
- Updated React fallback positioning and project order as well as the actual published static homepage.

## Evidence and claim boundaries

- Capstone: existing source/research dashboard plus uploaded résumé corroborate scope, collaborative authorship and accepted-paper status. Submitted-paper findings remain separate from later model audits.
- DriftLab: inspected the completed 2026-10-28 experiment package. 0/10,000 fresh no-drift runs, two-sided Wilson95% upper0.0384%; seeds1040–11039, fixed thresholds, independent model/windows. Trial data are unchanged in the public evidence ZIP. Removed account-specific publication-blocker notes from its Markdown documentation only.
- Product analytics: current source README and saved readout report4,413 fully observed synthetic users; conversion+3.59 percentage points and retention interval failing a declared loss tolerance. The hold decision is uncertainty, not proof of harm or real business lift.
- Clinical and NewsSnap historical scores retain their pre-existing inspected-cohort / training-size / overlap caveats.
- Existing role dates and titles are source-backed self-report, not independently verified employment.

## Preparation verification — 2026-10-29

- The preparation build checked Next compilation, lint/type validation, static generation, and postbuild. Fresh local integration checks are recorded below.
- Static checks: no duplicate IDs, broken same-page fragments, or missing local assets; one H1 on each new/updated HTML page; seven case studies in intended order; collapsed archive;10,000 JSONL records. See `qa/static-checks.json`.
- Homepage JavaScript syntax: `node --check qa/home-script.js`.
- Parent browser review through supported Sites preview: desktop layout, career summary/evidence links, archive matching/empty/reset/collapse, visible atlas label, direct FTO radio selection and ArrowRight to HNF4A. ASCII arrow glyph replacement verified after initial visual issue.
- Scoped narrow-layout checks are recorded in `NARROW_VIEWPORT_QA.md`; fresh local viewport checks are recorded below. No physical-device certification is claimed.

## Integration provenance

The approved revision was recovered from `Yogesh_Career_Portfolio_Revision.zip` in transfer commit `92a8f78f91ed4c1a8e4736472ec6e6f1c2b43519`. Its 10,558,361 bytes match SHA-256 `d2ddf9671c12258dc746dd76b09fcd906c35a25fbfc4b1e1887f9ddcd7ed91ce`. The transfer commit is not merged into the source branch. Generated exports are rebuilt from source and excluded from version control.

## Local integration checks — 2026-10-30

- Rebuilt the actual source revision with Next.js 14.2.35: compilation, lint/type checks, seven static pages, and postbuild passed.
- Replaced the QA script's undeclared `lxml` dependency with Python's standard HTML parser. Fresh checks passed for local assets, fragments, unique IDs, one H1 per page, seven projects, collapsed archive, and all 10,000 bundled records. Homepage JavaScript syntax passed `node --check`.
- Browser checks passed for archive match/empty/reset/collapse states, all five atlas radios on desktop and at 390 CSS pixels, and FTO-to-HNF4A keyboard navigation. The seven case-study cards do not overlap.
- The homepage, career summary, and evidence page had no document overflow at 320 CSS pixels (305 content pixels with the scrollbar). The career-summary link navigated correctly. Browser console errors: zero. These are browser viewport checks, not physical-device certification.
- The React project count now follows the project data, so the seven-item fallback agrees with the published static homepage. The prepared native-radio fix supersedes the earlier local hit-target patch.

## Remaining follow-up

The static homepage retains its existing LinkedIn URL (`/in/yogesh-kuchimanchi`). The simpler React fallback has a different existing URL (`/in/yogeshkuchimanchi/`). The correct destination has not been independently verified, so no guessed replacement was made.
