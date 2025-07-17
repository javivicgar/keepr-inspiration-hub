
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen = ({ onNext }: WelcomeScreenProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dotsVisible, setDotsVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 300);
    const timer2 = setTimeout(() => setDotsVisible(true), 800);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="text-center animate-fade-in h-full flex flex-col justify-center">
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-josefin tracking-wide">
          Hey 👋
        </h1>
        <p className="text-white/90 text-lg md:text-xl mb-8 font-josefin px-4">
          Let's set things up for you.
        </p>
      </div>
      
      <div className={`flex justify-center space-x-2 mb-8 md:mb-12 transition-opacity duration-500 ${dotsVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
      
      <div className="mt-auto">
        <Button 
          onClick={onNext}
          className="w-full bg-white text-[#a8a5d0] hover:bg-white/90 font-josefin font-medium py-4 md:py-6 rounded-2xl text-lg shadow-lg transition-all duration-200 h-12 md:h-14"
        >
          Get started →
        </Button>
      </div>
    </div>
  );
};
