
import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
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
  onSortClick: () => void;
}

export const FilterBar = ({
  selectedCategory,
  onCategoryChange,
  selectedFolder,
  onFolderChange,
  folders,
  searchQuery,
  onSearchChange,
  onSortClick
}: FilterBarProps) => {
  const categories = [
    'all', 'Food Spots', 'Locations', 'Fashion', 'Useful Apps', 
    'Tutorials', 'Outdoor', 'Music', 'Home', 'Sports', 'Other'
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onSortClick}
          className="whitespace-nowrap text-xs font-josefin rounded-xl border-2 hover:border-[#a8a5d0] transition-all duration-200 h-8"
        >
          <ArrowUpDown className="h-3 w-3 mr-1" />
          Sort by
        </Button>
        <div className="flex-1 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category)}
                className={`whitespace-nowrap text-xs font-josefin rounded-xl border-2 transition-all duration-200 h-8 ${
                  selectedCategory === category
                    ? 'bg-[#a8a5d0] hover:bg-[#9895c7] text-white border-[#a8a5d0]'
                    : 'hover:border-[#a8a5d0]'
                }`}
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
              className={`whitespace-nowrap text-xs font-josefin rounded-xl border-2 transition-all duration-200 h-8 ${
                selectedFolder === 'all'
                  ? 'bg-[#a8a5d0] hover:bg-[#9895c7] text-white border-[#a8a5d0]'
                  : 'hover:border-[#a8a5d0]'
              }`}
            >
              All Folders
            </Button>
            {folders.map((folder) => (
              <Button
                key={folder}
                variant={selectedFolder === folder ? "default" : "outline"}
                size="sm"
                onClick={() => onFolderChange(folder)}
                className={`whitespace-nowrap text-xs font-josefin rounded-xl border-2 transition-all duration-200 h-8 ${
                  selectedFolder === folder
                    ? 'bg-[#a8a5d0] hover:bg-[#9895c7] text-white border-[#a8a5d0]'
                    : 'hover:border-[#a8a5d0]'
                }`}
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
