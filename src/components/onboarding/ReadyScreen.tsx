import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ArrowRight } from 'lucide-react';

interface ReadyScreenProps {
  onComplete: () => void;
  onBack: () => void;
  onStartPersonalizing: () => void;
}

export const ReadyScreen = ({ onComplete, onBack, onStartPersonalizing }: ReadyScreenProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <div className="flex items-center flex-shrink-0">
        <Button onClick={onBack} variant="ghost" size="icon" aria-label="Go back" className="rounded-md -ml-2">
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3 tracking-tight leading-tight">
            You're all set.
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Your saves are private by default. You can change every setting anytime in Privacy & Data.
          </p>
        </div>
      </div>

      <div className="flex-shrink-0">
        <Button
          onClick={() => {
            onComplete();
            onStartPersonalizing();
          }}
          className="w-full bg-primary text-primary-foreground hover:bg-primary-hover font-medium py-3 rounded-md text-base h-12"
        >
          Enter Keepr
          <ArrowRight className="h-4 w-4 ml-1.5" />
        </Button>
      </div>
    </div>
  );
};
