# Master Services Agreement — Northbeam Wholesale Portal

> Draft. **Not legal advice.** Review by a licensed attorney in the Republic of Argentina is required before signature.

| Field | Value |
|---|---|
| Project | Northbeam Wholesale Portal |
| Effective date | [YYYY-MM-DD — at signature] |
| Currency | USD |
| Governing law | Republic of Argentina |
| Pricing model | Fixed-price (Variant A; if Variant B is selected, see Exhibit C variant) |

---

## Parties

**Client.** Northbeam Coffee Co., a company organized under the laws of the Republic of Argentina, with its principal place of business at [CLIENT ADDRESS] ("Client").

**Contractor.** [CONTRACTOR NAME], a [LEGAL FORM] organized under the laws of [JURISDICTION], with its principal place of business at [CONTRACTOR ADDRESS] ("Contractor").

Each a "Party", together the "Parties".

---

## 1. Scope of Work

Contractor will perform the services described in **Exhibit A — Statement of Work** (the "Services") and deliver the items described in **Exhibit B — Deliverables Schedule** (the "Deliverables"). The Services and Deliverables correspond to the Northbeam Wholesale Portal v1 as described in the proposal dated 2026-04-02.

Any work outside the Scope of Work is governed by §6 (Change Orders).

---

## 2. Term

This Agreement takes effect on the Effective Date and remains in effect until the later of (a) acceptance of all Deliverables under §5 or (b) expiry of the Warranty Period under §10, unless earlier terminated under §13.

---

## 3. Fees and payment

### 3.1 Fees
Fees are set out in **Exhibit C — Payment Schedule**. The currency is **United States Dollars (USD)**.

### 3.2 Taxes
Fees are stated **exclusive of Argentine IVA (Impuesto al Valor Agregado)**. Where IVA is legally applicable to the Services, it is added to each invoice at the prevailing rate (currently 21%). If Contractor invoices from a non-Argentine entity under the export-of-services regime, IVA does not apply.

### 3.3 Invoicing
Contractor will issue invoices in accordance with the Payment Schedule. Each invoice is payable within **fifteen (15) days** of issue.

### 3.4 Late payment
Amounts unpaid after the due date accrue interest at the lesser of (a) **2% per month** or (b) the maximum rate permitted by applicable law. Contractor may suspend Services if any undisputed invoice remains unpaid more than fifteen (15) days past due, on five (5) days' prior written notice.

### 3.5 Expenses
Reasonable, pre-approved out-of-pocket expenses (e.g. third-party pen-test fees) are pass-through at cost, supported by receipts. The pen-test fee of USD 2,500 is included in the fixed price.

### 3.6 Currency
Currency-conversion fluctuations between USD and ARS are not absorbed by Contractor.

---

## 4. Independent contractor

Contractor performs the Services as an independent contractor. Nothing in this Agreement creates an employment, agency, partnership, or joint-venture relationship.

---

## 5. Acceptance

Each Deliverable in Exhibit B has acceptance criteria. A Deliverable is deemed accepted on the earlier of:

- (a) Client's written confirmation of acceptance, or
- (b) the fifth (5th) business day after delivery if Client has not raised a written, specific objection identifying material non-conformity with the acceptance criteria in Exhibit B.

If Client raises objections within the review period, Contractor will remedy the non-conformities within ten (10) business days and resubmit. After two rounds of remediation, unresolved disputes are escalated under §15 (Dispute Resolution).

---

## 6. Change orders

Any change to scope, schedule, fees, or Deliverables must be documented in a written Change Order signed by both Parties before work on the change begins. Each Change Order references this Agreement, describes the change, the price adjustment, and the schedule adjustment. Verbal changes are not binding. The Change Order process applies in particular to:

- Adding Mercado Pago integration (currently optional add-on O01).
- Adding Tango Gestión integration (currently deferred to phase 2).
- Expanding catalog beyond ~200 SKUs at launch.
- Adding additional locales beyond Spanish and English.

---

## 7. Intellectual property

### 7.1 Pre-existing IP
Each Party retains ownership of its pre-existing intellectual property. Contractor may use its general know-how, tools, and templates in performing the Services.

### 7.2 Deliverables
Upon Client's payment in full of the fees relating to a Deliverable, Contractor assigns to Client all right, title, and interest in that Deliverable's source code, designs, and written outputs created specifically for Client, except for (a) Contractor's pre-existing IP and (b) third-party components licensed under their own terms (e.g. open-source dependencies).

### 7.3 License to pre-existing IP
Contractor grants Client a perpetual, worldwide, royalty-free license to use Contractor's pre-existing IP solely as embedded in the Deliverables.

### 7.4 Open source
Contractor will use open-source components only under licenses compatible with Client's use of the Deliverables (e.g. MIT, Apache 2.0, BSD). Use of GPL/AGPL components requires Client's prior written consent. A list of OSS components is provided to Client on request, and updated at acceptance of each major Deliverable.

### 7.5 Source code handover
At final acceptance and on every termination, Contractor delivers to Client a complete copy of the source code, build configuration, infrastructure-as-code, and deployment runbooks for the Deliverables.

---

## 8. Confidentiality

Each Party will (a) protect the other's Confidential Information with at least the same care it uses for its own, and not less than reasonable care, (b) use Confidential Information only to perform this Agreement, and (c) not disclose Confidential Information to third parties except as required by law or to advisors bound by similar obligations.

"Confidential Information" includes Northbeam's customer list, per-account pricing, and any data Client provides to Contractor. It excludes information that is public through no breach of this Agreement, lawfully known before disclosure, lawfully received from a third party without restriction, or independently developed without use of the other Party's information.

This obligation survives termination for **three (3) years**, except for trade secrets, which are protected so long as they remain trade secrets.

---

## 9. Data protection

Where Contractor processes personal data on behalf of Client, the Parties will sign the Data Processing Agreement attached as **Exhibit D — Data Processing Agreement** before any production data is shared. The DPA complies with:

- Regulation (EU) 2016/679 ("GDPR"), as the Services involve personal data of natural persons resident in the European Union.
- Argentine Ley 25.326 (Ley de Protección de los Datos Personales), as Client is established in Argentina.

Contractor will:

- Process personal data only on documented instructions from Client.
- Implement the technical and organizational measures set out in **Exhibit E — Security Schedule** (which references `04-security-architecture.md`).
- Store personal data in Amazon Web Services region `eu-west-1` (Ireland), in line with REQ-017.
- Notify Client of any personal-data breach without undue delay and in any event within **seventy-two (72) hours** of becoming aware.
- Return or delete personal data on termination, at Client's option, and provide a written attestation of deletion.

Northbeam retains the data-controller role; Contractor acts as data processor.

---

## 10. Warranty

Contractor warrants that, for **thirty (30) days** following acceptance of the final Deliverable (the "Warranty Period"), the Deliverables will materially conform to the acceptance criteria in Exhibit B. Contractor's sole obligation, and Client's sole remedy, under this warranty is to remedy non-conformities Client reports during the Warranty Period at no additional charge.

EXCEPT AS EXPRESSLY SET OUT, CONTRACTOR DISCLAIMS ALL OTHER WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING FITNESS FOR A PARTICULAR PURPOSE AND MERCHANTABILITY, TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW.

---

## 11. Limitation of liability

Except for (a) breaches of confidentiality, (b) IP indemnities under §12, (c) breaches of §9 (Data Protection) caused by gross negligence or willful misconduct, and (d) liability that cannot be limited by applicable law, each Party's total aggregate liability under this Agreement is **capped at the fees paid by Client to Contractor in the twelve (12) months preceding the event giving rise to liability**.

Neither Party is liable for indirect, incidental, consequential, special, or punitive damages, including lost profits or lost data, even if advised of the possibility.

---

## 12. Indemnification

Contractor will defend, indemnify, and hold Client harmless from third-party claims that the Deliverables, as delivered and used as intended, infringe a third party's intellectual-property rights. This obligation does not apply to claims arising from (a) modifications not made by Contractor, (b) combinations with materials not supplied by Contractor, or (c) use of pre-release or open-source components in violation of their licenses.

If a Deliverable is found, or in Contractor's reasonable opinion is likely to be found, infringing, Contractor may at its option (i) modify the Deliverable to be non-infringing, (ii) obtain a license, or (iii) refund the fees paid for the affected Deliverable and terminate the related Services.

---

## 13. Termination

### 13.1 For cause
Either Party may terminate this Agreement on written notice if the other Party (a) materially breaches the Agreement and fails to cure within **fifteen (15) days** of written notice or (b) becomes insolvent or files for bankruptcy.

### 13.2 For convenience
Client may terminate for convenience on **fifteen (15) days'** written notice. On such termination, Client pays for Services performed and Deliverables accepted up to the termination date, plus a kill-fee of **10%** of the remaining contract value, capped at USD **3,500**.

### 13.3 Effect of termination
On termination, Contractor delivers all work-in-progress for Deliverables for which Client has paid (or for which payment is being made under §13.2), returns Client's Confidential Information, deletes Client's personal data as required under §9, and cooperates in transition for up to **ten (10)** business days at the day rates in Exhibit C.

---

## 14. Force majeure

Neither Party is liable for delays or failures caused by events beyond its reasonable control, including natural disasters, acts of government, war, pandemic, or major infrastructure outages. The affected Party will notify the other promptly and use reasonable efforts to resume performance.

---

## 15. Dispute resolution

The Parties will first attempt to resolve any dispute through good-faith negotiation. If unresolved within **thirty (30) days** of written notice, the dispute is submitted to the **Tribunales Ordinarios de la Ciudad Autónoma de Buenos Aires**, which the Parties accept as having exclusive jurisdiction, expressly waiving any other jurisdiction that may correspond.

> [Lawyer review required: confirm exclusive jurisdiction clause vs. arbitration alternative, and confirm jurisdiction city given Northbeam's registered domicile.]

---

## 16. Notices

All notices must be in writing and sent to the addresses below, by email with confirmation of receipt, or by registered post:

- **To Client:** [CLIENT ADDRESS] / [CLIENT EMAIL]
- **To Contractor:** [CONTRACTOR ADDRESS] / [CONTRACTOR EMAIL]

A Party may update its notice details by notifying the other under this section.

---

## 17. Miscellaneous

- **Entire agreement.** This Agreement (including Exhibits A–E) is the entire agreement between the Parties and supersedes prior discussions, proposals, and agreements on the subject matter — including the proposal dated 2026-04-02 (which is reflected in Exhibits A–C).
- **Amendments.** Only effective if in writing and signed by both Parties.
- **Severability.** If any provision is unenforceable, the rest remains in effect.
- **Assignment.** Neither Party may assign this Agreement without the other's written consent, except to a successor in a merger, acquisition, or sale of substantially all assets.
- **No waiver.** Failure to enforce a provision is not a waiver of that provision.
- **Counterparts & electronic signatures.** This Agreement may be signed in counterparts; electronic signatures are valid under Ley 25.506.
- **Language.** This Agreement is executed in English. A Spanish translation may be prepared for convenience; in case of conflict, the English version prevails. [Lawyer review: in some Argentine commercial contexts the Spanish version is preferred to be controlling. Confirm.]

---

## 18. Governing law

This Agreement is governed by the laws of the **Republic of Argentina**, without regard to its conflict-of-laws rules.

---

## Signatures

| Party | Name | Title | Signature | Date |
|---|---|---|---|---|
| Client | [CLIENT SIGNATORY NAME] | [TITLE] | | |
| Contractor | [CONTRACTOR SIGNATORY NAME] | [TITLE] | | |

---

## Exhibit A — Statement of Work

The Services consist of designing, building, deploying, and supporting (during the Warranty Period) the Northbeam Wholesale Portal v1, comprising the ten Deliverables in Exhibit B. The Services are performed in seven phases over approximately 18 weeks, in line with the roadmap referenced in `05-roadmap.md`.

## Exhibit B — Deliverables Schedule

| ID | Deliverable | Acceptance criteria | Target |
|---|---|---|---|
| D1 | Customer portal | A wholesale customer can authenticate, browse the catalog at their per-account prices in ES or EN, and place an order end-to-end. | End of Phase 3 (week 9). |
| D2 | Quick reorder | From the customer dashboard, a previous order can be rebought in ≤60 seconds in a live demo on three different test accounts. | End of Phase 3 (week 9). |
| D3 | AM inbox | Any order is findable from the AM home in ≤2 clicks; an AM can edit and accept an order. | End of Phase 4 (week 12). |
| D4 | Picking slip | A warehouse operator can print an A4 picking-slip PDF for any accepted order. | End of Phase 4 (week 12). |
| D5 | Invoice PDFs | On order acceptance, an invoice PDF is generated, emailed to the customer, and downloadable from order history. | End of Phase 4 (week 12). |
| D6 | Per-account price-list mgmt | Admin can CRUD per-account price lists and bulk-upload pricing via validated CSV. | End of Phase 2 (week 6). |
| D7 | Spanish + English UI | Every customer-facing and AM-facing screen renders correctly in ES and EN. | End of Phase 6 (week 16). |
| D8 | Production-ready infrastructure | Production environment in AWS eu-west-1, with daily encrypted backups, structured logging, error tracking, and uptime monitoring. | End of Phase 5 (week 14). |
| D9 | Pen-tested + compliance-aligned | External pen test passes (no open high/critical findings); DPA signed; privacy notice live; data-export and erasure flows tested. | End of Phase 5 (week 14). |
| D10 | 30-day warranty | Bug-fix coverage for 30 days post-launch at no additional charge. | Days 1–30 post-launch. |

## Exhibit C — Payment Schedule

**Variant A — recommended (mirrors proposal §6):**

| Milestone | Trigger | % | Amount (USD, ex-IVA) |
|---|---|---|---|
| Kickoff deposit | Effective Date | 30% | 13,806 |
| M3 | Acceptance of D2 (quick reorder) | 25% | 11,505 |
| M5 | Acceptance of D9 (pen-test cleared) | 25% | 11,505 |
| Final | Acceptance of remaining Deliverables (UAT signoff) | 20% | 9,204 |
| **Total (excl. IVA)** | | | **46,020** |
| IVA 21% (if applicable per §3.2) | | | 9,664 |
| **Grand total (with IVA)** | | | **55,684** |

**Variant B — 40k ceiling (selectable at signature):**

Same milestone structure; totals USD 38,350 ex-IVA (USD 46,404 with IVA). Reduced scope per `06-budget.md` §1 Variant B.

## Exhibit D — Data Processing Agreement

[To be attached. Drawn from the standard EU SCC + Argentina Ley 25.326 controller-processor template. Lawyer review required.]

## Exhibit E — Security Schedule

The technical and organizational measures referenced in §9 are those set out in `04-security-architecture.md`, sections 4–10 (Identity & access, Data protection, Application security controls, Infrastructure security, Compliance mapping, Incident response, Operational security). The Launch-readiness checklist in §11 of that document is the verification checklist.

---

### How this was derived
- Deliverables in Exhibits A & B mirror `07-proposal.md` one-to-one (10 deliverables).
- Payment schedule in Exhibit C mirrors `06-budget.md` Variant A; Variant B available at signature.
- Governing law = Argentina; currency USD; IVA treatment per §3.2 — derived from session locale parameter.
- Jurisdiction-specific adjustments: IVA 21%, Ley 25.326, Tribunales Buenos Aires, Spanish-translation language clause.
- Items requiring lawyer review flagged inline (jurisdiction clause, language clause, DPA template).

> **Reminder:** this is a high-quality draft, not legal advice. A licensed attorney in Argentina must review before signature.
