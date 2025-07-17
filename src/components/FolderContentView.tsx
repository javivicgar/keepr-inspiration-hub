
import React from 'react';
import { ArrowLeft, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { SavedContent } from '@/types/SavedContent';

interface FolderContentViewProps {
  folderName: string;
  content: SavedContent[];
  onBack: () => void;
  onKeeprClick: (keepr: SavedContent) => void;
}

const categoryIcons = {
  'Food Spots': { emoji: '🍕', color: '#D4C1EC' },
  'Locations': { emoji: '🧳', color: '#A1D6F2' },
  'Fashion': { emoji: '👕', color: '#F8C4D6' },
  'Useful Apps': { emoji: '📱', color: '#B8E994' },
  'Tutorials': { emoji: '📚', color: '#FFE4A3' },
  'Outdoor': { emoji: '🏞️', color: '#B8E994' },
  'Music': { emoji: '🎵', color: '#F6A9A9' },
  'Home': { emoji: '🏡', color: '#DDA0DD' },
  'Sports': { emoji: '⚽', color: '#F6A9A9' },
  'Other': { emoji: '📍', color: '#A19DCA' }
};

export const FolderContentView = ({ folderName, content, onBack, onKeeprClick }: FolderContentViewProps) => {
  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold font-josefin">{folderName}</h2>
          <p className="text-sm text-gray-600 font-josefin">
            {content.length} {content.length === 1 ? 'Keepr' : 'Keeprs'}
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {content.map((item) => {
          const categoryInfo = categoryIcons[item.category] || categoryIcons['Other'];
          
          return (
            <Card 
              key={item.id} 
              className="hover:shadow-lg transition-all duration-200 rounded-2xl border-0 overflow-hidden group cursor-pointer"
              onClick={() => onKeeprClick(item)}
            >
              <CardContent className="p-0 h-32 md:h-36">
                <div 
                  className="w-full h-full relative"
                  style={{ backgroundColor: categoryInfo.color }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <div className="text-xl">{categoryInfo.emoji}</div>
                  </div>
                  
                  {item.location && (
                    <div className="absolute top-3 right-3">
                      <MapPin className="h-4 w-4 text-white/80" />
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/40 to-transparent">
                    <h3 className="text-white text-sm font-semibold font-josefin line-clamp-1 mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-white/80 text-xs font-josefin">
                        @{item.creatorName}
                      </p>
                      <ExternalLink className="h-3 w-3 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
