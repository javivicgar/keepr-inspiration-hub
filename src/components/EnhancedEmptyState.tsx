import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles } from 'lucide-react';

interface EnhancedEmptyStateProps {
  onCreateKeepr: () => void;
}

export const EnhancedEmptyState = ({ onCreateKeepr }: EnhancedEmptyStateProps) => {
  const mockKeeprs = [
    {
      title: "Amazing Coffee Shop Downtown",
      creatorName: "Coffee Lover",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop",
      category: "Places"
    },
    {
      title: "Weekend Hiking Trail",
      creatorName: "Nature Explorer",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=200&fit=crop",
      category: "Fitness & Workouts"
    },
    {
      title: "Vintage Thrift Find",
      creatorName: "Style Hunter",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop",
      category: "Fashion"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 text-center">
        <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold mb-3 font-josefin">
          You haven't saved anything yet!
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Tap the + below to keep your first inspiration. Start building your personal collection of amazing discoveries!
        </p>
        <Button onClick={onCreateKeepr} size="lg" className="font-josefin">
          <Plus className="h-5 w-5 mr-2" />
          Save Your First Keepr
        </Button>
      </Card>

      {/* Mock keeprs preview */}
      <div>
        <h3 className="text-lg font-semibold mb-4 font-josefin text-center">
          Here's how your Keeprs will look:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockKeeprs.map((keepr, index) => (
            <Card
              key={index}
              className="overflow-hidden opacity-60 hover:opacity-40 transition-opacity cursor-default"
            >
              <div className="relative">
                <img
                  src={keepr.image}
                  alt={keepr.title}
                  className="w-full h-40 object-cover grayscale"
                />
                <div className="absolute inset-0 bg-white/20" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-sm font-josefin line-clamp-1 mb-1">
                  {keepr.title}
                </h4>
                <p className="text-xs text-muted-foreground font-josefin mb-2">
                  by {keepr.creatorName}
                </p>
                <span className="text-xs bg-secondary/30 px-2 py-1 rounded-full">
                  {keepr.category}
                </span>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Save content from social media, websites, or add your own discoveries
        </p>
      </div>
    </div>
  );
};