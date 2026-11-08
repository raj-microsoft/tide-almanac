---
name: Tide Almanac
description: A North Sea field companion
colors:
  marine: "#173f4a"
  seafoam: "#e1ebdf"
  chalk: "#edf2eb"
  signal: "#cce77c"
  secondary-ink: "#49645f"
  history-ground: "#d7e4dc"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(54px, 6.6vw, 94px)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(38px, 4.2vw, 60px)"
    fontWeight: 500
    lineHeight: 1.04
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.9
rounded:
  control: "4px"
spacing:
  group: "16px"
  passage: "24px"
  section: "80px"
components:
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.marine}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
---
# Design System: Tide Almanac
## Overview
**Creative North Star: "The Coastal Passage Board"**
An open, clear wayfinding system for bright-light coastal reading. Large narrow lettering establishes place; lines and meaningful data establish rhythm. Descriptive language is inferred from the built delegated brief, not user-interviewed.

**Key Characteristics:**
- Open fields rather than card grids.
- Marine and seafoam regions with a sparing signal color.
- Functional circular geometry, not ornamental illustration.
## Colors
Marine is the primary ink and the lunar-section field. Seafoam and chalk alternate calm reading surfaces; signal marks active lunar state and the tide needle. Secondary ink remains readable on pale grounds.

**The Signal Rule.** Chartreuse identifies the active relationship, never arbitrary decoration.
## Typography
Self-hosted Barlow Condensed carries display and section titles; Manrope carries controls and historical text. Tabular numerals keep tide measurements steady. Mobile display uses the fluid scale, while prose and controls reflow without horizontal scrolling.
## Layout
Desktop sections use seven-percent side gutters and generous vertical separation. At 700px and below, gutters become six percent and multi-column sections stack. The hero dial stays the principal interactive geometry.

**The Open Field Rule.** Separate subjects with scale, space and tonal fields rather than repeated cards.
## Elevation & Depth
Flat tonal layering. No decorative shadows; chart tooltips retain the structural library treatment.
## Shapes
The circular dial is measurement geometry. Form controls are simple ruled selections or modestly rounded outlined buttons. Large content containers do not use rounded-card framing.
## Components
Station select and time range are native keyboard-accessible controls. shadcn Button toggles the chart's tabular alternative; ChartContainer and ChartTooltip frame Recharts. The lunar buttons pair schematic discs with text and pressed state.

**The Motion Ownership Rule.** Motion owns state and ticker springs. Anime.js owns heading/load and history/scroll reveals. No node is animated by both. Duration is at most 350ms; reduced motion removes travel.
## Do's and Don'ts
- Do keep synthetic data labelled beside the data.
- Do preserve visible focus and keyboard-operable controls.
- Do use the active signal sparingly.
- Don't turn open content into repeated cards.
- Don't introduce photographs without verified reuse rights.
- Don't imply navigation or warning accuracy.
