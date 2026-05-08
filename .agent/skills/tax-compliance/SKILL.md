# Skill: Tax Compliance (VAT & Reconciliation)

## Description
Ensures the SME remains compliant with local tax laws by reconciling VAT/GST collected on sales against VAT/GST paid on purchases.

## Capabilities
- **VAT Identification**: Extract VAT IDs and amounts from all invoices using OCR or digital feeds.
- **Tax Reconciliation**: Calculate "Input Tax" vs "Output Tax" to determine the Net Tax Payable.
- **Reporting**: Generate summaries in the specific format required by local tax authorities.
- **Action Triggers**: Notify the user when a filing deadline is approaching or if a vendor has provided an invalid VAT ID.
- **Compliance Audit**: Flag transactions that are missing proper tax documentation.

## Inputs
- `sales_data`: Records of all taxable sales.
- `purchase_data`: Records of all taxable purchases.
- `tax_rules_sop`: Local tax laws (e.g., standard rates, exemptions).

## Logic
1. Scan all transactions for tax-relevant data.
2. Group transactions by Tax Rate (Standard, Reduced, Zero, Exempt).
3. Verify that the correct tax was applied based on the `tax_rules_sop`.
4. Calculate the total tax liability for the period.
5. Generate a "Pre-filing Report" for user approval.

## Output
```json
{
  "tax_liability": 12500.00,
  "reconciliation_status": "complete",
  "missing_tax_invoices": [
    { "transaction_id": "TXN_992", "vendor": "Global Cloud" }
  ],
  "filing_deadline": "2026-05-15"
}
```
