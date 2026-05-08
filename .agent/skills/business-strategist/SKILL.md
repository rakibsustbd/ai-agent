# Skill: Business Strategist (Research & Decks)

## Description
Provides high-level strategic intelligence, turning raw data and market trends into actionable pitch decks, research reports, and competitive analyses.

## Capabilities
- **Market Research**: Use browsing agents to analyze competitors, pricing trends, and industry whitepapers.
- **Pitch Deck Generation**: Structure a narrative (Problem, Solution, Market, Traction) and generate content for slides.
- **Financial Modeling**: Assist in preparing "What-if" scenarios for business growth (e.g., "What happens if we increase price by 5%?").
- **Competitor Monitoring**: Track competitor social media, news, and pricing updates to provide a weekly "Threat & Opportunity" report.
- **Grant & Proposal Drafting**: Prepare structured drafts for business grants, loans, or high-stakes partnership proposals.

## Inputs
- `internal_data`: Sales history, customer feedback, growth goals.
- `external_query`: Specific research target (e.g., "competitors in the Texas distribution market").
- `deck_template`: Preferred branding and structure for presentations.

## Logic
1. Conduct multi-step web research using browsing tools.
2. Synthesize internal data against external benchmarks.
3. Map out a logical narrative flow for the requested report or deck.
4. Generate structured slide content or long-form analysis.
5. Create visualization prompts for charts (e.g., "Show a bar chart of our growth vs market average").

## Output
```json
{
  "project": "Q3 Growth Deck",
  "key_findings": [
    "Market gap found in regional warehouse automation.",
    "Main competitor 'DistroX' has increased prices by 12%."
  ],
  "slides_generated": 12,
  "next_action": "Review Slide 4 (Financial Projections)"
}
```
