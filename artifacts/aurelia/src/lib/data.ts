import { scenes, destinationPhotos } from "./realPhotos";

export const portfolioProjects = [
  // ── Original 8 ──────────────────────────────────────────────────────────
  {
    id: "como-villa",
    slug: "como-villa",
    title: "A Villa on the Lake",
    category: "Weddings",
    destination: "Lake Como, Italy",
    image: scenes.portfolioComo,
    date: "September 2023",
    guestCount: 150,
    services: "Full Production & Design",
    description:
      "An intimate weekend celebration set against the dramatic backdrop of Lake Como. The design leaned into the natural romance of the region, featuring lush white florals, classic Italian elegance, and a dinner under the stars.",
  },
  {
    id: "aspen-equestrian",
    slug: "aspen-equestrian",
    title: "An Equestrian Soirée",
    category: "Weddings",
    destination: "Aspen, Colorado",
    image: scenes.portfolioAspen,
    date: "January 2024",
    guestCount: 200,
    services: "Full Production & Design",
    description:
      "A luxury winter wonderland wedding blending rustic elegance with modern luxury. Guests were treated to candlelit dinners, roaring fires, and a bespoke design that perfectly complemented the snow-capped peaks.",
  },
  {
    id: "marrakech-midnight",
    slug: "marrakech-midnight",
    title: "Midnight in Marrakech",
    category: "Private",
    destination: "Marrakech, Morocco",
    image: scenes.portfolioMarrakech,
    date: "November 2023",
    guestCount: 75,
    services: "Event Design & Planning",
    description:
      "A vibrant 50th birthday celebration infused with the rich colors and textures of Morocco. The evening featured opulent textiles, endless lanterns, and a magical atmosphere.",
  },
  {
    id: "tuscany-countryside",
    slug: "tuscany-countryside",
    title: "Tuscan Countryside",
    category: "Weddings",
    destination: "Tuscany, Italy",
    image: scenes.portfolioTuscany,
    date: "June 2023",
    guestCount: 120,
    services: "Full Production & Design",
    description:
      "A quintessential Tuscan wedding with a long communal table set beneath ancient olive trees. The design emphasized organic beauty, featuring string lights, terracotta accents, and relaxed elegance.",
  },
  {
    id: "manhattan-gala",
    slug: "manhattan-gala",
    title: "A Manhattan Gala",
    category: "Corporate",
    destination: "New York, USA",
    image: scenes.portfolioManhattanGala,
    date: "April 2024",
    guestCount: 600,
    services: "Concept, Production & Entertainment",
    description:
      "A landmark anniversary gala for a legacy fashion house, hosted inside a transformed Beaux-Arts hall. The room was dressed in 14,000 stems of imported French roses and lit by a dimensioned chandelier choreographed to live orchestration.",
  },
  {
    id: "kyoto-launch",
    slug: "kyoto-launch",
    title: "A Kyoto Product Reveal",
    category: "Corporate",
    destination: "Kyoto, Japan",
    image: scenes.portfolioKyotoLaunch,
    date: "March 2024",
    guestCount: 250,
    services: "Brand Activation & Production",
    description:
      "A global luxury automotive reveal staged inside a private temple compound. Choreographed lighting, traditional taiko, and a guided procession through moss gardens led to the unveiling beneath an open sky.",
  },
  {
    id: "south-of-france-wedding",
    slug: "south-of-france-wedding",
    title: "A Riviera Affair",
    category: "Weddings",
    destination: "Cap-Ferrat, France",
    image: scenes.portfolioRiviera,
    date: "July 2024",
    guestCount: 220,
    services: "Full Production & Design",
    description:
      "Three days of celebration along the Côte d'Azur. A welcome dinner on a private yacht, a Catholic ceremony at a 19th-century chapel, and a candlelit reception in the gardens of a historic Belle Époque villa.",
  },
  {
    id: "hamptons-anniversary",
    slug: "hamptons-anniversary",
    title: "A Hamptons Anniversary",
    category: "Private",
    destination: "East Hampton, USA",
    image: scenes.portfolioHamptons,
    date: "August 2023",
    guestCount: 180,
    services: "Design & Production",
    description:
      "A 25th anniversary celebration on the lawns of a private oceanfront estate. The design palette of bone, ivory, and pale rose unfolded beneath a fully transparent structure with a custom-printed silk ceiling.",
  },

  // ── Extended Portfolio ───────────────────────────────────────────────────
  {
    id: "paris-hotel-particulier",
    slug: "paris-hotel-particulier",
    title: "A Parisian Love Story",
    category: "Weddings",
    destination: "Paris, France",
    image: destinationPhotos["Paris"],
    date: "May 2024",
    guestCount: 160,
    services: "Full Production & Design",
    description:
      "A candlelit ceremony and reception inside a 19th-century hôtel particulier in the Marais, followed by a grand staircase entrance descent and dinner beneath gilded ceilings.",
  },
  {
    id: "venice-palazzo-gala",
    slug: "venice-palazzo-gala",
    title: "A Venetian Masquerade",
    category: "Corporate",
    destination: "Venice, Italy",
    image: destinationPhotos["Venice"],
    date: "October 2023",
    guestCount: 350,
    services: "Concept, Production & Entertainment",
    description:
      "A European anniversary gala inside a Grand Canal palazzo — chandeliers reflected in marble floors, a live string quartet, and guests arriving by private gondola under a full moon.",
  },
  {
    id: "santorini-caldera",
    slug: "santorini-caldera",
    title: "Caldera Ceremony",
    category: "Weddings",
    destination: "Santorini, Greece",
    image: destinationPhotos["Santorini"],
    date: "August 2024",
    guestCount: 90,
    services: "Full Production & Design",
    description:
      "An intimate sunset ceremony at the rim of the caldera, followed by a white-on-white reception on a private terrace. Every detail was designed to disappear into the view.",
  },
  {
    id: "udaipur-palace",
    slug: "udaipur-palace",
    title: "A Palace on the Lake",
    category: "Destinations",
    destination: "Udaipur, India",
    image: destinationPhotos["Udaipur"],
    date: "February 2024",
    guestCount: 400,
    services: "Full Multi-Day Production",
    description:
      "A five-day wedding across three royal palace venues. Ten thousand marigolds, candlelit baraat processions, and a mandap draped entirely in imported roses above Lake Pichola.",
  },
  {
    id: "buenos-aires-milonga",
    slug: "buenos-aires-milonga",
    title: "A Milonga in Buenos Aires",
    category: "Private",
    destination: "Buenos Aires, Argentina",
    image: destinationPhotos["Buenos Aires"],
    date: "December 2023",
    guestCount: 100,
    services: "Event Design & Entertainment",
    description:
      "A 60th birthday weekend on a private estancia: candlelit asado under the Pampas sky, followed by a milonga with professional tango partners and a world-class live orchestra.",
  },
  {
    id: "bali-sacred-garden",
    slug: "bali-sacred-garden",
    title: "Sacred Garden, Bali",
    category: "Destinations",
    destination: "Bali, Indonesia",
    image: destinationPhotos["Bali"],
    date: "April 2024",
    guestCount: 80,
    services: "Full Production & Design",
    description:
      "A traditional Balinese blessing ceremony followed by a jungle reception at Bambu Indah — priests, flower offerings, and a dinner lit entirely by hand-placed oil lamps.",
  },
  {
    id: "mumbai-royal-mandap",
    slug: "mumbai-royal-mandap",
    title: "A Royal Mumbai Celebration",
    category: "Destinations",
    destination: "Mumbai, India",
    image: destinationPhotos["Mumbai"],
    date: "January 2024",
    guestCount: 500,
    services: "Full Multi-Day Production",
    description:
      "Three days of South Asian wedding ceremonies — sangeet, mehndi, and reception — each designed as its own world. A spectacle of colour, craft, and choreography.",
  },
  {
    id: "cape-town-vineyard",
    slug: "cape-town-vineyard",
    title: "A Vineyard in Stellenbosch",
    category: "Weddings",
    destination: "Cape Town, South Africa",
    image: destinationPhotos["Cape Town"],
    date: "November 2023",
    guestCount: 140,
    services: "Full Production & Design",
    description:
      "A vineyard wedding in the Cape Winelands with a ceremony beneath hundred-year oak trees and a dinner inside a restored wine barrel cellar, transformed with candlelight and hanging botanicals.",
  },
  {
    id: "ibiza-cliff-villa",
    slug: "ibiza-cliff-villa",
    title: "A White Island Night",
    category: "Private",
    destination: "Ibiza, Spain",
    image: destinationPhotos["Ibiza"],
    date: "July 2023",
    guestCount: 120,
    services: "Event Design & Production",
    description:
      "A cliff-top villa takeover for a global fashion week after-party. A Balearic-house DJ, bespoke cocktails, and a ceremony at the island's oldest beach club as the sun set into the sea.",
  },
  {
    id: "dubai-tower-gala",
    slug: "dubai-tower-gala",
    title: "A Dubai Skyline Gala",
    category: "Corporate",
    destination: "Dubai, UAE",
    image: destinationPhotos["Dubai"],
    date: "March 2024",
    guestCount: 700,
    services: "Concept, Production & Entertainment",
    description:
      "A brand milestone gala in a sky-high ballroom above the Dubai skyline. Guests moved through three rooms — reception, dinner, and after-party — each with its own atmosphere and design language.",
  },
  {
    id: "amalfi-cliffside",
    slug: "amalfi-cliffside",
    title: "Above the Amalfi Coast",
    category: "Weddings",
    destination: "Amalfi Coast, Italy",
    image: destinationPhotos["Amalfi Coast"],
    date: "June 2024",
    guestCount: 110,
    services: "Full Production & Design",
    description:
      "A clifftop ceremony at Ravello's historic gardens, with dinner served on terraced tables overlooking the Tyrrhenian Sea. Lemon-blossom florals and handmade ceramics at every setting.",
  },
  {
    id: "turks-caicos-beach",
    slug: "turks-caicos-beach",
    title: "Barefoot on Grace Bay",
    category: "Weddings",
    destination: "Turks & Caicos",
    image: destinationPhotos["Turks & Caicos"],
    date: "April 2023",
    guestCount: 48,
    services: "Intimate Event Design",
    description:
      "An ultra-intimate ceremony at sunset on the world's most beautiful beach, followed by a barefoot candlelit dinner for fifty, served by a Michelin-starred chef flown in for the evening.",
  },
  {
    id: "costa-smeralda-yacht",
    slug: "costa-smeralda-yacht",
    title: "A Sardinian Yacht Wedding",
    category: "Weddings",
    destination: "Costa Smeralda, Italy",
    image: destinationPhotos["Costa Smeralda"],
    date: "July 2023",
    guestCount: 65,
    services: "Full Production & Design",
    description:
      "A ceremony on the deck of a private superyacht moored in the Emerald waters of Porto Cervo, followed by a reception at Pevero with the Maddalena Archipelago as a backdrop.",
  },
  {
    id: "chamonix-fireside",
    slug: "chamonix-fireside",
    title: "A Fireside Alpine Dinner",
    category: "Private",
    destination: "Chamonix, France",
    image: destinationPhotos["Chamonix"],
    date: "February 2024",
    guestCount: 30,
    services: "Intimate Event Design",
    description:
      "A private dinner for a close family gathered from four continents — a candlelit long table inside a historic alpine chalet, with Mont Blanc visible through floor-to-ceiling glass.",
  },
  {
    id: "cabo-courtyard",
    slug: "cabo-courtyard",
    title: "A Cabo Courtyard Wedding",
    category: "Destinations",
    destination: "Cabo San Lucas, Mexico",
    image: destinationPhotos["Cabo San Lucas"],
    date: "January 2024",
    guestCount: 130,
    services: "Full Production & Design",
    description:
      "A ceremony in a flower-covered hacienda courtyard, a mariachi-led cocktail hour, and a reception dinner stretching into the warm Baja night — the perfect union of old Mexico and new luxury.",
  },
];

export const journalPosts = [
  {
    slug: "art-of-the-tablescape",
    title: "The Art of the Tablescape",
    category: "Design",
    date: "October 12, 2023",
    excerpt:
      "How we approach the foundational element of every celebration: the dining table.",
    image: scenes.journalTablescape,
    content:
      "The dining table is where the magic of a celebration is made tangible. It is the place where guests sit a little longer, where conversations deepen, and where the sensory choreography of the evening comes into focus. We approach the tablescape the way a couture house approaches a gown — through proportion, restraint, and the deliberate layering of material.",
  },
  {
    slug: "destination-como",
    title: "Destination Spotlight: Lake Como",
    category: "Travel",
    date: "September 5, 2023",
    excerpt:
      "Why the Italian lakes remain the ultimate setting for luxury celebrations.",
    image: scenes.journalComo,
    content:
      "There is nowhere quite like Lake Como. The dramatic mountains, the historic villas, the slow rhythm of the water — all of it conspires to make even the simplest dinner feel cinematic. For a celebration that is built on atmosphere as much as design, the lakes remain singular.",
  },
  {
    slug: "the-quiet-guest-experience",
    title: "The Quiet Guest Experience",
    category: "Hospitality",
    date: "February 14, 2024",
    excerpt:
      "How thoughtful pacing, lighting, and air can shape a guest's memory more than any centerpiece.",
    image: scenes.journalQuietGuest,
    content:
      "Hospitality begins long before the first guest arrives. It begins with how a room breathes — its temperature, its scent, the weight of the music. The most enduring luxuries are often the least photographed: a perfectly chilled aperitif handed off without ceremony, a coat returned before it is asked for.",
  },
  {
    slug: "florals-after-the-flowers",
    title: "Florals, After the Flowers",
    category: "Design",
    date: "March 30, 2024",
    excerpt:
      "What happens after the last toast — and why post-event florals matter to the people we work with.",
    image: scenes.journalFlorals,
    content:
      "Every event we design ends the same way: with the quiet question of what happens to thousands of stems once the music has stopped. We have spent years building partnerships with hospices, churches, and community organizations to ensure that nothing beautiful is wasted.",
  },
];

export const pressFeatures = [
  {
    publication: "Vogue",
    title: "The Designers Defining the New Era of Modern Weddings",
    date: "February 2024",
    excerpt:
      "Aurelia & Co. has emerged as the firm of record for couples seeking architecturally restrained, deeply personal celebrations.",
  },
  {
    publication: "Architectural Digest",
    title: "Inside a Lake Como Villa, Reimagined for One Weekend",
    date: "November 2023",
    excerpt:
      "A months-long collaboration between architect, atelier, and host culminated in a celebration that felt inevitable, as if the villa had always been dressed this way.",
  },
  {
    publication: "Town & Country",
    title: "The 50 Most Influential People in Luxury Hospitality",
    date: "October 2023",
    excerpt:
      "Founder Mira Aurelia is reshaping what it means to host on a global stage — with a quiet, almost obsessive attention to atmosphere.",
  },
  {
    publication: "Harper's Bazaar",
    title: "How a New Generation of Planners Is Rewriting the Black-Tie Gala",
    date: "May 2023",
    excerpt:
      "Aurelia & Co. led the room through a single, unbroken arc — from the cocktail hour to the after-party — without ever showing the seams.",
  },
  {
    publication: "Condé Nast Traveler",
    title: "The Best Destination Wedding Planners in the World",
    date: "January 2024",
    excerpt:
      "Their network of vendors, venues, and concierges across Europe is unrivaled — and quietly held.",
  },
  {
    publication: "Robb Report",
    title: "The Atelier Approach to Private Celebrations",
    date: "August 2023",
    excerpt:
      "What separates Aurelia & Co. is restraint: a willingness to remove rather than add until only the essential remains.",
  },
];

export const pressQuotes = [
  {
    source: "Atelier Quarterly",
    text: "Aurelia & Co. operates on a completely different plane of event design.",
  },
  {
    source: "Maison Review",
    text: "The undisputed masters of modern luxury celebrations.",
  },
  {
    source: "The Fête Edit",
    text: "Every event they touch turns into cinematic gold.",
  },
];

export const corporateOfferings = [
  {
    id: "galas",
    title: "Galas & Benefits",
    description:
      "Anniversary galas, fundraising benefits, and milestone celebrations for foundations, museums, and global brands. We deliver rooms that move — both emotionally and financially.",
    image: scenes.corpGalas,
    bullets: [
      "Concept development & creative direction",
      "Honoree & talent management",
      "Auction, donation, and pledge integration",
      "Broadcast-quality production",
    ],
  },
  {
    id: "launches",
    title: "Product Launches",
    description:
      "Global product reveals choreographed for press, retailers, and the camera. From private one-night activations to multi-city tours, we engineer the moment your brand becomes the headline.",
    image: scenes.corpLaunches,
    bullets: [
      "Site selection & venue transformation",
      "Press preview & embargo strategy",
      "Custom installations & scenic build",
      "Hospitality programs for VIP buyers",
    ],
  },
  {
    id: "activations",
    title: "Brand Activations",
    description:
      "Immersive brand environments for fashion week, trade shows, and consumer-facing moments. We translate brand identity into space, pacing, and atmosphere.",
    image: scenes.corpActivations,
    bullets: [
      "Multi-room narrative design",
      "Talent & influencer programming",
      "Capture strategy for social & editorial",
      "Operations across global markets",
    ],
  },
  {
    id: "conferences",
    title: "Conferences & Summits",
    description:
      "Executive summits, leadership offsites, and invitation-only conferences with the look and feel of an editorial event — and the operational backbone of a global production.",
    image: scenes.corpConferences,
    bullets: [
      "Executive briefing & guest curation",
      "Stage, broadcast, and AV direction",
      "Bespoke evening programs",
      "Travel & hospitality coordination",
    ],
  },
];

export const weddingOfferings = [
  {
    title: "Creative Direction",
    description:
      "An end-to-end design language for your wedding — from the save-the-date to the final reception layer — developed by a senior creative director and rendered before a single chair is placed.",
  },
  {
    title: "Venue & Estate Curation",
    description:
      "Access to a private network of estates, vineyards, palazzos, and one-of-a-kind venues — many never offered publicly. We negotiate, contract, and steward the relationship throughout.",
  },
  {
    title: "Guest Experience",
    description:
      "From welcome gifts and curated city guides to private transfers and insider excursions, every guest leaves having experienced the destination as you would have introduced it.",
  },
  {
    title: "Floral & Tablescape",
    description:
      "An in-house floral atelier sources, designs, and installs every arrangement — from cathedral installations to the linen, glassware, and place settings on each table.",
  },
  {
    title: "Production & Logistics",
    description:
      "A senior production team manages permits, vendors, transport, accommodation, weather contingencies, and the operational architecture so the celebration unfolds without a seam.",
  },
  {
    title: "On-Day Direction",
    description:
      "A dedicated producer and floor team are present from the morning preparations to the final farewell — a calm, invisible presence ensuring every cue lands on time.",
  },
];

export const studioPrinciples = [
  {
    title: "Discretion",
    description:
      "Most of our work is never seen publicly. We design with the assumption that what happens inside the room stays there — and we structure our team and contracts accordingly.",
  },
  {
    title: "Precision",
    description:
      "An Aurelia event is engineered like a couture garment. Every cue, every transition, every floral stem is rehearsed, documented, and accounted for before the doors open.",
  },
  {
    title: "Imagination",
    description:
      "We begin every project with a blank page and an open question: what would make this unforgettable for you? The answer always arrives in collaboration, never in a template.",
  },
];

export const ateliers = [
  {
    city: "New York",
    role: "Flagship Atelier",
    address: "150 Fifth Avenue, Suite 1200",
  },
  {
    city: "Los Angeles",
    role: "West Coast Studio",
    address: "9000 Sunset Boulevard",
  },
  {
    city: "Miami",
    role: "Tropical Bureau",
    address: "100 Biscayne Boulevard",
  },
  {
    city: "Florence",
    role: "European House",
    address: "Via de' Tornabuoni, 15",
  },
];

export const privateOfferings = [
  {
    title: "Milestone Birthdays",
    description:
      "Decade celebrations conceived as full weekends — welcome dinners, themed evenings, and farewell brunches across one or several private estates.",
  },
  {
    title: "Anniversaries & Vow Renewals",
    description:
      "Quietly grand celebrations marking 10, 25, or 50 years — often returning to the destination, the chapel, or the table where it began.",
  },
  {
    title: "Bar & Bat Mitzvahs",
    description:
      "Two-day productions that move from sacred ceremony to a fully transformed evening environment, designed for the family as much as for the guest of honor.",
  },
  {
    title: "Holiday & Seasonal Soirées",
    description:
      "Annual gatherings — whether a New Year's eve in St. Barths or a Christmas Eve in the country — that become a defining tradition for our clients.",
  },
  {
    title: "Welcome & Farewell Dinners",
    description:
      "Private chef collaborations and intimate seated dinners staged in unexpected venues: rooftops, gardens, libraries, vineyards.",
  },
  {
    title: "Yacht & Estate Hosting",
    description:
      "Multi-day hosting programs aboard private vessels and historic estates, with a dedicated atelier team embedded throughout the stay.",
  },
];

export const europeServices = [
  {
    title: "Italian Lakes & Tuscany",
    description:
      "From Lake Como to the Val d'Orcia, our Florence atelier brings deep relationships with the region's most protected venues, vineyards, and private villas.",
  },
  {
    title: "Côte d'Azur & Provence",
    description:
      "Multi-day celebrations along the French Riviera and the lavender hills — historic estates, yachts, and chapels secured through long-standing partnerships.",
  },
  {
    title: "Greek Islands",
    description:
      "Hidden chapels, private islands, and seaside terraces across the Cyclades and the Ionian — staged with precision and unhurried elegance.",
  },
  {
    title: "Iberia & The Mediterranean",
    description:
      "From Mallorca to the Douro Valley, we curate rare access to family vineyards, palace gardens, and private estates.",
  },
];
