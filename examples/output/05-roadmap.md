# Roadmap — Northbeam Wholesale Portal

> Phases, milestones, dependencies, and critical path to a 2026-09-01 launch. Total elapsed time from kickoff: **18 weeks**. Critical path runs through ordering, per-account pricing, and AM admin.

| Field | Value |
|---|---|
| Kickoff (target) | 2026-04-29 |
| Launch (hard) | 2026-09-01 |
| Warehouse training complete by | 2026-09-15 |
| Team | 1 tech lead, 1 senior fullstack engineer, 1 designer (half-time), 1 QA (half-time, weeks 8–18), Northbeam IT contractor (advisor) |
| Source documents | brief.pdf, meeting-notes.pdf |

---

## Phases

### Phase 0 — Kickoff & discovery (1 week, weeks 1)
- Resolve top-priority open questions (OQ-001..003, OQ-007).
- Confirm AWS account access, region (eu-west-1), brand assets handover (OQ-002).
- Sign DPA + contract.

**Exit criteria**: open questions closed or formally deferred; environments accessible; design tokens received.

### Phase 1 — Foundations (2 weeks, weeks 2–3)
- Repo setup, CI/CD, baseline Next.js app, Postgres schema, RDS provisioned, S3 buckets, SES verified.
- Auth (login, signup-by-invite, password reset).
- RBAC framework + audit log scaffolding.

**Milestone M1**: customer can log in, admin can create an account.

### Phase 2 — Catalog & per-account pricing (3 weeks, weeks 4–6)
- SKU model + admin CRUD.
- Per-account price-list model + admin CRUD + CSV bulk upload.
- Customer-facing catalog browsing in ES + EN.

**Milestone M2**: a customer sees their per-account prices on the catalog.

### Phase 3 — Ordering & reorder (3 weeks, weeks 7–9)
- Cart + order submission.
- "Quick reorder" dashboard card (DEC-005 — highest priority feature).
- Order detail (customer).

**Milestone M3**: end-to-end customer order placement working; quick reorder demonstrably under 60s.

### Phase 4 — Admin & fulfillment (3 weeks, weeks 10–12)
- AM inbox, order edit, acceptance flow.
- Invoice PDF generation (job worker).
- Picking slip PDF for warehouse.
- AM admin: SKUs, accounts, price lists, staff users.

**Milestone M4**: order can be placed by customer, edited by AM, accepted, invoiced, and printed by warehouse.

### Phase 5 — Hardening, accessibility, performance (2 weeks, weeks 13–14)
- WCAG 2.1 AA pass; keyboard nav; screen-reader smoke test.
- Load test (3–4× expected end-of-month volume; REQ-012).
- Pen test by external vendor; remediate.
- Backup/restore drill.

**Milestone M5**: pen-test high/critical findings closed; load-test passes.

### Phase 6 — UAT & onboarding (2 weeks, weeks 15–16)
- Northbeam internal UAT (Maya + Diego + warehouse lead + 1–2 pilot customers).
- Bug-bash; copy review (ES + EN).
- Customer onboarding materials (1-pager + email template).
- Warehouse + AM training rehearsal.

**Milestone M6**: UAT signoff.

### Phase 7 — Launch (2 weeks, weeks 17–18)
- Production cut-over.
- Warehouse training complete by 2026-09-15.
- 30-day warranty period begins on launch day.

**Milestone M7 — LAUNCH (2026-09-01)**.

### Phase 8 — Warranty (post-launch, 30 days)
- Bug-fix capacity included.
- Daily on-call rotation for the first 2 weeks.

---

## Workstreams (parallelism)

| Workstream | Weeks |
|---|---|
| Backend | 2–14 (drives critical path) |
| Frontend | 2–14 (parallel with backend; designer feeds in tokens by week 3) |
| Design | 1–10 (front-loaded; light support after) |
| DevOps / infra | 1–3, 13–18 |
| QA | 8–18 (half-time) |
| UAT / training | 15–18 |

## Dependencies & critical path

The critical path runs:

```
M1 (auth) → M2 (per-account pricing) → M3 (quick reorder) → M4 (acceptance + invoice) → M5 (pen test cleared) → M6 (UAT) → M7 (launch)
```

Any slip in M2 or M3 directly slips launch. Mercado Pago (F-PAY-02) is deliberately **off** the critical path (DEC-006: phase 2 if cost pressure). Tango Gestión integration (REQ-021/OQ-003) is **out** of phase 1.

## Risks affecting the roadmap

| Risk | Impact | Mitigation |
|---|---|---|
| Brand asset handover delayed (OQ-002) | Slip M2 visuals | Design phase uses placeholder tokens; visual polish back-loaded to Phase 5. |
| AWS account access delayed | Slip M1 | Day-1 ticket to Northbeam IT contractor. |
| Pen-test findings extensive | Slip M5 | Pen test scheduled at start of Phase 5, not end. |
| Vacation period mid-project | Soft slip | One-week buffer absorbed by Phase 5. |

## What's after launch (not in this engagement unless contracted separately)

- Mercado Pago integration (phase 2).
- Tango Gestión integration (phase 2 — pending OQ-003).
- MFA-required for `admin` role.
- Detailed analytics dashboard for Maya.
- Additional locales (Portuguese for Brazil expansion, etc.).

---

### How this was derived
- Phases derived from the module list in `02-tech-spec.md` clustered for parallelism.
- Effort cross-checked against `06-budget.md` PERT estimates (total expected days ≈ team-weeks).
- Critical path = the sequence that, if delayed, delays launch.
- Hard launch date 2026-09-01 carried forward from CON-002 (meeting-notes.pdf).
