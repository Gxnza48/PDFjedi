# [PDF: brief.pdf] — Project brief

**Client:** Northbeam Coffee Co.
**Author:** Maya Rios, Head of Operations
**Date:** 2026-03-18
**Pages:** 4

---

## Page 1 — Background

Northbeam Coffee operates 12 specialty cafés in Buenos Aires. We currently take wholesale orders (whole-bean coffee, retail bags, branded merch) over WhatsApp and email. This works at 40 wholesale accounts. It does not work at the 200 accounts we plan to have by end of 2026.

We need a wholesale ordering portal.

## Page 2 — What we need

- Wholesale customers (cafés, hotels, offices) log in and place orders.
- Account managers (3 of them, our staff) see orders come in, edit them if needed, mark them ready for fulfillment.
- The warehouse team prints picking slips.
- Customers see their order history and download invoices (PDF).
- We want a "favorites" or "quick reorder" feature — most accounts order the same 4–6 SKUs every week.
- Pricing is per-account. Different accounts have different prices. This is critical.
- Payments are mostly bank transfer (we send the invoice, they pay). A few accounts pay by credit card. We'd like to accept Mercado Pago for the credit-card cases.
- Product catalog: ~80 SKUs today. Will grow.
- We want it to look "modern and professional" — like our retail site (`northbeam.coffee`).
- Must be in Spanish. We have a small but growing customer base outside Argentina (Uruguay, Chile, one in Spain), so English at some point would be nice but is not for v1.

## Page 3 — What we don't need

- A retail / consumer storefront. That exists already (Shopify).
- A mobile app. Web is fine.
- A POS integration for the cafés themselves (separate project).
- AI / personalization features.

## Page 3 (continued) — Constraints

- Budget: around USD 50,000.
- We'd like to launch before our Q4 push, so ideally end of August 2026, with the warehouse team trained by mid-September.
- We can host on AWS — we already have an account our IT contractor manages.
- GDPR matters because of the Spain customer; otherwise Argentina's Ley 25.326.
- Data must remain in our control. No "your data is our data" SaaS-ish clauses.

## Page 4 — Success criteria

- 80% of wholesale orders are placed via the portal (not WhatsApp) by Q1 2027.
- Account managers spend < 1 hour/day on order intake (currently ~4 hours each).
- Customers can place a typical reorder in under 60 seconds.
- Zero pricing errors in the first 90 days post-launch (manual price overrides today cause ~3 errors/month).
- The system handles end-of-month order spikes (3–4× average daily volume) without slowdown.

We have not chosen a stack. We trust the contractor to recommend one as long as we (or someone we can hire later) can maintain it.
