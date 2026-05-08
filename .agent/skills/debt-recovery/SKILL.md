# Skill: Debt Recovery AI (AR Automation)

## Description
Automates the follow-up process for overdue payments, balancing persistence with professional diplomacy to recover cash while maintaining client relationships.

## Capabilities
- **Aging Report Analysis**: Parse CSV/Excel aging reports to identify overdue accounts.
- **Sentiment-Aware Outreach**: Draft emails or WhatsApp messages that escalate in tone based on the number of days overdue.
- **Dispute Detection**: Identify if a customer is not paying due to a specific issue (e.g., "damaged goods") and flag for human intervention.
- **Payment Link Generation**: Integrate with Stripe/Razorpay to provide immediate payment options.

## Inputs
- `aging_report_csv`: List of debtors and overdue amounts.
- `communication_history`: Previous interactions to avoid repetitive messaging.

## Logic
1. Analyze aging report for high-priority debts (large amounts or >60 days).
2. Categorize debtors by "Risk Profile" (Regular, Late, Chronic).
3. Select appropriate template (Gentle Reminder, Formal Notice, Final Warning).
4. Personalize template with exact amounts and invoice numbers.
5. Schedule follow-ups at optimal times.

## Output
```json
{
  "action": "outreach_queued",
  "channel": "email",
  "tone": "formal",
  "recipient": "finance@client.com",
  "content": "Subject: Urgent: Overdue Payment for INV-442..."
}
```
