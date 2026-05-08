# Skill: HR Screening Bot (Talent Filter)

## Description
Screens high volumes of job applications against specific Job Descriptions (JDs) and Company Culture SOPs.

## Capabilities
- **Resume Parsing**: Extract Skills, Experience, Education, and Contact Info from PDFs.
- **JD Matching**: Score candidates based on keyword relevance and experience years.
- **Red Flag Detection**: Identify gaps in employment or mismatch in location requirements.
- **Initial Chat-Screening**: Conduct an automated Q&A to verify availability and salary expectations.

## Inputs
- `resume_file`: Candidate's CV.
- `job_description_sop`: The criteria for the role.

## Logic
1. Extract text from resume and JD.
2. Perform semantic comparison (not just keyword matching).
3. Check for mandatory requirements (e.g., "Must have driver's license").
4. Assign a "Match Score" (0-100).
5. Generate a "Interview Guide" for the top candidates with suggested follow-up questions.

## Output
```json
{
  "recommendation": "advance",
  "score": 88,
  "key_strengths": ["5 years in Retail", "Expert in POS systems"],
  "missing_skills": ["SQL basics"],
  "suggested_questions": ["Can you explain your experience with inventory shrinkage?"]
}
```
