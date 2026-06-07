
import React from 'react';
import { Plus, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { SavedContent } from '@/types/SavedContent';
import { getCategoryMeta } from '@/lib/categories';

interface ImprovedContentGridProps {
  content: SavedContent[];
  onCreateKeepr: () => void;
}


export const ImprovedContentGrid = ({ content, onCreateKeepr }: ImprovedContentGridProps) => {
  if (content.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <Card 
          className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-dashed border-primary bg-primary/5 rounded-2xl"
          onClick={onCreateKeepr}
        >
          <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center text-center h-32 md:h-40">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center mb-2 md:mb-3">
              <Plus className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </div>
            <p className="text-xs md:text-sm font-medium text-primary font-josefin">Create your first Keepr</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      <Card 
        className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-dashed border-primary bg-primary/5 rounded-2xl"
        onClick={onCreateKeepr}
      >
        <CardContent className="p-3 md:p-4 flex flex-col items-center justify-center text-center h-28 md:h-32">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center mb-2">
            <Plus className="h-3 w-3 md:h-4 md:w-4 text-white" />
          </div>
          <p className="text-xs font-medium text-primary font-josefin leading-tight">Create new Keepr</p>
        </CardContent>
      </Card>

      {content.map((item) => {
        const meta = getCategoryMeta(item.category);
        const Icon = meta.icon;

        return (
          <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer rounded-2xl border border-border overflow-hidden group bg-card">
            <CardContent className={`p-0 h-28 md:h-32 ${meta.toneBg}`}>
              <div className="w-full h-full relative">
                <div className="absolute top-2 left-2 md:top-3 md:left-3">
                  <div className={`w-7 h-7 md:w-8 md:h-8 rounded-md bg-card/80 backdrop-blur flex items-center justify-center ${meta.tone}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                {item.location && (
                  <div className="absolute top-2 right-2 md:top-3 md:right-3">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 text-foreground/70" />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 bg-gradient-to-t from-foreground/70 to-transparent">
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
