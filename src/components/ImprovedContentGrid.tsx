
import React from 'react';
import { Plus, MapPin, Heart, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { SavedContent } from '@/types/SavedContent';

interface ImprovedContentGridProps {
  content: SavedContent[];
  onCreateKeepr: () => void;
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

export const ImprovedContentGrid = ({ content, onCreateKeepr }: ImprovedContentGridProps) => {
  if (content.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <Card 
          className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-dashed border-[#a8a5d0] bg-gradient-to-br from-[#a8a5d0]/5 to-[#9895c7]/10 rounded-2xl"
          onClick={onCreateKeepr}
        >
          <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center text-center h-32 md:h-40">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#a8a5d0] rounded-full flex items-center justify-center mb-2 md:mb-3">
              <Plus className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </div>
            <p className="text-xs md:text-sm font-medium text-[#a8a5d0] font-josefin">Create your first Keepr</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      <Card 
        className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-dashed border-[#a8a5d0] bg-gradient-to-br from-[#a8a5d0]/5 to-[#9895c7]/10 rounded-2xl"
        onClick={onCreateKeepr}
      >
        <CardContent className="p-3 md:p-4 flex flex-col items-center justify-center text-center h-28 md:h-32">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-[#a8a5d0] rounded-full flex items-center justify-center mb-2">
            <Plus className="h-3 w-3 md:h-4 md:w-4 text-white" />
          </div>
          <p className="text-xs font-medium text-[#a8a5d0] font-josefin leading-tight">Create new Keepr</p>
        </CardContent>
      </Card>

      {content.map((item) => {
        const categoryInfo = categoryIcons[item.category] || categoryIcons['Other'];
        
        return (
          <Card key={item.id} className="hover:shadow-lg transition-all duration-200 rounded-2xl border-0 overflow-hidden group">
            <CardContent className="p-0 h-28 md:h-32">
              <div 
                className="w-full h-full relative"
                style={{ backgroundColor: categoryInfo.color }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                
                <div className="absolute top-2 left-2 md:top-3 md:left-3">
                  <div className="text-lg md:text-xl">{categoryInfo.emoji}</div>
                </div>
                
                {item.location && (
                  <div className="absolute top-2 right-2 md:top-3 md:right-3">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 text-white/80" />
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 bg-gradient-to-t from-black/40 to-transparent">
                  <h3 className="text-white text-xs md:text-sm font-semibold font-josefin line-clamp-1 mb-1">
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
  );
};
