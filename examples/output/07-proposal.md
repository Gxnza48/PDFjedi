# Proposal — Northbeam Wholesale Portal

> A wholesale ordering portal that lets Northbeam's customers place reorders in under a minute, cuts your team's order-intake time by more than 70%, and is ready by **2026-09-01**.

| Field | Value |
|---|---|
| Prepared for | Northbeam Coffee Co. — Maya Rios, Diego López |
| Prepared by | [CONTRACTOR NAME] |
| Date | 2026-04-02 |
| Validity | 30 days |
| Currency | USD |
| Pricing model | Fixed-price |

---

## 1. Context

Wholesale ordering at Northbeam runs over WhatsApp and email. At 40 accounts it's already friction; at the 200 accounts you're aiming for by end of 2026, it's unworkable. Your account managers spend roughly four hours a day on order intake and pricing errors happen every month. We're proposing a wholesale-only web portal that gives your customers self-serve ordering, gives your team a streamlined inbox, and gives your warehouse a printable picking slip — in time for Q4.

## 2. What we'll deliver

| # | Deliverable | What it is | Why it matters |
|---|---|---|---|
| D1 | Customer portal | Web app where wholesale customers log in, browse the catalog at their account's price list, and place orders. | Removes order intake from WhatsApp. |
| D2 | "Quick reorder" experience | One-click rebuy of the customer's last order, in under 60 seconds. | The single most-impactful UX feature, per your team. |
| D3 | Account-manager inbox | Streamlined view to triage, edit, and accept incoming orders. Any order findable in two clicks. | Cuts AM time on order intake from ~4 hr/day to under 1 hr/day. |
| D4 | Picking slip print | One-button PDF print for the warehouse team. | Replaces hand-copying from chat threads. |
| D5 | Invoice PDFs | Auto-generated on order acceptance; emailed to customer; downloadable from order history. | Standardizes pricing and removes the error class around manual quoting. |
| D6 | Per-account price-list management | Admin tools to set, edit, and bulk-upload pricing per customer. | The reason today's process is fragile; this is the safe surface for it. |
| D7 | Spanish + English UI | First-class ES and EN at launch (not a translation afterthought). | Serves your Spain customer and your domestic base. |
| D8 | Production-ready infrastructure | AWS, EU region, daily backups, monitoring, error tracking. | Gives Diego the audit trail he'll want for compliance. |
| D9 | Pen-tested + GDPR/Ley 25.326 aligned | External pen test before launch; data-handling controls; privacy notice; data export and erasure flows. | You sell to EU customers; we treat that as load-bearing. |
| D10 | 30-day warranty | We fix any bug or non-conformance for 30 days after launch, at no extra cost. | Standard professional warranty. |

These ten deliverables are mirrored line-for-line in the contract.

## 3. Approach

We're proposing a **fixed-price**, milestone-paced engagement run in seven phases over 18 weeks. Each phase ends with a milestone you can see and use:

- After 3 weeks you can log in.
- After 6 weeks you see your real per-account prices in the catalog.
- After 9 weeks a customer can place a reorder end-to-end.
- After 12 weeks an AM can accept and invoice an order, and the warehouse can print the picking slip.
- After 14 weeks we've load-tested and pen-tested.
- After 16 weeks Northbeam internal UAT is done.
- On **2026-09-01** we launch.

A 30-day warranty period follows launch with daily on-call coverage for the first two weeks.

Throughout, you have one point of contact (the tech lead) and a weekly 30-minute working session.

## 4. Roadmap at a glance

| Phase | Outcome | Duration | Ends with |
|---|---|---|---|
| 0. Kickoff & discovery | Open questions resolved, environments live | 1 week | Signed off OQs |
| 1. Foundations | Login + database + CI/CD ready | 2 weeks | Login works |
| 2. Catalog & pricing | Per-account prices visible to customers | 3 weeks | Catalog live for testing |
| 3. Ordering & reorder | Customer can place and reorder | 3 weeks | <60s reorder demo |
| 4. Admin & fulfillment | AM/warehouse workflow live | 3 weeks | End-to-end order flow |
| 5. Hardening | A11y, load, pen-test cleared | 2 weeks | Pen-test passes |
| 6. UAT & onboarding | Internal sign-off + training | 2 weeks | UAT signoff |
| 7. Launch | Production cut-over + warehouse training | 2 weeks | **Live 2026-09-01** |
| 8. Warranty | Post-launch bug-fix coverage | 30 days | Warranty closes |

Total elapsed time: **18 weeks** from kickoff to launch, plus a 30-day warranty.

## 5. Team

| Role | Time commitment | What they do |
|---|---|---|
| Tech lead | full-time | Architecture, weekly working sessions, day-of launch lead. |
| Senior fullstack engineer | full-time | Most of the build. |
| Designer | half-time, front-loaded | Visual system from your brand, screen designs, copy. |
| QA | half-time, weeks 8–18 | Test plans, bug-bash, UAT facilitation. |
| External pen-test vendor | 1 week, phase 5 | Independent security review (pass-through cost). |

## 6. Investment

We're presenting two variants because the brief and the follow-up call gave different budget figures (USD 50k vs USD 40k). You can choose; the difference is what's in scope at launch.

| | Variant A (recommended) | Variant B (40k ceiling) |
|---|---|---|
| Scope | Full v1 incl. ES + EN at launch | Reduced admin; English ships ~30 days post-launch |
| Subtotal excl. tax | USD 46,020 | USD 38,350 |
| IVA 21% if applicable | + USD 9,664 | + USD 8,054 |
| **Total without IVA** | **USD 46,020** | **USD 38,350** |
| **Total with IVA** | **USD 55,684** | **USD 46,404** |

IVA applies only if the contractor invoices from an Argentine entity — to confirm during kickoff.

Payment schedule (Variant A):

- **30% on contract signature.**
- **25% at Milestone M3** (quick reorder end-to-end).
- **25% at Milestone M5** (pen-test cleared, load-test passes).
- **20% at final acceptance** after Northbeam internal UAT.

What's **not** included:

- AWS production hosting bills (paid directly by Northbeam; ~USD 250–500/month at launch scale).
- Third-party SaaS like Sentry (~USD 30/month on starter tier).
- Mercado Pago integration — available as an add-on (+USD 3,500) or in phase 2.
- Tango Gestión integration — pending API documentation; estimated USD 6,000–9,000 in phase 2.
- Content production, marketing, additional locales, mobile apps, post-warranty maintenance.

## 7. Assumptions

If any of these turns out wrong, we revisit scope and price via a Change Order (the contract details the process):

- AWS account access provided by end of week 1.
- Brand assets handed over by end of week 2.
- Stakeholder approvals within 3 business days.
- ≤5 internal staff users at launch.
- Catalog ≤200 SKUs at launch.
- Tango Gestión and Mercado Pago not in phase 1 (unless taken as add-ons).

## 8. Why us

- We deliver to dates. We've set Variant A's price with an 18% risk reserve and a roadmap that absorbs the most likely sources of slip (brand handover delay, pen-test findings, vacation).
- We design for your team, not for an internal architecture diagram. The AM inbox and warehouse picking slip are first-class deliverables, not afterthoughts.
- We treat compliance as load-bearing. The Spain customer means GDPR is in scope from day one, not a phase-2 task.
- We bill in USD against itemized days, not in opaque round numbers. You can see exactly what you're paying for.

## 9. What we need from you

- Sign the contract by **2026-04-22** to hold the kickoff date of **2026-04-29**.
- AWS account access by end of week 1.
- Brand assets and design tokens by end of week 2.
- Maya as primary point of contact; Diego available for commercial decisions.
- 3–5 pilot customers identified by week 12 for UAT in weeks 15–16.
- Answers to the eight open questions in [Appendix B] before kickoff.

## 10. Next step

**Pick the variant** (A or B), and we'll schedule a 30-minute call to walk through the contract draft together. The aim is signature by 2026-04-22 and kickoff on 2026-04-29.

## 11. Appendix

- **A — Detailed scope**: see `02-tech-spec.md`, `03-ux-ui-system.md`, `04-security-architecture.md`, `05-roadmap.md`.
- **B — Open questions to resolve before kickoff**: see `99-open-questions.md` (8 items).
- **C — Source documents referenced**: `brief.pdf`, `meeting-notes.pdf`.

---

### How this was derived
- Deliverables mirror `06-budget.md` line items and `02-tech-spec.md` modules; ten plain-language items map to twenty-seven engineering line items.
- Roadmap mirrors `05-roadmap.md`.
- Tone tuned for non-engineer decision-makers (Maya + Diego).
- All numbers traced to the budget; no figures invented.
