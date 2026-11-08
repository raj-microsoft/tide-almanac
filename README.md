# Tide Almanac

An interactive, deliberately illustrative North Sea coastal almanac. Choose Den Helder, Whitby or Cuxhaven, explore a synthetic tide cycle, read a shadcn/ui sea-level chart, switch lunar phases and encounter the history of the 1953 flood.

**Not live data. Not for navigation, swimming decisions or flood warnings.**

## Run
`npm ci`, then `npm run dev`. `npm run build` typechecks and creates `docs/` for GitHub Pages at `/tide-almanac/`. `npm run lint` checks source. `node verify.mjs [URL]` verifies the rendered site with local Microsoft Edge and creates desktop/mobile captures.

## Guide and method
Guide 01: **The 5 Sites That Make AI-Built Websites Look Expensive**, credited to Sebastian Hardy in [the source library](https://raj-microsoft.github.io/ai-web-design-library/). [Original guide](https://docs.google.com/document/d/1xJX5V0UXEMwu66qwL_fqStcUP1p40SHbK1NN3at2djc/edit).

See MASTER-PROMPT.md. Hero built and visually reviewed first; then chart, lunar interaction and history. Motion state springs and Anime.js load/scroll reveals never target the same nodes. Maximum duration 350ms. Reduced-motion mode supported. Magic UI NumberTicker copied under MIT with accessibility/deadline adaptations and full notice retained. shadcn initialized through its CLI; Button and chart components copied through its registry. Recharts is the shadcn chart dependency, not an additional chart stack.

Manus is a paid agent and was skipped; direct free-library implementation replaced it. No paid services, accounts or keys were used. Fonts self-hosted, license notices included; no external imagery.

## Evidence and limits
Historical sources read 2026-11-09: [1953 North Sea flood](https://en.wikipedia.org/wiki/North_Sea_flood_of_1953), [Rijkswaterstaat water management](https://www.rijkswaterstaat.nl/en/expertise/water). Copy summarizes established facts without death toll estimates. Station profiles and lunar phases are synthetic/schematic, not ephemerides.

Impeccable context, concept seed, craft floor and detector used. Direct interview and independent reviewer replaced with explicit-brief assumptions and an in-thread finish review, because this delegated assignment prohibits further delegation. Detector returned no findings on built HTML plus authored JSX/CSS; it warned that the local HTML resolver cannot locate the Pages-prefixed stylesheet. See REVIEW.md for precise scope.

## Licenses
Copied Magic UI and shadcn sources: MIT, notices in `references/` and `public/THIRD-PARTY-NOTICES.txt`. Fonts: OFL, notices in the same public file. Dependencies retain their respective licenses. Project content and original implementation: MIT.
