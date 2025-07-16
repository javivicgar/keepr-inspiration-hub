
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Coffee, Camera, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { SavedContent } from '@/types/SavedContent';

interface MapViewProps {
  content: SavedContent[];
}

export const MapView = ({ content }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const locationsContent = content.filter(item => item.location);
  const folders = Array.from(new Set(locationsContent.map(item => item.folder)));

  const filteredContent = selectedFolder === 'all' 
    ? locationsContent 
    : locationsContent.filter(item => item.folder === selectedFolder);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (window.google && window.google.maps) {
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: { lat: 47.3769, lng: 8.5417 }, // Zurich coordinates
          zoom: 12,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        setMap(mapInstance);
        setIsLoading(false);

        // Clear existing markers
        markers.forEach(marker => marker.setMap(null));

        // Add markers for filtered content
        const newMarkers = filteredContent.map((item, index) => {
          const marker = new window.google.maps.Marker({
            position: { 
              lat: 47.3769 + (Math.random() - 0.5) * 0.1, 
              lng: 8.5417 + (Math.random() - 0.5) * 0.1 
            },
            map: mapInstance,
            title: item.title,
            icon: {
              url: 'data:image/svg+xml;base64,' + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#a8a5d0" width="24" height="24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(30, 30)
            }
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div class="p-3 font-josefin">
                <h3 class="font-semibold text-sm mb-1">${item.title}</h3>
                <p class="text-xs text-gray-600 mb-2">${item.location}</p>
                <button 
                  onclick="window.open('https://maps.google.com/maps?q=${encodeURIComponent(item.location || item.title)}', '_blank')"
                  class="bg-[#a8a5d0] text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-[#9895c7] transition-colors"
                >
                  Directions
                </button>
              </div>
            `
          });

          marker.addListener('click', () => {
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

  return (
    <div className="space-y-4 pb-20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 font-josefin tracking-wide">Map</h2>
        <p className="text-muted-foreground font-josefin">
          {filteredContent.length > 0 ? `${filteredContent.length} places to explore` : 'Your saved locations'}
        </p>
      </div>

      {/* Folder Filter */}
      {folders.length > 0 && (
        <div className="mb-4">
          <Select value={selectedFolder} onValueChange={setSelectedFolder}>
            <SelectTrigger className="w-full rounded-2xl border-2 font-josefin">
              <SelectValue placeholder="Select folder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Folders</SelectItem>
              {folders.map((folder) => (
                <SelectItem key={folder} value={folder}>{folder}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Google Maps Container */}
      <div className="relative h-80 bg-gray-100 rounded-2xl overflow-hidden border-2 border-border shadow-lg">
        <div ref={mapRef} className="absolute inset-0" />
        
        {/* Loading/Fallback content */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-[#a8a5d0] mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 font-josefin">Loading Map...</p>
              <p className="text-xs text-gray-500 font-josefin">Google Maps integration</p>
            </div>
          </div>
        )}
      </div>

      {/* Keepr List */}
      {filteredContent.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold font-josefin">Your saved locations</h3>
          
          {filteredContent.map((item) => (
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
                      {item.location && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="rounded-xl font-josefin"
                          onClick={() => handleDirections(item.location!)}
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
