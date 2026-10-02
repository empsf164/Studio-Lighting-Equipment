/**
 * LUMORA STUDIO — MASTER DATASET
 * Rich catalog of professional studio lighting equipment, setups, and editorial guides.
 */

window.LUMORA_DATA = {
  // --------------------------------------------------------------------------
  // EQUIPMENT CATALOG
  // --------------------------------------------------------------------------
  equipment: [
    {
      id: "lumora-x600-cob",
      name: "Lumora X600 Pro Cinema Bi-Color COB Studio Monolight",
      category: "COB Lights",
      type: "cob",
      power: "600W",
      powerNum: 600,
      cct: "2700K – 6500K",
      cctMin: 2700,
      cctMax: 6500,
      cri: "97+",
      criNum: 97,
      tlci: "98+",
      tlciNum: 98,
      lux: "82,400 Lux @ 1m (with Hyper Reflector)",
      luxNum: 82400,
      mount: "Bowens S-Mount",
      wireless: "CRMX, Bluetooth 5.0, Lumora Mesh App, DMX512",
      powerSource: "AC 100-240V / Dual V-Mount Battery",
      dimming: "0.1% – 100% Stepless (Linear, Log, Exp, S-Curve)",
      beamAngle: "55° Standard / 15°-45° with Fresnel",
      weight: "4.8 kg (Lamp Head) / 3.6 kg (Control Box)",
      dimensions: "320 × 240 × 180 mm",
      price: 1499,
      rating: 4.9,
      reviewCount: 42,
      useCases: ["Commercial Video", "Studio Portrait", "Narrative Film", "Virtual Production"],
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Flagship continuous point-source COB light delivering ultra-pure color rendering and massive punch for cinema-grade key lighting and heavy light modification.",
      featured: true,
      specs: {
        cooling: "Ultra-quiet active liquid-vapor heat pipe (<26dB)",
        effects: "9 Built-in FX (Paparazzi, Fireworks, Faulty Bulb, Lightning, TV, Pulse, Strobe, Explosion, Fire)",
        firmware: "OTA upgradeable via Lumora Link",
        weatherproofing: "IP54 Weather-resistant sealed casing"
      },
      compatibleModifiers: [
        "lumora-softbox-pro-90",
        "lumora-fresnel-f10",
        "lumora-lantern-65",
        "lumora-spotlight-mount"
      ]
    },
    {
      id: "lumora-beam-300",
      name: "Lumora Beam 300 Daylight Point-Source LED",
      category: "COB Lights",
      type: "cob",
      power: "300W",
      powerNum: 300,
      cct: "5600K Daylight",
      cctMin: 5600,
      cctMax: 5600,
      cri: "96+",
      criNum: 96,
      tlci: "97+",
      tlciNum: 97,
      lux: "48,000 Lux @ 1m (with Standard Reflector)",
      luxNum: 48000,
      mount: "Bowens S-Mount",
      wireless: "2.4GHz Wireless Remote & Smartphone App",
      powerSource: "AC 100-240V / Single V-Mount",
      dimming: "0% – 100%",
      beamAngle: "55°",
      weight: "2.9 kg",
      dimensions: "280 × 190 × 140 mm",
      price: 699,
      rating: 4.8,
      reviewCount: 68,
      useCases: ["YouTube Studio", "Interview", "Commercial Photography", "E-Commerce"],
      image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Compact 300W powerhouse daylight balanced light designed for agile solo creators, small studios, and crisp editorial portraiture.",
      featured: true,
      specs: {
        cooling: "Silent smart fan system",
        effects: "8 Built-in Lighting FX",
        firmware: "USB-C update port",
        weatherproofing: "Standard studio chassis"
      },
      compatibleModifiers: [
        "lumora-softbox-pro-90",
        "lumora-lantern-65",
        "lumora-reflector-5in1"
      ]
    },
    {
      id: "lumora-studio-pro-1200",
      name: "Lumora Studio Pro 1200W HMI-Equivalent",
      category: "COB Lights",
      type: "cob",
      power: "1200W",
      powerNum: 1200,
      cct: "2500K – 10000K Full RGBWW",
      cctMin: 2500,
      cctMax: 10000,
      cri: "98+",
      criNum: 98,
      tlci: "99+",
      tlciNum: 99,
      lux: "114,000 Lux @ 1m (with Narrow Reflector)",
      luxNum: 114000,
      mount: "Bowens S-Mount & Junior Pin 28mm",
      wireless: "Wireless DMX, LumenRadio CRMX, Ethernet Art-Net, App",
      powerSource: "AC 100-240V / High-Draw Dual 26V Battery",
      dimming: "0% – 100% 16-bit DMX Precision",
      beamAngle: "45° Native / Focusable",
      weight: "8.9 kg (Head) / 6.2 kg (Ballast)",
      dimensions: "440 × 310 × 260 mm",
      price: 3290,
      rating: 5.0,
      reviewCount: 19,
      useCases: ["Sound Stages", "Feature Films", "Large Commercial Studios", "Sunlight Simulation"],
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Industrial-grade 1200W daylight & RGB fixture capable of cutting through direct sun or lighting massive studio scrims with cinematic purity.",
      featured: true,
      specs: {
        cooling: "Dual liquid vortex cooling",
        effects: "Full RGB Spectrum + 15 Studio effects + Gel presets",
        firmware: "Ethernet / USB-C / Lumora Cloud sync",
        weatherproofing: "IP65 Weatherproof certified"
      },
      compatibleModifiers: [
        "lumora-fresnel-f10",
        "lumora-softbox-pro-90",
        "lumora-c-stand-pro"
      ]
    },
    {
      id: "lumora-flex-panel-60",
      name: "Lumora FlexPanel 60 Ultra-Thin Mat LED",
      category: "LED Lights",
      type: "led",
      power: "100W",
      powerNum: 100,
      cct: "2800K – 6500K Bi-Color",
      cctMin: 2800,
      cctMax: 6500,
      cri: "98+",
      criNum: 98,
      tlci: "98+",
      tlciNum: 98,
      lux: "8,900 Lux @ 1m",
      luxNum: 8900,
      mount: "Magnetic Backing, 1/4\"-20 & X-Bracket",
      wireless: "Lumora Wireless Mesh App",
      powerSource: "AC Adapter & NP-F / V-Mount battery plate",
      dimming: "0% – 100% Flicker-Free",
      beamAngle: "120° Wide Flood",
      weight: "450 g (Mat)",
      dimensions: "600 × 300 × 5 mm",
      price: 449,
      rating: 4.7,
      reviewCount: 35,
      useCases: ["Tight Spaces", "Car Interior Lighting", "Product Fill Light", "Interviews"],
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Pliable, paper-thin LED sheet designed to be taped, strapped, or magnetically mounted in hard-to-reach shooting locations.",
      featured: false,
      specs: {
        cooling: "Passive silent heat dissipation",
        effects: "6 Cinematic effects",
        firmware: "Wireless App updates",
        weatherproofing: "Water-resistant flexible silicone exterior"
      },
      compatibleModifiers: [
        "lumora-reflector-5in1"
      ]
    },
    {
      id: "lumora-strobe-800",
      name: "Lumora Strobe 800 TTL Studio Monolight",
      category: "Strobes",
      type: "strobe",
      power: "800Ws",
      powerNum: 800,
      cct: "5600K (±75K Color Stability)",
      cctMin: 5600,
      cctMax: 5600,
      cri: "96+ (Modeling Lamp)",
      criNum: 96,
      tlci: "97+",
      tlciNum: 97,
      lux: "GN 92 (ISO 100, standard reflector)",
      luxNum: 92000,
      mount: "Bowens S-Mount",
      wireless: "Built-in 2.4G High-Speed Sync (1/8000s) & TTL",
      powerSource: "Lithium Battery Pack (450 Full-Power Flashes)",
      dimming: "1/1 to 1/256 Power Control (9 stops)",
      beamAngle: "Variable with modifier",
      weight: "3.2 kg (with battery)",
      dimensions: "260 × 170 × 130 mm",
      price: 899,
      rating: 4.9,
      reviewCount: 54,
      useCases: ["Editorial Fashion", "Commercial Portrait", "Action Photography", "Outdoor Location"],
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
      ],
      description: "High-speed battery powered flash monolight with TTL auto-exposure, 0.01-0.9s recycling time, and ultra-consistent color temperature.",
      featured: true,
      specs: {
        recycleTime: "0.01 to 0.9 seconds",
        flashDuration: "1/220 to 1/10,100s in Freeze Mode",
        modelingLamp: "40W Bi-color LED proportional / fixed",
        wirelessRange: "100m radio transmission"
      },
      compatibleModifiers: [
        "lumora-softbox-pro-90",
        "lumora-optical-snoot",
        "lumora-reflector-5in1"
      ]
    },
    {
      id: "lumora-rgb-tube-kit",
      name: "Lumora Tube T4 Quad Pixel Kit (4x 4ft)",
      category: "Continuous Lighting",
      type: "continuous",
      power: "200W Kit Total (50W per tube)",
      powerNum: 200,
      cct: "2000K – 10000K Full RGBWW + Pixel Mapping",
      cctMin: 2000,
      cctMax: 10000,
      cri: "97+",
      criNum: 97,
      tlci: "98+",
      tlciNum: 98,
      lux: "3,200 Lux @ 1m per tube",
      luxNum: 3200,
      mount: "1/4\"-20 Mounts, Magnetic Clips, Floor Stands",
      wireless: "CRMX Wireless DMX, Bluetooth Mesh, App Control",
      powerSource: "Internal Lithium Battery (180 min full load) & Multi-Charger Case",
      dimming: "0% – 100% Ultra-Smooth",
      beamAngle: "180° Omnidirectional Diffused Tube",
      weight: "1.4 kg per tube / 9.8 kg Flight Case Kit",
      dimensions: "1200 mm length × 42 mm diameter",
      price: 1199,
      rating: 4.9,
      reviewCount: 31,
      useCases: ["Music Videos", "Cinematic Rim Lighting", "Practical Background Lights", "Creative Portraits"],
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Set of four 4-foot wireless pixel tubes featuring individually addressable LED zones, rugged waterproof casings, and dedicated rolling road case.",
      featured: true,
      specs: {
        pixels: "16 Individually Controllable Pixel Zones per tube",
        batteryLife: "Up to 20 hours at low intensity",
        casing: "Aviation aluminum + polycarbonate shock-resistant shell",
        ipRating: "IP65 Weatherproof"
      },
      compatibleModifiers: [
        "lumora-c-stand-pro"
      ]
    },
    {
      id: "lumora-softbox-pro-90",
      name: "Lumora OctaDome 90 Quick-Setup Softbox",
      category: "Softboxes",
      type: "modifier",
      power: "Passive Modifier",
      powerNum: 0,
      cct: "Neutral Light Dispersion",
      cctMin: 0,
      cctMax: 0,
      cri: "Neutral 100%",
      criNum: 100,
      tlci: "100%",
      tlciNum: 100,
      lux: "Softens and wraps hard point sources",
      luxNum: 0,
      mount: "Bowens S-Mount",
      wireless: "N/A",
      powerSource: "Passive",
      dimming: "N/A",
      beamAngle: "Diffusion Spread",
      weight: "1.6 kg",
      dimensions: "900 mm Diameter × 550 mm Depth",
      price: 189,
      rating: 4.8,
      reviewCount: 92,
      useCases: ["Beauty Lighting", "Key Light for Portraits", "Wrap-around Fill", "Interviews"],
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Parabolic 16-sided deep octagonal softbox with quick-umbrella release mechanism, inner baffle, front diffuser, and 40° fabric honeycomb grid.",
      featured: false,
      specs: {
        shape: "16-Sided Deep Octagonal Parabolic",
        included: "Internal baffle, 1.5-stop front diffuser, 40° eggcrate grid, carry bag",
        heatTolerance: "Rated up to 800W continuous halogen/COB"
      },
      compatibleModifiers: []
    },
    {
      id: "lumora-lantern-65",
      name: "Lumora OmniLantern 65 Spherical Softbox",
      category: "Softboxes",
      type: "modifier",
      power: "Passive Modifier",
      powerNum: 0,
      cct: "Neutral",
      cctMin: 0,
      cctMax: 0,
      cri: "Neutral",
      criNum: 100,
      tlci: "Neutral",
      tlciNum: 100,
      lux: "360° Omnidirectional Light",
      luxNum: 0,
      mount: "Bowens S-Mount",
      wireless: "N/A",
      powerSource: "Passive",
      dimming: "N/A",
      beamAngle: "270° Spherical Diffusion",
      weight: "1.1 kg",
      dimensions: "650 mm Diameter Sphere",
      price: 129,
      rating: 4.7,
      reviewCount: 47,
      useCases: ["Overhead Ambient Light", "Group Interviews", "Walk-and-Talk Scenes", "Soft Room Fill"],
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Spherical globe lantern diffuser that casts soft, shadowless light in all directions. Sets up in under 3 seconds with a single push-down ring.",
      featured: false,
      specs: {
        shape: "Spherical China Ball style with durable fiberglass ribs",
        included: "Detachable 4-section light control skirt",
        speedring: "Bowens S-Mount Quick Release"
      },
      compatibleModifiers: []
    },
    {
      id: "lumora-fresnel-f10",
      name: "Lumora Precision F10 Glass Fresnel Lens",
      category: "Light Modifiers",
      type: "modifier",
      power: "Passive Optical Amplifier",
      powerNum: 0,
      cct: "Neutral",
      cctMin: 0,
      cctMax: 0,
      cri: "Neutral",
      criNum: 100,
      tlci: "Neutral",
      tlciNum: 100,
      lux: "Magnifies beam intensity up to 400%",
      luxNum: 0,
      mount: "Bowens S-Mount",
      wireless: "N/A",
      powerSource: "Passive",
      dimming: "N/A",
      beamAngle: "15° Spot to 45° Flood (Helicoid Twist)",
      weight: "3.8 kg",
      dimensions: "300 mm Diameter × 240 mm Depth",
      price: 269,
      rating: 4.9,
      reviewCount: 38,
      useCases: ["Sunlight Beams", "Dramatic Hard Light", "Long Throw Illumination", "Cinematography"],
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80"
      ],
      description: "True 10-inch optical grade glass Fresnel modifier with dual-lens condenser design, magnifying COB output into a punchy cinematic spot or flood.",
      featured: false,
      specs: {
        lensDiameter: "254 mm (10-inch) High-transmission borosilicate glass",
        beamControl: "Twist-barrel smooth helicoid adjustment",
        compatibility: "Engineered for 300W–1200W high-output point sources"
      },
      compatibleModifiers: []
    },
    {
      id: "lumora-panel-1x1-rgb",
      name: "Lumora Horizon 1x1 RGBWW Studio Panel",
      category: "LED Lights",
      type: "led",
      power: "150W",
      powerNum: 150,
      cct: "2000K – 10000K CCT + Full HSI/RGB",
      cctMin: 2000,
      cctMax: 10000,
      cri: "97+",
      criNum: 97,
      tlci: "98+",
      tlciNum: 98,
      lux: "14,500 Lux @ 1m (5600K)",
      luxNum: 14500,
      mount: "Baby 5/8\" & Junior 1-1/8\" Combo Pin",
      wireless: "DMX512, RDM, ArtNet, Bluetooth App",
      powerSource: "AC 100-240V / 14.8V V-Mount Battery",
      dimming: "0% – 100% Stepless",
      beamAngle: "45° Native / 95° Soft Diffuser",
      weight: "3.7 kg",
      dimensions: "350 × 350 × 65 mm",
      price: 749,
      rating: 4.8,
      reviewCount: 41,
      useCases: ["Broadcast Studio", "Corporate Interviews", "Live Streaming", "Green Screen"],
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Rugged all-aluminum 1x1 LED studio panel with integrated 4-leaf barndoors, built-in gel libraries, and studio-grade color science.",
      featured: false,
      specs: {
        chassis: "Die-cast aircraft grade aluminum",
        colorModes: "CCT, HSI, RGB, Gel Presets (300+ Rosco/Lee), FX",
        dmxProfiles: "8 DMX channel modes with 8-bit and 16-bit mapping"
      },
      compatibleModifiers: [
        "lumora-c-stand-pro"
      ]
    },
    {
      id: "lumora-spotlight-mount",
      name: "Lumora Precision Spotlight Mount with 19° Optics",
      category: "Light Modifiers",
      type: "modifier",
      power: "Optical Projector",
      powerNum: 0,
      cct: "Neutral High Precision",
      cctMin: 0,
      cctMax: 0,
      cri: "100%",
      criNum: 100,
      tlci: "100%",
      tlciNum: 100,
      lux: "Sharp Edge Projection",
      luxNum: 0,
      mount: "Bowens S-Mount",
      wireless: "N/A",
      powerSource: "Passive",
      dimming: "N/A",
      beamAngle: "19° Razor Sharp Cut",
      weight: "4.5 kg",
      dimensions: "380 × 220 × 220 mm",
      price: 499,
      rating: 4.9,
      reviewCount: 29,
      useCases: ["Background Gobo Patterns", "Precision Product Cuts", "Dramatic Portrait Slices", "Theatrical Lighting"],
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Studio gobo projector lens with internal 4-leaf framing shutters, iris slot, and drop-in B-size gobo holder for razor-sharp geometric light shaping.",
      featured: false,
      specs: {
        optics: "Multi-coated high resolution precision glass element",
        shutters: "4 Built-in stainless steel framing leaves",
        included: "16 Metal Gobos, Gobo holder, Gel frame, Custom hard flight case"
      },
      compatibleModifiers: []
    },
    {
      id: "lumora-c-stand-pro",
      name: "Lumora Heavy-Duty 40\" Stainless C-Stand Kit",
      category: "Lighting Accessories",
      type: "accessory",
      power: "Support Gear",
      powerNum: 0,
      cct: "N/A",
      cctMin: 0,
      cctMax: 0,
      cri: "N/A",
      criNum: 0,
      tlci: "N/A",
      tlciNum: 0,
      lux: "Load Capacity: 25 kg",
      luxNum: 0,
      mount: "Baby 5/8\" & Turtle Base",
      wireless: "N/A",
      powerSource: "N/A",
      dimming: "N/A",
      beamAngle: "N/A",
      weight: "8.5 kg",
      dimensions: "Max Height: 328 cm (10.7 ft) / Folded: 130 cm",
      price: 199,
      rating: 4.9,
      reviewCount: 114,
      useCases: ["Heavy Modifier Rigging", "Overhead Boom Arms", "Flag & Scrim Support"],
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Professional chrome-finished stainless steel 40-inch century stand with detachable turtle base, 40\" grip arm, and dual 2.5\" grip heads.",
      featured: false,
      specs: {
        material: "100% 304 Stainless Steel with knurled lock collars",
        gripArm: "40-inch solid steel rod with 5/8\" and 3/8\" ends",
        base: "Spring-loaded turtle base for fast nesting and sandbag stability"
      },
      compatibleModifiers: []
    },
    {
      id: "lumora-reflector-5in1",
      name: "Lumora Collapsible 43\" 5-in-1 Oval Studio Reflector",
      category: "Reflectors",
      type: "reflector",
      power: "Passive Modifier",
      powerNum: 0,
      cct: "Silver / Gold / White / Black / Diffuser",
      cctMin: 0,
      cctMax: 0,
      cri: "100%",
      criNum: 100,
      tlci: "100%",
      tlciNum: 100,
      lux: "Reflective modifier",
      luxNum: 0,
      mount: "Handheld or Clamp Mount",
      wireless: "N/A",
      powerSource: "N/A",
      dimming: "N/A",
      beamAngle: "N/A",
      weight: "850 g",
      dimensions: "110 × 80 cm Oval (Folds to 40 cm)",
      price: 49,
      rating: 4.8,
      reviewCount: 88,
      useCases: ["Outdoor Fill", "Clamshell Beauty Lighting", "Negative Fill", "Diffusion Scrim"],
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Multi-surface collapsible reflector with dual ergonomic rubber grips, reversible zippered sleeve, and heavy-duty steel spring frame.",
      featured: false,
      specs: {
        surfaces: "Translucent 1-stop diffuser, Bright Silver, Warm Gold, Soft White, Negative Black",
        handles: "Dual molded silicone comfort grips with 1/4\"-20 receiver threads",
        durability: "Double-stitched tear-resistant reflective fabric"
      },
      compatibleModifiers: []
    },
    {
      id: "lumora-optical-snoot",
      name: "Lumora EF-Mount Optical Snoot with 16 Gobos",
      category: "Light Modifiers",
      type: "modifier",
      power: "Passive Optical Element",
      powerNum: 0,
      cct: "Neutral",
      cctMin: 0,
      cctMax: 0,
      cri: "100%",
      criNum: 100,
      tlci: "100%",
      tlciNum: 100,
      lux: "Sharp Beam Focus",
      luxNum: 0,
      mount: "Bowens S-Mount + EF Lens Mount",
      wireless: "N/A",
      powerSource: "N/A",
      dimming: "N/A",
      beamAngle: "Variable based on EF Lens attached",
      weight: "1.4 kg",
      dimensions: "210 × 140 × 140 mm",
      price: 219,
      rating: 4.8,
      reviewCount: 33,
      useCases: ["Fashion Slices", "Window Shadow Simulation", "Creative Gel Effects", "Product Accents"],
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Compact optical condenser snoot accepting standard Canon EF mount photography lenses for ultra-crisp pattern projection and color gel blending.",
      featured: false,
      specs: {
        lensCompatibility: "Canon EF / EF-S Mount Lenses (50mm / 85mm recommended)",
        goboSize: "Standard 66mm Gobos (16 patterns included)",
        gelKit: "Includes 6 color correction and creative effect magnetic gel frames"
      },
      compatibleModifiers: []
    }
  ],

  // --------------------------------------------------------------------------
  // LIGHTING SETUPS (FOR SETUP EXPLORER & BUILDER)
  // --------------------------------------------------------------------------
  setups: [
    {
      id: "cinematic-interview",
      title: "Cinematic Narrative Interview Setup",
      category: "Interview",
      difficulty: "Intermediate",
      equipmentCount: 4,
      shootingType: "Interview",
      studioSize: "Medium",
      desiredLook: "Cinematic",
      purpose: "Rich, moody lighting with deep shadows and soft skin falloff for high-end documentary interviews.",
      description: "Uses a large key light diffused through a 90cm softbox positioned at 45 degrees, accompanied by an edge rim light to separate the subject from a dark backdrop.",
      keyLight: {
        role: "Key Light",
        item: "Lumora X600 Bi-Color COB Monolight",
        modifier: "Lumora OctaDome 90 Softbox with 40° Grid",
        power: "45% Power @ 4300K",
        position: "Front-Right 45°, 2.1m height, 1.5m from subject"
      },
      fillLight: {
        role: "Fill Light",
        item: "Lumora Collapsible 5-in-1 Reflector",
        modifier: "Soft White Surface",
        power: "Passive 1:4 Contrast Ratio",
        position: "Front-Left 50°, chest height"
      },
      rimLight: {
        role: "Rim / Hair Light",
        item: "Lumora Tube T4 RGB Pixel Kit",
        modifier: "Integrated Diffuser",
        power: "20% Intensity @ 5600K",
        position: "Back-Right 135°, 2.4m height pointing down"
      },
      backgroundLight: {
        role: "Practical / Ambient",
        item: "Lumora Beam 300 Daylight Point-Source",
        modifier: "Spotlight Mount with Window Venetian Gobo",
        power: "15% Power @ 5600K",
        position: "Slanted against background wall"
      },
      diagram: {
        subject: { x: 50, y: 55 },
        lights: [
          { name: "Key Light (X600)", x: 75, y: 70, angle: 225, color: "#f59e0b" },
          { name: "Fill Reflector", x: 25, y: 65, angle: 315, color: "#9ca3af" },
          { name: "Rim Light (Tube T4)", x: 70, y: 25, angle: 45, color: "#3b82f6" },
          { name: "Background Gobo", x: 20, y: 20, angle: 135, color: "#f59e0b" }
        ]
      }
    },
    {
      id: "classic-three-point",
      title: "Classic Three-Point Studio Portrait",
      category: "Portrait",
      difficulty: "Beginner",
      equipmentCount: 3,
      shootingType: "Portrait",
      studioSize: "Small",
      desiredLook: "Soft",
      purpose: "The foundational studio portrait lighting setup providing balanced illumination and flattering catchlights.",
      description: "A standard setup featuring a soft key light, a gentle fill to open shadows, and a dedicated hair light for head separation.",
      keyLight: {
        role: "Key Light",
        item: "Lumora Beam 300 Daylight Point-Source",
        modifier: "Lumora OctaDome 90 Softbox",
        power: "60% Power @ 5600K",
        position: "Front-Right 30°, 2.0m height"
      },
      fillLight: {
        role: "Fill Light",
        item: "Lumora FlexPanel 60 Ultra-Thin Mat LED",
        modifier: "Built-in Diffusion",
        power: "25% Power @ 5600K (1:2 Ratio)",
        position: "Front-Left 30°, eye height"
      },
      rimLight: {
        role: "Hair Light",
        item: "Lumora Horizon 1x1 RGBWW Studio Panel",
        modifier: "Honeycomb Grid",
        power: "30% Power @ 5600K",
        position: "Directly behind subject, 2.3m height angled forward"
      },
      backgroundLight: null,
      diagram: {
        subject: { x: 50, y: 50 },
        lights: [
          { name: "Key Light", x: 70, y: 75, angle: 220, color: "#f59e0b" },
          { name: "Fill Panel", x: 30, y: 75, angle: 320, color: "#9ca3af" },
          { name: "Hair Light", x: 50, y: 20, angle: 0, color: "#f59e0b" }
        ]
      }
    },
    {
      id: "high-contrast-fashion",
      title: "High-Contrast Editorial Fashion Setup",
      category: "Fashion",
      difficulty: "Advanced",
      equipmentCount: 4,
      shootingType: "Fashion",
      studioSize: "Large",
      desiredLook: "High Contrast",
      purpose: "Bold, sculpted, high-energy lighting with sharp falloff and punchy spectral highlights for high fashion and apparel.",
      description: "Combines a focused high-powered strobe with a hard optical snoot or beauty dish, paired with negative fill to absorb light bounce.",
      keyLight: {
        role: "Key Light",
        item: "Lumora Strobe 800 TTL Studio Monolight",
        modifier: "Precision Optical Snoot with Sharp Slice",
        power: "1/4 Power Flash, High-Speed Sync 1/1600s",
        position: "Front-Left 35°, 2.5m height angled 45° downward"
      },
      fillLight: {
        role: "Negative Fill",
        item: "Lumora Collapsible 5-in-1 Reflector",
        modifier: "Solid Black Absorption Surface",
        power: "Zero Bounce Absorption",
        position: "Opposite key light, 1m from subject"
      },
      rimLight: {
        role: "Dual Kicker Rim Lights",
        item: "Lumora Tube T4 Quad Pixel Kit",
        modifier: "2x 4ft Tubes",
        power: "100% Brightness @ 6000K",
        position: "Flanking left and right behind subject at 150°"
      },
      backgroundLight: {
        role: "Cyclorama Edge Light",
        item: "Lumora X600 Bi-Color COB Monolight",
        modifier: "Lumora Precision F10 Glass Fresnel",
        power: "35% Power with Spot 15°",
        position: "Floor level casting gradient across white cyc"
      },
      diagram: {
        subject: { x: 50, y: 50 },
        lights: [
          { name: "Hard Key Strobe", x: 30, y: 75, angle: 310, color: "#f59e0b" },
          { name: "Negative Fill Board", x: 75, y: 60, angle: 220, color: "#374151" },
          { name: "Left Rim Tube", x: 25, y: 30, angle: 30, color: "#3b82f6" },
          { name: "Right Rim Tube", x: 75, y: 30, angle: 330, color: "#3b82f6" }
        ]
      }
    },
    {
      id: "clean-commercial-product",
      title: "Clean Commercial Product & Packaging Lighting",
      category: "Product",
      difficulty: "Intermediate",
      equipmentCount: 3,
      shootingType: "Product",
      studioSize: "Small",
      desiredLook: "Clean Commercial",
      purpose: "Ultra-clean, glare-free reflections and seamless gradient sweeps on glass, bottles, cosmetics, and luxury goods.",
      description: "Uses a large overhead soft light to create continuous top highlights, flanked by side diffusion scrims for edge definition.",
      keyLight: {
        role: "Top Overhead Key",
        item: "Lumora Horizon 1x1 RGBWW Studio Panel",
        modifier: "Diffusion Scrim Sheet",
        power: "50% Power @ 5600K CRI 98",
        position: "Directly above shooting table, suspended on C-Stand boom"
      },
      fillLight: {
        role: "Dual Side Scrim Fill",
        item: "Lumora FlexPanel 60 Ultra-Thin Mat LED",
        modifier: "Custom diffusion flags",
        power: "30% Power @ 5600K",
        position: "Left and right at 90° to product"
      },
      rimLight: null,
      backgroundLight: {
        role: "Seamless Sweep Light",
        item: "Lumora Beam 300 Daylight Point-Source",
        modifier: "Standard 55° Reflector with Grid",
        power: "20% Power",
        position: "Under sweep table aimed at backdrop"
      },
      diagram: {
        subject: { x: 50, y: 50 },
        lights: [
          { name: "Overhead Top Panel", x: 50, y: 40, angle: 90, color: "#f59e0b" },
          { name: "Left Scrim Panel", x: 20, y: 50, angle: 0, color: "#9ca3af" },
          { name: "Right Scrim Panel", x: 80, y: 50, angle: 180, color: "#9ca3af" }
        ]
      }
    },
    {
      id: "youtube-creator-studio",
      title: "Modern YouTube & Streaming Studio",
      category: "YouTube",
      difficulty: "Beginner",
      equipmentCount: 3,
      shootingType: "YouTube",
      studioSize: "Medium",
      desiredLook: "Natural",
      purpose: "Vibrant, low-maintenance lighting setup optimized for consistent face illumination and colored background accents.",
      description: "Combines a single large China-ball / lantern soft key with dual RGB pixel tubes in the background for dynamic studio depth.",
      keyLight: {
        role: "Key Light",
        item: "Lumora Beam 300 Daylight Point-Source",
        modifier: "Lumora OmniLantern 65 Spherical Softbox",
        power: "35% Power @ 5600K",
        position: "Directly above desk / camera, 45° angle downward"
      },
      fillLight: {
        role: "Ambient Room Fill",
        item: "Lumora FlexPanel 60 Ultra-Thin Mat LED",
        modifier: "Diffuser Baffle",
        power: "15% Power",
        position: "Ceiling bounce"
      },
      rimLight: null,
      backgroundLight: {
        role: "RGB Accent Tubes",
        item: "Lumora Tube T4 Quad Pixel Kit",
        modifier: "Raw Tube Diffusers",
        power: "40% Saturated Amber / Teal Gradient",
        position: "Mounted on background acoustic wall slats"
      },
      diagram: {
        subject: { x: 50, y: 60 },
        lights: [
          { name: "Lantern Key (Beam 300)", x: 50, y: 80, angle: 270, color: "#f59e0b" },
          { name: "Left Accent Tube", x: 25, y: 20, angle: 90, color: "#f59e0b" },
          { name: "Right Accent Tube", x: 75, y: 20, angle: 90, color: "#3b82f6" }
        ]
      }
    },
    {
      id: "cinematic-volumetric-drama",
      title: "Cinematic Volumetric Fog & Beam Setup",
      category: "Cinematic",
      difficulty: "Advanced",
      equipmentCount: 4,
      shootingType: "Cinematic",
      studioSize: "Large",
      desiredLook: "Dramatic",
      purpose: "Stunning shafts of volumetric light cutting through studio haze to create epic theatrical or narrative frames.",
      description: "Anchored by the massive Studio Pro 1200W through an F10 glass Fresnel lens blasting through studio atmosphere.",
      keyLight: {
        role: "Backlight Beam",
        item: "Lumora Studio Pro 1200W HMI-Equivalent",
        modifier: "Lumora Precision F10 Glass Fresnel Lens (15° Spot)",
        power: "75% Output @ 5600K",
        position: "High upstage left, 3.5m height aiming down toward subject"
      },
      fillLight: {
        role: "Subtle Eye Light Fill",
        item: "Lumora FlexPanel 60 Ultra-Thin Mat LED",
        modifier: "Double Diffusion",
        power: "8% Gentle Fill @ 4000K",
        position: "Directly under camera axis"
      },
      rimLight: {
        role: "Front Rim Sculpt",
        item: "Lumora X600 Bi-Color COB Monolight",
        modifier: "Spotlight Mount with 19° Optics",
        power: "30% Power",
        position: "Front-Right 60°"
      },
      backgroundLight: null,
      diagram: {
        subject: { x: 50, y: 50 },
        lights: [
          { name: "1200W Fresnel Sun Beam", x: 25, y: 20, angle: 45, color: "#f59e0b" },
          { name: "Under-Lens Eye Fill", x: 50, y: 85, angle: 270, color: "#9ca3af" },
          { name: "Spotlight Slicer", x: 80, y: 70, angle: 215, color: "#f59e0b" }
        ]
      }
    }
  ],

  // --------------------------------------------------------------------------
  // EDITORIAL GUIDES
  // --------------------------------------------------------------------------
  guides: [
    {
      id: "guide-three-point-lighting",
      title: "Mastering the Three-Point Lighting Setup: Ratios, Angles & Mood",
      slug: "three-point-lighting",
      category: "Lighting Basics",
      readTime: "7 min read",
      author: "Elena Vance, Lead Studio Gaffer",
      date: "September 28, 2026",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
      excerpt: "Step-by-step breakdown of key, fill, and backlight placement, calculating contrast ratios, and adapting the classic setup for both portrait photography and cinema.",
      featured: true,
      content: `
        <h2>The Foundation of Visual Depth</h2>
        <p>Whether you are stepping into a multi-million-dollar sound stage or framing an interview in a converted bedroom, the three-point lighting system is the cornerstone of three-dimensional visual storytelling. At its core, three-point lighting solves a fundamental challenge: cameras capture a flat, 2D plane, but real human faces exist in 3D space.</p>
        
        <h3>1. The Key Light: Establishing Direction and Mood</h3>
        <p>The key light is your dominant illumination source. It determines the primary angle of light, casts the principal shadows, and establishes the emotional tone of your shot. In standard portraiture, positioning the key light roughly 30° to 45° off the camera axis and elevated 30° above the subject creates flattering catchlights in the eyes while defining the cheekbones (a classic Rembrandt triangle).</p>
        
        <h3>2. The Fill Light: Controlling Contrast Ratios</h3>
        <p>Without a fill light, deep shadows cast by hard key fixtures can quickly turn muddy or block out critical facial expressions. Fill light does not compete with the key light; instead, its sole job is to regulate shadow density.</p>
        <ul>
          <li><strong>1:2 Ratio (1 stop difference):</strong> Commercial, bright, energetic, and clean.</li>
          <li><strong>1:4 Ratio (2 stops difference):</strong> Classic portraiture and narrative drama with defined depth.</li>
          <li><strong>1:8 Ratio (3 stops difference):</strong> Film noir, high-contrast, moody, and intense.</li>
        </ul>

        <h3>3. The Back / Rim Light: Separation From Background</h3>
        <p>Often placed behind the subject out of the camera's sightline, the rim light outlines the hair, shoulders, and silhouette. This sharp edge of light pulls dark hair or dark garments away from moody studio backdrops, preventing the subject from bleeding into the background.</p>
      `,
      relatedProducts: ["lumora-x600-cob", "lumora-beam-300", "lumora-softbox-pro-90"]
    },
    {
      id: "guide-cob-vs-led-panel",
      title: "COB Lights vs. LED Panels: Which Lighting Technology Fits Your Studio?",
      slug: "cob-vs-led-panel",
      category: "Studio Setup",
      readTime: "9 min read",
      author: "Marcus Chen, Technical Director",
      date: "September 22, 2026",
      image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=800&q=80",
      excerpt: "Comparing Chip-on-Board (COB) point sources and surface-mount LED panel fixtures across modifier versatility, throw distance, and space efficiency.",
      featured: true,
      content: `
        <h2>Point Source vs. Multi-Emitter Panels</h2>
        <p>When outfitting a modern production studio, one of the most critical gear investments is deciding between high-powered COB (Chip-on-Board) monolights and flat 1x1 / 2x1 LED panels. Both utilize LED technology, but their optical characteristics could not be more distinct.</p>

        <h3>Why Choose COB Monolights?</h3>
        <p>A COB fixture concentrates hundreds of microscopic LED diodes onto a single coin-sized microchip. This simulates a single optical point source—just like the sun, a tungsten bulb, or a flash tube.</p>
        <ul>
          <li><strong>Infinite Modifier Versatility:</strong> Because the light originates from a single point, Bowens-mount modifiers (Fresnel lenses, optical spotlights, parabolic softboxes, and beauty dishes) work with mathematical precision.</li>
          <li><strong>Hard Shadow Capability:</strong> Without modifiers, a COB casts razor-sharp, natural shadows. Panels can never produce clean hard shadows because each individual LED emitter casts its own separate mini-shadow (micro-banding).</li>
          <li><strong>Long Throw Distance:</strong> Concentrated optics enable COBs to throw photons across 20+ feet of studio space with minimal falloff.</li>
        </ul>

        <h3>When Do LED Panels Excel?</h3>
        <p>LED panels distribute emitters across a broad rectangle. They are inherently soft, compact, and require zero setup time.</p>
        <ul>
          <li><strong>Low Ceiling & Tight Studio Spaces:</strong> Panels have virtually zero depth and can be mounted flush against walls or low ceilings where a deep 90cm softbox on a COB would never fit.</li>
          <li><strong>Fast Solo-Shooter Workflows:</strong> Built-in barndoors allow you to drop the light in place, angle the barn doors, and start rolling immediately without assembling rods or speedrings.</li>
        </ul>
      `,
      relatedProducts: ["lumora-x600-cob", "lumora-panel-1x1-rgb", "lumora-fresnel-f10"]
    },
    {
      id: "guide-understanding-cri-tlci-ssi",
      title: "Understanding Color Accuracy: Deep Dive into CRI, TLCI, TM-30 and SSI",
      slug: "understanding-cri-tlci-ssi",
      category: "Color Accuracy",
      readTime: "11 min read",
      author: "Dr. Aris Thorne, Optical Engineer",
      date: "September 15, 2026",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
      excerpt: "Why standard CRI 95 isn't enough for skin tones and camera sensors, and how modern metrics like TLCI and Spectral Similarity Index (SSI) guarantee broadcast purity.",
      featured: true,
      content: `
        <h2>The Science of True Color Fidelity</h2>
        <p>In the era of traditional tungsten halogen bulbs, color reproduction was virtually perfect—tungsten generates a continuous blackbody radiation curve. But when white LEDs entered the studio market, they fundamentally changed how photons are produced.</p>

        <h3>The Flaws of Legacy CRI (Color Rendering Index)</h3>
        <p>Standard CRI (Ra) evaluates only 8 muted pastel color swatches (R1 through R8). An LED manufacturer could produce a diode that spikes in yellow and cyan while dropping out entirely in deep saturated red (the crucial R9 metric), yet still score a high CRI of 95.</p>
        <p>Why does R9 matter? R9 represents deep saturated blood-red. If your studio light lacks R9 spectral output, human skin will appear lifeless, pasty, and greenish-gray on digital camera sensors, regardless of how much color grading you attempt in post-production.</p>

        <h3>TLCI: Television Lighting Consistency Index</h3>
        <p>TLCI replaces the human eye model with a standardized 3-CCD broadcast camera sensor model. Scoring from 0 to 100, any fixture scoring 95+ requires virtually zero color correction in live television workflows.</p>

        <h3>SSI: Spectral Similarity Index</h3>
        <p>Developed by the Academy of Motion Picture Arts and Sciences (AMPAS), SSI directly compares the continuous spectral output curve of a fixture against standard reference daylight (D55) or tungsten (3200K). Lumora's professional COB fixtures are engineered to achieve an industry-leading SSI of 86+.</p>
      `,
      relatedProducts: ["lumora-x600-cob", "lumora-studio-pro-1200", "lumora-panel-1x1-rgb"]
    },
    {
      id: "guide-softbox-modifiers-guide",
      title: "The Ultimate Guide to Light Modifiers: Softboxes, Octas, Beauty Dishes & Grids",
      slug: "softbox-modifiers-guide",
      category: "Modifiers",
      readTime: "8 min read",
      author: "Elena Vance, Lead Studio Gaffer",
      date: "September 08, 2026",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
      excerpt: "How size, depth, interior silver/white reflective coating, and diffusion thickness transform the hardness, specular highlights, and wrap of light.",
      featured: false,
      content: `
        <h2>Shaping the Raw Photon</h2>
        <p>A naked point-source bulb casts unflattering, harsh shadows. Modifiers are the optical tools that transform raw electrical output into sculpted emotional light.</p>
        <h3>Octaboxes vs Rectangular Softboxes</h3>
        <p>Octagonal softboxes produce natural round catchlights in the subject's pupils, mimicking the sun or natural sky domes. Rectangular softboxes mimic window frames and are ideal for vertical full-body fashion or clean architectural lines.</p>
      `,
      relatedProducts: ["lumora-softbox-pro-90", "lumora-lantern-65", "lumora-reflector-5in1"]
    },
    {
      id: "guide-cinematic-lighting-ratios",
      title: "Cinematic Lighting Ratios: Calculating Key-to-Fill for Dramatic Depth",
      slug: "cinematic-lighting-ratios",
      category: "Lighting Techniques",
      readTime: "10 min read",
      author: "Marcus Chen, Technical Director",
      date: "August 30, 2026",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      excerpt: "Practical formulas to calculate key-plus-fill to fill-only ratios using an incident light meter or digital false color overlays in-camera.",
      featured: false,
      content: `
        <h2>Quantifying Visual Contrast</h2>
        <p>Lighting ratio defines the mathematical relationship between the illuminated side of a subject's face and the shaded side. Mastering ratios allows a Director of Photography to maintain consistent visual mood across multi-day shoots.</p>
      `,
      relatedProducts: ["lumora-x600-cob", "lumora-strobe-800", "lumora-rgb-tube-kit"]
    },
    {
      id: "guide-wireless-dmx-crmx-control",
      title: "Wireless DMX & CRMX Integration: Real-Time Multi-Fixture Stage Control",
      slug: "wireless-dmx-crmx-control",
      category: "Studio Setup",
      readTime: "8 min read",
      author: "Elena Vance, Lead Studio Gaffer",
      date: "August 18, 2026",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
      excerpt: "How to configure LumenRadio TimoTwo CRMX transmitters, Art-Net nodes, and universe routing for seamless tablet and console lighting orchestration.",
      featured: false,
      content: `
        <h2>The Wireless Lighting Revolution</h2>
        <p>Gone are the days of taping hundreds of meters of 5-pin XLR cables across studio soundstages. Modern commercial stages rely on robust wireless DMX protocols like LumenRadio CRMX (Cognitive Radio Multiplexer) and Bluetooth mesh arrays.</p>

        <h3>1. CRMX vs. Standard 2.4GHz Wi-Fi</h3>
        <p>Standard consumer 2.4GHz Wi-Fi easily drops packets in high-interference studio environments. CRMX operates with automated cognitive frequency hopping at 1000 frames per second, dynamically avoiding occupied frequency bands to ensure zero flicker or latency.</p>

        <h3>2. Universe Mapping & Address Offsets</h3>
        <p>When outfitting multi-channel RGBWW fixtures and pixel tubes, each light utilizes between 6 and 48 DMX addresses. Proper universe channel budgeting ensures instantaneous master dimming and strobe effects without signal collision.</p>
      `,
      relatedProducts: ["lumora-x600-cob", "lumora-rgb-tube-kit", "lumora-panel-1x1-rgb"]
    }
  ],

  // --------------------------------------------------------------------------
  // CATEGORIES FOR DISCOVERY & NAVIGATION
  // --------------------------------------------------------------------------
  categories: [
    { name: "COB Lights", slug: "cob", count: 3, desc: "High-output point-source LED monolights with Bowens mount compatibility.", icon: "sun" },
    { name: "LED Lights", slug: "led", count: 2, desc: "Ultra-thin flexible mats and broadcast studio soft panels.", icon: "grid" },
    { name: "Strobes", slug: "strobe", count: 2, desc: "High-speed sync battery and AC monolight studio flashes.", icon: "zap" },
    { name: "Continuous Lighting", slug: "continuous", count: 2, desc: "Pixel-mapped RGBWW tubes and broadcast lighting arrays.", icon: "sliders" },
    { name: "Softboxes", slug: "softboxes", count: 2, desc: "Deep parabolic octadomes and 360° omnidirectional lanterns.", icon: "maximize" },
    { name: "Reflectors", slug: "reflector", count: 1, desc: "Multi-surface collapsible oval and silver dishes.", icon: "disc" },
    { name: "Light Modifiers", slug: "modifier", count: 3, desc: "Optical spotlight projectors, glass Fresnels, and snoots.", icon: "camera" },
    { name: "Lighting Accessories", slug: "accessory", count: 1, desc: "Heavy-duty stainless C-stands, grip arms, and battery stations.", icon: "tool" }
  ]
};
