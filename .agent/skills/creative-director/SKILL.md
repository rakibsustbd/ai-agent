# Skill: Creative Director (Branding & Assets)

## Description
Maintains the SME's brand identity and generates high-quality marketing assets (Copy, Design Prompts, Social Media posts) at scale.

## Capabilities
- **Copywriting**: Draft ad copy, blog posts, newsletters, and social media captions in the specific brand voice.
- **Visual Identity Management**: Ensure all generated assets follow the company's color palette, logo usage, and "vibe" rules.
- **Campaign Ideation**: Generate 1-month marketing calendars based on upcoming holidays or business milestones.
- **Creative Generation**: Interface with image/video generation tools (like Nano Banana) to create professional marketing imagery.
- **SEO Optimization**: Ensure all written content is optimized for specific target keywords to drive organic traffic.

## Inputs
- `brand_style_guide`: Logo, colors, tone, target audience.
- `marketing_goal`: e.g., "Launch a 20% off summer sale."
- `platform`: e.g., "Instagram", "LinkedIn", "Email".

## Logic
1. Analyze the `marketing_goal` against the `brand_style_guide`.
2. Generate a variety of "hooks" and "calls to action" (CTAs).
3. Create descriptions for visual assets (e.g., "A modern distribution center with a sunrise filter").
4. Bundle copy and image prompts into a "Campaign Package."
5. Review generated content for consistency and SEO alignment.

## Output
```json
{
  "campaign": "Summer Sale 2026",
  "assets": [
    { "type": "Email Header", "copy": "Stay Cool with 20% Off...", "image_prompt": "..." },
    { "type": "LinkedIn Post", "copy": "How we're scaling our logistics...", "image_prompt": "..." }
  ],
  "brand_score": 98
}
```
