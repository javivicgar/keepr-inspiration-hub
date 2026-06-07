import React, { useState } from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InteractiveMap } from '@/components/InteractiveMap';
import type { SavedContent } from '@/types/SavedContent';
import { getCategoryMeta } from '@/lib/categories';

interface MapViewProps {
  content: SavedContent[];
}

const categories = ['all', 'Food Spots', 'Locations', 'Outdoor', 'Sports', 'Travel Spots'];


export const MapView = ({ content }: MapViewProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedKeepr, setSelectedKeepr] = useState<SavedContent | null>(null);
  const [showFullMap, setShowFullMap] = useState(false);

  const locationsContent = content.filter(item => item.location);
  
  const filteredContent = locationsContent.filter(item => {
    return selectedCategory === 'all' || item.category === selectedCategory;
  });

  const handleOpenGoogleMaps = () => {
    const locations = filteredContent.map(item => item.location).join(' | ');
    const searchQuery = encodeURIComponent(locations || 'world map');
    window.open(`https://maps.google.com/search/${searchQuery}`, '_blank');
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

  if (showFullMap) {
    return (
      <InteractiveMap 
        content={content} 
        onBack={() => setShowFullMap(false)} 
      />
    );
  }

  return (
    <div className="relative h-screen pb-20 overflow-hidden">
      {/* Header */}
      <div className="absolute top-16 left-0 right-0 z-10 bg-white/95 backdrop-blur-sm p-4 shadow-sm">
        {/* Removed duplicate title - it's now in ProfileHeader */}
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
                  ? 'bg-primary hover:bg-primary-hover text-white border-primary'
                  : 'hover:border-primary'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Interactive Map Area */}
      <div className="absolute inset-0 pt-32">
        <div className="w-full h-full mx-4 mb-4 relative">
          {/* Map Container */}
          <div 
            className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl overflow-hidden shadow-lg relative cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => setShowFullMap(true)}
          >
            {/* World Map Background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI1MDAiIHZpZXdCb3g9IjAgMCAxMDAwIDUwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwMCAxMDBIMjAwVjIwMEgxMDBWMTAwWiIgZmlsbD0iIzk4OTVjNyIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPHN0cm9rZSBkPSJNMCAwaDEwMDB2NTAwSDBWMCIgc3Ryb2tlPSIjYThhNWQwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjUgNSIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K')] opacity-20 bg-center bg-cover"></div>
            
            {/* Map Pins */}
            {filteredContent.map((item, index) => {
              const color = categoryColors[item.category] || categoryColors['Other'];
              const x = 20 + (index * 150) % 800;
              const y = 50 + (Math.floor(index / 5) * 100) % 300;
              
              return (
                <div
                  key={item.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                  style={{ left: `${x}px`, top: `${y}px` }}
                  onClick={() => setSelectedKeepr(item)}
                >
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                    style={{ backgroundColor: color }}
                  >
                    <MapPin className="h-3 w-3 text-white" />
                  </div>
                </div>
              );
            })}
            
            {/* Map Placeholder Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg max-w-md">
                <Navigation className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2 font-josefin text-lg">Interactive Map</h3>
                <p className="text-sm text-gray-600 font-josefin mb-4">
                  Your saved Keeprs with location data appear as pins on the map
                </p>
                <Button 
                  className="bg-primary hover:bg-primary-hover text-white font-josefin"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFullMap(true);
                  }}
                >
                  Open Full Map
                </Button>
              </div>
            </div>
          </div>
          
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
                      className="bg-primary hover:bg-primary-hover text-white"
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
          className="absolute bottom-8 right-8 bg-primary hover:bg-primary-hover shadow-lg hover:shadow-xl transition-all duration-200 rounded-full h-14 w-14 p-0"
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
                  <div 
                    key={item.id} 
                    className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setSelectedKeepr(item)}
                  >
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
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
