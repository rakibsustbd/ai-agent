# Skill: Financial Sentry (Invoice Auditor)

## Description
This skill enables the agent to extract data from financial documents (Invoices, Receipts) and reconcile them against business policies or historical data to detect discrepancies.

## Capabilities
- **OCR Extraction**: Identify Vendor Name, Date, Invoice Number, Line Items, Tax, and Total.
- **Discrepancy Detection**: Compare extracted totals with the sum of line items.
- **Policy Reconciliation**: Check if the invoice matches pre-defined payment terms (e.g., "Net 30") or vendor-specific pricing.
- **Duplicate Check**: Flag if an invoice with the same vendor and ID has been processed before.

## Inputs
- `file_path`: Path to the invoice (PDF or Image).
- `business_policies`: Contextual rules (e.g., "Max payment limit: $500").

## Logic
1. Load document and perform OCR.
2. Structure data into a standard JSON format.
3. Validate math (Line items sum == Total).
4. Search Knowledge Base for related Purchase Orders (POs).
5. Output a "Risk Score" (0-100) and recommendation (Approve/Flag).

## Output
```json
{
  "status": "flagged",
  "reason": "Total mismatch: Extracted $500, Sum of items $480",
  "confidence_score": 0.95,
  "data": {
    "vendor": "Acme Corp",
    "invoice_id": "INV-001",
    "total": 500.00
  }
}
```
