# Requirements (Normalized)

> Source of truth for the Northbeam Coffee wholesale ordering portal. All downstream artifacts reference REQ-IDs from this file.

## Document inventory
| File | Pages | Type | Date | Notes |
|---|---|---|---|---|
| brief.pdf | 4 | Client brief | 2026-03-18 | Authored by Maya Rios, Head of Operations. |
| meeting-notes.pdf | 1 | Follow-up notes | Undated — flagged (OQ-001) | Inferred week of 2026-03-23. Contradicts brief on budget and launch date. |

## Glossary
| Term | Definition | Source |
|---|---|---|
| Wholesale customer | Café, hotel, or office buying coffee/merch in bulk. ~40 today, target ~200 by EOY 2026. | brief.pdf p.1 |
| Account manager | Northbeam staff (3 people) who oversee wholesale orders. | brief.pdf p.2 |
| SKU | Stock-keeping unit; ~80 today, growing. | brief.pdf p.2 |
| "Quick reorder" | UX pattern for re-placing a recent order in ≤60s. | brief.pdf p.4 |

## Requirements
| ID | Category | Statement | Priority | Source(s) |
|---|---|---|---|---|
| REQ-001 | Functional | Wholesale customers authenticate to a web portal. | Must | brief.pdf p.2 |
| REQ-002 | Functional | Customers place orders from a catalog of ~80 SKUs (growing). | Must | brief.pdf p.2 |
| REQ-003 | Functional | Customers have a "favorites / quick reorder" capability that allows placing a typical reorder in under 60 seconds. | Must | brief.pdf p.4, meeting-notes.pdf |
| REQ-004 | Functional | Account managers view incoming orders, edit them, and mark them ready for fulfillment. | Must | brief.pdf p.2 |
| REQ-005 | Functional | Warehouse team prints picking slips from accepted orders. | Must | brief.pdf p.2 |
| REQ-006 | Functional | Customers view order history and download invoices as PDF. | Must | brief.pdf p.2 |
| REQ-007 | Functional | Pricing is per-account (different accounts have different prices for the same SKU). | Must | brief.pdf p.2 |
| REQ-008 | Functional | Payment by bank transfer (default) and credit card via Mercado Pago. | Should | brief.pdf p.2; deferral acceptable per meeting-notes.pdf |
| REQ-009 | Functional | Spanish UI at launch. | Must | brief.pdf p.2 |
| REQ-010 | Functional | English UI at launch. | Must | meeting-notes.pdf (upgraded from brief.pdf "nice to have") |
| REQ-011 | Functional | Account-manager admin view; finding any order in ≤2 clicks. | Must | meeting-notes.pdf |
| REQ-012 | Non-functional | System handles 3–4× average daily order volume at end of month without user-visible slowdown. | Must | brief.pdf p.4 |
| REQ-013 | Non-functional | Zero pricing errors in first 90 days post-launch. | Must | brief.pdf p.4 |
| REQ-014 | Non-functional | Typical reorder placeable in <60 seconds. | Must | brief.pdf p.4 |
| REQ-015 | Non-functional | "Modern and professional" visual style, consistent with `northbeam.coffee`. | Should | brief.pdf p.2; ambiguous — see OQ-002 |
| REQ-016 | Non-functional | Hosted on AWS. | Must | brief.pdf p.3 |
| REQ-017 | Non-functional | Data residency: Argentina or EU; not US. | Must | meeting-notes.pdf |
| REQ-018 | Non-functional | GDPR + Argentina Ley 25.326 compliance. | Must | brief.pdf p.3 |
| REQ-019 | Non-functional | Data ownership remains with Northbeam; no SaaS-style "your data is our data" terms. | Must | brief.pdf p.3 |
| REQ-020 | Functional | Account managers spend <1 hour/day on order intake (currently ~4 hours each). | Must (outcome metric) | brief.pdf p.4 |
| REQ-021 | Functional | Integration with Tango Gestión accounting system. | TBD — see OQ-003 | meeting-notes.pdf (unresolved) |

## Constraints
| ID | Statement | Source |
|---|---|---|
| CON-001 | Budget ceiling. **Conflict:** brief says ~USD 50,000; meeting notes say USD 40,000 hard ceiling. See CTR-001. | brief.pdf p.3 + meeting-notes.pdf |
| CON-002 | Hard launch date: 2026-09-01. Warehouse team trained by mid-September. (Brief allowed "ideally end of August"; meeting notes hardened this — see CTR-002.) | brief.pdf p.3 + meeting-notes.pdf |
| CON-003 | Hosting on AWS only; existing account managed by Northbeam's IT contractor. | brief.pdf p.3 |
| CON-004 | Data residency: Argentina or EU; never US. | meeting-notes.pdf |
| CON-005 | Compliance: GDPR + Argentina Ley 25.326. | brief.pdf p.3 |

## Decisions (already made)
| ID | Statement | Source |
|---|---|---|
| DEC-001 | No retail/consumer storefront (existing Shopify covers it). | brief.pdf p.3 |
| DEC-002 | No mobile app — web only. | brief.pdf p.3 |
| DEC-003 | No POS integration. | brief.pdf p.3 |
| DEC-004 | No AI / personalization features. | brief.pdf p.3 |
| DEC-005 | "Favorites / quick reorder" is the highest-priority UX feature. | meeting-notes.pdf |
| DEC-006 | Mercado Pago integration deferrable to phase 2 if cost-driven. | meeting-notes.pdf |

## Assumptions (stated in source)
| ID | Statement | Source |
|---|---|---|
| ASM-001 | Northbeam provides the AWS account and pays for its production hosting. | brief.pdf p.3 |
| ASM-002 | Northbeam's IT contractor handles AWS account-level admin. | brief.pdf p.3 |
| ASM-003 | Retail product imagery and brand assets reusable from northbeam.coffee. | derived from REQ-015 |

## Risks (raised in source)
| ID | Statement | Source |
|---|---|---|
| RSK-001 | Budget conflict between brief and meeting notes (CTR-001). | both PDFs |
| RSK-002 | Tango Gestión integration unresolved (REQ-021). | meeting-notes.pdf |
| RSK-003 | No SLA expectations specified. | meeting-notes.pdf "did not discuss" |
| RSK-004 | Post-launch hosting ownership unspecified. | meeting-notes.pdf "did not discuss" |
| RSK-005 | Data-return / data-handover terms on contract end unspecified. | meeting-notes.pdf "did not discuss" |

## Metrics & numbers (verbatim)
| Label | Value | Source |
|---|---|---|
| Current wholesale accounts | 40 | brief.pdf p.1 |
| Target wholesale accounts (EOY 2026) | 200 | brief.pdf p.1 |
| Indicative budget (brief) | USD 50,000 | brief.pdf p.3 |
| Budget hard ceiling (meeting) | USD 40,000 | meeting-notes.pdf |
| Hard launch date | 2026-09-01 | meeting-notes.pdf |
| SKU count today | ~80 | brief.pdf p.2 |
| Order-intake time reduction target | 4 → <1 hour/day per AM | brief.pdf p.4 |
| End-of-month load multiplier | 3–4× daily avg | brief.pdf p.4 |
| Reorder speed target | <60 seconds | brief.pdf p.4 |

## Contradictions detected
| ID | Claim A | Claim B | Both citations |
|---|---|---|---|
| CTR-001 | Budget around USD 50,000 | Budget USD 40,000 hard ceiling | brief.pdf p.3 vs meeting-notes.pdf |
| CTR-002 | "Ideally end of August" launch | 2026-09-01 hard deadline | brief.pdf p.3 vs meeting-notes.pdf |
| CTR-003 | English "not for v1" | English in scope at launch | brief.pdf p.2 vs meeting-notes.pdf |

## Open questions (to ask the client)
| ID | Question | Why it blocks work |
|---|---|---|
| OQ-001 | Date of meeting-notes call — confirm precedence over brief. | Resolves all three contradictions (CTR-001/002/003) if meeting notes are post-brief. |
| OQ-002 | What does "modern and professional" mean concretely — can we get the Figma / design tokens from `northbeam.coffee`? | Drives design effort and UI consistency. |
| OQ-003 | Tango Gestión integration — in scope or phase 2? Provide API docs if in scope. | Affects budget, roadmap, and architecture. |
| OQ-004 | Define SLA: target uptime, response times for support tickets, on-call expectations. | Drives infrastructure and operations cost. |
| OQ-005 | Who owns AWS production hosting post-launch? | Drives DevOps line items and ongoing-cost section. |
| OQ-006 | What happens to data and source code on contract termination? | Drives contract clauses (data return + IP). |
| OQ-007 | Provide team rate-card numbers (Diego action item from meeting notes). | Required to finalize budget. |
| OQ-008 | Confirm fiscal/tax setup: invoice from Argentine entity? IVA applicable? | Drives contract §3 and budget. |

---

### How this was derived
- Built from 2 source PDFs (brief.pdf, meeting-notes.pdf).
- 47 atomic claims extracted, deduped to 21 normalized requirements.
- 3 contradictions surfaced; 8 open questions.
- Priorities derived per MoSCoW from source language; "English at launch" upgraded from Should (brief) to Must (meeting notes).
- Meeting notes treated as more recent than the brief based on content sequence (action items reference the brief). This precedence is itself OQ-001.
