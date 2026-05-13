# Budget — [PROJECT NAME]

> One-line scope summary. E.g. "Fixed-price delivery of v1 of [project], including discovery, build, and 30-day warranty."

| Field | Value |
|---|---|
| Project | [PROJECT NAME] |
| Client | [CLIENT NAME] |
| Pricing model | Fixed-price / Time-and-materials / Retainer |
| Currency | [USD / EUR / ARS / …] |
| Validity | [N] days from [YYYY-MM-DD] |
| Tax treatment | Inclusive / Exclusive of [tax name] |
| Risk reserve | [X]% of subtotal |
| Source documents | [list] |

---

## 1. Summary

| Total (excl. tax) | [currency] [amount] |
|---|---|
| Risk reserve ([X]%) | [currency] [amount] |
| Subtotal | [currency] [amount] |
| Tax ([X]% if applicable) | [currency] [amount] |
| **Grand total** | **[currency] [amount]** |

---

## 2. Rate card

| Role | Day rate | Source |
|---|---|---|
| Project lead | [rate] | client-supplied / placeholder |
| Senior engineer | [rate] | |
| Engineer | [rate] | |
| UX/UI designer | [rate] | |
| QA | [rate] | |
| DevOps | [rate] | |

If rates are placeholders, list them in `99-open-questions.md`.

---

## 3. Line items

Estimates use PERT: `expected = (O + 4L + P) / 6`, rounded to half-days.

### Phase 1 — [name]
| ID | Item | REQs | O | L | P | Expected days | Role mix | Subtotal |
|---|---|---|---|---|---|---|---|---|
| L01 | | | | | | | | |
| L02 | | | | | | | | |
| **Phase 1 subtotal** | | | | | | **[d]** | | **[amount]** |

### Phase 2 — [name]
| ID | Item | REQs | O | L | P | Expected days | Role mix | Subtotal |
|---|---|---|---|---|---|---|---|---|
| L0N | | | | | | | | |
| **Phase 2 subtotal** | | | | | | **[d]** | | **[amount]** |

### Project-wide lines
| ID | Item | Basis | Subtotal |
|---|---|---|---|
| PM | Project management | [X]% of engineering effort | |
| QA | Quality assurance / UAT | [X]% of engineering effort or dedicated days | |
| Discovery / kickoff | If applicable | | |
| DevOps / environments | Setup + ongoing | | |
| Warranty (post-acceptance) | [N] days bug-fix capacity | included / zero | |
| **Project-wide subtotal** | | | **[amount]** |

### Totals
| | Amount |
|---|---|
| Phase 1 subtotal | |
| Phase 2 subtotal | |
| Project-wide subtotal | |
| Risk reserve ([X]%) | |
| **Total excl. tax** | |
| Tax | |
| **Grand total** | |

---

## 4. Payment schedule

For fixed-price:

| Milestone | Trigger | % | Amount |
|---|---|---|---|
| Kickoff deposit | Contract signed | 30% | |
| Milestone 1 | [event] | 30% | |
| Milestone 2 | [event] | 30% | |
| Final | Acceptance of [final deliverable] | 10% | |

For T&M:

| Cadence | Trigger | Cap |
|---|---|---|
| Monthly invoice | End of month | up to [N] hours/month |

For retainer:

| Item | Amount | Notes |
|---|---|---|
| Monthly fee | | up to [N] hours included |
| Overage rate | | per hour beyond included capacity |
| Rollover policy | | e.g. up to 20% unused hours roll one month |

---

## 5. Optional add-ons

| ID | Item | Description | Price |
|---|---|---|---|
| O01 | | | |
| O02 | | | |

Marked optional — not included in the totals above.

---

## 6. Out of scope

Items the client might assume are included but are not:

- Production hosting / cloud bills.
- Third-party licenses (SaaS tools, fonts, stock imagery).
- Content production (copywriting, photography, video).
- Translations / localization beyond the chosen locale(s).
- Post-launch support beyond the warranty period.
- Marketing / SEO work.
- ...

---

## 7. Assumptions

If any of these prove false, the price changes. The change-order process in the contract handles those changes.

- ...
- ...
- ...

---

## 8. Notes for the client

- Validity: this quote is valid for [N] days.
- Currency: [currency]. Exchange-rate fluctuations: [absorbed by contractor | passed to client | adjusted monthly].
- Taxes: [included | excluded — invoiced separately].
- Payment terms: net-[N] from invoice date.
- Late payment: [policy].

---

### How this was derived
- Line items derived from <N> tech-spec modules and <M> roadmap phases.
- Effort estimated via PERT per line item.
- Rate card: <client-supplied | placeholder — see OQ-XX>.
- Risk reserve: <X>% (rationale: <one line>).
- Tax treatment per <jurisdiction>.
- Total cross-checked against roadmap duration × team size.
