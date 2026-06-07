import React, { useState } from 'react';
import { ArrowLeft, MapPin, ExternalLink, Navigation } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { SavedContent } from '@/types/SavedContent';
import { getCategoryMeta } from '@/lib/categories';

interface InteractiveMapProps {
  content: SavedContent[];
  onBack: () => void;
}


export const InteractiveMap = ({ content, onBack }: InteractiveMapProps) => {
  const [selectedKeepr, setSelectedKeepr] = useState<SavedContent | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const locationsContent = content.filter(item => item.location);

  const handleGetDirections = (location: string) => {
    const query = encodeURIComponent(location);
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.open(`maps://maps.google.com/maps?q=${query}`, '_blank');
    } else {
      window.open(`https://maps.google.com/maps?q=${query}`, '_blank');
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-border p-4 flex items-center gap-4 z-10">
        <Button 
          onClick={onBack}
          variant="ghost" 
          size="sm"
          className="rounded-full p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold font-josefin">Interactive Map</h1>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative overflow-hidden">
        <div 
          className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative cursor-move transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* World Map Background */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI1MDAiIHZpZXdCb3g9IjAgMCAxMDAwIDUwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHN0cm9rZSBkPSJNMCAwaDEwMDB2NTAwSDBWMCIgc3Ryb2tlPSIjYThhNWQwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjUgNSIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K')] opacity-20 bg-center bg-cover"></div>
          
          {/* Map Pins */}
          {locationsContent.map((item, index) => {
            const color = getCategoryMeta(item.category).pinColor;
            const x = 100 + (index * 120) % 700;
            const y = 80 + (Math.floor(index / 6) * 100) % 400;
            
            return (
              <div
                key={item.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-all duration-200"
                style={{ left: `${x}px`, top: `${y}px` }}
                onClick={() => setSelectedKeepr(item)}
              >
                <div 
                  className="w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center hover:shadow-xl"
                  style={{ backgroundColor: color }}
                >
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-md whitespace-nowrap text-xs font-josefin">
                  {item.title}
                </div>
              </div>
            );
          })}

          {/* Interactive Map Instructions */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg max-w-sm">
            <Navigation className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1 font-josefin text-center">Full Screen Map</h3>
            <p className="text-xs text-gray-600 font-josefin text-center">
              Zoom, pan, and click on pins to explore your Keeprs
            </p>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-20 right-4 flex flex-col gap-2">
          <Button
            onClick={handleZoomIn}
            className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl text-primary border border-border"
            variant="outline"
          >
            +
          </Button>
          <Button
            onClick={handleZoomOut}
            className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl text-primary border border-border"
            variant="outline"
          >
            -
          </Button>
        </div>

        {/* Keepr Detail Modal */}
        {selectedKeepr && (
          <div className="absolute inset-x-4 bottom-4 z-20">
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl border-0">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold font-josefin text-lg">{selectedKeepr.title}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedKeepr(null)}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    ×
                  </Button>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <p className="text-sm font-josefin text-gray-700">{selectedKeepr.location}</p>
                </div>
                <p className="text-sm text-gray-500 font-josefin mb-4">by @{selectedKeepr.creatorName}</p>
                <div className="flex gap-3">
                  <Button 
                    className="bg-primary hover:bg-primary-hover text-white flex-1"
                    onClick={() => handleGetDirections(selectedKeepr.location!)}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.open(selectedKeepr.link, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Keepr
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
