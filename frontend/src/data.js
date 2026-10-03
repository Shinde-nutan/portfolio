// Edit this file to update the site. Keep every claim verifiable.
export const profile = {
  name: "Nutan Shinde",
  role: "Python Backend Engineer",
  tagline:
    "I build the APIs and webhook workflows that keep orders, returns and inventory consistent across commerce, POS and ERP systems.",
  email: "YOUR_EMAIL@example.com",
  github: "https://github.com/YOUR_GITHUB",
  linkedin: "https://www.linkedin.com/in/YOUR_LINKEDIN",
};

export const flow = [
  { t: "webhook", m: "return.created received from AfterShip / Shopify" },
  { t: "validate", m: "payload checked, duplicate event ignored" },
  { t: "netsuite", m: "RMA created via API" },
  { t: "netsuite", m: "Item Receipt created via API" },
  { t: "netsuite", m: "Credit Memo created via API" },
  { t: "fallback", m: "if a call fails: marked pending, retried by batch job" },
];

export const projects = [
  {
    title: "Returns to ERP",
    stack: "Webhooks, REST, NetSuite API, SQL",
    scale: "~8,000 returns/day",
    text: "Integrated AfterShip and Shopify returns with an Order Management System and NetSuite. Webhook-triggered workflows create RMA, Item Receipt and Credit Memo transactions in near real time, with a batch fallback for failed syncs.",
  },
  {
    title: "POS to OMS",
    stack: "REST, Webhooks, JSON",
    scale: "~7,000 orders/day, ~100 stores per product store",
    text: "Integrated PredictSpring POS with the OMS across ~4 product stores for one retail brand, covering order, return, payment and customer synchronization with validation and error handling.",
  },
  {
    title: "Shopify GraphQL",
    stack: "GraphQL, Webhooks",
    scale: "Orders, returns, refunds, exchanges",
    text: "Developed GraphQL and webhook integrations for order, customer, fulfillment, return, refund, cancellation, exchange and store-credit workflows, including historical return processing and cross-system data validation.",
  },
  {
    title: "Transfer orders and inventory",
    stack: "NetSuite, SQL",
    scale: "~500–800 items per transfer order",
    text: "Worked on NetSuite–OMS transfer-order synchronization: receiving workflows, item-level inventory updates back to NetSuite, and investigation of duplicate receipts and inventory discrepancies.",
  },
  {
    title: "HR to commerce",
    stack: "Webhooks, Shopify API",
    scale: "ADP → OMS → Shopify",
    text: "Built an event-driven integration that creates Shopify customer accounts for new employees and allocates store-credit bonuses, with idempotency to prevent duplicate accounts or credits.",
  },
];

export const skills = {
  "Core": ["Python", "SQL", "REST APIs", "GraphQL", "Webhooks", "MySQL", "Shopify", "NetSuite"],
  "Also worked with": ["PostgreSQL", "Django", "Flask", "FastAPI", "Celery", "Redis", "Apache NiFi", "AWS", "Grafana", "Git"],
};

export const experience = [
  { role: "Enterprise Software Engineer", org: "HotWax Commerce", when: "Jul 2024 – Present", text: "Backend integrations, webhook processing, SQL analysis, batch fallback jobs and production debugging for an enterprise OMS." },
  { role: "Enterprise Software Engineer Intern", org: "HotWax Commerce", when: "Dec 2023 – Jun 2024", text: "Data processing, JSON/CSV transformation, integration testing and production support." },
];
