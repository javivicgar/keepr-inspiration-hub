
import React from 'react';
import { ArrowLeft, MapPin, Calendar, Star, ExternalLink, Heart, Share2, Folder } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { SavedContent } from '@/types/SavedContent';
import { getCategoryMeta } from '@/lib/categories';

interface KeeprDetailViewProps {
  keepr: SavedContent;
  onBack: () => void;
}

export const KeeprDetailView = ({ keepr, onBack }: KeeprDetailViewProps) => {
  const meta = getCategoryMeta(keepr.category);
  const CategoryIcon = meta.icon;


  return (
    <div className="space-y-6 pb-20">
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
        <h2 className="text-xl font-bold font-josefin">Keepr Details</h2>
      </div>

      {/* Main Content Card */}
      <Card className="rounded-2xl border border-border overflow-hidden shadow-md">
        <div className={`w-full h-48 relative ${meta.toneBg}`}>
          <div className="absolute top-4 left-4">
            <div className={`w-10 h-10 rounded-lg bg-card/80 backdrop-blur flex items-center justify-center ${meta.tone}`}>
              <CategoryIcon className="h-5 w-5" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/70 to-transparent">
            <h1 className="text-white text-xl font-semibold font-josefin mb-2">{keepr.title}</h1>
            <p className="text-white/90 text-sm font-josefin">@{keepr.creatorName}</p>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Category and Folder */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-josefin">
                {keepr.category}
              </span>
              <span className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm font-josefin inline-flex items-center gap-1.5">
                <Folder className="h-3.5 w-3.5" />
                {keepr.folder}
              </span>
            </div>
          </div>


          {/* Location */}
          {keepr.location && (
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-josefin">{keepr.location}</span>
            </div>
          )}

          {/* Created Date */}
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-josefin">
              Saved on {keepr.createdAt.toLocaleDateString()}
            </span>
          </div>

          {/* Rating */}
          {keepr.googleMapsRating && (
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-josefin">{keepr.googleMapsRating} rating</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1 rounded-xl font-josefin">
              <Heart className="h-4 w-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" className="flex-1 rounded-xl font-josefin">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary-hover rounded-xl font-josefin">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card className="rounded-2xl border-0 shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3 font-josefin">About this Keepr</h3>
          <p className="text-gray-600 text-sm font-josefin leading-relaxed">
            This is a saved inspiration from {keepr.creatorName}. 
            {keepr.location && ` Located at ${keepr.location}.`}
            {keepr.googleMapsRating && ` Has a ${keepr.googleMapsRating} star rating.`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
