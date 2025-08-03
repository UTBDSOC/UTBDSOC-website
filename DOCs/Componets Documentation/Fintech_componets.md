## 🧩 Component Documentation for FINtech Section

📁 **Location**: `website\src\app\components\FINtech components`

This documentation outlines the purpose and usage of each component used in the FINtech section of the UTSBDSOC website.

---

### 🧱 `Accordion.tsx`

**Purpose**: FAQ-style component with collapsible sections and synchronized image updates.

**Features**:

* Animated accordion transitions
* Image updates dynamically based on open section

**Usage**:

```tsx
<AccordionOnly />
```

---

### 🌀 `ApproachSection.tsx`

**Purpose**: Tabbed component to showcase multi-step approaches.

**Props**:

* `steps`: Array of objects `{ step, title, description, imageSrc }`

**Usage**:

```tsx
<ApproachSection steps={stepData} />
```

---

### 📦 `card.tsx`

**Purpose**: Compact info card with image, title, description, and CTA link.

**Props**:

* `imageSrc`, `title`, `description`, `linkText`, `linkUrl`

**Usage**:

```tsx
<Card
  imageSrc="/image.jpg"
  title="Learn More"
  description="Details about the card."
  linkText="Read More"
  linkUrl="/read"
/>
```

---

### 🤝 `contact.tsx`

**Purpose**: Responsive contact form with phone, email, message, and service selection.

**Features**:

* Grid layout for form and contact info
* Interactive radio options and submission button

**Usage**:

```tsx
<Contact />
```

---

### 🪪 `Divider.tsx`

**Purpose**: Thin horizontal line for section breaks.

**Usage**:

```tsx
<Divider />
```

---

### 🧩 `FiltersSection.tsx`

**Purpose**: Sidebar filter UI with checkboxes and date pickers.

**Props**:

* `filtersState`, `setFiltersState`: State and updater for filters

**Usage**:

```tsx
<FiltersSection filtersState={state} setFiltersState={setState} />
```

---

### 🔻 `footer.tsx`

**Purpose**: Multi-column footer with social icons, nav links, and contact info.

**Usage**:

```tsx
<Footer />
```

---

### 🧍 `hero.tsx`

**Purpose**: Hero component with left-aligned text and right-side image.

**Props**:

* `title`, `subtitle`, `description`, `primaryButtonText`, `primaryButtonLink`, `secondaryButtonText`, `secondaryButtonLink`, `imageSrc`

**Usage**:

```tsx
<Hero
  title="Welcome"
  subtitle="Grow with us"
  description="Learn more about our solutions"
  primaryButtonText="Start"
  primaryButtonLink="/start"
  secondaryButtonText="Details"
  secondaryButtonLink="/details"
  imageSrc="/hero-image.jpg"
/>
```

---

### 🏁 `Herobanner.tsx`

**Purpose**: Centered hero banner with large headline and dual CTA buttons.

**Props**:

* `title`, `description`, `primaryButtonText`, `primaryButtonAction`, `secondaryButtonText`, `secondaryButtonAction`

**Usage**:

```tsx
<Banner
  title="Your Future Starts Here"
  description="Join us to unlock new potential."
  primaryButtonText="Join Now"
  primaryButtonAction={handleJoin}
  secondaryButtonText="Learn More"
  secondaryButtonAction={handleLearn}
/>
```

---

### 🧭 `navbar.tsx`

**Purpose**: Responsive and animated navigation bar with desktop and mobile modes.

**Features**:

* Hover-triggered flyout menus
* Mobile drawer with foldable submenus

**Usage**:

```tsx
<FlyoutNav />
```

---

### 📥 `SmoothDropdown.tsx`

**Purpose**: A collapsible section toggle with animated dropdown using framer-motion.

**Props**:

* `title`, `children`, `defaultOpen?`

**Usage**:

```tsx
<SmoothDropdown title="FAQs">Answer content here</SmoothDropdown>
```

---

### 📊 `Stat.tsx`

**Purpose**: Animated counter section to show numeric performance statistics.

**Props**:

* `stats: { num, suffix?, decimals?, subheading }[]`

**Usage**:

```tsx
<Stats stats={[{ num: 1000, suffix: "+", subheading: "Students Trained" }]} />
```

---

### 💬 `Testimonials.tsx`

**Purpose**: Horizontally scrolling testimonials with looping animation.

**Features**:

* Three layers of testimonial sliders
* Reversible and variable-speed motion

**Usage**:

```tsx
<Testimonials />
```

---

### 🔢 `Pagination.tsx`

**Purpose**: Interactive pagination component for list-based UIs.

**Props**:

* `currentPage`, `totalPages`, `onPageChange`

**Usage**:

```tsx
<Pagination currentPage={1} totalPages={5} onPageChange={(page) => setPage(page)} />
```

---

### 🧮 `ServicesSection.tsx`

**Purpose**: Flex-based section with text + image layout and feature bullet points.

**Props**:

* `title`, `description`, `items[]`, `imageSrc`, `reverse?`

**Usage**:

```tsx
<ServicesSection
  title="Our Expertise"
  description="We cover a range of services."
  items={["Custom Training", "24/7 Support"]}
  imageSrc="/services.jpg"
/>
```

---

### 🗂️ `TopicAreas.tsx`

**Purpose**: Tabbed carousel of categorized learning topics with arrow controls.

**Features**:

* Uses `framer-motion` + `react-use-measure`
* Each tab has multiple cards scrollable with arrows

**Usage**:

```tsx
<TopicAreas />
```

---

> ✅ More FINtech components can be added below as needed.
