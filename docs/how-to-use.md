# How to use PDFjedi

A practical, step-by-step guide for running PDFjedi end-to-end inside Claude Code. Written for developers who have never seen this repo before.

---

## Prerequisites

- A working installation of [Claude Code](https://docs.anthropic.com/claude-code) (CLI, desktop, web, or IDE extension).
- This repository cloned locally:
  ```
  git clone https://github.com/Gxnza48/PDFjedi.git
  cd PDFjedi
  ```
- One or more source PDFs you want to process.

That's it — there is nothing to install, build, or configure. PDFjedi is loaded as context, not executed as code.

---

## The two ways to use PDFjedi

### A) Full pipeline (the default)

Run when you want the complete bundle: requirements → tech spec → UX/UI → security → roadmap → budget → proposal → contract → open questions.

### B) Single skill

Run when you only need one artifact. Each skill in `/skills/` is self-contained.

Most users start with (A) once to see what comes out, then switch to (B) for follow-up edits.

---

## Step-by-step (full pipeline)

### 1. Open Claude Code in this repo

```
cd PDFjedi
claude
```

(Or open the repo in your IDE and start a Claude Code session there.)

### 2. Load the master prompt and skills

Tell Claude to load the framework files. The simplest way:

```
Please load these files and treat them as your operating instructions for this session:
- prompts/master-prompt.md
- prompts/pdf-to-product.md
- skills/pdf-analysis.md
- skills/tech-spec-builder.md
- skills/ux-ui-designer.md
- skills/security-architect.md
- skills/budget-generator.md
- skills/contract-generator.md
- templates/tech-spec-template.md
- templates/contract-template.md
- templates/budget-template.md
- templates/proposal-template.md
```

Claude will confirm. From here, it is **PDFJedi** for the rest of the session.

### 3. Attach the source PDF(s)

Drag-and-drop the PDF(s) into the Claude Code interface, or reference their absolute paths.

### 4. Paste the execution prompt

Open `prompts/pdf-to-product.md`, copy the **Execution prompt** block, fill the **Parameters** section, and paste into the chat.

Minimum parameters to fill:

- `Source PDFs` — filenames or "see attached".
- `Currency` — e.g. `USD`.
- `Pricing model` — `fixed-price` is the most common starting point.
- `Locale & legal jurisdiction` — required for the contract.

Leave everything else as defaults the first time.

### 5. Wait for the run

PDFjedi works through the skills in order. For a 20–40 page brief, expect a few minutes. You'll see Claude announce each artifact as it writes it.

### 6. Review in this order

Open the `output/` folder Claude created. Read in this order — it's the fastest path to a clean bundle:

1. **`99-open-questions.md`** — answer or accept each item. Anything here is information missing from the source.
2. **`01-requirements.md`** — verify nothing important is missing or invented.
3. **`02-tech-spec.md`** + **`04-security-architecture.md`** — engineering sign-off.
4. **`06-budget.md`** — commercial sign-off.
5. **`07-proposal.md`** + **`08-contract.md`** — share with legal / the client only after 1–4 are clean.

If anything in 1–4 needs change, edit in-chat (see "Editing after a run" below) rather than hand-editing the files — that keeps the bundle internally consistent.

---

## Step-by-step (single skill)

When you only need one artifact (e.g. an updated budget after the client changed scope):

### 1. Open Claude Code in this repo, as before.

### 2. Load just what you need

For a budget run, that's:

```
Load:
- prompts/master-prompt.md
- skills/budget-generator.md
- templates/budget-template.md
```

Plus any prior artifacts the skill consumes (in this case `02-tech-spec.md` and `05-roadmap.md` from the previous run).

### 3. Issue the instruction

```
Build a budget for the project described in the attached tech spec.
Currency: USD. Pricing model: fixed-price. Risk reserve: 15%.
Locale: Delaware, USA — taxes not applicable.
```

That's it. One artifact comes back.

---

## Editing after a run

Once you have an `output/` bundle, you'll often need to adjust. Two reliable patterns:

### Pattern 1 — "Re-run with an answer"

If `99-open-questions.md` had open items and you now have answers:

```
Here are answers to the open questions:
- OQ-001: Performance target is P95 < 1.5s.
- OQ-003: Team will be 1 senior, 1 mid engineer, no dedicated QA.
- OQ-007: GDPR is in scope; LGPD is not.

Re-run the pipeline incorporating these answers. Update only the artifacts that change.
```

PDFjedi will identify which artifacts are affected and rewrite only those.

### Pattern 2 — "Targeted change"

If the client changed one thing:

```
The client moved the launch from 2026-09-01 to 2026-10-15 and added a Spanish locale.
Update the roadmap, budget, proposal, and contract. Surface any new open questions.
```

---

## Tips

- **Don't ask for "just a quick proposal."** PDFjedi's proposals are derived from the budget; the budget is derived from the tech spec; the tech spec is derived from the requirements. Skipping the front of the pipeline produces a confidently-wrong proposal. Run the pipeline, then share the proposal — it costs the same time and the bundle is internally consistent.
- **Multiple PDFs are a feature.** Throwing in the brief, the meeting notes, and the security requirements PDF together produces a better result than running them one-by-one, because contradictions get surfaced.
- **Use triage mode for go/no-go.** When you're not sure whether to bid: run the parameter `Mode: triage`. You'll get only the requirements doc + open questions, fast.
- **Keep the source PDFs in the repo or alongside.** PDFjedi cites them by filename. If you rename or move them, citations break.

---

## When PDFjedi pushes back

By design, PDFjedi refuses to:

- Pick a winner when source PDFs contradict each other.
- Invent client identity, jurisdiction, or rate-card numbers.
- Produce a budget without a risk reserve.
- Mark a requirement `Must` when the source language doesn't justify it.

This is not stubbornness — it's the difference between a usable bundle and a plausible-looking one. When you hit this behavior, the right move is to supply the missing input in chat and re-run.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Open questions list is empty | PDFjedi was too credulous about the source | Tell it to be stricter; re-run |
| Budget total doesn't match phases | Pricing model parameter changed mid-run | Restart and set the parameter explicitly |
| Contract references the wrong jurisdiction | `Locale` parameter not supplied | Re-run with the parameter set |
| One artifact contradicts another | A skill was re-run without re-running dependents | Re-run from the earliest affected step |
| Output is generic / marketing-toned | Master prompt not loaded first | Reload `prompts/master-prompt.md` and re-issue |

---

## What's next

- Read `docs/workflow.md` for the full pipeline diagram and skill dependencies.
- Read `docs/system-architecture.md` to extend PDFjedi with new skills or templates.
