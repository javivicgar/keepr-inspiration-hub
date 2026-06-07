import {
  UtensilsCrossed,
  MapPin,
  Plane,
  Shirt,
  Smartphone,
  BookOpen,
  Mountain,
  Music,
  Home,
  Trophy,
  Tag,
  type LucideIcon,
} from 'lucide-react';

export type CategoryName =
  | 'Food Spots'
  | 'Locations'
  | 'Travel Spots'
  | 'Fashion'
  | 'Useful Apps'
  | 'Tutorials'
  | 'Outdoor'
  | 'Music'
  | 'Home'
  | 'Sports'
  | 'Other';

export interface CategoryMeta {
  icon: LucideIcon;
  /** Tailwind text class for the category accent color. */
  tone: string;
  /** Tailwind bg class for soft category accent surface. */
  toneBg: string;
  /** Hex value used by map-pin renderers (data, not theme). */
  pinColor: string;
}

// Category accent palette. Colors live here as data for non-theme surfaces
// (map pins, swatches). Components never reference hex directly.
export const categoryMeta: Record<CategoryName, CategoryMeta> = {
  'Food Spots':  { icon: UtensilsCrossed, tone: 'text-violet-500',  toneBg: 'bg-violet-100',  pinColor: '#D4C1EC' },
  'Locations':   { icon: MapPin,          tone: 'text-sky-500',     toneBg: 'bg-sky-100',     pinColor: '#A1D6F2' },
  'Travel Spots':{ icon: Plane,           tone: 'text-amber-500',   toneBg: 'bg-amber-100',   pinColor: '#FFE4A3' },
  'Fashion':     { icon: Shirt,           tone: 'text-pink-500',    toneBg: 'bg-pink-100',    pinColor: '#F8C4D6' },
  'Useful Apps': { icon: Smartphone,      tone: 'text-emerald-500', toneBg: 'bg-emerald-100', pinColor: '#B8E994' },
  'Tutorials':   { icon: BookOpen,        tone: 'text-amber-500',   toneBg: 'bg-amber-100',   pinColor: '#FFE4A3' },
  'Outdoor':     { icon: Mountain,        tone: 'text-emerald-500', toneBg: 'bg-emerald-100', pinColor: '#B8E994' },
  'Music':       { icon: Music,           tone: 'text-rose-500',    toneBg: 'bg-rose-100',    pinColor: '#F6A9A9' },
  'Home':        { icon: Home,            tone: 'text-fuchsia-500', toneBg: 'bg-fuchsia-100', pinColor: '#DDA0DD' },
  'Sports':      { icon: Trophy,          tone: 'text-rose-500',    toneBg: 'bg-rose-100',    pinColor: '#F6A9A9' },
  'Other':       { icon: Tag,             tone: 'text-primary',     toneBg: 'bg-primary/10',  pinColor: '#A19DCA' },
};

export const getCategoryMeta = (name: string): CategoryMeta =>
  (categoryMeta as Record<string, CategoryMeta>)[name] ?? categoryMeta.Other;
