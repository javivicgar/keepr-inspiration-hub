
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedFolder: string;
  onFolderChange: (folder: string) => void;
  folders: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const FilterBar = ({
  selectedCategory,
  onCategoryChange,
  selectedFolder,
  onFolderChange,
  folders,
  searchQuery,
  onSearchChange
}: FilterBarProps) => {
  const categories = ['all', 'Food Spot', 'Travel Spot', 'Outfit', 'Useful App'];

  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Search by title, tags, or creator..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <div className="flex-1 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category)}
                className="whitespace-nowrap text-xs"
              >
                {category === 'all' ? 'All' : category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {folders.length > 0 && (
        <div className="flex-1 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            <Button
              variant={selectedFolder === 'all' ? "default" : "outline"}
              size="sm"
              onClick={() => onFolderChange('all')}
              className="whitespace-nowrap text-xs"
            >
              All Folders
            </Button>
            {folders.map((folder) => (
              <Button
                key={folder}
                variant={selectedFolder === folder ? "default" : "outline"}
                size="sm"
                onClick={() => onFolderChange(folder)}
                className="whitespace-nowrap text-xs"
              >
                {folder}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
