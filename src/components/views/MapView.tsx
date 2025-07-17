import React, { useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InteractiveMap } from '@/components/InteractiveMap';
import type { SavedContent } from '@/types/SavedContent';

interface MapViewProps {
  content: SavedContent[];
}

const categories = ['all', 'Food Spots', 'Locations', 'Outdoor', 'Sports', 'Travel Spots'];

export const MapView = ({ content }: MapViewProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedKeepr, setSelectedKeepr] = useState<SavedContent | null>(null);

  const locationsContent = content.filter(item => item.location);
  
  const filteredContent = locationsContent.filter(item => {
    return selectedCategory === 'all' || item.category === selectedCategory;
  });

  const handleOpenGoogleMaps = () => {
    const locations = filteredContent.map(item => item.location).join(' | ');
    const searchQuery = encodeURIComponent(locations || 'world map');
    window.open(`https://maps.google.com/search/${searchQuery}`, '_blank');
  };

  const handlePinClick = (item: SavedContent) => {
    setSelectedKeepr(item);
  };

  const handleGetDirections = (location: string) => {
    const query = encodeURIComponent(location);
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.open(`maps://maps.google.com/maps?q=${query}`, '_blank');
    } else {
      window.open(`https://maps.google.com/maps?q=${query}`, '_blank');
    }
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

      {/* Interactive Map */}
      <div className="absolute inset-0 pt-32">
        <div className="w-full h-full mx-4 mb-4 relative">
          <InteractiveMap 
            content={content}
            selectedCategory={selectedCategory}
            onPinClick={handlePinClick}
          />
          
          {/* Keepr Preview Card */}
          {selectedKeepr && (
            <div className="absolute top-4 left-4 right-4 z-10">
              <Card className="bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl border-0">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold font-josefin text-lg">{selectedKeepr.title}</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedKeepr(null)}
                      className="h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 font-josefin mb-2">{selectedKeepr.location}</p>
                  <p className="text-xs text-gray-500 font-josefin mb-3">by @{selectedKeepr.creatorName}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-[#a8a5d0] hover:bg-[#9895c7] text-white"
                      onClick={() => handleGetDirections(selectedKeepr.location!)}
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      Directions
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => window.open(selectedKeepr.link, '_blank')}>
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
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
