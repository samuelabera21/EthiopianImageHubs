import type { LucideIcon } from "lucide-react";
import {
  Camera,
  Globe2,
  Sparkles,
  Users,
} from "lucide-react";

export interface TrendingCategory {
  title: string;
  description: string;
  count: string;
  href: string;
}

export interface FeaturedImage {
  title: string;
  photographer: string;
  likes: string;
  views: string;
  imageSrc: string;
  imageAlt: string;
  aspectClassName: string;
  category: string;
}

export interface CollectionItem {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageCount: string;
  curator: string;
}

export interface ValueItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface CommunityStat {
  value: string;
  label: string;
  description: string;
}

export const trendingCategories: TrendingCategory[] = [
  {
    title: "Ethiopian Landscapes",
    description: "Highland views, escarpments, and wide open horizons.",
    count: "1.2k images",
    href: "#featured-images",
  },
  {
    title: "Coffee Culture",
    description: "Roasting rooms, ceremonies, markets, and quiet rituals.",
    count: "860 images",
    href: "#collections",
  },
  {
    title: "Architecture",
    description: "Historic stonework, modern lines, and cultural detail.",
    count: "540 images",
    href: "#featured-images",
  },
  {
    title: "Wildlife",
    description: "Endemic species, birdlife, and protected landscapes.",
    count: "420 images",
    href: "#featured-images",
  },
  {
    title: "People & Culture",
    description: "Portraits, craftsmanship, festivals, and daily life.",
    count: "1.6k images",
    href: "#collections",
  },
  {
    title: "Travel Stories",
    description: "Narrative sets from journeys across the country.",
    count: "730 images",
    href: "#collections",
  },
];

export const featuredImages: FeaturedImage[] = [
  {
    title: "Blue Hour Over the Highlands",
    photographer: "Amanuel Tesfaye",
    likes: "12.8k",
    views: "84k",
    imageSrc: "/placeholders/ethiopia-landscape-1.svg",
    imageAlt: "Layered Ethiopian highlands with soft sunrise light",
    aspectClassName: "aspect-[4/5]",
    category: "Landscape",
  },
  {
    title: "Coffee Ceremony in Warm Light",
    photographer: "Selamawit Mekonnen",
    likes: "9.4k",
    views: "61k",
    imageSrc: "/placeholders/ethiopia-coffee-2.svg",
    imageAlt: "Traditional Ethiopian coffee ceremony with warm accents",
    aspectClassName: "aspect-[5/4]",
    category: "Culture",
  },
  {
    title: "Stone and Sky in Lalibela",
    photographer: "Dawit Haile",
    likes: "10.1k",
    views: "72k",
    imageSrc: "/placeholders/ethiopia-architecture-3.svg",
    imageAlt: "Ethiopian stone architecture framed by sky and shadow",
    aspectClassName: "aspect-[3/4]",
    category: "Architecture",
  },
  {
    title: "Morning Market Color Study",
    photographer: "Hana Girma",
    likes: "8.7k",
    views: "54k",
    imageSrc: "/placeholders/ethiopia-market-4.svg",
    imageAlt: "Open-air Ethiopian market scene with layered color blocks",
    aspectClassName: "aspect-[4/6]",
    category: "Travel",
  },
  {
    title: "Highland Ridge and Cloud Shadows",
    photographer: "Fikadu Abebe",
    likes: "7.9k",
    views: "49k",
    imageSrc: "/placeholders/ethiopia-landscape-1.svg",
    imageAlt: "Rolling ridge lines with subtle cloud shadow movement",
    aspectClassName: "aspect-[5/6]",
    category: "Nature",
  },
  {
    title: "Craft, Texture, and Rhythm",
    photographer: "Mimi Tadesse",
    likes: "11.2k",
    views: "77k",
    imageSrc: "/placeholders/ethiopia-coffee-2.svg",
    imageAlt: "Detailed textured scene inspired by Ethiopian craftsmanship",
    aspectClassName: "aspect-[4/5]",
    category: "People",
  },
];

export const collections: CollectionItem[] = [
  {
    title: "A Journey Through the Highlands",
    description: "Curated images that trace elevation, weather, and local life.",
    imageSrc: "/placeholders/ethiopia-landscape-1.svg",
    imageAlt: "Highland landscape collection cover",
    imageCount: "24 photos",
    curator: "Curated by the EthiopiaHub team",
  },
  {
    title: "The Coffee Story",
    description: "A calm editorial set focused on ritual, texture, and warmth.",
    imageSrc: "/placeholders/ethiopia-coffee-2.svg",
    imageAlt: "Coffee ceremony collection cover",
    imageCount: "18 photos",
    curator: "Curated by Addis storytellers",
  },
  {
    title: "Stone Cities and Sacred Spaces",
    description: "Historic architecture, carved detail, and enduring geometry.",
    imageSrc: "/placeholders/ethiopia-architecture-3.svg",
    imageAlt: "Architectural collection cover",
    imageCount: "20 photos",
    curator: "Curated by heritage photographers",
  },
];

export const values: ValueItem[] = [
  {
    title: "Photography-first layout",
    description:
      "The interface stays quiet so the images remain the focal point.",
    icon: Camera,
  },
  {
    title: "Built for discovery",
    description:
      "Search, categories, and collections guide visitors without friction.",
    icon: Sparkles,
  },
  {
    title: "Community-led growth",
    description:
      "Creators and viewers shape the visual library together over time.",
    icon: Users,
  },
  {
    title: "Authentically Ethiopian",
    description:
      "Colors, structure, and tone reflect the country without imitation.",
    icon: Globe2,
  },
];

export const communityStats: CommunityStat[] = [
  {
    value: "28k+",
    label: "Images shared",
    description: "A growing visual archive of Ethiopia's stories.",
  },
  {
    value: "4.8k",
    label: "Active creators",
    description: "Photographers contributing consistently across regions.",
  },
  {
    value: "120+",
    label: "Collections curated",
    description: "Editorial sets that help users explore by theme.",
  },
  {
    value: "95%",
    label: "Mobile-friendly score",
    description: "A layout built to feel fast and polished on every device.",
  },
];

export const heroStats = [
  { value: "28k+", label: "Images" },
  { value: "4.8k", label: "Creators" },
  { value: "120+", label: "Collections" },
];

export const navigationItems = [
  { label: "Gallery", href: "/gallery" },
  { label: "Search", href: "/search" },
  { label: "Upload", href: "/upload" },
];

export const headerActions = {
  loginHref: "/login",
  registerHref: "/register",
  searchPlaceholder: "Search Ethiopian landscapes, people, coffee, and culture",
};

export const heroHighlights = [
  "Authentic Ethiopian photography",
  "Fast discovery",
  "Premium visual storytelling",
];

export const featureHighlights = [
  {
    title: "Designed to keep images in focus",
    description:
      "Minimal surfaces, calm spacing, and subtle motion keep the layout from competing with photography.",
  },
  {
    title: "Reusable building blocks",
    description:
      "Header, cards, sections, and calls to action are separated so future pages can reuse them directly.",
  },
  {
    title: "Accessible by default",
    description:
      "Keyboard-friendly interactions, semantic landmarks, and visible focus states are built into the structure.",
  },
];

export const footerLinks = {
  explore: [
    { label: "Trending categories", href: "#trending-categories" },
    { label: "Featured images", href: "#featured-images" },
    { label: "Collections", href: "#collections" },
  ],
  community: [
    { label: "Why EthiopiaHub Images", href: "#why-ethiohub-images" },
    { label: "Community statistics", href: "#community" },
    { label: "Get involved", href: "#cta" },
  ],
  legal: [
    { label: "Privacy", href: "#footer" },
    { label: "Terms", href: "#footer" },
    { label: "Accessibility", href: "#footer" },
  ],
};

export const footerSummary =
  "EthiopiaHub Images is building Ethiopia's visual library with a modern, community-driven interface.";