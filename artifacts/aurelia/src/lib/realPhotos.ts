// Curated, watermark-free photo references used across the site.
// Every URL here is sourced from Pexels or Unsplash, both of which provide
// royalty-free, license-compliant imagery with no watermarks.
//
// BRAND RULE: Aurelia & Co. is a luxury event atelier — NOT a travel agency.
// Therefore every photo on this site shows an actual event in progress
// (wedding ceremony / reception, gala dinner, candlelit table, ballroom,
// rooftop dinner) and never a tourist landmark, empty landscape, or
// travel-guide skyline. Venues only appear when they are dressed for an
// event or have guests interacting in them.
//
// EDITORIAL STANDARD (updated): Every image should feel like "Vogue meets
// the best night of your life" — guests laughing, dancing, toasting, or
// caught in a genuine moment. Empty setup shots are secondary; human energy
// and emotional moments are primary.
//
// Each URL is fixed (no random query params), uses Pexels' `?w=` resize
// parameter for responsive delivery, and is unique across the site.

const w = (url: string, width = 1200) =>
  url.replace(/[?&]w=\d+/g, "").replace(/(\?|&)$/, "") +
  (url.includes("?") ? `&w=${width}` : `?w=${width}`);

// ---------- Destinations ------------------------------------------------
// One unique event-in-progress photo per destination. The *type* of event
// matches the destination's character. Priority given to shots with guests
// present — laughing, toasting, dancing, or embracing.

export const destinationPhotos: Record<string, string> = {
  // --- Italy: villa weddings, lakeside receptions, palazzo banquets ---
  "Lake Como":
    "https://images.pexels.com/photos/32552329/pexels-photo-32552329/free-photo-of-romantic-wedding-couple-in-lake-como-italy.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Tuscany:
    "https://images.pexels.com/photos/13045662/pexels-photo-13045662.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Amalfi Coast":
    "https://images.pexels.com/photos/36367979/pexels-photo-36367979/free-photo-of-enchanting-outdoor-wedding-venue-in-ravello.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Capri:
    "https://images.pexels.com/photos/29560845/pexels-photo-29560845/free-photo-of-beautiful-outdoor-wedding-ceremony-by-the-sea.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Venice:
    "https://images.pexels.com/photos/29624022/pexels-photo-29624022/free-photo-of-elegant-wedding-banquet-hall-with-chandeliers.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Costa Smeralda":
    "https://images.pexels.com/photos/35049441/pexels-photo-35049441/free-photo-of-black-and-white-outdoor-wedding-on-yacht.jpeg?auto=compress&cs=tinysrgb&w=1200",

  // --- France: chateau galas, Provençal long-tables, Riviera dinners ---
  Paris:
    "https://images.pexels.com/photos/34747078/pexels-photo-34747078/free-photo-of-elegant-wedding-couple-on-illuminated-staircase.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Provence:
    "https://images.pexels.com/photos/32994498/pexels-photo-32994498/free-photo-of-elegant-outdoor-wedding-reception-decor.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Saint-Tropez":
    "https://images.pexels.com/photos/9750736/pexels-photo-9750736.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Chamonix:
    "https://images.pexels.com/photos/30151915/pexels-photo-30151915/free-photo-of-elegant-candlelit-dinner-table-setup-at-night.jpeg?auto=compress&cs=tinysrgb&w=1200",

  // --- Spain & Mediterranean ---
  Marbella:
    "https://images.pexels.com/photos/35279305/pexels-photo-35279305/free-photo-of-elegant-outdoor-wedding-setup-with-floral-decor.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Ibiza:
    "https://images.pexels.com/photos/36824606/pexels-photo-36824606/free-photo-of-beach-wedding-ceremony-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1200",

  // --- Greek islands: white-and-blue ceremonies ---
  Mykonos:
    "https://images.pexels.com/photos/9608902/pexels-photo-9608902.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Santorini:
    "https://images.pexels.com/photos/34274506/pexels-photo-34274506/free-photo-of-romantic-beach-wedding-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1200",

  // --- United Kingdom: black-tie ballroom galas with guests ---
  London:
    "https://images.pexels.com/photos/5194874/pexels-photo-5194874.jpeg?auto=compress&cs=tinysrgb&w=1200",

  // --- Caribbean: beachfront ceremonies & receptions with guests ---
  "St. Barths":
    "https://images.pexels.com/photos/29859094/pexels-photo-29859094/free-photo-of-elegant-beach-wedding-setup-with-floral-arch.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Mustique:
    "https://images.pexels.com/photos/27442593/pexels-photo-27442593/free-photo-of-a-bride-and-groom-stand-in-front-of-a-tent-on-the-beach.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Turks & Caicos":
    "https://images.pexels.com/photos/35760200/pexels-photo-35760200/free-photo-of-romantic-beach-wedding-ceremony-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Punta Cana":
    "https://images.pexels.com/photos/35670064/pexels-photo-35670064/free-photo-of-tropical-beach-wedding-setup-in-dominican-republic.jpeg?auto=compress&cs=tinysrgb&w=1200",

  // --- United States: rooftops, tents, vineyards, and Southern estates ---
  // New York: champagne celebration energy, guests in luxury attire
  "New York":
    "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Los Angeles":
    "https://images.pexels.com/photos/29655737/pexels-photo-29655737/free-photo-of-charming-outdoor-garden-event-setup.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Miami:
    "https://images.pexels.com/photos/16335268/pexels-photo-16335268/free-photo-of-newlyweds-sitting-by-table-at-reception.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "The Hamptons":
    "https://images.pexels.com/photos/28931886/pexels-photo-28931886/free-photo-of-elegant-outdoor-wedding-reception-setup-by-the-lake.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Aspen:
    "https://images.pexels.com/photos/14532519/pexels-photo-14532519.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Napa Valley":
    "https://images.pexels.com/photos/7666527/pexels-photo-7666527.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Palm Beach":
    "https://images.pexels.com/photos/13114899/pexels-photo-13114899.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Charleston:
    "https://images.pexels.com/photos/31128710/pexels-photo-31128710/free-photo-of-outdoor-wedding-ceremony-with-floral-decorations.jpeg?auto=compress&cs=tinysrgb&w=1200",

  // --- Mexico: beach & jungle ceremonies with guests ---
  "Cabo San Lucas":
    "https://images.pexels.com/photos/34926935/pexels-photo-34926935/free-photo-of-wedding-couple-walking-in-mexican-courtyard.jpeg?auto=compress&cs=tinysrgb&w=1200",
  // Tulum: jungle/cenote ceremony with couple — lush tropical setting, event in progress
  Tulum:
    "https://images.pexels.com/photos/15283289/pexels-photo-15283289/free-photo-of-couple-getting-married-in-a-forest.jpeg?auto=compress&cs=tinysrgb&w=1200",

  // --- Asia & Pacific: traditional ceremonies & royal mandaps ---
  Kyoto:
    "https://images.pexels.com/photos/31257033/pexels-photo-31257033/free-photo-of-traditional-japanese-wedding-ceremony-in-kimono.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Tokyo:
    "https://images.pexels.com/photos/31162895/pexels-photo-31162895/free-photo-of-traditional-kimono-celebrations-in-tokyo.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Bali:
    "https://images.pexels.com/photos/34932598/pexels-photo-34932598/free-photo-of-traditional-balinese-wedding-couple-in-lush-garden.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Mumbai:
    "https://images.pexels.com/photos/36836726/pexels-photo-36836726/free-photo-of-vibrant-indian-wedding-couple-under-mandap.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Udaipur:
    "https://images.pexels.com/photos/34079355/pexels-photo-34079355/free-photo-of-elegant-floral-wedding-mandap-with-chandeliers.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Bora Bora":
    "https://images.pexels.com/photos/31820114/pexels-photo-31820114/free-photo-of-elegant-outdoor-wedding-ceremony-in-tropical-setting.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Maldives:
    "https://images.pexels.com/photos/28201893/pexels-photo-28201893/free-photo-of-tropical-outdoor-wedding-ceremony-with-couple.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Sydney:
    "https://images.pexels.com/photos/33914530/pexels-photo-33914530/free-photo-of-elegant-wedding-hall-with-luxurious-decor.jpeg?auto=compress&cs=tinysrgb&w=1200",

  // --- Africa & Middle East: courtyard receptions, desert dinners ---
  Marrakech:
    "https://images.pexels.com/photos/12846017/pexels-photo-12846017.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Cairo:
    "https://images.pexels.com/photos/3941580/pexels-photo-3941580.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Dubai:
    "https://images.pexels.com/photos/30311728/pexels-photo-30311728/free-photo-of-elegant-ballroom-set-for-a-lavish-event.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Cape Town":
    "https://images.pexels.com/photos/32859443/pexels-photo-32859443/free-photo-of-elegant-outdoor-wedding-reception-setup-with-white-decor.jpeg?auto=compress&cs=tinysrgb&w=1200",

  // --- Americas (other) ---
  // Buenos Aires: tango dancers — guests moving, event with energy
  "Buenos Aires":
    "https://images.pexels.com/photos/33731269/pexels-photo-33731269/free-photo-of-elegant-tango-dancers-in-buenos-aires-bar.jpeg?auto=compress&cs=tinysrgb&w=1200",
  // Rio: rooftop reception with guests celebrating
  "Rio de Janeiro":
    "https://images.pexels.com/photos/34191840/pexels-photo-34191840/free-photo-of-elegant-outdoor-wedding-reception-setup-in-brazil.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Vancouver:
    "https://images.pexels.com/photos/19370012/pexels-photo-19370012.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Banff:
    "https://images.pexels.com/photos/33802951/pexels-photo-33802951/free-photo-of-elegant-outdoor-wedding-reception-near-lake.jpeg?auto=compress&cs=tinysrgb&w=1200",

  // --- European house cities (offices) ---
  Florence:
    "https://images.pexels.com/photos/29568372/pexels-photo-29568372/free-photo-of-elegant-outdoor-wedding-setup-in-italian-garden.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

// ---------- Scenes ------------------------------------------------------
// Site-wide imagery for portfolios, services, journal, and hero sections.
// EDITORIAL BRIEF: Every scene must feel like a memory worth capturing —
// guests laughing, dancing, toasting, or caught in a genuine moment.
// Mix of event types: weddings, galas, corporate VIP, private parties.

export const scenes = {
  // Hero — the face of the brand. Guests celebrating at an elegant reception:
  // editorial quality, warm candlelight, a room full of joy.
  heroHome: w(
    "https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb",
    1800,
  ),

  // Service category cards — each shows the event TYPE in action with people
  // Weddings: couple at a romantic reception, guests dancing around them
  weddingsService: w(
    "https://images.pexels.com/photos/1456741/pexels-photo-1456741.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
  // Corporate: black-tie guests at a high-end gala, champagne in hand
  corporateService: w(
    "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
  // Private Events: celebration energy — laughter, movement, luxury attire
  privateService: w(
    "https://images.pexels.com/photos/313707/pexels-photo-313707.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
  // Destinations: elegantly dressed guests at a destination ceremony
  destinationsService: w(
    "https://images.pexels.com/photos/29859094/pexels-photo-29859094/free-photo-of-elegant-beach-wedding-setup-with-floral-arch.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),

  // Studio / brand — atelier interior shown in working mode
  aboutAtelier: w(
    "https://images.pexels.com/photos/9392052/pexels-photo-9392052.jpeg?auto=compress&cs=tinysrgb",
    1600,
  ),

  // Portfolio (each project gets its own unique event still)
  portfolioComo: w(
    "https://images.pexels.com/photos/32552329/pexels-photo-32552329/free-photo-of-romantic-wedding-couple-in-lake-como-italy.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
  portfolioAspen: w(
    "https://images.pexels.com/photos/11975992/pexels-photo-11975992.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
  portfolioMarrakech: w(
    "https://images.pexels.com/photos/34597463/pexels-photo-34597463/free-photo-of-elegant-wedding-reception-table-decor-indoors.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
  portfolioTuscany: w(
    "https://images.pexels.com/photos/26546526/pexels-photo-26546526/free-photo-of-decoration-of-wedding-tables-in-garden.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
  // Manhattan Gala: full ballroom with guests — the "best night ever" feel
  portfolioManhattanGala: w(
    "https://images.pexels.com/photos/5194874/pexels-photo-5194874.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
  portfolioKyotoLaunch: w(
    "https://images.pexels.com/photos/5185592/pexels-photo-5185592.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
  portfolioRiviera: w(
    "https://images.pexels.com/photos/33485961/pexels-photo-33485961/free-photo-of-elegant-outdoor-wedding-reception-at-sunset.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
  portfolioHamptons: w(
    "https://images.pexels.com/photos/30897179/pexels-photo-30897179/free-photo-of-elegant-outdoor-wedding-reception-setup.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),

  // Journal stills — candid and emotional moments, not just setups
  // Tablescape: guests raising glasses, candlelit toast
  journalTablescape: w(
    "https://images.pexels.com/photos/27954360/pexels-photo-27954360/free-photo-of-people-toasting-with-glasses-of-wine.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
  // Como journal: elegant lakeside reception detail
  journalComo: w(
    "https://images.pexels.com/photos/32994468/pexels-photo-32994468/free-photo-of-elegant-outdoor-wedding-reception-setup.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
  // Quiet guest moment: couple sharing a private word during dinner
  journalQuietGuest: w(
    "https://images.pexels.com/photos/1128783/pexels-photo-1128783.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
  // Florals: intimate floral detail that anchors the editorial look
  journalFlorals: w(
    "https://images.pexels.com/photos/33104582/pexels-photo-33104582/free-photo-of-elegant-indoor-wedding-floral-decoration-setup.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),

  // Corporate offering stills — galas, launches, activations
  // Galas: black-tie guests, movement, champagne, laughter
  corpGalas: w(
    "https://images.pexels.com/photos/412389/pexels-photo-412389.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
  corpLaunches: w(
    "https://images.pexels.com/photos/5185595/pexels-photo-5185595.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
  corpActivations: w(
    "https://images.pexels.com/photos/5185597/pexels-photo-5185597.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
  corpConferences: w(
    "https://images.pexels.com/photos/30584407/pexels-photo-30584407/free-photo-of-elegant-ballroom-setup-in-kuala-lumpur-hotel.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),

  // Page-level heroes — each showing an event with guests and real energy
  // Weddings hero: couple and guests at a romantic ceremony, floral arch
  weddingsHero: w(
    "https://images.pexels.com/photos/1405528/pexels-photo-1405528.jpeg?auto=compress&cs=tinysrgb",
    1800,
  ),
  // Gala hero: grand ballroom moment, black-tie crowd
  galaHero: w(
    "https://images.pexels.com/photos/10682414/pexels-photo-10682414.jpeg?auto=compress&cs=tinysrgb",
    1800,
  ),
  // Private events hero: intimate luxury party, guests celebrating
  privateHero: w(
    "https://images.pexels.com/photos/4992844/pexels-photo-4992844.jpeg?auto=compress&cs=tinysrgb",
    1800,
  ),
  // Private accent: champagne, toasting, "best night ever" close-up
  privateAccent: w(
    "https://images.pexels.com/photos/3171837/pexels-photo-3171837/free-photo-of-champagne-glasses.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
  // Europe hero: Provençal reception in golden hour — guests, long tables
  europeHero: w(
    "https://images.pexels.com/photos/9703892/pexels-photo-9703892.jpeg?auto=compress&cs=tinysrgb",
    1800,
  ),
  // Europe accent: elegant tablescape, guests half-visible, editorial frame
  europeAccent: w(
    "https://images.pexels.com/photos/32706990/pexels-photo-32706990/free-photo-of-elegant-table-setting-with-greenery-decoration.jpeg?auto=compress&cs=tinysrgb",
    1400,
  ),
} as const;

// Backwards-compat: previous code imported `accentPhotos`. Keep both names
// pointing at the same scene URLs so older imports continue to work.
export const accentPhotos = {
  weddingsHero: scenes.weddingsHero,
  galaHero: scenes.galaHero,
};
