
import React from 'react';
import { Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface HeaderProps {
  onCreateKeepr: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  username: string;
  onProfileClick: () => void;
}

export const Header = ({ onCreateKeepr, searchQuery, onSearchChange, username, onProfileClick }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground font-josefin">Your Keeprs</h1>
          <Button
            onClick={onProfileClick}
            variant="ghost"
            size="sm"
            className="rounded-full p-2 hover:bg-muted"
          >
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gradient-to-br from-[#a8a5d0] to-[#9895c7] text-white text-sm font-josefin">
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search keeprs..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>
      </div>
    </header>
  );
};
