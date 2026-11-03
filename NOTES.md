# Notes

Working state for the next session. Rewritten each session; git history has the old versions.

## Current state

Pocket Metronome is complete as an example. Everything on `main` works: tempo by slider, buttons and tapping; beats per bar; accent; offline; installable. Tested at 390×844, 320 px and desktop, in light and dark, online and offline.

No work in progress. No open branches.

## Design decisions

- **Audio on the audio clock.** Clicks are scheduled with `AudioContext.currentTime` in a lookahead loop. The loop's tick comes from a worker built from a Blob, so it stays inside `index.html` and keeps time when the tab is hidden. The lookahead grows from 0.12 s to 1.5 s while hidden.
- **Visuals follow audio.** Each scheduled beat goes into a queue; `requestAnimationFrame` draws whichever beat's time has passed. The pendulum reaches an extreme on each beat and eases between with a cosine.
- **The weight slides with tempo,** high on the arm when slow and low when fast, like a mechanical metronome. It's the one distinctive visual element; everything else stays quiet.
- **Storage key** is `<repo>:settings`, with the repo name taken from the URL. Values are validated on read, because any app on the origin can write them.
- **Reduced motion** keeps the arm still; the beat dots still light.

## Tried and dropped

- `setInterval` scheduling: audibly drifts within a minute and stalls in background tabs.
- A web font for the numerals: not worth the offline complexity; `ui-rounded` looks right on Apple devices and falls back cleanly.

## Next

Nothing planned: this is the template. See `ROADMAP.md` for what a real metronome app might do next.
