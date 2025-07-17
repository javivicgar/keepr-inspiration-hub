import React, { useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { SavedContent } from '@/types/SavedContent';

interface MapViewProps {
  content: SavedContent[];
}

const categories = ['all', 'Food Spots', 'Locations', 'Outdoor', 'Sports', 'Travel Spots'];

export const MapView = ({ content }: MapViewProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const locationsContent = content.filter(item => item.location);
  
  const filteredContent = locationsContent.filter(item => {
    return selectedCategory === 'all' || item.category === selectedCategory;
  });

  const handleOpenGoogleMaps = () => {
    window.open('https://maps.google.com', '_blank');
  };

  return (
    <div className="relative h-screen pb-20 overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-sm p-4 shadow-sm">
        <h2 className="text-xl font-bold mb-4 font-josefin tracking-wide">Explore your saved Keeprs</h2>
        
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap text-xs font-josefin rounded-xl border-2 transition-all duration-200 h-8 ${
                selectedCategory === category
                  ? 'bg-[#a8a5d0] hover:bg-[#9895c7] text-white border-[#a8a5d0]'
                  : 'hover:border-[#a8a5d0]'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="absolute inset-0 pt-32">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden rounded-lg mx-4 mb-4">
          {/* World Map Placeholder */}
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
          </div>
          
          {/* Sample Location Pins */}
          <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-[#a8a5d0] rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div className="absolute bottom-1/3 left-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
            <MapPin className="h-4 w-4 text-white" />
          </div>

          {/* Center Message */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0">
              <CardContent className="p-6 text-center">
                <MapPin className="h-12 w-12 text-[#a8a5d0] mx-auto mb-4" />
                <h3 className="font-semibold mb-2 font-josefin text-lg">Your saved Keeprs will appear here soon</h3>
                <p className="text-sm text-gray-600 font-josefin mb-4">
                  Interactive map with location-based Keeprs coming soon
                </p>
                <div className="text-xs text-gray-500 font-josefin bg-gray-50 p-3 rounded-lg">
                  <strong>Developer Note:</strong> This section will include a live interactive map 
                  (Google Maps SDK or Mapbox) where pins are displayed based on Keeprs with location data. 
                  Pins will be color-coded by category.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Floating Action Button */}
        <Button
          onClick={handleOpenGoogleMaps}
          className="absolute bottom-8 right-8 bg-[#a8a5d0] hover:bg-[#9895c7] shadow-lg hover:shadow-xl transition-all duration-200 rounded-full h-14 w-14 p-0"
        >
          <ExternalLink className="h-6 w-6 text-white" />
        </Button>

        {/* Keeprs List */}
        {filteredContent.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-48 overflow-hidden z-20 mx-4">
            <div className="p-4">
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-semibold font-josefin mb-4">
                {filteredContent.length} Keeprs with locations
              </h3>
              
              <div className="space-y-3 max-h-32 overflow-y-auto">
                {filteredContent.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-[#a8a5d0] rounded-lg flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm font-josefin">{item.title}</h4>
                      <p className="text-xs text-gray-600 font-josefin">{item.location}</p>
                    </div>
                  </div>
                ))}
                {filteredContent.length > 3 && (
                  <p className="text-xs text-gray-500 font-josefin text-center">
                    +{filteredContent.length - 3} more locations
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
