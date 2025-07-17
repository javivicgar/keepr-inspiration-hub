
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Plus, RotateCcw, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { SavedContent } from '@/types/SavedContent';

interface MapViewProps {
  content: SavedContent[];
}

const categoryIcons = {
  'Food Spots': { emoji: '🍕', color: '#D4C1EC' },
  'Locations': { emoji: '🧳', color: '#A1D6F2' },
  'Outdoor': { emoji: '🏞️', color: '#B8E994' },
  'Sports': { emoji: '⚽', color: '#F6A9A9' },
  'Travel Spots': { emoji: '✈️', color: '#BFD4F2' },
  'Other': { emoji: '📍', color: '#A19DCA' }
};

const categories = ['all', 'Food Spots', 'Locations', 'Outdoor', 'Sports', 'Travel Spots'];

export const MapView = ({ content }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedKeepr, setSelectedKeepr] = useState<SavedContent | null>(null);

  const locationsContent = content.filter(item => item.location);
  const folders = Array.from(new Set(locationsContent.map(item => item.folder)));

  const filteredContent = locationsContent.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesFolder = selectedFolder === 'all' || item.folder === selectedFolder;
    return matchesCategory && matchesFolder;
  });

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (window.google && window.google.maps) {
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: { lat: 47.3769, lng: 8.5417 },
          zoom: 12,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        });

        setMap(mapInstance);
        setIsLoading(false);

        // Clear existing markers
        markers.forEach(marker => marker.setMap(null));

        // Add markers for filtered content
        const newMarkers = filteredContent.map((item, index) => {
          const categoryInfo = categoryIcons[item.category as keyof typeof categoryIcons] || categoryIcons['Other'];
          
          const marker = new window.google.maps.Marker({
            position: { 
              lat: 47.3769 + (Math.random() - 0.5) * 0.1, 
              lng: 8.5417 + (Math.random() - 0.5) * 0.1 
            },
            map: mapInstance,
            title: item.title,
            icon: {
              url: 'data:image/svg+xml;base64,' + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 50" width="40" height="50">
                  <path d="M20 0C12.3 0 6 6.3 6 14c0 10.5 14 26 14 26s14-15.5 14-26c0-7.7-6.3-14-14-14z" fill="${categoryInfo.color}" stroke="#ffffff" stroke-width="2"/>
                  <circle cx="20" cy="14" r="8" fill="#ffffff"/>
                  <text x="20" y="18" text-anchor="middle" font-size="10" fill="#333">${categoryInfo.emoji}</text>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(40, 50),
              anchor: new window.google.maps.Point(20, 50)
            }
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div class="p-3 font-josefin max-w-xs">
                <div class="flex items-start gap-3 mb-3">
                  <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">
                    ${categoryInfo.emoji}
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-sm mb-1">${item.title}</h3>
                    <p class="text-xs text-gray-600 mb-1">@${item.creatorName}</p>
                    <p class="text-xs text-gray-500">${item.folder}</p>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  ${item.googleMapsRating ? `<span class="text-xs text-yellow-600">⭐ ${item.googleMapsRating}</span>` : ''}
                  <button 
                    onclick="window.open('https://maps.google.com/maps?q=${encodeURIComponent(item.location || item.title)}', '_blank')"
                    class="bg-[#a8a5d0] text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-[#9895c7] transition-colors"
                  >
                    Directions
                  </button>
                </div>
              </div>
            `
          });

          marker.addListener('click', () => {
            setSelectedKeepr(item);
            infoWindow.open(mapInstance, marker);
          });

          return marker;
        });

        setMarkers(newMarkers);
      } else {
        setIsLoading(false);
      }
    };

    // Load Google Maps script if not already loaded
    if (!(window as any).google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.onload = initMap;
      script.onerror = () => setIsLoading(false);
      document.head.appendChild(script);
    } else {
      initMap();
    }

    // Cleanup function
    return () => {
      markers.forEach(marker => marker.setMap(null));
    };
  }, [filteredContent]);

  const handleDirections = (location: string) => {
    const encodedLocation = encodeURIComponent(location);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
      window.open(`http://maps.apple.com/?q=${encodedLocation}`, '_blank');
    } else {
      window.open(`https://maps.google.com/maps?q=${encodedLocation}`, '_blank');
    }
  };

  const refreshMap = () => {
    if (map) {
      map.setCenter({ lat: 47.3769, lng: 8.5417 });
      map.setZoom(12);
    }
  };

  return (
    <div className="relative h-screen pb-20 overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-sm p-4 shadow-sm">
        <h2 className="text-xl font-bold mb-4 font-josefin tracking-wide">Explore your saved Keeprs</h2>
        
        {/* Filters */}
        <div className="space-y-3">
          {/* Folder Selector */}
          {folders.length > 0 && (
            <Select value={selectedFolder} onValueChange={setSelectedFolder}>
              <SelectTrigger className="w-full rounded-xl border-2 font-josefin text-sm">
                <SelectValue placeholder="Select folder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Folders</SelectItem>
                {folders.map((folder) => (
                  <SelectItem key={folder} value={folder}>{folder}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

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
      </div>

      {/* Map Container */}
      <div className="absolute inset-0 pt-32">
        <div ref={mapRef} className="w-full h-full" />
        
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-[#a8a5d0] mx-auto mb-2 animate-pulse" />
              <p className="text-sm font-medium text-gray-700 font-josefin">Loading Map...</p>
              <p className="text-xs text-gray-500 font-josefin">Google Maps integration</p>
            </div>
          </div>
        )}

        {/* Floating Action Buttons */}
        <div className="absolute bottom-24 right-4 flex flex-col gap-2">
          <Button
            onClick={refreshMap}
            className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
            variant="outline"
          >
            <RotateCcw className="h-5 w-5 text-[#a8a5d0]" />
          </Button>
          
          <Button
            onClick={() => {/* Handle add location */}}
            className="w-12 h-12 rounded-full bg-[#a8a5d0] hover:bg-[#9895c7] shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="h-5 w-5 text-white" />
          </Button>
        </div>

        {/* Bottom Sheet Toggle */}
        {filteredContent.length > 0 && (
          <Button
            onClick={() => setShowBottomSheet(!showBottomSheet)}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 rounded-full px-4 py-2 border border-gray-200"
            variant="outline"
          >
            <ChevronUp className={`h-4 w-4 mr-2 transition-transform duration-200 ${showBottomSheet ? 'rotate-180' : ''}`} />
            <span className="text-sm font-josefin">{filteredContent.length} Keeprs</span>
          </Button>
        )}
      </div>

      {/* Bottom Sheet */}
      {showBottomSheet && filteredContent.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-96 overflow-hidden animate-slide-up z-20">
          <div className="p-4">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-semibold font-josefin mb-4">Your Keeprs on the map</h3>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {filteredContent.map((item) => {
                const categoryInfo = categoryIcons[item.category as keyof typeof categoryIcons] || categoryIcons['Other'];
                
                return (
                  <Card key={item.id} className="hover:shadow-md transition-shadow rounded-2xl border-2 cursor-pointer">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-lg">
                          {categoryInfo.emoji}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm font-josefin line-clamp-1">{item.title}</h4>
                          <p className="text-xs text-gray-600 font-josefin">@{item.creatorName}</p>
                          <p className="text-xs text-gray-500 font-josefin">{item.folder}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl font-josefin text-xs"
                          onClick={() => handleDirections(item.location!)}
                        >
                          <Navigation className="h-3 w-3 mr-1" />
                          Go
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
