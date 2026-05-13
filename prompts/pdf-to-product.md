# Execution Prompt — PDF → Product

> Reusable, copy-paste execution prompt. Load this *after* `master-prompt.md` to run the full PDFjedi pipeline end-to-end. Use it verbatim or as a starting point.

---

## When to use this prompt

Use it when you want PDFjedi to do the full job: take one or more source PDFs and emit the complete bundle of artifacts (requirements → tech spec → UX/UI → security → roadmap → budget → proposal → contract → open questions).

For single-artifact runs, use the per-skill instructions in `/skills/<skill>.md` instead — they're lighter and more direct.

---

## How to invoke

In a Claude Code session in this repo:

1. Load the files:
   ```
   /prompts/master-prompt.md
   /skills/pdf-analysis.md
   /skills/tech-spec-builder.md
   /skills/ux-ui-designer.md
   /skills/security-architect.md
   /skills/budget-generator.md
   /skills/contract-generator.md
   /templates/tech-spec-template.md
   /templates/contract-template.md
   /templates/budget-template.md
   /templates/proposal-template.md
   ```
2. Attach the source PDF(s).
3. Paste the **Execution prompt** below (filling in the parameter block).

---

## Execution prompt (copy from here)

```
You are PDFJedi. Follow master-prompt.md exactly.

# Parameters
- Mode: full
- Source PDFs: <list filenames or "see attached">
- Target stack (if known): <e.g. "Next.js + Postgres + Vercel", or "unspecified — choose boringly">
- Pricing model: <fixed-price | time-and-materials | retainer | unspecified>
- Risk reserve: <%, default 15>
- Currency: <e.g. USD>
- Locale & legal jurisdiction (for contract): <e.g. "Argentina, Spanish-language contract" or "Delaware, USA, English">
- Output directory: output/

# Run the pipeline
1. Load every file in /skills/ and /templates/. Treat them as authoritative.
2. Invoke pdf-analysis on the source PDFs.
   - Extract structured requirements (REQ-IDs).
   - If multiple PDFs were supplied, merge them and surface contradictions.
   - Write output/01-requirements.md (template: implicit; see skill).
3. Invoke tech-spec-builder against the requirements.
   - Write output/02-tech-spec.md using /templates/tech-spec-template.md.
4. Invoke ux-ui-designer.
   - Write output/03-ux-ui-system.md.
5. Invoke security-architect.
   - Write output/04-security-architecture.md.
6. Produce a roadmap inline.
   - Phases, milestones, dependencies, critical path.
   - Write output/05-roadmap.md.
7. Invoke budget-generator using the chosen pricing model + risk reserve.
   - Line items must reference REQ-IDs from step 2.
   - Write output/06-budget.md using /templates/budget-template.md.
8. Produce a client-facing proposal inline.
   - Use /templates/proposal-template.md.
   - Audience: non-engineer decision-maker.
   - Write output/07-proposal.md.
9. Invoke contract-generator.
   - Honor locale + jurisdiction in parameters.
   - Deliverables must match the proposal one-to-one.
   - Write output/08-contract.md using /templates/contract-template.md.
10. Emit output/99-open-questions.md aggregating every open question from every step.

# Quality gates (run before responding)
- Every numeric claim cited.
- Every REQ-ID referenced from at least one of: tech spec, UX/UI, budget.
- No template placeholders remain.
- Roadmap critical path consistent with budget phasing.
- Contract deliverables == proposal deliverables.
- Open-questions register non-empty (if it would be empty, you almost certainly hallucinated — re-check).

# Final response
After writing files, output a ≤10-line chat summary:
- Files produced (paths).
- # of open questions; top 3 blocking ones.
- Source-document risks (e.g. undated, conflicting, missing pages).
- Recommended next user action.

Do not repeat artifact contents in the chat.
```

---

## Parameter notes

**`Target stack`** — leave as "unspecified" unless the PDF or the user actually constrains it. PDFjedi will choose a boring, hireable stack and call out its reasoning.

**`Pricing model`** — affects the budget structure heavily:

- *Fixed-price* → line-itemized scope with a risk reserve, milestone-based payment.
- *Time-and-materials* → rate card + estimated hours per workstream + cap (if any).
- *Retainer* → recurring monthly bundle of capacity + scope ceiling.

**`Risk reserve`** — default 15%. Drop to 10% only if the source PDF is unusually well-specified. Go to 20–25% if the PDF is a discovery doc or has many open questions.

**`Locale & jurisdiction`** — drives contract language, governing law clause, currency formatting, VAT/IVA/GST treatment, signature conventions. Don't skip it; the contract is unsignable without it.

---

## Variations

### Triage only (fast read)

Run just steps 1 and 10. Useful for go/no-go decisions on RFPs.

### Quote only

Run steps 1, 2, 6, 7, 8. Skip UX/UI and security. Useful when the client only wants a number.

### Discovery follow-up

Run only step 1, then iterate with the user on `99-open-questions.md` before re-running the full pipeline. Often the cheapest path to a usable bundle.

---

## After the run

The generated `output/` folder is the deliverable. The recommended human review order is:

1. `99-open-questions.md` — answer or accept each item before sharing externally.
2. `01-requirements.md` — verify nothing is missing or invented.
3. `02-tech-spec.md` + `04-security-architecture.md` — engineering sign-off.
4. `06-budget.md` — commercial sign-off.
5. `07-proposal.md` + `08-contract.md` — legal & client-facing review.

Once 1–4 are clean, 7 and 8 should require only cosmetic edits.
