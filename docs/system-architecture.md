# System Architecture

How PDFjedi is built — and how to extend it without breaking it.

---

## Mental model

PDFjedi is **prompts and contracts**, not code. There is no runtime, no executor, no daemon. The system is three layers of plain-text files that Claude loads into its working context:

```
┌──────────────────────────────────────────────────────────────┐
│  Layer 1 — Master prompt                                     │
│    prompts/master-prompt.md                                  │
│    Defines the PDFJedi role, operating contract, pipeline.   │
│    Loaded first. Always in effect.                           │
└──────────────────────────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│  Layer 2 — Skills (modular)                                  │
│    skills/*.md                                               │
│    Each defines one role, its inputs, its process, its       │
│    output schema, and its quality checks.                    │
│    Skills do not invoke each other; the master prompt        │
│    invokes them in order.                                    │
└──────────────────────────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│  Layer 3 — Templates (structural contracts)                  │
│    templates/*.md                                            │
│    Each defines the section structure of an output artifact. │
│    Skills fill templates; templates do not contain logic.    │
└──────────────────────────────────────────────────────────────┘
```

A fourth (optional) layer is the **execution prompt** in `prompts/pdf-to-product.md` — a copy-paste runbook that parameterizes a full-pipeline run. You can swap it for your own.

---

## Why three layers

We separate concerns so each part can change independently:

- **Master prompt** changes when the *philosophy* of PDFjedi changes (rules, voice, what's never done). Rare.
- **Skills** change when a *process* changes (how to do PDF analysis, how to estimate a budget). Occasional.
- **Templates** change when an *output schema* changes (a new section in the contract, a new field in the budget). Frequent — driven by client feedback.

Keeping templates separate from skills means you can rebrand or relocalize PDFjedi by editing only templates. The skills still work.

---

## File responsibilities

### `prompts/master-prompt.md`
- Defines the `PDFJedi` role.
- Sets the operating contract (grounding, no invention, one skill one job, templates as contract, reasoning visible).
- Lists the pipeline.
- Provides reasoning rules (disambiguation, cheapest-credible interpretation, etc).
- Defines quality gates that apply to every artifact.
- **Must be loaded first** in every session.

### `prompts/pdf-to-product.md`
- A reusable runbook for full-pipeline runs.
- Parameter block + step-by-step instructions.
- Variations: triage, quote-only, discovery.

### `skills/*.md`
Every skill file follows the same internal structure:

```
# Skill — <name>
> One-line purpose.
## Role
## Inputs
## Process       (numbered steps)
## Output        (exact schema + footer)
## Quality checks
## Anti-patterns
```

Add a skill by writing a new file with that structure and adding it to the pipeline in `master-prompt.md`.

### `templates/*.md`
Every template defines the *structure* of an output artifact. Templates contain:

- A metadata header (project, client, version, source documents).
- Numbered sections — fixed and load-bearing.
- Tables with column headers — fixed.
- Bracketed placeholders for fields the skill will fill (`[PROJECT NAME]`, `[YYYY-MM-DD]`).
- A "How this was derived" footer.

Templates contain **no instructions** to the model. All instructions belong in skills.

### `docs/*.md`
Documentation for humans. Not loaded into Claude's context during a run.

### `examples/`
- `input/` — a sample source description (since we can't ship real client PDFs).
- `output/` — a sample bundle showing what a clean run produces.

---

## Extension model

### To add a new artifact type (e.g. "Press release")

1. Create `templates/press-release-template.md` with the section structure.
2. Create `skills/press-release-writer.md` following the standard skill structure. Inputs: which earlier artifacts (probably `02-tech-spec.md` and `07-proposal.md`). Output: `XX-press-release.md`.
3. Add the new step to the pipeline table in `prompts/master-prompt.md`.
4. Optionally add a runbook variation in `prompts/pdf-to-product.md`.

That's it — no code changes.

### To localize for a new jurisdiction

1. Edit `templates/contract-template.md` to add jurisdiction-specific clauses (or fork it as `contract-template.<locale>.md`).
2. Add the new locale to the jurisdiction table in `skills/contract-generator.md`.
3. Update the `Locale` parameter examples in `prompts/pdf-to-product.md`.

### To change a project's *voice* (e.g. corporate vs scrappy)

Edit the "Tone for client-facing artifacts" section of `master-prompt.md`, or fork the master prompt as `master-prompt.corporate.md` and load it in place of the default.

### To swap the default stack

Edit the "Default starting point" block in `skills/tech-spec-builder.md`. No other file is affected.

---

## Composition rules

- **Skills are leaves, not internal nodes.** A skill never invokes another skill. The master prompt orchestrates.
- **Templates are structural, not behavioral.** Don't put instructions inside templates; they'll get filled into the output.
- **One file, one responsibility.** If a file does two things, split it.
- **Idempotent re-runs.** A skill given the same inputs must produce the same output (modulo Claude's natural variance). Don't make a skill depend on hidden state.

---

## Naming conventions

- Artifact filenames use a `NN-name.md` prefix to enforce sort order.
- IDs use stable prefixes: `REQ-`, `CON-`, `DEC-`, `ASM-`, `RSK-`, `CTR-`, `OQ-`, `L-`, `D-`, `CMP-`, `SCR-`, `F-<domain>-`.
- Templates use the suffix `-template.md`.
- Skills use a noun-or-verb name describing what they do, not what they produce.

Consistent naming is what lets PDFjedi cross-reference across artifacts without ambiguity.

---

## Why no code?

PDFjedi could be implemented as a tool: a CLI that ingests PDFs, calls an LLM, writes files. That implementation would be brittle (PDF parsing alone is a project) and would lock the framework to one LLM provider.

Keeping it as **prompts + skills + templates** means:

- It runs anywhere Claude Code runs.
- Any team member can read and modify a skill — no programming required.
- The bundle is forkable per-client or per-engagement without code review.
- The "logic" lives in language, which is also the medium of every artifact it produces — there's no impedance mismatch.

The cost is that PDFjedi is only as deterministic as the underlying model. The structure we impose — strict templates, strict pipeline, strict citations — is precisely the lever we have to push determinism back up to a usable level.

---

## When PDFjedi is the wrong tool

- The source is structured data (CSV, JSON, OpenAPI). Use code; PDFjedi is overkill.
- The work is iterative ideation, not artifact production. PDFjedi is built to produce a finished bundle, not to brainstorm.
- The deliverable is one short piece of writing. The pipeline overhead isn't worth it.

For these cases, run a single skill (e.g. just `pdf-analysis.md`) — or skip PDFjedi.

---

## Versioning

Treat each `output/` bundle as a versioned artifact. When the client comes back with changes, don't overwrite the previous bundle — copy it to `output/v2/`, then re-run. Diffing two bundles is the cheapest audit trail.
