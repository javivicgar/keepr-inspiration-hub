import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ProfileHeaderProps {
  username: string;
  onProfileClick: () => void;
  title: string;
}

export const ProfileHeader = ({ username, onProfileClick, title }: ProfileHeaderProps) => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground font-josefin">{title}</h1>
          <Button
            onClick={onProfileClick}
            variant="ghost"
            size="sm"
            className="rounded-full p-2 hover:bg-muted"
          >
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary text-white text-sm font-josefin">
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
};