---
name: frontend-design
description: Design guidance for the responsive quiz interface in Oppgave 3.3.
---

# Frontend design

Use a focused, editorial visual identity: deep navy surfaces, warm paper backgrounds,
and amber as the action color. Keep typography legible, hierarchy obvious, and layouts
responsive from 375px upward. Use consistent spacing, visible focus states, touch
targets of at least 44px, and `prefers-reduced-motion` support.

Prefer semantic HTML, sentence case labels, accessible form controls, and restrained
motion. Use CSS custom properties for shared colors and spacing. Render user-provided
highscore names with `textContent`, never by concatenating them into HTML.
