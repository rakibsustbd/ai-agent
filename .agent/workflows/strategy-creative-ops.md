# Workflow: Creative & Strategy Suite (Combined)

## A. Creative Director (Campaign Flow)
1. **Goal**: `Marketing Goal Input -> Campaign Calendar -> Copy/Asset Generation -> Approval -> Scheduled`.
2. **Key State**: `Asset-Review` (User reviews visuals before they go live).

## B. Business Strategist (Research Flow)
1. **Goal**: `Research Query -> Deep Web Search -> Synthesis -> Deck/Report Generation -> Presentation`.
2. **Key State**: `Data-Validation` (Ensuring sources are credible).

## C. Retail Expansion (Site Flow)
1. **Goal**: `Address Input -> Traffic/Demo Analysis -> Competitor Mapping -> ROI Forecast -> Recommendation`.

## D. HR Lifecycle (Offboarding Flow)
1. **Goal**: `Exit Detected -> Document Generation (Settlement) -> Access Revocation -> Exit Survey -> Archived`.

---

## Technical Note: Workflow Orchestration
All workflows are designed to be "Stateful," meaning:
- They can **PAUSE** (waiting for user input).
- They can **RESUME** exactly where they left off.
- They **LOG** every transition in the dashboard "Live Thinking" panel.
