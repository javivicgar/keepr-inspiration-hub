
import React from 'react';
import { ExternalLink, MapPin, User, Calendar, Tag, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { SavedContent } from '@/pages/Index';

interface ImprovedContentGridProps {
  content: SavedContent[];
}

export const ImprovedContentGrid = ({ content }: ImprovedContentGridProps) => {
  if (content.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-muted rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <Heart className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No inspiration saved yet</h3>
        <p className="text-muted-foreground mb-4">Start saving content from your favorite creators</p>
        <p className="text-sm text-muted-foreground">Tap the + button below to get started</p>
      </div>
    );
  }

  const getCategoryEmoji = (category: SavedContent['category']) => {
    switch (category) {
      case 'Food Spot': return '🍕';
      case 'Travel Spot': return '🧳';
      case 'Outfit': return '🛍️';
      case 'Useful App': return '⚙️';
    }
  };

  const getCategoryColor = (category: SavedContent['category']) => {
    switch (category) {
      case 'Food Spot': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Travel Spot': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Outfit': return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'Useful App': return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  return (
    <div className="grid gap-4 pb-20">
      {content.map((item) => (
        <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl opacity-50">
                {getCategoryEmoji(item.category)}
              </div>
            </div>
            <div className="absolute top-2 left-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                {getCategoryEmoji(item.category)} {item.category}
              </span>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground line-clamp-2">{item.title}</h3>
              
              {item.creatorName && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-3 w-3 mr-1" />
                  {item.creatorName}
                </div>
              )}

              {item.location && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {item.location}
                </div>
              )}

              {item.note && (
                <p className="text-sm text-muted-foreground line-clamp-2">{item.note}</p>
              )}

              {item.tags.length > 0 && (
                <div className="flex items-center flex-wrap gap-1">
                  <Tag className="h-3 w-3 text-muted-foreground" />
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{item.tags.length - 3}</span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {item.createdAt.toLocaleDateString()}
                </div>
                <span className="px-2 py-1 bg-muted rounded text-xs">{item.folder}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => window.open(item.link, '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View
            </Button>
            {item.mapLink && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(item.mapLink, '_blank')}
              >
                <MapPin className="h-3 w-3 mr-1" />
                Map
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
