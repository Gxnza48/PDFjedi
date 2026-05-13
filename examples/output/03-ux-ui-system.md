# UX/UI System — Northbeam Wholesale Portal

> Design system specification. Visual realization happens in design tooling; this document is the source of truth for structure, behavior, and accessibility. Brand assets are reused from `northbeam.coffee` (ASM-003), pending confirmation (OQ-002).

## 1. Users & jobs

| Role | Top jobs | REQs |
|---|---|---|
| Wholesale customer | (1) Place a typical reorder in <60s. (2) Browse catalog and check current prices. (3) Find a past order and download its invoice. | REQ-001, 002, 003, 006, 014 |
| Account manager | (1) Triage new orders. (2) Edit / accept orders. (3) Find any order in ≤2 clicks. | REQ-004, 011, 020 |
| Warehouse operator | (1) Print picking slip for an accepted order. | REQ-005 |
| Admin | (1) Manage SKUs and per-account price lists. (2) Manage users and accounts. | REQ-007 |

## 2. Information architecture

```
Public
└── /login

Customer (role: customer)
├── /                  (dashboard: quick reorder + recent orders)
├── /catalog
├── /catalog/:sku
├── /cart
├── /orders
├── /orders/:id        (with invoice download)
└── /account           (profile, locale, password)

Staff (role: am | warehouse | admin)
├── /admin
├── /admin/orders                  (inbox / queue, AM)
├── /admin/orders/:id              (edit, accept)
├── /admin/orders/:id/picking-slip (warehouse)
├── /admin/accounts                (admin)
├── /admin/accounts/:id            (admin: price list, users)
├── /admin/skus                    (admin)
└── /admin/users                   (admin: staff)
```

Gating: every `/admin/*` route is role-gated. `/admin/orders/*/picking-slip` is accessible to `warehouse` and `am`; the rest of `/admin/orders/*` is `am` only.

## 3. Screen inventory

| ID | Name | Purpose | Primary user | Inputs (data) | Outputs (actions) | States | REQs |
|---|---|---|---|---|---|---|---|
| SCR-01 | Login | Authenticate. | All | — | submit credentials → home or admin | idle / submitting / error | REQ-001 |
| SCR-02 | Customer dashboard | Single-page hub for reorder + last 5 orders. | Customer | GET /api/orders?limit=5 | Quick reorder, new order, view order | loading / empty (no past orders) / populated / error | REQ-003, 006, 014 |
| SCR-03 | Catalog | Browse SKUs. | Customer | GET /api/catalog | Add to cart, view SKU | loading / empty (no SKUs in category) / populated / error | REQ-002, 007 |
| SCR-04 | SKU detail | View one product. | Customer | GET /api/catalog/:sku | Add to cart, set qty | loading / available / out-of-stock / error | REQ-002 |
| SCR-05 | Cart | Review and submit order. | Customer | local state | Submit order | empty / populated / submitting / success / error | REQ-002 |
| SCR-06 | Order history | List of past orders, filter. | Customer | GET /api/orders | View detail | loading / empty / populated / error | REQ-006 |
| SCR-07 | Order detail (customer) | One order with status, lines, invoice. | Customer | GET /api/orders/:id | Reorder, download invoice | loading / populated / error | REQ-006, REQ-003 |
| SCR-08 | Account | Profile, locale, password. | Customer | GET /api/me | Update locale, change password | populated / saving / success / error | REQ-009, 010 |
| SCR-09 | AM inbox | Order queue: new / pending / accepted / shipped tabs. | Account manager | GET /api/admin/orders | Open order | loading / empty / populated / error | REQ-004, 011 |
| SCR-10 | Order detail (AM) | Edit lines, accept, generate invoice. | Account manager | GET /api/admin/orders/:id | Save edits, accept, cancel | loading / editing / saving / accepted / error | REQ-004 |
| SCR-11 | Picking slip | Server-rendered PDF, printable. | Warehouse | GET /api/admin/orders/:id/picking-slip.pdf | print | success / error | REQ-005 |
| SCR-12 | Accounts list | Admin manage accounts. | Admin | GET /api/admin/accounts | Open account | loading / populated / error | REQ-007 |
| SCR-13 | Account detail | Per-account price list, users. | Admin | GET /api/admin/accounts/:id | Bulk upload price list, add user | loading / editing / saving / error | REQ-007 |
| SCR-14 | SKUs list | Admin manage products. | Admin | GET /api/admin/skus | CRUD SKU | loading / populated / error | REQ-002 (admin of) |
| SCR-15 | Staff users | Admin manage staff. | Admin | GET /api/admin/users | CRUD user, change role | loading / populated / error | REQ-004 (admin of) |
| SCR-16 | Password reset request | Forgot password. | All | — | submit email | idle / submitting / success / error | REQ-001 |
| SCR-17 | Password reset confirm | Reset via token. | All | token | submit new password | valid token / expired / success / error | REQ-001 |
| SCR-18 | Locale switcher | Inline component (header). | All | — | switch ES ↔ EN | — | REQ-009, 010 |
| SCR-19 | Error page (404 / 500) | Generic error. | All | — | — | — | — |

## 4. Component inventory

| ID | Name | Purpose | Variants | Props (engineering view) | Used on |
|---|---|---|---|---|---|
| CMP-01 | Button | Primary action. | primary / secondary / danger / ghost; sm / md / lg; loading; disabled | label, onClick, variant, size, loading, disabled, iconLeft | most screens |
| CMP-02 | TextField | Text input with label & error. | text / email / password / number | label, name, value, onChange, error, required | SCR-01, 05, 08, 13, 14, 15, 16, 17 |
| CMP-03 | Select | Dropdown selector. | single / multi | options, value, onChange | SCR-03, 09, 12 |
| CMP-04 | Table | Data table with sort + pagination. | compact / comfortable | columns, rows, sort, pagination | SCR-06, 09, 12, 14, 15 |
| CMP-05 | Card | Product or order card. | product / order / summary | content slots | SCR-02, 03 |
| CMP-06 | Badge | Status pill. | new / pending / accepted / shipped / cancelled / paid | label, tone | SCR-06, 09, 10 |
| CMP-07 | EmptyState | Reusable empty placeholder. | with-cta / no-cta | title, message, cta | most listings |
| CMP-08 | Modal | Dialog with focus trap. | confirm / form | title, onClose, children | order accept, delete account |
| CMP-09 | Toast | Non-blocking notification. | success / error / info | message, tone, duration | global |
| CMP-10 | QuantityStepper | Qty input with +/-. | — | value, min, max, onChange | SCR-03, 04, 05 |
| CMP-11 | PriceTag | Currency-aware price display. | regular / discounted | amount, currency, locale | SCR-03, 04, 05, 06, 07 |
| CMP-12 | Breadcrumb | Hierarchical navigation. | — | items | admin screens |
| CMP-13 | NavTabs | Tab navigation. | — | tabs, active, onSelect | SCR-09 |
| CMP-14 | LocaleSwitcher | ES / EN toggle. | — | value, onChange | header |
| CMP-15 | InvoiceLink | Download invoice PDF. | — | orderId, status | SCR-06, 07 |
| CMP-16 | OrderTimeline | Status history. | — | events | SCR-07, 10 |
| CMP-17 | BulkUpload | CSV upload with preview. | — | onUpload, schema | SCR-13 |

## 5. Interaction patterns

### Flow: Quick reorder (the headline UX)
1. Customer lands on dashboard (SCR-02).
2. Sees "Reorder last shipment" card with the lines of their most recent order, total, and a single primary button.
3. Click → confirm modal with line items pre-filled and editable quantities.
4. Confirm → order submitted, toast confirmation, redirect to SCR-07 with status `submitted`.

- **Time-to-feedback**: <1s for the confirm modal; order submission shows optimistic state.
- **Error path**: if any SKU in the previous order is now out of stock, the modal highlights it and offers either "remove" or "keep and AM will handle". The 60s target (REQ-014) holds even in this path.
- **Empty state**: if no past orders, the card shows "Browse the catalog to place your first order" (CTA → SCR-03).

### Flow: AM accepting an order
1. AM opens the inbox (SCR-09), "new" tab.
2. Clicks the topmost order → SCR-10.
3. Reviews lines; edits if needed (quantities, notes, occasional substitution).
4. Clicks "Accept and generate invoice".
5. Confirm modal (irreversible action) → on confirm, job worker generates invoice PDF, status moves to `accepted`, customer is emailed, order moves out of "new" tab.

- **Error path**: invoice generation can fail; status remains `submitted` with a retry banner and AM is alerted.
- **Audit**: every edit and acceptance is written to `AuditLog`.

### Flow: Picking slip print (warehouse)
1. Warehouse role lands on `/admin/orders?status=accepted&assigned=warehouse`.
2. Clicks order → SCR-11 (server-rendered PDF embedded in `<iframe>`).
3. Native print dialog.

- **Time-to-feedback**: PDF should render in <2s.
- **Error path**: regenerate button.

### Flow: Login
Standard email/password with rate limiting (10/min/IP) and account-level lockout after 5 failures (15-min reset). Forgot-password flow via signed-token email.

## 6. Visual system

Brand assets to be reused from `northbeam.coffee` (ASM-003, OQ-002). Pending Figma access, the system uses **semantic tokens** that the design team will fill:

| Token | Default behavior |
|---|---|
| `color.brand.primary` | TBD — from northbeam.coffee |
| `color.surface.default` | white / off-white |
| `color.surface.muted` | neutral-50 |
| `color.text.default` | neutral-900 |
| `color.text.muted` | neutral-600 |
| `color.success` / `warning` / `danger` | green-600 / amber-600 / red-600 (placeholders) |
| `font.body` | Inter / system stack (placeholder) |
| `font.display` | TBD |
| `radius.sm/md/lg` | 4 / 8 / 12 px |
| `space.scale` | 4-pt scale: 4, 8, 12, 16, 20, 24, 32, 40, 56, 80 |

Iconography: outline style, 24px grid (placeholder pending brand input).

> Brand decisions are **not invented** here. They are tokens awaiting design-team fill (OQ-002).

## 7. Accessibility

Target: **WCAG 2.1 AA**.

- Color contrast: text 4.5:1, large text 3:1.
- All interactive elements keyboard-reachable; visible focus outline (custom, brand-aware).
- Focus traps in modals (CMP-08); return focus to invoking element on close.
- Form fields associated with labels via `for`/`id`; errors linked via `aria-describedby`.
- Tables: caption, `scope` attributes, sortable columns announced via `aria-sort`.
- Toasts (CMP-09) use `role="status"` for info, `role="alert"` for errors; non-time-sensitive ones are dismissible.
- Skip-to-content link on every page.

## 8. Responsive strategy

Mobile-first. Breakpoints (Tailwind defaults): sm 640, md 768, lg 1024, xl 1280.

- Customer screens: optimized for tablet and desktop (customers buy from offices/cafés); usable on phone.
- AM screens: optimized for desktop (the work is sustained, not mobile); minimum 1024px for inbox.
- Tables (CMP-04) collapse to card list at `<md`.

## 9. Content & copy rules

- **Voice**: neutral, professional, second-person (`tú` in Spanish; `you` in English). Drop honorifics.
- **Microcopy**: action-oriented buttons (`Reordenar` / `Reorder`, not `OK`).
- **Errors**: state what happened, why, and what to do next — in one sentence.
- **Empty states**: explain what should be here and the next action.
- **Numbers/dates**:
  - ES locale: `es-AR`; decimal comma, thousand dot, dates `DD/MM/YYYY`, currency `ARS $ 1.234,56`.
  - EN locale: `en-GB`; decimal point, thousand comma, dates `DD MMM YYYY`, currency `USD 1,234.56` (USD-priced accounts) or ARS as-formatted.
- **Translation**: ES and EN are first-class, not translated-from-Spanish. Single source-of-truth message bundle with `next-intl`.

---

### How this was derived
- Users mapped from REQ-001..REQ-007, REQ-011.
- Screens derived from the API surface in `02-tech-spec.md` + flows implied by source PDFs.
- Components extracted bottom-up from the screen inventory; reuse confirmed (every component used on ≥1 screen).
- WCAG target 2.1 AA chosen as default — see OQ if a different target is desired.
- Brand system tokens are placeholders pending OQ-002.
