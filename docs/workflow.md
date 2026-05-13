# Workflow

The end-to-end PDFjedi pipeline, the order skills run in, and the artifacts each one produces.

---

## Pipeline diagram

```
  Source PDF(s)
       │
       ▼
┌───────────────────┐
│  pdf-analysis     │ ──► 01-requirements.md   (canonical source of truth)
└───────────────────┘
       │
       ▼
┌───────────────────┐
│ tech-spec-builder │ ──► 02-tech-spec.md
└───────────────────┘
       │
       ├──────────────┬─────────────────────┐
       ▼              ▼                     ▼
┌──────────────┐ ┌─────────────────┐ ┌──────────────────┐
│ ux-ui-       │ │ security-       │ │ (inline)         │
│ designer     │ │ architect       │ │ roadmap          │
└──────────────┘ └─────────────────┘ └──────────────────┘
       │              │                     │
       ▼              ▼                     ▼
 03-ux-ui-      04-security-           05-roadmap.md
 system.md      architecture.md
                       │                     │
                       └─────────────────────┤
                                             ▼
                                  ┌──────────────────┐
                                  │ budget-generator │ ──► 06-budget.md
                                  └──────────────────┘
                                             │
                                             ▼
                                     (inline) ──► 07-proposal.md
                                             │
                                             ▼
                                  ┌──────────────────┐
                                  │ contract-        │ ──► 08-contract.md
                                  │ generator        │
                                  └──────────────────┘
                                             │
                                             ▼
                                     (inline) ──► 99-open-questions.md
                                                  (aggregated across all steps)
```

---

## Dependencies (what each step consumes)

| Step | Skill | Consumes | Produces |
|---|---|---|---|
| 1 | pdf-analysis | Source PDF(s), in-chat context | `01-requirements.md` |
| 2 | tech-spec-builder | `01-requirements.md` | `02-tech-spec.md` |
| 3 | ux-ui-designer | `01-requirements.md`, `02-tech-spec.md` | `03-ux-ui-system.md` |
| 4 | security-architect | `01-requirements.md`, `02-tech-spec.md`, `03-ux-ui-system.md` | `04-security-architecture.md` |
| 5 | (inline) roadmap | All upstream artifacts | `05-roadmap.md` |
| 6 | budget-generator | `02-tech-spec.md`, `05-roadmap.md` | `06-budget.md` |
| 7 | (inline) proposal | `01-requirements.md`, `05-roadmap.md`, `06-budget.md` | `07-proposal.md` |
| 8 | contract-generator | `06-budget.md`, `07-proposal.md`, `05-roadmap.md` | `08-contract.md` |
| 9 | (inline) open questions | All steps | `99-open-questions.md` |

This dependency graph implies two important rules:

1. **Re-running step N requires re-running every step that depends on N.** PDFjedi will detect this and propose the minimal re-run; you can override.
2. **The numeric prefixes are load-bearing.** They encode the dependency order. Don't rename files.

---

## What each skill *guarantees*

A skill's contract with the rest of the pipeline:

- **pdf-analysis** guarantees every claim downstream is traceable to a citation in the source PDF.
- **tech-spec-builder** guarantees every REQ-ID is either implemented by a module, or deferred (with an open question).
- **ux-ui-designer** guarantees every user-facing REQ-ID maps to at least one screen.
- **security-architect** guarantees every PII field declared by the tech spec is addressed by a control.
- **budget-generator** guarantees every line item references at least one REQ-ID; PM, QA, and risk reserve are present.
- **contract-generator** guarantees deliverables in the contract match the proposal one-to-one and totals match the budget.

Violating these guarantees means a skill emitted an inconsistent artifact. Re-run that skill (and dependents).

---

## Modes

| Mode | Steps run | Use when |
|---|---|---|
| `full` (default) | 1–9 | Standard run |
| `triage` | 1, 9 | Go/no-go on an RFP, fast read of a brief |
| `quote-only` | 1, 2, 6, 7, 8, 9 | Client only wants a number |
| `single-artifact:<name>` | only the named step | Iterating on one artifact |

Modes are set via the **Parameters** block in `pdf-to-product.md`.

---

## Re-runs and minimal updates

When you give PDFjedi a new piece of input (an answered open question, a scope change, a new PDF), it will:

1. Identify which artifacts the change affects (via the dependency graph).
2. Re-run only those skills.
3. Update the `99-open-questions.md` and the "How this was derived" footers everywhere touched.
4. Leave untouched any artifact whose dependencies didn't change.

This keeps the bundle internally consistent without redoing work.

---

## When to bypass the pipeline

There are two legitimate reasons to load a single skill instead of running the pipeline:

1. **You already have one of the artifacts** (e.g. a tech spec from another source) and you just need a budget for it. Load `budget-generator.md` + the template + the tech spec.
2. **You're iterating on copy** (proposal language, contract wording). Load only what's relevant.

Outside those two cases, run the pipeline — partial bundles tend to drift out of sync.

---

## Failure modes & recovery

| Failure | What it looks like | Recovery |
|---|---|---|
| Source PDF unreadable | Skill 1 halts with an explanatory message | Re-OCR / re-export the PDF |
| Contradiction blocks pipeline | Skill 1 emits requirements + open questions, refuses to proceed | Resolve top contradiction, re-run |
| Vague brief produces empty NFRs | Tech spec emits open questions instead of numbers | Provide NFR targets in chat, re-run from step 2 |
| Budget can't be defended | budget-generator emits a discovery quote instead | Either accept the discovery quote, or supply more inputs |
| Jurisdiction unknown | contract-generator stops at §3 | Set the locale parameter, re-run from step 8 |

In every case, the pipeline degrades gracefully — it produces less, not wrong.
