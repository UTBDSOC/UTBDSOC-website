## 🧩 Component Documentation for MQTECHSOC Website

📁 **Location**: `website\src\app\components\MQTECHSOC`

This document provides usage explanations for each component used in the MQTECHSOC section of the UTSBDSOC website. Each component is documented with its purpose, props (if applicable), features, and usage examples.

---

### 🌀 `DragCards.tsx`

**Purpose**: Interactive draggable image stack with parallax layout.

**Features**:

* Dragging functionality with `framer-motion`
* Z-index updates on click to bring card to front
* Configurable layout via props like `top`, `left`, `rotate`

**Usage**:

```tsx
<DragCards />
```

Use as a creative visual break or showcase section.

---

### 👋 `Hero.tsx`

**Purpose**: Hero banner with animated text cycle for audiences (e.g. Students, Alumni).

**Features**:

* Grid background for tech look
* AnimatedText cycling phrases
* Call-to-action buttons ("Events" and "Membership")

**Usage**:

```tsx
<Hero />
```

Include at the top of the landing page.

---

### 🔗 `Navbar.tsx`

**Purpose**: Fixed transparent header with navigation links and social icons.

**Features**:

* Links to all site sections: Home, Events, About Us, Team, etc.
* External links to Discord, GitHub, YouTube, etc.
* Membership call-to-action button

**Usage**:

```tsx
<Navbar />
```

Place at the top of the layout file for consistent navigation.

---

### 📣 `aboutSection.tsx`

**Purpose**: Informative about section with decorative heading and divider.

**Features**:

* Large heading and descriptive paragraph
* Horizontal bar to highlight core statement

**Usage**:

```tsx
<AboutSection />
```

Typically used on the About Us page or as a mid-scroll section on the homepage.

---

> ✅ Add more MQTECHSOC components here as development continues.
