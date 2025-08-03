## 🧩 Component Documentation for UTSBDSOC Website

📁 **Location**: `website/src/app/components/TechStartupcomponets`

This document provides usage explanations for each component used in the Tech Startup section of the UTSBDSOC website revamp. Each component is documented with its purpose, props (if applicable), features, and sample usage to guide future development and onboarding.

---

### 📄 `Contentpages.tsx`

**Purpose**: Displays a section with image and accompanying text, suitable for step-by-step or feature highlights.

**Props**:

* `label`, `stepNumber`, `title`, `description`
* `buttonText`, `buttonLink`, `imageUrl`
* `extraText?`, `reverse?`

**Usage**:

```tsx
<ContentPages
  label="Step 1"
  stepNumber="01"
  title="Build the Foundation"
  description="We lay the groundwork for your brand."
  buttonText="Learn More"
  buttonLink="/learn"
  imageUrl="/img/foundation.jpg"
  reverse
/>
```

---

### 💫 `coolbeam.tsx` (Export: `CodeBeams`)

**Purpose**: Animated hero section for tech/dev themes with JS/Python code cards and glowing visual effects.

**Features**:

* `Beam` animations (Framer Motion)
* Grid background
* Code tab toggling

**Usage**:

```tsx
<CodeBeams />
```

---

### 🚀 `CTA.tsx`

**Purpose**: Call-to-action section with animated text and buttons.

**Features**:

* Animated heading and paragraph
* `SplashButton` and `GhostButton` with links

**Usage**:

```tsx
<CTA />
```

---

### ❓ `FAQ.tsx`

**Purpose**: Animated FAQ section with collapsible questions.

**Features**:

* Accordion animation
* Dynamic height measurement

**Usage**:

```tsx
<FAQ />
```

---

### 🔻 `Footer.tsx`

**Purpose**: Multi-column site footer with links.

**Sections**: Services, Company, Legal

**Usage**:

```tsx
<Footer />
```

---

### 🪩 `Hero.tsx`

**Purpose**: Landing page hero section with animated content and background effects.

**Props**:

* `title`, `subtitle`, `description`
* `primaryButtonText`, `primaryButtonLink`
* `secondaryButtonText`, `secondaryButtonLink`
* `glowingChipText?`

**Usage**:

```tsx
<Hero
  title="Empower Your Brand"
  subtitle="Digital growth for real impact"
  description="We drive results with tailored strategies."
  primaryButtonText="Start Now"
  primaryButtonLink="/start"
  secondaryButtonText="Learn More"
  secondaryButtonLink="/about"
/>
```

---

### 🧾 `AboutSection.tsx`

**Purpose**: Static about section with bold agency messaging and stylized visuals.

**Usage**:

```tsx
<AboutSection />
```

---

### 🧠 `BlogThumbnails.tsx`

**Purpose**: Renders a set of blog post thumbnails + a newsletter card.

**Props**:

* `cards: BlogCardProps[]` with `title`, `href`, `readTime`, `src`

**Usage**:

```tsx
<BlogThumbnails
  cards={[{ title: "Post Title", href: "/post", readTime: "5 min", src: "/image.jpg" }]}
/>
```

---

### 🧱 `Card.tsx`

**Purpose**: Feature/service card with title, tags, button, and image.

**Props**:

* `title`, `tags[]`, `description`, `imageUrl`, `buttonText`, `buttonLink`

**Usage**:

```tsx
<Card
  title="SEO Services"
  tags={["Google", "Marketing"]}
  description="Improve rankings organically."
  imageUrl="/seo.jpg"
  buttonText="Explore"
  buttonLink="/seo"
/>
```

---

### 📬 `contactFrom.tsx`

**Purpose**: Contact form with POST submission to Formspree.

**Fields**:

* `email`, `description`

**Usage**:

```tsx
<ContactForm />
```

---

### 🧷 `ServicesCards.tsx`

**Purpose**: Interactive grid of service cards with hover overlays.

**Features**:

* SVG icons, hover animations, rich descriptions.

**Usage**:

```tsx
<ServicesCards />
```

---

### 📌 `ServicesContent.tsx`

**Purpose**: Scroll-based parallax storytelling layout for service highlights.

**Props**:

* `title`: Section heading.
* `contentData[]`: Array of service objects (`imgUrl`, `heading`, `subheading`, `description`, `buttonText`, `href`)

**Usage**:

```tsx
<ServicesContent
  title="What We Offer"
  contentData={[{ imgUrl: '...', heading: '...', subheading: '...', description: '...', buttonText: '...', href: '/service' }]}
/>
```

---

### 🏠 `ServicesHomePage.tsx`

**Purpose**: Display homepage-style service tiles with interactive overlays.

**Usage**:

```tsx
<ServicesHomePage />
```

---

### 💼 `OurSkills.tsx`

**Purpose**: Animated grid showcasing team skills with hover effects and motion.

**Features**:

* Hover-triggered animated text and images.
* Custom scroll-aware motion with `framer-motion`.

**Usage**:

```tsx
<OurSkills />
```

---

### 📊 `Stats.tsx`

**Purpose**: Animated stat counters for performance metrics.

**Features**:

* Triggers animation on in-view.
* Optional `suffix`, `decimals`.

**Usage**:

```tsx
<Stats />
```

---

### 📱 `MobileContactForm.tsx`

**Purpose**: Floating mobile chat-style contact button that opens a mini-form.

**Features**:

* Toggle visibility.
* Sends data to Formspree.

**Usage**:

```tsx
<ChatButtonWithForm />
```

---

### 🧭 `Navbar.tsx`

**Purpose**: Responsive navigation bar with glassmorphism, links, buttons, and mobile menu.

**Features**:

* Framer Motion cursor + hover effects
* Desktop and mobile views

**Usage**:

```tsx
<Navbar />
```

---

### 🔁 `ServiceNavigation.tsx`

**Purpose**: Navigation buttons to go to the previous or next service page.

**Props**:

* `previousService`, `nextService`: Objects with `name`, `link`

**Usage**:

```tsx
<ServiceNavigation
  previousService={{ name: "SEO", link: "/seo" }}
  nextService={{ name: "Social Media", link: "/social" }}
/>
```

---

> ⚠️ Don’t forget to update Formspree endpoints before going live.
