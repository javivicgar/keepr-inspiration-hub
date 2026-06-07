import React, { useState } from 'react';
import { Search, Heart, MessageCircle, Repeat, UserPlus, Star, TrendingUp, ThumbsUp, Eye, ArrowRight, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const CommunityView = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
      saves: 89,
      comments: 12
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
      saves: 67,
      comments: 8
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
      saves: 134,
      comments: 23
    }
  ];

  const friendSuggestions = [
    { username: "@alex_travels", mutualFriends: 3, sharedInterests: ["Travel", "Food"] },
    { username: "@maria_foodie", mutualFriends: 5, sharedInterests: ["Food", "Fashion"] },
    { username: "@jake_outdoors", mutualFriends: 2, sharedInterests: ["Outdoor", "Sports"] }
  ];

  const sharedWithMe = [
    {
      id: 1,
      title: "Best Coffee Shop Downtown",
      category: "Food Spots",
      emoji: "☕",
      sharedBy: "@sarah_kim",
      timeAgo: "2h ago"
    },
    {
      id: 2,
      title: "Cool Art Exhibition",
      category: "Locations",
      emoji: "🎨",
      sharedBy: "@mike_chen",
      timeAgo: "1d ago"
    }
  ];

  const topKeeprSharers = [
    { username: "@foodie_tokyo", shares: 45, avatar: "🍜" },
    { username: "@adventure_alex", shares: 38, avatar: "🏔️" },
    { username: "@vintage_lover", shares: 32, avatar: "🛍️" }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header with Search */}
      <div className="mb-2">
        {/* Friend Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Find friends by username or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl border-2 font-josefin"
          />
        </div>
      </div>

      {/* Friend Suggestions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold font-josefin">Suggested Friends</h3>
        <div className="grid gap-3">
          {friendSuggestions.map((friend, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary font-josefin">
                        {friend.username[1].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold font-josefin">{friend.username}</p>
                      <p className="text-xs text-gray-600 font-josefin">
                        {friend.mutualFriends} mutual friends • {friend.sharedInterests.join(', ')}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary-hover font-josefin rounded-xl">
                    <UserPlus className="h-3 w-3 mr-1" />
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Shared With Me */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold font-josefin">Shared With Me</h3>
        <div className="space-y-3">
          {sharedWithMe.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{item.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold font-josefin line-clamp-1">{item.title}</h4>
                    <p className="text-sm text-primary font-josefin">
                      Shared by {item.sharedBy} • {item.timeAgo}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="font-josefin rounded-xl">
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Shared Keeprs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold font-josefin">Community Keeprs</h3>
        <div className="space-y-3">
          {sharedKeepr.map((keepr) => (
            <Card key={keepr.id} className="hover:shadow-md transition-shadow rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{keepr.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold font-josefin line-clamp-1">{keepr.title}</h4>
                    <button className="text-sm text-primary font-josefin hover:underline">
                      {keepr.creator}
                    </button>
                    <div className="flex items-center text-xs text-muted-foreground font-josefin mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      {keepr.location}
                    </div>
                    
                    {keepr.visitedWith.length > 0 && (
                      <div className="flex items-center text-xs text-primary font-josefin mb-3">
                        <UserPlus className="h-3 w-3 mr-1" />
                        Visited with {keepr.visitedWith.join(', ')}
                      </div>
                    )}
                    
                    {/* Interaction Buttons */}
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="h-8 px-2 font-josefin">
                        <Heart className="h-4 w-4 mr-1" />
                        {keepr.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2 font-josefin">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {keepr.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2 font-josefin">
                        <Repeat className="h-4 w-4 mr-1" />
                        Re-Keep
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Top Keepr Sharers */}
      <Card className="bg-card border-border rounded-2xl">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 font-josefin flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Top Keepr Sharers This Week
          </h3>
          <div className="space-y-3">
            {topKeeprSharers.map((user, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-sm">{user.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm font-josefin">{user.username}</p>
                    <p className="text-xs text-gray-600 font-josefin">{user.shares} shares</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-primary font-josefin">#{index + 1}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Stats Banner */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0 rounded-2xl">
        <CardContent className="p-4 text-center">
          <p className="font-semibold text-primary font-josefin">
            🎉 Today: 183 new food spots saved across the community!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
