# Skill: Retail Expansion Planner (Site Selection)

## Description
De-risks the expansion of retail or distribution networks by analyzing location-based data and sales potential for new sites.

## Capabilities
- **Footfall Analysis**: Use browsing agents to research traffic patterns and proximity to high-volume landmarks.
- **Competitor Mapping**: Identify all competitors within a X-mile radius of a potential site.
- **Demographic Overlay**: Analyze if the local population matches the SME's target persona.
- **Sales Forecasting**: Estimate potential revenue for a new site based on similar existing locations.
- **Permit & Regulatory Check**: Research local zoning laws or permit requirements for the new location.

## Inputs
- `target_coordinates`: Potential addresses for new sites.
- `existing_site_data`: Performance metrics of current successful locations.
- `target_persona`: Demographic details of the ideal customer.

## Logic
1. Research the geographic area for "Complementary Businesses" (e.g., Coffee shops near libraries).
2. Calculate a "Location Score" (0-100) based on visibility, competition, and demographics.
3. Compare the potential site against the "Success Profile" of existing locations.
4. Estimate "Time to Break-Even" for the new investment.
5. Generate a "Site Recommendation Report."

## Output
```json
{
  "site_address": "452 Maple Ave, Dallas",
  "score": 82,
  "pros": ["High visibility", "No competitor within 2 miles"],
  "cons": ["Limited parking during peak hours"],
  "estimated_revenue_mo": 15000.00
}
```
