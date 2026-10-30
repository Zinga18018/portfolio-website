# Narrow-viewport QA addendum — 2026-10-29 06:45 UTC

Tested exact private Sites source commit 10c6d05aa6b051bf85066f03c33d28c287e19b37 using the supported local Sites preview and cloud Chrome browser.

## Method and limitations
A temporary local-only harness embedded unchanged pages in 320, 390 and 430 CSS-pixel-wide, 844-pixel-high iframes. Browser scrollbars reduced content client widths to 305, 375 and 415 pixels. This tests real responsive document layout and CSS media queries, but is NOT physical-phone, touch-input, mobile-user-agent, Safari or device emulation testing. The browser has no supported resize/emulation API. Screenshots were inspected internally; not distributed because screenshots were not requested as user deliverables.

## Verified
- Hero, primary navigation and project layout visibly readable at narrow widths.
- Main document scrollWidth equals clientWidth at all three tested widths: no horizontal document overflow.
- At smallest width, Projects navigation works; archive expands and filters to 1 result for driftlab, 0 for zzznomatch, and 48 after clearing. Collapse works.
- At smallest width, native FTO radio selects the FTO panel (chr16:53,793,567); ArrowRight selects HNF4A (chr20:44,354,839). Controls render in a three-plus-two grid.
- Career summary navigation and readable wrapping verified at 320 and 390 widths, with no document horizontal overflow.
- Evidence navigation and readable wrapping verified at 320 and 430 widths, with no document horizontal overflow. Synthetic scope and confidence interval remain adjacent to result.

No defect requiring source changes or redeployment was identified. The temporary harness was removed and is excluded from this ZIP. Public website and GitHub remain unchanged; private review deployment unchanged. Earlier statements that narrow visual QA was not run are superseded by this scoped addendum, not by a claim of full mobile-device certification.
