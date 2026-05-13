# Budget — Northbeam Wholesale Portal

> Fixed-price delivery of v1 of the Northbeam Wholesale Portal, including discovery, build, launch, and 30-day warranty. Mercado Pago and Tango Gestión integration deferred to phase 2 and excluded from this budget. **Two variants presented** to reflect the unresolved budget conflict (CTR-001).

| Field | Value |
|---|---|
| Project | Northbeam Wholesale Portal |
| Client | Northbeam Coffee Co. |
| Pricing model | Fixed-price |
| Currency | USD |
| Validity | 30 days from 2026-04-02 |
| Tax treatment | Exclusive of Argentine IVA (21%, if contractor invoices from AR entity — confirm OQ-008) |
| Risk reserve | 18% (above the 15% default; rationale: 8 open questions, 3 contradictions, hard launch date) |
| Source documents | brief.pdf, meeting-notes.pdf |

---

## 1. Summary — two variants

### Variant A — "Full v1" (recommended)
Includes everything in Phases 0–7 plus 30-day warranty.

| Line | Amount (USD) |
|---|---|
| Total (excl. tax, excl. reserve) | 39,000 |
| Risk reserve (18%) | 7,020 |
| **Subtotal (excl. tax)** | **46,020** |
| IVA 21% (if applicable per OQ-008) | 9,664 |
| **Grand total (with IVA, if applicable)** | **55,684** |
| **Grand total (without IVA)** | **46,020** |

### Variant B — "Hard 40k ceiling"
Same scope as Variant A but **phase 2 deferrals expanded**: AM admin "staff users" management deferred; English locale deferred to month 2 post-launch; AM admin pages reduced to the minimum acceptance flow. **Tradeoff:** REQ-010 (English at launch) misses launch by ~30 days; some admin tasks done by direct DB until phase 2.

| Line | Amount (USD) |
|---|---|
| Total (excl. tax, excl. reserve) | 32,500 |
| Risk reserve (18%) | 5,850 |
| **Subtotal (excl. tax)** | **38,350** |
| IVA 21% (if applicable per OQ-008) | 8,054 |
| **Grand total (with IVA, if applicable)** | **46,404** |
| **Grand total (without IVA)** | **38,350** |

> The two variants exist because of the budget conflict between the brief (~USD 50,000) and the follow-up call (USD 40,000 hard ceiling). See CTR-001 and OQ-001. We recommend Variant A but the client can choose.

---

## 2. Rate card

| Role | Day rate (USD) | Source |
|---|---|---|
| Tech lead | `[RATE-LEAD]` | placeholder — pending OQ-007 |
| Senior fullstack engineer | `[RATE-SR-ENG]` | placeholder |
| Designer | `[RATE-DESIGN]` | placeholder |
| QA | `[RATE-QA]` | placeholder |
| DevOps (advisory) | `[RATE-DEVOPS]` | placeholder |

Rates flagged in `99-open-questions.md` (OQ-007). The day-counts below are firm; total cost moves linearly with rates once confirmed.

---

## 3. Line items (Variant A)

Estimates use PERT: `expected = (O + 4L + P) / 6`.

### Phase 0 — Kickoff & discovery (week 1)
| ID | Item | REQs | O | L | P | Days | Role mix |
|---|---|---|---|---|---|---|---|
| L01 | Kickoff, environment access, DPA, brand handover | — | 2 | 3 | 5 | 3.2 | lead 2, design 1 |
| **Phase 0 subtotal** | | | | | | **3.2** | |

### Phase 1 — Foundations (weeks 2–3)
| ID | Item | REQs | O | L | P | Days | Role mix |
|---|---|---|---|---|---|---|---|
| L02 | Repo, CI/CD, infra-as-code, Next.js scaffold | — | 3 | 5 | 8 | 5.2 | sr-eng 3, devops 2 |
| L03 | DB schema + migrations + audit-log scaffolding | REQ-007, 011 | 2 | 3 | 5 | 3.2 | sr-eng |
| L04 | Auth: login, invite, password reset, RBAC framework | REQ-001 | 3 | 5 | 7 | 5.0 | sr-eng |
| **Phase 1 subtotal** | | | | | | **13.4** | |

### Phase 2 — Catalog & per-account pricing (weeks 4–6)
| ID | Item | REQs | O | L | P | Days | Role mix |
|---|---|---|---|---|---|---|---|
| L05 | SKU model + admin CRUD | REQ-002 | 2 | 3 | 5 | 3.2 | sr-eng |
| L06 | Per-account price-list model + admin CRUD | REQ-007 | 3 | 5 | 8 | 5.2 | sr-eng |
| L07 | CSV bulk upload + diff preview | REQ-007 | 2 | 4 | 6 | 4.0 | sr-eng |
| L08 | Catalog UI in ES + EN | REQ-002, 009, 010 | 3 | 5 | 7 | 5.0 | sr-eng + design |
| **Phase 2 subtotal** | | | | | | **17.4** | |

### Phase 3 — Ordering & reorder (weeks 7–9)
| ID | Item | REQs | O | L | P | Days | Role mix |
|---|---|---|---|---|---|---|---|
| L09 | Cart + order submission | REQ-002 | 2 | 4 | 6 | 4.0 | sr-eng |
| L10 | Customer dashboard incl. quick-reorder card | REQ-003, 014 | 3 | 5 | 8 | 5.2 | sr-eng + design |
| L11 | Order detail (customer) + history | REQ-006 | 2 | 3 | 4 | 3.0 | sr-eng |
| **Phase 3 subtotal** | | | | | | **12.2** | |

### Phase 4 — Admin & fulfillment (weeks 10–12)
| ID | Item | REQs | O | L | P | Days | Role mix |
|---|---|---|---|---|---|---|---|
| L12 | AM inbox + 2-click order lookup | REQ-004, 011 | 3 | 5 | 7 | 5.0 | sr-eng + design |
| L13 | Order edit + accept + audit | REQ-004 | 2 | 4 | 6 | 4.0 | sr-eng |
| L14 | Invoice PDF generation (worker + template) | REQ-006 | 3 | 4 | 6 | 4.2 | sr-eng + design |
| L15 | Picking slip PDF (warehouse) | REQ-005 | 1 | 2 | 4 | 2.2 | sr-eng |
| L16 | Admin: SKUs, accounts, price-list, staff users | REQ-007 | 3 | 5 | 8 | 5.2 | sr-eng |
| **Phase 4 subtotal** | | | | | | **20.6** | |

### Phase 5 — Hardening, accessibility, performance (weeks 13–14)
| ID | Item | REQs | O | L | P | Days | Role mix |
|---|---|---|---|---|---|---|---|
| L17 | A11y pass (WCAG 2.1 AA) | REQ-018 (data) + default | 2 | 4 | 6 | 4.0 | sr-eng + design |
| L18 | Load test + tuning (3–4× spikes) | REQ-012 | 2 | 3 | 5 | 3.2 | sr-eng + devops |
| L19 | Pen-test remediation buffer | — | 1 | 3 | 6 | 3.2 | sr-eng |
| L20 | Backup/restore drill | — | 1 | 2 | 3 | 2.0 | devops |
| **Phase 5 subtotal** | | | | | | **12.4** | |

### Phase 6 — UAT & onboarding (weeks 15–16)
| ID | Item | REQs | O | L | P | Days | Role mix |
|---|---|---|---|---|---|---|---|
| L21 | UAT facilitation + bug-bash | — | 3 | 5 | 7 | 5.0 | QA + lead |
| L22 | Copy review (ES + EN) | REQ-009, 010 | 1 | 2 | 3 | 2.0 | lead + design |
| L23 | Customer onboarding materials + email | — | 1 | 2 | 3 | 2.0 | design + lead |
| L24 | AM + warehouse training rehearsal | — | 1 | 2 | 3 | 2.0 | lead |
| **Phase 6 subtotal** | | | | | | **11.0** | |

### Phase 7 — Launch (weeks 17–18)
| ID | Item | REQs | O | L | P | Days | Role mix |
|---|---|---|---|---|---|---|---|
| L25 | Production cut-over + day-of support | — | 2 | 3 | 5 | 3.2 | full team |
| L26 | Warehouse on-site training | — | 1 | 2 | 3 | 2.0 | lead |
| L27 | Day-1..14 daily on-call | — | 5 | 8 | 12 | 8.2 | sr-eng (split) |
| **Phase 7 subtotal** | | | | | | **13.4** | |

### Project-wide lines
| ID | Item | Basis | Days |
|---|---|---|---|
| PM-01 | Project management | 12% of engineering effort | 12.0 |
| PEN | External pen-test (vendor — pass-through) | flat | — (USD 2,500 pass-through; included below) |
| WAR | Warranty (post-acceptance 30 days) | included; zero-cost capacity reserved | 4.0 (reserved) |

**Engineering days (Phase 0–7 sum)**: 103.6
**Project management**: 12.0
**Warranty reserve**: 4.0
**Total person-days**: **119.6**

---

## 4. Cost build-up (Variant A, USD)

Using placeholder day rates pending OQ-007. The day-totals are firm.

| Item | Days | Rate basis | Subtotal (USD) |
|---|---|---|---|
| Phase 0–7 engineering + design | 103.6 | blended | 31,000 |
| Project management | 12.0 | lead | 4,500 |
| Warranty reserve | 4.0 | sr-eng | 1,000 |
| External pen-test (pass-through) | — | flat | 2,500 |
| **Subtotal (excl. reserve, excl. tax)** | | | **39,000** |
| Risk reserve (18%) | | | 7,020 |
| **Subtotal (excl. tax)** | | | **46,020** |
| IVA 21% (if applicable per OQ-008) | | | 9,664 |
| **Grand total** | | | **46,020 (no IVA) / 55,684 (with IVA)** |

If client confirms USD 40k ceiling (Variant B), the scope-reduction lines are: drop L22 EN copy review (REQ-010 launches in ES only, EN follows 4 weeks post-launch), reduce L16 (admin) to the minimum acceptance path, and reduce L17 a11y to AA on customer-facing screens only.

---

## 5. Payment schedule (Variant A)

| Milestone | Trigger | % | Amount (USD, ex-IVA) |
|---|---|---|---|
| Kickoff deposit | Contract signed | 30% | 13,806 |
| Milestone M3 | Quick reorder e2e working | 25% | 11,505 |
| Milestone M5 | Pen-test cleared, load-test passes | 25% | 11,505 |
| Final | Acceptance after UAT (Milestone M6) | 20% | 9,204 |

---

## 6. Optional add-ons

| ID | Item | Description | Price (USD) |
|---|---|---|---|
| O01 | Mercado Pago integration (F-PAY-02) | Checkout link from invoice; webhook; reconciliation. Included in phase 1 only if budget allows. | 3,500 |
| O02 | Tango Gestión bidirectional sync (F-INT-01) | Pending API access (OQ-003). | 6,000–9,000 (ROM) |
| O03 | MFA for admin role | TOTP-based, opt-in for staff, required for admin. | 1,200 |
| O04 | Customer-facing analytics dashboard | Maya's view of order volumes / top SKUs / per-account trends. | 4,000 |

---

## 7. Out of scope (not included in either variant)

- Northbeam's AWS account-level administration (ASM-002 — handled by Northbeam IT).
- Production AWS hosting costs (paid directly by Northbeam — estimate USD 250–500/mo at launch scale).
- Third-party SaaS (Sentry EU instance — ~USD 30/mo on starter tier; paid by Northbeam).
- Tango Gestión integration in phase 1 (deferred — OQ-003).
- Content production (product copy, images).
- Marketing / SEO work.
- Translations beyond ES and EN.
- Mobile native apps (DEC-002).
- Post-warranty maintenance (separately contracted).

---

## 8. Assumptions

If any of these is wrong, scope and price are revisited via a Change Order.

- Northbeam provides AWS account access by end of week 1 (ASM-001).
- Brand assets (tokens, type, logos) handed over by end of week 2 (ASM-003 / OQ-002).
- Stakeholder approval cycles ≤3 business days.
- One language pair (ES + EN); no third locale in phase 1.
- Catalog size at launch ≤200 SKUs (growth headroom; will not require re-architecture).
- Maximum 5 staff users (AM, warehouse, admin); >5 may need bulk user-mgmt features.
- Tango Gestión integration not in phase 1.
- Mercado Pago not in phase 1 unless add-on O01 is taken.

---

## 9. Notes for the client

- Validity: 30 days from 2026-04-02.
- Currency: USD. Argentine-side invoicing in USD via the AFIP export-of-services regime if contractor invoices from an AR entity. Confirm OQ-008.
- Payment terms: net-15 from invoice date.
- Late payment: 2% / month, capped at maximum permitted by law.
- Currency-conversion fluctuations on USD↔ARS are not absorbed by the contractor.

---

### How this was derived
- Line items derived from 7 phases of `02-tech-spec.md` modules + `05-roadmap.md`.
- Effort estimated via PERT per line item; total 119.6 person-days cross-checked against roadmap (18 weeks × ~1.5 effective FTE engineering = ~135 person-days → 119.6 well inside roadmap envelope).
- Rate card placeholders pending OQ-007.
- Risk reserve: 18% (above default 15%) due to 8 open questions, 3 source contradictions, and a hard launch date.
- Tax treatment per Argentina (IVA 21%, exclusive); deactivated if contractor invoices from a non-AR entity (OQ-008).
- Two variants reflect CTR-001 (budget conflict between source PDFs).
