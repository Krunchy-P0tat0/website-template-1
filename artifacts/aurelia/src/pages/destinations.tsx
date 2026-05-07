import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { destinationPhotos } from "../lib/realPhotos";
import { slugify } from "../lib/destinationContent";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function photoFor(name: string, fallback?: string): string | undefined {
  return destinationPhotos[name] || fallback;
}

type Location = {
  name: string;
  country: string;
  coordinates: [number, number];
  type: "office" | "event";
  category?: string;
  image?: string;
  tagline?: string;
  story?: string;
  signature?: string;
  notableEvents?: number;
  bestSeason?: string;
};

const offices: Location[] = [
  {
    name: "New York",
    country: "United States",
    coordinates: [-74.006, 40.7128],
    type: "office",
    tagline: "The Flagship Atelier",
    story:
      "Our founding studio, perched above Fifth Avenue, is where every Aurelia event begins. From this address we orchestrate weddings on six continents, with a team of designers, planners, and producers fluent in the language of luxury.",
    signature: "150 Fifth Avenue · Suite 1200",
  },
  {
    name: "Los Angeles",
    country: "United States",
    coordinates: [-118.2437, 34.0522],
    type: "office",
    tagline: "West Coast Studio",
    story:
      "An open-air atelier on Sunset Boulevard, our Los Angeles team specializes in cinematic celebrations — from the canyons of Malibu to the vineyards of Napa.",
    signature: "9000 Sunset Boulevard",
  },
  {
    name: "Miami",
    country: "United States",
    coordinates: [-80.1918, 25.7617],
    type: "office",
    tagline: "The Tropical Bureau",
    story:
      "Our Miami office is the gateway to Latin America and the Caribbean — a hub for tropical weddings, yacht-side receptions, and private island takeovers.",
    signature: "100 Biscayne Boulevard",
  },
  {
    name: "Florence",
    country: "Italy",
    coordinates: [11.2558, 43.7696],
    type: "office",
    tagline: "The European House",
    story:
      "Tucked behind the Arno on Via de' Tornabuoni, our European house holds decades-long relationships with the families who own Italy's most exquisite estates.",
    signature: "Via de' Tornabuoni, 15",
  },
];

const eventLocations: Location[] = [
  {
    name: "Lake Como",
    country: "Italy",
    coordinates: [9.2572, 45.9881],
    type: "event",
    category: "Wedding",
    tagline: "A Romance Above the Water",
    notableEvents: 14,
    bestSeason: "May – September",
  },
  {
    name: "Tuscany",
    country: "Italy",
    coordinates: [11.2486, 43.7711],
    type: "event",
    category: "Wedding",
    tagline: "Cypress, Stone, and Light",
    notableEvents: 22,
    bestSeason: "May – October",
  },
  {
    name: "Amalfi Coast",
    country: "Italy",
    coordinates: [14.6026, 40.634],
    type: "event",
    category: "Wedding",
    tagline: "Cliffside Celebrations",
    notableEvents: 11,
    bestSeason: "May – September",
  },
  {
    name: "Capri",
    country: "Italy",
    coordinates: [14.2429, 40.5532],
    type: "event",
    category: "Anniversary",
    tagline: "Island Glamour",
    notableEvents: 6,
    bestSeason: "June – September",
  },
  {
    name: "Venice",
    country: "Italy",
    coordinates: [12.3155, 45.4408],
    type: "event",
    category: "Gala",
    tagline: "A City of Masks and Light",
    notableEvents: 7,
    bestSeason: "April – October",
  },
  {
    name: "Paris",
    country: "France",
    coordinates: [2.3522, 48.8566],
    type: "event",
    category: "Wedding",
    tagline: "The Eternal City",
    notableEvents: 18,
    bestSeason: "April – October",
  },
  {
    name: "Provence",
    country: "France",
    coordinates: [5.3863, 43.9352],
    type: "event",
    category: "Wedding",
    tagline: "Lavender and Limestone",
    notableEvents: 9,
    bestSeason: "May – September",
  },
  {
    name: "Saint-Tropez",
    country: "France",
    coordinates: [6.6406, 43.2727],
    type: "event",
    category: "Birthday",
    tagline: "Riviera Glamour",
    notableEvents: 8,
    bestSeason: "June – September",
  },
  {
    name: "London",
    country: "United Kingdom",
    coordinates: [-0.1276, 51.5074],
    type: "event",
    category: "Corporate",
    tagline: "Stately and Modern",
    notableEvents: 12,
    bestSeason: "Year round",
  },
  {
    name: "Mykonos",
    country: "Greece",
    coordinates: [25.3289, 37.4467],
    type: "event",
    category: "Wedding",
    tagline: "Aegean Whites and Blues",
    notableEvents: 10,
    bestSeason: "May – October",
  },
  {
    name: "Santorini",
    country: "Greece",
    coordinates: [25.4615, 36.3932],
    type: "event",
    category: "Wedding",
    tagline: "Caldera Sunsets",
    notableEvents: 13,
    bestSeason: "May – October",
  },
  {
    name: "Marrakech",
    country: "Morocco",
    coordinates: [-7.9811, 31.6295],
    type: "event",
    category: "Birthday",
    tagline: "An Andalusian Dream",
    notableEvents: 15,
    bestSeason: "October – April",
  },
  {
    name: "Cairo",
    country: "Egypt",
    coordinates: [31.2357, 30.0444],
    type: "event",
    category: "Gala",
    tagline: "An Ancient Stage",
    notableEvents: 4,
    bestSeason: "October – March",
  },
  {
    name: "Dubai",
    country: "UAE",
    coordinates: [55.2708, 25.2048],
    type: "event",
    category: "Corporate",
    tagline: "Skyline & Sand",
    notableEvents: 9,
    bestSeason: "October – April",
  },
  {
    name: "Mumbai",
    country: "India",
    coordinates: [72.8777, 19.076],
    type: "event",
    category: "Wedding",
    tagline: "A Symphony of Celebration",
    notableEvents: 6,
    bestSeason: "November – February",
  },
  {
    name: "Udaipur",
    country: "India",
    coordinates: [73.7125, 24.5854],
    type: "event",
    category: "Wedding",
    tagline: "City of Lakes",
    notableEvents: 8,
    bestSeason: "October – March",
  },
  {
    name: "Bali",
    country: "Indonesia",
    coordinates: [115.0884, -8.4095],
    type: "event",
    category: "Wedding",
    tagline: "Ceremony in the Green",
    notableEvents: 7,
    bestSeason: "April – October",
  },
  {
    name: "Kyoto",
    country: "Japan",
    coordinates: [135.7681, 35.0116],
    type: "event",
    category: "Anniversary",
    tagline: "Quiet Splendor",
    notableEvents: 5,
    bestSeason: "March – May, October – November",
  },
  {
    name: "Tokyo",
    country: "Japan",
    coordinates: [139.6917, 35.6895],
    type: "event",
    category: "Corporate",
    tagline: "Precision and Pageantry",
    notableEvents: 11,
    bestSeason: "Year round",
  },
  {
    name: "Sydney",
    country: "Australia",
    coordinates: [151.2093, -33.8688],
    type: "event",
    category: "Gala",
    tagline: "Harbour Galas",
    notableEvents: 6,
    bestSeason: "October – April",
  },
  {
    name: "Cape Town",
    country: "South Africa",
    coordinates: [18.4241, -33.9249],
    type: "event",
    category: "Wedding",
    tagline: "Where Two Oceans Meet",
    notableEvents: 7,
    bestSeason: "October – April",
  },
  {
    name: "Aspen",
    country: "United States",
    coordinates: [-106.8175, 39.1911],
    type: "event",
    category: "Birthday",
    tagline: "Mountain Magic",
    notableEvents: 12,
    bestSeason: "December – March, June – August",
  },
  {
    name: "Napa Valley",
    country: "United States",
    coordinates: [-122.2869, 38.2975],
    type: "event",
    category: "Wedding",
    tagline: "Vineyard Weekends",
    notableEvents: 16,
    bestSeason: "April – October",
  },
  {
    name: "The Hamptons",
    country: "United States",
    coordinates: [-72.1848, 40.9634],
    type: "event",
    category: "Wedding",
    tagline: "Beach Estate Affairs",
    notableEvents: 19,
    bestSeason: "May – September",
  },
  {
    name: "Palm Beach",
    country: "United States",
    coordinates: [-80.0364, 26.7056],
    type: "event",
    category: "Gala",
    tagline: "Old World Florida",
    notableEvents: 14,
    bestSeason: "November – April",
  },
  {
    name: "Charleston",
    country: "United States",
    coordinates: [-79.9311, 32.7765],
    type: "event",
    category: "Wedding",
    tagline: "Southern Grace",
    notableEvents: 10,
    bestSeason: "March – May, September – November",
  },
  {
    name: "Cabo San Lucas",
    country: "Mexico",
    coordinates: [-109.9167, 22.8905],
    type: "event",
    category: "Wedding",
    tagline: "Desert Meets Sea",
    notableEvents: 11,
    bestSeason: "October – May",
  },
  {
    name: "Tulum",
    country: "Mexico",
    coordinates: [-87.4654, 20.2114],
    type: "event",
    category: "Wedding",
    tagline: "Jungle and Cenote",
    notableEvents: 9,
    bestSeason: "November – April",
  },
  {
    name: "St. Barths",
    country: "Caribbean",
    coordinates: [-62.8333, 17.9],
    type: "event",
    category: "Anniversary",
    tagline: "Discreet Luxury",
    notableEvents: 8,
    bestSeason: "December – April",
  },
  {
    name: "Turks & Caicos",
    country: "Caribbean",
    coordinates: [-71.7975, 21.694],
    type: "event",
    category: "Wedding",
    tagline: "Quiet Beach Romance",
    notableEvents: 6,
    bestSeason: "November – April",
  },
  {
    name: "Mustique",
    country: "Caribbean",
    coordinates: [-61.1875, 12.8836],
    type: "event",
    category: "Birthday",
    tagline: "A Private Island",
    notableEvents: 4,
    bestSeason: "December – April",
  },
  {
    name: "Buenos Aires",
    country: "Argentina",
    coordinates: [-58.3816, -34.6037],
    type: "event",
    category: "Corporate",
    tagline: "Tango and Steak",
    notableEvents: 5,
    bestSeason: "October – April",
  },
  {
    name: "Rio de Janeiro",
    country: "Brazil",
    coordinates: [-43.1729, -22.9068],
    type: "event",
    category: "Gala",
    tagline: "Carnaval Energy",
    notableEvents: 4,
    bestSeason: "May – October",
  },
  {
    name: "Vancouver",
    country: "Canada",
    coordinates: [-123.1207, 49.2827],
    type: "event",
    category: "Wedding",
    tagline: "Coastal Modern",
    notableEvents: 6,
    bestSeason: "May – September",
  },
  {
    name: "Banff",
    country: "Canada",
    coordinates: [-115.5708, 51.1784],
    type: "event",
    category: "Wedding",
    tagline: "Cathedral of the Rockies",
    notableEvents: 5,
    bestSeason: "June – September, December – February",
  },
  {
    name: "Marbella",
    country: "Spain",
    coordinates: [-4.8826, 36.5099],
    type: "event",
    category: "Birthday",
    tagline: "Andalusian Coast",
    notableEvents: 7,
    bestSeason: "May – October",
  },
  {
    name: "Ibiza",
    country: "Spain",
    coordinates: [1.4821, 38.9067],
    type: "event",
    category: "Birthday",
    tagline: "White Island Nights",
    notableEvents: 8,
    bestSeason: "May – October",
  },
  {
    name: "Costa Smeralda",
    country: "Italy",
    coordinates: [9.5417, 41.1395],
    type: "event",
    category: "Wedding",
    tagline: "Sardinia's Emerald Coast",
    notableEvents: 6,
    bestSeason: "June – September",
  },
  {
    name: "Punta Cana",
    country: "Dominican Republic",
    coordinates: [-68.4068, 18.5601],
    type: "event",
    category: "Wedding",
    tagline: "Caribbean Modernism",
    notableEvents: 7,
    bestSeason: "December – April",
  },
  {
    name: "Chamonix",
    country: "France",
    coordinates: [6.8696, 45.9237],
    type: "event",
    category: "Wedding",
    tagline: "Alpine Cinema",
    notableEvents: 5,
    bestSeason: "December – March, June – August",
  },
  {
    name: "Bora Bora",
    country: "French Polynesia",
    coordinates: [-151.7415, -16.5004],
    type: "event",
    category: "Anniversary",
    tagline: "South Pacific Privacy",
    notableEvents: 4,
    bestSeason: "April – November",
  },
  {
    name: "Maldives",
    country: "Maldives",
    coordinates: [73.2207, 3.2028],
    type: "event",
    category: "Anniversary",
    tagline: "Whole Island Celebrations",
    notableEvents: 5,
    bestSeason: "November – April",
  },
];

for (const loc of [...eventLocations, ...offices]) {
  const real = photoFor(loc.name, loc.image);
  if (real) loc.image = real;
}

const stats = [
  { value: "65+", label: "Unique Destinations" },
  { value: "4", label: "International Offices" },
  { value: "1,200+", label: "Events Designed & Produced" },
];

export default function Destinations() {
  return (
    <div className="w-full bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-6">
            Worldwide
          </div>
          <h1 className="font-serif text-5xl md:text-7xl mb-8 tracking-tight">
            Global Destinations
          </h1>
          <p className="text-foreground/70 leading-relaxed text-lg">
            Our network extends across continents — from historic Italian
            villas to private Caribbean islands, from the ateliers of Paris to
            the gardens of Kyoto. Wherever you imagine your celebration, we
            bring it to life.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-muted/40 py-16 px-6 mb-16"
        >
          <h2 className="font-serif text-2xl md:text-3xl text-center mb-12 tracking-wide">
            AURELIA & CO. LUXURY DESTINATION EVENT PLANNING
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="bg-background w-44 h-44 mx-auto rounded-full flex flex-col items-center justify-center shadow-sm border border-border/40">
                  <div className="font-serif text-4xl md:text-5xl text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.18em] text-foreground/60 px-4 leading-snug">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Static Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24"
        >
          <h3 className="font-serif text-3xl md:text-4xl text-center mb-3 tracking-wide">
            Find the Location of Your Dreams
          </h3>
          <p className="text-center text-sm text-foreground/60 mb-10 max-w-xl mx-auto">
            We produce events in over 65 destinations across six continents.
          </p>

          <div className="relative bg-muted/30 border border-border/40 pointer-events-none select-none">
            <ComposableMap
              projection="geoEqualEarth"
              projectionConfig={{ scale: 165 }}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: "hsl(var(--muted-foreground) / 0.18)",
                          stroke: "hsl(var(--background))",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: {
                          fill: "hsl(var(--muted-foreground) / 0.18)",
                          outline: "none",
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Static event markers */}
              {eventLocations.map((loc) => (
                <Marker key={`event-${loc.name}`} coordinates={loc.coordinates}>
                  <circle r={3} fill="hsl(var(--foreground))" fillOpacity={0.65} />
                  <circle r={6} fill="hsl(var(--foreground))" fillOpacity={0.1} />
                </Marker>
              ))}

              {/* Static office markers */}
              {offices.map((loc) => (
                <Marker key={`office-${loc.name}`} coordinates={loc.coordinates}>
                  <circle
                    r={5}
                    fill="hsl(var(--primary))"
                    stroke="hsl(var(--background))"
                    strokeWidth={1.5}
                  />
                  <circle r={9} fill="hsl(var(--primary))" fillOpacity={0.15} />
                </Marker>
              ))}
            </ComposableMap>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 px-4 border-t border-border/40 bg-background/60 text-[10px] md:text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="uppercase tracking-[0.18em] text-foreground/70">
                  Aurelia Offices
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-foreground/70" />
                <span className="uppercase tracking-[0.18em] text-foreground/70">
                  Event Locations
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Destination groups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
              Featured Regions
            </div>
            <h3 className="font-serif text-3xl md:text-4xl tracking-tight">
              Where We Work
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {[
              { region: "Italy", places: ["Lake Como", "Tuscany", "Amalfi Coast", "Capri", "Venice", "Costa Smeralda"] },
              { region: "France", places: ["Paris", "Provence", "Saint-Tropez", "Chamonix"] },
              { region: "Spain", places: ["Marbella", "Ibiza"] },
              { region: "Greece", places: ["Mykonos", "Santorini"] },
              { region: "Caribbean", places: ["St. Barths", "Mustique", "Turks & Caicos", "Punta Cana"] },
              { region: "United States", places: ["The Hamptons", "Aspen", "Napa Valley", "Palm Beach", "Charleston"] },
              { region: "Mexico", places: ["Cabo San Lucas", "Tulum"] },
              { region: "Asia & Pacific", places: ["Kyoto", "Tokyo", "Bali", "Udaipur", "Bora Bora", "Maldives"] },
              { region: "Africa & Middle East", places: ["Marrakech", "Cape Town", "Dubai"] },
            ].map((group) => (
              <div key={group.region}>
                <div className="font-serif text-xl mb-4 tracking-wide">
                  {group.region}
                </div>
                <ul className="space-y-2">
                  {group.places.map((p) => (
                    <li key={p}>
                      <Link
                        href={`/destinations/${slugify(p)}`}
                        className="text-sm text-foreground/70 hover:text-primary transition-colors text-left"
                      >
                        {p}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
