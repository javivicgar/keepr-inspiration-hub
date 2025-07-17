import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SavedContent } from '@/types/SavedContent';

// Note: For production, this should be stored in environment variables
// For now, using a placeholder token
const MAPBOX_ACCESS_TOKEN = 'your-mapbox-access-token-here';

interface InteractiveMapProps {
  content: SavedContent[];
  selectedCategory: string;
  onPinClick: (item: SavedContent) => void;
}

const categoryColors: Record<string, string> = {
  'Food Spots': '#D4C1EC',
  'Locations': '#A1D6F2', 
  'Outdoor': '#B8E994',
  'Sports': '#F6A9A9',
  'Travel Spots': '#FFE4A3',
  'Other': '#A19DCA'
};

export const InteractiveMap = ({ content, selectedCategory, onPinClick }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Filter content with locations
  const filteredContent = content.filter(item => 
    item.location && (selectedCategory === 'all' || item.category === selectedCategory)
  );

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // For demo purposes, show a placeholder message
    if (!MAPBOX_ACCESS_TOKEN || MAPBOX_ACCESS_TOKEN === 'your-mapbox-access-token-here') {
      return;
    }

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [8.5417, 47.3769], // Zurich coordinates as default
      zoom: 6
    });

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.mapbox-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add markers for filtered content
    filteredContent.forEach((item) => {
      // For demo purposes, use random coordinates around Zurich
      // In real implementation, you'd geocode the location
      const lng = 8.5417 + (Math.random() - 0.5) * 0.1;
      const lat = 47.3769 + (Math.random() - 0.5) * 0.1;

      const color = categoryColors[item.category] || categoryColors['Other'];
      
      const el = document.createElement('div');
      el.className = 'mapbox-marker';
      el.style.backgroundColor = color;
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      el.style.cursor = 'pointer';

      el.addEventListener('click', () => {
        onPinClick(item);
      });

      new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .addTo(map.current!);
    });
  }, [filteredContent, mapLoaded, onPinClick]);

  // Show placeholder if no token is configured
  if (!MAPBOX_ACCESS_TOKEN || MAPBOX_ACCESS_TOKEN === 'your-mapbox-access-token-here') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden rounded-lg flex items-center justify-center">
        <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg max-w-md">
          <h3 className="font-semibold mb-2 font-josefin text-lg">Interactive Map Coming Soon</h3>
          <p className="text-sm text-gray-600 font-josefin mb-4">
            Please add your Mapbox access token to enable the interactive map feature.
          </p>
          <div className="text-xs text-gray-500 font-josefin bg-gray-50 p-3 rounded-lg">
            <strong>Developer Note:</strong> Add MAPBOX_ACCESS_TOKEN to environment variables 
            or update the token in InteractiveMap.tsx. Get your free token at mapbox.com
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ minHeight: '400px' }}
    />
  );
};