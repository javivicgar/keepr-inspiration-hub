
import React from 'react';
import { Heart } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-2">
              <Heart className="h-5 w-5 text-primary-foreground fill-current" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Keepr</h1>
          </div>
        </div>
      </div>
    </header>
  );
};
