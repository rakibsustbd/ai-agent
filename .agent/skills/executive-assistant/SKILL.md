# Skill: Executive Assistant (Inbox & Calendar)

## Description
Acting as a high-level gatekeeper, this skill manages the SME owner's communication and schedule to maximize deep work time and minimize administrative fatigue.

## Capabilities
- **Inbox Triage**: Categorize emails by priority (Urgent, Newsletter, To-Do, FYIs) and summarize long threads.
- **Drafting & Reply**: Ghostwrite replies based on the owner's tone and previous communication history.
- **Smart Scheduling**: Coordinate meetings by checking availability across multiple calendars and handling the back-and-forth with external parties.
- **Task Extraction**: Identify action items buried in emails and push them to a task manager (Linear/Asana/ClickUp).
- **Daily Briefing**: Generate a morning summary of the day's schedule, key emails, and top 3 priorities.

## Inputs
- `email_inbox_feed`: Real-time or batch access to messages.
- `calendar_feed`: Access to Google/Outlook events.
- `owner_preference_sop`: Preferred meeting times, block-out periods, and communication tone.

## Logic
1. Scan new emails and categorize based on `owner_preference_sop`.
2. Extract dates/times from emails to suggest calendar slots.
3. Use RAG to draft replies using historical context (e.g., "How do we usually handle refund requests?").
4. Flag "Executive Attention Required" items that don't match known patterns.
5. Auto-schedule "Focus Time" blocks to prevent meeting bloat.

## Output
```json
{
  "action": "reply_drafted",
  "subject": "Re: Partnership Proposal",
  "priority": "high",
  "suggested_slot": "2026-05-10 at 14:00",
  "summary": "Partner is asking for a 15% discount. Drafted a soft refusal based on our May pricing policy."
}
```
