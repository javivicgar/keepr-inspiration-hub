import React from 'react';
import { ExternalLink, MapPin, User, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { SavedContent } from '@/types/SavedContent';

interface ContentGridProps {
  content: SavedContent[];
}

export const ContentGrid = ({ content }: ContentGridProps) => {
  if (content.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <p className="text-lg mb-2">No content saved yet</p>
          <p className="text-sm">Tap the + button to save your first inspiration!</p>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: SavedContent['category']) => {
    switch (category) {
      case 'Food Spots': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Locations': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Fashion': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'Useful Apps': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Tutorials': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Outdoor': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'Music': return 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200';
      case 'Home': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'Other': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="grid gap-4">
      {content.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground line-clamp-2">{item.title}</h3>
                {item.creatorName && (
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <User className="h-3 w-3 mr-1" />
                    {item.creatorName}
                  </div>
                )}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                {item.category}
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {item.location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-2" />
                {item.location}
              </div>
            )}

            {item.note && (
              <p className="text-sm text-muted-foreground line-clamp-3">{item.note}</p>
            )}

            {item.tags.length > 0 && (
              <div className="flex items-center space-x-1">
                <Tag className="h-3 w-3 text-muted-foreground" />
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {item.createdAt.toLocaleDateString()}
              <span className="mx-2">•</span>
              <span className="px-2 py-1 bg-muted rounded text-xs">{item.folder}</span>
            </div>
          </CardContent>

          <CardFooter className="pt-3 space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => window.open(item.link, '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View Content
            </Button>
            {item.mapLink && (
              <Button
                variant="outline"
                size="sm"
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
