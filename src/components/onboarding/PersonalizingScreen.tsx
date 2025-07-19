import React, { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const PersonalizingScreen = () => {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#a8a5d0] to-[#9895c7] flex items-center justify-center z-50">
      <div className="text-center animate-fade-in">
        {/* Animated Keepr Logo */}
        <div className="mb-8 relative">
          <div className="bg-white rounded-3xl p-6 inline-block shadow-xl animate-pulse">
            <Heart className="h-12 w-12 text-[#a8a5d0] fill-current" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkles className="h-6 w-6 text-white animate-spin" />
          </div>
        </div>

        {/* Meta balls loading animation */}
        <div className="mb-8 flex justify-center items-center space-x-3">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s', animationDuration: '1s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '1s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '1s' }}></div>
        </div>
        
        <p className="text-white text-xl font-josefin mb-6">
          Setting up your profile{dots}
        </p>

        {/* Progress bar */}
        <div className="w-64 bg-white/20 rounded-full h-2 mx-auto mb-4">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-white/80 text-sm font-josefin">
          Personalizing your Keepr experience...
        </p>
      </div>
    </div>
  );
};
