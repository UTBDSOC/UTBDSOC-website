# UTSBDSOC Hero + Navbar — Detailed Change Log & Rationale

This doc explains **what changed**, **why we changed it**, the **trade‑offs** we considered, and **what to do next**. It covers both the **Hero** (landing header) and the **Navbar**.

---

## 1) Summary of What You Asked For (Your Thought Process)

* You wanted the hero to **match the society’s logo** aesthetic more closely (tiger mark with warm oranges).
* You liked the **small, tasteful animations** but **not the lag** from heavy effects.
* You asked to **increase visual dominance** of the headline (HELLO + animated words) and the **logo circle**.
* You removed the **black background**, then asked for **better background colours**, then chose **orange‑leaning** accents.
* You replaced the placeholder text with the **actual logo file** `BDSOC-logo_transparent-2-1.png.webp`.
* For the navbar, you wanted an **orange theme**, later requested a **transparent background** to overlay the hero, while keeping mobile readability.

So the guiding priorities were:

1. **Brand alignment** (colors, logo prominence).
2. **Performance** (GPU‑friendly animations only).
3. **Clarity & responsiveness** (big type, clean layout, mobile drawer).
4. **Consistency** (navbar matches hero palette and behaviors).

---

## 2) Files/Components Affected

* `Hero.tsx` (or `Hero.jsx`):

  * **Headline (`HELLO`)** with shimmer.
  * **AnimatedText** component (swapping words).
  * **Logo circle** with orbit ring and **Next.js `Image`** for the logo.
  * **Buttons** with pulse halo.
  * **Background** (moved from pure black to warm charcoal gradient).

* `Navbar.tsx`:

  * Palette changed **amber → orange**.
  * Active link styling.
  * Mobile drawer.
  * **Transparent** background version with contrast kept for mobile menu.

---

## 3) Visual & Theming Changes

### 3.1 Palette Shift: Amber → Orange

* **Why:** Your latest direction was a stronger **orange** identity to match energy and the tiger logo more directly.
* **What changed:**

  * `amber-` classes replaced with `orange-` equivalents.
  * CSS gradients updated to `rgba(255,140,0,…)` ranges (orange).
  * Underlines, ring gradients, button fills now use `orange`.

### 3.2 Logo Integration

* **Why:** You wanted the actual logo centered in a hero circle for brand recognition.
* **What changed:**

  * Replaced `LOGO` text with `Image`:

    * `src="/BDSOC-logo_transparent-2-1.png.webp"`
    * `object-contain` inside a rounded, bordered, shadowed circle.
    * `overflow-hidden` to keep clean edges.
  * Kept a **light orbit ring** animation around the circle to add subtle motion without affecting the logo’s legibility.

### 3.3 Background

* **Your path:** Black → remove gradient → didn’t like flat black → requested better colour → chose **dark warm charcoal** → evolved to a **subtle warm gradient** (`from #1b1b1b via #221c19 to #2d1f15`).
* **Why:**

  * Solid black can feel harsh; warm charcoal keeps contrast but is less fatiguing.
  * The gentle gradient adds visual depth with **zero heavy filters**.
* **Result:** Orange elements pop more; hero feels premium without noise.

### 3.4 Typography & Scale

* **What changed:**

  * `HELLO` increased up to `lg:text-[10rem]`.
  * Animated words increased to `lg:text-7xl` with wider underline bars.
  * The **logo circle** enlarged (`width: 90%`, capped at `600px`).
* **Why:** You asked the logo and text to **take up more room** for impact.

---

## 4) Motion & Performance

### 4.1 Kept Animations, Killed Jank

* **Kept**:

  * **HELLO shimmer**: background‑position only (GPU‑friendly).
  * **Text swap**: transform/opacity only; respects `prefers-reduced-motion`; pauses when tab hidden.
  * **Orbit ring**: tiny SVG `stroke-dashoffset` animation.
  * **Button pulse**: scale/opacity only (no box‑shadow animation).

* **Avoided**:

  * Animated **box‑shadows** (paint heavy).
  * **Backdrop blurs** or large `filter: blur()` layers.
  * Frequent re‑renders or DOM scans (e.g., no z‑index querying loops).

**Why this matters:** You previously experienced lag when you combined a big word animation with gravity‑physics for many draggable cards. We preserved **wow** with **cheap** effects.

---

## 5) Accessibility & UX Enhancements

* **Reduced motion**: `AnimatedText` respects `prefers-reduced-motion`.
* **Pause on hidden tab**: Text interval won’t keep running in background.
* **Navbar**:

  * **Active link** detection via `usePathname()`.
  * **Keyboard‑friendly** underline grows on focus/hover.
  * **Mobile drawer** has a solid dark background for readability.

---

## 6) Navbar Specific Changes

### 6.1 Transparent Background

* **Why:** You wanted the navbar to **float over the hero** without blocking its look.
* **What changed:**

  * Navbar container is now **`bg-transparent`**.
  * The top accent bar remains (thin orange gradient) to subtly mark the navbar region.
  * **Mobile drawer** keeps **`bg-[#1b1b1b]/95`** so items stay readable over any hero background.

### 6.2 Branding & Actions

* **Brand name** is `text-orange-400` with hover → `text-orange-300`.
* **Membership** CTA is a filled **orange** pill button (high contrast).
* **Social icons** inherit the orange theme and lighten on hover.

---

## 7) Trade‑offs Considered

* **Large visuals vs performance**: We increased scale but restricted animations to transform/opacity/gradient position and one SVG stroke animation—all extremely cheap.
* **Transparent navbar vs readability**: We kept the main bar transparent and the mobile menu opaque for readability.
* **Orange vibrancy vs eye strain**: We chose **warm charcoal** as a base so orange stays readable and attractive without glowing too aggressively.

---

## 8) Implementation Notes

* **Image path**: Make sure `public/BDSOC-logo_transparent-2-1.png.webp` exists.
* **Font loading**: If you use custom fonts for headings, consider preloading or `next/font` to avoid CLS.
* **Tailwind**: Classes assume Tailwind is configured (which you’re already using).

---

## 9) Suggested Next Steps (Practical, Short & Sweet)

### A) Visual polish

* **Optional**: Add a **soft radial glow** behind the logo circle using a non‑animated radial gradient (still cheap).
* **Optional**: Slight **parallax** on scroll for the logo circle (translateY a few px) using `IntersectionObserver`—transform‑only.

### B) Navbar behavior (recommended)

* Implement **“hide on scroll down, show on scroll up.”**

  * Improves reading space on mobile.
  * Tiny custom hook (`useScrollDirection`) + `translate-y` classes—no reflow.

### C) Performance & QA

* **Compress images** further (WebP/AVIF). Make sure logo is under \~150–250 KB.
* **Lighthouse** pass: check performance (CLS, LCP), accessibility (contrast).
* Test on **mid‑tier Android** (Chrome), **Safari iOS**, and **Windows Chrome**.

### D) Code quality

* Extract a `theme.ts` (design tokens):

  * `--color-bg`, `--color-accent`, `--ring-color`, etc.
  * Makes swapping orange/amber trivial later.
* Centralise **link config** (you already have `links` and `socials` objects—good!). Consider moving to `lib/nav.ts` to reuse across components.

### E) Feature toggles (if you revisit the old gravity cards)

* Add an **“Animation Mode”** toggle (e.g., `'gravity' | 'headline' | 'hybrid'`), and cut card count on mobile. This sets expectations and guards perf.

---

## 10) Acceptance Criteria (So You Know It’s “Done”)

* **Brand**: Orange accents visible, logo centered, hero feels “UTSBDSOC.”
* **Performance**: 60fps on desktop; no visible jank on mid‑tier mobile; Lighthouse Perf ≥ 85.
* **Accessibility**: Text pass AA contrast on background; reduced‑motion respected.
* **Responsiveness**: No overlaps; hero scales from 320px → 1440px gracefully.
* **Navbar**: Transparent at top, readable over hero, solid for mobile drawer, active link visible.

---

## 11) Quick Demo Ideas for Stakeholders

* **Two screenshots**:

  1. Old (black + amber + text “LOGO”).
  2. New (warm charcoal gradient + orange + real logo + subtle animations).
* **15‑second screen capture**: show shimmer, word swap, orbit ring, hover states, mobile drawer.

If you want, I can throw together the **scroll‑aware navbar** and the **radial glow behind the logo** as optional patches. Which one do you want first?
