# Motion System — Golden Hour

## Principles

- Motion carries the page from atmosphere to information; it never competes with the work.
- All reveals use opacity plus a 22px vertical lift with an ease-out curve.
- Hover motion is limited to a small lift or scale and uses spring physics.
- The tool strip is a quiet, linear marquee that pauses on hover.
- `prefers-reduced-motion` disables the marquee and keeps content visible without movement.

## Locked values

| Behaviour | Value |
| --- | --- |
| Reveal | `0.72s`, `[0.16, 1, 0.3, 1]`, `y: 22` |
| Project hover | Spring `stiffness: 280`, `damping: 28`, `y: -4` |
| Navbar compact transition | `0.3s` CSS interpolation |
| Navbar link indicator | Spring `stiffness: 520`, `damping: 34`, `mass: 0.55` |
| CTA hover | Spring `stiffness: 300`, `damping: 25`, scale `1.03` |
| Marquee | `34s` linear loop, paused on hover |

