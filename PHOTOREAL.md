# Photoreal pass — 2026-11-09

- ChatGPT image generation: 2 outputs, yielding 7 distinct scenes (one hero plus a six-scene contact sheet cropped into three generic station portraits, high/low tide pair and storm sea). Every scene visually inspected; all optimized asset hashes distinct.
- Golden-hour Wadden/North Sea hero, generic Dutch dunes / English cliffs / German saltmarsh. No exact-location claims. No people, damage or destruction.
- Storm image clearly labelled AI illustration, not historical photography or a reconstruction of 1953. Historical source links unchanged. All model data remains illustrative.
- Gemini Veo attempted in a new chat with uploaded hero: Create video selected, but Send remained aria-disabled after upload/prompt. No quota was consumed or settings changed. Used the authorized local-animation fallback: `render-sea.py` creates a periodic, locked-camera sea displacement, H.264, no audio, 6-second loop.
- Payload: hero WebP 87,092 / 38,914 bytes (1600 / 960); other responsive WebPs 8,170–52,802 bytes. Video desktop 229,136 bytes, mobile 85,455 bytes. All 16 media variants combined 763,783 bytes. Below-fold pictures lazy-loaded and dimensioned.
- Headless Edge at 390 / 1440: station and time controls, chart table, lunar buttons, keyboard, no overflow, zero JS errors. Video source selection, mute/loop/pause and dynamic reduced-motion still verified. Five external links return 200.
- Impeccable run on built index and rendered markup with production CSS. Fixed text sizing and shared muted-token hover contrast. Final rendered scan has no non-advisory findings. Design-token advisories reviewed; overlay additions documented in DESIGN.md.
- Existing build warns about the pre-existing large JS chunk; lint has only the pre-existing shadcn Fast Refresh export warning.
- Schematic moon, chart, clock graduations and needle retained intentionally for educational clarity and guide-01 motion ownership.

Verification: `node verify.mjs [URL]`, `node verify-photo.mjs [URL]`. Screenshots/results in `.impeccable/review/` (local, ignored).
