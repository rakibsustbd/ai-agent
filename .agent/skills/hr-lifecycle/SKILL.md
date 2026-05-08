# Skill: HR Lifecycle (Onboarding & Offboarding)

## Description
Manages the end-to-end employee lifecycle, from the moment a contract is signed to the final exit interview, automating administrative friction.

## Capabilities
- **Onboarding Automation**: Trigger document signing, hardware procurement, and account creation (Slack, Email, CRM).
- **Compliance Checklist**: Ensure NIDs, Bank details, and signed contracts are all collected and stored.
- **Offboarding Automation**: Revoke system access, calculate final prorated settlements, and schedule exit interviews.
- **SOP Orchestration**: Follow the SME's specific "New Joiner" or "Exit" SOPs to ensure a consistent experience.

## Inputs
- `employee_data`: Name, Role, Start/End Date, Salary.
- `onboarding_sop`: The company's specific joining checklist.
- `exit_sop`: The company's specific exit procedure.

## Logic
1. Detect a "Start Date" or "End Date" event.
2. Initialize the stateful workflow (e.g., Day 1 tasks, Day 30 follow-up).
3. Send automated notifications to IT (for laptop), Admin (for ID cards), and Finance (for payroll).
4. Track completion of all mandatory documents.
5. Log a full "Employee Lifecycle History" for HR audits.

## Output
```json
{
  "event": "onboarding_initiated",
  "employee": "Sarah Jenkins",
  "pending_tasks": [
    "Contract signature",
    "Laptop procurement",
    "Email creation"
  ],
  "timeline": "Start Date: 2026-06-01"
}
```
