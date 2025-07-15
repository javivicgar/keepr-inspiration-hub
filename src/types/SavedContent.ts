
export interface SavedContent {
  id: string;
  title: string;
  creatorName: string;
  link: string;
  category: 'Food Spots' | 'Locations' | 'Fashion' | 'Useful Apps' | 'Tutorials' | 'Outdoor' | 'Music' | 'Home' | 'Sports' | 'Other';
  location?: string;
  mapLink?: string;
  note: string;
  tags: string[];
  folder: string;
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
