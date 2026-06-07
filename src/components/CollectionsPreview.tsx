import React from 'react';
import { SavedContent } from '@/types/SavedContent';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderPlus, Folder } from 'lucide-react';

interface CollectionsPreviewProps {
  content: SavedContent[];
  onFolderClick: (folderName: string) => void;
  onCreateFolder: () => void;
}

export const CollectionsPreview = ({ content, onFolderClick, onCreateFolder }: CollectionsPreviewProps) => {
  const folders = Array.from(new Set(content.map(item => item.folder)));
  
  if (folders.length === 0) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 font-josefin">Your Collections</h2>
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-dashed border-primary/20">
          <div className="text-center">
            <FolderPlus className="h-12 w-12 mx-auto mb-3 text-primary/60" />
            <h3 className="font-semibold mb-2 font-josefin">Organize your Keeprs into folders</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create collections to keep your saved content organized and easy to find
            </p>
            <Button onClick={onCreateFolder} className="font-josefin">
              Create Your First Folder
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const displayFolders = folders.slice(0, 3);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-josefin">Your Collections</h2>
        {folders.length > 3 && (
          <span className="text-sm text-muted-foreground">+{folders.length - 3} more</span>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {displayFolders.map(folderName => {
          const folderContent = content.filter(item => item.folder === folderName);
          const previewImages = folderContent.slice(0, 3).map(item => item.image).filter(Boolean);
          
          return (
            <div
              key={folderName}
              onClick={() => onFolderClick(folderName)}
              className="flex-shrink-0 w-48 cursor-pointer"
            >
              <Card className="overflow-hidden bg-card border-border hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="relative h-24 bg-gradient-to-br from-primary/10 to-primary/20">
                  {previewImages.length > 0 ? (
                    <div className="flex h-full">
                      {previewImages.slice(0, 2).map((image, idx) => (
                        <img
                          key={idx}
                          src={image}
                          alt=""
                          className={`object-cover ${previewImages.length === 1 ? 'w-full' : 'w-1/2'}`}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Folder className="h-8 w-8 text-primary/40" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm font-josefin line-clamp-1 mb-1">
                    {folderName}
                  </h3>
                  <p className="text-xs text-muted-foreground font-josefin">
                    {folderContent.length} {folderContent.length === 1 ? 'Keepr' : 'Keeprs'}
                  </p>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};