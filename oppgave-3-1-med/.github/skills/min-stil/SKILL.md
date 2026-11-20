---
name: min-stil
description: A reusable design system focused on clean minimalism, strong typography, and purposeful color usage. This skill guides AI agents to create consistent, accessible, and visually refined interfaces.
version: 1.0.0
---

# Min Stil - Minimalist Design System

This design system embodies clean, purposeful design with strong typographic hierarchy, restrained color usage, and thoughtful spacing. Use this skill when building interfaces that prioritize clarity, readability, and visual elegance without unnecessary decoration.

## Core Design Philosophy

**Principles:**
- Less is more: Every element serves a purpose
- Typography does the heavy lifting
- White space is a design element, not empty space
- Color is used intentionally, not decoratively
- Consistency builds trust and usability

**When to use this skill:**
- Corporate websites and portfolios
- SaaS product interfaces
- Content-focused applications
- Professional documentation sites
- Business landing pages

**When NOT to use this skill:**
- Gaming websites (use themed designs instead)
- Children's applications (needs more playfulness)
- Event/festival sites (needs more energy)
- E-commerce with heavy product imagery

## Color Palette

### Primary Colors
```css
--primary-dark: #1a1a1a      /* Main text, headers */
--primary-light: #f8f9fa     /* Backgrounds, light surfaces */
--accent-blue: #2563eb       /* Primary actions, links */
--accent-indigo: #4f46e5     /* Secondary accents, hover states */
```

### Semantic Colors
```css
--success-green: #10b981     /* Success states, confirmations */
--warning-amber: #f59e0b     /* Warnings, cautions */
--error-red: #ef4444         /* Errors, destructive actions */
--info-cyan: #06b6d4         /* Information, tips */
```

### Neutral Grays
```css
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db
--gray-400: #9ca3af
--gray-500: #6b7280
--gray-600: #4b5563
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827
```

### Usage Guidelines
- Use `primary-dark` for body text and headings
- Use `primary-light` for page backgrounds
- Limit accent colors to CTAs and interactive elements
- Never use more than 3 colors in a single section
- Maintain 4.5:1 contrast ratio for text (WCAG AA)

## Typography

### Font Families
```css
/* Headings: Strong, geometric sans-serif */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Body: Readable, neutral sans-serif */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;

/* Code/Technical: Monospace */
font-family: 'JetBrains Mono', 'Fira Code', Consolas, Monaco, monospace;
```

**Implementation Note:** Use system fonts as fallbacks. If using web fonts, load only 2-3 weights to maintain performance.

### Type Scale
Based on 1.250 (Major Third) scale with 16px base:

```css
--text-xs: 0.75rem      /* 12px - Small labels, captions */
--text-sm: 0.875rem     /* 14px - Secondary text, metadata */
--text-base: 1rem       /* 16px - Body text */
--text-lg: 1.125rem     /* 18px - Large body, subheadings */
--text-xl: 1.25rem      /* 20px - Section subheaders */
--text-2xl: 1.5rem      /* 24px - Card titles */
--text-3xl: 1.875rem    /* 30px - Section headers */
--text-4xl: 2.25rem     /* 36px - Page titles */
--text-5xl: 3rem        /* 48px - Hero headlines */
--text-6xl: 3.75rem     /* 60px - Major hero text */
```

### Font Weights
```css
--font-light: 300       /* Sparingly used, large text only */
--font-regular: 400     /* Body text */
--font-medium: 500      /* Emphasis, UI elements */
--font-semibold: 600    /* Subheadings */
--font-bold: 700        /* Main headings */
```

### Line Height
```css
--leading-tight: 1.25   /* Large headings */
--leading-snug: 1.375   /* Small headings */
--leading-normal: 1.5   /* Body text */
--leading-relaxed: 1.625 /* Long-form content */
--leading-loose: 2      /* Spacious content */
```

### Typography Rules
- Headings use semibold (600) or bold (700)
- Body text uses regular (400)
- Line length: 60-80 characters for readability
- Paragraph spacing: 1.5em between paragraphs
- Never use ALL CAPS for long text
- Use sentence case for UI elements, not Title Case

## Spacing System

Use a consistent 8px base unit for all spacing:

```css
--space-1: 0.25rem   /* 4px - Tight spacing */
--space-2: 0.5rem    /* 8px - Base unit */
--space-3: 0.75rem   /* 12px - Small gaps */
--space-4: 1rem      /* 16px - Default gap */
--space-5: 1.25rem   /* 20px - Medium gap */
--space-6: 1.5rem    /* 24px - Section spacing */
--space-8: 2rem      /* 32px - Large gap */
--space-10: 2.5rem   /* 40px - XL gap */
--space-12: 3rem     /* 48px - Section divider */
--space-16: 4rem     /* 64px - Major sections */
--space-20: 5rem     /* 80px - Page sections */
--space-24: 6rem     /* 96px - Hero spacing */
```

**Spacing Principles:**
- Use multiples of 8px for consistency
- Increase spacing as element importance grows
- Maintain consistent spacing within component types
- Use generous white space around important elements

## Layout & Structure

### Grid System
Use CSS Grid or Flexbox with these principles:
- 12-column grid for complex layouts
- Max content width: 1280px (large screens)
- Comfortable reading width: 680px (prose)
- Consistent gutters: 24px (desktop), 16px (mobile)

### Container Sizes
```css
--container-sm: 640px   /* Forms, narrow content */
--container-md: 768px   /* Articles, reading content */
--container-lg: 1024px  /* Standard page width */
--container-xl: 1280px  /* Wide layouts */
--container-2xl: 1536px /* Full-width sections */
```

### Border Radius
```css
--radius-sm: 0.25rem    /* 4px - Subtle rounding */
--radius-md: 0.5rem     /* 8px - Default */
--radius-lg: 0.75rem    /* 12px - Cards, panels */
--radius-xl: 1rem       /* 16px - Large components */
--radius-full: 9999px   /* Pills, avatars */
```

**Border Radius Rules:**
- Use consistent radius throughout the interface
- Buttons: `radius-md` (8px)
- Cards: `radius-lg` (12px)
- Small elements (badges): `radius-sm` (4px)
- Never mix different radii randomly

## Components

### Buttons

**Primary Button:**
```css
background: var(--accent-blue);
color: white;
padding: 0.75rem 1.5rem;
border-radius: var(--radius-md);
font-weight: 600;
transition: all 0.2s ease;

hover {
  background: #1d4ed8; /* Darker blue */
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}
```

**Secondary Button:**
```css
background: transparent;
color: var(--primary-dark);
border: 2px solid var(--gray-300);
padding: 0.75rem 1.5rem;
border-radius: var(--radius-md);
font-weight: 600;

hover {
  border-color: var(--accent-blue);
  color: var(--accent-blue);
}
```

### Cards

```css
background: white;
border: 1px solid var(--gray-200);
border-radius: var(--radius-lg);
padding: var(--space-6);
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
transition: all 0.3s ease;

hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
```

### Forms

**Input Fields:**
```css
width: 100%;
padding: 0.75rem 1rem;
border: 2px solid var(--gray-300);
border-radius: var(--radius-md);
font-size: 1rem;
transition: all 0.2s;

focus {
  outline: none;
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

error {
  border-color: var(--error-red);
}
```

**Labels:**
```css
display: block;
font-weight: 600;
margin-bottom: 0.5rem;
color: var(--gray-700);
```

### Navigation

```css
position: fixed;
top: 0;
width: 100%;
background: white;
border-bottom: 1px solid var(--gray-200);
padding: 1rem 2rem;
backdrop-filter: blur(10px);
z-index: 1000;

/* Link styling */
a {
  color: var(--gray-700);
  font-weight: 500;
  transition: color 0.2s;
}

a:hover {
  color: var(--accent-blue);
}

a.active {
  color: var(--accent-blue);
  font-weight: 600;
}
```

## Shadows

Use subtle shadows for depth:

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

**Shadow Guidelines:**
- Use shadows sparingly
- Larger shadows for floating elements (modals, dropdowns)
- Subtle shadows for cards and buttons
- No shadows on flat surfaces

## Animations & Transitions

### Timing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Duration
```css
--duration-fast: 150ms    /* Quick interactions */
--duration-normal: 250ms  /* Default transitions */
--duration-slow: 350ms    /* Emphasized changes */
```

### Animation Rules
- All interactive elements should have transitions
- Use `ease-out` for elements entering
- Use `ease-in` for elements leaving
- Keep animations under 400ms
- Respect `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Responsive Design

### Breakpoints
```css
--breakpoint-sm: 640px    /* Mobile landscape, small tablets */
--breakpoint-md: 768px    /* Tablets */
--breakpoint-lg: 1024px   /* Small laptops */
--breakpoint-xl: 1280px   /* Desktops */
--breakpoint-2xl: 1536px  /* Large screens */
```

### Mobile-First Approach
Always design for mobile first, then enhance for larger screens:

```css
/* Mobile base styles */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
```

### Touch Target Sizes
- Minimum tap target: 44x44px (iOS), 48x48px (Android)
- Buttons on mobile: minimum 48px height
- Adequate spacing between interactive elements: 8px minimum

## Accessibility Guidelines

### Color Contrast
- Normal text: 4.5:1 contrast ratio (WCAG AA)
- Large text (18px+): 3:1 contrast ratio
- UI components: 3:1 contrast ratio

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--accent-blue);
  outline-offset: 2px;
}
```

### Semantic HTML
- Use proper heading hierarchy (h1 → h6)
- Use `<button>` for actions, `<a>` for navigation
- Include alt text for all images
- Use ARIA labels when necessary

### Form Accessibility
- Labels for all form inputs
- Error messages linked with `aria-describedby`
- Required fields marked with `aria-required`
- Clear focus indicators

## Implementation Checklist

When building with this design system:

**Setup:**
- [ ] Define CSS custom properties for colors
- [ ] Set up type scale and spacing system
- [ ] Configure responsive breakpoints
- [ ] Load fonts (system or web fonts)

**Components:**
- [ ] Apply consistent button styles
- [ ] Use card pattern for grouped content
- [ ] Style forms with proper validation states
- [ ] Implement navigation with active states

**Responsive:**
- [ ] Test on 375px (mobile)
- [ ] Test on 768px (tablet)
- [ ] Test on 1440px (desktop)
- [ ] Ensure no horizontal scrolling
- [ ] Verify touch targets on mobile

**Accessibility:**
- [ ] Check color contrast ratios
- [ ] Test keyboard navigation
- [ ] Add focus indicators
- [ ] Include ARIA labels where needed
- [ ] Test with screen reader

**Polish:**
- [ ] Add hover states to interactive elements
- [ ] Implement smooth transitions
- [ ] Use consistent spacing throughout
- [ ] Optimize for performance

## Common Patterns

### Hero Section
```css
.hero {
  padding: var(--space-24) var(--space-4);
  text-align: center;
  background: var(--primary-light);
}

.hero-title {
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  color: var(--primary-dark);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-6);
}

.hero-description {
  font-size: var(--text-lg);
  color: var(--gray-600);
  max-width: 680px;
  margin: 0 auto var(--space-8);
  line-height: var(--leading-relaxed);
}
```

### Content Section
```css
.section {
  padding: var(--space-20) var(--space-4);
}

.section-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-4);
  text-align: center;
}

.section-description {
  font-size: var(--text-lg);
  color: var(--gray-600);
  text-align: center;
  max-width: 680px;
  margin: 0 auto var(--space-12);
}
```

### Feature Grid
```css
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
}

.feature-card {
  padding: var(--space-8);
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
}
```

## Anti-Patterns to Avoid

**Don't:**
- ❌ Use more than 3 different fonts
- ❌ Apply random spacing values (use the system)
- ❌ Create overly complex color schemes
- ❌ Add animations to everything
- ❌ Use low-contrast text
- ❌ Inconsistent button styles across pages
- ❌ Mix different border radius values randomly
- ❌ Ignore mobile breakpoints

**Do:**
- ✅ Stick to the defined spacing scale
- ✅ Use system colors consistently
- ✅ Keep animations purposeful and quick
- ✅ Maintain high contrast for readability
- ✅ Test on actual devices
- ✅ Use semantic HTML
- ✅ Follow the type scale

## Design Tokens Summary

For quick reference when implementing:

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-text: #1a1a1a;
  --color-bg: #f8f9fa;
  --color-border: #e5e7eb;
  
  /* Typography */
  --font-base: 16px;
  --font-heading: 'Inter', sans-serif;
  --font-body: system-ui, sans-serif;
  
  /* Spacing */
  --spacing-unit: 8px;
  
  /* Effects */
  --shadow-default: 0 4px 6px rgba(0, 0, 0, 0.07);
  --radius-default: 0.5rem;
  --transition-default: 250ms ease-out;
}
```

---

## When Using This Skill

This skill is designed to be applied by AI agents building user interfaces. When activated:

1. **Read this entire skill** before starting design work
2. **Apply the color palette** exactly as defined
3. **Follow the typography scale** - don't invent new sizes
4. **Use the spacing system** - multiples of 8px only
5. **Implement all accessibility guidelines**
6. **Test responsiveness** at defined breakpoints
7. **Document any deviations** from the system with reasoning

The goal is consistency, not rigidity. If a specific use case requires deviation, document why and ensure the deviation is intentional and improves the user experience.
