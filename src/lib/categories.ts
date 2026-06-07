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
  'Food Spots':  { icon: UtensilsCrossed, tone: 'text-orange-700',  toneBg: 'bg-orange-50',  pinColor: '#F4D6BC' },
  'Locations':   { icon: MapPin,          tone: 'text-amber-700',   toneBg: 'bg-amber-50',   pinColor: '#EBD9B4' },
  'Travel Spots':{ icon: Plane,           tone: 'text-sky-700',     toneBg: 'bg-sky-50',     pinColor: '#C9DEEB' },
  'Fashion':     { icon: Shirt,           tone: 'text-rose-700',    toneBg: 'bg-rose-50',    pinColor: '#EBC9D3' },
  'Useful Apps': { icon: Smartphone,      tone: 'text-slate-700',   toneBg: 'bg-slate-100',  pinColor: '#CFD6DF' },
  'Tutorials':   { icon: BookOpen,        tone: 'text-amber-700',   toneBg: 'bg-amber-50',   pinColor: '#F0DDB6' },
  'Outdoor':     { icon: Mountain,        tone: 'text-emerald-700', toneBg: 'bg-emerald-50', pinColor: '#C4DDC9' },
  'Music':       { icon: Music,           tone: 'text-violet-700',  toneBg: 'bg-violet-50',  pinColor: '#D7CFEB' },
  'Home':        { icon: Home,            tone: 'text-yellow-800',  toneBg: 'bg-yellow-50',  pinColor: '#EFE4C2' },
  'Sports':      { icon: Trophy,          tone: 'text-red-700',     toneBg: 'bg-red-50',     pinColor: '#EBC4C0' },
  'Other':       { icon: Tag,             tone: 'text-primary',     toneBg: 'bg-primary/10', pinColor: '#A19DCA' },
};

export const getCategoryMeta = (name: string): CategoryMeta =>
  (categoryMeta as Record<string, CategoryMeta>)[name] ?? categoryMeta.Other;
