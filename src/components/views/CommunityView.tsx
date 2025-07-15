
import React from 'react';
import { Users, Heart, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const CommunityView = () => {
  return (
    <div className="space-y-6 pb-20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 font-josefin tracking-wide">Community</h2>
        <p className="text-muted-foreground font-josefin">Discover inspiration from other Keepr users</p>
      </div>

      <Card className="bg-gradient-to-r from-[#a8a5d0]/10 to-[#9895c7]/10 border-[#a8a5d0]/20">
        <CardContent className="p-6 text-center">
          <Users className="h-12 w-12 text-[#a8a5d0] mx-auto mb-4" />
          <h3 className="font-semibold mb-2 font-josefin">Join the Community</h3>
          <p className="text-sm text-muted-foreground font-josefin mb-4">
            Connect with other creators and discover amazing inspiration
          </p>
          <p className="text-xs text-muted-foreground font-josefin">
            Sign up with an account to access community features
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <h4 className="font-semibold text-sm font-josefin">Trending</h4>
            <p className="text-xs text-muted-foreground font-josefin">Popular saves</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <h4 className="font-semibold text-sm font-josefin">Featured</h4>
            <p className="text-xs text-muted-foreground font-josefin">Staff picks</p>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-[#a8a5d0]" />
            <div>
              <h4 className="font-semibold font-josefin">Discover New Creators</h4>
              <p className="text-sm text-muted-foreground font-josefin">Find inspiration from top creators</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
