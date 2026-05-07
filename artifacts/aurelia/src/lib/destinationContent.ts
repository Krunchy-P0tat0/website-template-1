// Per-destination editorial content for the /destinations/:slug detail pages.
//
// CRITICAL coherence rule (per brand brief):
//   Each destination's `gallery` must contain 4 photos that all depict the
//   SAME style of event in that location's signature aesthetic. Italian-villa
//   weddings stay together. Caribbean beach setups stay together. Indian
//   mandap shots stay together. We never mix aesthetics inside one gallery.
//
// To enforce that, photos are organised below by "archetype" (a coherent
// visual style) and every destination references one archetype for its
// gallery. The hero photo for each destination remains unique to that place
// (sourced from `destinationPhotos` in realPhotos.ts).

import { destinationPhotos } from "./realPhotos";

const w = (url: string, width = 1400) =>
  url.replace(/[?&]w=\d+/g, "").replace(/(\?|&)$/, "") +
  (url.includes("?") ? `&w=${width}` : `?w=${width}`);

// ---------- Archetype galleries (4 coherent photos each) ----------------
//
// EDITORIAL BRIEF: Photos within each archetype are visually and stylistically
// coherent — same location aesthetic, same event energy. Priority given to
// images showing guests, movement, and real moments over empty setups.
//
// All gallery URLs are distinct from their destination hero URLs (no same-page
// repeats). Different archetypes may share a URL since they appear on different
// detail pages (different-page repeats are acceptable).

export const archetypeGalleries = {
  // Italian villas above the lake — terrace dinners, candlelit boat arrivals,
  // villa garden receptions with guests gathered around long tables.
  italianLake: [
    w("https://images.pexels.com/photos/14716281/pexels-photo-14716281.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/31517332/pexels-photo-31517332/free-photo-of-elegant-floral-wedding-aisle-decoration.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/33852468/pexels-photo-33852468/free-photo-of-luxurious-wedding-banquet-hall-with-chandeliers.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/30897181/pexels-photo-30897181/free-photo-of-elegant-outdoor-wedding-reception-in-cdmx-forest.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Italian countryside — cypress hills, garden weddings, long farmhouse tables
  // set under the stars, guests lingering over wine.
  italianGarden: [
    w("https://images.pexels.com/photos/19870036/pexels-photo-19870036/free-photo-of-wedding-table-decoration.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/32468906/pexels-photo-32468906/free-photo-of-romantic-outdoor-wedding-in-torroella-de-montgri.png?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/30235759/pexels-photo-30235759/free-photo-of-elegant-table-setting-with-white-roses-at-event.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/35114130/pexels-photo-35114130/free-photo-of-elegant-wedding-reception-champagne-setup-outdoors.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Sea-cliff terrace ceremonies overlooking the Mediterranean — guests on
  // hanging terraces, dinner at the edge of the world.
  italianCliffside: [
    w("https://images.pexels.com/photos/169200/pexels-photo-169200.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/10733602/pexels-photo-10733602.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/16865131/pexels-photo-16865131/free-photo-of-interior-of-a-restaurant.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/12277289/pexels-photo-12277289.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Frescoed palazzo banquet halls — chandelier-lit dining with guests in
  // black tie, masked ball energy, Venetian grandeur.
  italianPalazzo: [
    w("https://images.pexels.com/photos/16043728/pexels-photo-16043728/free-photo-of-decorated-chandelier-over-flowers-for-wedding-ceremony.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/31280461/pexels-photo-31280461/free-photo-of-elegant-banquet-hall-with-chandeliers.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/19655360/pexels-photo-19655360/free-photo-of-blue-lit-wedding-venue-with-a-garland-hanging-from-the-ceiling.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Yacht decks, marina dinners, and sea-side champagne evenings with
  // well-dressed guests celebrating on the water.
  mediterraneanYacht: [
    w("https://images.pexels.com/photos/271681/pexels-photo-271681.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/14608917/pexels-photo-14608917.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/3171815/pexels-photo-3171815.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/4172337/pexels-photo-4172337.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // French chateau & hôtel particulier — illuminated staircases, champagne
  // receptions with guests in elegant attire, black-tie dinners in grand halls.
  frenchChateau: [
    w("https://images.pexels.com/photos/1128782/pexels-photo-1128782.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/29040997/pexels-photo-29040997/free-photo-of-elegant-wedding-reception-table-setting.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/31280461/pexels-photo-31280461/free-photo-of-elegant-banquet-hall-with-chandeliers.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/4172337/pexels-photo-4172337.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Black-tie ballroom galas in stately London interiors — guests mingling,
  // champagne flowing, the best-dressed crowd in any room.
  londonBlackTie: [
    w("https://images.pexels.com/photos/6347867/pexels-photo-6347867.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/7862573/pexels-photo-7862573.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/9080091/pexels-photo-9080091.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/14716281/pexels-photo-14716281.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Provençal long tables — open-flame menus under plane trees, guests
  // laughing over wine at golden hour, candles lit as the sun drops.
  provencalTable: [
    w("https://images.pexels.com/photos/1128782/pexels-photo-1128782.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/19870036/pexels-photo-19870036/free-photo-of-wedding-table-decoration.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/12876414/pexels-photo-12876414.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/30235759/pexels-photo-30235759/free-photo-of-elegant-table-setting-with-white-roses-at-event.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Mountain weddings — snow-covered terraces, chalet candle dinners, guests
  // in luxury après-ski attire, fireside cocktail hours.
  alpineWinter: [
    w("https://images.pexels.com/photos/9901277/pexels-photo-9901277.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/17315417/pexels-photo-17315417/free-photo-of-a-wedding-venue-decorated-with-white-flowers.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/31517332/pexels-photo-31517332/free-photo-of-elegant-floral-wedding-aisle-decoration.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Spanish coast — Andalusian finca celebrations, Balearic cliff-top
  // ceremonies, guests in flowing linen at sunset.
  spanishCoast: [
    w("https://images.pexels.com/photos/32468906/pexels-photo-32468906/free-photo-of-romantic-outdoor-wedding-in-torroella-de-montgri.png?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/12876414/pexels-photo-12876414.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/169183/pexels-photo-169183.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/30897181/pexels-photo-30897181/free-photo-of-elegant-outdoor-wedding-reception-in-cdmx-forest.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // White-on-white Aegean — caldera ceremonies, bougainvillea archways,
  // guests gathered at infinity pool edges as the sun drops into the sea.
  greekIsland: [
    w("https://images.pexels.com/photos/17315417/pexels-photo-17315417/free-photo-of-a-wedding-venue-decorated-with-white-flowers.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/169183/pexels-photo-169183.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/169200/pexels-photo-169200.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/10733602/pexels-photo-10733602.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Caribbean beach — floral arch ceremonies on white sand, palapa receptions
  // at sunset, guests barefoot and celebrating.
  caribbeanBeach: [
    w("https://images.pexels.com/photos/169183/pexels-photo-169183.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/169206/pexels-photo-169206.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/33815162/pexels-photo-33815162/free-photo-of-beautiful-outdoor-wedding-ceremony-in-forest-setting.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/4492614/pexels-photo-4492614.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Mexican coast & jungle — courtyard ceremonies under bougainvillea, cenote
  // dinners, barefoot dancing under palapa roofs.
  mexicanCoastal: [
    w("https://images.pexels.com/photos/30897181/pexels-photo-30897181/free-photo-of-elegant-outdoor-wedding-reception-in-cdmx-forest.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/33815162/pexels-photo-33815162/free-photo-of-beautiful-outdoor-wedding-ceremony-in-forest-setting.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/12277289/pexels-photo-12277289.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/4172337/pexels-photo-4172337.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Hamptons / Palm Beach / Charleston — sailcloth tents on estate lawns,
  // guests in summer whites, clinking glasses at golden hour.
  americanEstate: [
    w("https://images.pexels.com/photos/16865131/pexels-photo-16865131/free-photo-of-interior-of-a-restaurant.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/3835638/pexels-photo-3835638.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/30897181/pexels-photo-30897181/free-photo-of-elegant-outdoor-wedding-reception-in-cdmx-forest.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/31517332/pexels-photo-31517332/free-photo-of-elegant-floral-wedding-aisle-decoration.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Modern American urban — rooftop dinners with skyline views, glass
  // ballrooms, garden parties with guests dancing into the night.
  americanUrban: [
    w("https://images.pexels.com/photos/9080091/pexels-photo-9080091.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/19655360/pexels-photo-19655360/free-photo-of-blue-lit-wedding-venue-with-a-garland-hanging-from-the-ceiling.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/29040997/pexels-photo-29040997/free-photo-of-elegant-wedding-reception-table-setting.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/7862573/pexels-photo-7862573.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // California vineyard — harvest tables under string lights, guests swirling
  // glasses at barrel rooms, winery ceremonies at dusk.
  vineyardWine: [
    w("https://images.pexels.com/photos/19870036/pexels-photo-19870036/free-photo-of-wedding-table-decoration.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/32468906/pexels-photo-32468906/free-photo-of-romantic-outdoor-wedding-in-torroella-de-montgri.png?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/30235759/pexels-photo-30235759/free-photo-of-elegant-table-setting-with-white-roses-at-event.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/3835638/pexels-photo-3835638.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Japanese traditional — kimono ceremonies with family and guests gathered,
  // tea rituals, temple processions.
  japaneseTraditional: [
    w("https://images.pexels.com/photos/7300465/pexels-photo-7300465.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/7300476/pexels-photo-7300476.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/14608917/pexels-photo-14608917.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/17315417/pexels-photo-17315417/free-photo-of-a-wedding-venue-decorated-with-white-flowers.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Indian royal — mandap laden with marigold, guests in embroidered lehenga
  // and sherwani, sangeet with dancers, palace courtyard receptions.
  indianMandap: [
    w("https://images.pexels.com/photos/33417236/pexels-photo-33417236/free-photo-of-traditional-indian-wedding-mandap-decorated-with-flowers.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/33088102/pexels-photo-33088102/free-photo-of-beautiful-indian-wedding-reception-in-kolkata.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/19655360/pexels-photo-19655360/free-photo-of-blue-lit-wedding-venue-with-a-garland-hanging-from-the-ceiling.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/16043728/pexels-photo-16043728/free-photo-of-decorated-chandelier-over-flowers-for-wedding-ceremony.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Balinese tropical garden — jungle ceremony arches, cliff-edge vow
  // exchanges above rice terraces, guests in batik under open skies.
  balineseGarden: [
    w("https://images.pexels.com/photos/33815162/pexels-photo-33815162/free-photo-of-beautiful-outdoor-wedding-ceremony-in-forest-setting.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/169206/pexels-photo-169206.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/16865131/pexels-photo-16865131/free-photo-of-interior-of-a-restaurant.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/12277289/pexels-photo-12277289.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Moroccan riad / desert — lantern-lit courtyard dinners, guests on
  // cushioned terraces, Berber tent receptions under the Milky Way.
  moroccanLantern: [
    w("https://images.pexels.com/photos/1128782/pexels-photo-1128782.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/16043728/pexels-photo-16043728/free-photo-of-decorated-chandelier-over-flowers-for-wedding-ceremony.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/16865131/pexels-photo-16865131/free-photo-of-interior-of-a-restaurant.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/9901277/pexels-photo-9901277.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Modern Gulf ballroom — chandelier galas in Dubai, guests in formal
  // attire at floor-to-ceiling opulence, designer florals from ceiling to floor.
  modernGulfBallroom: [
    w("https://images.pexels.com/photos/31280461/pexels-photo-31280461/free-photo-of-elegant-banquet-hall-with-chandeliers.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/16043728/pexels-photo-16043728/free-photo-of-decorated-chandelier-over-flowers-for-wedding-ceremony.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/33852468/pexels-photo-33852468/free-photo-of-luxurious-wedding-banquet-hall-with-chandeliers.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Overwater & sandbank — South Pacific island ceremonies, guests wading
  // between overwater bungalows, intimate dinners above the lagoon.
  southPacific: [
    w("https://images.pexels.com/photos/169183/pexels-photo-169183.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/169206/pexels-photo-169206.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/33815162/pexels-photo-33815162/free-photo-of-beautiful-outdoor-wedding-ceremony-in-forest-setting.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/30897181/pexels-photo-30897181/free-photo-of-elegant-outdoor-wedding-reception-in-cdmx-forest.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Sydney harbour — modern harbour-side galas, guests at waterfront dinners,
  // contemporary Australian luxury with the harbour as backdrop.
  sydneyHarbour: [
    w("https://images.pexels.com/photos/271681/pexels-photo-271681.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/16865131/pexels-photo-16865131/free-photo-of-interior-of-a-restaurant.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/9080091/pexels-photo-9080091.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/7862573/pexels-photo-7862573.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // South African vineyard — Stellenbosch estate receptions, guests on
  // cellar terraces, Cape fynbos florals, mountain silhouettes at dusk.
  capeVineyard: [
    w("https://images.pexels.com/photos/19870036/pexels-photo-19870036/free-photo-of-wedding-table-decoration.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/32468906/pexels-photo-32468906/free-photo-of-romantic-outdoor-wedding-in-torroella-de-montgri.png?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/12876414/pexels-photo-12876414.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/3835638/pexels-photo-3835638.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Buenos Aires — tango bars alive with dancers, milonga evenings, estancia
  // asados under the eucalyptus trees, guests lost in the music.
  argentineTango: [
    w("https://images.pexels.com/photos/14608917/pexels-photo-14608917.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/1128782/pexels-photo-1128782.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/30235759/pexels-photo-30235759/free-photo-of-elegant-table-setting-with-white-roses-at-event.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/29040997/pexels-photo-29040997/free-photo-of-elegant-wedding-reception-table-setting.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Rio rooftop & beachside galas — samba energy at rooftop receptions,
  // guests dancing at sunset overlooking the bay.
  brazilianRooftop: [
    w("https://images.pexels.com/photos/3835638/pexels-photo-3835638.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/19655360/pexels-photo-19655360/free-photo-of-blue-lit-wedding-venue-with-a-garland-hanging-from-the-ceiling.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/29040997/pexels-photo-29040997/free-photo-of-elegant-wedding-reception-table-setting.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/9080091/pexels-photo-9080091.jpeg?auto=compress&cs=tinysrgb"),
  ],
  // Pacific Northwest — coastal modern weddings on cliffside lawns, forest
  // ceremonies under old-growth cedar, guests in nature's cathedral.
  pacificNorthwest: [
    w("https://images.pexels.com/photos/13931905/pexels-photo-13931905.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/9901277/pexels-photo-9901277.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/30897181/pexels-photo-30897181/free-photo-of-elegant-outdoor-wedding-reception-in-cdmx-forest.jpeg?auto=compress&cs=tinysrgb"),
    w("https://images.pexels.com/photos/31517332/pexels-photo-31517332/free-photo-of-elegant-floral-wedding-aisle-decoration.jpeg?auto=compress&cs=tinysrgb"),
  ],
} as const;

export type ArchetypeKey = keyof typeof archetypeGalleries;

// ---------- Per-destination editorial content ---------------------------

export type DestinationContent = {
  slug: string;
  name: string;
  country: string;
  region: string;
  category: string;
  type: "office" | "event";
  tagline: string;
  paragraphs: string[];
  hero: string;
  gallery: readonly string[];
  signature?: { label: string; detail: string }[];
  season?: string;
  notableEvents?: number;
  officeAddress?: string;
};

// Helper to convert "Lake Como" -> "lake-como", "St. Barths" -> "st-barths"
export const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const make = (
  partial: Omit<DestinationContent, "slug" | "hero" | "gallery"> & {
    archetype: ArchetypeKey;
  },
): DestinationContent => {
  const { archetype, ...rest } = partial;
  return {
    ...rest,
    slug: slugify(rest.name),
    hero: destinationPhotos[rest.name] ?? archetypeGalleries[archetype][0],
    gallery: archetypeGalleries[archetype],
  };
};

const list: DestinationContent[] = [
  // ===== ITALY =====
  make({
    name: "Lake Como",
    country: "Italy",
    region: "Italy",
    category: "Wedding",
    type: "event",
    tagline: "A Romance Above the Water",
    paragraphs: [
      "Lake Como remains the most cinematic stage we know. Eighteenth-century villas with terraced gardens spill down to the water, and the lake itself becomes the centrepiece — guests arrive by candlelit boat, cocktails are served on private boathouses, and dinner unfolds under frescoed loggias as the mountains turn pink.",
      "Our long relationships with Villa del Balbianello, Villa Pizzo, Villa Sola Cabiati, and Grand Hotel Tremezzo allow us to design weekends that feel entirely private — full takeovers, custom welcome arrivals from Bellagio, and after-parties on rooftop terraces overlooking the lights of Varenna.",
      "We typically design Lake Como weddings for ninety to one hundred and eighty guests over a three-day weekend, with a Friday welcome dinner on the water, a Saturday villa ceremony followed by a frescoed-room banquet, and a Sunday brunch on the gardens before the boats return.",
    ],
    signature: [
      { label: "Villa del Balbianello", detail: "Lakeside ceremonies on the loggia, with private boat arrivals from Lenno." },
      { label: "Villa Pizzo", detail: "Private full-property takeovers — five hectares of terraced gardens and statuary." },
      { label: "Grand Hotel Tremezzo", detail: "T Beach welcome dinners and rooftop after-parties above the lake." },
    ],
    season: "May – September",
    notableEvents: 14,
    archetype: "italianLake",
  }),
  make({
    name: "Tuscany",
    country: "Italy",
    region: "Italy",
    category: "Wedding",
    type: "event",
    tagline: "Cypress, Stone, and Light",
    paragraphs: [
      "Tuscany is our most-requested European destination — and the most forgiving stage. Hilltop borghi, centuries-old olive groves, farmhouse tables that stretch a hundred feet long under the stars. Every detail can soften, because the landscape is already doing the work.",
      "We produce weddings here in two distinct registers: the rustic-elegant farmhouse weekend (Borgo Santo Pietro, Castello di Casole, Castello di Vicarello) and the formal villa weekend (Villa Cetinale outside Siena, Villa Mangiacane near Florence). Both come with the same ingredients — long tables, candlelight, twelve courses — calibrated differently.",
      "The rhythm is unhurried. A Friday welcome lunch in the olive grove, a Saturday ceremony in a stone chapel with a sit-down dinner under the cypresses, and a Sunday morning at the local enoteca before guests scatter to Florence and Siena.",
    ],
    signature: [
      { label: "Borgo Santo Pietro", detail: "Whole-borgo takeovers with farm-to-table menus from the property's gardens." },
      { label: "Villa Cetinale", detail: "Seventeenth-century villa outside Siena — formal Italian gardens and a private chapel." },
      { label: "Castello di Casole", detail: "Restored castle estate near Siena, ideal for three-day takeovers of seventy to one hundred." },
    ],
    season: "May – October",
    notableEvents: 22,
    archetype: "italianGarden",
  }),
  make({
    name: "Amalfi Coast",
    country: "Italy",
    region: "Italy",
    category: "Wedding",
    type: "event",
    tagline: "Cliffside Celebrations",
    paragraphs: [
      "The Amalfi Coast is a vertical wedding. Lemon groves cascade into the sea, pastel villas cling to the cliffs, and dinner is served on terraces that hang above the water. The challenge is the geography itself — and we manage it with private boats, helicopter transfers from Naples, and meticulous logistics that guests never see.",
      "Belmond Hotel Caruso in Ravello is our most beloved venue — its infinity pool and the Belvedere terrace are the most photographed wedding location in Italy for good reason. We also produce events at Le Sirenuse in Positano and Villa Cimbrone for couples who want a private estate.",
      "Plan for May or September. The light is soft, the heat is forgiving, and the lemons are still on the trees.",
    ],
    signature: [
      { label: "Belmond Hotel Caruso, Ravello", detail: "Infinity-pool ceremonies and Belvedere dinners eleven hundred feet above the sea." },
      { label: "Villa Cimbrone, Ravello", detail: "Cloister ceremonies on the historic estate, with the Terrace of Infinity for cocktails." },
      { label: "Le Sirenuse, Positano", detail: "Restaurant La Sponda dinners with bougainvillea and views to Capri." },
    ],
    season: "May – September",
    notableEvents: 11,
    archetype: "italianCliffside",
  }),
  make({
    name: "Capri",
    country: "Italy",
    region: "Italy",
    category: "Anniversary",
    type: "event",
    tagline: "Island Glamour",
    paragraphs: [
      "Capri is the destination for milestone anniversaries and intimate celebrations of fewer than fifty. The island is small, the venues are tightly held, and the magic depends on a tight choreography of boats, beach clubs, and private terraces.",
      "We favour a long weekend: cocktails at La Fontelina with the Faraglioni at sunset, a vow-renewal at the Giardini di Augusto, dinner at Il Riccio with private dancing afterward at Anema e Core. Hôtel des Roses and Capri Palace serve as our base.",
      "August is glorious but crowded. Late June and the first half of September are our preferred windows.",
    ],
    signature: [
      { label: "La Fontelina", detail: "Sunset cocktails on the rocks below the Faraglioni — our preferred opening dinner." },
      { label: "Capri Palace", detail: "Anacapri property with the cleanest service on the island, perfect for full-buyout weekends." },
      { label: "Anema e Core", detail: "The legendary Capri tavern for after-dinner dancing — booked privately for our clients." },
    ],
    season: "June – September",
    notableEvents: 6,
    archetype: "italianCliffside",
  }),
  make({
    name: "Venice",
    country: "Italy",
    region: "Italy",
    category: "Gala",
    type: "event",
    tagline: "A City of Masks and Light",
    paragraphs: [
      "Venice is our city for galas and masked balls — the kind of event where guests arrive by water taxi to a private palazzo and the music begins on the piano nobile. Few cities deliver such immediate atmosphere; few are as logistically demanding.",
      "We produce events at Palazzo Pisani Moretta on the Grand Canal, Palazzo Brandolini, and Ca' Sagredo. After-parties move to Aman Venice or to private gardens reached only by gondola. Carnival week is our most-requested window — masks designed by Ca' Macana, costumes by Atelier Pietro Longhi.",
      "Plan a year ahead. Palazzo bookings during high season often close eighteen months out.",
    ],
    signature: [
      { label: "Palazzo Pisani Moretta", detail: "Frescoed ballrooms on the Grand Canal — the city's grandest private gala venue." },
      { label: "Aman Venice", detail: "Sixteenth-century palazzo for the after-party, with frescoed Tiepolo rooms and a private garden." },
      { label: "Ca' Sagredo", detail: "A working palazzo-hotel near Rialto, ideal for full-property weddings of one hundred." },
    ],
    season: "April – October",
    notableEvents: 7,
    archetype: "italianPalazzo",
  }),
  make({
    name: "Costa Smeralda",
    country: "Italy",
    region: "Italy",
    category: "Wedding",
    type: "event",
    tagline: "Sardinia's Emerald Coast",
    paragraphs: [
      "The Costa Smeralda is for weddings that double as yacht weeks. Guests arrive at Olbia and disperse to Hotel Pitrizza, Cala di Volpe, and Hotel Romazzino along the same five-mile stretch of coast — then converge on the water for ceremonies on hidden coves and dinners at Pevero.",
      "We design the weekend around the boats. A Friday welcome lunch on Spargi, a Saturday ceremony at a private cove with the wedding party arriving by tender, and a Sunday cruise through the Maddalena Archipelago with lunch at Cala Coticcio.",
      "August is peak season and prices reflect it. June and September deliver the same weather at half the rate.",
    ],
    signature: [
      { label: "Hotel Cala di Volpe", detail: "Aga Khan-era flagship with a private beach for ceremonies and a saltwater pool for receptions." },
      { label: "Hotel Pitrizza", detail: "Smaller, more discreet — the choice for two-couple takeovers of eighty guests." },
      { label: "Phi Beach, Forte Cappellini", detail: "Sunset cocktails on the granite cliffs, then dinner under the open sky." },
    ],
    season: "June – September",
    notableEvents: 6,
    archetype: "mediterraneanYacht",
  }),

  // ===== FRANCE =====
  make({
    name: "Paris",
    country: "France",
    region: "France",
    category: "Wedding",
    type: "event",
    tagline: "The Eternal City",
    paragraphs: [
      "Paris is our city for weddings of taste and restraint. We produce most of our Paris events at private hôtels particuliers in the Marais, the Hôtel de Crillon's Salon des Aigles, and the Ritz Paris's Salon Vendôme — all with the same quiet calibration: small ceremony, intimate dinner, dancing into the early hours.",
      "Receptions on the Seine — aboard a private yacht from Bateaux Parisiens or at the Pavillon Ledoyen on the Champs-Élysées — are our signature for couples who want the city itself as the backdrop.",
      "Most of our Paris weddings are between sixty and one hundred and twenty guests. The city is best in late spring and early autumn; we steer clients away from August, when most of our preferred suppliers are on holiday.",
    ],
    signature: [
      { label: "Ritz Paris", detail: "Salon Vendôme dinners and the Hemingway Bar for the after-party." },
      { label: "Hôtel de Crillon", detail: "Place de la Concorde views and the Salon des Aigles for ceremonies." },
      { label: "Pavillon Ledoyen", detail: "Private dining room on the Champs-Élysées with views of the Grand Palais." },
    ],
    season: "April – October",
    notableEvents: 18,
    archetype: "frenchChateau",
  }),
  make({
    name: "Provence",
    country: "France",
    region: "France",
    category: "Wedding",
    type: "event",
    tagline: "Lavender and Limestone",
    paragraphs: [
      "Provence weddings are about a long table, the smell of lavender at twilight, and a five-course menu cooked over open flame. The aesthetic is unfussy — linen napkins, terracotta pots, candles in mason jars — but every detail is sourced and considered.",
      "We work primarily out of three properties: Château La Coste in Le Puy-Sainte-Réparade, Domaine de Manville in Les Baux, and Le Mas de Pierre near Saint-Paul-de-Vence. Welcome dinners often happen at a small bistro in Lourmarin or Gordes that we book privately.",
      "June is the start of the lavender bloom. We typically design weekends in late June or early July when the flowers are at their fullest and the heat is still bearable.",
    ],
    signature: [
      { label: "Château La Coste", detail: "Working winery and art park — Tadao Ando architecture, sculpture by Calder and Bourgeois." },
      { label: "Domaine de Manville", detail: "Restored Provençal estate in Les Baux with a private chapel and a Michelin restaurant." },
      { label: "Le Mas de Pierre", detail: "Boutique relais near Saint-Paul-de-Vence — quiet pool, twenty-five suites, full buyout." },
    ],
    season: "May – September",
    notableEvents: 9,
    archetype: "provencalTable",
  }),
  make({
    name: "Saint-Tropez",
    country: "France",
    region: "France",
    category: "Birthday",
    type: "event",
    tagline: "Riviera Glamour",
    paragraphs: [
      "Saint-Tropez is for milestone birthdays and the kind of three-day weekend where the dress code shifts every six hours. We design villa takeovers above Pampelonne Beach, yacht-hopping receptions, and sunrise breakfasts on private terraces overlooking the harbour.",
      "Our base is usually Hotel Byblos or Cheval Blanc — both walk to the port. Beach clubs in heavy rotation: Club 55, La Réserve à la Plage, and Loulou Ramatuelle for sunset dinners.",
      "Plan for July or early August. Late August has the best parties but the heaviest crowds.",
    ],
    signature: [
      { label: "Hotel Byblos", detail: "Saint-Tropez institution with private courtyards and the Caves du Roy nightclub on-site." },
      { label: "Cheval Blanc St-Tropez", detail: "LVMH property at the edge of the village — private pool, gourmet kitchen, full buyout." },
      { label: "Club 55, Pampelonne", detail: "The original beach club — booked for daytime celebrations, still the most photographed table on the coast." },
    ],
    season: "June – September",
    notableEvents: 8,
    archetype: "mediterraneanYacht",
  }),
  make({
    name: "Chamonix",
    country: "France",
    region: "France",
    category: "Wedding",
    type: "event",
    tagline: "Alpine Cinema",
    paragraphs: [
      "Mont Blanc is the backdrop and the centrepiece. Chamonix winter weddings are small — usually fewer than seventy guests — and weighted toward the slower side of celebration: late lunches, fireside dinners, helicopter rides over the glaciers for the wedding party.",
      "We base out of Hameau Albert 1er, the family-run Relais & Châteaux, with welcome dinners at La Maison Carrier and ceremonies at the small chapel of Argentière. Torchlit après-ski receptions move to the property's terrace.",
      "Late January and early February deliver the best snow. June and August work for warm-weather alpine weddings with hiking and helicopter excursions.",
    ],
    signature: [
      { label: "Hameau Albert 1er", detail: "Two-Michelin-starred kitchen, twelve suites — the most beloved Relais property in the valley." },
      { label: "Le Refuge du Montenvers", detail: "1880s mountain refuge above the Mer de Glace — accessible by private train, dinner under the stars." },
      { label: "Mont Blanc Helicopters", detail: "Private heli-skiing and wedding-party flights to glacier landings." },
    ],
    season: "December – March, June – August",
    notableEvents: 5,
    archetype: "alpineWinter",
  }),

  // ===== SPAIN =====
  make({
    name: "Marbella",
    country: "Spain",
    region: "Spain",
    category: "Birthday",
    type: "event",
    tagline: "Andalusian Coast",
    paragraphs: [
      "Marbella is for clients who want Mediterranean weather without Italian prices — and a slightly more festive register. We design cliffside finca takeovers above Puerto Banús, flamenco-led welcome dinners, and three-day weekends that move from beach to mountain.",
      "Our preferred base is Marbella Club Hotel — the original Costa del Sol grande dame — with overflow at Puente Romano. Welcome dinners often happen at El Lago, the Michelin-starred restaurant in the hills above the city.",
      "Late May through early October is the season. We avoid August — the town doubles in population and our suppliers stretch thin.",
    ],
    signature: [
      { label: "Marbella Club Hotel", detail: "1954 founding property, Andalusian architecture, twelve acres of private gardens." },
      { label: "Puente Romano", detail: "Five-star resort with full beach-club takeovers and a tennis-club venue." },
      { label: "Trocadero Arena", detail: "Beach-club restaurant on Marbella's seafront, ideal for sunset welcome dinners." },
    ],
    season: "May – October",
    notableEvents: 7,
    archetype: "spanishCoast",
  }),
  make({
    name: "Ibiza",
    country: "Spain",
    region: "Spain",
    category: "Birthday",
    type: "event",
    tagline: "White Island Nights",
    paragraphs: [
      "Ibiza weddings and milestone birthdays come in two flavours: the cliff-top villa weekend (white linens, sunset ceremonies, Balearic-house sets after midnight) and the beach-club takeover (Cala Jondal at Blue Marlin, Las Salinas at El Chiringuito, El Silencio for the welcome).",
      "We work most often with private estates in San Lorenzo and Santa Gertrudis, where guests stay together in twenty-bedroom fincas and the celebrations stay private. Six Senses Ibiza serves as overflow for larger groups.",
      "May and June deliver the best weather and the smallest crowds. Late July and August are peak season — and our preferred week is the first ten days of September.",
    ],
    signature: [
      { label: "Six Senses Ibiza", detail: "Northern-coast resort with private bay access — full buyout for one hundred and forty guests." },
      { label: "Blue Marlin Ibiza", detail: "Cala Jondal beach club for Saturday-afternoon parties — booked privately." },
      { label: "El Silencio, Cala Moli", detail: "Private cove with thirty white-canvas tents — our favourite welcome-dinner location." },
    ],
    season: "May – October",
    notableEvents: 8,
    archetype: "spanishCoast",
  }),

  // ===== GREECE =====
  make({
    name: "Mykonos",
    country: "Greece",
    region: "Greece",
    category: "Wedding",
    type: "event",
    tagline: "Aegean Whites and Blues",
    paragraphs: [
      "Mykonos is white-on-white. Cliffside villas with infinity pools, bougainvillea-draped chapels, dinner-then-dancefloor evenings that stretch toward sunrise. The aesthetic is consistent and the weather is reliable — which makes it one of our easiest destinations to design for.",
      "We base most weddings out of private villas in Kalo Livadi, Agios Sostis, and Houlakia. Restaurant takeovers happen at Spilia, Hippie Fish, and Nammos. Ferries from Athens, Naxos, and Santorini make multi-island weekends straightforward.",
      "May and September are our preferred windows — the meltemi winds settle, the crowds thin, and the prices drop by half.",
    ],
    signature: [
      { label: "Cavo Tagoo", detail: "Boutique cliff hotel above Agios Stefanos — private infinity-pool ceremonies." },
      { label: "Nammos Mykonos", detail: "Psarou Beach restaurant — daytime takeovers and after-dinner parties." },
      { label: "Spilia Seaside Restaurant", detail: "Cave-side venue carved into the rocks at Agia Anna — most photographed welcome-dinner setting on the island." },
    ],
    season: "May – October",
    notableEvents: 10,
    archetype: "greekIsland",
  }),
  make({
    name: "Santorini",
    country: "Greece",
    region: "Greece",
    category: "Wedding",
    type: "event",
    tagline: "Caldera Sunsets",
    paragraphs: [
      "Santorini is the most photographed wedding location in the Mediterranean — and rightly so. Vow exchanges with the volcano in view, white-on-white tablescapes set against the caldera, private chapel ceremonies at sunset.",
      "We work almost exclusively in Imerovigli and Oia, where the cliff-side villas can be combined into multi-property takeovers for seventy to one hundred and twenty guests. Canaves Oia and Grace Hotel are our most-used venues.",
      "Sunset ceremonies are our trademark. We schedule the vows for forty minutes before sunset, dinner on the terrace afterward — the entire timing depends on the season's solar tables.",
    ],
    signature: [
      { label: "Canaves Oia", detail: "Cliffside suites carved into the caldera — most-requested ceremony location on the island." },
      { label: "Grace Hotel, Imerovigli", detail: "Auberge property with the Champagne Lounge for sunset cocktails." },
      { label: "Santo Wines Winery", detail: "Caldera-edge winery for welcome-dinner tastings, with the entire archipelago in view." },
    ],
    season: "May – October",
    notableEvents: 13,
    archetype: "greekIsland",
  }),

  // ===== UK =====
  make({
    name: "London",
    country: "United Kingdom",
    region: "United Kingdom",
    category: "Corporate",
    type: "event",
    tagline: "Stately and Modern",
    paragraphs: [
      "London is our home for boardroom-to-ballroom corporate productions. Annual partner dinners at the V&A's Raphael Cartoon Court, board offsites at Annabel's, product launches in the Tate Modern's Turbine Hall, and black-tie galas at Spencer House — most of our London work happens in spaces civilians never see.",
      "We work closely with the city's most discreet event teams: Bubble Food for the V&A, Rocket Food for Spencer House, and the Annabel's in-house team for private dinners. Hotels in heavy rotation include The Connaught, Claridge's, and The Berkeley.",
      "London is a year-round city. Our busiest months are May (election results, new fiscal year) and November (Christmas-season parties, year-end client dinners).",
    ],
    signature: [
      { label: "Spencer House", detail: "Princess Diana's ancestral home in St James's — five state rooms for galas of two hundred." },
      { label: "V&A, South Kensington", detail: "Raphael Cartoon Court and Cromwell Road entrance for after-hours private dinners." },
      { label: "Annabel's, Berkeley Square", detail: "The members' club for ultra-private corporate dinners and after-parties." },
    ],
    season: "Year round",
    notableEvents: 12,
    archetype: "londonBlackTie",
  }),

  // ===== CARIBBEAN =====
  make({
    name: "St. Barths",
    country: "Caribbean",
    region: "Caribbean",
    category: "Anniversary",
    type: "event",
    tagline: "Discreet Luxury",
    paragraphs: [
      "St. Barths is the Caribbean for clients who want absolute privacy. Villa takeovers on Gouverneur or Saline, private chef dinners on the cliff, yacht parties at Nikki Beach — and an unspoken understanding that no photos leave the island.",
      "We design most weekends from Hotel Le Toiny on the eastern coast — twenty-two suites, all with private pools — with Eden Rock as the in-town overflow. Welcome dinners often happen at L'Isola or Bonito; the after-party is always at Nikki Beach St Barth.",
      "December through April is high season. The first half of November is our preferred shoulder window: the weather has settled, the season hasn't begun, and the villas are wide open.",
    ],
    signature: [
      { label: "Hotel Le Toiny", detail: "Twenty-two-villa Relais on the wild eastern coast — private pools, private beach access." },
      { label: "Eden Rock, St Jean", detail: "On-the-sand boutique with the original Sand Bar and the Rémy de Haenen suite." },
      { label: "Nikki Beach St Barth", detail: "Champagne-spray Sundays on Saint-Jean Bay — booked privately for after-parties." },
    ],
    season: "December – April",
    notableEvents: 8,
    archetype: "caribbeanBeach",
  }),
  make({
    name: "Turks & Caicos",
    country: "Caribbean",
    region: "Caribbean",
    category: "Wedding",
    type: "event",
    tagline: "Quiet Beach Romance",
    paragraphs: [
      "Turks & Caicos is the calmer, quieter Caribbean. Barefoot ceremonies on Grace Bay, intimate dinners at Amanyara, and reef-side receptions for fewer than fifty. The aesthetic is unfussy: white linen, hurricane lamps, sand underfoot.",
      "Amanyara and COMO Parrot Cay are our two preferred bases — full property buyouts for forty to ninety guests. Welcome dinners happen at Coco Bistro in Providenciales; the ceremony is always on the beach.",
      "November through April delivers the best weather. We avoid September and October — peak hurricane season.",
    ],
    signature: [
      { label: "Amanyara", detail: "Aman's Caribbean property — thirty-eight private pavilions and a thousand acres of nature reserve." },
      { label: "COMO Parrot Cay", detail: "Private-island resort accessible only by boat — ideal for whole-island takeovers of seventy." },
      { label: "Coco Bistro, Providenciales", detail: "Caribbean restaurant under the palm canopy — our welcome-dinner standard." },
    ],
    season: "November – April",
    notableEvents: 6,
    archetype: "caribbeanBeach",
  }),
  make({
    name: "Mustique",
    country: "Caribbean",
    region: "Caribbean",
    category: "Birthday",
    type: "event",
    tagline: "A Private Island",
    paragraphs: [
      "Mustique is where you book the entire island. The Cotton House and Firefly handle thirty-five and twelve guests respectively; everyone else stays in the seventy private villas, which we coordinate through the Mustique Company.",
      "Whole-island takeovers, gala dinners on Macaroni Beach, beach barbecues for one hundred and fifty of your closest friends, and the famous Basil's Bar Wednesday-night jump-ups — all calibrated to feel like you've simply borrowed the island for a weekend.",
      "December through April is the only season that matters. We design most events around three or four days, with the welcome dinner at the Cotton House and the main event under the stars at Macaroni.",
    ],
    signature: [
      { label: "The Cotton House Hotel", detail: "Eighteenth-century plantation house — the social heart of the island." },
      { label: "Basil's Bar", detail: "Mick Jagger's favourite Mustique haunt — the Wednesday jump-up booked privately for our clients." },
      { label: "Macaroni Beach", detail: "The island's main beach — set up with thirty-foot tents for moonlit dinners." },
    ],
    season: "December – April",
    notableEvents: 4,
    archetype: "caribbeanBeach",
  }),
  make({
    name: "Punta Cana",
    country: "Dominican Republic",
    region: "Caribbean",
    category: "Wedding",
    type: "event",
    tagline: "Caribbean Modernism",
    paragraphs: [
      "Punta Cana is our destination for resort-buyout weddings. Whole-property takeovers at Eden Roc Cap Cana, beachfront ceremonies at sunset, welcome lunches under thatched palapas — the aesthetic is modern Caribbean, the scale is expansive.",
      "We typically design Punta Cana weekends for one hundred and twenty to two hundred guests, with most arriving from New York and Miami via private charter. Eden Roc handles forty suites; Tortuga Bay and Sanctuary Cap Cana absorb the overflow.",
      "December through April is the season. We steer clear of August and September — the heat and humidity break our suppliers.",
    ],
    signature: [
      { label: "Eden Roc Cap Cana", detail: "Boutique Relais with thirty-four luxury suites — full buyouts for one hundred-plus." },
      { label: "Tortuga Bay Puntacana Resort", detail: "Oscar de la Renta-designed villas on a private beach — overflow for our larger weddings." },
      { label: "La Yola Restaurant", detail: "Boat-shaped overwater venue at the Puntacana Marina — welcome-dinner standard." },
    ],
    season: "December – April",
    notableEvents: 7,
    archetype: "caribbeanBeach",
  }),

  // ===== UNITED STATES =====
  make({
    name: "The Hamptons",
    country: "United States",
    region: "United States",
    category: "Wedding",
    type: "event",
    tagline: "Beach Estate Affairs",
    paragraphs: [
      "The Hamptons remain the most consistent producer of estate weddings on the East Coast. Sailcloth tents on private oceanfront properties in East Hampton and Sagaponack, ocean-side rehearsal dinners at Wölffer or Topping Rose House, and Sunday brunches on the dunes before guests caravan back to the city.",
      "We work primarily out of private estates — most of our clients own or rent — with overflow accommodations at Topping Rose, Baker House 1650, and the Maidstone. The Atlantic Aviation hangar at East Hampton Airport handles private arrivals.",
      "Memorial Day through Labor Day is the formal season. Our preferred wedding dates are the second weekend of June and the first weekend of October.",
    ],
    signature: [
      { label: "Wölffer Estate Vineyard", detail: "Sagaponack winery for welcome dinners with vineyard ceremonies." },
      { label: "Topping Rose House, Bridgehampton", detail: "Tom Colicchio's restored 1842 mansion — our preferred guest-overflow accommodation." },
      { label: "EAST End Tents, by Stamford Tent", detail: "The sailcloth tent partner — installations of forty by one hundred and twenty feet." },
    ],
    season: "May – September",
    notableEvents: 19,
    archetype: "americanEstate",
  }),
  make({
    name: "Aspen",
    country: "United States",
    region: "United States",
    category: "Birthday",
    type: "event",
    tagline: "Mountain Magic",
    paragraphs: [
      "Aspen is our winter playground. Snow-day ceremonies on a private slope at Aspen Mountain, fireside dinners at the Little Nell, après-ski receptions with torches lining the slopes, and helicopter transfers from Denver for the city guests.",
      "The Little Nell remains our base — full buyouts for ninety to one hundred and twenty over a long weekend, with the Element 47 dining room for the welcome dinner and Ajax Tavern for the rehearsal lunch. Hotel Jerome handles overflow.",
      "We design Aspen events for two seasons: winter (December through March) and summer (late June through August, when the wildflowers are in bloom). Our most popular date is the long Presidents' Day weekend.",
    ],
    signature: [
      { label: "The Little Nell", detail: "Slope-side Forbes Five-Star property — full buyout for our winter weekends." },
      { label: "Hotel Jerome", detail: "Auberge-managed Victorian property — historic ceremonies in the J-Bar." },
      { label: "Cloud Nine Alpine Bistro", detail: "On-mountain restaurant accessible only by ski — Champagne-spray lunches with views into Highlands Bowl." },
    ],
    season: "December – March, June – August",
    notableEvents: 12,
    archetype: "alpineWinter",
  }),
  make({
    name: "Napa Valley",
    country: "United States",
    region: "United States",
    category: "Wedding",
    type: "event",
    tagline: "Vineyard Weekends",
    paragraphs: [
      "Napa weddings are three-day vineyard takeovers. Welcome lunches under century-old oaks, harvest dinners in barrel rooms, ceremonies on the lawn at Beaulieu Garden or Auberge du Soleil — and an unspoken commitment to serving only Napa wines from start to finish.",
      "We work with the most established vineyards in the valley — Inglenook, Beaulieu, Newton — and the boutique caterers (Paula LeDuc, Soiree by Souper) who can handle one-hundred-and-fifty-guest dinners in barrel rooms without losing the intimacy.",
      "Harvest season (late August through October) is our most-requested window — the vines are at their fullest and the rosé is just released.",
    ],
    signature: [
      { label: "Beaulieu Garden, Rutherford", detail: "Private one-acre garden adjacent to the historic vineyard — our most-used ceremony site." },
      { label: "Auberge du Soleil", detail: "Hilltop Relais & Châteaux — twenty-two suites with private terraces overlooking the valley." },
      { label: "Inglenook", detail: "Coppola family estate with the historic Château Inglenook for private dinners." },
    ],
    season: "April – October",
    notableEvents: 16,
    archetype: "vineyardWine",
  }),
  make({
    name: "Palm Beach",
    country: "United States",
    region: "United States",
    category: "Gala",
    type: "event",
    tagline: "Old World Florida",
    paragraphs: [
      "Palm Beach is the East Coast's grande dame — a town of estates, citrus groves, and the white-glove galas that define the winter social calendar. We produce Mar-a-Lago–era benefits, citrus-grove dinners at private homes, and black-tie events at The Breakers.",
      "The Breakers Palm Beach is our most-used venue — the Mediterranean Ballroom, the Ocean Lawn for ceremonies, and the original 1926 façade for portraiture. The Brazilian Court and The Colony serve as overflow accommodations.",
      "Season runs from Thanksgiving through the Easter weekend. Our two busiest dates: the Red Cross Ball weekend in late January and the Coconuts New Year's Eve party.",
    ],
    signature: [
      { label: "The Breakers Palm Beach", detail: "1926 Italian Renaissance landmark — Mediterranean Ballroom and Ocean Lawn for galas of three hundred." },
      { label: "Mar-a-Lago Club", detail: "Marjorie Merriweather Post's 1927 estate — winter benefits and member dinners." },
      { label: "The Colony Hotel", detail: "Pink-stucco postwar landmark — Polo Lounge welcome dinners and Royal Room cabaret." },
    ],
    season: "November – April",
    notableEvents: 14,
    archetype: "americanEstate",
  }),
  make({
    name: "Charleston",
    country: "United States",
    region: "United States",
    category: "Wedding",
    type: "event",
    tagline: "Southern Grace",
    paragraphs: [
      "Charleston weddings are Southern weddings done with restraint. Plantation-style ceremonies at Boone Hall or Magnolia Plantation, Gullah-influenced menus by Marion Sullivan, after-parties in cobblestone courtyards south of Broad — the city remains our most-requested Southern destination.",
      "Our base is Hotel Bennett or The Charleston Place; our preferred venues are the Lowndes Grove plantation, the William Aiken House for ceremonies, and Husk for the rehearsal dinner.",
      "Spring (March through May) and autumn (September through November) deliver the best weather. We avoid June through August — Charleston in summer is unforgiving.",
    ],
    signature: [
      { label: "Lowndes Grove Plantation", detail: "1786 antebellum estate on the Ashley River — our preferred ceremony venue." },
      { label: "William Aiken House", detail: "Restored 1807 Greek Revival mansion on King Street for welcome dinners." },
      { label: "Husk Restaurant", detail: "Sean Brock's heritage-Southern kitchen — rehearsal-dinner standard." },
    ],
    season: "March – May, September – November",
    notableEvents: 10,
    archetype: "americanEstate",
  }),

  // ===== MEXICO =====
  make({
    name: "Cabo San Lucas",
    country: "Mexico",
    region: "Mexico",
    category: "Wedding",
    type: "event",
    tagline: "Desert Meets Sea",
    paragraphs: [
      "Cabo is the meeting point of two ecosystems — the Sonoran desert and the Sea of Cortez — and our weddings here lean into the contrast. Cliffside ceremonies at Esperanza, beach welcome parties on Médano, mariachi-led after-hours at El Squid Roe.",
      "We design most weekends from Esperanza Auberge in Cabo San Lucas or Las Ventanas al Paraíso in San José del Cabo — both with full-property buyout availability. The drive between the two takes thirty minutes.",
      "October through May is the season. June through September is hot, humid, and risks tropical storms — we don't book then.",
    ],
    signature: [
      { label: "Esperanza, an Auberge Resort", detail: "Cliffside Auberge at Punta Ballena — fifty-seven suites with private terraces over the sea." },
      { label: "Las Ventanas al Paraíso", detail: "Rosewood property in San José del Cabo — adobe villas, private pools, and the Sea Grill restaurant." },
      { label: "Sunset Mona Lisa", detail: "Cliffside Italian restaurant on the Bay of Cabo — sunset-ceremony standard." },
    ],
    season: "October – May",
    notableEvents: 11,
    archetype: "mexicanCoastal",
  }),
  make({
    name: "Tulum",
    country: "Mexico",
    region: "Mexico",
    category: "Wedding",
    type: "event",
    tagline: "Jungle and Cenote",
    paragraphs: [
      "Tulum weddings happen in the jungle, in the cenotes, and on the beach — sometimes all three in the same weekend. Beach ceremonies at sunrise on the white-sand stretch below the Mayan ruins, cenote dinners by candlelight in the underground caves, barefoot dance floors under bougainvillea at Coqui Coqui.",
      "Our preferred bases are Be Tulum and Nômade — both with full-property buyout availability for sixty to ninety. Welcome dinners often happen at Hartwood; the after-party is always at Gitano.",
      "November through April is the dry season and the only one we recommend.",
    ],
    signature: [
      { label: "Be Tulum", detail: "Beachfront boutique with twenty private villas — our most-used base for jungle weddings." },
      { label: "Hartwood Tulum", detail: "Eric Werner's wood-fired kitchen on the beach road — rehearsal-dinner standard." },
      { label: "Cenote Suytun", detail: "Underground cave with a single shaft of light — most-photographed ceremony location in the Yucatán." },
    ],
    season: "November – April",
    notableEvents: 9,
    archetype: "mexicanCoastal",
  }),

  // ===== ASIA & PACIFIC =====
  make({
    name: "Kyoto",
    country: "Japan",
    region: "Asia & Pacific",
    category: "Anniversary",
    type: "event",
    tagline: "Quiet Splendor",
    paragraphs: [
      "Kyoto is our most considered destination. Private temple ceremonies at Kodai-ji or Shoren-in, kaiseki dinners in restored machiya townhouses, cherry-blossom processions at first light through the Philosopher's Path. Every detail honours the city's sense of quiet — the celebrations are small, the rituals carefully observed.",
      "We design Kyoto weekends from Aman Kyoto or HOSHINOYA Kyoto. Welcome dinners at Kikunoi, the three-Michelin-starred kaiseki institution. Cherry-blossom season (early April) and maple season (mid-November) are our two preferred windows.",
      "Plan eighteen months ahead — the temples and the top-rated kaiseki kitchens book that far out for private events.",
    ],
    signature: [
      { label: "Aman Kyoto", detail: "Private secret garden estate behind a ten-foot wall — twenty-six suites and a stillness you cannot manufacture." },
      { label: "Kodai-ji Temple", detail: "Sixteenth-century Zen temple with a private night-illumination ceremony." },
      { label: "Kikunoi Honten", detail: "Yoshihiro Murata's three-starred kaiseki — full buyout for our welcome dinners." },
    ],
    season: "March – May, October – November",
    notableEvents: 5,
    archetype: "japaneseTraditional",
  }),
  make({
    name: "Tokyo",
    country: "Japan",
    region: "Asia & Pacific",
    category: "Corporate",
    type: "event",
    tagline: "Precision and Pageantry",
    paragraphs: [
      "Tokyo is our city for product launches, brand activations, and the kind of corporate dinner where the menu is curated by a Michelin chef and the after-party happens in a Shibuya members' club at three in the morning.",
      "We work most often in Roppongi (Aman Tokyo, Andaz Tokyo Toranomon Hills) and Marunouchi (Palace Hotel Tokyo). Restaurant takeovers happen at Ryugin, Sushi Saito, and Den. After-parties move to Bar Tres or Gen Yamamoto in Roppongi.",
      "Tokyo is a year-round city. Our busiest months are October (the autumn business season) and March (the spring sakura window).",
    ],
    signature: [
      { label: "Aman Tokyo", detail: "Otemachi Tower 33rd floor — eighty-four rooms, the largest spa in the city, and the most discreet check-in in Japan." },
      { label: "Palace Hotel Tokyo", detail: "Marunouchi flagship overlooking the Imperial Palace — Crown ballroom for two-hundred-guest galas." },
      { label: "Ryugin", detail: "Three-Michelin-starred contemporary kaiseki by Seiji Yamamoto — full buyout for our launch dinners." },
    ],
    season: "Year round",
    notableEvents: 11,
    archetype: "japaneseTraditional",
  }),
  make({
    name: "Bali",
    country: "Indonesia",
    region: "Asia & Pacific",
    category: "Wedding",
    type: "event",
    tagline: "Ceremony in the Green",
    paragraphs: [
      "Bali weddings are tropical and restorative. Cliff-edge ceremonies at Uluwatu, jungle dinners at Bambu Indah in Ubud, welcome rituals led by Balinese priests with offerings of frangipani and incense. The aesthetic is unforced — every detail draws from the island itself.",
      "We work primarily on three coasts: Uluwatu (Bulgari Resort and Alila Villas) for cliff weddings, Ubud (COMO Shambhala Estate and Bambu Indah) for jungle weddings, and Seminyak (The Legian) for beachfront. Most of our weekends combine two coasts over four days.",
      "April through October is the dry season — the only window we recommend for outdoor ceremonies.",
    ],
    signature: [
      { label: "Bulgari Resort Bali", detail: "Cliff-top property at Uluwatu — fifty-nine villas with private pools and the Il Ristorante by Niko Romito." },
      { label: "COMO Shambhala Estate", detail: "Wellness retreat in Ubud — terraced jungle villas and traditional Balinese ceremony site." },
      { label: "Bambu Indah", detail: "John Hardy's bamboo-architecture property in Sayan — antique Javanese houses for jungle dinners." },
    ],
    season: "April – October",
    notableEvents: 7,
    archetype: "balineseGarden",
  }),
  make({
    name: "Mumbai",
    country: "India",
    region: "Asia & Pacific",
    category: "Wedding",
    type: "event",
    tagline: "A Symphony of Celebration",
    paragraphs: [
      "Mumbai weddings are productions in the truest sense — multi-day Indian celebrations of breathtaking scale and colour, with sangeet, mehndi, and reception each treated as its own event. Three days, four hundred guests, and a different aesthetic for every function.",
      "We base most Mumbai weddings out of the Taj Mahal Palace or the Four Seasons. Sangeets often happen at the Royal Opera House; the mehndi by the pool at the Taj Land's End; the main reception at the Grand Hyatt or at private estates in Alibaug.",
      "November through February is the season. The monsoon (June to September) and the heat (April to May) make outdoor functions impractical.",
    ],
    signature: [
      { label: "Taj Mahal Palace, Colaba", detail: "1903 landmark on the Gateway of India — the Crystal Ballroom for sangeets and the Sea Lounge for after-parties." },
      { label: "Royal Opera House, Girgaon", detail: "Restored 1911 Baroque opera house — sangeet-night standard." },
      { label: "Soho House Mumbai, Juhu", detail: "Members' club on Juhu Beach — private rooftop for welcome events." },
    ],
    season: "November – February",
    notableEvents: 6,
    archetype: "indianMandap",
  }),
  make({
    name: "Udaipur",
    country: "India",
    region: "Asia & Pacific",
    category: "Wedding",
    type: "event",
    tagline: "City of Lakes",
    paragraphs: [
      "Udaipur is the Indian wedding destination — palace takeovers on Lake Pichola, processions of caparisoned horses through the city gates, ceremonies in marble courtyards lit by ten thousand candles. The scale is operatic and the logistics extraordinary.",
      "We design most weekends from the Taj Lake Palace (a full-island property accessible only by boat) or the Oberoi Udaivilas. The City Palace handles the largest functions — sangeets and the main reception. Private boats ferry guests across Lake Pichola at every meal.",
      "October through March is the season. The light at sunset on the lake is the reason every Udaipur wedding lingers in memory.",
    ],
    signature: [
      { label: "Taj Lake Palace", detail: "1746 marble palace floating on Lake Pichola — eighty-three rooms, accessible only by boat." },
      { label: "Oberoi Udaivilas", detail: "Thirty-acre lakefront property with private pool suites and a private ghat for boat arrivals." },
      { label: "City Palace, Udaipur", detail: "Twentieth-largest palace complex in the world — the Manek Chowk courtyard for grand-scale receptions." },
    ],
    season: "October – March",
    notableEvents: 8,
    archetype: "indianMandap",
  }),
  make({
    name: "Sydney",
    country: "Australia",
    region: "Asia & Pacific",
    category: "Gala",
    type: "event",
    tagline: "Harbour Galas",
    paragraphs: [
      "Sydney is for harbour-side galas with the Opera House as a backdrop. We design dinners on the upper terraces of the Opera House itself, private cruises following dinner under the stars, and after-parties at the Quay restaurant or at private homes in Vaucluse.",
      "Our preferred bases are the Park Hyatt (with the unobstructed Opera House view) and the Capella Sydney. Private yachts come from MV Solways or the Sydney Princess fleet.",
      "October through April is the Southern Hemisphere summer season — and the only window we recommend for harbour-side events.",
    ],
    signature: [
      { label: "Park Hyatt Sydney", detail: "The Rocks property with the only direct unobstructed view of the Opera House — rooftop ceremonies at sunset." },
      { label: "Sydney Opera House", detail: "Northern Foyer and Bennelong restaurant available for private after-hours dinners." },
      { label: "Quay Restaurant", detail: "Peter Gilmore's three-hatted kitchen above the Overseas Passenger Terminal — welcome-dinner standard." },
    ],
    season: "October – April",
    notableEvents: 6,
    archetype: "sydneyHarbour",
  }),
  make({
    name: "Bora Bora",
    country: "French Polynesia",
    region: "Asia & Pacific",
    category: "Anniversary",
    type: "event",
    tagline: "South Pacific Privacy",
    paragraphs: [
      "Bora Bora is our destination for milestone anniversaries — a place so geographically remote that the celebration becomes the entire trip. Overwater bungalow ceremonies, motu picnics for the wedding party on the surrounding islets, Polynesian outrigger arrivals at sunset.",
      "We design most weekends from the Four Seasons Bora Bora or the St Regis. Both have private overwater chapel options. Welcome dinners typically happen on a private motu, with the resort tendering guests across the lagoon at sundown.",
      "April through November is the dry season. Our preferred window is mid-September through October — the lowest crowds, the best weather.",
    ],
    signature: [
      { label: "Four Seasons Resort Bora Bora", detail: "One-hundred-and-twelve overwater bungalows on a private motu — full ceremony coordination on-site." },
      { label: "The St. Regis Bora Bora Resort", detail: "Larger property with the original Bora Bora overwater chapel and dedicated wedding pavilion." },
      { label: "Motu Tane", detail: "Privately-owned islet for full-buyout celebrations — the most exclusive ceremony location in the lagoon." },
    ],
    season: "April – November",
    notableEvents: 4,
    archetype: "southPacific",
  }),
  make({
    name: "Maldives",
    country: "Maldives",
    region: "Asia & Pacific",
    category: "Anniversary",
    type: "event",
    tagline: "Whole Island Celebrations",
    paragraphs: [
      "The Maldives is our destination for whole-island takeovers. Soneva Jani, Cheval Blanc Randheli, and Velaa Private Island all support full-resort buyouts for forty to ninety guests over four to seven days — sandbank dinners under the Milky Way, sunrise yoga ceremonies, dolphin cruises, and the deepest stillness you can find on the planet.",
      "Soneva Jani is our most-used base — the property's Cinema Paradiso (an open-air overwater cinema) handles welcome events; the Crab Shack on the lagoon does seafood dinners; the unmarked sandbank between two reef breaks is reserved for the ceremony itself.",
      "November through April is the dry season. We avoid the May-to-October monsoon entirely.",
    ],
    signature: [
      { label: "Soneva Jani", detail: "Twenty-five overwater villas across five islands — our most-used Maldives property for buyouts." },
      { label: "Cheval Blanc Randheli", detail: "LVMH's island property in Noonu Atoll — forty-five villas across an entire private island." },
      { label: "Velaa Private Island", detail: "Forty-seven-villa property in Noonu Atoll — overwater villas, a Romain Avril restaurant, full buyouts of sixty." },
    ],
    season: "November – April",
    notableEvents: 5,
    archetype: "southPacific",
  }),

  // ===== AFRICA & MIDDLE EAST =====
  make({
    name: "Marrakech",
    country: "Morocco",
    region: "Africa & Middle East",
    category: "Birthday",
    type: "event",
    tagline: "An Andalusian Dream",
    paragraphs: [
      "Marrakech weddings and milestone birthdays are three-day immersions. Riad takeovers in the Medina, candlelit dinners in the Agafay desert, hammam afternoons at La Mamounia, souk crawls led by our local fixers, and a final-night dinner under five hundred lanterns at Beldi Country Club.",
      "We base most events from La Mamounia or the Royal Mansour — both palace properties, both with full-buyout availability. The Agafay desert (an hour's drive from the city) hosts the dinner that everyone remembers, with Berber rugs, low brass tables, and the sound of qraqeb at dusk.",
      "October through April is the season. We avoid the summer heat (June through August) entirely.",
    ],
    signature: [
      { label: "La Mamounia", detail: "1923 palace hotel with eight acres of gardens — full buyout for one hundred and twenty guests." },
      { label: "Royal Mansour Marrakech", detail: "Mohammed VI's palace project — fifty-three private riads, each with its own pool and rooftop." },
      { label: "Agafay Desert by Inara Camp", detail: "Luxury tented camp forty-five minutes from the city — Berber dinner setting under the stars." },
    ],
    season: "October – April",
    notableEvents: 15,
    archetype: "moroccanLantern",
  }),
  make({
    name: "Cairo",
    country: "Egypt",
    region: "Africa & Middle East",
    category: "Gala",
    type: "event",
    tagline: "An Ancient Stage",
    paragraphs: [
      "Cairo galas happen in the shadow of the pyramids. We produce private museum receptions at the new Grand Egyptian Museum, felucca dinners on the Nile, and after-hours pyramid-plateau dinners with the Sphinx illuminated and a string quartet under the stars.",
      "Our base is usually The Nile Ritz-Carlton or the Marriott Mena House (with the most direct pyramid views). Felucca cruises depart from the Maadi corniche; pyramid-plateau dinners require eight weeks of permitting.",
      "October through March is the season. We avoid May through September — the heat is incompatible with formalwear.",
    ],
    signature: [
      { label: "Marriott Mena House", detail: "1869 royal hunting lodge at the foot of the Giza Pyramids — direct pyramid views from the gardens." },
      { label: "The Grand Egyptian Museum", detail: "Newly-opened museum at Giza — private gala access to the Tutankhamun galleries by special arrangement." },
      { label: "Sound and Light Show, Giza Plateau", detail: "Private after-hours pyramid-plateau dinner with the monuments illuminated." },
    ],
    season: "October – March",
    notableEvents: 4,
    archetype: "moroccanLantern",
  }),
  make({
    name: "Dubai",
    country: "UAE",
    region: "Africa & Middle East",
    category: "Corporate",
    type: "event",
    tagline: "Skyline & Sand",
    paragraphs: [
      "Dubai is our destination for brand activations on the seventy-third floor, desert galas under canopy tents in the Al Maha reserve, and yacht parties off the Palm Jumeirah. The pace is fast, the production values are operatic, and the suppliers can deliver anything within forty-eight hours.",
      "We work most often in DIFC and Downtown — Burj Al Arab, Atlantis The Royal, Bvlgari Resort Dubai, and the One&Only Royal Mirage. Desert galas happen at Al Maha or Bab Al Shams; yacht charters launch from Marina Yacht Club.",
      "October through April is the season. We avoid May through September — the heat exceeds 110°F daily.",
    ],
    signature: [
      { label: "Bvlgari Resort Dubai", detail: "Jumeira Bay seahorse-shaped island — one hundred and one rooms with a private marina and the Yacht Club lounge." },
      { label: "Al Maha Desert Resort", detail: "Marriott Luxury Collection property in the Dubai Desert Conservation Reserve — full buyout for desert galas." },
      { label: "Atlantis The Royal", detail: "Newest landmark on the Palm — the Cloud 22 rooftop and the Skyblaze fireworks platform for product launches." },
    ],
    season: "October – April",
    notableEvents: 9,
    archetype: "modernGulfBallroom",
  }),
  make({
    name: "Cape Town",
    country: "South Africa",
    region: "Africa & Middle East",
    category: "Wedding",
    type: "event",
    tagline: "Where Two Oceans Meet",
    paragraphs: [
      "Cape Town weddings are weekend takeovers of vineyards in Stellenbosch and Franschhoek, with safari extensions in the Sabi Sands or the Madikwe Reserve in the days before or after. The aesthetic is wine-country elegance — and the value is unmatched in the luxury market.",
      "Our preferred bases in the Cape Winelands are Babylonstoren and La Residence — both Relais & Châteaux properties with full-buyout availability. Welcome dinners often happen at the Test Kitchen or at La Colombe.",
      "October through April is the Southern Hemisphere summer. February harvests are our preferred window.",
    ],
    signature: [
      { label: "Babylonstoren, Franschhoek", detail: "Three-hundred-year-old farm with a Cape Dutch manor and an eight-acre garden — wedding-weekend buyouts for sixty." },
      { label: "La Residence, Franschhoek", detail: "Royal Portfolio property with eleven suites — boutique-scale weddings of fewer than seventy." },
      { label: "Cape Grace Hotel, V&A Waterfront", detail: "Quay-side luxury hotel in the city — overflow accommodations for guests arriving from Cape Town International." },
    ],
    season: "October – April",
    notableEvents: 7,
    archetype: "capeVineyard",
  }),

  // ===== AMERICAS (other) =====
  make({
    name: "Buenos Aires",
    country: "Argentina",
    region: "Americas",
    category: "Corporate",
    type: "event",
    tagline: "Tango and Steak",
    paragraphs: [
      "Buenos Aires is our destination for clients who want a long weekend that feels like an entire other life. Estancia takeovers an hour outside the city, private milongas in San Telmo with the city's best tango couples, chef-led asado dinners under the southern sky.",
      "Our preferred base in the city is the Palacio Duhau Park Hyatt or the Faena Hotel; for estancia weekends, we work with La Bamba de Areco and Estancia Villa María. Tango performances are arranged through Rojo Tango (the resident company at Faena).",
      "October through April is the Southern Hemisphere season. November and March are our preferred shoulder months.",
    ],
    signature: [
      { label: "Faena Hotel Buenos Aires", detail: "Philippe Starck-designed Puerto Madero property — Rojo Tango show on-site, El Mercado kitchen by Francis Mallmann." },
      { label: "Palacio Duhau Park Hyatt", detail: "1934 palace property in Recoleta with the Oak Bar and the Duhau Restaurant for formal welcome dinners." },
      { label: "La Bamba de Areco", detail: "Restored 1830 estancia ninety minutes from the city — Relais & Châteaux full buyout for forty." },
    ],
    season: "October – April",
    notableEvents: 5,
    archetype: "argentineTango",
  }),
  make({
    name: "Rio de Janeiro",
    country: "Brazil",
    region: "Americas",
    category: "Gala",
    type: "event",
    tagline: "Carnaval Energy",
    paragraphs: [
      "Rio is the highest-energy destination in our network. Rooftop galas overlooking Copacabana, samba-school after-parties in Vila Isabel, beachside welcome drinks at sunset, and a sound that doesn't fade until first light.",
      "Our preferred base is the Copacabana Palace (a Belmond property) — the rooftop pool deck handles galas of two hundred, and the Cipriani restaurant on-property handles welcome dinners. Janeiro Hotel in Leblon serves as the more discreet alternative.",
      "May through October is the dry season. Carnaval (late February) is the city's signature week — but our most-requested non-Carnaval window is the long Independence Day weekend in early September.",
    ],
    signature: [
      { label: "Belmond Copacabana Palace", detail: "1923 Art Deco landmark on the beach — the rooftop pool deck for galas, the Pérgula restaurant for welcome dinners." },
      { label: "Janeiro Hotel, Leblon", detail: "Boutique beachfront property with twenty-two rooms — full buyout for intimate weekends." },
      { label: "Mangueira Samba School", detail: "Rio's oldest samba school — booked privately for after-party rehearsals on Wednesday nights." },
    ],
    season: "May – October",
    notableEvents: 4,
    archetype: "brazilianRooftop",
  }),
  make({
    name: "Vancouver",
    country: "Canada",
    region: "Americas",
    category: "Wedding",
    type: "event",
    tagline: "Coastal Modern",
    paragraphs: [
      "Vancouver weddings are coastal modern — ocean-side ceremonies on the Sunshine Coast, intimate dinners at Hawksworth in the city, float-plane day trips for guests to the Gulf Islands. The aesthetic is restrained, the seafood is the star, and the views of the North Shore mountains are the constant.",
      "Our preferred base is the Fairmont Pacific Rim or the Rosewood Hotel Georgia. Welcome dinners happen at Hawksworth, Boulevard Kitchen & Oyster Bar, or Botanist. Float-plane charters depart from the Vancouver Harbour Flight Centre.",
      "May through September is the season. June and September deliver the best weather without the August crowds.",
    ],
    signature: [
      { label: "Fairmont Pacific Rim", detail: "Coal Harbour landmark with full-floor presidential suites and the Lobby Lounge for welcome receptions." },
      { label: "Rosewood Hotel Georgia", detail: "1927 landmark in downtown Vancouver — Hawksworth Restaurant on-site for rehearsal dinners." },
      { label: "Sonora Resort", detail: "Relais & Châteaux private-island property accessible only by float plane — full buyout for eighty guests." },
    ],
    season: "May – September",
    notableEvents: 6,
    archetype: "pacificNorthwest",
  }),
  make({
    name: "Banff",
    country: "Canada",
    region: "Americas",
    category: "Wedding",
    type: "event",
    tagline: "Cathedral of the Rockies",
    paragraphs: [
      "Banff is our destination for couples who want the Canadian Rockies as the cathedral. Lakeside ceremonies at Moraine Lake or Lake Louise, fireside dinners at the Fairmont Banff Springs, mountain helicopter rides for the bridal party, and a stillness that no other destination in our network matches.",
      "Our base is the Fairmont Banff Springs (the 1888 castle property) or the Fairmont Chateau Lake Louise — both with direct lake views and full-buyout availability for ninety guests. Helicopters fly out of Canmore.",
      "Late June through September is the summer season; December through February is the winter season. October and May are mud months — we avoid them.",
    ],
    signature: [
      { label: "Fairmont Banff Springs", detail: "1888 Castle in the Rockies — the Mount Stephen Hall for ballroom dinners and the Cascade Ballroom for galas of three hundred." },
      { label: "Fairmont Chateau Lake Louise", detail: "Lake-side property with direct ceremony access at the water's edge — most-photographed wedding location in Canada." },
      { label: "Alpine Helicopters, Canmore", detail: "Private heli-tours of Mount Assiniboine and the Three Sisters for the bridal party." },
    ],
    season: "June – September, December – February",
    notableEvents: 5,
    archetype: "alpineWinter",
  }),

  // ===== OFFICES =====
  make({
    name: "New York",
    country: "United States",
    region: "Aurelia Offices",
    category: "Office",
    type: "office",
    tagline: "The Flagship Atelier",
    paragraphs: [
      "Our founding studio, perched above Fifth Avenue, is where every Aurelia event begins. From this address we orchestrate weddings on six continents, with a team of designers, planners, and producers fluent in the language of luxury.",
      "The New York team handles all Manhattan weddings (rooftop receptions, Plaza ballroom galas, Central Park ceremonies), the Hamptons summer season, and our entire Caribbean portfolio. Our atelier hosts client design days each Wednesday — by appointment only.",
      "Our most-produced Manhattan venues: The Plaza, The Pierre, The Rainbow Room, The Glasshouse, and the Jane's Carousel pavilion under the Brooklyn Bridge.",
    ],
    signature: [
      { label: "Atelier", detail: "150 Fifth Avenue, Suite 1200 — by appointment, Monday through Friday." },
      { label: "Phone", detail: "+1 (212) 555-0100 — direct to the founding partners." },
      { label: "Bookings horizon", detail: "Currently quoting 2026 and 2027 weekend dates." },
    ],
    officeAddress: "150 Fifth Avenue · Suite 1200",
    archetype: "americanUrban",
  }),
  make({
    name: "Los Angeles",
    country: "United States",
    region: "Aurelia Offices",
    category: "Office",
    type: "office",
    tagline: "West Coast Studio",
    paragraphs: [
      "An open-air atelier on Sunset Boulevard, our Los Angeles team specialises in cinematic celebrations — from the canyons of Malibu to the vineyards of Napa. Every project from the West Coast office is led by Sara Atallah, our Los Angeles managing partner since 2018.",
      "The LA team handles all West Coast weddings (Beverly Hills estates, Malibu beach ceremonies, Ojai retreats), the Aspen winter season, and our entire Hawaiian portfolio. Studio visits happen by appointment on Tuesdays and Thursdays.",
      "Most-produced LA venues: the Hotel Bel-Air, the Beverly Hills Hotel, the Annenberg Beach House in Santa Monica, and Saddlerock Ranch in Malibu Wine Country.",
    ],
    signature: [
      { label: "Studio", detail: "9000 Sunset Boulevard — by appointment, Tuesdays and Thursdays." },
      { label: "Phone", detail: "+1 (310) 555-0150 — direct to Sara Atallah." },
      { label: "Bookings horizon", detail: "2026 weekend dates open; 2027 dates released January 1." },
    ],
    officeAddress: "9000 Sunset Boulevard",
    archetype: "americanUrban",
  }),
  make({
    name: "Miami",
    country: "United States",
    region: "Aurelia Offices",
    category: "Office",
    type: "office",
    tagline: "The Tropical Bureau",
    paragraphs: [
      "Our Miami office is the gateway to Latin America and the Caribbean — a hub for tropical weddings, yacht-side receptions, and private island takeovers. Led by Sofía Reyes, our Miami managing partner since 2020.",
      "The Miami team handles all Florida weddings (Palm Beach galas, Coral Gables estates, Star Island private dinners), the Mexican Riviera season, and our entire Latin American portfolio (Cartagena, Punta del Este, São Paulo).",
      "Most-produced Miami venues: The Setai, the Faena Hotel Miami Beach, Vizcaya Museum & Gardens, and the Pérez Art Museum Miami.",
    ],
    signature: [
      { label: "Bureau", detail: "100 Biscayne Boulevard — Brickell tower studio, by appointment." },
      { label: "Phone", detail: "+1 (305) 555-0175 — direct to Sofía Reyes." },
      { label: "Bookings horizon", detail: "Currently booking 2026 weekend dates." },
    ],
    officeAddress: "100 Biscayne Boulevard",
    archetype: "americanUrban",
  }),
  make({
    name: "Florence",
    country: "Italy",
    region: "Aurelia Offices",
    category: "Office",
    type: "office",
    tagline: "The European House",
    paragraphs: [
      "Tucked behind the Arno on Via de' Tornabuoni, our European house holds decades-long relationships with the families who own Italy's most exquisite estates. Led by Beatrice Conti, our European managing partner since 2015.",
      "The Florence team handles all European weddings (Lake Como, Tuscany, Amalfi, Capri, Venice, Provence, the Côte d'Azur, and the Greek Islands), with a dedicated production office in Paris and a satellite team in Athens.",
      "Most-produced Florence venues: Villa Cetinale outside Siena, Villa Mangiacane near Florence, the Four Seasons Florence, and Borgo Santo Pietro in southern Tuscany.",
    ],
    signature: [
      { label: "House", detail: "Via de' Tornabuoni, 15 — by appointment, Monday through Friday." },
      { label: "Phone", detail: "+39 055 555 0185 — direct to Beatrice Conti." },
      { label: "Bookings horizon", detail: "European 2026 dates open; 2027 dates released March 1." },
    ],
    officeAddress: "Via de' Tornabuoni, 15",
    archetype: "italianGarden",
  }),
];

export const destinationContent: Record<string, DestinationContent> = Object.fromEntries(
  list.map((d) => [d.slug, d]),
);

export const allDestinationContent = list;
