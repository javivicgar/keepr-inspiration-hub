
import React from 'react';
import { ExternalLink, MapPin, User, Calendar, Tag, Heart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { SavedContent } from '@/types/SavedContent';

interface ImprovedContentGridProps {
  content: SavedContent[];
  onCreateKeepr?: () => void;
}

export const ImprovedContentGrid = ({ content, onCreateKeepr }: ImprovedContentGridProps) => {
  if (content.length === 0) {
    return (
      <div className="text-center py-16">
        <Card 
          className="max-w-sm mx-auto cursor-pointer hover:shadow-md transition-all duration-200 border-2 border-dashed border-[#a8a5d0]/50 hover:border-[#a8a5d0] bg-[#a8a5d0]/5"
          onClick={onCreateKeepr}
        >
          <CardContent className="p-8 text-center">
            <div className="bg-[#a8a5d0]/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Plus className="h-8 w-8 text-[#a8a5d0]" />
            </div>
            <h3 className="text-lg font-semibold mb-2 font-josefin text-[#a8a5d0]">Create new Keepr</h3>
            <p className="text-sm text-muted-foreground font-josefin">Start saving your inspiration</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getCategoryEmoji = (category: SavedContent['category']) => {
    switch (category) {
      case 'Food Spots': return '🍕';
      case 'Locations': return '🧳';
      case 'Fashion': return '🛍️';
      case 'Useful Apps': return '⚙️';
      case 'Tutorials': return '📚';
      case 'Outdoor': return '🏔️';
      case 'Music': return '🎵';
      case 'Home': return '🏠';
      case 'Sports': return '🏀';
      case 'Other': return '💡';
      default: return '💡';
    }
  };

  const getCategoryColor = (category: SavedContent['category']) => {
    switch (category) {
      case 'Food Spots': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Locations': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Fashion': return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'Useful Apps': return 'bg-green-50 text-green-700 border-green-200';
      case 'Tutorials': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Outdoor': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Music': return 'bg-violet-50 text-violet-700 border-violet-200';
      case 'Home': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Sports': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Other': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="grid gap-6 pb-20">
      {content.map((item) => (
        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 rounded-2xl border-2 hover:border-[#a8a5d0]/30">
          <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl opacity-50">
                {getCategoryEmoji(item.category)}
              </div>
            </div>
            <div className="absolute top-3 left-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border font-josefin ${getCategoryColor(item.category)}`}>
                {getCategoryEmoji(item.category)} {item.category}
              </span>
            </div>
          </div>

          <CardContent className="p-5">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground line-clamp-2 font-josefin text-lg">{item.title}</h3>
              
              {item.creatorName && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-3 w-3 mr-1" />
                  <span className="font-josefin">{item.creatorName}</span>
                </div>
              )}

              {item.location && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="font-josefin">{item.location}</span>
                </div>
              )}

              {item.note && (
                <p className="text-sm text-muted-foreground line-clamp-2 font-josefin">{item.note}</p>
              )}

              {item.tags.length > 0 && (
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="h-3 w-3 text-muted-foreground" />
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs font-josefin"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground font-josefin">+{item.tags.length - 3}</span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span className="font-josefin">{item.createdAt.toLocaleDateString()}</span>
                </div>
                <span className="px-2 py-1 bg-muted rounded-full text-xs font-josefin">{item.folder}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-5 pt-0 space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 font-josefin rounded-xl border-2 hover:border-[#a8a5d0] transition-all duration-200"
              onClick={() => window.open(item.link, '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View
            </Button>
            {item.mapLink && (
              <Button
                variant="outline"
                size="sm"
                className="font-josefin rounded-xl border-2 hover:border-[#a8a5d0] transition-all duration-200"
                onClick={() => window.open(item.mapLink, '_blank')}
              >
                <MapPin className="h-3 w-3 mr-1" />
                Map
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
