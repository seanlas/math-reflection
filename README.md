# My Math Reflection

Public demonstration. All 36 sample responses, nine demo learner identities, assessment dates, scores, and reflections are generated fiction. This repository starts with a clean history and contains no real student data, source workbooks, private import packs, or private Site identifiers.

The GitHub Pages workflow publishes only `dist/` after the synthetic-data checks pass. Imported files are processed locally in the visitor's browser and never enter this repository.

Teacher review dashboard for Grade 10 MYP, Grade 11 AA HL, and Grade 12 AA SL.

Serve `dist/` with a static HTTP server, for example `python -m http.server 8765 --directory dist`, then open http://localhost:8765. No build or package installation is required.

The default demonstration contains **36 entirely fictional responses** across nine demo learners and three courses. Names and `example.com` addresses are invented. The sample generator never reads a real workbook. It includes varied prediction gaps, criterion histories, and one missing actual result.

Choose **Import & manage data** to load a data pack or survey Excel workbook for a selected course. Download the fictional sample pack from the dialog to test imports. Regenerate the samples with `node scripts/generate-sample-data.mjs`.

Imported responses remain in browser memory and clear on reload. Plans are saved only when the user chooses **Save on this device**. This teacher workspace is not an authenticated portal for individual students; choosing a name is a filter, not access control. The deployed source contains only illustrative demo responses.

Prediction metrics use complete score pairs and preserve missing scores. The signed gap is actual minus predicted. Exact-match and within-one-level rates show their denominators. Average distance is the mean absolute gap. Grade 10 calculations use the selected criterion; the order of criteria in a response maps its first and second score fields. Extra second scores without a selected second criterion are excluded and flagged.

History uses recorded assessment dates without silently correcting them. Future dates and missing dates are flagged. Same-day papers stay as separate responses identified by response ID. Topics are retained verbatim. Class date filters do not infer common assessment identities from free-text topics.

Only synthetic samples belong in this repository. Keep real student workbooks and import packs outside the checkout. Spreadsheet formats, private-data folders, private import packs, and environment secrets are excluded by `.gitignore`.

Checks: `node --check dist/app.js` and `node scripts/check-sample-data.mjs`.

Static site: serve `dist/`. SheetJS CE 0.20.3 is distributed under Apache-2.0 (https://git.sheetjs.com/sheetjs/sheetjs/src/tag/v0.20.3/LICENSE). No workbook data is sent to SheetJS or another service.
