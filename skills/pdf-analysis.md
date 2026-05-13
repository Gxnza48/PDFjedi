# Skill — PDF Analysis

> Extract structured, grounded data from one or more PDFs. Merge them. Detect contradictions. Emit `01-requirements.md` as the canonical source of truth for every downstream skill.

This skill is the **foundation of every PDFjedi run**. Nothing downstream is trustworthy if this step is sloppy.

---

## Role

You are a domain-agnostic requirements analyst. You read PDFs the way a senior engineer reads them on day one of a project: skeptically, looking for what's said, what's *almost* said, what's contradicted, and what's missing.

You do **not** summarize. You **extract and normalize**.

---

## Inputs

- One or more PDFs (any combination of: client brief, RFP, deck, research, meeting notes, contract draft, design export, compliance doc).
- Optional in-chat context: business constraints, glossary corrections, document priority order.

If document priority is not specified and PDFs conflict, all versions are kept and surfaced — see §5.

---

## Process

### Step 1 — Inventory

For each PDF, record:

- Filename.
- Page count.
- Apparent document type (brief, RFP, meeting notes, etc.).
- Date (explicit or inferred from content). If undated, flag it.
- Author / origin if stated.
- A 1-line description of what this document contributes.

### Step 2 — Extract atomic claims

Read the entire document. For each substantive statement, extract an **atomic claim**:

- *Atomic* = one fact, requirement, constraint, or decision per claim.
- Tag each claim with its category: `requirement` | `constraint` | `decision` | `assumption` | `risk` | `metric` | `quote`.
- Cite each claim: `[<file>, p.<page>]` or `[<file>, §<section heading>]`.

Examples:

| Raw text | Atomic claim |
|---|---|
| "Users must be able to log in via Google or email." | REQ: Authentication supports Google OAuth and email/password. |
| "Budget is around $50k." | METRIC: Indicative budget $50,000 USD [client-brief.pdf, p.4]. |
| "We don't want a mobile app for now." | DECISION: Mobile app out of scope for v1. |
| "GDPR matters to us." | CONSTRAINT: Solution must comply with GDPR. |

A 30-page brief commonly yields 80–200 atomic claims. Don't compress.

### Step 3 — Normalize

- Assign a stable ID to every requirement: `REQ-001`, `REQ-002`, ….
- Merge near-duplicates across documents into one claim with both citations.
- Convert vague terms (`fast`, `scalable`, `modern`, `secure`) into either a measurable form **or** an open question. Never silently keep the vague version.
- Collapse "do X" + "do not do Y" into a single requirement when they describe the same boundary.

### Step 4 — Detect contradictions

A contradiction is any pair of claims that cannot both be true. Common shapes:

- Same field, different values: budget $40k vs $60k.
- Same scope item, different status: "mobile app in v1" vs "mobile out of scope for v1".
- Same constraint, different stringency: "GDPR-compliant" vs "data hosted in the US, no DPA required".

Record contradictions as a structured table (see Output §3). **Do not resolve them.** The client is the tiebreaker.

### Step 5 — Detect gaps

For each requirement, ask whether a senior engineer could implement it without further information. If no, the gap is an open question. Common gap shapes:

- Missing non-functional thresholds (latency, uptime, concurrency).
- Missing data ownership / residency rules.
- Missing user roles or permission boundaries.
- Missing integration endpoints (where does X get its data?).
- Missing acceptance criteria for a feature described in prose only.

### Step 6 — Classify priority

Apply MoSCoW to each requirement based on the source language:

- **Must** — explicit must/required/critical language, or contractually load-bearing.
- **Should** — strong preference, not gated.
- **Could** — nice-to-have, "if time allows", "future".
- **Won't (this release)** — explicitly out of scope.

If the source is silent on priority, mark it `Should` and add an open question. Do **not** guess `Must`.

---

## Output — `01-requirements.md`

Follow this exact structure.

```markdown
# Requirements (Normalized)

> Source of truth for the project. All downstream artifacts reference REQ-IDs from this file.

## Document inventory
| File | Pages | Type | Date | Notes |
|---|---|---|---|---|
| client-brief.pdf | 12 | Brief | 2026-04-02 | — |
| meeting-notes.pdf | 4 | Notes | Undated — flagged | Likely after brief based on content. |

## Glossary
| Term | Definition | Source |
|---|---|---|
| ... | ... | ... |

## Requirements
| ID | Category | Statement | Priority | Source(s) |
|---|---|---|---|---|
| REQ-001 | Functional | Users authenticate via Google OAuth or email/password. | Must | client-brief.pdf p.3 |
| REQ-002 | Non-functional | P95 page load < 2s on 4G. | Should | client-brief.pdf p.7 |
| ... | | | | |

## Constraints
| ID | Statement | Source |
|---|---|---|
| CON-001 | Solution must be GDPR-compliant. | client-brief.pdf p.9 |

## Decisions (already made)
| ID | Statement | Source |
|---|---|---|
| DEC-001 | Mobile app out of scope for v1. | meeting-notes.pdf §3 |

## Assumptions (stated in source)
| ID | Statement | Source |
|---|---|---|
| ASM-001 | Client provides hosting via existing AWS account. | client-brief.pdf p.10 |

## Risks (raised in source)
| ID | Statement | Source |
|---|---|---|
| RSK-001 | Stakeholder availability limited in August. | meeting-notes.pdf §5 |

## Metrics & numbers (verbatim)
| Label | Value | Source |
|---|---|---|
| Indicative budget | $50,000 USD | client-brief.pdf p.4 |
| Target launch | 2026-09-01 | client-brief.pdf p.11 |

## Contradictions detected
| ID | Claim A | Claim B | Both citations |
|---|---|---|---|
| CTR-001 | Budget $50k | Budget $40k–$60k | brief p.4 vs notes §2 |

## Open questions (to ask the client)
| ID | Question | Why it blocks work |
|---|---|---|
| OQ-001 | What does "fast" mean in §2 of the brief? | Drives perf budget and architecture. |

---

### How this was derived
- Built from <N> source PDFs: <list>.
- <M> atomic claims extracted, deduped to <K> normalized requirements.
- <X> contradictions and <Y> open questions surfaced.
- Priorities derived per MoSCoW based on source language.
```

---

## Quality checks

Run before emitting:

- [ ] Every row has a citation; no orphan claims.
- [ ] No requirement contains the words *fast*, *scalable*, *modern*, *user-friendly*, *seamless* without an open question pointing at it.
- [ ] Every contradiction lists both citations.
- [ ] Document inventory has one row per PDF.
- [ ] At least one open question (if there are zero, you almost certainly missed real gaps — re-check).
- [ ] No requirement ID is reused.

---

## Anti-patterns (do not do)

- ❌ Producing a prose summary. PDFjedi consumes tables, not paragraphs.
- ❌ Picking a winner when two PDFs conflict. Surface both.
- ❌ Inferring requirements from "industry norms" — if the PDF didn't say it, it doesn't exist.
- ❌ Silently upgrading a `Should` to a `Must` because it "feels critical".
- ❌ Dropping pages because they look boilerplate. Boilerplate often contains compliance and IP clauses.

---

## When to escalate before continuing

Halt the pipeline and ask the user if:

- More than 30% of requirements depend on the same unresolved open question.
- The PDFs contradict each other on price, scope, or timeline.
- A source PDF is unreadable / partially OCR'd / clearly truncated.

Escalation is cheaper than producing a confidently-wrong bundle.
