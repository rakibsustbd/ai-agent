# AgentCore: Agent Personas & ROI Logic

To ensure high retention and SME value, each agent is designed around a specific **Economic ROI** metric.

---

### 1. Financial Sentry (The "Cash Leak" Auditor)
- **Role**: Automated Invoice Reconciliation & Expense Auditing.
- **ROI Metric**: Dollars saved by catching overcharges, duplicate invoices, and missed early-payment discounts.
- **Core Skill**: OCR-based data extraction and cross-referencing with purchase orders/bank statements.

### 2. Debt Recovery AI (The "AR" Collector)
- **Role**: Persistent, Polite, and Effective Accounts Receivable automation.
- **ROI Metric**: Reduced "Days Sales Outstanding" (DSO) and improved cash flow.
- **Core Skill**: Analyzing aging reports and executing multi-channel (Email/WhatsApp) follow-up sequences based on debtor history.

### 3. HR Screening Bot (The "Time Saver")
- **Role**: High-volume candidate filtering for blue-collar or entry-level retail roles.
- **ROI Metric**: 80% reduction in manual screening time for hiring managers.
- **Core Skill**: Comparing resumes/applications against uploaded Job Description SOPs and conducting preliminary "Chat-based" interviews.

### 4. Sales Growth Agent (The "Revenue Generator")
- **Role**: B2B Lead Acquisition and Initial Outreach.
- **ROI Metric**: Number of qualified sales meetings booked.
- **Core Skill**: Scraping B2B directories (Google Maps/LinkedIn) and drafting hyper-personalized outreach based on business context.

### 5. Retail Expansion Planner (The "Strategist")
- **Role**: Data-driven site selection for new distribution points or retail outlets.
- **ROI Metric**: Accuracy of sales forecasts for new locations.
- **Core Skill**: Analyzing demographic data, footfall estimates, and competitor proximity to recommend expansion sites.

### 6. Network Intelligence Agent (The "Referral" Mapper)
- **Role**: Mapping B2B networks and identifying strategic referral partners.
- **ROI Metric**: Number of warm introductions generated via the SME's existing network.
- **Core Skill**: Analyzing CRM data and LinkedIn connections to find "Shortest Path" to a target decision-maker.

---

## Technical Architecture (The .agent/ Structure)
Each agent will have its logic stored in the following format:
- `rules/persona.md`: Behavioral guardrails (e.g., Tone of voice, Ethics).
- `skills/skill-name/SKILL.md`: Functional capabilities (Input -> Logic -> Output).
