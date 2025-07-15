import React from 'react';
import { Users, Heart, Star, TrendingUp, ThumbsUp, Eye, ArrowRight, UserPlus, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const CommunityView = () => {
  const sharedKeepr = [
    {
      id: 1,
      title: "Amazing Ramen in Shibuya",
      category: "Food Spots", 
      emoji: "🍜",
      creator: "@foodie_tokyo",
      location: "Tokyo, Japan",
      visitedWith: ["@sarah_kim", "@mike_chen"],
      status: "visited",
      likes: 124,
      saves: 89
    },
    {
      id: 2,
      title: "Sunset Hike Trail",
      category: "Outdoor",
      emoji: "🏔️",
      creator: "@adventure_alex", 
      location: "Swiss Alps",
      visitedWith: ["@hiking_buddy"],
      status: "visited",
      likes: 89,
      saves: 67
    },
    {
      id: 3,
      title: "Vintage Market Find",
      category: "Fashion",
      emoji: "🛍️",
      creator: "@vintage_lover",
      location: "Paris, France",
      visitedWith: [],
      status: "visited",
      likes: 156,
      saves: 134
    }
  ];

  const recentFromFriends = [
    {
      id: 1,
      friend: "@sarah_kim",
      action: "saved",
      title: "Cozy Bookstore Café",
      category: "Food Spots",
      emoji: "📚",
      timeAgo: "2h ago"
    },
    {
      id: 2,
      friend: "@mike_chen",
      action: "visited",
      title: "Modern Art Gallery",
      category: "Locations",
      emoji: "🎨",
      timeAgo: "1d ago"
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
        <p className="text-muted-foreground font-josefin">Share your Keepr experiences with friends</p>
      </div>

      {/* Shared Keeprs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold font-josefin">Shared Keeprs</h3>
        <div className="space-y-3">
          {sharedKeepr.map((keepr) => (
            <Card key={keepr.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{keepr.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold font-josefin line-clamp-1">{keepr.title}</h4>
                    <p className="text-sm text-muted-foreground font-josefin">{keepr.creator}</p>
                    <div className="flex items-center text-xs text-muted-foreground font-josefin mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      {keepr.location}
                    </div>
                    
                    {keepr.visitedWith.length > 0 && (
                      <div className="flex items-center text-xs text-[#a8a5d0] font-josefin mb-2">
                        <UserPlus className="h-3 w-3 mr-1" />
                        Visited with {keepr.visitedWith.join(', ')}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3 text-red-500" />
                        <span className="text-xs font-josefin">{keepr.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs font-josefin">{keepr.saves}</span>
                      </div>
                      <span className="text-xs text-green-600 font-josefin bg-green-50 px-2 py-1 rounded-full">
                        ✓ Visited
                      </span>
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

      {/* Recent from Friends */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold font-josefin">Recent from Friends</h3>
        <div className="space-y-3">
          {recentFromFriends.map((activity) => (
            <Card key={activity.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{activity.emoji}</div>
                  <div className="flex-1">
                    <p className="text-sm font-josefin">
                      <span className="font-semibold text-[#a8a5d0]">{activity.friend}</span> {activity.action} 
                      <span className="font-semibold"> "{activity.title}"</span>
                    </p>
                    <p className="text-xs text-muted-foreground font-josefin">{activity.timeAgo}</p>
                  </div>
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
            Share your experiences and discover amazing places with friends
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-[#a8a5d0] font-josefin">1.2K</div>
              <div className="text-xs text-muted-foreground font-josefin">Users</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[#a8a5d0] font-josefin">5.8K</div>
              <div className="text-xs text-muted-foreground font-josefin">Shared</div>
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
