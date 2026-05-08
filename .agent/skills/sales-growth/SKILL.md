# Skill: Sales Growth Agent (Lead Gen)

## Description
Finds high-intent B2B leads and initiates personalized outreach to grow the SME's revenue.

## Capabilities
- **Local Business Scraping**: Extract contact data from Google Maps/LinkedIn for specific industries.
- **Website Analysis**: Visit lead websites to determine "Fit" (e.g., Are they currently using AI? What is their size?).
- **Hyper-Personalized Copy**: Write outreach messages that reference specific details from the lead's website (e.g., "I saw your recent expansion into Brooklyn...").
- **CRM Sync**: Automatically push qualified leads to the SME's CRM (HubSpot/Salesforce).

## Inputs
- `target_industry`: e.g., "Retail Distributors".
- `location`: e.g., "Texas, USA".

## Logic
1. Scrape search results for target criteria.
2. Filter leads by "Health" (Active social media, clear contact info).
3. Draft a "Reason for Reaching Out" (RRO) for each lead.
4. Prepare a CSV/JSON batch for human approval.

## Output
```json
{
  "lead_name": "Smith Distribution",
  "contact": "john@smithdist.com",
  "outreach_draft": "Hi John, noticed Smith Distribution is expanding its fleet. Our AI Agent can...",
  "fit_score": 92
}
```
