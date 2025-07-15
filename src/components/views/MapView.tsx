import React from 'react';
import { MapPin, Navigation, Coffee, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { SavedContent } from '@/types/SavedContent';

interface MapViewProps {
  content: SavedContent[];
}

export const MapView = ({ content }: MapViewProps) => {
  const locationsContent = content.filter(item => item.location);

  // Mock data for Zurich food spots
  const zurichSpots = [
    { id: 1, name: 'Café Central', location: 'Zurich Old Town', type: 'Coffee', emoji: '☕' },
    { id: 2, name: 'Sprüngli', location: 'Bahnhofstrasse', type: 'Dessert', emoji: '🍰' },
    { id: 3, name: 'Hiltl', location: 'Sihlstrasse', type: 'Vegetarian', emoji: '🥗' },
    { id: 4, name: 'Rooftop Bar', location: 'Langstrasse', type: 'Drinks', emoji: '🍹' },
  ];

  return (
    <div className="space-y-4 pb-20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 font-josefin tracking-wide">Map</h2>
        <p className="text-muted-foreground font-josefin">
          {locationsContent.length > 0 ? `${locationsContent.length} places to explore` : 'Your saved locations'}
        </p>
      </div>

      {/* Google Maps Preview */}
      <div className="relative h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl overflow-hidden border-2 border-border shadow-lg">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0iIzMzMzMzMyIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-30"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-[#a8a5d0] mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700 font-josefin">Zurich, Switzerland</p>
            <p className="text-xs text-gray-500 font-josefin">Interactive map preview</p>
          </div>
        </div>

        {/* Mock map pins */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
      </div>

      {/* Zurich Food Spots */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold font-josefin">Popular spots in Zurich</h3>
        
        {zurichSpots.map((spot) => (
          <Card key={spot.id} className="hover:shadow-md transition-shadow rounded-2xl border-2">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg">
                    {spot.emoji}
                  </div>
                  <div>
                    <h4 className="font-semibold font-josefin">{spot.name}</h4>
                    <p className="text-sm text-muted-foreground font-josefin flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {spot.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-xl font-josefin">
                    <Navigation className="h-3 w-3 mr-1" />
                    Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User's saved locations */}
      {locationsContent.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold font-josefin">Your saved locations</h3>
          
          {locationsContent.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow rounded-2xl border-2">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{item.category === 'Food Spots' ? '🍕' : '🧳'}</span>
                      <h3 className="font-semibold text-foreground line-clamp-1 font-josefin">{item.title}</h3>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      {item.location}
                    </div>
                    
                    {item.note && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2 font-josefin">{item.note}</p>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="rounded-xl font-josefin"
                        onClick={() => window.open(item.link, '_blank')}
                      >
                        View Content
                      </Button>
                      {item.mapLink && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="rounded-xl font-josefin"
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
      )}
    </div>
  );
};
