
import React from 'react';
import { ArrowLeft, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { SavedContent } from '@/types/SavedContent';
import { getCategoryMeta } from '@/lib/categories';

interface FolderContentViewProps {
  folderName: string;
  content: SavedContent[];
  onBack: () => void;
  onKeeprClick: (keepr: SavedContent) => void;
}


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
          const meta = getCategoryMeta(item.category);
          const Icon = meta.icon;

          return (
            <Card
              key={item.id}
              className="hover:shadow-md transition-shadow rounded-2xl border border-border overflow-hidden group cursor-pointer bg-card"
              onClick={() => onKeeprClick(item)}
            >
              <CardContent className={`p-0 h-32 md:h-36 ${meta.toneBg}`}>
                <div className="w-full h-full relative">
                  <div className="absolute top-3 left-3">
                    <div className={`w-8 h-8 rounded-md bg-card/80 backdrop-blur flex items-center justify-center ${meta.tone}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {item.location && (
                    <div className="absolute top-3 right-3">
                      <MapPin className="h-4 w-4 text-foreground/70" />
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/70 to-transparent">
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
