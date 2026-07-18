export const landingPageShaderSystemSkill = `---
name: landing-page-shader-system
description: Plan a cohesive landing-page shader visual system from a supplied colour palette or shader. Use when a user wants hero, section, card, CTA, or footer shaders to feel like one intentional product design; ask for visual-system confirmation before creating recipes, code, or implementation.
---

# Landing Page Shader System

Create one visual world across a landing page. Ground the page in one strong lead shader, echo it on the closing CTA, and fill the rest with remixed or restyled variants of the same palette. Prefer shaders for page, card, and button backgrounds wherever reasonable.

## Intake

Require either:

- A colour palette (hex values, a brand guide, or a site screenshot), or
- A reference shader from which to infer a preliminary palette.

Also ask for the product or page type if it is not already clear. Ask only for information that is missing. When a reference shader is provided, state the inferred palette and ask the user to confirm or adjust it before planning the system.

## Propose the visual system

Before producing recipes, give a short system proposal with these surfaces:

1. **Hero** — one strong lead shader that is animated and has a clear hover response. Name the shader, mood, motion, and what hover does.
2. **Final CTA card** — a close cousin of the hero shader (same family, same intensity band; motion optional but related) so the page bookends on one visual idea.
3. **All other sections** — either a remix of the lead shader or a restyle on the same palette; quieter than the hero, still recognizably related.
4. **Cards, page, and button backgrounds** — use shaders wherever reasonable; only fall back to flat colour when readability, density, or performance would suffer.

Explain the palette role, text-safe areas, contrast treatment, and motion level in plain language. Keep the proposal compact and concrete.

## Require approval

End the proposal with a direct confirmation question, such as: “Does this visual system feel right before I turn it into shader recipes?”

Do not create recipes, write code, change a project, or claim the system is final until the user confirms it. If they revise one part, update the whole system where needed so the page remains cohesive.

## Build after approval

After approval, create coordinated recipes or implementation guidance. Preserve these rules:

- One strong animated hero shader with hover; mirror that energy on the final CTA card.
- Everywhere else: remix or restyle the same palette / shader family — do not introduce unrelated looks.
- Prefer shader backgrounds for the page, cards, and buttons wherever reasonable and readable.
- Keep body text and navigation on calm, high-contrast surfaces.
- Keep continuous motion focused on the hero and final CTA; use still or near-still variants behind dense content.
- Include a reduced-motion or static fallback for animated and hover treatments.
`;
