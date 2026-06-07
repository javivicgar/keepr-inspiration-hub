import React from 'react';
import { Bookmark } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  React.useEffect(() => {
    const t = setTimeout(onComplete, 1500);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="bg-primary-soft rounded-2xl p-5 mb-5 inline-flex shadow-sm">
          <div className="bg-primary rounded-full p-3 flex items-center justify-center">
            <Bookmark className="h-7 w-7 text-primary-foreground fill-current" aria-hidden="true" />
          </div>
        </div>
        <h1 className="text-3xl font-semibold text-foreground mb-1 tracking-tight">Keepr</h1>
        <p className="text-muted-foreground text-base">Save your inspirations.</p>
      </div>
    </div>
  );
};
