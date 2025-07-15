
import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (sortBy: string) => void;
  currentSort: string;
}

export const SortModal = ({ isOpen, onClose, onApply, currentSort }: SortModalProps) => {
  const [selectedSort, setSelectedSort] = useState(currentSort);

  const sortOptions = [
    { value: 'recent', label: 'Last saved' },
    { value: 'alphabetical', label: 'A to Z' },
  ];

  const handleApply = () => {
    onApply(selectedSort);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-background rounded-t-3xl w-full max-h-[60vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground font-josefin">Sort by</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all font-josefin ${
                selectedSort === option.value
                  ? 'border-[#a8a5d0] bg-[#a8a5d0]/10'
                  : 'border-border hover:border-muted-foreground'
              }`}
              onClick={() => setSelectedSort(option.value)}
            >
              <span className="font-medium text-left">{option.label}</span>
              {selectedSort === option.value && (
                <Check className="h-5 w-5 text-[#a8a5d0]" />
              )}
            </button>
          ))}
        </div>

        <div className="p-6 pt-0">
          <Button 
            onClick={handleApply}
            className="w-full h-12 bg-[#a8a5d0] hover:bg-[#9895c7] font-josefin font-medium rounded-xl"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};
