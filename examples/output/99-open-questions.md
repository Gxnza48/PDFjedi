# Open questions

> Items the source PDFs do not answer. Each one blocks or shapes at least one downstream artifact. Resolving the top three before kickoff prevents the most expensive class of late-stage change orders.

## Top 3 — most blocking

These three drive the largest reshapes if answered differently than assumed.

### OQ-001 — Which source PDF is more recent: brief or meeting notes?
**Why it matters.** The meeting notes contradict the brief on (a) budget (USD 40k hard ceiling vs USD 50k indicative — CTR-001), (b) launch date (2026-09-01 hard vs "ideally end of August" — CTR-002), and (c) English locale (in scope at launch vs not-for-v1 — CTR-003). PDFjedi has treated the meeting notes as more recent based on content sequencing (the notes reference action items derived from the brief), but the notes are undated.
**What we need.** Confirmation that the meeting notes are the more recent document, OR a written precedence rule.
**What changes.** All three contradictions resolve; we can choose Budget Variant A or B; English-at-launch toggles; launch-date language hardens or softens.

### OQ-002 — Brand assets and design tokens from `northbeam.coffee`
**Why it matters.** "Modern and professional" is the only stated visual constraint (REQ-015). We have used **semantic tokens** as placeholders throughout `03-ux-ui-system.md`. Without real tokens the design phase produces work that will look out of place next to the existing retail site.
**What we need.** Figma access (or equivalent) to the current Northbeam brand system: color tokens, type, logo files, iconography.
**What changes.** Design phase efficiency; visual consistency with the existing retail site.

### OQ-003 — Tango Gestión integration: in scope or phase 2?
**Why it matters.** Diego thinks "maybe later", Maya thinks yes; the meeting notes leave it unresolved. It's a substantial integration (estimated USD 6,000–9,000) and would otherwise be ad-hoc data entry.
**What we need.** Confirm in-scope/out-of-scope for phase 1. If in scope, provide API documentation and a Tango sandbox account.
**What changes.** Phase 1 budget +USD 6,000–9,000 and roadmap +1–2 weeks if in scope. If out of scope, status quo (current artifacts assume out).

---

## Detailed register

### OQ-004 — SLA expectations
- **Source / why.** Meeting notes flag "did not discuss" for SLA. We've assumed 99.5% monthly availability outside maintenance windows; RPO 24h / RTO 4h.
- **Blocks.** `02-tech-spec.md` §7 NFRs, `04-security-architecture.md` §7 DR posture, ongoing-cost projections.
- **What we need.** Target uptime, acceptable maintenance windows, response-time expectations during business hours vs after-hours.

### OQ-005 — Post-launch hosting ownership
- **Source / why.** Meeting notes flag "did not discuss" for who owns production hosting after launch.
- **Blocks.** Post-warranty operational model, AWS billing arrangement (already assumed to go directly to Northbeam, ASM-001/002), on-call rotation.
- **What we need.** Confirm whether Northbeam's IT contractor continues to manage AWS account-level, and whether contractor provides app-level on-call.

### OQ-006 — Data and source-code handover on termination
- **Source / why.** Meeting notes flag "did not discuss" for what happens to data and code if the contract ends.
- **Blocks.** Contract §13.3, IP clause §7.5 (we've drafted source-code handover; needs sign-off), DPA exit clauses.
- **What we need.** Northbeam's preferences: full repo handover on termination? Continued license to use after termination? Data-deletion attestation requirements?

### OQ-007 — Day rates for contractor team (action item Diego)
- **Source / why.** Meeting notes action item to Diego: confirm rate-card numbers (Argentina-side, USD-denominated). All budget figures currently use placeholder rates.
- **Blocks.** Finalizing the budget. Day-totals (119.6 person-days) are firm; only the rate × day arithmetic is pending.
- **What we need.** Confirmed rates per role.

### OQ-008 — Fiscal setup and IVA applicability
- **Source / why.** Not addressed in source. The contract draft (§3.2) and budget tax line both depend on whether Contractor invoices from an Argentine entity or under the export-of-services regime.
- **Blocks.** Final pricing presented to Northbeam (with vs without IVA), invoice format, accounting setup.
- **What we need.** Contractor invoicing structure confirmed.

### OQ-009 — Accessibility target
- **Source / why.** Source doesn't specify WCAG level. We've defaulted to WCAG 2.1 AA for both customer-facing and AM-facing screens.
- **Blocks.** Design phase polish effort and QA scope (a11y testing).
- **What we need.** Confirm WCAG 2.1 AA as target; or accept a customer-only AA target (Budget Variant B uses this).

### OQ-010 — Confirm AWS region preference
- **Source / why.** REQ-017 says Argentina or EU, not US. There is no Argentine AWS region; we've chosen `eu-west-1` (Ireland) to keep EU-customer data in-region. `sa-east-1` (São Paulo) is geographically closer and is technically EU-eligible only if Northbeam's interpretation of "EU" was strict. PDFjedi made the conservative choice.
- **Blocks.** Final infra-as-code; nothing in scope yet depends on the choice irreversibly.
- **What we need.** Confirm `eu-west-1`, or pick `sa-east-1` (one-line config change before Phase 1 ends).

### OQ-011 — Pilot customers for UAT
- **Source / why.** Not in source. We've assumed Maya identifies 3–5 pilot customers by week 12.
- **Blocks.** UAT scheduling (Phase 6, weeks 15–16).
- **What we need.** Maya to commit to a date for selecting pilots.

---

## Source-document risks (separate from open questions)

| Risk | Evidence | Recommended action |
|---|---|---|
| Meeting notes are undated | Date stated as "undated, likely week of 2026-03-23" | OQ-001 — confirm date or precedence |
| Brief and meeting notes contradict on 3 dimensions | CTR-001, CTR-002, CTR-003 in `01-requirements.md` | Resolved by OQ-001 |
| No SLA or operational ownership specified | Meeting notes "did not discuss" | OQ-004, OQ-005 |
| Budget conflict has 25% spread (40k vs 50k) | brief.pdf p.3 + meeting-notes.pdf | OQ-001 + Variant selection at signature |

---

### How this was derived
- Aggregated open questions surfaced by each skill in the pipeline (`01-requirements.md` through `08-contract.md`).
- Top 3 selected by blast radius: items whose answer reshapes ≥2 downstream artifacts.
- Source-document risks surfaced separately so they can be raised with the client at first contact.
