
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onCreateKeepr: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header = ({ onCreateKeepr, searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground font-josefin">Your Keeprs</h1>
          <div className="relative flex-1 max-w-xs ml-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search keeprs..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
