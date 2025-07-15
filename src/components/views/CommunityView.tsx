import React from 'react';
import { Users, Heart, Star, TrendingUp, ThumbsUp, Eye, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const CommunityView = () => {
  const popularKeepr = [
    {
      id: 1,
      title: "Hidden Café in Montmartre",
      category: "Food Spots",
      emoji: "🍕",
      creator: "@paris_foodie",
      likes: 124,
      saves: 89,
      location: "Paris, France"
    },
    {
      id: 2,
      title: "Minimalist Wardrobe Essentials",
      category: "Fashion",
      emoji: "🛍️",
      creator: "@style_guru",
      likes: 256,
      saves: 198,
      location: "Global"
    },
    {
      id: 3,
      title: "Best Productivity App Stack",
      category: "Useful Apps",
      emoji: "⚙️",
      creator: "@tech_tips",
      likes: 189,
      saves: 147,
      location: "Global"
    }
  ];

  const curatedCollections = [
    {
      id: 1,
      title: "Best Brunch Spots in Paris",
      description: "Curated by local food experts",
      items: 12,
      rating: 4.8,
      tags: ["brunch", "paris", "food"]
    },
    {
      id: 2,
      title: "AI Tools 2024",
      description: "Essential productivity apps",
      items: 8,
      rating: 4.9,
      tags: ["ai", "productivity", "tools"]
    },
    {
      id: 3,
      title: "Sustainable Fashion Brands",
      description: "Eco-friendly style choices",
      items: 15,
      rating: 4.7,
      tags: ["sustainable", "fashion", "eco"]
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 font-josefin tracking-wide">Community</h2>
        <p className="text-muted-foreground font-josefin">Discover inspiration from other Keepr users</p>
      </div>

      {/* Popular Keeprs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold font-josefin">Popular Keeprs</h3>
        <div className="space-y-3">
          {popularKeepr.map((keepr) => (
            <Card key={keepr.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{keepr.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold font-josefin line-clamp-1">{keepr.title}</h4>
                    <p className="text-sm text-muted-foreground font-josefin">{keepr.creator}</p>
                    <p className="text-xs text-muted-foreground font-josefin">{keepr.location}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3 text-red-500" />
                        <span className="text-xs font-josefin">{keepr.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs font-josefin">{keepr.saves}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="font-josefin">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Curated Collections */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold font-josefin">Curated Collections</h3>
        <div className="space-y-3">
          {curatedCollections.map((collection) => (
            <Card key={collection.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold font-josefin">{collection.title}</h4>
                    <p className="text-sm text-muted-foreground font-josefin">{collection.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-josefin">{collection.items} items</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-josefin">{collection.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {collection.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-muted rounded-full text-xs font-josefin">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="font-josefin">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <Card className="bg-gradient-to-r from-[#a8a5d0]/10 to-[#9895c7]/10 border-[#a8a5d0]/20">
        <CardContent className="p-6 text-center">
          <Users className="h-12 w-12 text-[#a8a5d0] mx-auto mb-4" />
          <h3 className="font-semibold mb-2 font-josefin">Join the Community</h3>
          <p className="text-sm text-muted-foreground font-josefin mb-4">
            Connect with other creators and discover amazing inspiration
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-[#a8a5d0] font-josefin">1.2K</div>
              <div className="text-xs text-muted-foreground font-josefin">Users</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[#a8a5d0] font-josefin">5.8K</div>
              <div className="text-xs text-muted-foreground font-josefin">Keeprs</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[#a8a5d0] font-josefin">324</div>
              <div className="text-xs text-muted-foreground font-josefin">Collections</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
