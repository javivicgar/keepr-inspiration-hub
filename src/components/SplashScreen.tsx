import React from 'react';
import { Bookmark } from 'lucide-react';
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
          <div className="bg-[#a8a5d0] rounded-full p-3 flex items-center justify-center">
            <Bookmark className="h-8 w-8 text-white fill-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 font-josefin">Keepr</h1>
        <p className="text-white/80 text-lg font-josefin">Save your inspirations.</p>
      </div>
    </div>
  );
};
