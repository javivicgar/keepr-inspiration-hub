
import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { SavedContent } from '@/pages/Index';

interface MapViewProps {
  content: SavedContent[];
}

export const MapView = ({ content }: MapViewProps) => {
  const locationsContent = content.filter(item => item.location);

  if (locationsContent.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-muted rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <MapPin className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No locations saved yet</h3>
        <p className="text-muted-foreground">Save some food spots or travel locations to see them here</p>
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

  return (
    <div className="space-y-4 pb-20">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Locations</h2>
        <p className="text-muted-foreground">{locationsContent.length} places to explore</p>
      </div>

      {/* Map placeholder */}
      <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-dashed border-2">
        <CardContent className="p-8 text-center">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Interactive Map Coming Soon</h3>
          <p className="text-sm text-muted-foreground">Your saved locations will appear on a beautiful interactive map</p>
        </CardContent>
      </Card>

      {/* Location list */}
      <div className="space-y-3">
        {locationsContent.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{getCategoryEmoji(item.category)}</span>
                    <h3 className="font-semibold text-foreground line-clamp-1">{item.title}</h3>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    {item.location}
                  </div>
                  
                  {item.note && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{item.note}</p>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(item.link, '_blank')}
                    >
                      View Content
                    </Button>
                    {item.mapLink && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(item.mapLink, '_blank')}
                      >
                        <Navigation className="h-3 w-3 mr-1" />
                        Directions
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
