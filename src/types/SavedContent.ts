export interface SavedContent {
  id: string;
  title: string;
  creatorName: string;
  link: string;
  // Known categories live in CATEGORIES (see lib/categories). Custom user categories are allowed, so this is a string.
  category: string;
  location?: string;
  mapLink?: string;
  note: string;
  tags: string[];
  folder: string;
  image?: string;
  createdAt: Date;
  
  // Category-specific fields
  // Food Spots
  googleMapsRating?: number;
  recommendedBy?: string;
  
  // Locations
  country?: string;
  city?: string;
  visitedWith?: string;
  bestSeason?: string;
  
  // Fashion
  brand?: string;
  priceRange?: string;
  buyLink?: string;
  styleTags?: string[];
  
  // Useful Apps
  platform?: string;
  appCategory?: string;
  price?: string;
  
  // Tutorials
  skillLevel?: string;
  
  // Sports
  sportType?: string;
  duration?: string;
  entryFee?: string;
}