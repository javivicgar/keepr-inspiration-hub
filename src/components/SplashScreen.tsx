
import React from 'react';
import { Heart } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#a8a5d0] to-[#9895c7] flex items-center justify-center">
      <div className="text-center">
        <div className="bg-white rounded-3xl p-6 mb-6 inline-block shadow-lg">
          <Heart className="h-12 w-12 text-[#a8a5d0] fill-current" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Keepr</h1>
        <p className="text-white/80 text-lg">Save your inspiration</p>
      </div>
    </div>
  );
};
