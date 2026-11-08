# Guide 01 — build prompt
Build Tide Almanac, an interactive North Sea coastal almanac with an illustrative tide clock, moon phases, sea-level chart and storm-surge history.

Stack: shadcn/ui for components and layout, Motion for all transitions and state changes, Anime.js for scroll and load animation.

Rules:
- Use spring physics, never linear easing.
- Animate on scroll into view, not all at once on load.
- Keep every animation under 400ms (320ms spring, ticker hard stop at 350ms).
- Do not write custom keyframes when the library already does it.
- Respect prefers-reduced-motion.
- One library per job: Motion owns dial/state/ticker; Anime.js owns heading load and two historical scroll reveals. Never target the same node with both.
- Use copied Magic UI NumberTicker in the hero; retain its MIT notice and adapt it for reduced motion and a sub-400ms deadline.
- Use shadcn/ui ChartContainer and ChartTooltip. Recharts is the shadcn chart's own dependency, not an additional chart stack.
- Start with the hero section only. Render and review before building the rest.

Guide: The 5 Sites That Make AI-Built Websites Look Expensive. Library attribution: Sebastian Hardy. https://docs.google.com/document/d/1xJX5V0UXEMwu66qwL_fqStcUP1p40SHbK1NN3at2djc/edit

Manus is a paid agent and was skipped; direct free-library implementation replaces its planning/build role. All tide values and lunar dates are illustrative, not live observations.
