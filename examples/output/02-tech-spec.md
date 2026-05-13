# Technical Specification — Northbeam Wholesale Portal

> A web portal for Northbeam Coffee's wholesale customers to authenticate, browse a per-account catalog, place and reorder shipments, and download invoices. Internal users (account managers, warehouse) operate orders through a separate admin view.

| Field | Value |
|---|---|
| Project | Northbeam Wholesale Portal |
| Client | Northbeam Coffee Co. |
| Author | PDFjedi (draft) — [HUMAN REVIEWER] |
| Version | 0.1 |
| Date | 2026-04-02 |
| Status | Draft |
| Source documents | brief.pdf, meeting-notes.pdf |

---

## 1. Overview

### 1.1 Problem
Wholesale ordering at Northbeam runs over WhatsApp and email. With 40 accounts today it is barely manageable; the target of 200 accounts by EOY 2026 makes it untenable. Account managers spend ~4 hrs/day on order intake, with ~3 manual pricing errors per month [brief.pdf p.1, p.4].

### 1.2 Goals
- Customers self-serve orders: typical reorder in <60s (REQ-014, REQ-003).
- Account managers reduce order-intake time from ~4 hr/day to <1 hr/day (REQ-020).
- Zero pricing errors in first 90 days post-launch (REQ-013).
- Handle 3–4× end-of-month spike without slowdown (REQ-012).

### 1.3 Non-goals
- Retail/consumer storefront (DEC-001).
- Mobile app (DEC-002).
- POS integration (DEC-003).
- AI / personalization (DEC-004).

### 1.4 Success metrics
| Metric | Target | Source |
|---|---|---|
| % wholesale orders via portal | 80% by Q1 2027 | brief.pdf p.4 |
| AM time on order intake | <1 hr/day | brief.pdf p.4 |
| Pricing errors | 0 in first 90 days | brief.pdf p.4 |
| Reorder placement time | <60s | brief.pdf p.4 |

---

## 2. Users & roles

| Role | Description | Top jobs-to-be-done | Linked REQs |
|---|---|---|---|
| Wholesale customer | Café/hotel/office account buyer. | Place reorder; browse catalog; view order history; download invoice. | REQ-001, REQ-002, REQ-003, REQ-006 |
| Account manager | Northbeam staff (3 people). | View incoming orders; edit if needed; mark ready for fulfillment. | REQ-004, REQ-011, REQ-020 |
| Warehouse operator | Northbeam staff. | Print picking slips for accepted orders. | REQ-005 |
| Northbeam admin | Internal super-user. | Manage SKUs, accounts, per-account price lists. | REQ-007 (administration of) |

---

## 3. Functional scope

### 3.1 Authentication & accounts
| ID | Capability | Description | Priority | REQs |
|---|---|---|---|---|
| F-AUTH-01 | Customer login | Email + password, with reset flow. | Must | REQ-001 |
| F-AUTH-02 | Staff login | Same, with role-based access (AM, warehouse, admin). | Must | REQ-004, REQ-005, REQ-011 |
| F-AUTH-03 | Session management | Secure session cookies, idle timeout. | Must | (derived) |

### 3.2 Catalog & pricing
| ID | Capability | Description | Priority | REQs |
|---|---|---|---|---|
| F-CAT-01 | Browse SKUs | Filter by category, search by name. | Must | REQ-002 |
| F-CAT-02 | Per-account price list | Each customer sees prices specific to their account. | Must | REQ-007 |
| F-CAT-03 | Catalog management | Admin CRUD on SKUs, categories, stock status. | Must | (derived) |
| F-CAT-04 | Price-list management | Admin CRUD on per-account price lists; bulk operations. | Must | REQ-007 |

### 3.3 Ordering & reorder
| ID | Capability | Description | Priority | REQs |
|---|---|---|---|---|
| F-ORD-01 | Cart & checkout | Add SKUs, set quantities, confirm. | Must | REQ-002 |
| F-ORD-02 | Quick reorder | One-click reorder from last N orders; ≤60s flow. | Must | REQ-003, REQ-014 |
| F-ORD-03 | Order history | Paginated list with status, totals, invoice download. | Must | REQ-006 |
| F-ORD-04 | Invoice PDF | Generated on order acceptance; downloadable. | Must | REQ-006 |

### 3.4 Order management (admin)
| ID | Capability | Description | Priority | REQs |
|---|---|---|---|---|
| F-OPS-01 | AM inbox | New / pending / accepted / shipped order queue. | Must | REQ-004 |
| F-OPS-02 | Order edit | AM modifies quantities, lines, notes. | Must | REQ-004 |
| F-OPS-03 | Acceptance | AM marks ready-for-fulfillment, generates invoice. | Must | REQ-004 |
| F-OPS-04 | Picking slip | Warehouse prints A4 PDF picking slip per accepted order. | Must | REQ-005 |
| F-OPS-05 | Fast order lookup | Any order findable in ≤2 clicks from AM home. | Must | REQ-011 |

### 3.5 Payments
| ID | Capability | Description | Priority | REQs |
|---|---|---|---|---|
| F-PAY-01 | Bank transfer | Default flow; invoice issued, payment marked manually by AM. | Must | REQ-008 |
| F-PAY-02 | Mercado Pago | Credit card payment via MP checkout link on invoice. | Should (defer to phase 2 if budget pressure) | REQ-008, DEC-006 |

### 3.6 Localization
| ID | Capability | Description | Priority | REQs |
|---|---|---|---|---|
| F-LOC-01 | Spanish UI | Default locale. | Must | REQ-009 |
| F-LOC-02 | English UI | Switchable per user. | Must | REQ-010 |
| F-LOC-03 | Currency | ARS / USD per account configuration. | Should — see OQ-008 | REQ-007 (implied) |

### 3.7 Integrations
| ID | Capability | Description | Priority | REQs |
|---|---|---|---|---|
| F-INT-01 | Tango Gestión sync | Bidirectional sync of invoices / customers. | TBD | REQ-021 → OQ-003 |

---

## 4. Architecture

### 4.1 High-level diagram

```
[ Customer browser ]       [ AM / Warehouse browser ]
        │                            │
        └─────────────────┬──────────┘
                          │ HTTPS
                          ▼
              ┌──────────────────────┐
              │  Next.js web app     │
              │  (SSR + API routes)  │
              └──────────┬───────────┘
                         │
            ┌────────────┼────────────────┐
            ▼            ▼                ▼
   ┌──────────────┐ ┌──────────┐ ┌────────────────┐
   │ PostgreSQL   │ │ S3       │ │ Mercado Pago   │
   │ (RDS, eu-w1) │ │ (PDFs,   │ │ Checkout API   │
   │              │ │  picking │ │ (phase 2)      │
   │              │ │  slips)  │ │                │
   └──────────────┘ └──────────┘ └────────────────┘
            │
            ▼
   ┌──────────────┐
   │ Job worker   │  (PDF generation, email)
   │ (BullMQ/SQS) │
   └──────────────┘
```

### 4.2 Components
| Component | Responsibility | Tech | Depends on | REQs satisfied |
|---|---|---|---|---|
| Web app (customer) | Customer portal: catalog, cart, reorder, history. | Next.js + TypeScript | DB, S3 | REQ-001..003, 006, 009, 010, 014 |
| Web app (admin) | AM inbox, order edit, AM admin, price-list mgmt. | Next.js (same app, gated routes) | DB | REQ-004, 007, 011, 020 |
| API layer | Internal REST routes, validation, RBAC. | Next.js API routes | DB | all functional |
| PostgreSQL | System of record: accounts, SKUs, price lists, orders, invoices. | RDS PostgreSQL 16 (multi-AZ) | — | all data |
| Object storage | Invoice PDFs, picking slip PDFs, product images. | S3 | — | REQ-005, 006 |
| Job worker | Async PDF generation, transactional email. | BullMQ on Redis (ElastiCache) | DB, S3 | REQ-005, 006 |
| Email sender | Order confirmation, invoice delivery. | Amazon SES | Job worker | REQ-006 |
| Mercado Pago checkout | Card payments (phase 2). | MP REST API | API layer | REQ-008 |

### 4.3 Integrations
| System | Direction | Protocol | Auth | Data exchanged | REQs |
|---|---|---|---|---|---|
| Mercado Pago | out | REST + webhook in | API key + webhook signature | Payment intents, status updates | REQ-008 |
| Tango Gestión | bidirectional | Not specified — see OQ-003 | TBD | Customers, invoices | REQ-021 |
| Amazon SES | out | REST | IAM | Transactional emails | REQ-006 |

---

## 5. Data model

### 5.1 Entities

#### `Account`
- Purpose: a wholesale customer (e.g. a café).
- Fields:
  | Field | Type | Constraints | Notes |
  |---|---|---|---|
  | id | uuid | PK | |
  | legal_name | text | not null | PII (business). |
  | tax_id | text | unique | PII (CUIT in AR). |
  | billing_email | text | not null | PII. |
  | locale | enum('es','en') | default 'es' | REQ-009/010. |
  | currency | enum('ARS','USD') | not null | OQ-008. |
  | data_residency | enum('AR','EU') | not null | CON-004. |
- Relations: 1-n `User`, 1-n `Order`, 1-1 `PriceList`.
- Indexes: `tax_id` (unique).
- PII fields: legal_name, tax_id, billing_email.

#### `User`
- Purpose: a person who can log in.
- Fields: id, account_id (nullable for staff), email, password_hash, role (customer / am / warehouse / admin), last_login, locale.
- PII fields: email, password_hash (hashed).

#### `SKU`
- Purpose: a sellable product.
- Fields: id, code, name_es, name_en, description_es, description_en, default_price_ars, default_price_usd, category, stock_status, image_url.

#### `PriceList`
- Purpose: per-account pricing for SKUs.
- Fields: id, account_id, sku_id, price, currency, effective_from, effective_to.
- Indexes: (account_id, sku_id, effective_from).

#### `Order`
- Purpose: a wholesale order.
- Fields: id, account_id, status (draft/submitted/accepted/shipped/cancelled), placed_at, accepted_at, accepted_by_user_id, currency, subtotal, tax, total, notes.
- Relations: 1-n `OrderLine`, 1-1 `Invoice`.

#### `OrderLine`
- Fields: id, order_id, sku_id, qty, unit_price, line_total, notes.

#### `Invoice`
- Fields: id, order_id, number, issued_at, due_at, status, pdf_url, payment_method, paid_at.

#### `AuditLog`
- Purpose: who-did-what for sensitive actions (price changes, order edits, acceptance).
- Fields: id, actor_user_id, action, entity_type, entity_id, before, after, at.

### 5.2 Data flow
A customer places an order → row in `Order` with status=`submitted` → notification email to assigned AM → AM edits if needed → AM accepts → `Invoice` created → PDF generated by worker → emailed to customer → warehouse prints picking slip PDF → warehouse marks shipped → order closed.

---

## 6. API surface

### 6.1 External APIs (customer-facing)
| Method | Path | Auth | Inputs | Outputs | REQs |
|---|---|---|---|---|---|
| POST | /api/auth/login | none | email, password | session cookie | REQ-001 |
| GET | /api/catalog | session | filters | SKUs with per-account prices | REQ-002, 007 |
| POST | /api/orders | session | line items | order_id | REQ-002 |
| POST | /api/orders/:id/reorder | session | — | new order_id | REQ-003, 014 |
| GET | /api/orders | session | filters | order list | REQ-006 |
| GET | /api/orders/:id/invoice.pdf | session | — | invoice PDF stream | REQ-006 |

### 6.2 Internal APIs (staff)
| Method | Path | Auth | Inputs | Outputs | REQs |
|---|---|---|---|---|---|
| GET | /api/admin/orders | session + role(am) | filters | order queue | REQ-004, 011 |
| PATCH | /api/admin/orders/:id | session + role(am) | edited lines | updated order | REQ-004 |
| POST | /api/admin/orders/:id/accept | session + role(am) | — | order + invoice id | REQ-004, 005 |
| GET | /api/admin/orders/:id/picking-slip.pdf | session + role(warehouse) | — | picking slip PDF | REQ-005 |
| POST | /api/admin/price-lists/bulk | session + role(admin) | CSV | counts | REQ-007 |

### 6.3 Webhooks emitted
None in phase 1. Mercado Pago inbound webhooks added in phase 2 if F-PAY-02 is included.

---

## 7. Non-functional requirements

| Category | Target | Source / open question |
|---|---|---|
| Performance | P95 page load <2s on broadband; reorder action <60s end-to-end | REQ-014 |
| Availability | 99.5% monthly outside maintenance windows | Not specified — OQ-004 |
| Scalability | 200 concurrent customer sessions, 3–4× daily order volume in end-of-month spikes | REQ-012 |
| Compatibility | Latest 2 versions of Chrome, Safari, Edge, Firefox | Not specified — chosen as default |
| Accessibility | WCAG 2.1 AA | Default (not specified in source — see OQ-009 in OQ doc if added) |
| Internationalization | Spanish + English at launch | REQ-009, REQ-010 |
| Observability | Application logs (CloudWatch), error tracking (Sentry), uptime monitoring | (derived; included in standard scope) |

---

## 8. Operations

### 8.1 Environments
- **Local dev**: docker-compose with Postgres + Redis; seeded data; `make dev`.
- **Staging**: AWS account, single-AZ, identical schema, scrubbed prod-shaped data.
- **Production**: AWS account managed by Northbeam IT; multi-AZ RDS; EU region (eu-west-1) per CON-004.

### 8.2 CI/CD
- GitHub Actions: lint → typecheck → test → build → deploy.
- Deploy strategy: rolling on ECS Fargate.
- Migrations: forward-only, run as a separate step before deploy.

### 8.3 Observability
- Logs: CloudWatch Logs; structured JSON; 30-day retention.
- Metrics: CloudWatch + AWS-managed Grafana.
- Errors: Sentry (EU instance, per CON-004).
- Uptime: AWS Synthetics canary on `/healthz`.

### 8.4 Backups & DR
- RDS automated daily snapshots; 14-day retention.
- S3 versioning on invoice bucket.
- RPO 24h / RTO 4h — to be confirmed (OQ-004).

### 8.5 Runbooks
- Pending: on-call playbook, incident response, common ops (rotate keys, restore DB, re-issue invoice).

---

## 9. Tech stack decisions

| Tier | Choice | Reason | Alternatives considered |
|---|---|---|---|
| Frontend | Next.js 14 + TypeScript + Tailwind | Single codebase for SSR + APIs; mature; very hireable in LATAM. | Remix, plain React + Node API. |
| Backend | Next.js API routes; Node 20 | Reduces team count; one repo. | Separate Fastify backend (rejected: team size 1–2 makes split overkill). |
| Database | PostgreSQL 16 on RDS | Boring, transactional, sufficient. JSONB available if needed later. | Aurora Postgres (rejected: cost), DynamoDB (rejected: relational fit). |
| Cache / queue | Redis on ElastiCache + BullMQ | Same primitive for both; well-supported. | SQS (acceptable; chose BullMQ for fewer moving parts at this scale). |
| Hosting | AWS, eu-west-1 (Ireland) | CON-003 (AWS) + CON-004 (data residency: EU is the only AWS region matching both EU and AR considerations for our Spain customer). | AWS sa-east-1 (acceptable; chose EU for GDPR clarity given the Spain account). See note. |
| Auth | Application-level (NextAuth + Postgres) | No PII to a third party; CON-005 + REQ-019. | Cognito (acceptable; chose self-hosted for data-control). |
| Object storage | S3 (same region) | Standard, durable, cheap. | — |
| Email | Amazon SES | Same cloud; deliverable from EU. | Postmark, SendGrid. |
| Error tracking | Sentry (EU) | Mature; EU instance keeps data in-region. | Datadog (cost). |
| PDF generation | Server-side `@react-pdf/renderer` | Designable in JSX; same skills as the rest of the codebase. | Headless Chrome (heavier). |

**Region note.** REQ-017 says "Argentina or EU, not US." There is no AWS region in Argentina; sa-east-1 is São Paulo (Brazil). We default to eu-west-1 to keep the Spain customer's data inside the EU; this satisfies REQ-017's hard rule ("not US"). If the client prefers a region closer to Buenos Aires, sa-east-1 is a one-line config change. Logged as OQ in `99-open-questions.md`.

---

## 10. Risks & unknowns

| ID | Risk | Likelihood | Impact | Mitigation | Linked OQ |
|---|---|---|---|---|---|
| R-01 | Budget conflict between brief and meeting notes (USD 50k vs 40k) prevents finalizing scope | H | H | Surfaced as CTR-001; presented two budget variants in 06-budget.md. | OQ-001 |
| R-02 | Tango Gestión integration in scope but undocumented | M | H | Defer to phase 2; phase 1 contract excludes it. | OQ-003 |
| R-03 | Hard launch date 2026-09-01 with unresolved scope | M | M | Time-box; risk reserve sized accordingly. | — |
| R-04 | Per-account price-list bulk imports unspecified format | M | M | Adopt CSV with a documented schema; admin UI for fixes. | — |
| R-05 | End-of-month spike loads not measured | L | M | Load-test before launch; provision RDS with headroom. | — |

---

## 11. Out of scope

- Consumer / retail storefront (DEC-001).
- Mobile native app (DEC-002).
- POS integration (DEC-003).
- AI / personalization (DEC-004).
- Tango Gestión integration in phase 1 (deferred; see OQ-003).
- Marketing site, SEO work, content production.
- Production AWS account-level administration (handled by Northbeam IT contractor per ASM-002).

---

### How this was derived
- Stack chosen via boring-tech rule; no source pin beyond AWS (CON-003) and EU/AR data residency (CON-004).
- Module list derived from REQ-001..REQ-021 clustered into 7 functional domains.
- Data model derived from entities implied by REQ-002, REQ-006, REQ-007, REQ-011.
- NFR targets cite source where present; gaps recorded as OQ-004.
- Region decision (eu-west-1) explained inline; alternate sa-east-1 noted.
- Open questions in `99-open-questions.md`.
