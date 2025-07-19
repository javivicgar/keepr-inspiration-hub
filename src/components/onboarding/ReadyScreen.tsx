
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Sparkles } from 'lucide-react';

interface ReadyScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export const ReadyScreen = ({ onComplete, onBack }: ReadyScreenProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [sparkleVisible, setSparkleVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 300);
    const timer2 = setTimeout(() => setSparkleVisible(true), 800);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <div className="flex items-center mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10 p-2 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="text-center flex-1 flex flex-col justify-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative mb-6">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-josefin tracking-wide leading-tight px-4">
              Keepr is ready for you
            </h1>
            <div className={`absolute -top-2 -right-2 md:-top-4 md:-right-4 transition-all duration-500 ${sparkleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
              <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-white animate-pulse" />
            </div>
          </div>
          
          <p className="text-white/90 text-lg md:text-xl mb-8 md:mb-12 font-josefin px-4">
            Let's start adding your first Keeprs.
          </p>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-4 md:p-6 mb-6 md:mb-8 backdrop-blur-sm mx-2">
          <p className="text-white/80 text-sm font-josefin">
            🎉 Your personalized Keepr experience is ready! Start saving your inspirations and organize them your way.
          </p>
        </div>
      </div>
      
      <div className="mt-auto">
        <Button 
          onClick={onComplete}
          className="w-full bg-white text-[#a8a5d0] hover:bg-white/90 font-josefin font-medium py-4 md:py-6 rounded-2xl text-lg shadow-lg transition-all duration-200 h-12 md:h-14"
        >
          Enter Keepr →
        </Button>
      </div>
    </div>
  );
};
