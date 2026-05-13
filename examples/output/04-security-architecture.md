# Security Architecture — Northbeam Wholesale Portal

> Threat model and controls for the system described in `02-tech-spec.md`. Baseline: OWASP ASVS L2. Compliance regimes in scope: GDPR (Art. 5, 6, 15, 17, 32, 33), Argentina Ley 25.326.

## 1. Scope & compliance regimes

- **GDPR** (Regulation (EU) 2016/679) — because at least one customer is in Spain (REQ-018; brief.pdf p.3).
- **Argentina Ley 25.326** (Ley de Protección de los Datos Personales) — because the controller (Northbeam Coffee Co.) is established in Argentina.
- **PCI-DSS** — *not* in scope for phase 1. Card payments go through Mercado Pago Checkout (phase 2); no card data touches our systems (we operate at SAQ-A level if/when MP is enabled).
- **Industry frameworks referenced**: OWASP ASVS L2, OWASP Top 10 2021, CIS AWS Foundations Benchmark.

## 2. Data classification

| Entity / field | Class | Notes |
|---|---|---|
| `Account.legal_name`, `tax_id`, `billing_email`, `User.email` | PII | Business-identifying. |
| `User.password_hash` | Auth secret | Argon2id; never logged. |
| Session cookies | Auth secret | `HttpOnly`, `Secure`, `SameSite=Lax`. |
| `Order`, `OrderLine`, pricing | Confidential | Per-account pricing is competitively sensitive. |
| `Invoice` PDFs | Confidential + PII | Contains legal name + tax id. |
| `PriceList` | Confidential | Per-account pricing. |
| SKU catalog, public images | Internal | Not consumer-public; visible to all logged-in customers. |
| `AuditLog` | Confidential | Retain for compliance. |

## 3. Threat model (STRIDE)

Scoped to the components actually present in the system. Listing the threats that matter — not an exhaustive catalogue.

| ID | Component | Category | Threat | Mitigation | Residual |
|---|---|---|---|---|---|
| T-01 | Login | Spoofing | Credential stuffing / brute force | Rate limit (10/min/IP), account lockout after 5 failures (15-min reset), Argon2id hashing, MFA optional (post-launch). | Low. |
| T-02 | Session | Tampering | Cookie tampering / theft | Signed session cookies (`HttpOnly`, `Secure`, `SameSite=Lax`); short idle timeout (60 min); CSRF tokens on state-changing routes. | Low. |
| T-03 | API | Information disclosure | Cross-account data leak via IDOR | Per-request authorization: every query scoped by `account_id` derived from session, never from the client. Tested. | Low. |
| T-04 | Catalog | Information disclosure | Customer A sees customer B's per-account prices | Price lookup is server-side, keyed off session account. Never expose price-list IDs to client. | Low. |
| T-05 | Order edit | Tampering | AM modifies an accepted order without trace | All edits write to `AuditLog`. Acceptance is irreversible without admin override + audit entry. | Low. |
| T-06 | Invoice PDF | Information disclosure | Customer accesses another's invoice via guessed URL | Invoice URLs are signed time-limited S3 URLs; ACL verifies invoice belongs to requesting account. | Low. |
| T-07 | Admin UI | Elevation of privilege | Customer escalates to AM role | Roles enforced server-side; client cannot self-assign. RBAC tested in CI. | Low. |
| T-08 | API | DoS | Burst at end-of-month spikes | ALB + ECS autoscaling; RDS sized with headroom; rate limits per IP and per account. Load test before launch. | Medium until load-tested. |
| T-09 | Mercado Pago webhook (phase 2) | Spoofing | Forged payment notifications | Verify HMAC signature; idempotency keys; reconcile against MP API on every webhook. | Low. |
| T-10 | DB | Tampering | Unauthorized DB-level mutation | RDS in private subnet; access via IAM + Secrets Manager; no public access; least-privilege DB users. | Low. |
| T-11 | Backups | Information disclosure | Compromised backups | RDS snapshots encrypted (KMS-managed); S3 versioning with encryption (SSE-KMS); KMS key access audited. | Low. |
| T-12 | Bulk price-list upload | Tampering | Malformed CSV causes price corruption | Pre-import diff preview; admin confirmation; transactional commit; rollback on validation failure. | Low. |
| T-13 | Email | Spoofing | Phishing using northbeam.coffee from-address | SES with verified domain; SPF/DKIM/DMARC=quarantine. | Low. |
| T-14 | Forgot-password | Information disclosure | User enumeration | Generic response regardless of email existence; tokens single-use, 1-hour expiry. | Low. |
| T-15 | Web app | Information disclosure | XSS via unsafe rendering of order notes / SKU descriptions | Output-encode all user-input fields; CSP without `unsafe-inline`. | Low. |

## 4. Identity & access

### 4.1 Authentication
- **Method**: email + password.
- **Hashing**: Argon2id (memory 64MB, iterations 3, parallelism 1).
- **MFA**: optional TOTP, opt-in for staff at launch; required for `admin` post-launch (OQ).
- **Federated**: none in phase 1.
- **Password policy**: min 12 chars; checked against known-breached list (k-anonymity haveibeenpwned API).

### 4.2 Sessions
- Server-side session store in Postgres + Redis cache; signed session ID cookie.
- Cookie attributes: `HttpOnly`, `Secure`, `SameSite=Lax`.
- Idle timeout: 60 minutes.
- Absolute timeout: 12 hours; refresh on login.
- Logout revokes server-side session immediately.

### 4.3 Roles & permissions

| Resource | customer | am | warehouse | admin |
|---|---|---|---|---|
| Own orders | R/W | — | — | R |
| All orders | — | R/W | R (accepted only) | R |
| Own invoices | R | — | — | R |
| Catalog | R | R | R | R/W |
| Own price list | R | — | — | R |
| All price lists | — | — | — | R/W |
| Accounts | own (R) | R | — | R/W |
| Users (staff) | — | — | — | R/W |
| Audit log | — | R | — | R |

### 4.4 Service-to-service auth
- Job worker → DB: IAM-authenticated RDS connection; least-privilege role.
- Web → SES: IAM with `ses:SendEmail` only.
- Web → S3: IAM with read/write to invoice bucket only.
- MP webhook → Web: HMAC verification; no shared session.

### 4.5 Account lifecycle
- **Signup**: staff-driven; an admin creates the account and invites the first user(s) via email token.
- **Recovery**: forgot-password flow; rate-limited; tokens 1-hour single-use.
- **Deactivation**: admin disables a user; sessions revoked.
- **Deletion**: GDPR Art. 17 / Ley 25.326 right of erasure. Customer-account-level deletion executes a documented runbook: anonymize the `User` rows, keep `Order`/`Invoice` (legal/tax retention), redact PII from `AuditLog` actor names. Retention period for financial records: 10 years (Argentine commercial law; verify with client lawyer — see OQ).

## 5. Data protection

### 5.1 In transit
- TLS 1.2+ everywhere. HTTP→HTTPS redirect at the ALB; HSTS with 6-month max-age, preload-eligible.
- mTLS not required (no service mesh at this scale).

### 5.2 At rest
- RDS: storage encryption with AWS-KMS-managed CMK.
- S3: SSE-KMS on invoice and picking-slip buckets; bucket policies deny non-TLS access.
- Logs: CloudWatch encrypted.
- Backups: encrypted by inheritance.

### 5.3 Backups
- RDS automated daily snapshots; 14-day retention. Multi-AZ for HA, not for DR — DR via point-in-time-restore.
- S3 versioning on invoice bucket; lifecycle to Glacier Deep Archive after 1 year.
- **Quarterly restore drill** documented in runbooks.

### 5.4 Logs & telemetry
- Structured JSON logs.
- **PII allow-list**: `account_id`, `user_id`, `order_id`, `sku_id`, `correlation_id`, request path, status. Anything not on the list must not appear.
- Verified by an automated check in CI: deny merge if a log line includes any field labeled `pii` in the data dictionary.
- Sentry scrubs request bodies by default; allow-listed.

### 5.5 Data residency
- All RDS, S3, CloudWatch, Sentry data in `eu-west-1` (Ireland).
- Reasoning: REQ-017 requires Argentina or EU and forbids US. No Argentine AWS region exists; eu-west-1 satisfies the rule and the GDPR-applicable customer's expectations.

## 6. Application security controls

| Control | Implementation | Owner |
|---|---|---|
| Input validation | `zod` schemas on every API boundary. | Backend |
| Output encoding | React handles by default; raw HTML rendering banned. | Frontend |
| Parameterized queries | Prisma / `pg` parameterized only; raw SQL forbidden outside migrations. | Backend |
| CSRF protection | Double-submit cookie + `SameSite=Lax`. | Backend |
| Rate limiting | Per-IP and per-account on `/auth/*` and POST endpoints; ALB+Redis. | DevOps |
| Security headers | CSP without `unsafe-inline`; HSTS; X-Content-Type-Options; Referrer-Policy `strict-origin-when-cross-origin`; Permissions-Policy minimal. | Backend |
| Dependency mgmt | `npm audit` + Dependabot weekly; ≤7-day patch SLA for high/critical. | Tech lead |
| Secrets | AWS Secrets Manager; never in env files in repo; rotated every 90 days. | DevOps |
| Audit trail | `AuditLog` for: price changes, order edits, acceptance, user role changes. | Backend |
| Pen test | Once before launch; remediate findings before go-live. | External vendor (OQ) |

## 7. Infrastructure security

- **Network**: VPC with public (ALB), private (ECS), and isolated (RDS) subnets. Security groups: ALB→ECS on 443; ECS→RDS on 5432; ECS→Redis on 6379; no other lateral traffic.
- **Bastion**: no SSH bastion. Admin access to RDS via IAM-authenticated Session Manager tunnel.
- **IAM**: one role per service; named, least-privilege; no `*` in resource ARNs except where unavoidable.
- **Secrets**: Secrets Manager only. Local dev uses `.env` (gitignored).
- **Container scanning**: ECR scan-on-push; deploy blocked on critical findings.
- **DR**: RPO 24h, RTO 4h (targets; confirm with client — see OQ-004).

## 8. Compliance mapping

### GDPR

| Article | Requirement | Control |
|---|---|---|
| Art. 5 | Data minimization | Schema review: no email-marketing fields, no birth dates, etc. |
| Art. 6 | Lawful basis | Performance of contract (B2B wholesale). Documented in DPA. |
| Art. 15 | Right of access | Self-serve data export endpoint for account owners (CSV + JSON). |
| Art. 17 | Right to erasure | Documented runbook (see §4.5). |
| Art. 28 | Processor obligations | DPA with Northbeam; AWS DPA in place via AWS sign-up. |
| Art. 32 | Security of processing | TLS + at-rest encryption + RBAC + audit. |
| Art. 33 | Breach notification | Incident response runbook (§9): notify within 72 hours of awareness. |
| Art. 44+ | International transfers | Data resides in eu-west-1; no transfers outside EEA. |

### Argentina Ley 25.326

| Article | Requirement | Control |
|---|---|---|
| Art. 4 | Quality of data | Data correction via self-serve account screen. |
| Art. 6 | Information to data subject | Privacy notice on signup; in account page. |
| Art. 9 | Data security | Equivalent to GDPR Art. 32. |
| Art. 16/17/18 | Access / rectification / suppression | Same controls as GDPR Arts. 15/16/17. |
| Art. 25 | Registration with AAIP | Northbeam to register processing activities (controller obligation; surface to legal). |

## 9. Incident response

- **Detection**: error rate alerts (Sentry); auth-failure spikes; AWS GuardDuty.
- **Triage roles**: tech lead (commander), one engineer (investigator), one stakeholder liaison (Maya Rios or delegate).
- **Containment**: standard playbook per category (auth compromise, data leak, infrastructure outage, third-party-vendor incident).
- **Notification**:
  - Client (Northbeam) within 4 hours of confirmed P1.
  - Affected data subjects: within 72 hours of confirmed personal-data breach (GDPR Art. 33).
  - Authorities: AAIP (Argentina) and applicable EU DPA, within 72 hours.
- **Post-incident**: blameless postmortem within 5 business days; share with Northbeam.

## 10. Operational security

- **Onboarding**: contractor staff get access only to the project's AWS role; sso-only; no shared accounts.
- **Offboarding**: access revoked within 4 hours of role change; verified weekly via access review.
- **Laptop posture**: full-disk encryption, OS auto-update, MDM if available — at minimum self-attested.
- **Vendor risk**: AWS (DPA), Sentry (DPA, EU), Mercado Pago (data processor agreement at phase 2 onboarding).
- **Security review cadence**: full re-review annually; targeted review before any release that changes auth or data-classification.

## 11. Launch-readiness checklist

| Item | Owner | Status |
|---|---|---|
| TLS valid, HSTS enabled, HTTP→HTTPS redirect | DevOps | — |
| Security headers verified via securityheaders.com | Backend | — |
| All API endpoints behind authn + per-account authz | Backend | — |
| RBAC matrix tests passing in CI | Backend | — |
| `AuditLog` writes verified for all listed actions | Backend | — |
| Argon2id confirmed; no plaintext password code path | Backend | — |
| Rate limits configured on `/auth/*` + write endpoints | DevOps | — |
| Secrets in Secrets Manager; rotation runbook exists | DevOps | — |
| Backups configured; restore drill executed once | DevOps | — |
| RDS encrypted; S3 buckets encrypted + private | DevOps | — |
| PII allow-list logging check in CI | Tech lead | — |
| Pen test completed; high/critical findings closed | External vendor | — |
| DPA with Northbeam signed | Legal | — |
| Privacy notice live on signup + account screen | Frontend | — |
| Incident response runbook reviewed | Tech lead | — |
| Data-export and data-erasure runbooks tested | Backend | — |
| GDPR Art. 33 + AAIP notification template ready | Tech lead | — |

---

### How this was derived
- Compliance regimes derived from REQ-018, REQ-019, CON-004, CON-005 plus the Spain-customer detail in brief.pdf p.2 / meeting-notes.pdf.
- Data classes derived from entities in `02-tech-spec.md` §5.
- Threat model scoped to actual components present; STRIDE applied per component.
- Controls referenced to OWASP ASVS L2 as the baseline.
- Region (eu-west-1) carried forward from `02-tech-spec.md` §9 (region note).
