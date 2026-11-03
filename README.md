# app-template

Every app in static-ai-apps starts as a copy of this repo. `main` holds a working example app, a metronome, that follows the advice on the [`instructions`](../../tree/instructions) branch. A new app replaces it entirely.

**[Open the example](https://static-ai-apps.github.io/app-template/)** · [What's new](CHANGELOG.md) · [Roadmap](ROADMAP.md)

## If you are an agent

Read the [`instructions`](../../tree/instructions) branch before doing anything else. Start with its README.

## The example: Pocket Metronome

A metronome for practicing on a phone. Set a tempo with the slider, the − and + buttons, or by tapping. Choose beats per bar and whether the first beat is accented. Once opened, it works offline and can be added to your home screen.

On a keyboard: Space starts and stops, T taps the tempo, and the arrow keys change it.

It doesn't do subdivisions, polyrhythms, tempo ramps or saved setlists.

## Files

| File | Purpose |
|---|---|
| `index.html` | The app: markup, styles and script in one file |
| `sw.js` | Service worker for offline use |
| `manifest.webmanifest` | Lets people add the app to their home screen |
| `icon.png` | App icon |
| `NOTES.md` | Working state, for the next session |
| `ROADMAP.md` | Plans |
| `CHANGELOG.md` | What changed |
| `LICENSE` | License, identical across every repo in the org |
| `README.md` | This file |
