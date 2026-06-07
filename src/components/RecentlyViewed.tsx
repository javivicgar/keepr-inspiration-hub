import React from 'react';
import { SavedContent } from '@/types/SavedContent';
import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface RecentlyViewedProps {
  recentlyViewed: SavedContent[];
  onKeeprClick: (keepr: SavedContent) => void;
}

export const RecentlyViewed = ({ recentlyViewed, onKeeprClick }: RecentlyViewedProps) => {
  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Recently Viewed</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {recentlyViewed.map(keepr => (
          <div
            key={keepr.id}
            onClick={() => onKeeprClick(keepr)}
            className="flex-shrink-0 w-48 cursor-pointer"
          >
            <Card className="overflow-hidden bg-card border-border hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="relative">
                {keepr.image ? (
                  <img
                    src={keepr.image}
                    alt={keepr.title}
                    className="w-full h-24 object-cover"
                  />
                ) : (
                  <div className="w-full h-24 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary/40" />
                  </div>
                )}
              </div>
              <div className="p-3">
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
                  <Clock className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};