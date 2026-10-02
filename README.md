# LUMORA STUDIO — Professional Studio Lighting Equipment & Systems

> **Brand Tagline:** *Shape Light. Create With Precision.*

LUMORA STUDIO is a specialist digital platform for discovering, comparing, planning, and learning about professional studio lighting equipment for photography and cinema.

---

## 🌟 Key Features

1. **Photometric Live Simulator (Hero)**
   - Interactive CCT slider (2700K Warm Tungsten to 6500K Daylight).
   - Stepless dimming output control (0.1% to 100%).
   - Optical beam angle adjustment with dynamic SVG light-falloff rendering.

2. **Multi-Facet Equipment Discovery (`equipment.html`)**
   - Real-time client-side faceted filtering: Category (COB, LED Panels, Strobes, Tubes, Softboxes, Modifiers), Mount Standard (Bowens S-Mount, Junior Pin, Magnetic), Minimum Power Wattage, CRI / TLCI color fidelity, Price range.
   - Dynamic sorting: Recommended, Power, Color Fidelity, Price, Rating.
   - Interactive filter chips with one-click removal.

3. **Technical Specification Experience (`equipment-details.html`)**
   - Interactive photometric output preview.
   - Tabbed architecture: *Overview | Full Specifications | Compatibility | Use Cases*.
   - Dynamic query parameter routing (`?id=lumora-x600-cob`).
   - "Build into Setup" and "Add to Compare" workflow integration.

4. **Side-by-Side Comparison Matrix (`compare.html`)**
   - Compare up to 4 fixtures across 12+ technical photometric parameters.
   - Global floating bottom comparison tray with thumbnail slots and quick drawer.
   - Mobile-responsive horizontal comparison scroll.

5. **Interactive Lighting Setup Builder (`setup-builder.html`)**
   - Parameter-driven studio architecture: Shooting Type, Studio Footprint (Small/Medium/Large), and Contrast Look.
   - Generates 2D overhead top-down floorplan diagrams with positioned key/fill/rim/ambient light nodes and beam vectors.
   - Complete equipment bill of materials with suggested dimming and position settings.
   - LocalStorage bookmarking & print-ready blueprint export.

6. **Editorial Educational Hub (`guides.html` & `guide-details.html`)**
   - Masterclasses on three-point lighting, COB vs LED panels, CRI/TLCI/SSI color fidelity, and modifier physics.
   - Inline equipment reference chips with quick specs.

7. **Personalized Saved Collections (`saved.html`)**
   - Multi-tab collection hub for bookmarked equipment, saved setups, and reading list.
   - Persistent `localStorage` state with live badge counter in navbar.

8. **Frontend Authentication System (`login.html`, `signup.html`, `forgot-password.html`)**
   - Demo credential auto-fill (`director@lumora.studio`).
   - Role and creator discipline profiling.
   - Navbar user profile avatar, account dropdown, and sign-out actions.

9. **Seamless Dark / Light Studio Themes**
   - Instant CSS variable switching with zero flicker.
   - System color scheme detection with `localStorage` persistence.

---

## 📁 File Structure

```text
Studio-Lighting-Equipment/
│
├── index.html                  # Homepage with Interactive Simulator & Highlights
├── equipment.html              # Faceted Equipment Discovery & Filtering
├── equipment-details.html      # Technical Spec Deep-Dive & Photometric View
├── compare.html                # Side-by-Side 4-Product Technical Comparison
├── setup-builder.html          # Interactive 2D Studio Floorplan & Setup Tool
├── guides.html                 # Editorial Learning Hub
├── guide-details.html          # Rich Editorial Masterclass Layout
├── saved.html                  # Saved Collections & Shortlists Hub
├── about.html                  # Brand Philosophy & Optical Standards
├── contact.html                # Consultation Booking & Technical Support
│
├── login.html                  # Studio Sign In Portal
├── signup.html                 # Creator Registration & Preferences
├── forgot-password.html        # Password Recovery Flow
│
├── 404.html                    # Error 404 Page
├── coming-soon.html            # Beta App Teaser
│
├── assets/
│   ├── css/
│   │   ├── style.css           # Tokens, Reset, Typography, Buttons, Forms
│   │   ├── components.css      # Navbar, Cards, Simulator, Compare Tray, Modals
│   │   └── responsive.css      # Breakpoints (320px to 2560px), Drawers, Tables
│   │
│   └── js/
│       ├── data.js             # Master Dataset (16 Equipment, 6 Setups, 6 Guides)
│       ├── theme.js            # Light / Dark Theme System
│       ├── auth.js             # User Session State & Navbar Sync
│       ├── bookmarks.js        # Save / Bookmark System & Toasts
│       ├── compare.js          # Comparison Engine & Floating Tray
│       ├── search.js           # Global ⌘K Search Modal
│       ├── equipment.js        # Filtering, Sorting, & Details View Engine
│       ├── setup-builder.js    # Interactive 2D Canvas & Blueprint Engine
│       └── main.js             # Navigation, Sticky Header, Hero Simulator Inits
│
└── README.md
```

---

## 🚀 Running Locally

To run the platform locally, launch a local web server (such as Python `http.server`, Node `npx serve`, or VS Code Live Server):

```bash
# Using Python:
python -m http.server 8000

# Or using Node.js:
npx serve ./
```

Open `http://localhost:8000` in your web browser.

---

## 📱 Responsive Breakpoint Verification

Tested across viewports:
- **Mobile Devices:** `320×568`, `360×800`, `375×812`, `390×844`, `414×896`, `425×900`
- **Tablets:** `768×1024`, `800×1280`, `1024×1366`
- **Desktops:** `1280×720`, `1440×900`, `1920×1080`, `2560px+`
