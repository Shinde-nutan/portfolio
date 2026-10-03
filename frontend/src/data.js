// Edit this file to update the site. Keep every claim verifiable.
export const profile = {
  name: "Nutan Shinde",
  role: "Backend Engineer",
  tagline:
    "I design dependable backend systems, APIs and data workflows for high-volume enterprise commerce operations.",
  intro:
    "Python engineer working across API design, databases, asynchronous jobs, production debugging and integrations between modern commerce platforms.",
  email: "",
  github: "https://github.com/Shinde-nutan",
  linkedin: "https://www.linkedin.com/in/nutan-shinde-26a151208/",
  image: "ProfilePhoto.jpeg",
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
    title: "Returns & ERP Integration",
    stack: "Python · REST APIs · Webhooks · NetSuite · SQL · Idempotency",
    scale: "~8,000 returns/day",
    text: "Built event-driven return workflows connecting AfterShip, Shopify, an Order Management System and NetSuite. Automated RMA, Item Receipt and Credit Memo creation with payload validation, duplicate-event protection, retries and batch recovery.",
  },
  {
    title: "POS & Order Management Integration",
    stack: "Python · REST APIs · Webhooks · JSON · Data Validation",
    scale: "~7,000 orders/day across ~100 retail stores",
    text: "Developed REST API and webhook integrations between PredictSpring POS and the OMS. Synchronized orders, returns, payments and customers across retail stores with validation, error handling and production monitoring.",
  },
  {
    title: "Shopify GraphQL Workflows",
    stack: "Python · Shopify GraphQL API · Webhooks · JSON",
    scale: "Orders, returns, refunds, exchanges",
    text: "Implemented Shopify GraphQL APIs and webhooks for orders, customers, fulfillments, returns, refunds, cancellations, exchanges and store credit. Supported historical return processing and cross-system data reconciliation.",
  },
  {
    title: "Transfer Order & Inventory Sync",
    stack: "Python · NetSuite APIs · SQL · Inventory Management",
    scale: "~500–800 items per transfer order",
    text: "Developed and supported NetSuite–OMS transfer-order receiving workflows and item-level inventory updates. Diagnosed duplicate receipts and inventory discrepancies using SQL queries, logs and transaction-level analysis.",
  },
  {
    title: "Employee Store Credit Automation",
    stack: "Python · Event-Driven Architecture · Shopify API · Webhooks",
    scale: "ADP → OMS → Shopify",
    text: "Built an event-driven ADP–OMS–Shopify workflow that creates employee customer accounts and allocates store-credit bonuses. Added idempotency controls to prevent duplicate accounts and credit transactions.",
  },
];

export const skills = {
  "Core": ["Python", "SQL", "REST APIs", "GraphQL", "Webhooks", "MySQL", "Shopify", "NetSuite"],
  "Also worked with": ["PostgreSQL", "Django", "Flask", "FastAPI", "Celery", "Redis", "Apache NiFi", "AWS", "Grafana", "Git"],
};

export const techStack = [
  { name: "Python", category: "Core language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", detail: "Backend services, data processing and integration logic.", usedFor: ["Service logic", "Automation", "Data workflows"] },
  { name: "Django", category: "Web framework", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg", detail: "Structured backend applications with mature data and admin tooling.", usedFor: ["Backend apps", "ORM", "Admin workflows"] },
  { name: "FastAPI", category: "API framework", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg", detail: "Typed, high-performance APIs with clear validation contracts.", usedFor: ["REST APIs", "Validation", "Service endpoints"] },
  { name: "PostgreSQL", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", detail: "Relational data modeling, querying and transactional workflows.", usedFor: ["Data models", "Queries", "Transactions"] },
  { name: "MySQL", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", detail: "Production data analysis and commerce transaction storage.", usedFor: ["SQL analysis", "Operations", "Reporting"] },
  { name: "Redis", category: "Data & queues", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg", detail: "Fast state, caching and support for asynchronous processing.", usedFor: ["Caching", "Queues", "Background jobs"] },
  { name: "GraphQL", category: "API technology", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg", detail: "Commerce APIs for targeted order, return and customer data operations.", usedFor: ["Shopify APIs", "Queries", "Mutations"] },
  { name: "AWS", category: "Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", detail: "Cloud fundamentals for deploying and operating backend workloads.", usedFor: ["Cloud services", "Deployment", "Operations"] },
  { name: "Git", category: "Engineering workflow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", detail: "Version-controlled delivery, reviews and collaborative development.", usedFor: ["Source control", "Code review", "Delivery"] },
];

export const experience = [
  { role: "Enterprise Software Engineer", org: "HotWax Commerce", when: "Jul 2024 – Present", location: "Indore, India", company: "An enterprise omnichannel order management company helping retailers orchestrate orders, inventory, fulfillment and returns.", text: "Building backend services and integrations for high-volume commerce operations.", highlights: ["Develop API and webhook workflows across OMS, Shopify, POS and ERP systems.", "Investigate production issues with SQL, logs and cross-system data validation.", "Build retry and batch fallback paths for resilient transaction processing."] },
  { role: "Enterprise Software Engineer Intern", org: "HotWax Commerce", when: "Dec 2023 – Jun 2024", location: "Indore, India", company: "Enterprise retail technology and distributed order management.", text: "Started with commerce data processing, testing and production support.", highlights: ["Built JSON and CSV data transformations for integration workflows.", "Supported integration testing and backend issue analysis.", "Worked with production data while learning enterprise OMS concepts."] },
];

export const stats = [
  { value: "8K+", label: "daily return events supported" },
  { value: "7K+", label: "daily orders synchronized" },
  { value: "4", label: "retail store groups connected" },
];
