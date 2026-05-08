# Skill: Financial Controller (Audit-Ready Reporting)

## Description
This skill enables the agent to act as a virtual CFO/Controller, consolidating disparate financial data into audit-ready Profit & Loss (P&L) and Cashflow statements.

## Capabilities
- **Transaction Categorization**: Automatically map bank transactions and invoices into a Chart of Accounts (COA).
- **P&L Generation**: Summarize revenues, costs of goods sold (COGS), and operating expenses (OPEX).
- **Cashflow Forecasting**: Analyze historical burn rates and pending invoices to predict future cash positions.
- **Audit Logging**: Maintain a clear trail of how every transaction was categorized and linked to source documents.
- **Anomaly Detection**: Flag unusual spikes in expenses or unexpected drops in revenue compared to historical averages.

## Inputs
- `bank_statement_data`: CSV or API feed of bank transactions.
- `invoice_data`: Extracted data from Sales and Purchase invoices.
- `chart_of_accounts`: The SME's specific accounting categories.

## Logic
1. Reconcile bank transactions against known invoices.
2. Auto-categorize remaining transactions using NLP and historical patterns.
3. Calculate monthly totals for Revenue, Expenses, and Net Income.
4. Generate the Cashflow statement (Operating, Investing, Financing).
5. Run a "Sanity Check" (Assets = Liabilities + Equity) to ensure audit readiness.

## Output
```json
{
  "report_type": "P&L",
  "period": "April 2026",
  "net_income": 45000.00,
  "anomalies": [
    { "category": "Office Supplies", "reason": "300% increase over Avg" }
  ],
  "is_audit_ready": true
}
```
