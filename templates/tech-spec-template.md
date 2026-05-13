# Technical Specification — [PROJECT NAME]

> One-line summary of what is being built and for whom.

| Field | Value |
|---|---|
| Project | [PROJECT NAME] |
| Client | [CLIENT NAME] |
| Author | PDFjedi (draft) — [HUMAN REVIEWER] |
| Version | 0.1 |
| Date | [YYYY-MM-DD] |
| Status | Draft / Reviewed / Approved |
| Source documents | [list of source PDFs] |

---

## 1. Overview

### 1.1 Problem
A short, concrete problem statement. What is broken or missing today? Cite source.

### 1.2 Goals
- Goal 1 (must be measurable; cite REQ-ID).
- Goal 2.
- Goal 3.

### 1.3 Non-goals
Explicitly out of scope. This is as important as the goals.

### 1.4 Success metrics
How we'll know it worked. One row per metric.

| Metric | Target | Source |
|---|---|---|
| | | |

---

## 2. Users & roles

| Role | Description | Top jobs-to-be-done | Linked REQs |
|---|---|---|---|
| | | | |

---

## 3. Functional scope

Grouped by domain. Each row links to one or more REQ-IDs from `01-requirements.md`.

### 3.1 [Domain A — e.g. Authentication]
| ID | Capability | Description | Priority | REQs |
|---|---|---|---|---|
| F-A-01 | | | Must / Should / Could | |

### 3.2 [Domain B]
...

---

## 4. Architecture

### 4.1 High-level diagram
ASCII or mermaid. A box per major component, arrows for data flow.

```
[ Web client ] --HTTPS--> [ API gateway ] --> [ Service A ]
                                            \-> [ Service B ] --> [ PostgreSQL ]
```

### 4.2 Components
| Component | Responsibility | Tech | Depends on | REQs satisfied |
|---|---|---|---|---|
| | | | | |

### 4.3 Integrations
| System | Direction | Protocol | Auth | Data exchanged | REQs |
|---|---|---|---|---|---|
| | in / out / bidirectional | REST / GraphQL / webhook / SFTP | OAuth / API key / mTLS | | |

---

## 5. Data model

### 5.1 Entities
For each major entity:

#### `EntityName`
- Purpose: one line.
- Fields:
  | Field | Type | Constraints | Notes |
  |---|---|---|---|
  | | | | |
- Relations: one line per relation.
- Indexes: one line per access pattern.
- PII fields: explicit list.

### 5.2 Data flow
A short narrative of the major lifecycle (e.g. "An order is created in service A, paid via service B, fulfilled in service C; the canonical record lives in the orders table in A").

---

## 6. API surface

### 6.1 External APIs
| Method | Path | Auth | Inputs | Outputs | REQs |
|---|---|---|---|---|---|
| POST | /v1/orders | session + CSRF | items[], shipping | order_id, status | F-X-01 |

### 6.2 Webhooks emitted
| Event | Trigger | Payload | Consumers |
|---|---|---|---|

### 6.3 Internal APIs
Coarse-grained list; only call out where boundaries matter.

---

## 7. Non-functional requirements

| Category | Target | Source / open question |
|---|---|---|
| Performance | e.g. P95 < 2s for primary actions | REQ-XX / OQ-XX |
| Availability | e.g. 99.5% uptime monthly | REQ-XX |
| Scalability | e.g. 10k DAU, 100 req/s peak | REQ-XX / OQ-XX |
| Compatibility | Latest 2 versions of evergreen browsers | REQ-XX |
| Accessibility | WCAG 2.1 AA | REQ-XX |
| Internationalization | Locales: [list] | REQ-XX |
| Observability | Logs, metrics, traces, error tracking | — |

Empty rows must say `Not specified — see OQ-XX`, never be left blank.

---

## 8. Operations

### 8.1 Environments
- Local dev: how a new engineer brings it up.
- Staging: who has access, data policy.
- Production: who has access, change-management.

### 8.2 CI/CD
- Where it runs.
- What the pipeline does.
- Deploy strategy (rolling, blue/green, canary).

### 8.3 Observability
- Logs: tool, retention, PII rules.
- Metrics: tool, SLOs.
- Traces: tool.
- Errors: tool.

### 8.4 Backups & DR
- What's backed up, how often, retention, restore process.
- RPO / RTO targets if applicable.

### 8.5 Runbooks
Pointers (TBD post-build) for: on-call, incident response, common ops tasks.

---

## 9. Tech stack decisions

| Tier | Choice | Reason | Alternatives considered |
|---|---|---|---|
| Frontend | | | |
| Backend | | | |
| Database | | | |
| Hosting | | | |
| Auth | | | |
| Background jobs | | | |
| Observability | | | |

Each row: 1–2 lines of reasoning. Apply the boring-tech rule.

---

## 10. Risks & unknowns

| ID | Risk | Likelihood | Impact | Mitigation | Linked OQ |
|---|---|---|---|---|---|
| R-01 | | L / M / H | L / M / H | | OQ-XX |

---

## 11. Out of scope

Items the team will **not** build, listed plainly so they're impossible to confuse with included scope.

- ...
- ...

---

### How this was derived
- Stack: <chosen via boring-tech rule | client-specified>.
- Module list derived from REQ-IDs <range> clustered into <N> domains.
- Data model derived from entities in REQ-XX, REQ-YY.
- NFR targets cite source; gaps recorded as OQ-XX.
- Open questions in `99-open-questions.md`.
