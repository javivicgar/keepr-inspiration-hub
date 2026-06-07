import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen = ({ onNext }: WelcomeScreenProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="text-center animate-fade-in h-full flex flex-col justify-center">
      <div
        className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
          Welcome
        </h1>
        <p className="text-muted-foreground text-base md:text-lg mb-12 px-4">
          Let's set things up for you.
        </p>
      </div>

      <div className="mt-auto">
        <Button
          onClick={onNext}
          className="w-full bg-primary text-primary-foreground hover:bg-primary-hover font-medium py-3 rounded-md text-base h-12"
        >
          Get started
          <ArrowRight className="h-4 w-4 ml-1.5" />
        </Button>
      </div>
    </div>
  );
};
