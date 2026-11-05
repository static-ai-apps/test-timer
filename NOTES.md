# Notes

State: v1 shipped via branch `build-timer`. Tested with Playwright at 390x844: presets, adjust, start/pause/reset, finish all work; no console errors.
Followed the curator's advice (build the kitchen timer).
Design: end timestamp (Date.now) drives the countdown, so it stays accurate if the tab is throttled. Storage key `test-timer:duration`.
Not tested: real audio output, vibration, wake lock on a device.
Next: see ROADMAP.md.
