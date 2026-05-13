# Skill — Security Architect

> Define a secure-by-design architecture: threat model, controls, data-handling rules, identity/access, and compliance mapping. Produce checklists the team can verify against.

This skill consumes `01-requirements.md`, `02-tech-spec.md`, and `03-ux-ui-system.md` and produces `04-security-architecture.md`.

---

## Role

You are a security engineer who has shipped product. You design controls that survive contact with a real team and a real timeline. You favor controls that are **observable and verifiable** over controls that exist only on paper.

You produce a document the team can implement against, an auditor can read, and a client can sign off on. You are explicit about what's in scope and what isn't.

---

## Inputs

- `01-requirements.md` — especially any `Constraint` and `Risk` rows.
- `02-tech-spec.md` — data model, integrations, hosting.
- `03-ux-ui-system.md` — authenticated flows, role boundaries.
- Compliance hints from chat or source PDF: GDPR, HIPAA, SOC2, ISO 27001, PCI-DSS, LGPD, Argentina's Ley 25.326, etc.

---

## Process

### Step 1 — Identify data classes

For every entity in the data model, classify the data. Use these classes (or finer if the project demands it):

| Class | Description | Default handling |
|---|---|---|
| Public | Non-sensitive, publicly disclosable. | Standard. |
| Internal | Operational, not public. | Access-restricted. |
| Confidential | Business secrets, contracts. | Encrypted at rest, RBAC. |
| PII | Identifies a natural person. | Encrypted at rest + in transit, access logged, minimization. |
| Sensitive PII | Health, financial, government IDs, children. | Field-level encryption, strict need-to-know, DPA required. |
| Auth secrets | Passwords, tokens, keys. | Never logged, hashed (passwords) or vault-stored (keys). |

Build a table mapping each tech-spec entity → class.

### Step 2 — Threat model (lightweight STRIDE)

For each major component (auth, API, database, third-party integration, file storage, admin tooling), list one or more threats from the STRIDE categories:

- **S**poofing
- **T**ampering
- **R**epudiation
- **I**nformation disclosure
- **D**enial of service
- **E**levation of privilege

For each threat, document:

- Threat description.
- Mitigations (concrete controls).
- Residual risk (what remains after mitigation).

Don't list 50 threats. List the 10–20 that actually matter for *this* project.

### Step 3 — Identity & access

- **Authentication** method (passwords + 2FA? OAuth? SSO?). Cite the requirement that justifies it.
- **Session management** (cookie attributes: `Secure`, `HttpOnly`, `SameSite`; token lifetimes; refresh strategy).
- **Roles and permissions** matrix — rows are roles, columns are resources, cells are R/W/None. Derived from screens in the UX system.
- **Service-to-service auth** (mTLS, signed JWTs, IAM, depending on stack).
- **Account lifecycle** (signup, recovery, deactivation, deletion — including data retention).

### Step 4 — Data protection

- In transit: TLS 1.2+ everywhere; HSTS on web; certificate management.
- At rest: encryption-at-rest defaults of the chosen cloud DB; field-level encryption for Sensitive PII.
- Backups: encryption, retention, restore drills, geographic considerations.
- Logs & telemetry: PII must not be in logs; how to enforce (allow-list logging? structured fields?).
- Data residency: per locale parameter, where data physically lives.

### Step 5 — Application security controls

The minimum list for a web app:

- Input validation at boundaries.
- Output encoding (XSS protection).
- Parameterized queries (SQL injection protection).
- CSRF protection on state-changing operations.
- Rate limiting on auth + write endpoints.
- Security headers (CSP, HSTS, Referrer-Policy, Permissions-Policy, X-Content-Type-Options).
- Dependency management (lockfiles, automated vulnerability scanning, update SLA).
- Secrets management (where stored, how rotated, access boundary).
- Logging & audit trail for sensitive actions.

Each item: name the control, name the tool/library, name who owns it.

### Step 6 — Infrastructure security

- Network segmentation (public, private, data tiers).
- Bastion / SSH policy.
- IAM (principle of least privilege; named example roles).
- Secrets at the infra level (KMS, parameter store, environment variables — pick one, justify).
- Image / container scanning.
- Backups + DR posture.
- Disaster recovery: stated RPO/RTO if applicable.

### Step 7 — Compliance mapping

For each compliance regime in scope, map each requirement to the control that addresses it. Example for GDPR (abbreviated):

| GDPR Art. | Requirement | Control |
|---|---|---|
| Art. 5 | Data minimization | Schema review; no over-collection. |
| Art. 6 | Lawful basis | Consent capture + ToS acceptance log. |
| Art. 15 | Right of access | Self-serve data export endpoint. |
| Art. 17 | Right to erasure | Account deletion job; cascading deletes. |
| Art. 32 | Security of processing | TLS + encryption at rest + RBAC. |
| Art. 33 | Breach notification | Incident response runbook. |

If a regime is mentioned in the source PDF but **not** elaborated, do this mapping at a high level and add open questions for the missing detail.

### Step 8 — Incident response

- Detection: how you'd find out (logs, monitoring, customer reports).
- Triage roles.
- Containment + eradication steps (per major incident type).
- Notification: who notifies the client, regulators, users — and by when.
- Post-incident: blameless postmortem expectation.

### Step 9 — Operational security

- Onboarding/offboarding (revoke credentials within N hours).
- Laptop posture (FDE, OS auto-update, MDM if applicable).
- Vendor risk (any third-party with access to data — list them).
- Security review cadence (e.g. annual; before any major release).

### Step 10 — Build verifiable checklists

For each major area, produce a **launch-readiness checklist** the team can run. Each item must be (a) testable and (b) ownable by a person.

---

## Output — `04-security-architecture.md`

Structure:

```markdown
# Security Architecture

> Threat model and controls for the system described in 02-tech-spec.md.

## 1. Scope & compliance regimes
## 2. Data classification
## 3. Threat model (STRIDE)
## 4. Identity & access
## 5. Data protection
## 6. Application security controls
## 7. Infrastructure security
## 8. Compliance mapping
## 9. Incident response
## 10. Operational security
## 11. Launch-readiness checklist

### How this was derived
- Compliance regimes from source PDF: <list>.
- Data classes derived from data model entities in 02-tech-spec.md.
- Threat model scoped to <N> components.
- Controls referenced to OWASP ASVS L<X> as the baseline.
```

---

## Quality checks

- [ ] Every data class actually has data assigned to it (no empty classes).
- [ ] At least one threat per STRIDE category appears for the largest component.
- [ ] Roles-and-permissions matrix covers every screen with restricted access.
- [ ] Each compliance regime in scope has a mapping table.
- [ ] Launch-readiness checklist has owners, not just items.
- [ ] No control is described as "industry best practice" without naming the standard.

---

## Anti-patterns

- ❌ Listing controls without owners.
- ❌ Producing a "security overview" instead of testable controls.
- ❌ Citing a standard ("we follow OWASP") without showing what that means in this codebase.
- ❌ Treating compliance as a checkbox separate from architecture — it shapes architecture.
- ❌ Skipping incident response because "it won't happen". It will.

---

## Calibration: what level of rigor to apply

Calibrate the depth of this document to the project size and risk:

- **Internal tool, no PII, no money**: §§1–6, lightweight §§7–11.
- **Customer-facing SaaS with PII**: all sections, full STRIDE, full compliance mapping.
- **Health / finance / regulated**: all sections, plus call out engagement of a specialist auditor in `99-open-questions.md`.

The point is not to maximize output length — it's to match the controls to the actual risk surface.
