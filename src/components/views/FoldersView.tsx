
import React from 'react';
import { Folder, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { SavedContent } from '@/pages/Index';

interface FoldersViewProps {
  content: SavedContent[];
  onFolderClick: (folder: string) => void;
}

export const FoldersView = ({ content, onFolderClick }: FoldersViewProps) => {
  const folders = React.useMemo(() => {
    const folderMap = new Map<string, SavedContent[]>();
    
    content.forEach(item => {
      if (!folderMap.has(item.folder)) {
        folderMap.set(item.folder, []);
      }
      folderMap.get(item.folder)!.push(item);
    });

    return Array.from(folderMap.entries()).map(([name, items]) => ({
      name,
      items,
      count: items.length,
      categories: [...new Set(items.map(item => item.category))],
      lastUpdated: Math.max(...items.map(item => item.createdAt.getTime()))
    }));
  }, [content]);

  if (folders.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-muted rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <Folder className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No folders yet</h3>
        <p className="text-muted-foreground">Create your first folder by saving some content</p>
      </div>
    );
  }

  const getCategoryEmojis = (categories: SavedContent['category'][]) => {
    const emojiMap = {
      'Food Spot': '🍕',
      'Travel Spot': '🧳',
      'Outfit': '🛍️',
      'Useful App': '⚙️'
    };
    return categories.map(cat => emojiMap[cat]).join(' ');
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Folders</h2>
        <p className="text-muted-foreground">{folders.length} {folders.length === 1 ? 'folder' : 'folders'}</p>
      </div>
      
      {folders.map((folder) => (
        <Card 
          key={folder.name} 
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onFolderClick(folder.name)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Folder className="h-5 w-5 text-[#a8a5d0]" />
                  <h3 className="font-semibold text-foreground">{folder.name}</h3>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <span>{folder.count} {folder.count === 1 ? 'item' : 'items'}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(folder.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="text-lg">
                  {getCategoryEmojis(folder.categories)}
                </div>
              </div>
              
              <div className="text-2xl opacity-50">
                📁
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
