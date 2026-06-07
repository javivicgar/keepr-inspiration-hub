import React from 'react';
import { Search, Bookmark } from 'lucide-react';
import { SavedContent } from '@/types/SavedContent';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SuggestedKeeprCarouselProps {
  userPreferences: string[];
  onSaveKeepr: (keepr: Omit<SavedContent, 'id' | 'createdAt'>) => void;
}

export const SuggestedKeeprCarousel = ({ userPreferences, onSaveKeepr }: SuggestedKeeprCarouselProps) => {
  // Generate suggested keeprs based on user preferences
  const generateSuggestedKeeprs = () => {
    const baseKeeprs = [
      {
        title: "Amazing Brunch Spot Downtown",
        creatorName: "Food Explorer",
        link: "https://example.com/brunch-spot",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop",
        category: "Food Spots" as const,
        folder: "Favorite Restaurants",
        tags: ["brunch", "downtown", "cozy"],
        note: "Perfect weekend brunch spot with amazing pancakes",
        googleMapsRating: 4.5,
        recommendedBy: "Local Food Blogger"
      },
      {
        title: "Hidden Beach Paradise",
        creatorName: "Travel Guide",
        link: "https://example.com/hidden-beach",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        category: "Locations" as const,
        folder: "Dream Destinations",
        tags: ["beach", "paradise", "hidden"],
        note: "Secluded beach with crystal clear waters",
        country: "Thailand",
        city: "Krabi",
        bestSeason: "November to March"
      },
      {
        title: "Essential Photography Tutorial",
        creatorName: "Photo Master",
        link: "https://example.com/photo-tutorial",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
        category: "Tutorials" as const,
        folder: "Learning Resources",
        tags: ["photography", "tutorial", "basics"],
        note: "Comprehensive guide to portrait photography",
        skillLevel: "Beginner"
      },
      {
        title: "Productivity App Game Changer",
        creatorName: "Tech Reviewer",
        link: "https://example.com/productivity-app",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
        category: "Useful Apps" as const,
        folder: "Must-Have Apps",
        tags: ["productivity", "app", "efficiency"],
        note: "Revolutionary task management with AI features",
        platform: "iOS & Android",
        appCategory: "Productivity",
        price: "Free with Premium"
      },
      {
        title: "Vintage Jacket Find",
        creatorName: "Style Curator",
        link: "https://example.com/vintage-jacket",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        category: "Fashion" as const,
        folder: "Style Inspiration",
        tags: ["vintage", "jacket", "style"],
        note: "Perfect oversized denim jacket for layering",
        brand: "Vintage Levis",
        priceRange: "$80-120",
        styleTags: ["casual", "vintage", "denim"]
      }
    ];

    // Filter based on user preferences or show popular ones
    if (userPreferences.length > 0) {
      return baseKeeprs.filter(keepr =>
        userPreferences.some(pref =>
          keepr.category.toLowerCase().includes(pref.toLowerCase()) ||
          keepr.tags.some(tag => tag.toLowerCase().includes(pref.toLowerCase()))
        )
      ).slice(0, 4);
    }

    return baseKeeprs.slice(0, 4);
  };

  const suggestedKeeprs = generateSuggestedKeeprs();

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Suggested Keeprs</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {suggestedKeeprs.map((keepr, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64"
          >
            <Card className="overflow-hidden bg-card border-border hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img
                  src={keepr.image}
                  alt={keepr.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="bg-white/90 hover:bg-white"
                    onClick={() => onSaveKeepr(keepr)}
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm font-josefin line-clamp-2 mb-1">
                  {keepr.title}
                </h3>
                <p className="text-xs text-muted-foreground font-josefin mb-2">
                  by {keepr.creatorName}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-secondary/50 px-2 py-1 rounded-full">
                    {keepr.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Bookmark className="h-3 w-3" />
                    <span>{Math.floor(Math.random() * 500) + 100}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
