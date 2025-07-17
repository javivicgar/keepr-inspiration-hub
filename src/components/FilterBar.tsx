import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterBarProps {
  selectedCategory: string;
  selectedFolder: string;
  onCategoryChange: (category: string) => void;
  onFolderChange: (folder: string) => void;
  onSortClick: () => void;
  folders: string[];
}

export const FilterBar = ({ 
  selectedCategory, 
  selectedFolder, 
  onCategoryChange, 
  onFolderChange, 
  onSortClick, 
  folders
}: FilterBarProps) => {
  const categories = [
    'All', 'Food Spots', 'Locations', 'Fashion', 'Useful Apps', 
    'Tutorials', 'Outdoor', 'Music', 'Home', 'Sports', 'Other'
  ];

  return (
    <div className="space-y-3 mb-4">
      <div className="flex items-center space-x-2 overflow-x-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={onSortClick}
          className="whitespace-nowrap text-xs font-josefin rounded-xl border-2 hover:border-[#a8a5d0] transition-all duration-200 h-8 flex-shrink-0"
        >
          <ArrowUpDown className="h-3 w-3 mr-1" />
          Sort by
        </Button>
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className={`whitespace-nowrap text-xs font-josefin rounded-xl border-2 transition-all duration-200 h-8 flex-shrink-0 ${
                selectedCategory === category
                  ? 'bg-[#a8a5d0] hover:bg-[#9895c7] text-white border-[#a8a5d0]'
                  : 'hover:border-[#a8a5d0]'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {folders.length > 0 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <Button
            variant={selectedFolder === 'All Folders' ? "default" : "outline"}
            size="sm"
            onClick={() => onFolderChange('All Folders')}
            className={`whitespace-nowrap text-xs font-josefin rounded-xl border-2 transition-all duration-200 h-8 flex-shrink-0 ${
              selectedFolder === 'All Folders'
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
              className={`whitespace-nowrap text-xs font-josefin rounded-xl border-2 transition-all duration-200 h-8 flex-shrink-0 ${
                selectedFolder === folder
                  ? 'bg-[#a8a5d0] hover:bg-[#9895c7] text-white border-[#a8a5d0]'
                  : 'hover:border-[#a8a5d0]'
              }`}
            >
              {folder}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};